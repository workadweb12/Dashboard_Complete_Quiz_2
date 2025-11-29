import React from 'react'
import { Link } from 'react-router-dom'
import './Tools.css'

const Tools = () => {
  const tools = [
    {
      id: 'meta-tags',
      title: 'Meta Tag Generator',
      description: 'Generate comprehensive meta tags for better SEO and social media sharing',
      icon: '🏷️',
      features: ['Title optimization', 'Open Graph tags', 'Twitter Cards', 'Mobile viewport'],
      path: '/tools/meta-tags'
    },
    {
      id: 'blog-titles',
      title: 'Blog Title Generator',
      description: 'Create compelling and SEO-friendly blog titles that capture attention',
      icon: '📝',
      features: ['Keyword-based titles', 'Click-worthy formulas', 'Length optimization', 'Multiple variations'],
      path: '/tools/blog-titles'
    },
    {
      id: 'schema',
      title: 'Schema Markup Generator',
      description: 'Generate structured data markup for better search engine understanding',
      icon: '🏗️',
      features: ['Article schemas', 'Organization markup', 'Local business', 'Rich snippets'],
      path: '/tools/schema'
    },
    {
      id: 'keywords',
      title: 'Keyword Suggestion Tool',
      description: 'Discover high-value keywords and search terms to boost visibility',
      icon: '🔍',
      features: ['Long-tail research', 'Volume analysis', 'Competition scoring', 'Related suggestions'],
      path: '/tools/keywords'
    },
    {
      id: 'backlinks',
      title: 'Backlink Checker',
      description: 'Analyze your website\'s backlink profile and discover opportunities',
      icon: '🔗',
      features: ['Backlink analysis', 'Domain authority', 'Competitor research', 'Link recommendations'],
      path: '/tools/backlinks'
    }
  ]

  return (
    <div className="tools-page">
      <div className="page-header">
        <h1 className="page-title">SEO Tools</h1>
        <p className="page-subtitle">Professional-grade tools to boost your digital marketing success</p>
      </div>

      <div className="tools-content">
        <div className="tools-intro">
          <h2>Powerful SEO Tools at Your Fingertips</h2>
          <p>
            Our comprehensive suite of SEO tools is designed to help you optimize your website, 
            improve search rankings, and drive more organic traffic. Each tool is built with 
            professional standards and user-friendly interfaces.
          </p>
        </div>

        <div className="tools-grid">
          {tools.map((tool) => (
            <div key={tool.id} className="tool-card">
              <div className="tool-header">
                <span className="tool-icon">{tool.icon}</span>
                <h3 className="tool-title">{tool.title}</h3>
              </div>
              
              <p className="tool-description">{tool.description}</p>
              
              <div className="tool-features">
                <h4>Key Features:</h4>
                <ul>
                  {tool.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>
              
              <Link to={tool.path} className="tool-button">
                Use Tool
              </Link>
            </div>
          ))}
        </div>

        <div className="tools-cta">
          <h2>Ready to Boost Your SEO?</h2>
          <p>Start using our tools today and see the difference in your search rankings</p>
          <Link to="/contact" className="cta-button">
            Get Professional Help
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Tools
