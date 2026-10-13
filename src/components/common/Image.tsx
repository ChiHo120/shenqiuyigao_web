import React, { useState } from 'react'

interface ImageProps {
  src: string | null
  alt: string
  className?: string
  fallback?: string
  aspectRatio?: '16/9' | '4/3' | '1/1' | '3/4'
  lazy?: boolean
}

const aspectRatioClasses: Record<string, string> = {
  '16/9': 'aspect-video',
  '4/3': 'aspect-[4/3]',
  '1/1': 'aspect-square',
  '3/4': 'aspect-[3/4]',
}

const fallbackImages: Record<string, string> = {
  hero: '/images/placeholder.svg',
  campus: '/images/placeholder.svg',
  news: '/images/placeholder.svg',
  teacher: '/images/placeholder.svg',
  activity: '/images/placeholder.svg',
  history: '/images/placeholder.svg',
  honor: '/images/placeholder.svg',
}

export const Image: React.FC<ImageProps> = ({
  src,
  alt,
  className = '',
  fallback = '/images/placeholder.svg',
  aspectRatio = '16/9',
  lazy = true,
}) => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)

  const handleLoad = () => {
    setIsLoaded(true)
  }

  const handleError = () => {
    setHasError(true)
  }

  const finalSrc = hasError ? fallback : src

  return (
    <div
      className={`overflow-hidden bg-gray-100 ${aspectRatioClasses[aspectRatio]} ${className}`}
    >
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
          <div className="w-8 h-8 border-4 border-school-red border-t-transparent rounded-full animate-spin" />
        </div>
      )}
      <img
        src={finalSrc || fallback}
        alt={alt}
        className={`w-full h-full object-cover transition-opacity duration-300 ${
          isLoaded || hasError ? 'opacity-100' : 'opacity-0'
        }`}
        onLoad={handleLoad}
        onError={handleError}
        loading={lazy ? 'lazy' : 'eager'}
      />
    </div>
  )
}

export const getFallbackImage = (category: string): string => {
  return fallbackImages[category] || fallbackImages.campus
}

export default Image