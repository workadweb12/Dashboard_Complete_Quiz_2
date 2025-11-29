import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from 'axios';
import { useNavigate, Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Signup = () => {
  const navigate = useNavigate();
  const { user, loading } = useAuth();

  const [formData, setFormData] = useState({
    fullname: "",
    username: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
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

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{6,}$/;
    return passwordRegex.test(password);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullname.trim()) {
      newErrors.fullname = "Full name is required";
    } else if (formData.fullname.trim().length < 2) {
      newErrors.fullname = "Full name must be at least 2 characters";
    }

    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
    } else if (formData.username.length < 3) {
      newErrors.username = "Username must be at least 3 characters";
    } else if (!/^[a-zA-Z0-9_]+$/.test(formData.username)) {
      newErrors.username = "Username can only contain letters, numbers, and underscores";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    } else if (!validatePassword(formData.password)) {
      newErrors.password = "Password must contain at least one letter and one number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: "",
      }));
    }
  };

  const submitFun = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    if (!validateForm()) {
      setErrorMessage("Please fix the errors in the form");
      return;
    }

    setIsLoading(true);

    try {
      const res = await axios.post('http://localhost:3001/signup', formData, {
        withCredentials: true
      });

      if (res.data.success === true) {
        setSuccessMessage("Account created successfully! Redirecting to login...");
        setTimeout(() => {
          navigate("/login", { replace: true });
        }, 1500);
      } else {
        if (res.data.errors) {
          setErrors(res.data.errors);
          setErrorMessage("Please fix the errors in the form");
        } else if (res.data.field) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            [res.data.field]: res.data.msg,
          }));
          setErrorMessage(res.data.msg || "Signup failed. Please try again.");
        } else {
          setErrorMessage(res.data.msg || "Signup failed. Please try again.");
        }
      }
    } catch (err) {
      console.error("Signup error:", err.response?.data || err.message);
      const errorMsg = err.response?.data?.msg || err.message || "Signup failed. Please try again.";

      if (!err.response) {
        setErrorMessage("Unable to connect to server. Please check your connection.");
      } else {
        if (err.response?.data?.errors) {
          setErrors(err.response.data.errors);
          setErrorMessage("Please fix the errors in the form");
        } else if (err.response?.data?.field) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            [err.response.data.field]: errorMsg,
          }));
          setErrorMessage(errorMsg);
        } else {
          setErrorMessage(errorMsg);
        }
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
        <h3 className="text-center mb-4 text-primary fw-bold">Create Account</h3>

        <form onSubmit={submitFun}>
          <div className="mb-3">
            <label htmlFor="fullname" className="form-label fw-semibold">
              Full Name <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              onChange={handleChange}
              id="fullname"
              name="fullname"
              value={formData.fullname}
              className={`form-control ${errors.fullname ? 'is-invalid' : ''}`}
              placeholder="Enter your full name"
              required
            />
            {errors.fullname && (
              <div className="invalid-feedback d-block">{errors.fullname}</div>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="username" className="form-label fw-semibold">
              Username <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              id="username"
              onChange={handleChange}
              name="username"
              value={formData.username}
              className={`form-control ${errors.username ? 'is-invalid' : ''}`}
              placeholder="Choose a username"
              required
            />
            {errors.username && (
              <div className="invalid-feedback d-block">{errors.username}</div>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label fw-semibold">
              Email Address <span className="text-danger">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              onChange={handleChange}
              value={formData.email}
              className={`form-control ${errors.email ? 'is-invalid' : ''}`}
              placeholder="Enter your email"
              required
            />
            {errors.email && (
              <div className="invalid-feedback d-block">{errors.email}</div>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="form-label fw-semibold">
              Password <span className="text-danger">*</span>
            </label>
            <input
              type="password"
              name="password"
              id="password"
              onChange={handleChange}
              value={formData.password}
              className={`form-control ${errors.password ? 'is-invalid' : ''}`}
              placeholder="Create a password (min 6 chars, include letter & number)"
              required
            />
            {errors.password && (
              <div className="invalid-feedback d-block">{errors.password}</div>
            )}
            <small className="form-text text-muted">
              Password must be at least 6 characters and contain at least one letter and one number
            </small>
          </div>

          {errorMessage && (
            <div className="alert alert-danger" role="alert">
              {errorMessage}
            </div>
          )}

          {successMessage && (
            <div className="alert alert-success" role="alert">
              {successMessage}
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
                Creating Account...
              </>
            ) : (
              "Sign Up"
            )}
          </button>
        </form>

        <p className="text-center text-muted mt-3 mb-0">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-decoration-none text-primary fw-semibold"
          >
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
