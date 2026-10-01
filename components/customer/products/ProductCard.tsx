// 'use client'

// import Link from 'next/link'
// import { Eye, Heart } from 'lucide-react'
// import { useState } from 'react'
// import { getCampaignStatus } from '@/lib/utils/product-status'

// // Define the interfaces so TypeScript knows your data structure
// interface ProductVariant {
//   size: string
//   color: string
//   stock: number
//   sku: string
// }

// interface ProductCardProps {
//   product: {
//     _id: any
//     name: string
//     slug: string
//     price: number
//     images?: Array<{ url: string; alt?: string; order: number }>
//     variants?: ProductVariant[]
//     status: 'active' | 'sold_out' | 'pre_order' | 'archived'
//     isPreOrder: boolean
//     featured: boolean
//     [key: string]: any
//   }
// }

// export default function ProductCard({ product }: ProductCardProps) {
//   const [isHovered, setIsHovered] = useState(false)
//   const [isFavorite, setIsFavorite] = useState(false)
  
//   const status = getCampaignStatus(product)

//   const BadgeOverlay = () => {
//     switch (status) {
//       case 'SOLD_OUT':
//         return <span className="badge-luxury bg-black text-white">Sold Out</span>
//       case 'COMING_SOON':
//         return <span className="badge-luxury bg-brand-gold text-brand-green">Coming Soon</span>
//       case 'PRE_ORDER_OPEN':
//         return <span className="badge-luxury bg-brand-green text-brand-gold border border-brand-gold/30">Pre-Order</span>
//       case 'PRE_ORDER_CLOSED':
//         return <span className="badge-luxury bg-gray-200 text-gray-500">Edition Closed</span>
//       default:
//         return null
//     }
//   }

//   return (
//     <div
//       className={`group relative bg-transparent ${status === 'COMING_SOON' ? 'cursor-default' : ''}`}
//       onMouseEnter={() => setIsHovered(true)}
//       onMouseLeave={() => setIsHovered(false)}
//     >
//       <Link href={status === 'COMING_SOON' ? '#' : `/products/${product.slug}`} className={status === 'COMING_SOON' ? 'pointer-events-none' : ''}>
//         {/* IMAGE CONTAINER */}
//         <div className="relative aspect-[3/4] overflow-hidden bg-[#f2f2f2]">
//           <BadgeOverlay />
          
//           {/* Image Scale Effect */}
//           <div className="h-full w-full transition-transform duration-1000 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:scale-105">
//             {product.images?.[0] && (
//               <img
//                 src={product.images[0].url}
//                 alt={product.name}
//                 className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
//                   isHovered && product.images[1] ? 'opacity-0' : 'opacity-100'
//                 }`}
//               />
//             )}
            
//             {/* Reveal Second Image on Hover */}
//             {product.images?.[1] && (
//               <img
//                 src={product.images[1].url}
//                 alt={product.name}
//                 className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
//                   isHovered ? 'opacity-100' : 'opacity-0'
//                 }`}
//               />
//             )}
//           </div>

//           {/* QUICK ACTIONS - Glassmorphism UI */}
//           <div className="absolute bottom-6 left-0 right-0 px-6 transition-all duration-500 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100">
//              <div className="flex justify-center gap-4 backdrop-blur-md bg-white/40 p-3 rounded-full border border-white/20 shadow-xl">
//                 <button 
//                   onClick={(e) => { e.preventDefault(); setIsFavorite(!isFavorite); }}
//                   className="transition-colors hover:text-brand-gold"
//                 >
//                   <Heart size={20} className={isFavorite ? 'fill-red-500 text-red-500' : ''} />
//                 </button>
//                 <div className="w-[1px] h-5 bg-white/40 self-center" />
//                 <button className="transition-colors hover:text-brand-gold">
//                   <Eye size={20} />
//                 </button>
//              </div>
//           </div>
//         </div>

//         {/* PRODUCT INFO */}
//         <div className="mt-6 text-center space-y-2 px-2">
//           <h3 className="heading-luxury text-[13px] uppercase tracking-[0.2em] group-hover:text-brand-gold transition-colors duration-500">
//             {product.name}
//           </h3>
          
//           <p className="text-sm font-light text-brand-green/70 tracking-widest">
//             LKR {product.price.toFixed(2)}
//           </p>

