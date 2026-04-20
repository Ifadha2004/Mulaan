'use client'

import { Loader2 } from 'lucide-react'

interface LoadingProps {
  size?: 'sm' | 'md' | 'lg'
  text?: string
  fullScreen?: boolean
}

export function Spinner({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  }

  return (
    <Loader2 className={`${sizes[size]} animate-spin text-brand-green-800`} />
  )
}

export default function Loading({ size = 'md', text, fullScreen = false }: LoadingProps) {
  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-brand-cream-200 flex items-center justify-center z-50">
        <div className="text-center">
          <Spinner size={size} />
          {text && (
            <p className="mt-4 text-brand-green-800 font-medium tracking-wide">
              {text}
            </p>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="flex items-center justify-center py-8">
      <div className="text-center">
        <Spinner size={size} />
        {text && (
          <p className="mt-4 text-brand-green-800 font-medium tracking-wide">
            {text}
          </p>
        )}
      </div>
    </div>
  )
}

// Skeleton loader for content
export function Skeleton({ className = '' }: { className?: string }) {
  return (
    <div className={`animate-pulse bg-gray-200 rounded ${className}`} />
  )
}