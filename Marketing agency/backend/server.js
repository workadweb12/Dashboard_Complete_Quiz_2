const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/user');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const connectDB = require('./config/connection');

const app = express();

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const JWT_SECRET = process.env.JWT_SECRET || 'change-this-secret-in-env';
const JWT_EXPIRES_IN = '15m';

function signAccessToken(payload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}

function auth(req, res, next) {
  const token = req.cookies && req.cookies.token;
  if (!token) {
    return res.status(401).json({ success: false, msg: 'Unauthorized' });
  }
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    return next();
  } catch (e) {
    return res.status(401).json({ success: false, msg: 'Unauthorized' });
  }
}

app.get('/health', (req, res) => {
  const dbStatus = mongoose.connection.readyState;
  const statusMessages = {
    0: 'disconnected',
    1: 'connected',
    2: 'connecting',
    3: 'disconnecting'
  };
  
  res.json({
    status: dbStatus === 1 ? 'healthy' : 'unhealthy',
    database: {
      status: statusMessages[dbStatus] || 'unknown',
      connected: dbStatus === 1,
      name: mongoose.connection.name,
      host: mongoose.connection.host,
      port: mongoose.connection.port
    },
    server: {
      uptime: process.uptime(),
      timestamp: new Date().toISOString()
    }
  });
});

app.get('/auth', auth, (req, res) => {
  res.json({ success: true, user: req.user });
});

app.post('/signup', async (req, res) => {
  try {
    const { username, fullname, email, password } = req.body;

    const errors = {};

    if (!username || !username.trim()) {
      errors.username = "Username is required";
    } else if (username.length < 3) {
      errors.username = "Username must be at least 3 characters";
    } else if (!/^[a-zA-Z0-9_]+$/.test(username)) {
      errors.username = "Username can only contain letters, numbers, and underscores";
    }

    if (!fullname || !fullname.trim()) {
      errors.fullname = "Full name is required";
    } else if (fullname.trim().length < 2) {
      errors.fullname = "Full name must be at least 2 characters";
    }

    if (!email || !email.trim()) {
      errors.email = "Email is required";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        errors.email = "Please enter a valid email address";
      }
    }

    if (!password) {
      errors.password = "Password is required";
    } else if (password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    } else {
      const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)/;
      if (!passwordRegex.test(password)) {
        errors.password = "Password must contain at least one letter and one number";
      }
    }

    if (Object.keys(errors).length > 0) {
      const firstError = Object.values(errors)[0];
      return res.json({ success: false, msg: firstError, errors });
    }

    const existingUsername = await User.findOne({ username: username.trim() });
    if (existingUsername) {
      return res.json({ success: false, msg: "Username already exists", field: "username" });
    }

    const existingEmail = await User.findOne({ email: email.trim().toLowerCase() });
    if (existingEmail) {
      return res.json({ success: false, msg: "Email already exists", field: "email" });
    }

    const user = await User.register({ 
      username: username.trim(), 
      fullname: fullname.trim(), 
      email: email.trim().toLowerCase() 
    }, password);

    const token = signAccessToken({ id: user._id.toString(), username: user.username, email: user.email, fullname: user.fullname });
    res.cookie('token', token, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      maxAge: 15 * 60 * 1000
    });

    res.json({ success: true, user: { username: user.username, email: user.email, fullname: user.fullname, id: user._id } });
  } catch (err) {
    console.error('Signup error:', err);
    
    if (err.name === 'UserExistsError') {
      return res.json({ success: false, msg: "Username already exists", field: "username" });
    }
    
    res.json({ success: false, msg: err.message || "Signup failed. Please try again." });
  }
});

app.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.json({ success: false, msg: 'Username and password are required' });
    }

    const authenticate = User.authenticate();
    authenticate(username, password, (err, user, info) => {
      if (err) {
        console.error('Login error:', err);
        return res.json({ success: false, msg: 'Server error' });
      }
      if (!user) {
        return res.json({ success: false, msg: 'Invalid username or password' });
      }

      const { email, username: uname, _id, fullname } = user;
      const token = signAccessToken({ id: _id.toString(), username: uname, email, fullname });
      res.cookie('token', token, {
        httpOnly: true,
        secure: false,
        sameSite: 'lax',
        maxAge: 15 * 60 * 1000
      });

      return res.json({ success: true, msg: 'Login successful', user: { email, username: uname, id: _id, fullname } });
    });
  } catch (e) {
    console.error('Login error:', e);
    return res.json({ success: false, msg: 'Server error' });
  }
});

