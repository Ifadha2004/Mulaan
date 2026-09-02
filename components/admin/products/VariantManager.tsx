'use client'

import { Plus, Trash2 } from 'lucide-react'

export interface Variant {
  size: string
  color: string
  stock: number
  sku: string
}

interface VariantManagerProps {
  value: Variant[]
  onChange: (variants: Variant[]) => void
  productSlug?: string
}

const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL']

export default function VariantManager({ value, onChange, productSlug }: VariantManagerProps) {
  const addVariant = () => {
    const prefix = (productSlug || 'SKU').toUpperCase().slice(0, 6).replace(/-/g, '')
    onChange([
      ...value,
      { size: 'M', color: '', stock: 0, sku: `${prefix}-${value.length + 1}` },
    ])
  }

  const updateVariant = (index: number, field: keyof Variant, val: string | number) => {
    const next = [...value]
    next[index] = { ...next[index], [field]: val }
    onChange(next)
  }

  const removeVariant = (index: number) => {
    onChange(value.filter((_, i) => i !== index))
  }

  const totalStock = value.reduce((sum, v) => sum + (Number(v.stock) || 0), 0)

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <p className="text-sm text-gray-500">
          Each row is one size/color combination with its own stock count and SKU.
        </p>
        <span className="text-xs text-gray-500 whitespace-nowrap ml-4">
          Total stock: <strong>{totalStock}</strong>
        </span>
      </div>

      {value.length > 0 && (
        <div className="overflow-x-auto mb-4">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-500 border-b border-gray-200">
                <th className="pb-2 pr-3 font-medium">Size</th>
                <th className="pb-2 pr-3 font-medium">Color</th>
                <th className="pb-2 pr-3 font-medium">Stock</th>
                <th className="pb-2 pr-3 font-medium">SKU</th>
                <th className="pb-2 w-8"></th>
              </tr>
            </thead>
            <tbody>
              {value.map((variant, index) => (
                <tr key={index} className="border-b border-gray-100">
                  <td className="py-2 pr-3">
                    <select
                      value={variant.size}
                      onChange={(e) => updateVariant(index, 'size', e.target.value)}
                      className="w-20 px-2 py-1.5 border border-gray-300 rounded focus:ring-2 focus:ring-brand-green-800 outline-none"
                    >
                      {SIZES.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="py-2 pr-3">
                    <input
                      type="text"
                      value={variant.color}
                      onChange={(e) => updateVariant(index, 'color', e.target.value)}
                      placeholder="e.g. Black"
                      className="w-28 px-2 py-1.5 border border-gray-300 rounded focus:ring-2 focus:ring-brand-green-800 outline-none"
                      required
                    />
                  </td>
                  <td className="py-2 pr-3">
                    <input
                      type="number"
                      min={0}
                      value={variant.stock}
                      onChange={(e) => updateVariant(index, 'stock', Number(e.target.value))}
                      className="w-20 px-2 py-1.5 border border-gray-300 rounded focus:ring-2 focus:ring-brand-green-800 outline-none"
                      required
                    />
                  </td>
                  <td className="py-2 pr-3">
                    <input
                      type="text"
                      value={variant.sku}
                      onChange={(e) => updateVariant(index, 'sku', e.target.value)}
                      className="w-32 px-2 py-1.5 border border-gray-300 rounded focus:ring-2 focus:ring-brand-green-800 outline-none font-mono text-xs"
                      required
                    />
                  </td>
                  <td className="py-2">
                    <button
                      type="button"
                      onClick={() => removeVariant(index)}
                      className="p-1.5 text-red-500 hover:bg-red-50 rounded transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <button
        type="button"
        onClick={addVariant}
        className="flex items-center gap-2 text-sm text-brand-green-800 font-medium hover:underline"
      >
        <Plus className="w-4 h-4" />
        Add Variant
      </button>
    </div>
  )
}