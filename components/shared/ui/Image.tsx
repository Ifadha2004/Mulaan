'use client'

import NextImage, { ImageProps as NextImageProps } from 'next/image'
import { useState } from 'react'
import { Skeleton } from './Loading'

interface ImageProps extends Omit<NextImageProps, 'onLoad'> {
  fallback?: string
}

export default function Image({ 
  src, 
  alt, 
  fallback = '/images/placeholder.jpg',
  className = '',
  ...props 
}: ImageProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(false)

  return (
    <div className="relative overflow-hidden">
      {isLoading && (
        <Skeleton className="absolute inset-0" />
      )}
      <NextImage
        src={error ? fallback : src}
        alt={alt}
        className={`transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'} ${className}`}
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setError(true)
          setIsLoading(false)
        }}
        {...props}
      />
    </div>
  )
}