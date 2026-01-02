import { useState, useEffect } from 'react'
import BlurIn from './BlurIn'
import AnimatedButton from './AnimatedButton'
import './FlightTracker.css'

const FLIGHT_DATE = new Date('2026-01-10T15:30:00').getTime()
const FLIGHT_NUMBER = 'AAL3265'
const FLIGHT_DAY_START = new Date('2026-01-10T00:00:00').getTime() // Start of January 10, 2026

function FlightTracker() {
  const [isVisible, setIsVisible] = useState(false)
  const [showTracker, setShowTracker] = useState(false)
  const [timeUntilFlight, setTimeUntilFlight] = useState(null)
  const [flightStatus, setFlightStatus] = useState('scheduled')

  // Hide the entire component until January 10th
  const now = new Date().getTime()
  if (now < FLIGHT_DAY_START) {
    return null
  }

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 400)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const updateFlightStatus = () => {
      const now = new Date().getTime()
      const flightDistance = FLIGHT_DATE - now

      if (flightDistance <= 0) {
        setFlightStatus('in-flight')
        setShowTracker(true)
        setTimeUntilFlight(null)
      } else {
        const hoursUntilFlight = Math.floor(flightDistance / (1000 * 60 * 60))
        const minutesUntilFlight = Math.floor((flightDistance % (1000 * 60 * 60)) / (1000 * 60))
        
        if (hoursUntilFlight < 24) {
          setShowTracker(true)
          setTimeUntilFlight({ hours: hoursUntilFlight, minutes: minutesUntilFlight })
          setFlightStatus('boarding')
        } else {
          setFlightStatus('scheduled')
          setTimeUntilFlight(null)
        }
      }
    }

    updateFlightStatus()
    const interval = setInterval(updateFlightStatus, 60000) // Update every minute

    return () => clearInterval(interval)
  }, [])

  return (
    <section className={`flight-tracker ${isVisible ? 'visible' : ''}`}>
      <div className="tracker-content">
        <BlurIn delay={0}>
          <h2 className="tracker-title">Live Flight Tracking</h2>
        </BlurIn>
        <div className="tracker-status">
          {flightStatus === 'in-flight' && (
            <StatusMessage
              message="Your flight is in the air!"
              submessage="Track it in real-time below."
              type="active"
            />
          )}
          {flightStatus === 'boarding' && timeUntilFlight && (
            <StatusMessage
              message={`Flight tracking available (${timeUntilFlight.hours}h ${timeUntilFlight.minutes}m until departure)`}
              type="pending"
            />
          )}
          {flightStatus === 'scheduled' && (
            <StatusMessage
              message="Flight tracking will be available on January 10, 2026 when your flight departs."
              type="scheduled"
            />
          )}
        </div>
        {showTracker && (
          <div className="tracker-embed">
            <iframe
              src={`https://www.flightaware.com/live/flight/${FLIGHT_NUMBER}/embed`}
              className="tracker-iframe"
              title="Flight Tracker"
              frameBorder="0"
              allow="geolocation"
            />
          </div>
        )}
        {showTracker && (
          <BlurIn delay={400}>
            <a
              href={`https://www.flightaware.com/live/flight/${FLIGHT_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="tracker-link"
            >
              Open Full Tracker
            </a>
          </BlurIn>
        )}
      </div>
    </section>
  )
}

function StatusMessage({ message, submessage, type }) {
  return (
    <div className={`status-message ${type}`}>
      <p className="status-text">{message}</p>
      {submessage && <p className="status-subtext">{submessage}</p>}
    </div>
  )
}

export default FlightTracker

