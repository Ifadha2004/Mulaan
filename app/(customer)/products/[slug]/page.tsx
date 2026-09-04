import { notFound } from 'next/navigation'
import { getProductBySlug } from '@/lib/actions/product.actions'
import ProductDetailV2Client from '@/components/customer/products/ProductDetailV2Client'

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const product = await getProductBySlug(slug)

  if (!product) {
    notFound()
  }

  return <ProductDetailV2Client product={product} />
}