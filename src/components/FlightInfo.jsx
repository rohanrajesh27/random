import { useEffect, useState } from 'react'
import HoverCard from './HoverCard'
import BlurIn from './BlurIn'
import './FlightInfo.css'

function FlightInfo() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 200)
    return () => clearTimeout(timer)
  }, [])

  const flightData = {
    date: 'Saturday, January 10, 2026',
    departure: {
      code: 'DCA',
      name: 'Washington Reagan',
      time: '3:30 PM',
    },
    arrival: {
      code: 'STL',
      name: 'St Louis',
      time: '5:02 PM',
    },
    flightNumber: 'AA 3265',
    seat: '19C',
    class: 'Economy (Y)',
  }

  return (
    <section className={`flight-info ${isVisible ? 'visible' : ''}`}>
      <div className="flight-content">
        <BlurIn delay={0}>
          <h2 className="flight-title">Your Flight Details</h2>
        </BlurIn>
        <div className="flight-route">
          <BlurIn delay={100}>
            <AirportDisplay airport={flightData.departure} type="departure" />
          </BlurIn>
          <FlightArrow />
          <BlurIn delay={200}>
            <AirportDisplay airport={flightData.arrival} type="arrival" />
          </BlurIn>
        </div>
        <HoverCard>
          <FlightDetails flightData={flightData} />
        </HoverCard>
      </div>
    </section>
  )
}

function AirportDisplay({ airport, type }) {
  return (
    <div className={`airport-display ${type}`}>
      <div className="airport-code">{airport.code}</div>
      <div className="airport-name">{airport.name}</div>
      <div className="airport-time">{airport.time}</div>
    </div>
  )
}

function FlightArrow() {
  return (
    <div className="flight-arrow">
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
        <path
          d="M15 10L25 20L15 30"
          stroke="#86868b"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  )
}

function FlightDetails({ flightData }) {
  const details = [
    { label: 'Flight Number', value: flightData.flightNumber },
    { label: 'Date', value: flightData.date },
    { label: 'Departure', value: `${flightData.departure.code} - ${flightData.departure.time}` },
    { label: 'Arrival', value: `${flightData.arrival.code} - ${flightData.arrival.time}` },
    { label: 'Seat', value: flightData.seat },
    { label: 'Class', value: flightData.class },
  ]

  return (
    <div className="flight-details">
      {details.map((detail, index) => (
        <DetailRow key={index} label={detail.label} value={detail.value} index={index} />
      ))}
    </div>
  )
}

function DetailRow({ label, value, index }) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 400 + index * 50)
    return () => clearTimeout(timer)
  }, [index])

  return (
    <div className={`detail-row ${isVisible ? 'visible' : ''}`}>
      <span className="detail-label">{label}</span>
      <span className="detail-value">{value}</span>
    </div>
  )
}

export default FlightInfo

