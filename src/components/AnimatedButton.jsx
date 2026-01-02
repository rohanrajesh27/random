import { useState, useRef, useEffect } from 'react'
import './AnimatedButton.css'

function AnimatedButton({ children, onClick, variant = 'primary' }) {
  const [ripples, setRipples] = useState([])
  const buttonRef = useRef(null)

  const handleClick = (e) => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      const newRipple = { x, y, id: Date.now() }
      setRipples([...ripples, newRipple])

      setTimeout(() => {
        setRipples(prev => prev.filter(r => r.id !== newRipple.id))
      }, 600)
    }

    onClick?.(e)
  }

  return (
    <button
      ref={buttonRef}
      className={`animated-button animated-button-${variant}`}
      onClick={handleClick}
    >
      {children}
      {ripples.map(ripple => (
        <span
          key={ripple.id}
          className="ripple"
          style={{
            left: ripple.x,
            top: ripple.y,
          }}
        />
      ))}
    </button>
  )
}

export default AnimatedButton

