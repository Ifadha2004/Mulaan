'use client'

import { useMemo, useState } from 'react'
import ProductCard from '@/components/customer/products/ProductCard'
import { Search, SlidersHorizontal } from 'lucide-react'

type ProductFilter = 'all' | 'in-stock' | 'pre-order' | 'on-sale'
type ProductSort = 'newest' | 'price-low-high' | 'price-high-low'

const FILTER_OPTIONS: Array<{ label: string; value: ProductFilter }> = [
  { label: 'All Pieces', value: 'all' },
  { label: 'In Stock', value: 'in-stock' },
  { label: 'Pre-Order', value: 'pre-order' },
  { label: 'On Sale', value: 'on-sale' },
]

const SORT_OPTIONS: Array<{ label: string; value: ProductSort }> = [
  { label: 'Newest First', value: 'newest' },
  { label: 'Price: Low to High', value: 'price-low-high' },
  { label: 'Price: High to Low', value: 'price-high-low' },
]

function hasStock(product: any) {
  return (product.variants ?? []).some(
    (variant: any) => Number(variant.stock ?? 0) > 0
  )
}

function getCurrentPrice(product: any) {
  const regularPrice = Number(product.price ?? 0)
  const salePrice = Number(product.salePrice ?? 0)

  return product.isOnSale && salePrice > 0 ? salePrice : regularPrice
}

export default function ProductsPageClient({ products }: { products: any[] }) {
  const [searchQuery, setSearchQuery] = useState('')
  const [showFilters, setShowFilters] = useState(false)
  const [activeFilter, setActiveFilter] = useState<ProductFilter>('all')
  const [activeSort, setActiveSort] = useState<ProductSort>('newest')

  const filteredProducts = useMemo(() => {
    const query = searchQuery.trim().toLowerCase()

    const matchingProducts = products.filter((product) => {
      const matchesSearch =
        !query ||
        product.name?.toLowerCase().includes(query) ||
        product.description?.toLowerCase().includes(query)

      if (!matchesSearch) return false

      switch (activeFilter) {
        case 'in-stock':
          return hasStock(product)
        case 'pre-order':
          return product.isPreOrder || product.status === 'pre_order'
        case 'on-sale':
          return product.isOnSale && Number(product.salePrice ?? 0) > 0
        default:
          return true
      }
    })

    return [...matchingProducts].sort((first, second) => {
      if (activeSort === 'price-low-high') {
        return getCurrentPrice(first) - getCurrentPrice(second)
      }

      if (activeSort === 'price-high-low') {
        return getCurrentPrice(second) - getCurrentPrice(first)
      }

      return (
        new Date(second.createdAt ?? 0).getTime() -
        new Date(first.createdAt ?? 0).getTime()
      )
    })
  }, [products, searchQuery, activeFilter, activeSort])

  return (
    <div className="min-h-screen bg-[#FCFAF7] py-20">
      <div className="container-luxury">
        <div className="mb-20 space-y-4 text-center">
          <h1 className="heading-luxury font-serif text-4xl uppercase tracking-[0.25em] text-brand-green lg:text-5xl">
            The Collection
          </h1>
          <div className="mx-auto h-px w-24 bg-brand-gold" />
          <p className="mx-auto max-w-xl text-sm font-light italic leading-loose tracking-widest text-gray-500">
            Carefully curated silhouettes designed for the modern woman who values timeless modesty.
          </p>
        </div>

        <div className="mb-12 flex items-center justify-between border-b border-brand-green/10 pb-6">
          <div className="flex items-center gap-4 sm:gap-8">
            <button
              type="button"
              onClick={() => setShowFilters((current) => !current)}
              aria-expanded={showFilters}
              className="heading-luxury flex items-center gap-2 text-[10px] tracking-[0.2em] transition-colors hover:text-brand-gold"
            >
              <SlidersHorizontal size={14} />
              {showFilters ? 'HIDE FILTERS' : 'FILTER & SORT'}
            </button>
            <p className="text-[10px] uppercase tracking-widest text-gray-400">
              {filteredProducts.length} Pieces
            </p>
          </div>

          <div className="group relative border-b border-transparent transition-all focus-within:border-brand-gold/30">
            <Search className="absolute left-0 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-300 transition-colors group-focus-within:text-brand-gold" />
            <input
              type="search"
              placeholder="SEARCH..."
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              aria-label="Search products"
              className="w-24 border-none bg-transparent pl-7 text-[10px] font-light uppercase tracking-[0.3em] transition-all duration-700 placeholder:text-gray-300 focus:w-40 focus:ring-0 sm:w-32 sm:pl-8 sm:focus:w-64"
            />
          </div>
        </div>

        {showFilters && (
          <div className="animate-in mb-12 grid grid-cols-1 gap-10 border-b border-brand-green/5 pb-12 duration-500 slide-in-from-top-4 sm:grid-cols-2 sm:gap-12">
            <div className="space-y-4">
              <h4 className="heading-luxury text-[10px] tracking-widest text-brand-gold">
                Shop
              </h4>
              <ul className="space-y-2 text-[11px] font-light uppercase tracking-widest text-gray-600">
                {FILTER_OPTIONS.map((option) => {
                  const isActive = activeFilter === option.value

                  return (
                    <li key={option.value}>
                      <button
                        type="button"
                        onClick={() => setActiveFilter(option.value)}
                        aria-pressed={isActive}
                        className={`underline-offset-4 transition-colors hover:text-brand-gold hover:underline ${
                          isActive ? 'text-brand-gold underline' : 'text-gray-600'
                        }`}
                      >
                        {option.label}
                      </button>
                    </li>
                  )
                })}
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="heading-luxury text-[10px] tracking-widest text-brand-gold">
                Sort By
              </h4>
              <ul className="space-y-2 text-[11px] font-light uppercase tracking-widest text-gray-600">
                {SORT_OPTIONS.map((option) => {
                  const isActive = activeSort === option.value

                  return (
                    <li key={option.value}>
                      <button
                        type="button"
                        onClick={() => setActiveSort(option.value)}
                        aria-pressed={isActive}
                        className={`underline-offset-4 transition-colors hover:text-brand-gold hover:underline ${
                          isActive ? 'text-brand-gold underline' : 'text-gray-600'
                        }`}
                      >
                        {option.label}
                      </button>
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>
        )}

        {filteredProducts.length === 0 ? (
          <div className="py-32 text-center">
            <p className="text-sm uppercase tracking-widest text-gray-400">
              {searchQuery || activeFilter !== 'all'
                ? 'No pieces match your selection.'
                : 'New pieces coming soon.'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-x-12 gap-y-20 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
