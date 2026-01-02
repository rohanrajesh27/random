import { useEffect, useState } from 'react'
import CountdownTimer from './CountdownTimer'
import FlightInfo from './FlightInfo'
import FlightTracker from './FlightTracker'
import ImageGallery from './ImageGallery'
import Header from './Header'
import ParticleBackground from './ParticleBackground'
import FloralBackground from './FloralBackground'
import ScrollReveal from './ScrollReveal'
import './CountdownPage.css'

function CountdownPage() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <div className={`countdown-page ${isVisible ? 'visible' : ''}`}>
      <ParticleBackground particleCount={30} />
      <FloralBackground />
      <ScrollReveal delay={0} direction="up">
        <Header />
      </ScrollReveal>
      <ScrollReveal delay={100} direction="up">
        <CountdownTimer />
      </ScrollReveal>
      <ScrollReveal delay={200} direction="up">
        <FlightInfo />
      </ScrollReveal>
      <ScrollReveal delay={300} direction="up">
        <FlightTracker />
      </ScrollReveal>
      <ScrollReveal delay={400} direction="up">
        <ImageGallery />
      </ScrollReveal>
    </div>
  )
}

export default CountdownPage