app.post('/logout', (req, res) => {
  res.clearCookie('token', { httpOnly: true, sameSite: 'lax', secure: false });
  res.json({ success: true, msg: 'Logout successful' });
});

app.put('/user/update', auth, async (req, res) => {
  try {
    const { fullname, email, username } = req.body;
    const userId = req.user.id;

    const errors = {};

    if (fullname !== undefined) {
      if (!fullname || !fullname.trim()) {
        errors.fullname = "Full name is required";
      } else if (fullname.trim().length < 2) {
        errors.fullname = "Full name must be at least 2 characters";
      }
    }

    if (email !== undefined) {
      if (!email || !email.trim()) {
        errors.email = "Email is required";
      } else {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
          errors.email = "Please enter a valid email address";
        }
      }
    }

    if (username !== undefined) {
      if (!username || !username.trim()) {
        errors.username = "Username is required";
      } else if (username.length < 3) {
        errors.username = "Username must be at least 3 characters";
      } else if (!/^[a-zA-Z0-9_]+$/.test(username)) {
        errors.username = "Username can only contain letters, numbers, and underscores";
      }
    }

    if (Object.keys(errors).length > 0) {
      return res.json({ success: false, msg: 'Validation failed', errors });
    }

    const updateData = {};
    if (fullname !== undefined) updateData.fullname = fullname.trim();
    if (email !== undefined) updateData.email = email.trim().toLowerCase();
    if (username !== undefined) updateData.username = username.trim();

    // Check if username or email already exists (excluding current user)
    if (updateData.username) {
      const existingUsername = await User.findOne({ 
        username: updateData.username, 
        _id: { $ne: userId } 
      });
      if (existingUsername) {
        return res.json({ success: false, msg: "Username already exists", field: "username" });
      }
    }

    if (updateData.email) {
      const existingEmail = await User.findOne({ 
        email: updateData.email, 
        _id: { $ne: userId } 
      });
      if (existingEmail) {
        return res.json({ success: false, msg: "Email already exists", field: "email" });
      }
    }

    const user = await User.findByIdAndUpdate(
      userId,
      { $set: updateData },
      { new: true }
    );

    if (!user) {
      return res.json({ success: false, msg: 'User not found' });
    }

    // Generate new token with updated data
    const token = signAccessToken({ 
      id: user._id.toString(), 
      username: user.username, 
      email: user.email, 
      fullname: user.fullname 
    });
    
    res.cookie('token', token, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      maxAge: 15 * 60 * 1000
    });

    res.json({ 
      success: true, 
      msg: 'User data updated successfully', 
      user: { 
        username: user.username, 
        email: user.email, 
        fullname: user.fullname, 
        id: user._id 
      } 
    });
  } catch (err) {
    console.error('Update user error:', err);
    res.json({ success: false, msg: err.message || 'Failed to update user data' });
  }
});

app.delete('/user/delete', auth, async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findByIdAndDelete(userId);

    if (!user) {
      return res.json({ success: false, msg: 'User not found' });
    }

    // Clear the token cookie
    res.clearCookie('token', { httpOnly: true, sameSite: 'lax', secure: false });

    res.json({ success: true, msg: 'Account deleted successfully' });
  } catch (err) {
    console.error('Delete user error:', err);
    res.json({ success: false, msg: err.message || 'Failed to delete account' });
  }
});

async function startServer() {
  try {
    await connectDB();
    app.listen(3001, () => {
      console.log(`✅ Server is running on port 3001`);
      console.log(`📡 MongoDB connection status: ${mongoose.connection.readyState === 1 ? 'Connected ✅' : 'Disconnected ❌'}`);
      console.log(`🌐 Frontend URL: http://localhost:3000`);
      console.log(`🔧 Backend API: http://localhost:3001`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error.message);
    console.error('💡 Make sure MongoDB is running on mongodb://127.0.0.1:27017');
    console.error('💡 To start MongoDB, run: mongod (or start MongoDB service)');
    process.exit(1);
  }
}

startServer();
