'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { Button } from '@/components/shared/ui'
import ImageUploader, { UploadedImage } from '@/components/admin/shared/ImageUploader'
import VariantManager, { Variant } from '@/components/admin/products/VariantManager'
import { slugify } from '@/lib/utils/slugify'
import { createProduct, updateProduct } from '@/lib/actions/product.actions'

interface CollectionOption {
  _id: string
  name: string
}

interface ProductFormProps {
  mode: 'create' | 'edit'
  productId?: string
  collections: CollectionOption[]
  initialData?: {
    name: string
    slug: string
    description: string
    price: number
    images: { url: string; publicId?: string; alt?: string }[]
    variants: Variant[]
    collectionId?: string
    status: 'active' | 'sold_out' | 'pre_order' | 'archived'
    isPreOrder: boolean
    preOrderStart?: string
    preOrderEnd?: string
    fabricDetails?: string
    careInstructions?: string
    featured: boolean
  }
}

export default function ProductForm({ mode, productId, collections, initialData }: ProductFormProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [slugManuallyEdited, setSlugManuallyEdited] = useState(mode === 'edit')

  const [name, setName] = useState(initialData?.name || '')
  const [slug, setSlug] = useState(initialData?.slug || '')
  const [description, setDescription] = useState(initialData?.description || '')
  const [price, setPrice] = useState(initialData?.price ?? 0)
  const [images, setImages] = useState<UploadedImage[]>(
    (initialData?.images || []).map((img) => ({
      url: img.url,
      publicId: img.publicId || '',
      alt: img.alt || '',
    }))
  )
  const [variants, setVariants] = useState<Variant[]>(initialData?.variants || [])
  const [collectionId, setCollectionId] = useState(initialData?.collectionId || '')
  const [status, setStatus] = useState(initialData?.status || 'active')
  const [isPreOrder, setIsPreOrder] = useState(initialData?.isPreOrder ?? false)
  const [preOrderStart, setPreOrderStart] = useState(initialData?.preOrderStart?.slice(0, 10) || '')
  const [preOrderEnd, setPreOrderEnd] = useState(initialData?.preOrderEnd?.slice(0, 10) || '')
  const [fabricDetails, setFabricDetails] = useState(initialData?.fabricDetails || '')
  const [careInstructions, setCareInstructions] = useState(initialData?.careInstructions || '')
  const [featured, setFeatured] = useState(initialData?.featured ?? false)

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
    if (price <= 0) {
      toast.error('Price must be greater than 0')
      return
    }
    if (images.length === 0) {
      toast.error('At least one product image is required')
      return
    }
    if (variants.length === 0) {
      toast.error('At least one size/color variant is required')
      return
    }
    if (variants.some((v) => !v.color.trim() || !v.sku.trim())) {
      toast.error('Every variant needs a color and SKU filled in')
      return
    }
    if (isPreOrder && (!preOrderStart || !preOrderEnd)) {
      toast.error('Pre-order start and end dates are required when pre-order is enabled')
      return
    }

    setIsSubmitting(true)

    const payload = {
      name,
      slug,
      description,
      price,
      images: images.map((img) => ({ url: img.url, publicId: img.publicId, alt: img.alt })),
      variants,
      collectionId: collectionId || undefined,
      status,
      isPreOrder,
      preOrderStart: isPreOrder ? preOrderStart : undefined,
      preOrderEnd: isPreOrder ? preOrderEnd : undefined,
      fabricDetails,
      careInstructions,
      featured,
    }

    const result =
      mode === 'create'
        ? await createProduct(payload)
        : await updateProduct(productId!, payload)

    if (result.success) {
      toast.success(mode === 'create' ? 'Product created' : 'Product updated')
      router.push('/admin/products')
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
          <label className="block text-sm font-medium text-gray-700 mb-1">Product Name *</label>
          <input
            type="text"
            value={name}
            onChange={(e) => handleNameChange(e.target.value)}
            placeholder="e.g. Elegant Black Abaya"
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-green-800 focus:border-transparent outline-none"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">URL Slug *</label>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-400">/products/</span>
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
            maxLength={2000}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-green-800 focus:border-transparent outline-none resize-none"
            required
          />
          <p className="text-xs text-gray-400 mt-1">{description.length}/2000</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Price (AED) *</label>
            <input
              type="number"
              min={0}
              step={0.01}
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-green-800 focus:border-transparent outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Collection</label>
            <select
              value={collectionId}
              onChange={(e) => setCollectionId(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-green-800 focus:border-transparent outline-none"
            >
              <option value="">None</option>
              {collections.map((c) => (
                <option key={c._id} value={c._id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Images */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="font-serif text-lg text-brand-green-800 mb-1">Product Images *</h2>
        <p className="text-sm text-gray-500 mb-4">
          First image is the main listing photo; the second shows on hover in the product grid.
        </p>
        <ImageUploader
          value={images}
          onChange={setImages}
          folder="mulaan/products"
          maxImages={8}
          label="Product Images"
        />
      </div>

      {/* Variants */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="font-serif text-lg text-brand-green-800 mb-4">Size &amp; Color Variants *</h2>
        <VariantManager value={variants} onChange={setVariants} productSlug={slug} />
      </div>

      {/* Status & Pre-order */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 space-y-4">
        <h2 className="font-serif text-lg text-brand-green-800">Status</h2>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Product Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as typeof status)}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-green-800 focus:border-transparent outline-none"
          >
            <option value="active">Active — available for purchase</option>
            <option value="sold_out">Sold Out — display only, no ordering</option>
            <option value="pre_order">Pre-Order — countdown + order window</option>
            <option value="archived">Archived — hidden from storefront</option>
          </select>
        </div>

        <div className="flex items-center justify-between py-2 border-t border-gray-100">
          <div>
            <p className="font-medium text-gray-800">Pre-Order Campaign</p>
            <p className="text-sm text-gray-500">Enable a countdown timer with an order window</p>
          </div>
          <button
            type="button"
            onClick={() => setIsPreOrder(!isPreOrder)}
            className={`relative w-12 h-6 rounded-full transition-colors ${
              isPreOrder ? 'bg-brand-green-800' : 'bg-gray-300'
            }`}
          >
            <span
              className={`absolute top-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                isPreOrder ? 'translate-x-6' : 'translate-x-0.5'
              }`}
            />
          </button>
        </div>

        {isPreOrder && (
          <div className="grid grid-cols-2 gap-4 pt-2">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
              <input
                type="date"
                value={preOrderStart}
                onChange={(e) => setPreOrderStart(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-green-800 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
              <input
                type="date"
                value={preOrderEnd}
                onChange={(e) => setPreOrderEnd(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-green-800 outline-none"
              />
            </div>
          </div>
        )}

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
      </div>

      {/* Product Details */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 space-y-4">
        <h2 className="font-serif text-lg text-brand-green-800">Product Details</h2>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Fabric Details</label>
          <textarea
            value={fabricDetails}
            onChange={(e) => setFabricDetails(e.target.value)}
            rows={2}
            maxLength={500}
            placeholder="e.g. Premium polyester blend with a soft, breathable finish."
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-green-800 focus:border-transparent outline-none resize-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Care Instructions</label>
          <textarea
            value={careInstructions}
            onChange={(e) => setCareInstructions(e.target.value)}
            rows={2}
            maxLength={500}
            placeholder="e.g. Machine wash cold. Tumble dry low."
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-green-800 focus:border-transparent outline-none resize-none"
          />
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3">
        <Button type="submit" variant="primary" disabled={isSubmitting}>
          {isSubmitting ? 'Saving...' : mode === 'create' ? 'Create Product' : 'Save Changes'}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push('/admin/products')}
          disabled={isSubmitting}
        >
          Cancel
        </Button>
      </div>
    </form>
  )
}