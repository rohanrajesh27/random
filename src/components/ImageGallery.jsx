import { useState, useEffect } from 'react'
import './ImageGallery.css'

// This would normally fetch from a directory, but for now we'll use a placeholder
// You can add images to src/assets/images/ and they'll be imported here
const IMAGE_PATTERNS = ['*.jpg', '*.jpeg', '*.png', '*.gif', '*.webp']

function ImageGallery() {
  const [isVisible, setIsVisible] = useState(false)
  const [images, setImages] = useState([])
  const [selectedImage, setSelectedImage] = useState(null)

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 600)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    // Try to load images from public directory
    // In a real app, you'd want to use an API or import them
    loadImages()
  }, [])

  const loadImages = async () => {
    try {
      // Check if images directory exists and load images
      // For now, we'll create a placeholder that shows when no images are found
      // Users can add images to public/images/ folder
      const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp']
      // This is a placeholder - in production you'd fetch from an API
      setImages([])
    } catch (error) {
      console.log('No images found or error loading images')
    }
  }

  if (images.length === 0) {
    return null // Don't show gallery if no images
  }

  return (
    <section className={`image-gallery ${isVisible ? 'visible' : ''}`}>
      <div className="gallery-content">
        <h2 className="gallery-title">Our Memories</h2>
        <div className="gallery-grid">
          {images.map((image, index) => (
            <GalleryImage
              key={index}
              src={image}
              index={index}
              onClick={() => setSelectedImage(image)}
            />
          ))}
        </div>
      </div>
      {selectedImage && (
        <ImageModal
          src={selectedImage}
          onClose={() => setSelectedImage(null)}
        />
      )}
    </section>
  )
}

function GalleryImage({ src, index, onClick }) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 700 + index * 50)
    return () => clearTimeout(timer)
  }, [index])

  return (
    <div
      className={`gallery-item ${isVisible ? 'visible' : ''} ${isLoaded ? 'loaded' : ''}`}
      onClick={onClick}
    >
      <img
        src={src}
        alt={`Memory ${index + 1}`}
        onLoad={() => setIsLoaded(true)}
        className="gallery-image"
      />
    </div>
  )
}

function ImageModal({ src, onClose }) {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleEscape)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [onClose])

  return (
    <div className="image-modal" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          ×
        </button>
        <img src={src} alt="Full size" className="modal-image" />
      </div>
    </div>
  )
}

export default ImageGallery

