import React from 'react'
import './About.css'

const About = () => {
  return (
    <div className="about-page">
      <div className="page-header">
        <h1 className="page-title">About DigitalPro</h1>
        <p className="page-subtitle">Empowering businesses with cutting-edge digital marketing solutions</p>
      </div>

      <div className="about-content">
        <section className="about-section">
          <div className="about-text">
            <h2>Our Mission</h2>
            <p>
              At DigitalPro, we believe every business deserves to thrive in the digital landscape. 
              Our mission is to provide powerful, accessible SEO tools and marketing solutions that 
              level the playing field for businesses of all sizes.
            </p>
            <p>
              Founded in 2020, we've helped over 10,000 websites improve their search rankings, 
              drive more organic traffic, and achieve their digital marketing goals.
            </p>
          </div>
          <div className="about-image">
            <div className="image-placeholder">🚀</div>
          </div>
        </section>

        <section className="team-section">
          <h2>Our Expert Team</h2>
          <div className="team-grid">
            <div className="team-member">
              <div className="member-avatar">👨‍💼</div>
              <h3>Rana Muhammad Fahad</h3>
              <p>CEO & Founder</p>
              <span>10+ years in digital marketing</span>
            </div>
            <div className="team-member">
              <div className="member-avatar">👩‍💻</div>
              <h3>Aiza Qaisar</h3>
              <p>Head of SEO</p>
              <span>Expert in technical SEO</span>
            </div>
            <div className="team-member">
              <div className="member-avatar">👨‍🎨</div>
              <h3>Yasir Iftikhar</h3>
              <p>Lead Developer</p>
              <span>Full-stack development expert</span>
            </div>
          </div>
        </section>

        <section className="values-section">
          <h2>Our Values</h2>
          <div className="values-grid">
            <div className="value-card">
              <div className="value-icon">🎯</div>
              <h3>Precision</h3>
              <p>We focus on delivering accurate, data-driven results</p>
            </div>
            <div className="value-card">
              <div className="value-icon">🚀</div>
              <h3>Innovation</h3>
              <p>Constantly evolving our tools with the latest technology</p>
            </div>
            <div className="value-card">
              <div className="value-icon">🤝</div>
              <h3>Partnership</h3>
              <p>We work closely with our clients for mutual success</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default About