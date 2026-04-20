'use client'

import { IProductVariant } from '@/lib/db/models'
import { Badge } from '@/components/shared/ui'

interface StockIndicatorProps {
  variant?: IProductVariant
  totalStock?: number
}

export default function StockIndicator({ variant, totalStock }: StockIndicatorProps) {
  const stock = variant?.stock ?? totalStock ?? 0

  if (stock === 0) {
    return (
      <div className="flex items-center gap-2">
        <div className="w-3 h-3 rounded-full bg-red-500"></div>
        <span className="text-red-600 font-medium">Out of Stock</span>
      </div>
    )
  }

  if (stock <= 5) {
    return (
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <span className="text-yellow-600 font-medium">Only {stock} left!</span>
        </div>
        <Badge variant="last-pieces">Hurry! Limited Stock</Badge>
      </div>
    )
  }

  return (
    <div className="flex items-center gap-2">
      <div className="w-3 h-3 rounded-full bg-green-500"></div>
      <span className="text-green-600 font-medium">In Stock</span>
    </div>
  )
}