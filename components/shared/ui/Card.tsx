'use client'

import { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  className?: string
  hover?: boolean
  onClick?: () => void
}

export default function Card({
  children,
  className = '',
  hover = false,
  onClick,
}: CardProps) {
  const hoverClass = hover ? 'hover:shadow-xl hover:border-brand-gold cursor-pointer' : ''
  const clickableClass = onClick ? 'cursor-pointer' : ''

  return (
    <div
      className={`
        bg-white border border-gray-200 shadow-md
        transition-all duration-500 overflow-hidden
        ${hoverClass}
        ${clickableClass}
        ${className}
      `}
      onClick={onClick}
    >
      {children}
    </div>
  )
}