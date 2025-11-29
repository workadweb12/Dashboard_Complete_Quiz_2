import React, { useState } from 'react'
import './ToolPage.css'

const SchemaMarkupGeneratorPage = () => {
  const [formData, setFormData] = useState({
    type: 'Article',
    title: '',
    description: '',
    author: '',
    datePublished: '',
    image: ''
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const generateSchema = () => {
    const { type, title, description, author, datePublished, image } = formData
    
    if (type === 'Article') {
      return `
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "${title || 'Your Article Title'}",
  "description": "${description || 'Article description'}",
  "author": {
    "@type": "Person",
    "name": "${author || 'Author Name'}"
  },
  "datePublished": "${datePublished || new Date().toISOString().split('T')[0]}",
  "image": "${image || 'https://yourwebsite.com/image.jpg'}"
}`
    } else if (type === 'Organization') {
      return `
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "${title || 'Your Organization'}",
  "description": "${description || 'Organization description'}",
  "url": "https://yourwebsite.com",
  "logo": "${image || 'https://yourwebsite.com/logo.jpg'}"
}`
    } else if (type === 'LocalBusiness') {
      return `
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "${title || 'Your Business'}",
  "description": "${description || 'Business description'}",
  "image": "${image || 'https://yourwebsite.com/image.jpg'}",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "123 Main St",
    "addressLocality": "City",
    "addressRegion": "State",
    "postalCode": "12345",
    "addressCountry": "US"
  },
  "telephone": "+1-555-123-4567"
}`
    }
  }

  const copySchema = () => {
    navigator.clipboard.writeText(generateSchema())
    alert('Schema markup copied to clipboard!')
  }

  return (
    <div className="tool-page">
      <div className="page-header">
        <h1 className="page-title">🏗️ Schema Markup Generator</h1>
        <p className="page-subtitle">Generate structured data markup for better search engine understanding</p>
      </div>

      <div className="tool-content">
        <div className="tool-form">
          <h2>Configure Your Schema</h2>
          <form>
            <div className="form-group">
              <label htmlFor="type">Schema Type</label>
              <select
                id="type"
                name="type"
                value={formData.type}
                onChange={handleChange}
              >
                <option value="Article">Article</option>
                <option value="Organization">Organization</option>
                <option value="LocalBusiness">Local Business</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="title">Title/Name *</label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Article title, organization name, etc."
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Brief description"
                rows="3"
              />
            </div>

            {formData.type === 'Article' && (
              <>
                <div className="form-group">
                  <label htmlFor="author">Author</label>
                  <input
                    type="text"
                    id="author"
                    name="author"
                    value={formData.author}
                    onChange={handleChange}
                    placeholder="Author name"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="datePublished">Publication Date</label>
                  <input
                    type="date"
                    id="datePublished"
                    name="datePublished"
                    value={formData.datePublished}
                    onChange={handleChange}
                  />
                </div>
              </>
            )}

            <div className="form-group">
              <label htmlFor="image">Image URL</label>
              <input
                type="url"
                id="image"
                name="image"
                value={formData.image}
                onChange={handleChange}
                placeholder="https://yourwebsite.com/image.jpg"
              />
            </div>
          </form>
        </div>

        <div className="tool-output">
          <div className="output-header">
            <h2>Generated Schema Markup</h2>
            <button onClick={copySchema} className="copy-btn">
              📋 Copy to Clipboard
            </button>
          </div>
          <pre className="code-output">
            <code>{generateSchema()}</code>
          </pre>
        </div>
      </div>

      <div className="tool-info">
        <h3>💡 How to Use Schema Markup</h3>
        <ol>
          <li>Copy the generated JSON-LD schema</li>
          <li>Add it to your webpage's <code>&lt;head&gt;</code> section</li>
          <li>Validate your markup using Google's Rich Results Test</li>
          <li>Monitor your search results for rich snippets</li>
        </ol>
      </div>
    </div>
  )
}

export default SchemaMarkupGeneratorPage