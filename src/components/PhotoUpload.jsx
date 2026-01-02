import { useState, useRef } from 'react'
import AnimatedButton from './AnimatedButton'
import BlurIn from './BlurIn'
import './PhotoUpload.css'

function PhotoUpload({ onPhotosAdded }) {
  const [isDragging, setIsDragging] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef(null)

  const handleFileSelect = async (files) => {
    if (!files || files.length === 0) return

    setIsUploading(true)
    const uploadedPhotos = []

    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      if (file.type.startsWith('image/')) {
        try {
          const base64 = await fileToBase64(file)
          const photoData = {
            id: Date.now() + i,
            name: file.name,
            data: base64,
            uploadedAt: new Date().toISOString(),
          }
          uploadedPhotos.push(photoData)
        } catch (error) {
          console.error('Error processing image:', error)
        }
      }
    }

    if (uploadedPhotos.length > 0) {
      const existingPhotos = JSON.parse(localStorage.getItem('uploadedPhotos') || '[]')
      const updatedPhotos = [...existingPhotos, ...uploadedPhotos]
      localStorage.setItem('uploadedPhotos', JSON.stringify(updatedPhotos))
      onPhotosAdded?.(uploadedPhotos)
    }

    setIsUploading(false)
  }

  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result)
      reader.onerror = (error) => reject(error)
    })
  }

  const handleDragEnter = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)

    const files = Array.from(e.dataTransfer.files)
    handleFileSelect(files)
  }

  const handleFileInputChange = (e) => {
    const files = Array.from(e.target.files)
    handleFileSelect(files)
    e.target.value = '' // Reset input
  }

  const handleButtonClick = () => {
    fileInputRef.current?.click()
  }

  return (
    <BlurIn delay={0}>
      <div className="photo-upload">
        <div
          className={`upload-area ${isDragging ? 'dragging' : ''} ${isUploading ? 'uploading' : ''}`}
          onDragEnter={handleDragEnter}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileInputChange}
            className="file-input"
          />
          <div className="upload-content">
            {isUploading ? (
              <>
                <div className="upload-icon">⏳</div>
                <p className="upload-text">Uploading photos...</p>
              </>
            ) : (
              <>
                <div className="upload-icon">📸</div>
                <p className="upload-text">
                  Drag and drop photos here, or click to select
                </p>
                <p className="upload-hint">Add your favorite memories</p>
                <AnimatedButton variant="primary" onClick={handleButtonClick}>
                  Choose Photos
                </AnimatedButton>
              </>
            )}
          </div>
        </div>
      </div>
    </BlurIn>
  )
}

export default PhotoUpload

