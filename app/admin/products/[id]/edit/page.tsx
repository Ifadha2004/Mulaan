import { notFound } from 'next/navigation'
import ProductForm from '@/components/admin/products/ProductForm'
import { getProductById } from '@/lib/actions/product.actions'
import { getCollections } from '@/lib/actions/collection.actions'

interface EditProductPageProps {
  params: Promise<{
    id: string
  }>
}

export default async function EditProductPage({
  params,
}: EditProductPageProps) {
  const { id } = await params

  const [product, collections] = await Promise.all([
    getProductById(id),
    getCollections(),
  ])

  if (!product) {
    notFound()
  }

  const collectionId = product.collectionId
    ? String(
        typeof product.collectionId === 'object'
          ? (product.collectionId as any)._id
          : product.collectionId
      )
    : undefined

  /*
   * Older database images may not have a Cloudinary publicId.
   * ProductForm's UploadedImage type requires publicId to be a string,
   * so missing values are safely normalized to an empty string.
   */
  const normalizedImages = (product.images ?? []).map(
    (image: any) => ({
      url: image.url,
      publicId: image.publicId ?? '',
      alt: image.alt ?? product.name,
    })
  )

  const normalizedVariants = (product.variants ?? []).map(
    (variant: any) => ({
      size: variant.size ?? '',
      color: variant.color ?? '',
      stock: Number(variant.stock ?? 0),
      sku: variant.sku ?? '',
    })
  )

  return (
    <div className="p-8">
      <h1 className="mb-8 font-serif text-2xl text-brand-green-800">
        Edit Product: {product.name}
      </h1>

      <ProductForm
        mode="edit"
        collections={collections.map((collection: any) => ({
          _id: String(collection._id),
          name: collection.name,
        }))}
        initialData={{
          _id: id,
          name: product.name,
          slug: product.slug,
          description: product.description,
          price: product.price,
          displayOrder: product.displayOrder ?? 999,

          isOnSale: product.isOnSale ?? false,
          salePrice: product.salePrice,
          saleLabel: product.saleLabel,
          saleStart: product.saleStart
            ? new Date(product.saleStart).toISOString()
            : undefined,
          saleEnd: product.saleEnd
            ? new Date(product.saleEnd).toISOString()
            : undefined,

          images: normalizedImages,
          variants: normalizedVariants,
          collectionId,

          status: product.status as
            | 'active'
            | 'sold_out'
            | 'pre_order'
            | 'archived',

          isPreOrder: product.isPreOrder ?? false,
          preOrderStart: product.preOrderStart
            ? new Date(product.preOrderStart).toISOString()
            : undefined,
          preOrderEnd: product.preOrderEnd
            ? new Date(product.preOrderEnd).toISOString()
            : undefined,

          fabricDetails: product.fabricDetails,
          careInstructions: product.careInstructions,
          featured: product.featured ?? false,
        }}
      />
    </div>
  )
}