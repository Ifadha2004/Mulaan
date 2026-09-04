// 'use client'

// import { Plus, Trash2 } from 'lucide-react'

// export interface Variant {
//   size: string
//   color: string
//   stock: number
//   sku: string
// }

// interface VariantManagerProps {
//   value: Variant[]
//   onChange: (variants: Variant[]) => void
//   productSlug?: string
// }

// const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL']

// export default function VariantManager({ value, onChange, productSlug }: VariantManagerProps) {
//   const addVariant = () => {
//     const prefix = (productSlug || 'SKU').toUpperCase().slice(0, 6).replace(/-/g, '')
//     onChange([
//       ...value,
//       { size: 'M', color: '', stock: 0, sku: `${prefix}-${value.length + 1}` },
//     ])
//   }

//   const updateVariant = (index: number, field: keyof Variant, val: string | number) => {
//     const next = [...value]
//     next[index] = { ...next[index], [field]: val }
//     onChange(next)
//   }

//   const removeVariant = (index: number) => {
//     onChange(value.filter((_, i) => i !== index))
//   }

//   const totalStock = value.reduce((sum, v) => sum + (Number(v.stock) || 0), 0)

//   return (
//     <div>
//       <div className="flex items-center justify-between mb-3">
//         <p className="text-sm text-gray-500">
//           Each row is one size/color combination with its own stock count and SKU.
//         </p>
//         <span className="text-xs text-gray-500 whitespace-nowrap ml-4">
//           Total stock: <strong>{totalStock}</strong>
//         </span>
//       </div>

//       {value.length > 0 && (
//         <div className="overflow-x-auto mb-4">
//           <table className="w-full text-sm">
//             <thead>
//               <tr className="text-left text-gray-500 border-b border-gray-200">
//                 <th className="pb-2 pr-3 font-medium">Size</th>
//                 <th className="pb-2 pr-3 font-medium">Color</th>
//                 <th className="pb-2 pr-3 font-medium">Stock</th>
//                 <th className="pb-2 pr-3 font-medium">SKU</th>
//                 <th className="pb-2 w-8"></th>
//               </tr>
//             </thead>
//             <tbody>
//               {value.map((variant, index) => (
//                 <tr key={index} className="border-b border-gray-100">
//                   <td className="py-2 pr-3">
//                     <select
//                       value={variant.size}
//                       onChange={(e) => updateVariant(index, 'size', e.target.value)}
//                       className="w-20 px-2 py-1.5 border border-gray-300 rounded focus:ring-2 focus:ring-brand-green-800 outline-none"
//                     >
//                       {SIZES.map((s) => (
//                         <option key={s} value={s}>
//                           {s}
//                         </option>
//                       ))}
//                     </select>
//                   </td>
//                   <td className="py-2 pr-3">
//                     <input
//                       type="text"
//                       value={variant.color}
//                       onChange={(e) => updateVariant(index, 'color', e.target.value)}
//                       placeholder="e.g. Black"
//                       className="w-28 px-2 py-1.5 border border-gray-300 rounded focus:ring-2 focus:ring-brand-green-800 outline-none"
//                       required
//                     />
//                   </td>
//                   <td className="py-2 pr-3">
//                     <input
//                       type="number"
//                       min={0}
//                       value={variant.stock}
//                       onChange={(e) => updateVariant(index, 'stock', Number(e.target.value))}
//                       className="w-20 px-2 py-1.5 border border-gray-300 rounded focus:ring-2 focus:ring-brand-green-800 outline-none"
//                       required
//                     />
//                   </td>
//                   <td className="py-2 pr-3">
//                     <input
//                       type="text"
//                       value={variant.sku}
//                       onChange={(e) => updateVariant(index, 'sku', e.target.value)}
//                       className="w-32 px-2 py-1.5 border border-gray-300 rounded focus:ring-2 focus:ring-brand-green-800 outline-none font-mono text-xs"
//                       required
//                     />
//                   </td>
//                   <td className="py-2">
//                     <button
//                       type="button"
//                       onClick={() => removeVariant(index)}
//                       className="p-1.5 text-red-500 hover:bg-red-50 rounded transition-colors"
//                     >
//                       <Trash2 className="w-4 h-4" />
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}

//       <button
//         type="button"
//         onClick={addVariant}
//         className="flex items-center gap-2 text-sm text-brand-green-800 font-medium hover:underline"
//       >
//         <Plus className="w-4 h-4" />
//         Add Variant
//       </button>
//     </div>
//   )
// }

'use client'

