import CollectionForm from '@/components/admin/collections/CollectionForm'

export default function NewCollectionPage() {
  return (
    <div className="p-8">
      <h1 className="font-serif text-2xl text-brand-green-800 mb-8">New Collection</h1>
      <CollectionForm mode="create" />
    </div>
  )
}