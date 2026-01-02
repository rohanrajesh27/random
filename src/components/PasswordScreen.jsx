import { useState, useEffect, useRef } from 'react'
import './PasswordScreen.css'

const CORRECT_PASSWORD = '8/22'

function PasswordScreen({ onAuth }) {
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)
  const [shake, setShake] = useState(false)
  const inputRef = useRef(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(false), 2000)
      return () => clearTimeout(timer)
    }
  }, [error])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (password === CORRECT_PASSWORD) {
      onAuth()
    } else {
      setError(true)
      setShake(true)
      setPassword('')
      setTimeout(() => setShake(false), 500)
    }
  }

  return (
    <div className="password-screen">
      <div className="password-container">
        <div className="password-content">
          <h1 className="password-title">Welcome</h1>
          <form onSubmit={handleSubmit} className="password-form">
            <input
              ref={inputRef}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`password-input ${shake ? 'shake' : ''} ${error ? 'error' : ''}`}
              placeholder="Enter password"
            />
            <button type="submit" className="password-button">
              Enter
            </button>
            {error && (
              <div className="error-message">
                Incorrect password. Please try again.
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  )
}

export default PasswordScreen

