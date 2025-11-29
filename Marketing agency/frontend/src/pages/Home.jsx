import React from "react";
import { Link } from "react-router-dom";
import MetaTagGenerator from "../components/MetaTagGenerator";
import BlogTitleGenerator from "../components/BlogTitleGenerator";
import SchemaMarkupGenerator from "../components/SchemaMarkupGenerator";
import KeywordSuggestionTool from "../components/KeywordSuggestionTool";
import BacklinkChecker from "../components/BacklinkChecker";
import "./Home.css";
import useAuth from "../hooks/useAuth";

const Home = () => {
  const { user, loading } = useAuth();

  return (
    <div className="home-page">
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            Transform Your Digital Presence with
            <span className="gradient-text"> Professional SEO Tools</span>
          </h1>
          <p className="hero-description">
            Boost your website's visibility, drive more traffic, and grow your
            business with our comprehensive suite of digital marketing tools
            designed for success.
          </p>
          <div className="hero-buttons">
            <Link to="/tools" className="btn-primary">
              Explore Tools
            </Link>
            <Link to="/contact" className="btn-secondary">
              Get Started
            </Link>
          </div>
        </div>
        <div className="hero-stats">
          <div className="stat-item">
            <div className="stat-number">10K+</div>
            <div className="stat-label">Websites Optimized</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">50M+</div>
            <div className="stat-label">Keywords Analyzed</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">99%</div>
            <div className="stat-label">Client Satisfaction</div>
          </div>
        </div>
      </section>

      <section className="tools-section">
        <div className="section-header">
          <h2 className="section-title">Our Premium SEO Tools</h2>
          <p className="section-description">
            Professional-grade tools to help you dominate search results and
            drive organic traffic
          </p>
        </div>

        <div className="tools-grid">
          <MetaTagGenerator />
          <BlogTitleGenerator />
          <SchemaMarkupGenerator />
          <KeywordSuggestionTool />
          <BacklinkChecker />
        </div>

        <div className="tools-cta">
          <Link to="/tools" className="btn-primary-large">
            View All Tools
          </Link>
        </div>
      </section>

      <section className="features-section">
        <div className="section-header">
          <h2 className="section-title">Why Choose DigitalPro?</h2>
          <p className="section-description">
            We provide everything you need to succeed in the digital landscape
          </p>
        </div>

        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">⚡</div>
            <h3 className="feature-title">Lightning Fast</h3>
            <p className="feature-description">
              Get instant results with our optimized tools that process data in
              real-time.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🎯</div>
            <h3 className="feature-title">Precision Targeting</h3>
            <p className="feature-description">
              Advanced algorithms help you target the right keywords and
              audiences.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <h3 className="feature-title">Detailed Analytics</h3>
            <p className="feature-description">
              Comprehensive reports and insights to track your progress and ROI.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🔒</div>
            <h3 className="feature-title">Secure & Reliable</h3>
            <p className="feature-description">
              Enterprise-grade security with 99.9% uptime guarantee.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
