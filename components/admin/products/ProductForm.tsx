// /Users/ifadha/mulaan-website/components/admin/products/ProductForm.tsx:
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

import Button from '@/components/shared/ui/Button'
import ImageUploader, {
  UploadedImage,
} from '@/components/admin/shared/ImageUploader'
import VariantManager, {
  Variant,
} from '@/components/admin/products/VariantManager'

import { slugify } from '@/lib/utils/slugify'
import {
  createProduct,
  updateProduct,
} from '@/lib/actions/product.actions'

interface CollectionOption {
  _id: string
  name: string
}

interface ProductFormProps {
  mode: 'create' | 'edit'
  collections: CollectionOption[]

  initialData?: {
    _id: string
    name: string
    slug: string
    description: string
    price: number
    displayOrder?: number

    isOnSale?: boolean
    salePrice?: number
    saleLabel?: string
    saleStart?: string
    saleEnd?: string

    images: UploadedImage[]
    variants: Variant[]

    collectionId?: string

    status:
      | 'active'
      | 'sold_out'
      | 'pre_order'
      | 'archived'

    isPreOrder: boolean
    preOrderStart?: string
    preOrderEnd?: string

    fabricDetails?: string
    careInstructions?: string
    featured: boolean
  }
}

const fieldClass =
  'w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 outline-none transition-colors focus:border-brand-green-700 focus:ring-1 focus:ring-brand-green-700'

const labelClass =
  'mb-2 block text-sm font-medium text-gray-700'

