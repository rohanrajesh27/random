import { useState, useEffect } from 'react'
import PasswordScreen from './components/PasswordScreen'
import CountdownPage from './components/CountdownPage'
import GradientBackground from './components/GradientBackground'
import LoadingSpinner from './components/LoadingSpinner'
import DarkModeToggle from './components/DarkModeToggle'
import './App.css'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if already authenticated (persisted in sessionStorage)
    const auth = sessionStorage.getItem('authenticated')
    if (auth === 'true') {
      setIsAuthenticated(true)
    }
    setIsLoading(false)
  }, [])

  const handleAuth = () => {
    setIsAuthenticated(true)
    sessionStorage.setItem('authenticated', 'true')
  }

  if (isLoading) {
    return (
      <div className="app-loading">
        <LoadingSpinner size="large" />
      </div>
    )
  }

  return (
    <div className="app">
      <GradientBackground />
      <DarkModeToggle />
      {!isAuthenticated ? (
        <PasswordScreen onAuth={handleAuth} />
      ) : (
        <CountdownPage />
      )}
    </div>
  )
}

export default App

