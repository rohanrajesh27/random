import { useTheme } from '../contexts/ThemeContext'
import './DarkModeToggle.css'

function DarkModeToggle() {
  const { isDarkMode, toggleTheme } = useTheme()

  return (
    <button
      className={`dark-mode-toggle ${isDarkMode ? 'dark' : ''}`}
      onClick={toggleTheme}
      aria-label="Toggle dark mode"
    >
      <span className="toggle-icon">
        {isDarkMode ? '☀️' : '🌙'}
      </span>
    </button>
  )
}

export default DarkModeToggle