export default function ProductForm({
  mode,
  collections,
  initialData,
}: ProductFormProps) {
  const router = useRouter()

  const [name, setName] = useState(initialData?.name ?? '')
  const [slug, setSlug] = useState(initialData?.slug ?? '')
  const [description, setDescription] = useState(
    initialData?.description ?? ''
  )

  const [price, setPrice] = useState(
    initialData?.price ?? 0
  )

  const [displayOrder, setDisplayOrder] = useState(
    initialData?.displayOrder ?? 999
  )

  const [collectionId, setCollectionId] = useState(
    initialData?.collectionId ?? ''
  )

  const [images, setImages] = useState<UploadedImage[]>(
    initialData?.images ?? []
  )

  const [variants, setVariants] = useState<Variant[]>(
    initialData?.variants ?? []
  )

  const [status, setStatus] = useState<
    'active' | 'sold_out' | 'pre_order' | 'archived'
  >(initialData?.status ?? 'active')

  const [featured, setFeatured] = useState(
    initialData?.featured ?? false
  )

  /*
   * Sale state
   */
  const [isOnSale, setIsOnSale] = useState(
    initialData?.isOnSale ?? false
  )

  const [salePrice, setSalePrice] = useState(
    initialData?.salePrice ?? 0
  )

  const [saleLabel, setSaleLabel] = useState(
    initialData?.saleLabel ?? 'Launch Sale'
  )

  const [saleStart, setSaleStart] = useState(
    initialData?.saleStart?.slice(0, 16) ?? ''
  )

  const [saleEnd, setSaleEnd] = useState(
    initialData?.saleEnd?.slice(0, 16) ?? ''
  )

  /*
   * Pre-order state
   */
  const [isPreOrder, setIsPreOrder] = useState(
    initialData?.isPreOrder ?? false
  )

  const [preOrderStart, setPreOrderStart] = useState(
    initialData?.preOrderStart?.slice(0, 16) ?? ''
  )

  const [preOrderEnd, setPreOrderEnd] = useState(
    initialData?.preOrderEnd?.slice(0, 16) ?? ''
  )

  /*
   * Additional product information
   */
  const [fabricDetails, setFabricDetails] = useState(
    initialData?.fabricDetails ?? ''
  )

  const [careInstructions, setCareInstructions] = useState(
    initialData?.careInstructions ?? ''
  )

  const [submitting, setSubmitting] = useState(false)

  const discountPercentage =
    isOnSale &&
    price > 0 &&
    salePrice > 0 &&
    salePrice < price
      ? Math.round(((price - salePrice) / price) * 100)
      : 0

  const handleNameChange = (value: string) => {
    setName(value)

    if (mode === 'create') {
      setSlug(slugify(value))
    }
  }

  const handleSlugChange = (value: string) => {
    setSlug(slugify(value))
  }

  const validateForm = () => {
    if (!name.trim()) {
      toast.error('Product name is required')
      return false
    }

    if (!slug.trim()) {
      toast.error('Product URL slug is required')
      return false
    }

    if (!description.trim()) {
      toast.error('Product description is required')
      return false
    }

    if (!Number.isFinite(price) || price <= 0) {
      toast.error('Product price must be greater than zero')
      return false
    }

    if (
      !Number.isInteger(displayOrder) ||
      displayOrder < 1 ||
      displayOrder > 9999
    ) {
      toast.error(
        'Display order must be a whole number between 1 and 9999'
      )
      return false
    }

    if (images.length === 0) {
      toast.error('At least one product image is required')
      return false
    }

    if (variants.length === 0) {
      toast.error(
        'At least one size and colour variant is required'
      )
      return false
    }

    const invalidVariant = variants.some(
      (variant) =>
        !variant.size?.trim() ||
        !variant.color?.trim() ||
        !variant.sku?.trim() ||
        Number(variant.stock) < 0
    )

    if (invalidVariant) {
      toast.error(
        'Complete all variant fields and enter valid stock quantities'
      )
      return false
    }

    if (isOnSale) {
      if (
        !Number.isFinite(salePrice) ||
        salePrice <= 0
      ) {
        toast.error(
          'Sale price must be greater than zero'
        )
        return false
      }

      if (salePrice >= price) {
        toast.error(
          'Sale price must be lower than the regular price'
        )
        return false
      }

      if (!saleLabel.trim()) {
        toast.error('Sale label is required')
        return false
      }

      if (!saleStart || !saleEnd) {
        toast.error(
          'Sale start and end dates are required'
        )
        return false
      }

      if (
        new Date(saleEnd).getTime() <=
        new Date(saleStart).getTime()
      ) {
        toast.error(
          'Sale end date must be after the start date'
        )
        return false
      }
    }

    if (isPreOrder) {
      if (!preOrderStart || !preOrderEnd) {
        toast.error(
          'Pre-order start and end dates are required'
        )
        return false
      }

      if (
        new Date(preOrderEnd).getTime() <=
        new Date(preOrderStart).getTime()
      ) {
        toast.error(
          'Pre-order end date must be after the start date'
        )
        return false
      }
    }

    return true
  }

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault()

    if (!validateForm()) {
      return
    }

    if (mode === 'edit' && !initialData?._id) {
      toast.error('Product ID is missing')
      return
    }

    const payload = {
      name: name.trim(),
      slug: slug.trim(),
      description: description.trim(),
      price,
      displayOrder,

      collectionId: collectionId || undefined,

      images: images.map((image, index) => ({
        url: image.url,
        publicId: image.publicId || undefined,
        alt: image.alt?.trim() || name.trim(),
        order: index,
      })),

      variants: variants.map((variant) => ({
        size: variant.size.trim(),
        color: variant.color.trim(),
        stock: Number(variant.stock),
        sku: variant.sku.trim(),
      })),

      status,
      featured,

      isOnSale,
      salePrice: isOnSale ? salePrice : undefined,
      saleLabel: isOnSale
        ? saleLabel.trim()
        : undefined,
      saleStart: isOnSale ? saleStart : undefined,
      saleEnd: isOnSale ? saleEnd : undefined,

      isPreOrder,
      preOrderStart: isPreOrder
        ? preOrderStart
        : undefined,
      preOrderEnd: isPreOrder
        ? preOrderEnd
        : undefined,

      fabricDetails:
        fabricDetails.trim() || undefined,

      careInstructions:
        careInstructions.trim() || undefined,
    }

    setSubmitting(true)

    try {
      const result =
        mode === 'create'
          ? await createProduct(payload)
          : await updateProduct(
              initialData!._id,
              payload
            )

      if (!result.success) {
        toast.error(
          result.error || 'Failed to save product'
        )
        return
      }

      toast.success(
        mode === 'create'
          ? 'Product created successfully'
          : 'Product updated successfully'
      )

      router.push('/admin/products')
      router.refresh()
    } catch (error) {
      console.error('Product save error:', error)

      toast.error(
        error instanceof Error
          ? error.message
          : 'Something went wrong while saving the product'
      )
    } finally {
      setSubmitting(false)
    }
  }

  const Toggle = ({
    checked,
    onChange,
    label,
  }: {
    checked: boolean
    onChange: (checked: boolean) => void
    label: string
  }) => (
    <label className="flex cursor-pointer items-center gap-3">
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={label}
        onClick={() => onChange(!checked)}
        className={`relative h-6 w-11 rounded-full transition-colors ${
          checked
            ? 'bg-brand-green-800'
            : 'bg-gray-300'
        }`}
      >
        <span
          className={`absolute top-1 h-4 w-4 rounded-full bg-white transition-transform ${
            checked
              ? 'translate-x-6'
              : 'translate-x-1'
          }`}
        />
      </button>

      <span className="text-sm font-medium text-gray-700">
        {label}
      </span>
    </label>
  )

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-8"
    >
      {/* Basic information */}
      <section className="rounded-lg border border-gray-200 bg-white p-6">
        <h2 className="mb-6 font-serif text-xl text-brand-green-800">
          Basic Information
        </h2>

        <div className="space-y-6">
          <div>
            <label
              htmlFor="product-name"
              className={labelClass}
            >
              Product Name *
            </label>

            <input
              id="product-name"
              type="text"
              value={name}
              onChange={(event) =>
                handleNameChange(event.target.value)
              }
              className={fieldClass}
              maxLength={150}
              required
            />
          </div>

          <div>
            <label
              htmlFor="product-slug"
              className={labelClass}
            >
              URL Slug *
            </label>

            <div className="flex items-center">
              <span className="shrink-0 text-sm text-gray-400">
                /products/
              </span>

              <input
                id="product-slug"
                type="text"
                value={slug}
                onChange={(event) =>
                  handleSlugChange(event.target.value)
                }
                className={`${fieldClass} ml-2`}
                maxLength={180}
                required
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="product-description"
              className={labelClass}
            >
              Description *
            </label>

            <textarea
              id="product-description"
              value={description}
              onChange={(event) =>
                setDescription(event.target.value)
              }
              rows={6}
              maxLength={2000}
              className={fieldClass}
              required
            />

            <p className="mt-1 text-right text-xs text-gray-400">
              {description.length}/2000
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label
                htmlFor="product-price"
                className={labelClass}
              >
                Price (LKR) *
              </label>

              <input
                id="product-price"
                type="number"
                min={0}
                step={0.01}
                value={price}
                onChange={(event) =>
                  setPrice(Number(event.target.value))
                }
                className={fieldClass}
                required
              />
            </div>

            <div>
              <label
                htmlFor="product-collection"
                className={labelClass}
              >
                Collection
              </label>

              <select
                id="product-collection"
                value={collectionId}
                onChange={(event) =>
                  setCollectionId(event.target.value)
                }
                className={fieldClass}
              >
                <option value="">None</option>

                {collections.map((collection) => (
                  <option
                    key={collection._id}
                    value={collection._id}
                  >
                    {collection.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label
              htmlFor="product-display-order"
              className={labelClass}
            >
              Storefront Display Order *
            </label>

            <input
              id="product-display-order"
              type="number"
              min={1}
              max={9999}
              step={1}
              value={displayOrder}
              onChange={(event) => {
                const parsedValue = Number.parseInt(
                  event.target.value,
                  10
                )

                setDisplayOrder(
                  Number.isNaN(parsedValue)
                    ? 1
                    : parsedValue
                )
              }}
              className={fieldClass}
              required
            />

            <p className="mt-2 text-xs leading-relaxed text-gray-400">
              Products with lower numbers appear first.
              For example, display order 1 appears before
              display order 2.
            </p>
          </div>
        </div>
      </section>

      {/* Sale configuration */}
      <section className="rounded-lg border border-gray-200 bg-white p-6">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h2 className="font-serif text-xl text-brand-green-800">
              Sale & Discount
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Schedule a discounted price for this
              product.
            </p>
          </div>

          <Toggle
            checked={isOnSale}
            onChange={setIsOnSale}
            label="Place this product on sale"
          />
        </div>

        {isOnSale && (
          <div className="mt-6 space-y-6 border-t border-gray-100 pt-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label
                  htmlFor="sale-price"
                  className={labelClass}
                >
                  Sale Price (LKR) *
                </label>

                <input
                  id="sale-price"
                  type="number"
                  min={0}
                  step={0.01}
                  value={salePrice}
                  onChange={(event) =>
                    setSalePrice(
                      Number(event.target.value)
                    )
                  }
                  className={fieldClass}
                  required={isOnSale}
                />

                {discountPercentage > 0 && (
                  <p className="mt-2 text-xs font-medium text-green-700">
                    {discountPercentage}% discount
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="sale-label"
                  className={labelClass}
                >
                  Sale Label *
                </label>

                <input
                  id="sale-label"
                  type="text"
                  value={saleLabel}
                  onChange={(event) =>
                    setSaleLabel(event.target.value)
                  }
                  maxLength={60}
                  className={fieldClass}
                  placeholder="Launch Sale"
                  required={isOnSale}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label
                  htmlFor="sale-start"
                  className={labelClass}
                >
                  Sale Starts *
                </label>

                <input
                  id="sale-start"
                  type="datetime-local"
                  value={saleStart}
                  onChange={(event) =>
                    setSaleStart(event.target.value)
                  }
                  className={fieldClass}
                  required={isOnSale}
                />
              </div>

              <div>
                <label
                  htmlFor="sale-end"
                  className={labelClass}
                >
                  Sale Ends *
                </label>

                <input
                  id="sale-end"
                  type="datetime-local"
                  value={saleEnd}
                  onChange={(event) =>
                    setSaleEnd(event.target.value)
                  }
                  className={fieldClass}
                  required={isOnSale}
                />
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Product images */}
      <section className="rounded-lg border border-gray-200 bg-white p-6">
        <h2 className="mb-2 font-serif text-xl text-brand-green-800">
          Product Images
        </h2>

        <p className="mb-6 text-sm text-gray-500">
          The first image will be used as the product
          cover.
        </p>

        <ImageUploader
          value={images}
          onChange={setImages}
          folder="mulaan/products"
        />
      </section>

      {/* Variants and inventory */}
      <section className="rounded-lg border border-gray-200 bg-white p-6">
        <h2 className="mb-2 font-serif text-xl text-brand-green-800">
          Variants & Inventory
        </h2>

        <p className="mb-6 text-sm text-gray-500">
          Add every available size and colour
          combination.
        </p>

        <VariantManager
          value={variants}
          onChange={setVariants}
        />
      </section>

      {/* Availability */}
      <section className="rounded-lg border border-gray-200 bg-white p-6">
        <h2 className="mb-6 font-serif text-xl text-brand-green-800">
          Availability
        </h2>

        <div className="space-y-6">
          <div>
            <label
              htmlFor="product-status"
              className={labelClass}
            >
              Product Status
            </label>

            <select
              id="product-status"
              value={status}
              onChange={(event) =>
                setStatus(
                  event.target.value as
                    | 'active'
                    | 'sold_out'
                    | 'pre_order'
                    | 'archived'
                )
              }
              className={fieldClass}
            >
              <option value="active">Active</option>
              <option value="sold_out">
                Sold Out
              </option>
              <option value="pre_order">
                Pre-Order
              </option>
              <option value="archived">
                Archived
              </option>
            </select>
          </div>

          <Toggle
            checked={featured}
            onChange={setFeatured}
            label="Feature this product"
          />

          <Toggle
            checked={isPreOrder}
            onChange={setIsPreOrder}
            label="Enable pre-order"
          />

          {isPreOrder && (
            <div className="grid grid-cols-1 gap-6 border-t border-gray-100 pt-6 md:grid-cols-2">
              <div>
                <label
                  htmlFor="preorder-start"
                  className={labelClass}
                >
                  Pre-Order Starts *
                </label>

                <input
                  id="preorder-start"
                  type="datetime-local"
                  value={preOrderStart}
                  onChange={(event) =>
                    setPreOrderStart(
                      event.target.value
                    )
                  }
                  className={fieldClass}
                  required={isPreOrder}
                />
              </div>

              <div>
                <label
                  htmlFor="preorder-end"
                  className={labelClass}
                >
                  Pre-Order Ends *
                </label>

                <input
                  id="preorder-end"
                  type="datetime-local"
                  value={preOrderEnd}
                  onChange={(event) =>
                    setPreOrderEnd(
                      event.target.value
                    )
                  }
                  className={fieldClass}
                  required={isPreOrder}
                />
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Product details */}
      <section className="rounded-lg border border-gray-200 bg-white p-6">
        <h2 className="mb-6 font-serif text-xl text-brand-green-800">
          Product Details
        </h2>

        <div className="space-y-6">
          <div>
            <label
              htmlFor="fabric-details"
              className={labelClass}
            >
              Fabric Details
            </label>

            <textarea
              id="fabric-details"
              value={fabricDetails}
              onChange={(event) =>
                setFabricDetails(event.target.value)
              }
              rows={4}
              maxLength={1000}
              className={fieldClass}
              placeholder="Describe the material, texture and finish."
            />
          </div>

          <div>
            <label
              htmlFor="care-instructions"
              className={labelClass}
            >
              Care Instructions
            </label>

            <textarea
              id="care-instructions"
              value={careInstructions}
              onChange={(event) =>
                setCareInstructions(event.target.value)
              }
              rows={4}
              maxLength={1000}
              className={fieldClass}
              placeholder="Add washing, drying and ironing instructions."
            />
          </div>
        </div>
      </section>

      {/* Form actions */}
      <div className="flex flex-col gap-3 sm:flex-row">
        <Button
          type="submit"
          variant="primary"
          disabled={submitting}
        >
          {submitting
            ? 'Saving...'
            : mode === 'create'
              ? 'Create Product'
              : 'Update Product'}
        </Button>

        <Button
          type="button"
          variant="outline"
          disabled={submitting}
          onClick={() =>
            router.push('/admin/products')
          }
        >
          Cancel
        </Button>
      </div>
    </form>
  )
}