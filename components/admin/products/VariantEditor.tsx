'use client'

import { Plus, Trash2 } from 'lucide-react'

export interface Variant {
  size: string
  color: string
  stock: number
  sku: string
}

interface VariantEditorProps {
  value: Variant[]
  onChange: (variants: Variant[]) => void
}

export default function VariantEditor({ value, onChange }: VariantEditorProps) {
  const addRow = () => {
    onChange([...value, { size: '', color: '', stock: 0, sku: '' }])
  }

  const updateRow = (index: number, field: keyof Variant, val: string | number) => {
    const next = [...value]
    next[index] = { ...next[index], [field]: val }
    onChange(next)
  }

  const removeRow = (index: number) => {
    onChange(value.filter((_, i) => i !== index))
  }

  const totalStock = value.reduce((sum, v) => sum + (Number(v.stock) || 0), 0)

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <label className="block font-medium text-brand-green-800">
          Size / Color Variants *
        </label>
        <span className="text-xs text-gray-500">Total stock: {totalStock}</span>
      </div>

      {value.length > 0 && (
        <div className="border border-gray-200 rounded-lg overflow-hidden mb-3">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wide">
              <tr>
                <th className="text-left px-3 py-2 font-medium">Size</th>
                <th className="text-left px-3 py-2 font-medium">Color</th>
                <th className="text-left px-3 py-2 font-medium">Stock</th>
                <th className="text-left px-3 py-2 font-medium">SKU</th>
                <th className="px-3 py-2"></th>
              </tr>
            </thead>
            <tbody>
              {value.map((variant, index) => (
                <tr key={index} className="border-t border-gray-100">
                  <td className="px-3 py-2">
                    <input
                      type="text"
                      value={variant.size}
                      onChange={(e) => updateRow(index, 'size', e.target.value)}
                      placeholder="M"
                      className="w-16 px-2 py-1.5 border border-gray-200 rounded focus:ring-1 focus:ring-brand-green-800 outline-none"
                      required
                    />
                  </td>
                  <td className="px-3 py-2">
                    <input
                      type="text"
                      value={variant.color}
                      onChange={(e) => updateRow(index, 'color', e.target.value)}
                      placeholder="Black"
                      className="w-24 px-2 py-1.5 border border-gray-200 rounded focus:ring-1 focus:ring-brand-green-800 outline-none"
                      required
                    />
                  </td>
                  <td className="px-3 py-2">
                    <input
                      type="number"
                      min={0}
                      value={variant.stock}
                      onChange={(e) => updateRow(index, 'stock', Number(e.target.value))}
                      className="w-20 px-2 py-1.5 border border-gray-200 rounded focus:ring-1 focus:ring-brand-green-800 outline-none"
                      required
                    />
                  </td>
                  <td className="px-3 py-2">
                    <input
                      type="text"
                      value={variant.sku}
                      onChange={(e) => updateRow(index, 'sku', e.target.value)}
                      placeholder="EBA-M-BLK"
                      className="w-32 px-2 py-1.5 border border-gray-200 rounded focus:ring-1 focus:ring-brand-green-800 outline-none font-mono text-xs"
                      required
                    />
                  </td>
                  <td className="px-3 py-2">
                    <button
                      type="button"
                      onClick={() => removeRow(index)}
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
        onClick={addRow}
        className="flex items-center gap-1.5 text-sm text-brand-green-800 border border-dashed border-gray-300 rounded-lg px-4 py-2 hover:border-brand-green-800 transition-colors"
      >
        <Plus className="w-4 h-4" />
        Add Variant
      </button>
      {value.length === 0 && (
        <p className="text-xs text-red-500 mt-2">At least one variant is required</p>
      )}
    </div>
  )
}