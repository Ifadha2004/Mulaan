'use client'

import Link from 'next/link'
import { Eye, Heart } from 'lucide-react'
import { useState } from 'react'
import { getCampaignStatus } from '@/lib/utils/product-status'

// Define the interfaces so TypeScript knows your data structure
interface ProductVariant {
  size: string
  color: string
  stock: number
  sku: string
}

interface ProductCardProps {
  product: {
    _id: any
    name: string
    slug: string
    price: number
    images?: Array<{ url: string; alt?: string; order: number }>
    variants?: ProductVariant[]
    status: 'active' | 'sold_out' | 'pre_order' | 'archived'
    isPreOrder: boolean
    featured: boolean
    [key: string]: any
  }
}

export default function ProductCard({ product }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isFavorite, setIsFavorite] = useState(false)
  
  const status = getCampaignStatus(product)

  const BadgeOverlay = () => {
    switch (status) {
      case 'SOLD_OUT':
        return <span className="badge-luxury bg-black text-white">Sold Out</span>
      case 'COMING_SOON':
        return <span className="badge-luxury bg-brand-gold text-brand-green">Coming Soon</span>
      case 'PRE_ORDER_OPEN':
        return <span className="badge-luxury bg-brand-green text-brand-gold border border-brand-gold/30">Pre-Order</span>
      case 'PRE_ORDER_CLOSED':
        return <span className="badge-luxury bg-gray-200 text-gray-500">Edition Closed</span>
      default:
        return null
    }
  }

  return (
    <div
      className={`group relative bg-transparent ${status === 'COMING_SOON' ? 'cursor-default' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={status === 'COMING_SOON' ? '#' : `/products/${product.slug}`} className={status === 'COMING_SOON' ? 'pointer-events-none' : ''}>
        {/* IMAGE CONTAINER */}
        <div className="relative aspect-[3/4] overflow-hidden bg-[#f2f2f2]">
          <BadgeOverlay />
          
          {/* Image Scale Effect */}
          <div className="h-full w-full transition-transform duration-1000 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:scale-105">
            {product.images?.[0] && (
              <img
                src={product.images[0].url}
                alt={product.name}
                className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
                  isHovered && product.images[1] ? 'opacity-0' : 'opacity-100'
                }`}
              />
            )}
            
            {/* Reveal Second Image on Hover */}
            {product.images?.[1] && (
              <img
                src={product.images[1].url}
                alt={product.name}
                className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
                  isHovered ? 'opacity-100' : 'opacity-0'
                }`}
              />
            )}
          </div>

          {/* QUICK ACTIONS - Glassmorphism UI */}
          <div className="absolute bottom-6 left-0 right-0 px-6 transition-all duration-500 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100">
             <div className="flex justify-center gap-4 backdrop-blur-md bg-white/40 p-3 rounded-full border border-white/20 shadow-xl">
                <button 
                  onClick={(e) => { e.preventDefault(); setIsFavorite(!isFavorite); }}
                  className="transition-colors hover:text-brand-gold"
                >
                  <Heart size={20} className={isFavorite ? 'fill-red-500 text-red-500' : ''} />
                </button>
                <div className="w-[1px] h-5 bg-white/40 self-center" />
                <button className="transition-colors hover:text-brand-gold">
                  <Eye size={20} />
                </button>
             </div>
          </div>
        </div>

        {/* PRODUCT INFO */}
        <div className="mt-6 text-center space-y-2 px-2">
          <h3 className="heading-luxury text-[13px] uppercase tracking-[0.2em] group-hover:text-brand-gold transition-colors duration-500">
            {product.name}
          </h3>
          
          <p className="text-sm font-light text-brand-green/70 tracking-widest">
            AED {product.price.toFixed(2)}
          </p>

          {/* Color Selection Dots */}
          <div className="flex justify-center gap-3 mt-4">
            {product.variants && [...new Set(product.variants.map(v => v.color))].map((color, i) => (
              <span 
                key={i} 
                style={{ backgroundColor: color as string }}
                className="w-2.5 h-2.5 rounded-full ring-1 ring-offset-2 ring-transparent group-hover:ring-brand-gold transition-all duration-500"
                title={color as string}
              />
            ))}
          </div>
        </div>
      </Link>
    </div>
  )
}