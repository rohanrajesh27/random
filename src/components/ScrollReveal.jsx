import { useEffect, useRef, useState } from 'react'
import './ScrollReveal.css'

function ScrollReveal({ children, delay = 0, direction = 'up' }) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay)
        }
      },
      { threshold: 0.1 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [delay])

  return (
    <div
      ref={ref}
      className={`scroll-reveal scroll-reveal-${direction} ${isVisible ? 'visible' : ''}`}
    >
      {children}
    </div>
  )
}

export default ScrollReveal

