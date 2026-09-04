'use client'

import { useState, useMemo } from 'react'

interface Variant {
  size: string
  color: string
  stock: number
  sku: string
}

interface VariantSelectorProps {
  variants: Variant[]
  onVariantChange: (variant: Variant) => void
}

// Normalize for comparison/dedup: trim + lowercase. Prevents "Green" and
// "green " (or any stray casing/whitespace from older data) being treated
// as two different colors.
const normalize = (val: string) => val.trim().toLowerCase()

export default function VariantSelector({ variants, onVariantChange }: VariantSelectorProps) {
  const [selectedSize, setSelectedSize] = useState<string>('')
  const [selectedColor, setSelectedColor] = useState<string>('')

  // Unique sizes, in the order they first appear
  const sizes = useMemo(() => {
    const seen = new Set<string>()
    const result: string[] = []
    variants.forEach((v) => {
      const key = normalize(v.size)
      if (!seen.has(key)) {
        seen.add(key)
        result.push(v.size)
      }
    })
    return result
  }, [variants])

  // Colors available for the currently selected size only —
  // deduplicated by normalized value, keeping the first-seen display casing
  const availableColorsForSize = useMemo(() => {
    if (!selectedSize) return []
    const seen = new Map<string, string>() // normalized -> original display label
    variants
      .filter((v) => normalize(v.size) === normalize(selectedSize) && v.stock > 0)
      .forEach((v) => {
        const key = normalize(v.color)
        if (!seen.has(key)) {
          seen.set(key, v.color)
        }
      })
    return Array.from(seen.values())
  }, [variants, selectedSize])

  const handleSizeSelect = (size: string) => {
    setSelectedSize(size)
    // Reset color whenever size changes — the previously picked color
    // might not exist in the new size, so force a clean re-selection
    setSelectedColor('')
  }

  const handleColorSelect = (color: string) => {
    setSelectedColor(color)
    const variant = variants.find(
      (v) => normalize(v.size) === normalize(selectedSize) && normalize(v.color) === normalize(color)
    )
    if (variant) {
      onVariantChange(variant)
    }
  }

  const getVariantStock = (size: string, color: string) => {
    const variant = variants.find(
      (v) => normalize(v.size) === normalize(size) && normalize(v.color) === normalize(color)
    )
    return variant?.stock || 0
  }

  return (
    <div className="space-y-6">
      {/* Size Selector */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <label className="block font-medium text-brand-green-800">
            Size {selectedSize && `(${selectedSize})`}
          </label>
          <button className="text-sm text-brand-green-800 hover:text-brand-gold underline">
            Size Guide
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {sizes.map((size) => {
            const isSelected = normalize(selectedSize) === normalize(size)
            return (
              <button
                key={size}
                onClick={() => handleSizeSelect(size)}
                className={`
                  px-6 py-3 border-2 font-medium transition-all
                  ${
                    isSelected
                      ? 'border-brand-green-800 bg-brand-green-800 text-brand-cream-200'
                      : 'border-gray-300 hover:border-brand-green-800 text-brand-green-800'
                  }
                `}
              >
                {size}
              </button>
            )
          })}
        </div>
      </div>

      {/* Color Selector — only appears once a size is chosen */}
      {selectedSize && (
        <div>
          <label className="block font-medium text-brand-green-800 mb-3">
            Color {selectedColor && `(${selectedColor})`}
          </label>

          {availableColorsForSize.length === 0 ? (
            <p className="text-sm text-red-600">No colors currently in stock for size {selectedSize}.</p>
          ) : (
            <div className="flex flex-wrap gap-3">
              {availableColorsForSize.map((color) => {
                const isSelected = normalize(selectedColor) === normalize(color)
                return (
                  <button key={color} onClick={() => handleColorSelect(color)} className="relative group">
                    <div
                      className={`
                        w-12 h-12 rounded-full border-4 transition-all
                        ${
                          isSelected
                            ? 'border-brand-green-800 scale-110'
                            : 'border-gray-300 hover:border-brand-gold'
                        }
                      `}
                      style={{ backgroundColor: color.toLowerCase() }}
                    />
                    <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs text-gray-600 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                      {color}
                    </span>
                  </button>
                )
              })}
            </div>
          )}
        </div>
      )}

      {/* Stock Indicator */}
      {selectedSize && selectedColor && (
        <div className="text-sm">
          {getVariantStock(selectedSize, selectedColor) > 0 ? (
            <p className="text-green-600 font-medium">
              ✓ In Stock ({getVariantStock(selectedSize, selectedColor)} available)
            </p>
          ) : (
            <p className="text-red-600 font-medium">✗ Out of Stock</p>
          )}
        </div>
      )}
    </div>
  )
}