//           {/* Color Selection Dots */}
//           <div className="flex justify-center gap-3 mt-4">
//             {product.variants && [...new Set(product.variants.map(v => v.color))].map((color, i) => (
//               <span 
//                 key={i} 
//                 style={{ backgroundColor: color as string }}
//                 className="w-2.5 h-2.5 rounded-full ring-1 ring-offset-2 ring-transparent group-hover:ring-brand-gold transition-all duration-500"
//                 title={color as string}
//               />
//             ))}
//           </div>
//         </div>
//       </Link>
//     </div>
//   )
// }

'use client'

import Link from 'next/link'
import { Eye, Heart } from 'lucide-react'
import { useState } from 'react'
import { getCampaignStatus } from '@/lib/utils/product-status'
import { getProductPricing } from '@/lib/utils/product-pricing'

interface ProductCardProps {
  product: {
    _id: any; name: string; slug: string; price: number
    isOnSale?: boolean; salePrice?: number; saleLabel?: string; saleStart?: string | Date; saleEnd?: string | Date
    images?: Array<{ url: string; alt?: string; order: number }>
    variants?: Array<{ size: string; color: string; stock: number; sku: string }>
    status: 'active' | 'sold_out' | 'pre_order' | 'archived'; isPreOrder: boolean; featured: boolean
    [key: string]: any
  }
}

export default function ProductCard({ product }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isFavorite, setIsFavorite] = useState(false)
  const status = getCampaignStatus(product)
  const pricing = getProductPricing(product)

  const badge = () => {
    if (status === 'SOLD_OUT') return <span className="badge-luxury bg-black text-white">Sold Out</span>
    if (status === 'COMING_SOON') return <span className="badge-luxury bg-brand-gold text-brand-green">Coming Soon</span>
    if (status === 'PRE_ORDER_OPEN') return <span className="badge-luxury border border-brand-gold/30 bg-brand-green text-brand-gold">Pre-Order</span>
    if (status === 'PRE_ORDER_CLOSED') return <span className="badge-luxury bg-gray-200 text-gray-500">Edition Closed</span>
    if (pricing.isOnSale) return <span className="badge-luxury bg-brand-gold text-brand-green">{pricing.saleLabel || `${pricing.discountPercent}% Off`}</span>
    return null
  }

  return (
    <article className={`group relative bg-transparent ${status === 'COMING_SOON' ? 'cursor-default' : ''}`} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      <Link href={status === 'COMING_SOON' ? '#' : `/products/${product.slug}`} className={status === 'COMING_SOON' ? 'pointer-events-none' : ''}>
        <div className="relative aspect-[3/4] overflow-hidden bg-[#f2f2f2]">
          {badge()}
          <div className="h-full w-full transition-transform duration-1000 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:scale-105">
            {product.images?.[0] && <img src={product.images[0].url} alt={product.images[0].alt || product.name} className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${isHovered && product.images[1] ? 'opacity-0' : 'opacity-100'}`} />}
            {product.images?.[1] && <img src={product.images[1].url} alt={product.images[1].alt || product.name} className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${isHovered ? 'opacity-100' : 'opacity-0'}`} />}
          </div>
          <div className="absolute bottom-6 left-0 right-0 translate-y-4 px-6 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
            <div className="flex justify-center gap-4 rounded-full border border-white/20 bg-white/40 p-3 shadow-xl backdrop-blur-md">
              <button type="button" aria-label="Toggle favorite" onClick={(event) => { event.preventDefault(); setIsFavorite(!isFavorite) }}><Heart size={20} className={isFavorite ? 'fill-red-500 text-red-500' : ''} /></button>
              <div className="h-5 w-px self-center bg-white/40" /><Eye size={20} />
            </div>
          </div>
        </div>
        <div className="mt-6 space-y-2 px-2 text-center">
          <h3 className="heading-luxury text-[13px] uppercase tracking-[0.2em] transition-colors duration-500 group-hover:text-brand-gold">{product.name}</h3>
          {pricing.isOnSale ? <div className="flex items-baseline justify-center gap-3 tracking-widest"><span className="text-xs font-light text-brand-green/40 line-through">LKR {pricing.regularPrice.toFixed(2)}</span><span className="text-sm font-medium text-brand-green">LKR {pricing.currentPrice.toFixed(2)}</span></div> : <p className="text-sm font-light tracking-widest text-brand-green/70">LKR {pricing.regularPrice.toFixed(2)}</p>}
          <div className="mt-4 flex justify-center gap-3">{product.variants && [...new Set(product.variants.map((variant) => variant.color))].map((color) => <span key={color} style={{ backgroundColor: color }} className="h-2.5 w-2.5 rounded-full ring-1 ring-transparent ring-offset-2 transition-all duration-500 group-hover:ring-brand-gold" title={color} />)}</div>
        </div>
      </Link>
    </article>
  )
}
