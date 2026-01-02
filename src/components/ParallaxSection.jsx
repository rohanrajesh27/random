import { useEffect, useRef, useState } from 'react'
import './ParallaxSection.css'

function ParallaxSection({ children, speed = 0.5 }) {
  const [offset, setOffset] = useState(0)
  const ref = useRef(null)

  useEffect(() => {
    const handleScroll = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect()
        const scrolled = window.pageYOffset
        const parallax = scrolled * speed
        setOffset(parallax)
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [speed])

  return (
    <div
      ref={ref}
      className="parallax-section"
      style={{ transform: `translateY(${offset}px)` }}
    >
      {children}
    </div>
  )
}

export default ParallaxSection



