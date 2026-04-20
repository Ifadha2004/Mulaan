'use client'

import { IProductVariant } from '@/lib/db/models'
import { useState } from 'react'

interface VariantSelectorProps {
  variants: IProductVariant[]
  onVariantChange: (variant: IProductVariant) => void
}

export default function VariantSelector({ variants, onVariantChange }: VariantSelectorProps) {
  const [selectedSize, setSelectedSize] = useState<string>('')
  const [selectedColor, setSelectedColor] = useState<string>('')

  // Get unique sizes and colors
  const sizes = [...new Set(variants.map(v => v.size))]
  const colors = [...new Set(variants.map(v => v.color))]

  // Get available options based on selection
  const getAvailableSizes = () => {
    if (!selectedColor) return sizes
    return sizes.filter(size => 
      variants.some(v => v.size === size && v.color === selectedColor && v.stock > 0)
    )
  }

  const getAvailableColors = () => {
    if (!selectedSize) return colors
    return colors.filter(color => 
      variants.some(v => v.color === color && v.size === selectedSize && v.stock > 0)
    )
  }

  const handleSizeSelect = (size: string) => {
    setSelectedSize(size)
    updateVariant(size, selectedColor)
  }

  const handleColorSelect = (color: string) => {
    setSelectedColor(color)
    updateVariant(selectedSize, color)
  }

  const updateVariant = (size: string, color: string) => {
    if (size && color) {
      const variant = variants.find(v => v.size === size && v.color === color)
      if (variant) {
        onVariantChange(variant)
      }
    }
  }

  const getVariantStock = (size: string, color: string) => {
    const variant = variants.find(v => v.size === size && v.color === color)
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
            const isAvailable = getAvailableSizes().includes(size)
            const isSelected = selectedSize === size
            return (
              <button
                key={size}
                onClick={() => handleSizeSelect(size)}
                disabled={!isAvailable}
                className={`
                  px-6 py-3 border-2 font-medium transition-all
                  ${isSelected
                    ? 'border-brand-green-800 bg-brand-green-800 text-brand-cream-200'
                    : isAvailable
                    ? 'border-gray-300 hover:border-brand-green-800 text-brand-green-800'
                    : 'border-gray-200 text-gray-400 cursor-not-allowed opacity-50'
                  }
                `}
              >
                {size}
              </button>
            )
          })}
        </div>
      </div>

      {/* Color Selector */}
      <div>
        <label className="block font-medium text-brand-green-800 mb-3">
          Color {selectedColor && `(${selectedColor})`}
        </label>
        <div className="flex flex-wrap gap-3">
          {colors.map((color) => {
            const isAvailable = getAvailableColors().includes(color)
            const isSelected = selectedColor === color
            const stock = selectedSize ? getVariantStock(selectedSize, color) : 
                         variants.filter(v => v.color === color).reduce((sum, v) => sum + v.stock, 0)
            
            return (
              <button
                key={color}
                onClick={() => handleColorSelect(color)}
                disabled={!isAvailable}
                className={`
                  relative group
                  ${!isAvailable ? 'opacity-50 cursor-not-allowed' : ''}
                `}
              >
                <div
                  className={`
                    w-12 h-12 rounded-full border-4 transition-all
                    ${isSelected
                      ? 'border-brand-green-800 scale-110'
                      : isAvailable
                      ? 'border-gray-300 hover:border-brand-gold'
                      : 'border-gray-200'
                    }
                  `}
                  style={{ backgroundColor: color.toLowerCase() }}
                />
                {!isAvailable && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-0.5 bg-red-500 rotate-45" />
                  </div>
                )}
                <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs text-gray-600 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                  {color}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Stock Indicator */}
      {selectedSize && selectedColor && (
        <div className="text-sm">
          {getVariantStock(selectedSize, selectedColor) > 0 ? (
            <p className="text-green-600 font-medium">
              ✓ In Stock ({getVariantStock(selectedSize, selectedColor)} available)
            </p>
          ) : (
            <p className="text-red-600 font-medium">
              ✗ Out of Stock
            </p>
          )}
        </div>
      )}
    </div>
  )
}