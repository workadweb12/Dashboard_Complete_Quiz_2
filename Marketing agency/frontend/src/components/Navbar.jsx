import React, { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'
import './Navbar.css'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [user, setUser] = useState(null)
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    axios.get("http://localhost:3001/auth", { withCredentials: true })
      .then((res) => {
        if (res.data.success === true) {
          setUser(res.data.user)
        } else {
          setUser(null)
        }
      })
      .catch(() => {
        setUser(null)
      })
  }, [location])

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:3001/logout", {}, { withCredentials: true })
      setUser(null)
      navigate("/login", { replace: true })
    } catch (err) {
      console.error("Logout error:", err)
    }
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const isActive = (path) => location.pathname === path

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to={user ? "/" : "/login"} className="nav-logo">
          <span className="logo-icon">🚀</span>
          <span className="logo-text">DigitalPro</span>
        </Link>

        {user ? (
          <div className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
            <Link 
              to="/" 
              className={`nav-link ${isActive('/') ? 'active' : ''}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/tools" 
              className={`nav-link ${isActive('/tools') ? 'active' : ''}`}
              onClick={() => setIsMenuOpen(false)}
            >
              SEO Tools
            </Link>
            <Link 
              to="/about" 
              className={`nav-link ${isActive('/about') ? 'active' : ''}`}
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link 
              to="/contact" 
              className={`nav-link ${isActive('/contact') ? 'active' : ''}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
            <div className="nav-user-section">
              <span className="nav-user-name">Welcome, {user.username || user.fullname}</span>
              <button className="nav-cta-btn" onClick={handleLogout}>
                Logout
              </button>
            </div>
          </div>
        ) : (
          <div className="nav-right">
            <Link to="/login" onClick={() => setIsMenuOpen(false)}>
              <button className="nav-cta-btn">
                Login
              </button>
            </Link>
          </div>
        )}

        {user && (
          <div className="nav-toggle" onClick={toggleMenu}>
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
