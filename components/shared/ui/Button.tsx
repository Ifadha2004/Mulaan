'use client'

import { ButtonHTMLAttributes, ReactNode } from 'react'
import { Loader2 } from 'lucide-react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'gold' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  isLoading?: boolean
  children: ReactNode
  fullWidth?: boolean
}

export default function Button({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  children,
  fullWidth = false,
  className = '',
  disabled,
  ...props
}: ButtonProps) {
  const baseStyles = 'font-medium tracking-wide uppercase transition-all duration-300 inline-flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed'
  
  const variants = {
    primary: 'bg-brand-green-800 text-brand-cream-200 border border-brand-green-800 hover:bg-brand-green-700 hover:border-brand-gold',
    secondary: 'bg-transparent text-brand-green-800 border border-brand-green-800 hover:bg-brand-green-800 hover:text-brand-cream-200',
    gold: 'bg-brand-gold text-brand-green-800 border border-brand-gold hover:bg-brand-gold-400',
    outline: 'bg-transparent text-brand-green-800 border border-gray-300 hover:border-brand-green-800',
    ghost: 'bg-transparent text-brand-green-800 hover:bg-brand-cream-300',
  }
  
  const sizes = {
    sm: 'px-4 py-2 text-xs',
    md: 'px-8 py-3 text-sm',
    lg: 'px-10 py-4 text-base',
  }
  
  const widthClass = fullWidth ? 'w-full' : ''
  
  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${widthClass} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
      {children}
    </button>
  )
}