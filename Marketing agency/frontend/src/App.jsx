import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Signup from './pages/Signup'
import Login from './pages/Login'
import About from './pages/About'
import Contact from './pages/Contact'
import Tools from './pages/Tools'
import Dashboard from './pages/Dashboard'
import ProtectedRoute from './auth/ProtectedRoute'
import BacklinkCheckerPage from './pages/BacklinkCheckerPage'
import BlogTitleGeneratorPage from './pages/BlogTitleGeneratorPage'
import KeywordSuggestionToolPage from './pages/KeywordSuggestionToolPage'
import MetaTagGeneratorPage from './pages/MetaTagGeneratorPage'
import SchemaMarkupGeneratorPage from './pages/SchemaMarkupGeneratorPage'
import './App.css'

function App() {
  return (
    <Router>
      <div className="app-layout">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route
            	path="/"
            	element={
            		<ProtectedRoute>
            			<Home />
            		</ProtectedRoute>
            	}
            />
            <Route
            	path="/dashboard"
            	element={
            		<ProtectedRoute>
            			<Dashboard />
            		</ProtectedRoute>
            	}
            />
            <Route
            	path="/tools"
            	element={
            		<ProtectedRoute>
            			<Tools />
            		</ProtectedRoute>
            	}
            />
            <Route
            	path="/about"
            	element={
            		<ProtectedRoute>
            			<About />
            		</ProtectedRoute>
            	}
            />
            <Route
            	path="/contact"
            	element={
            		<ProtectedRoute>
            			<Contact />
            		</ProtectedRoute>
            	}
            />
            <Route
            	path="/tools/meta-tags"
            	element={
            		<ProtectedRoute>
            			<MetaTagGeneratorPage />
            		</ProtectedRoute>
            	}
            />
            <Route
            	path="/tools/blog-titles"
            	element={
            		<ProtectedRoute>
            			<BlogTitleGeneratorPage />
            		</ProtectedRoute>
            	}
            />
            <Route
            	path="/tools/schema"
            	element={
            		<ProtectedRoute>
            			<SchemaMarkupGeneratorPage />
            		</ProtectedRoute>
            	}
            />
            <Route
            	path="/tools/keywords"
            	element={
            		<ProtectedRoute>
            			<KeywordSuggestionToolPage />
            		</ProtectedRoute>
            	}
            />
            <Route
            	path="/tools/backlinks"
            	element={
            		<ProtectedRoute>
            			<BacklinkCheckerPage />
            		</ProtectedRoute>
            	}
            />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />

          </Routes>
          
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
