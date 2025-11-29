import React, { useState } from 'react'
import './ToolPage.css'

const KeywordSuggestionToolPage = () => {
  const [formData, setFormData] = useState({
    seedKeyword: '',
    location: '',
    language: 'en'
  })

  const [keywords, setKeywords] = useState([])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const generateKeywords = () => {
    const { seedKeyword } = formData
    const sampleKeywords = [
      { keyword: `${seedKeyword} guide`, volume: '12,000', difficulty: 'Medium' },
      { keyword: `how to ${seedKeyword}`, volume: '8,500', difficulty: 'Easy' },
      { keyword: `${seedKeyword} tips`, volume: '15,000', difficulty: 'Medium' },
      { keyword: `best ${seedKeyword}`, volume: '22,000', difficulty: 'Hard' },
      { keyword: `${seedKeyword} tutorial`, volume: '6,000', difficulty: 'Easy' },
      { keyword: `${seedKeyword} for beginners`, volume: '9,500', difficulty: 'Medium' },
      { keyword: `free ${seedKeyword}`, volume: '18,000', difficulty: 'Hard' },
      { keyword: `${seedKeyword} software`, volume: '11,000', difficulty: 'Medium' },
      { keyword: `${seedKeyword} tools`, volume: '7,500', difficulty: 'Easy' },
      { keyword: `${seedKeyword} examples`, volume: '5,000', difficulty: 'Easy' }
    ]
    setKeywords(sampleKeywords)
  }

  const copyKeyword = (keyword) => {
    navigator.clipboard.writeText(keyword)
    alert('Keyword copied to clipboard!')
  }

  return (
    <div className="tool-page">
      <div className="page-header">
        <h1 className="page-title">🔍 Keyword Suggestion Tool</h1>
        <p className="page-subtitle">Discover high-value keywords to boost your search visibility</p>
      </div>

      <div className="tool-content">
        <div className="tool-form">
          <h2>Enter Your Seed Keyword</h2>
          <form>
            <div className="form-group">
              <label htmlFor="seedKeyword">Seed Keyword *</label>
              <input
                type="text"
                id="seedKeyword"
                name="seedKeyword"
                value={formData.seedKeyword}
                onChange={handleChange}
                placeholder="e.g., digital marketing, cooking recipes"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="location">Target Location</label>
              <select
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
              >
                <option value="">Global</option>
                <option value="us">United States</option>
                <option value="uk">United Kingdom</option>
                <option value="ca">Canada</option>
                <option value="au">Australia</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="language">Language</label>
              <select
                id="language"
                name="language"
                value={formData.language}
                onChange={handleChange}
              >
                <option value="en">English</option>
                <option value="es">Spanish</option>
                <option value="fr">French</option>
                <option value="de">German</option>
              </select>
            </div>

            <button type="button" onClick={generateKeywords} className="generate-btn">
              Generate Keywords
            </button>
          </form>
        </div>

        <div className="tool-output">
          <div className="output-header">
            <h2>Suggested Keywords</h2>
            <span className="title-count">{keywords.length} keywords</span>
          </div>
          <div className="keywords-list">
            {keywords.length > 0 ? (
              <table className="keywords-table">
                <thead>
                  <tr>
                    <th>Keyword</th>
                    <th>Search Volume</th>
                    <th>Difficulty</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {keywords.map((item, index) => (
                    <tr key={index}>
                      <td className="keyword-cell">{item.keyword}</td>
                      <td className="volume-cell">{item.volume}</td>
                      <td className={`difficulty-cell ${item.difficulty.toLowerCase()}`}>
                        {item.difficulty}
                      </td>
                      <td>
                        <button 
                          onClick={() => copyKeyword(item.keyword)} 
                          className="copy-keyword-btn"
                        >
                          📋
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="no-keywords">Enter a seed keyword and click "Generate Keywords"</p>
            )}
          </div>
        </div>
      </div>

      <div className="tool-info">
        <h3>💡 Keyword Research Tips</h3>
        <ul>
          <li>Focus on long-tail keywords (3+ words) for better targeting</li>
          <li>Look for keywords with medium difficulty for easier ranking</li>
          <li>Consider user intent when selecting keywords</li>
          <li>Use keywords naturally in your content</li>
          <li>Monitor keyword performance and adjust your strategy</li>
        </ul>
      </div>
    </div>
  )
}

export default KeywordSuggestionToolPage