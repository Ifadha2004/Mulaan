import Link from 'next/link'
import { Plus, Star, Calendar } from 'lucide-react'
import { getCollections } from '@/lib/actions/collection.actions'
import DeleteCollectionButton from '@/components/admin/collections/DeleteCollectionButton'

export const dynamic = 'force-dynamic'

export default async function AdminCollectionsPage() {
  const collections = await getCollections()

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-serif text-2xl text-brand-green-800">Collections</h1>
          <p className="text-gray-500 text-sm mt-1">
            Manage seasonal drops and product groupings
          </p>
        </div>
        <Link
          href="/admin/collections/new"
          className="flex items-center gap-2 px-4 py-2.5 bg-brand-green-800 text-white rounded-lg hover:bg-brand-green-700 transition-colors text-sm font-medium"
        >
          <Plus className="w-4 h-4" />
          New Collection
        </Link>
      </div>

      {collections.length === 0 ? (
        <div className="bg-white rounded-lg border border-dashed border-gray-300 p-16 text-center">
          <p className="text-gray-500 mb-4">No collections yet</p>
          <Link
            href="/admin/collections/new"
            className="inline-flex items-center gap-2 px-4 py-2 bg-brand-green-800 text-white rounded-lg hover:bg-brand-green-700 transition-colors text-sm"
          >
            <Plus className="w-4 h-4" />
            Create your first collection
          </Link>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {collections.map((collection: any) => (
            <div
              key={collection._id}
              className="bg-white rounded-lg border border-gray-200 overflow-hidden group"
            >
              <div className="relative aspect-[4/3] bg-gray-100">
                <img
                  src={collection.coverImage}
                  alt={collection.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3 flex gap-2">
                  {collection.featured && (
                    <span className="flex items-center gap-1 px-2 py-1 bg-brand-gold text-brand-green-800 text-xs font-medium rounded">
                      <Star className="w-3 h-3" />
                      Featured
                    </span>
                  )}
                  <span
                    className={`px-2 py-1 text-xs font-medium rounded ${
                      collection.isActive
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-200 text-gray-600'
                    }`}
                  >
                    {collection.isActive ? 'Active' : 'Inactive'}
                  </span>
                </div>
              </div>

              <div className="p-4">
                <h3 className="font-serif text-lg text-brand-green-800 mb-1">
                  {collection.name}
                </h3>
                <p className="text-sm text-gray-500 line-clamp-2 mb-3">
                  {collection.description}
                </p>

                {collection.launchDate && (
                  <div className="flex items-center gap-1.5 text-xs text-gray-400 mb-3">
                    <Calendar className="w-3.5 h-3.5" />
                    {new Date(collection.launchDate).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </div>
                )}

                <div className="flex items-center gap-2 pt-3 border-t border-gray-100">
                  <Link
                    href={`/admin/collections/${collection._id}/edit`}
                    className="flex-1 text-center py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Edit
                  </Link>
                  <DeleteCollectionButton
                    id={collection._id}
                    name={collection.name}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}