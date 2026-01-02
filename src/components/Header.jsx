import { useEffect, useState } from 'react'
import './Header.css'

function Header() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <header className={`header ${isVisible ? 'visible' : ''}`}>
      <div className="header-content">
        <h1 className="header-title">Counting Down to You</h1>
        <p className="header-subtitle">Saturday, January 10, 2026 at 6:00 PM</p>
      </div>
    </header>
  )
}

export default Header

