'use client'

import { useState, useMemo } from 'react'
import ProductCard from '@/components/customer/products/ProductCard'
import { Search, SlidersHorizontal } from 'lucide-react'

export default function ProductsPageClient({ products }: { products: any[] }) {
  const [searchQuery, setSearchQuery] = useState('')
  const [showFilters, setShowFilters] = useState(false)

  const filteredProducts = useMemo(() => {
    if (!searchQuery.trim()) return products
    const q = searchQuery.toLowerCase()
    return products.filter(
      (p) =>
        p.name?.toLowerCase().includes(q) || p.description?.toLowerCase().includes(q)
    )
  }, [products, searchQuery])

  return (
    <div className="min-h-screen bg-[#FCFAF7] py-20">
      <div className="container-luxury">
        {/* Editorial Header */}
        <div className="mb-20 text-center space-y-4">
          <h1 className="heading-luxury text-4xl lg:text-5xl tracking-[0.25em] text-brand-green uppercase font-serif">
            The Collection
          </h1>
          <div className="w-24 h-[1px] bg-brand-gold mx-auto" />
          <p className="text-gray-500 font-light italic max-w-xl mx-auto text-sm tracking-widest leading-loose">
            Carefully curated silhouettes designed for the modern woman who values timeless modesty.
          </p>
        </div>

        {/* Minimalist Action Bar */}
        <div className="flex items-center justify-between mb-12 border-b border-brand-green/10 pb-6">
          <div className="flex items-center gap-8">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 heading-luxury text-[10px] tracking-[0.2em] hover:text-brand-gold transition-colors"
            >
              <SlidersHorizontal size={14} />
              {showFilters ? 'HIDE FILTERS' : 'FILTER & SORT'}
            </button>
            <p className="text-[10px] uppercase tracking-widest text-gray-400">
              {filteredProducts.length} Pieces
            </p>
          </div>

          {/* Hidden-style Search Bar */}
          <div className="relative group border-b border-transparent focus-within:border-brand-gold/30 transition-all">
            <Search className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300 group-focus-within:text-brand-gold transition-colors" />
            <input
              type="text"
              placeholder="SEARCH..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent border-none pl-8 text-[10px] tracking-[0.3em] focus:ring-0 w-32 focus:w-64 transition-all duration-700 uppercase font-light placeholder:text-gray-300"
            />
          </div>
        </div>

        {/* Expanded Filter Panel */}
        {showFilters && (
          <div className="mb-12 grid grid-cols-2 md:grid-cols-4 gap-12 animate-in slide-in-from-top-4 duration-500 border-b border-brand-green/5 pb-12">
            <div className="space-y-4">
              <h4 className="heading-luxury text-[10px] tracking-widest text-brand-gold">Category</h4>
              <ul className="space-y-2 text-[11px] font-light uppercase tracking-widest text-gray-600">
                <li className="hover:text-brand-gold cursor-pointer transition-colors underline-offset-4 hover:underline">
                  All Abayas
                </li>
                <li className="hover:text-brand-gold cursor-pointer transition-colors underline-offset-4 hover:underline">
                  Ramadan Special
                </li>
                <li className="hover:text-brand-gold cursor-pointer transition-colors underline-offset-4 hover:underline">
                  Kimono Style
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="heading-luxury text-[10px] tracking-widest text-brand-gold">Sort By</h4>
              <ul className="space-y-2 text-[11px] font-light uppercase tracking-widest text-gray-600">
                <li className="hover:text-brand-gold cursor-pointer transition-colors">Newest First</li>
                <li className="hover:text-brand-gold cursor-pointer transition-colors">Price: Low to High</li>
                <li className="hover:text-brand-gold cursor-pointer transition-colors">Price: High to Low</li>
              </ul>
            </div>
          </div>
        )}

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-32">
            <p className="text-gray-400 text-sm tracking-widest uppercase">
              {searchQuery ? 'No pieces match your search.' : 'New pieces coming soon.'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-20">
            {filteredProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}