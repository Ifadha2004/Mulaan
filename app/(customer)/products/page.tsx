// 'use client'

// import { useState } from 'react'
// import ProductCard from '@/components/customer/products/ProductCard'
// import { Search, SlidersHorizontal } from 'lucide-react'

// // --- MOCK DATA ADDED BACK ---
// const mockProducts = [
//   {
//     _id: '1',
//     name: 'Elegant Black Abaya',
//     slug: 'elegant-black-abaya',
//     price: 299,
//     description: 'Timeless elegance in modest fashion',
//     images: [
//       { url: 'https://images.unsplash.com/photo-1736342182642-e2042084f47c?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', alt: 'Front', order: 1 },
//       { url: 'https://plus.unsplash.com/premium_photo-1669366530741-c8659ed0f406?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', alt: 'Detail', order: 2 },
//     ],
//     variants: [{ size: 'M', color: '#142622', stock: 5, sku: 'EBA-M' }],
//     status: 'active' as const,
//     isPreOrder: false,
//     featured: true,
//   },
//   {
//     _id: '2',
//     name: 'Navy Kimono Abaya',
//     slug: 'navy-kimono-abaya',
//     price: 349,
//     description: 'Modern elegance with traditional roots',
//     images: [
//       { url: 'https://images.unsplash.com/photo-1596783074918-c84cb06531ca?w=800', alt: 'Front', order: 1 },
//       { url: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=800', alt: 'Detail', order: 2 },
//     ],
//     variants: [{ size: 'S', color: '#000080', stock: 2, sku: 'NKA-S' }],
//     status: 'active' as const,
//     isPreOrder: false,
//     featured: false,
//   },
//   {
//     _id: '3',
//     name: 'Ramadan Special Piece',
//     slug: 'ramadan-special',
//     price: 399,
//     description: 'Limited edition for the holy month',
//     images: [
//       { url: 'https://images.unsplash.com/photo-1581044777550-4cfa60707c03?w=800', alt: 'Front', order: 1 },
//       { url: 'https://images.unsplash.com/photo-1591369822096-ffd140ec948f?w=800', alt: 'Detail', order: 2 },
//     ],
//     variants: [{ size: 'L', color: '#D4AF37', stock: 10, sku: 'RS-L' }],
//     status: 'pre_order' as const,
//     isPreOrder: true,
//     preOrderEnd: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
//     featured: false,
//   },
// ]

// export default function ProductsPage() {
//   const [searchQuery, setSearchQuery] = useState('')
//   const [showFilters, setShowFilters] = useState(false)

//   return (
//     <div className="min-h-screen bg-[#FCFAF7] py-20">
//       <div className="container-luxury">
//         {/* Editorial Header */}
//         <div className="mb-20 text-center space-y-4">
//           <h1 className="heading-luxury text-4xl lg:text-5xl tracking-[0.25em] text-brand-green uppercase font-serif">
//             The Collection
//           </h1>
//           <div className="w-24 h-[1px] bg-brand-gold mx-auto" />
//           <p className="text-gray-500 font-light italic max-w-xl mx-auto text-sm tracking-widest leading-loose">
//             Carefully curated silhouettes designed for the modern woman who values timeless modesty.
//           </p>
//         </div>

//         {/* Minimalist Action Bar */}
//         <div className="flex items-center justify-between mb-12 border-b border-brand-green/10 pb-6">
//           <div className="flex items-center gap-8">
//             <button 
//               onClick={() => setShowFilters(!showFilters)}
//               className="flex items-center gap-2 heading-luxury text-[10px] tracking-[0.2em] hover:text-brand-gold transition-colors"
//             >
//               <SlidersHorizontal size={14} />
//               {showFilters ? 'HIDE FILTERS' : 'FILTER & SORT'}
//             </button>
//             <p className="text-[10px] uppercase tracking-widest text-gray-400">
//               {mockProducts.length} Pieces
//             </p>
//           </div>

//           {/* Hidden-style Search Bar */}
//           <div className="relative group border-b border-transparent focus-within:border-brand-gold/30 transition-all">
//             <Search className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300 group-focus-within:text-brand-gold transition-colors" />
//             <input
//               type="text"
//               placeholder="SEARCH..."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               className="bg-transparent border-none pl-8 text-[10px] tracking-[0.3em] focus:ring-0 w-32 focus:w-64 transition-all duration-700 uppercase font-light placeholder:text-gray-300"
//             />
//           </div>
//         </div>

//         {/* Expanded Filter Panel */}
//         {showFilters && (
//           <div className="mb-12 grid grid-cols-2 md:grid-cols-4 gap-12 animate-in slide-in-from-top-4 duration-500 border-b border-brand-green/5 pb-12">
//              <div className="space-y-4">
//                <h4 className="heading-luxury text-[10px] tracking-widest text-brand-gold">Category</h4>
//                <ul className="space-y-2 text-[11px] font-light uppercase tracking-widest text-gray-600">
//                  <li className="hover:text-brand-gold cursor-pointer transition-colors underline-offset-4 hover:underline">All Abayas</li>
//                  <li className="hover:text-brand-gold cursor-pointer transition-colors underline-offset-4 hover:underline">Ramadan Special</li>
//                  <li className="hover:text-brand-gold cursor-pointer transition-colors underline-offset-4 hover:underline">Kimono Style</li>
//                </ul>
//              </div>
//              <div className="space-y-4">
//                <h4 className="heading-luxury text-[10px] tracking-widest text-brand-gold">Sort By</h4>
//                <ul className="space-y-2 text-[11px] font-light uppercase tracking-widest text-gray-600">
//                  <li className="hover:text-brand-gold cursor-pointer transition-colors">Newest First</li>
//                  <li className="hover:text-brand-gold cursor-pointer transition-colors">Price: Low to High</li>
//                  <li className="hover:text-brand-gold cursor-pointer transition-colors">Price: High to Low</li>
//                </ul>
//              </div>
//           </div>
//         )}

//         {/* Product Grid - 3 cols for that editorial high-end feel */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-20">
//           {mockProducts.map((product) => (
//             <ProductCard key={product._id} product={product as any} />
//           ))}
//         </div>

//         {/* Luxury Pagination */}
//         <div className="mt-32 text-center border-t border-brand-green/5 pt-16">
//           <button className="heading-luxury text-[11px] tracking-[0.5em] text-brand-green hover:text-brand-gold transition-all duration-700 uppercase group">
//             <span className="relative">
//               Discover More
//               <span className="absolute -bottom-2 left-0 w-0 h-[1px] bg-brand-gold transition-all duration-500 group-hover:w-full"></span>
//             </span>
//           </button>
//         </div>
//       </div>
//     </div>
//   )
// }

import { getActiveProducts } from '@/lib/actions/product.actions'
import ProductsPageClient from '@/components/customer/products/ProductsPageClient'

export const dynamic = 'force-dynamic'

export default async function ProductsPage() {
  const products = await getActiveProducts()

  return <ProductsPageClient products={products} />
}