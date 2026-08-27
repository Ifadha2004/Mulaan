import { notFound } from 'next/navigation'
import { getCollectionBySlug } from '@/lib/actions/collection.actions'
import CollectionDetailClient from '@/components/customer/collections/CollectionDetailClient'

export default async function CollectionDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const collection = await getCollectionBySlug(slug)

  if (!collection) {
    notFound()
  }

  return <CollectionDetailClient collection={collection} />
}