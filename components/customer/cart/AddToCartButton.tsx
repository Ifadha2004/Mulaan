'use client'

import { useCart } from '@/lib/hooks/useCart'
import { IProduct, IProductVariant } from '@/lib/db/models'
import { ShoppingBag } from 'lucide-react'
import { useState } from 'react'

interface AddToCartButtonProps {
  product: IProduct
  variant: IProductVariant
  quantity?: number
  className?: string
  showIcon?: boolean
}

export default function AddToCartButton({
  product,
  variant,
  quantity = 1,
  className = '',
  showIcon = true,
}: AddToCartButtonProps) {
  const { addToCart } = useCart()
  const [isAdding, setIsAdding] = useState(false)

  const handleAddToCart = () => {
    setIsAdding(true)
    const result = addToCart(product, variant, quantity)
    
    if (result.success) {
      // Open cart drawer
      window.dispatchEvent(new Event('openCart'))
    }
    
    setTimeout(() => setIsAdding(false), 500)
  }

  return (
    <button
      onClick={handleAddToCart}
      disabled={isAdding || variant.stock < 1}
      className={`
        px-8 py-3 bg-brand-green-800 text-brand-cream-200 
        font-medium tracking-wide uppercase text-sm 
        transition-all duration-300 border border-brand-green-800 
        hover:bg-brand-green-700 hover:border-brand-gold
        disabled:opacity-50 disabled:cursor-not-allowed
        flex items-center justify-center gap-2
        ${className}
      `}
    >
      {showIcon && <ShoppingBag className="w-5 h-5" />}
      {isAdding ? 'Adding...' : variant.stock < 1 ? 'Out of Stock' : 'Add to Cart'}
    </button>
  )
}