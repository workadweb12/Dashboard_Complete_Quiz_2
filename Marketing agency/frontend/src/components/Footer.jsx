import React from 'react'
import { Link } from 'react-router-dom'
import './Footer.css'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <div className="footer-logo">
              <span className="logo-icon">🚀</span>
              <span className="logo-text">DigitalPro</span>
            </div>
            <p className="footer-description">
              Empowering businesses with cutting-edge digital marketing solutions and SEO tools to drive growth and maximize online presence.
            </p>
            <div className="social-links">
              <a href="#" className="social-link">📘</a>
              <a href="#" className="social-link">🐦</a>
              <a href="#" className="social-link">💼</a>
              <a href="#" className="social-link">📷</a>
            </div>
          </div>

          <div className="footer-section">
            <h3 className="footer-title">SEO Tools</h3>
            <ul className="footer-links">
              <li><Link to="/tools/meta-tags">Meta Tag Generator</Link></li>
              <li><Link to="/tools/blog-titles">Blog Title Generator</Link></li>
              <li><Link to="/tools/schema">Schema Markup</Link></li>
              <li><Link to="/tools/keywords">Keyword Tool</Link></li>
              <li><Link to="/tools/backlinks">Backlink Checker</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h3 className="footer-title">Services</h3>
            <ul className="footer-links">
              <li><a href="#">SEO Optimization</a></li>
              <li><a href="#">Content Marketing</a></li>
              <li><a href="#">Social Media</a></li>
              <li><a href="#">PPC Advertising</a></li>
              <li><a href="#">Analytics & Reporting</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h3 className="footer-title">Company</h3>
            <ul className="footer-links">
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/contact">Contact</Link></li>
              <li><a href="#">Blog</a></li>
              <li><a href="#">Careers</a></li>
              <li><a href="#">Privacy Policy</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h3 className="footer-title">Contact Info</h3>
            <div className="contact-info">
              <div className="contact-item">
                <span className="contact-icon">📧</span>
                <span>hello@digitalpro.com</span>
              </div>
              <div className="contact-item">
                <span className="contact-icon">📞</span>
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="contact-item">
                <span className="contact-icon">📍</span>
                <span>123 Marketing St, Digital City</span>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <p>&copy; 2024 DigitalPro Agency. All rights reserved.</p>
            <div className="footer-bottom-links">
              <a href="#">Terms of Service</a>
              <a href="#">Privacy Policy</a>
              <a href="#">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
