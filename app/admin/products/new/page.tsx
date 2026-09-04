// app/admin/products/new/page.tsx

import ProductForm from '@/components/admin/products/ProductForm'
import { getCollections } from '@/lib/actions/collection.actions'

export const dynamic = 'force-dynamic'

export default async function NewProductPage() {
  const collections = await getCollections()

  return (
    <div className="p-8">
      <h1 className="mb-8 font-serif text-2xl text-brand-green-800">
        New Product
      </h1>

      <ProductForm
        mode="create"
        collections={collections.map((collection: any) => ({
          _id: collection._id,
          name: collection.name,
        }))}
      />
    </div>
  )
}