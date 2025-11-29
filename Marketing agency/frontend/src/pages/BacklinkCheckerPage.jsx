import React, { useState } from 'react'
import './ToolPage.css'

const BacklinkCheckerPage = () => {
  const [formData, setFormData] = useState({
    domain: '',
    depth: '50'
  })

  const [results, setResults] = useState(null)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const checkBacklinks = () => {
    const { domain } = formData
    setResults({
      domain,
      totalBacklinks: 1247,
      referringDomains: 89,
      domainAuthority: 65,
      topBacklinks: [
        { url: 'https://example1.com', domain: 'example1.com', anchor: 'digital marketing', authority: 85 },
        { url: 'https://example2.com', domain: 'example2.com', anchor: 'SEO services', authority: 72 },
        { url: 'https://example3.com', domain: 'example3.com', anchor: 'marketing agency', authority: 68 },
        { url: 'https://example4.com', domain: 'example4.com', anchor: 'website optimization', authority: 75 },
        { url: 'https://example5.com', domain: 'example5.com', anchor: 'content marketing', authority: 70 }
      ]
    })
  }

  const copyUrl = (url) => {
    navigator.clipboard.writeText(url)
    alert('URL copied to clipboard!')
  }

  return (
    <div className="tool-page">
      <div className="page-header">
        <h1 className="page-title">🔗 Backlink Checker</h1>
        <p className="page-subtitle">Analyze your website's backlink profile and discover link opportunities</p>
      </div>

      <div className="tool-content">
        <div className="tool-form">
          <h2>Enter Domain to Analyze</h2>
          <form>
            <div className="form-group">
              <label htmlFor="domain">Domain *</label>
              <input
                type="text"
                id="domain"
                name="domain"
                value={formData.domain}
                onChange={handleChange}
                placeholder="example.com (without http://)"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="depth">Analysis Depth</label>
              <select
                id="depth"
                name="depth"
                value={formData.depth}
                onChange={handleChange}
              >
                <option value="25">25 backlinks</option>
                <option value="50">50 backlinks</option>
                <option value="100">100 backlinks</option>
              </select>
            </div>

            <button type="button" onClick={checkBacklinks} className="generate-btn">
              Check Backlinks
            </button>
          </form>
        </div>

        <div className="tool-output">
          <div className="output-header">
            <h2>Backlink Analysis</h2>
            <span className="title-count">{results ? 'Complete' : 'Pending'}</span>
          </div>
          <div className="backlink-results">
            {results ? (
              <div>
                <div className="backlink-stats">
                  <div className="stat-card">
                    <div className="stat-number">{results.totalBacklinks.toLocaleString()}</div>
                    <div className="stat-label">Total Backlinks</div>
                  </div>
                  <div className="stat-card">
                    <div className="stat-number">{results.referringDomains}</div>
                    <div className="stat-label">Referring Domains</div>
                  </div>
                  <div className="stat-card">
                    <div className="stat-number">{results.domainAuthority}</div>
                    <div className="stat-label">Domain Authority</div>
                  </div>
                </div>

                <div className="top-backlinks">
                  <h3>Top Backlinks</h3>
                  <div className="backlinks-list">
                    {results.topBacklinks.map((backlink, index) => (
                      <div key={index} className="backlink-item">
                        <div className="backlink-info">
                          <div className="backlink-url">{backlink.url}</div>
                          <div className="backlink-details">
                            <span className="domain">{backlink.domain}</span>
                            <span className="anchor">"{backlink.anchor}"</span>
                            <span className={`authority ${backlink.authority > 70 ? 'high' : backlink.authority > 50 ? 'medium' : 'low'}`}>
                              DA: {backlink.authority}
                            </span>
                          </div>
                        </div>
                        <button onClick={() => copyUrl(backlink.url)} className="copy-url-btn">
                          📋
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <p className="no-results">Enter a domain and click "Check Backlinks" to see analysis</p>
            )}
          </div>
        </div>
      </div>

      <div className="tool-info">
        <h3>💡 Understanding Your Backlink Profile</h3>
        <ul>
          <li><strong>Domain Authority (DA):</strong> Higher DA indicates stronger domain power</li>
          <li><strong>Quality over Quantity:</strong> Few high-quality backlinks are better than many low-quality ones</li>
          <li><strong>Anchor Text Diversity:</strong> Use varied anchor text to avoid over-optimization</li>
          <li><strong>Relevance:</strong> Backlinks from related domains carry more SEO value</li>
          <li><strong>Regular Monitoring:</strong> Check your backlink profile monthly for changes</li>
        </ul>
      </div>
    </div>
  )
}

export default BacklinkCheckerPage