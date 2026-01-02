import { useState, useEffect, useRef } from 'react'
import './CountdownTimer.css'

// Flight lands at 5:02 PM CST (St. Louis) on January 10, 2026
// CST is UTC-6, so 5:02 PM CST = 11:02 PM UTC = 2026-01-11T00:02:00Z (UTC)
// Or using CST directly: 2026-01-10T17:02:00-06:00
const TARGET_DATE = new Date('2026-01-10T17:02:00-06:00').getTime()

function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })
  const [isVisible, setIsVisible] = useState(false)
  const [hasMounted, setHasMounted] = useState(false)
  const intervalRef = useRef(null)

  useEffect(() => {
    setHasMounted(true)
    setIsVisible(true)

    const updateCountdown = () => {
      const now = new Date().getTime()
      const distance = TARGET_DATE - now

      if (distance < 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
        return
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      })
    }

    updateCountdown()
    intervalRef.current = setInterval(updateCountdown, 1000)

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [])

  if (!hasMounted) return null

  return (
    <section className={`countdown-timer ${isVisible ? 'visible' : ''}`}>
      <div className="countdown-content">
        <h2 className="countdown-title">Time Until We're Together</h2>
        <div className="countdown-grid">
          <CountdownUnit value={timeLeft.days} label="Days" delay={0.1} />
          <CountdownUnit value={timeLeft.hours} label="Hours" delay={0.2} />
          <CountdownUnit value={timeLeft.minutes} label="Minutes" delay={0.3} />
          <CountdownUnit value={timeLeft.seconds} label="Seconds" delay={0.4} />
        </div>
      </div>
    </section>
  )
}

function CountdownUnit({ value, label, delay }) {
  const [isVisible, setIsVisible] = useState(false)
  const [prevValue, setPrevValue] = useState(value)
  const [pulse, setPulse] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay * 1000)
    return () => clearTimeout(timer)
  }, [delay])

  useEffect(() => {
    if (prevValue !== value) {
      setPulse(true)
      setPrevValue(value)
      const timer = setTimeout(() => setPulse(false), 300)
      return () => clearTimeout(timer)
    }
  }, [value, prevValue])

  return (
    <div className={`countdown-unit ${isVisible ? 'visible' : ''}`}>
      <div className={`countdown-number ${pulse ? 'pulse' : ''}`}>
        {value.toString().padStart(2, '0')}
      </div>
      <div className="countdown-label">{label}</div>
    </div>
  )
}

export default CountdownTimer

