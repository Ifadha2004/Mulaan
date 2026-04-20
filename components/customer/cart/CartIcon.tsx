'use client'

import { useCart } from '@/lib/hooks/useCart'
import { ShoppingBag } from 'lucide-react'

export default function CartIcon() {
  const { itemCount } = useCart()

  const handleClick = () => {
    window.dispatchEvent(new Event('openCart'))
  }

  return (
    <button
      onClick={handleClick}
      className="relative p-2 hover:bg-brand-cream-300 transition-colors rounded-full"
    >
      <ShoppingBag className="w-6 h-6 text-brand-cream-200" />
      {itemCount > 0 && (
        <span className="absolute -top-1 -right-1 w-5 h-5 bg-brand-gold text-brand-green-800 text-xs font-bold rounded-full flex items-center justify-center">
          {itemCount}
        </span>
      )}
    </button>
  )
}