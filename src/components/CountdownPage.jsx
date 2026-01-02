import { useEffect, useState } from 'react'
import CountdownTimer from './CountdownTimer'
import FlightInfo from './FlightInfo'
import FlightTracker from './FlightTracker'
import ImageGallery from './ImageGallery'
import Header from './Header'
import './CountdownPage.css'

function CountdownPage() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <div className={`countdown-page ${isVisible ? 'visible' : ''}`}>
      <Header />
      <CountdownTimer />
      <FlightInfo />
      <FlightTracker />
      <ImageGallery />
    </div>
  )
}

export default CountdownPage

