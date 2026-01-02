import { useEffect, useRef } from 'react'
import './FloralBackground.css'

function FloralBackground() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    
    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      drawFlowers()
    }
    
    const drawFlowers = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      // Draw subtle floral patterns
      const flowers = [
        { x: canvas.width * 0.1, y: canvas.height * 0.2, size: 30, opacity: 0.05 },
        { x: canvas.width * 0.9, y: canvas.height * 0.3, size: 25, opacity: 0.05 },
        { x: canvas.width * 0.15, y: canvas.height * 0.8, size: 35, opacity: 0.05 },
        { x: canvas.width * 0.85, y: canvas.height * 0.7, size: 28, opacity: 0.05 },
      ]

      flowers.forEach(flower => {
        ctx.save()
        ctx.globalAlpha = flower.opacity
        ctx.fillStyle = '#3d2817'
        ctx.translate(flower.x, flower.y)
        
        // Draw simple flower shape
        for (let i = 0; i < 5; i++) {
          ctx.beginPath()
          ctx.ellipse(0, 0, flower.size * 0.6, flower.size * 0.3, (i * Math.PI * 2) / 5, 0, Math.PI * 2)
          ctx.fill()
        }
        
        // Center
        ctx.beginPath()
        ctx.arc(0, 0, flower.size * 0.2, 0, Math.PI * 2)
        ctx.fillStyle = '#5c3a21'
        ctx.fill()
        
        ctx.restore()
      })
    }

    resize()
    window.addEventListener('resize', resize)
    return () => window.removeEventListener('resize', resize)
  }, [])

  return <canvas ref={canvasRef} className="floral-background" />
}

export default FloralBackground

