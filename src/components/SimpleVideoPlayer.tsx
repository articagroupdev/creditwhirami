'use client'

import React, { useState, useRef, useEffect } from 'react'

interface SimpleVideoPlayerProps {
  src: string
  className?: string
}

const SimpleVideoPlayer: React.FC<SimpleVideoPlayerProps> = ({ src, className = '' }) => {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    // Video player mounted
  }, [src])

  const handleLoadStart = () => {
    console.log('Video load started:', src)
    setIsLoading(true)
    setHasError(false)
  }

  const handleLoadedMetadata = () => {
    console.log('Video metadata loaded:', src)
    setIsLoading(false)
  }

  const handleCanPlay = () => {
    console.log('Video can play:', src)
    setIsLoading(false)
  }

  const handleError = (e: React.SyntheticEvent<HTMLVideoElement, Event>) => {
    const video = e.target as HTMLVideoElement
    const error = video.error
    
    console.error('Video error:', error)
    console.error('Video src:', src)
    console.error('Video networkState:', video.networkState)
    console.error('Video readyState:', video.readyState)
    
    let message = 'Unknown error'
    if (error) {
      switch (error.code) {
        case 1:
          message = 'Video loading aborted'
          break
        case 2:
          message = 'Network error'
          break
        case 3:
          message = 'Video decoding error'
          break
        case 4:
          message = 'Video format not supported'
          break
        default:
          message = `Error code: ${error.code}`
      }
    }
    
    setErrorMessage(message)
    setHasError(true)
    setIsLoading(false)
  }

  const handleLoadedData = () => {
    console.log('Video data loaded:', src)
    setIsLoading(false)
    setHasError(false)
  }

  if (hasError) {
    return (
      <div className={`flex items-center justify-center bg-gray-900 rounded-xl ${className}`}>
        <div className="text-center text-white p-8">
          <div className="w-16 h-16 mx-auto mb-4 bg-red-500 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold mb-2">Video Error</h3>
          <p className="text-gray-400 text-sm mb-2">{errorMessage}</p>
          <p className="text-gray-500 text-xs">Source: {src}</p>
          <button 
            onClick={() => {
              setHasError(false)
              setIsLoading(true)
              if (videoRef.current) {
                videoRef.current.load()
              }
            }}
            className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm"
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className={`relative ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-900 rounded-xl z-10">
          <div className="text-center text-white">
            <div className="w-8 h-8 mx-auto mb-2 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            <p className="text-sm">Loading video...</p>
          </div>
        </div>
      )}
      
      <video
        ref={videoRef}
        className="w-full h-full rounded-xl"
        controls
        preload="metadata"
        onLoadStart={handleLoadStart}
        onLoadedMetadata={handleLoadedMetadata}
        onCanPlay={handleCanPlay}
        onLoadedData={handleLoadedData}
        onError={handleError}
        style={{
          borderRadius: '0.75rem'
        }}
      >
        <source src={src} type="video/mp4" />
        <p>Your browser does not support the video tag.</p>
      </video>
      
    </div>
  )
}

export default SimpleVideoPlayer
