import { useState, useEffect } from 'react'
import './ImageGallery.css'

// Dynamically import all images from assets folder using Vite's glob import
const imageModules = import.meta.glob('/src/assets/*.{jpg,jpeg,JPG,JPEG,png,PNG,gif,GIF,webp,WEBP}', { eager: true })

// Convert the modules to an array of image URLs
const images = Object.values(imageModules).map(module => module.default)

function ImageGallery() {
  const [isVisible, setIsVisible] = useState(false)
  const [selectedImage, setSelectedImage] = useState(null)

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 600)
    return () => clearTimeout(timer)
  }, [])

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
    const timer = setTimeout(() => setIsVisible(true), 700 + index * 30)
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
        loading="lazy"
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
