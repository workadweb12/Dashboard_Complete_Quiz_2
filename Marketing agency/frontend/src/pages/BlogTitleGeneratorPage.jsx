import React, { useState } from 'react'
import './ToolPage.css'

const BlogTitleGeneratorPage = () => {
  const [formData, setFormData] = useState({
    topic: '',
    keyword: '',
    tone: 'professional'
  })

  const [titles, setTitles] = useState([])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const generateTitles = () => {
    const { topic, keyword, tone } = formData
    const sampleTitles = [
      `The Ultimate Guide to ${keyword || topic}`,
      `10 Proven Strategies for ${topic}`,
      `How to Master ${keyword || topic} in 2024`,
      `${topic}: Everything You Need to Know`,
      `The Beginner's Guide to ${keyword || topic}`,
      `5 Common Mistakes in ${topic} (And How to Avoid Them)`,
      `${keyword || topic}: A Complete Tutorial`,
      `Why ${topic} Matters More Than You Think`,
      `The Secret to Success in ${keyword || topic}`,
      `${topic}: Tips from the Experts`
    ]
    setTitles(sampleTitles)
  }

  const copyTitle = (title) => {
    navigator.clipboard.writeText(title)
    alert('Title copied to clipboard!')
  }

  return (
    <div className="tool-page">
      <div className="page-header">
        <h1 className="page-title">📝 Blog Title Generator</h1>
        <p className="page-subtitle">Create compelling and SEO-friendly blog titles that capture attention</p>
      </div>

      <div className="tool-content">
        <div className="tool-form">
          <h2>Enter Your Blog Topic</h2>
          <form>
            <div className="form-group">
              <label htmlFor="topic">Blog Topic *</label>
              <input
                type="text"
                id="topic"
                name="topic"
                value={formData.topic}
                onChange={handleChange}
                placeholder="e.g., Digital Marketing, Cooking, Technology"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="keyword">Primary Keyword</label>
              <input
                type="text"
                id="keyword"
                name="keyword"
                value={formData.keyword}
                onChange={handleChange}
                placeholder="Main keyword to target"
              />
            </div>

            <div className="form-group">
              <label htmlFor="tone">Tone</label>
              <select
                id="tone"
                name="tone"
                value={formData.tone}
                onChange={handleChange}
              >
                <option value="professional">Professional</option>
                <option value="casual">Casual</option>
                <option value="funny">Funny</option>
                <option value="authoritative">Authoritative</option>
              </select>
            </div>

            <button type="button" onClick={generateTitles} className="generate-btn">
              Generate Titles
            </button>
          </form>
        </div>

        <div className="tool-output">
          <div className="output-header">
            <h2>Generated Blog Titles</h2>
            <span className="title-count">{titles.length} titles</span>
          </div>
          <div className="titles-list">
            {titles.length > 0 ? (
              titles.map((title, index) => (
                <div key={index} className="title-item">
                  <span className="title-text">{title}</span>
                  <button onClick={() => copyTitle(title)} className="copy-title-btn">
                    📋 Copy
                  </button>
                </div>
              ))
            ) : (
              <p className="no-titles">Click "Generate Titles" to see suggestions</p>
            )}
          </div>
        </div>
      </div>

      <div className="tool-info">
        <h3>💡 Tips for Great Blog Titles</h3>
        <ul>
          <li>Keep titles between 50-60 characters for optimal SEO</li>
          <li>Include your primary keyword naturally</li>
          <li>Use power words like "Ultimate," "Proven," "Secret"</li>
          <li>Create curiosity with numbers and questions</li>
          <li>Test different titles to see what resonates with your audience</li>
        </ul>
      </div>
    </div>
  )
}

export default BlogTitleGeneratorPage