import React, { useState } from 'react'
import './ToolPage.css'

const MetaTagGeneratorPage = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    keywords: '',
    author: '',
    url: '',
    image: ''
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const generateMetaTags = () => {
    return `
<!-- Primary Meta Tags -->
<title>${formData.title || 'Your Website Title'}</title>
<meta name="title" content="${formData.title || 'Your Website Title'}">
<meta name="description" content="${formData.description || 'Your website description'}">
<meta name="keywords" content="${formData.keywords || 'keywords, seo, website'}">
<meta name="author" content="${formData.author || 'Your Name'}">

<!-- Open Graph / Facebook -->
<meta property="og:type" content="website">
<meta property="og:url" content="${formData.url || 'https://yourwebsite.com/'}">
<meta property="og:title" content="${formData.title || 'Your Website Title'}">
<meta property="og:description" content="${formData.description || 'Your website description'}">
<meta property="og:image" content="${formData.image || 'https://yourwebsite.com/image.jpg'}">

<!-- Twitter -->
<meta property="twitter:card" content="summary_large_image">
<meta property="twitter:url" content="${formData.url || 'https://yourwebsite.com/'}">
<meta property="twitter:title" content="${formData.title || 'Your Website Title'}">
<meta property="twitter:description" content="${formData.description || 'Your website description'}">
<meta property="twitter:image" content="${formData.image || 'https://yourwebsite.com/image.jpg'}">
    `.trim()
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generateMetaTags())
    alert('Meta tags copied to clipboard!')
  }

  return (
    <div className="tool-page">
      <div className="page-header">
        <h1 className="page-title">🏷️ Meta Tag Generator</h1>
        <p className="page-subtitle">Generate comprehensive meta tags for better SEO and social media sharing</p>
      </div>

      <div className="tool-content">
        <div className="tool-form">
          <h2>Enter Your Website Information</h2>
          <form>
            <div className="form-group">
              <label htmlFor="title">Website Title *</label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Your Website Title"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Description *</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Brief description of your website (150-160 characters recommended)"
                rows="3"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="keywords">Keywords</label>
              <input
                type="text"
                id="keywords"
                name="keywords"
                value={formData.keywords}
                onChange={handleChange}
                placeholder="keyword1, keyword2, keyword3"
              />
            </div>

            <div className="form-group">
              <label htmlFor="author">Author</label>
              <input
                type="text"
                id="author"
                name="author"
                value={formData.author}
                onChange={handleChange}
                placeholder="Your Name or Company"
              />
            </div>

            <div className="form-group">
              <label htmlFor="url">Website URL</label>
              <input
                type="url"
                id="url"
                name="url"
                value={formData.url}
                onChange={handleChange}
                placeholder="https://yourwebsite.com"
              />
            </div>

            <div className="form-group">
              <label htmlFor="image">Social Media Image URL</label>
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
            <h2>Generated Meta Tags</h2>
            <button onClick={copyToClipboard} className="copy-btn">
              📋 Copy to Clipboard
            </button>
          </div>
          <pre className="code-output">
            <code>{generateMetaTags()}</code>
          </pre>
        </div>
      </div>

      <div className="tool-info">
        <h3>💡 How to Use These Meta Tags</h3>
        <ol>
          <li>Copy the generated meta tags</li>
          <li>Paste them in the <code>&lt;head&gt;</code> section of your HTML</li>
          <li>Customize the content to match your website</li>
          <li>Test your meta tags using social media debuggers</li>
        </ol>
      </div>
    </div>
  )
}

export default MetaTagGeneratorPage