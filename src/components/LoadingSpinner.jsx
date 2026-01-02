import './LoadingSpinner.css'

function LoadingSpinner({ size = 'medium' }) {
  return (
    <div className={`loading-spinner loading-spinner-${size}`}>
      <div className="spinner-ring"></div>
      <div className="spinner-ring"></div>
      <div className="spinner-ring"></div>
    </div>
  )
}

export default LoadingSpinner


