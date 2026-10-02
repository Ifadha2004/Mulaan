'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { Button } from '@/components/shared/ui'
import ImageUploader, { UploadedImage } from '@/components/admin/shared/ImageUploader'
import VariantManager, { Variant } from '@/components/admin/products/VariantManager'
import { slugify } from '@/lib/utils/slugify'
import { createProduct, updateProduct } from '@/lib/actions/product.actions'

interface CollectionOption { _id: string; name: string }
interface ProductFormProps {
  mode: 'create' | 'edit'; productId?: string; collections: CollectionOption[]
  initialData?: {
    name: string; slug: string; description: string; price: number
    isOnSale?: boolean; salePrice?: number; saleLabel?: string; saleStart?: string; saleEnd?: string
    images: { url: string; publicId?: string; alt?: string }[]; variants: Variant[]; collectionId?: string
    status: 'active' | 'sold_out' | 'pre_order' | 'archived'; isPreOrder: boolean
    preOrderStart?: string; preOrderEnd?: string; fabricDetails?: string; careInstructions?: string; featured: boolean
  }
}

const fieldClass = 'w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-transparent focus:ring-2 focus:ring-brand-green-800'

export default function ProductForm({ mode, productId, collections, initialData }: ProductFormProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [slugManuallyEdited, setSlugManuallyEdited] = useState(mode === 'edit')
  const [name, setName] = useState(initialData?.name || '')
  const [slug, setSlug] = useState(initialData?.slug || '')
  const [description, setDescription] = useState(initialData?.description || '')
  const [price, setPrice] = useState(initialData?.price ?? 0)
  const [isOnSale, setIsOnSale] = useState(initialData?.isOnSale ?? false)
  const [salePrice, setSalePrice] = useState(initialData?.salePrice ?? 0)
  const [saleLabel, setSaleLabel] = useState(initialData?.saleLabel || 'Launch Sale')
  const [saleStart, setSaleStart] = useState(initialData?.saleStart?.slice(0, 10) || '')
  const [saleEnd, setSaleEnd] = useState(initialData?.saleEnd?.slice(0, 10) || '')
  const [images, setImages] = useState<UploadedImage[]>((initialData?.images || []).map((image) => ({ url: image.url, publicId: image.publicId || '', alt: image.alt || '' })))
  const [variants, setVariants] = useState<Variant[]>(initialData?.variants || [])
  const [collectionId, setCollectionId] = useState(initialData?.collectionId || '')
  const [status, setStatus] = useState(initialData?.status || 'active')
  const [isPreOrder, setIsPreOrder] = useState(initialData?.isPreOrder ?? false)
  const [preOrderStart, setPreOrderStart] = useState(initialData?.preOrderStart?.slice(0, 10) || '')
  const [preOrderEnd, setPreOrderEnd] = useState(initialData?.preOrderEnd?.slice(0, 10) || '')
  const [fabricDetails, setFabricDetails] = useState(initialData?.fabricDetails || '')
  const [careInstructions, setCareInstructions] = useState(initialData?.careInstructions || '')
  const [featured, setFeatured] = useState(initialData?.featured ?? false)
  const discountPercent = price > 0 && salePrice > 0 && salePrice < price ? Math.round(((price - salePrice) / price) * 100) : 0

  const handleNameChange = (value: string) => {
    setName(value)
    if (!slugManuallyEdited) setSlug(slugify(value))
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    if (!name.trim() || !slug.trim() || !description.trim()) return toast.error('Name, slug, and description are required')
    if (price <= 0) return toast.error('Price must be greater than zero')
    if (!images.length) return toast.error('At least one product image is required')
    if (!variants.length) return toast.error('At least one size/color variant is required')
    if (variants.some((variant) => !variant.color.trim() || !variant.sku.trim())) return toast.error('Every variant needs a color and SKU')
    if (isPreOrder && (!preOrderStart || !preOrderEnd)) return toast.error('Pre-order dates are required')
    if (isOnSale && (salePrice <= 0 || salePrice >= price)) return toast.error('Sale price must be greater than zero and lower than the regular price')
    if (isOnSale && (!saleStart || !saleEnd)) return toast.error('Sale start and end dates are required')
    if (isOnSale && saleEnd <= saleStart) return toast.error('Sale end date must be later than the start date')

    setIsSubmitting(true)
    const payload = {
      name, slug, description, price, isOnSale,
      salePrice: isOnSale ? salePrice : undefined,
      saleLabel: isOnSale ? saleLabel : undefined,
      saleStart: isOnSale ? saleStart : undefined,
      saleEnd: isOnSale ? saleEnd : undefined,
      images: images.map((image) => ({ url: image.url, publicId: image.publicId, alt: image.alt })),
      variants, collectionId: collectionId || undefined, status, isPreOrder,
      preOrderStart: isPreOrder ? preOrderStart : undefined,
      preOrderEnd: isPreOrder ? preOrderEnd : undefined,
      fabricDetails, careInstructions, featured,
    }

    const result = mode === 'create' ? await createProduct(payload) : await updateProduct(productId!, payload)
    if (result.success) {
      toast.success(mode === 'create' ? 'Product created' : 'Product updated')
      router.push('/admin/products'); router.refresh()
    } else {
      toast.error(result.error || 'Something went wrong'); setIsSubmitting(false)
    }
  }

  const Toggle = ({ enabled, onClick }: { enabled: boolean; onClick: () => void }) => (
    <button type="button" aria-pressed={enabled} onClick={onClick} className={`relative h-6 w-12 rounded-full transition-colors ${enabled ? 'bg-brand-green-800' : 'bg-gray-300'}`}>
      <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition-transform ${enabled ? 'translate-x-6' : 'translate-x-0.5'}`} />
    </button>
  )

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl space-y-8">
      <section className="space-y-4 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="font-serif text-lg text-brand-green-800">Basic Information</h2>
        <div><label className="mb-1 block text-sm font-medium text-gray-700">Product Name *</label><input value={name} onChange={(e) => handleNameChange(e.target.value)} className={fieldClass} required /></div>
        <div><label className="mb-1 block text-sm font-medium text-gray-700">URL Slug *</label><div className="flex items-center gap-2"><span className="text-sm text-gray-400">/products/</span><input value={slug} onChange={(e) => { setSlug(slugify(e.target.value)); setSlugManuallyEdited(true) }} className={fieldClass} required /></div></div>
        <div><label className="mb-1 block text-sm font-medium text-gray-700">Description *</label><textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={4} maxLength={2000} className={`${fieldClass} resize-none`} required /><p className="mt-1 text-xs text-gray-400">{description.length}/2000</p></div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div><label className="mb-1 block text-sm font-medium text-gray-700">Regular Price (LKR) *</label><input type="number" min={0} step={0.01} value={price} onChange={(e) => setPrice(Number(e.target.value))} className={fieldClass} required /></div>
          <div><label className="mb-1 block text-sm font-medium text-gray-700">Collection</label><select value={collectionId} onChange={(e) => setCollectionId(e.target.value)} className={fieldClass}><option value="">None</option>{collections.map((collection) => <option key={collection._id} value={collection._id}>{collection.name}</option>)}</select></div>
        </div>
      </section>

      <section className="space-y-5 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between"><div><h2 className="font-serif text-lg text-brand-green-800">Sale &amp; Discount</h2><p className="text-sm text-gray-500">Schedule this product for the Sale page.</p></div><Toggle enabled={isOnSale} onClick={() => setIsOnSale(!isOnSale)} /></div>
        {isOnSale && <div className="space-y-4 border-t border-gray-100 pt-5">
          <div className="grid gap-4 sm:grid-cols-2"><div><label className="mb-1 block text-sm font-medium text-gray-700">Sale Price (LKR) *</label><input type="number" min={0} step={0.01} value={salePrice} onChange={(e) => setSalePrice(Number(e.target.value))} className={fieldClass} /></div><div><label className="mb-1 block text-sm font-medium text-gray-700">Sale Label</label><input value={saleLabel} onChange={(e) => setSaleLabel(e.target.value)} maxLength={60} className={fieldClass} /></div></div>
          {discountPercent > 0 && <p className="rounded-lg bg-amber-50 px-4 py-3 text-sm text-amber-800">Customer saves LKR {(price - salePrice).toFixed(2)} ({discountPercent}% off).</p>}
          <div className="grid gap-4 sm:grid-cols-2"><div><label className="mb-1 block text-sm font-medium text-gray-700">Start Date (Sri Lanka) *</label><input type="date" value={saleStart} onChange={(e) => setSaleStart(e.target.value)} className={fieldClass} /></div><div><label className="mb-1 block text-sm font-medium text-gray-700">End Date (Sri Lanka) *</label><input type="date" value={saleEnd} onChange={(e) => setSaleEnd(e.target.value)} className={fieldClass} /></div></div>
        </div>}
      </section>

      <section className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm"><h2 className="mb-1 font-serif text-lg text-brand-green-800">Product Images *</h2><p className="mb-4 text-sm text-gray-500">The first image is the listing photo; the second appears on hover.</p><ImageUploader value={images} onChange={setImages} folder="mulaan/products" maxImages={8} label="Product Images" /></section>
      <section className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm"><h2 className="mb-4 font-serif text-lg text-brand-green-800">Size &amp; Color Variants *</h2><VariantManager value={variants} onChange={setVariants} productSlug={slug} /></section>

      <section className="space-y-4 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="font-serif text-lg text-brand-green-800">Status</h2>
        <div><label className="mb-1 block text-sm font-medium text-gray-700">Product Status</label><select value={status} onChange={(e) => setStatus(e.target.value as typeof status)} className={fieldClass}><option value="active">Active — available for purchase</option><option value="sold_out">Sold Out — display only</option><option value="pre_order">Pre-Order — order window</option><option value="archived">Archived — hidden</option></select></div>
        <div className="flex items-center justify-between border-t border-gray-100 py-2"><div><p className="font-medium text-gray-800">Pre-Order Campaign</p><p className="text-sm text-gray-500">Enable an order window</p></div><Toggle enabled={isPreOrder} onClick={() => setIsPreOrder(!isPreOrder)} /></div>
        {isPreOrder && <div className="grid gap-4 sm:grid-cols-2"><input type="date" value={preOrderStart} onChange={(e) => setPreOrderStart(e.target.value)} className={fieldClass} /><input type="date" value={preOrderEnd} onChange={(e) => setPreOrderEnd(e.target.value)} className={fieldClass} /></div>}
        <div className="flex items-center justify-between border-t border-gray-100 py-2"><div><p className="font-medium text-gray-800">Featured</p><p className="text-sm text-gray-500">Show prominently on the homepage</p></div><Toggle enabled={featured} onClick={() => setFeatured(!featured)} /></div>
      </section>

      <section className="space-y-4 rounded-lg border border-gray-200 bg-white p-6 shadow-sm"><h2 className="font-serif text-lg text-brand-green-800">Product Details</h2><textarea value={fabricDetails} onChange={(e) => setFabricDetails(e.target.value)} rows={2} maxLength={500} placeholder="Fabric details" className={`${fieldClass} resize-none`} /><textarea value={careInstructions} onChange={(e) => setCareInstructions(e.target.value)} rows={2} maxLength={500} placeholder="Care instructions" className={`${fieldClass} resize-none`} /></section>
      <div className="flex gap-3"><Button type="submit" variant="primary" disabled={isSubmitting}>{isSubmitting ? 'Saving...' : mode === 'create' ? 'Create Product' : 'Save Changes'}</Button><Button type="button" variant="outline" onClick={() => router.push('/admin/products')} disabled={isSubmitting}>Cancel</Button></div>
    </form>
  )
}
