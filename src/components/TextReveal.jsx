import { useEffect, useState } from 'react'
import './TextReveal.css'

function TextReveal({ text, delay = 0 }) {
  const [revealed, setRevealed] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setRevealed(true), delay)
    return () => clearTimeout(timer)
  }, [delay])

  return (
    <span className={`text-reveal ${revealed ? 'revealed' : ''}`}>
      {text}
    </span>
  )
}

function TextRevealWord({ text, delay = 0 }) {
  const [revealed, setRevealed] = useState(false)
  const words = text.split(' ')

  useEffect(() => {
    const timer = setTimeout(() => setRevealed(true), delay)
    return () => clearTimeout(timer)
  }, [delay])

  return (
    <span className="text-reveal-word">
      {words.map((word, i) => (
        <span
          key={i}
          className={`text-reveal-word-item ${revealed ? 'revealed' : ''}`}
          style={{ transitionDelay: `${i * 0.1}s` }}
        >
          {word}{' '}
        </span>
      ))}
    </span>
  )
}

export { TextReveal, TextRevealWord }



