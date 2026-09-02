// app/admin/products/[id]/edit/page.tsx
import { notFound } from 'next/navigation'
import ProductForm from '@/components/admin/products/ProductForm'
import { getProductById } from '@/lib/actions/product.actions'
import { getCollections } from '@/lib/actions/collection.actions'

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const [product, collections] = await Promise.all([getProductById(id), getCollections()])

  if (!product) {
    notFound()
  }

  return (
    <div className="p-8">
      <h1 className="font-serif text-2xl text-brand-green-800 mb-8">
        Edit Product: {product.name}
      </h1>
      <ProductForm
        mode="edit"
        productId={id}
        collections={collections.map((c: any) => ({ _id: c._id, name: c.name }))}
        initialData={{
          name: product.name,
          slug: product.slug,
          description: product.description,
          price: product.price,
          images: product.images || [],
          variants: product.variants || [],
          collectionId: product.collectionId
            ? String(
                typeof product.collectionId === 'object'
                    ? (product.collectionId as any)._id
                    : product.collectionId
                )
            : undefined,
          status: product.status as 'active' | 'sold_out' | 'pre_order' | 'archived',
          isPreOrder: product.isPreOrder,
          preOrderStart: product.preOrderStart
            ? new Date(product.preOrderStart).toISOString()
            : undefined,
          preOrderEnd: product.preOrderEnd
            ? new Date(product.preOrderEnd).toISOString()
            : undefined,
          fabricDetails: product.fabricDetails,
          careInstructions: product.careInstructions,
          featured: product.featured,
        }}
      />
    </div>
  )
}