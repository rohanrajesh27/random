import { useEffect, useState } from 'react'
import { useTheme } from '../contexts/ThemeContext'
import './GradientBackground.css'

function GradientBackground() {
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 })
  const { isDarkMode } = useTheme()

  const { isDarkMode } = useTheme()

  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth) * 100
      const y = (e.clientY / window.innerHeight) * 100
      setMousePosition({ x, y })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])
  
  return (
    <div 
      className="gradient-background"
      style={{
        background: isDarkMode
          ? `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(139, 90, 60, 0.15) 0%, rgba(0, 0, 0, 0) 50%)`
          : `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(139, 90, 60, 0.08) 0%, rgba(255, 255, 255, 0) 50%)`
      }}
    />
  )
}

export default GradientBackground



