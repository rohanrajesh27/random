import { useEffect, useState } from 'react'
import { TextRevealWord } from './TextReveal'
import BlurIn from './BlurIn'
import './Header.css'

function Header() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <header className={`header ${isVisible ? 'visible' : ''}`}>
      <div className="header-content">
        <BlurIn delay={0}>
          <h1 className="header-title">
            <TextRevealWord text="Counting Down to You" delay={0} />
          </h1>
        </BlurIn>
        <BlurIn delay={300}>
          <p className="header-subtitle">Saturday, January 10, 2026 at 6:00 PM</p>
        </BlurIn>
      </div>
    </header>
  )
}

export default Header

