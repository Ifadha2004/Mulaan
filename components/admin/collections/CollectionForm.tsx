'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { Button } from '@/components/shared/ui'
import ImageUploader, { UploadedImage } from '@/components/admin/shared/ImageUploader'
import { slugify } from '@/lib/utils/slugify'
import { createCollection, updateCollection } from '@/lib/actions/collection.actions'

interface CollectionFormProps {
  mode: 'create' | 'edit'
  collectionId?: string
  initialData?: {
    name: string
    slug: string
    description: string
    coverImage: string
    coverImagePublicId?: string
    media: { url: string; publicId?: string; type?: 'image' | 'video'; alt?: string }[]
    launchDate?: string
    isActive: boolean
    featured: boolean
    order: number
  }
}

export default function CollectionForm({ mode, collectionId, initialData }: CollectionFormProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [slugManuallyEdited, setSlugManuallyEdited] = useState(mode === 'edit')

  const [name, setName] = useState(initialData?.name || '')
  const [slug, setSlug] = useState(initialData?.slug || '')
  const [description, setDescription] = useState(initialData?.description || '')
  const [cover, setCover] = useState<UploadedImage[]>(
    initialData?.coverImage
      ? [{ url: initialData.coverImage, publicId: initialData.coverImagePublicId || '' }]
      : []
  )
  const [media, setMedia] = useState<UploadedImage[]>(
    (initialData?.media || []).map((m) => ({
      url: m.url,
      publicId: m.publicId || '',
      alt: m.alt || '',
    }))
  )
  const [launchDate, setLaunchDate] = useState(initialData?.launchDate?.slice(0, 10) || '')
  const [isActive, setIsActive] = useState(initialData?.isActive ?? true)
  const [featured, setFeatured] = useState(initialData?.featured ?? false)
  const [order, setOrder] = useState(initialData?.order ?? 0)

  const handleNameChange = (value: string) => {
    setName(value)
    if (!slugManuallyEdited) {
      setSlug(slugify(value))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!name.trim() || !slug.trim() || !description.trim()) {
      toast.error('Name, slug, and description are required')
      return
    }
    if (cover.length === 0) {
      toast.error('A cover image is required')
      return
    }

    setIsSubmitting(true)

    const payload = {
      name,
      slug,
      description,
      coverImage: cover[0].url,
      coverImagePublicId: cover[0].publicId,
      media: media.map((m) => ({ url: m.url, publicId: m.publicId, type: 'image' as const, alt: m.alt })),
      launchDate: launchDate || undefined,
      isActive,
      featured,
      order,
    }

    const result =
      mode === 'create'
        ? await createCollection(payload)
        : await updateCollection(collectionId!, payload)

    if (result.success) {
      toast.success(mode === 'create' ? 'Collection created' : 'Collection updated')
      router.push('/admin/collections')
      router.refresh()
    } else {
      toast.error(result.error || 'Something went wrong')
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-3xl">
      {/* Basic Info */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 space-y-4">
        <h2 className="font-serif text-lg text-brand-green-800">Basic Information</h2>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Collection Name *</label>
          <input
            type="text"
            value={name}
            onChange={(e) => handleNameChange(e.target.value)}
            placeholder="e.g. Ramadan Special"
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-green-800 focus:border-transparent outline-none"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">URL Slug *</label>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-400">/collections/</span>
            <input
              type="text"
              value={slug}
              onChange={(e) => {
                setSlug(slugify(e.target.value))
                setSlugManuallyEdited(true)
              }}
              className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-green-800 focus:border-transparent outline-none"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            maxLength={1000}
            placeholder="Tell customers what makes this collection special..."
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-green-800 focus:border-transparent outline-none resize-none"
            required
          />
          <p className="text-xs text-gray-400 mt-1">{description.length}/1000</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Launch Date (optional)</label>
          <input
            type="date"
            value={launchDate}
            onChange={(e) => setLaunchDate(e.target.value)}
            className="px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-green-800 focus:border-transparent outline-none"
          />
        </div>
      </div>

      {/* Cover Image */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="font-serif text-lg text-brand-green-800 mb-4">Cover Image *</h2>
        <p className="text-sm text-gray-500 mb-4">
          The main hero image shown at the top of this collection's page. One image only.
        </p>
        <ImageUploader
          value={cover}
          onChange={setCover}
          folder="mulaan/collections/covers"
          maxImages={1}
          label="Cover Image"
        />
      </div>

      {/* Lookbook Gallery */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="font-serif text-lg text-brand-green-800 mb-4">Lookbook Gallery</h2>
        <p className="text-sm text-gray-500 mb-4">
          Additional editorial/lookbook images shown throughout the collection page. Optional.
        </p>
        <ImageUploader
          value={media}
          onChange={setMedia}
          folder="mulaan/collections/gallery"
          maxImages={10}
          label="Gallery Images"
        />
      </div>

      {/* Settings */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 space-y-4">
        <h2 className="font-serif text-lg text-brand-green-800">Settings</h2>

        <div className="flex items-center justify-between py-2">
          <div>
            <p className="font-medium text-gray-800">Active</p>
            <p className="text-sm text-gray-500">Visible to customers on the storefront</p>
          </div>
          <button
            type="button"
            onClick={() => setIsActive(!isActive)}
            className={`relative w-12 h-6 rounded-full transition-colors ${
              isActive ? 'bg-brand-green-800' : 'bg-gray-300'
            }`}
          >
            <span
              className={`absolute top-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                isActive ? 'translate-x-6' : 'translate-x-0.5'
              }`}
            />
          </button>
        </div>

        <div className="flex items-center justify-between py-2 border-t border-gray-100">
          <div>
            <p className="font-medium text-gray-800">Featured</p>
            <p className="text-sm text-gray-500">Show prominently on the homepage</p>
          </div>
          <button
            type="button"
            onClick={() => setFeatured(!featured)}
            className={`relative w-12 h-6 rounded-full transition-colors ${
              featured ? 'bg-brand-green-800' : 'bg-gray-300'
            }`}
          >
            <span
              className={`absolute top-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                featured ? 'translate-x-6' : 'translate-x-0.5'
              }`}
            />
          </button>
        </div>

        <div className="pt-2 border-t border-gray-100">
          <label className="block text-sm font-medium text-gray-700 mb-1">Display Order</label>
          <input
            type="number"
            value={order}
            onChange={(e) => setOrder(Number(e.target.value))}
            className="w-32 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-green-800 focus:border-transparent outline-none"
          />
          <p className="text-xs text-gray-400 mt-1">Lower numbers appear first</p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3">
        <Button type="submit" variant="primary" disabled={isSubmitting}>
          {isSubmitting
            ? 'Saving...'
            : mode === 'create'
            ? 'Create Collection'
            : 'Save Changes'}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push('/admin/collections')}
          disabled={isSubmitting}
        >
          Cancel
        </Button>
      </div>
    </form>
  )
}