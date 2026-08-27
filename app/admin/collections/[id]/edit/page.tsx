import { notFound } from 'next/navigation'
import CollectionForm from '@/components/admin/collections/CollectionForm'
import { getCollectionById } from '@/lib/actions/collection.actions'

export default async function EditCollectionPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const collection = await getCollectionById(id)

  if (!collection) {
    notFound()
  }

  return (
    <div className="p-8">
      <h1 className="font-serif text-2xl text-brand-green-800 mb-8">
        Edit Collection: {collection.name}
      </h1>
      <CollectionForm
        mode="edit"
        collectionId={id}
        initialData={{
          name: collection.name,
          slug: collection.slug,
          description: collection.description,
          coverImage: collection.coverImage,
          coverImagePublicId: collection.coverImagePublicId,
          media: collection.media || [],
          launchDate: collection.launchDate
            ? new Date(collection.launchDate).toISOString()
            : undefined,
          isActive: collection.isActive,
          featured: collection.featured,
          order: collection.order,
        }}
      />
    </div>
  )
}