import Link from 'next/link'
import { Plus, Star } from 'lucide-react'
import { getProducts } from '@/lib/actions/product.actions'
import DeleteProductButton from '@/components/admin/products/DeleteProductButton'

export const dynamic = 'force-dynamic'

const STATUS_STYLES: Record<string, string> = {
  active: 'bg-green-100 text-green-800',
  sold_out: 'bg-red-100 text-red-700',
  pre_order: 'bg-amber-100 text-amber-800',
  archived: 'bg-gray-200 text-gray-600',
}

const STATUS_LABELS: Record<string, string> = {
  active: 'Active',
  sold_out: 'Sold Out',
  pre_order: 'Pre-Order',
  archived: 'Archived',
}

export default async function AdminProductsPage() {
  const products = await getProducts()

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-serif text-2xl text-brand-green-800">Products</h1>
          <p className="text-gray-500 text-sm mt-1">Manage your product catalog</p>
        </div>
        <Link
          href="/admin/products/new"
          className="flex items-center gap-2 px-4 py-2.5 bg-brand-green-800 text-white rounded-lg hover:bg-brand-green-700 transition-colors text-sm font-medium"
        >
          <Plus className="w-4 h-4" />
          New Product
        </Link>
      </div>

      {products.length === 0 ? (
        <div className="bg-white rounded-lg border border-dashed border-gray-300 p-16 text-center">
          <p className="text-gray-500 mb-4">No products yet</p>
          <Link
            href="/admin/products/new"
            className="inline-flex items-center gap-2 px-4 py-2 bg-brand-green-800 text-white rounded-lg hover:bg-brand-green-700 transition-colors text-sm"
          >
            <Plus className="w-4 h-4" />
            Create your first product
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-500 bg-gray-50 border-b border-gray-200">
                <th className="px-4 py-3 font-medium">Product</th>
                <th className="px-4 py-3 font-medium">Collection</th>
                <th className="px-4 py-3 font-medium">Price</th>
                <th className="px-4 py-3 font-medium">Stock</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product: any) => {
                const totalStock = (product.variants || []).reduce(
                  (sum: number, v: any) => sum + (v.stock || 0),
                  0
                )
                return (
                  <tr key={product._id} className="border-b border-gray-100 last:border-0">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded bg-gray-100 overflow-hidden flex-shrink-0">
                          {product.images?.[0] && (
                            <img
                              src={product.images[0].url}
                              alt={product.name}
                              className="w-full h-full object-cover"
                            />
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-gray-800 flex items-center gap-1.5">
                            {product.name}
                            {product.featured && (
                              <Star className="w-3.5 h-3.5 text-brand-gold fill-brand-gold" />
                            )}
                          </p>
                          <p className="text-xs text-gray-400">/{product.slug}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-gray-600">
                      {product.collectionId?.name || '—'}
                    </td>
                    <td className="px-4 py-3 text-gray-800 font-medium">
                      AED {product.price.toFixed(2)}
                    </td>
                    <td className="px-4 py-3">
                      <span className={totalStock <= 5 ? 'text-red-600 font-medium' : 'text-gray-600'}>
                        {totalStock}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`px-2 py-1 text-xs font-medium rounded ${
                          STATUS_STYLES[product.status] || 'bg-gray-100 text-gray-600'
                        }`}
                      >
                        {STATUS_LABELS[product.status] || product.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/admin/products/${product._id}/edit`}
                          className="px-3 py-1.5 text-xs border border-gray-300 rounded hover:bg-gray-50 transition-colors"
                        >
                          Edit
                        </Link>
                        <DeleteProductButton id={product._id} name={product.name} />
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}