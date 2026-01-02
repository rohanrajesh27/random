import { useState, useEffect } from 'react'
import HoverCard from './HoverCard'
import BlurIn from './BlurIn'
import PhotoUpload from './PhotoUpload'
import './ImageGallery.css'

// Dynamically import all images from assets folder using Vite's glob import
const imageModules = import.meta.glob('/src/assets/*.{jpg,jpeg,JPG,JPEG,png,PNG,gif,GIF,webp,WEBP}', { eager: true })

// Convert the modules to an array of image URLs
const staticImages = Object.values(imageModules).map(module => module.default)

function ImageGallery() {
  const [isVisible, setIsVisible] = useState(false)
  const [selectedImage, setSelectedImage] = useState(null)
  const [uploadedImages, setUploadedImages] = useState([])
  const [allImages, setAllImages] = useState(staticImages)

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 600)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    // Load uploaded photos from localStorage
    const savedPhotos = JSON.parse(localStorage.getItem('uploadedPhotos') || '[]')
    const uploadedUrls = savedPhotos.map(photo => photo.data)
    setUploadedImages(uploadedUrls)
    setAllImages([...staticImages, ...uploadedUrls])
  }, [])

  const handlePhotosAdded = (newPhotos) => {
    const newUrls = newPhotos.map(photo => photo.data)
    setUploadedImages(prev => [...prev, ...newUrls])
    setAllImages(prev => [...prev, ...newUrls])
  }

  return (
    <section className={`image-gallery ${isVisible ? 'visible' : ''}`}>
      <div className="gallery-content">
        <BlurIn delay={0}>
          <h2 className="gallery-title">Our Memories</h2>
        </BlurIn>
        <PhotoUpload onPhotosAdded={handlePhotosAdded} />
        {allImages.length > 0 && (
          <div className="gallery-grid">
            {allImages.map((image, index) => (
            <HoverCard key={index} className="gallery-card-wrapper">
              <GalleryImage
                src={image}
                index={index}
                onClick={() => setSelectedImage(image)}
              />
            </HoverCard>
          ))}
          </div>
        )}
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
