import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Login = () => {
  const navigate = useNavigate();
  const { user, loading } = useAuth();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!loading && user) {
      navigate("/", { replace: true });
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="container mt-5 d-flex justify-content-center">
        <div>Loading...</div>
      </div>
    );
  }

  if (user) {
    return null; // Will redirect via useEffect
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    if (errors[name]) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: "",
      }));
    }
    if (errorMessage) {
      setErrorMessage("");
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setErrors({});
    if (!validateForm()) {
      setErrorMessage("Please fill in all required fields");
      return;
    }

    setIsLoading(true);

    try {
      const res = await axios.post(
        "http://localhost:3001/login",
        formData,
        { withCredentials: true }
      );

      if (res.data.success === true) {
        navigate("/dashboard", { replace: true });
      } else {
        setErrorMessage(res.data.msg || "Incorrect username or password");
      }
    } catch (err) {
      console.error("Login failed:", err.response?.data || err.message);
      const errorMsg = err.response?.data?.msg || err.message || "Incorrect username or password";
      if (!err.response) {
        setErrorMessage("Unable to connect to server. Please check your connection.");
      } else {
        setErrorMessage(errorMsg);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mt-5 d-flex justify-content-center">
      <div
        className="card shadow-lg p-4"
        style={{ width: "28rem", borderRadius: "15px" }}
      >
        <h3 className="text-center mb-4 text-primary fw-bold">
          Login Account
        </h3>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label fw-semibold">
              Username <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              id="username"
              name="username"
              onChange={handleChange}
              value={formData.username}
              className={`form-control ${errors.username ? 'is-invalid' : ''}`}
              placeholder="Enter your username"
              required
              disabled={isLoading}
            />
            {errors.username && (
              <div className="invalid-feedback d-block">{errors.username}</div>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="form-label fw-semibold">
              Password <span className="text-danger">*</span>
            </label>
            <input
              type="password"
              id="password"
              name="password"
              onChange={handleChange}
              value={formData.password}
              className={`form-control ${errors.password ? 'is-invalid' : ''}`}
              placeholder="Enter your password"
              required
              disabled={isLoading}
            />
            {errors.password && (
              <div className="invalid-feedback d-block">{errors.password}</div>
            )}
          </div>

          {errorMessage && (
            <div className="alert alert-danger" role="alert">
              {errorMessage}
            </div>
          )}

          <button 
            type="submit" 
            className="btn btn-primary w-100 fw-semibold"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                Logging in...
              </>
            ) : (
              "Login"
            )}
          </button>
        </form>

        <p className="text-center text-muted mt-3 mb-0">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="text-decoration-none text-primary fw-semibold"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
