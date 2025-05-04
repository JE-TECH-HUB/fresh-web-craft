
import React from 'react'
import './App.css'

function App() {
  return (
    <div className="app">
      <h1>JE TechHub React Application</h1>
      <p>This React app will serve as the admin dashboard for JE TechHub.</p>
      <p>To access the main website, please navigate to the HTML pages.</p>
      <div className="links">
        <a href="/" className="link">Home</a>
        <a href="/about.html" className="link">About</a>
        <a href="/programs.html" className="link">Programs</a>
        <a href="/contact.html" className="link">Contact</a>
        <a href="/getStarted.html" className="link">Get Started</a>
        <a href="/dashboard.html" className="link">Dashboard</a>
      </div>
    </div>
  )
}

export default App
