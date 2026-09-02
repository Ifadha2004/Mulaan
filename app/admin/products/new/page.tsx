// app/admin/products/new/page.tsx
import ProductForm from '@/components/admin/products/ProductForm'
import { getCollections } from '@/lib/actions/collection.actions'

export default async function NewProductPage() {
  const collections = await getCollections()

  return (
    <div className="p-8">
      <h1 className="font-serif text-2xl text-brand-green-800 mb-8">New Product</h1>
      <ProductForm
        mode="create"
        collections={collections.map((c: any) => ({ _id: c._id, name: c.name }))}
      />
    </div>
  )
}