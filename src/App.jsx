import { useState, useEffect } from 'react'
import PasswordScreen from './components/PasswordScreen'
import CountdownPage from './components/CountdownPage'
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
    return null
  }

  return (
    <div className="app">
      {!isAuthenticated ? (
        <PasswordScreen onAuth={handleAuth} />
      ) : (
        <CountdownPage />
      )}
    </div>
  )
}

export default App