import { useState } from 'react'
import { Plus, Trash2, X } from 'lucide-react'

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
  const [newColorName, setNewColorName] = useState('')

  const skuPrefix = (productSlug || 'SKU').toUpperCase().slice(0, 6).replace(/-/g, '')

  // Group the flat variant array by color, preserving the order colors first appeared in
  const colorOrder: string[] = []
  const groups: Record<string, { variant: Variant; index: number }[]> = {}

  value.forEach((variant, index) => {
    const key = variant.color.trim() || 'Unnamed'
    if (!groups[key]) {
      groups[key] = []
      colorOrder.push(key)
    }
    groups[key].push({ variant, index })
  })

  const updateVariant = (index: number, field: keyof Variant, val: string | number) => {
    const next = [...value]
    next[index] = { ...next[index], [field]: val }
    onChange(next)
  }

  const removeVariant = (index: number) => {
    onChange(value.filter((_, i) => i !== index))
  }

  const removeColorGroup = (color: string) => {
    onChange(value.filter((v) => (v.color.trim() || 'Unnamed') !== color))
  }

  const addSizeToColor = (color: string) => {
    const existingSizesInColor = groups[color]?.map((g) => g.variant.size) || []
    const nextSize = SIZES.find((s) => !existingSizesInColor.includes(s)) || SIZES[0]
    const skuCount = value.length + 1

    onChange([
      ...value,
      { size: nextSize, color, stock: 0, sku: `${skuPrefix}-${skuCount}` },
    ])
  }

  const addNewColor = () => {
    const trimmed = newColorName.trim()
    if (!trimmed) return

    const alreadyExists = colorOrder.some(
      (c) => c.toLowerCase() === trimmed.toLowerCase()
    )
    if (alreadyExists) {
      addSizeToColor(colorOrder.find((c) => c.toLowerCase() === trimmed.toLowerCase())!)
      setNewColorName('')
      return
    }

    const skuCount = value.length + 1
    onChange([
      ...value,
      { size: 'M', color: trimmed, stock: 0, sku: `${skuPrefix}-${skuCount}` },
    ])
    setNewColorName('')
  }

  const totalStock = value.reduce((sum, v) => sum + (Number(v.stock) || 0), 0)

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-gray-500">
          Add a color once, then add each size available in that color underneath it.
        </p>
        <span className="text-xs text-gray-500 whitespace-nowrap ml-4">
          Total stock: <strong>{totalStock}</strong>
        </span>
      </div>

      {colorOrder.length > 0 && (
        <div className="space-y-5 mb-5">
          {colorOrder.map((color) => (
            <div key={color} className="border border-gray-200 rounded-lg overflow-hidden">
              {/* Color group header */}
              <div className="flex items-center justify-between bg-gray-50 px-4 py-2.5 border-b border-gray-200">
                <div className="flex items-center gap-2">
                  <span
                    className="w-4 h-4 rounded-full border border-gray-300 flex-shrink-0"
                    style={{ backgroundColor: color }}
                  />
                  <span className="text-sm font-medium text-gray-800">{color}</span>
                  <span className="text-xs text-gray-400">
                    ({groups[color].reduce((s, g) => s + (Number(g.variant.stock) || 0), 0)} in stock)
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => removeColorGroup(color)}
                  className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                  title="Remove this color and all its sizes"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Size rows for this color */}
              <div className="p-3">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left text-gray-400 text-xs">
                      <th className="pb-2 pr-3 font-medium w-24">Size</th>
                      <th className="pb-2 pr-3 font-medium w-24">Stock</th>
                      <th className="pb-2 pr-3 font-medium">SKU</th>
                      <th className="pb-2 w-8"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {groups[color].map(({ variant, index }) => (
                      <tr key={index} className="border-t border-gray-100 first:border-0">
                        <td className="py-1.5 pr-3">
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
                        <td className="py-1.5 pr-3">
                          <input
                            type="number"
                            min={0}
                            value={variant.stock}
                            onChange={(e) => updateVariant(index, 'stock', Number(e.target.value))}
                            className="w-20 px-2 py-1.5 border border-gray-300 rounded focus:ring-2 focus:ring-brand-green-800 outline-none"
                            required
                          />
                        </td>
                        <td className="py-1.5 pr-3">
                          <input
                            type="text"
                            value={variant.sku}
                            onChange={(e) => updateVariant(index, 'sku', e.target.value)}
                            className="w-36 px-2 py-1.5 border border-gray-300 rounded focus:ring-2 focus:ring-brand-green-800 outline-none font-mono text-xs"
                            required
                          />
                        </td>
                        <td className="py-1.5">
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

                <button
                  type="button"
                  onClick={() => addSizeToColor(color)}
                  className="flex items-center gap-1.5 text-xs text-brand-green-800 font-medium hover:underline mt-2"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Add Size in {color}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add a new color */}
      <div className="flex items-center gap-2">
        <input
          type="text"
          value={newColorName}
          onChange={(e) => setNewColorName(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault()
              addNewColor()
            }
          }}
          placeholder="e.g. Black, Sage Green..."
          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-brand-green-800 outline-none"
        />
        <button
          type="button"
          onClick={addNewColor}
          className="flex items-center gap-1.5 px-4 py-2 bg-brand-green-800 text-white text-sm rounded-lg hover:bg-brand-green-700 transition-colors whitespace-nowrap"
        >
          <Plus className="w-4 h-4" />
          Add Color
        </button>
      </div>
    </div>
  )
}