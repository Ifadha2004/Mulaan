'use client'

import { ReactNode } from 'react'

interface BadgeProps {
  variant?: 'new' | 'sold-out' | 'pre-order' | 'last-pieces' | 'featured'
  children: ReactNode
  className?: string
}

export default function Badge({
  variant = 'new',
  children,
  className = '',
}: BadgeProps) {
  const variants = {
    'new': 'bg-brand-gold text-brand-green-800',
    'sold-out': 'bg-gray-800 text-white',
    'pre-order': 'bg-brand-green-800 text-brand-cream-200',
    'last-pieces': 'bg-red-600 text-white',
    'featured': 'bg-brand-gold-600 text-white',
  }

  return (
    <span
      className={`
        inline-block px-3 py-1 text-xs font-medium
        uppercase tracking-wide
        ${variants[variant]}
        ${className}
      `}
    >
      {children}
    </span>
  )
}