import { useEffect, useState } from 'react'
import BlurIn from './BlurIn'
import ScrollReveal from './ScrollReveal'
import './HealthcareSection.css'

function HealthcareSection() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <section className={`healthcare-section ${isVisible ? 'visible' : ''}`}>
      <ScrollReveal delay={0} direction="up">
        <div className="healthcare-content">
          <BlurIn delay={0}>
            <h2 className="healthcare-title">Taking Care of You</h2>
          </BlurIn>
          <BlurIn delay={200}>
            <p className="healthcare-description">
              Your passion for healthcare inspires me every day. Here's to taking care of each other, 
              always supporting one another's dreams, and building a healthy, happy life together.
            </p>
          </BlurIn>
          <div className="healthcare-icons">
            <HealthcareIcon emoji="💚" label="Health" delay={300} />
            <HealthcareIcon emoji="❤️" label="Care" delay={400} />
            <HealthcareIcon emoji="🌟" label="Support" delay={500} />
            <HealthcareIcon emoji="🌿" label="Wellness" delay={600} />
          </div>
        </div>
      </ScrollReveal>
    </section>
  )
}

function HealthcareIcon({ emoji, label, delay }) {
  return (
    <BlurIn delay={delay}>
      <div className="healthcare-icon">
        <span className="icon-emoji">{emoji}</span>
        <span className="icon-label">{label}</span>
      </div>
    </BlurIn>
  )
}

export default HealthcareSection

