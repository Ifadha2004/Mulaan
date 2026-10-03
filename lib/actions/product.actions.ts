// 'use server'

// import { connectDB } from '@/lib/db/mongodb'
// import Product from '@/lib/db/models/Product'
// import Collection from '@/lib/db/models/Collection'
// import cloudinary from '@/lib/cloudinary'
// import { requireAdminSession } from '@/lib/auth/session'
// import { revalidatePath } from 'next/cache'

// interface ProductImageInput { url: string; publicId?: string; alt?: string }
// interface ProductVariantInput { size: string; color: string; stock: number; sku: string }

// interface ProductFormData {
//   name: string
//   slug: string
//   description: string
//   price: number
//   displayOrder: number
//   isOnSale: boolean
//   salePrice?: number
//   saleLabel?: string
//   saleStart?: string
//   saleEnd?: string
//   images: ProductImageInput[]
//   variants: ProductVariantInput[]
//   collectionId?: string
//   status: 'active' | 'sold_out' | 'pre_order' | 'archived'
//   isPreOrder: boolean
//   preOrderStart?: string
//   preOrderEnd?: string
//   fabricDetails?: string
//   careInstructions?: string
//   featured: boolean
// }

// function parseOptionalDate(
//   value: string | undefined,
//   fieldName: string
// ): Date | undefined {
//   if (!value) {
//     return undefined
//   }

//   const date = new Date(value)

//   if (Number.isNaN(date.getTime())) {
//     throw new Error(`${fieldName} contains an invalid date`)
//   }

//   return date
// }

// function serialize<T>(value: T): T {
//   return JSON.parse(JSON.stringify(value))
// }

// function parseSriLankaDate(value?: string, endOfDay = false) {
//   if (!value) return undefined
//   return new Date(`${value}T${endOfDay ? '23:59:59.999' : '00:00:00.000'}+05:30`)
// }

// function validateSale(data: ProductFormData) {
//   if (!data.isOnSale) return null
//   if (!data.salePrice || data.salePrice <= 0) return 'Sale price must be greater than zero'
//   if (data.salePrice >= data.price) return 'Sale price must be lower than the regular price'
//   if (!data.saleStart || !data.saleEnd) return 'Sale start and end dates are required'
//   if (parseSriLankaDate(data.saleEnd, true)! <= parseSriLankaDate(data.saleStart)!) {
//     return 'Sale end date must be later than the start date'
//   }
//   return null
// }

// function validateProduct(data: ProductFormData) {
//   if (!data.name.trim() || !data.slug.trim() || !data.description.trim()) return 'Name, slug, and description are required'
//   if (!Number.isFinite(data.price) || data.price <= 0) return 'Price must be greater than zero'
//   if (
//   !Number.isInteger(data.displayOrder) ||
//   data.displayOrder < 1 ||
//   data.displayOrder > 9999
//   ) {
//     return 'Display order must be a whole number between 1 and 9999'
//   }
//   if (data.images.length === 0) return 'At least one product image is required'
//   if (data.variants.length === 0) return 'At least one size/color variant is required'
//   if (data.variants.some((variant) => !variant.color.trim() || !variant.sku.trim() || variant.stock < 0)) {
//     return 'Every variant requires a color, SKU, and valid stock quantity'
//   }
//   if (data.isPreOrder && (!data.preOrderStart || !data.preOrderEnd)) return 'Pre-order start and end dates are required'
//   return validateSale(data)
// }

// function productData(data: ProductFormData) {
//   return {
//     name: data.name.trim(),
//     slug: data.slug.trim().toLowerCase(),
//     description: data.description.trim(),
//     price: data.price,
//     displayOrder: data.displayOrder,
//     isOnSale: data.isOnSale,
//     ...(data.isOnSale && {
//       salePrice: data.salePrice,
//       saleLabel: data.saleLabel?.trim() || 'Launch Sale',
//       saleStart: parseSriLankaDate(data.saleStart),
//       saleEnd: parseSriLankaDate(data.saleEnd, true),
//     }),
//     images: data.images.map((image, index) => ({
//       url: image.url,
//       alt: image.alt || data.name,
//       order: index,
//       publicId: image.publicId,
//     })),
//     variants: data.variants,
//     collectionId: data.collectionId || undefined,
//     status: data.status,
//     isPreOrder: data.isPreOrder,
//     preOrderStart: data.preOrderStart ? parseSriLankaDate(data.preOrderStart) : undefined,
//     preOrderEnd: data.preOrderEnd ? parseSriLankaDate(data.preOrderEnd, true) : undefined,
//     fabricDetails: data.fabricDetails?.trim(),
//     careInstructions: data.careInstructions?.trim(),
//     featured: data.featured,
//   }
// }

// function revalidateProductPages(slug?: string) {
//   revalidatePath('/admin/products')
//   revalidatePath('/products')
//   revalidatePath('/sale')
//   revalidatePath('/collections')
//   if (slug) revalidatePath(`/products/${slug}`)
// }

// export async function getProducts() {
//   await connectDB()
//   const products = await Product.find()
//     .populate({ path: 'collectionId', model: Collection, select: 'name slug' })
//     .sort({ displayOrder: 1, createdAt: -1 })
//     .lean()
//   return serialize(products)
// }

// export async function getProductById(id: string) {
//   await connectDB()
//   const product = await Product.findById(id).lean()
//   return product ? serialize(product) : null
// }

// export async function getProductBySlug(slug: string) {
//   await connectDB()
//   const product = await Product.findOne({ slug, status: { $ne: 'archived' } }).lean()
//   return product ? serialize(product) : null
// }

// export async function getActiveProducts() {
//   await connectDB()

//   const products = await Product.find({
//     status: { $ne: 'archived' },
//   })
//     .sort({ displayOrder: 1, createdAt: -1 })
//     .lean()

//   return serialize(products)
// }

// export async function getSaleProducts() {
//   await connectDB()
//   const now = new Date()
//   const products = await Product.find({
//     status: 'active',
//     isOnSale: true,
//     salePrice: { $gt: 0 },
//     'variants.stock': { $gt: 0 },
//     $and: [
//       { $or: [{ saleStart: { $exists: false } }, { saleStart: null }, { saleStart: { $lte: now } }] },
//       { $or: [{ saleEnd: { $exists: false } }, { saleEnd: null }, { saleEnd: { $gte: now } }] },
//     ],
//   })
//     .populate({ path: 'collectionId', model: Collection, select: 'name slug' })
//     .sort({
//       displayOrder: 1,
//       saleEnd: 1,
//       createdAt: -1,
//     })
//     .lean()
//   return serialize(products)
// }

// export async function createProduct(data: ProductFormData) {
//   try {
//     await requireAdminSession()
//     await connectDB()

//     const validationError = validateProduct(data)
//     if (validationError) return { success: false, error: validationError }

//     const existing = await Product.findOne({ slug: data.slug })
//     if (existing) return { success: false, error: 'A product with this slug already exists' }

//     const product = await Product.create({ ...productData(data), views: 0 })
//     revalidateProductPages(data.slug)
//     return { success: true, id: product._id.toString() }
//   } catch (error: any) {
//     console.error('Create product error:', error)
//     if (error.code === 11000) return { success: false, error: 'A slug or SKU is already in use' }
//     return { success: false, error: error.message || 'Failed to create product' }
//   }
// }

// export async function updateProduct(id: string, data: ProductFormData) {
//   try {
//     await requireAdminSession()
//     await connectDB()

//     const validationError = validateProduct(data)
//     if (validationError) return { success: false, error: validationError }

//     const duplicate = await Product.findOne({ slug: data.slug, _id: { $ne: id } })
//     if (duplicate) return { success: false, error: 'A product with this slug already exists' }

//     const update = productData(data)
//     const product = await Product.findByIdAndUpdate(
//       id,
//       {
//         $set: update,
//         ...(!data.isOnSale && { $unset: { salePrice: 1, saleLabel: 1, saleStart: 1, saleEnd: 1 } }),
//       },
//       { new: true, runValidators: true }
//     )

//     if (!product) return { success: false, error: 'Product not found' }
//     revalidateProductPages(data.slug)
//     return { success: true }
//   } catch (error: any) {
//     console.error('Update product error:', error)
//     if (error.code === 11000) return { success: false, error: 'A slug or SKU is already in use' }
//     return { success: false, error: error.message || 'Failed to update product' }
//   }
// }

// export async function deleteProduct(id: string) {
//   try {
//     await requireAdminSession()
//     await connectDB()
//     const product = await Product.findById(id)
//     if (!product) return { success: false, error: 'Product not found' }

//     const publicIds = product.images.map((image: any) => image.publicId).filter(Boolean)
//     await Promise.allSettled(publicIds.map((publicId: string) => cloudinary.uploader.destroy(publicId)))
//     await Product.findByIdAndDelete(id)
//     revalidateProductPages(product.slug)
//     return { success: true }
//   } catch (error: any) {
//     console.error('Delete product error:', error)
//     return { success: false, error: error.message || 'Failed to delete product' }
//   }
// }

'use server'

import { revalidatePath } from 'next/cache'

import { requireAdminSession } from '@/lib/auth/session'
import cloudinary from '@/lib/cloudinary'
import { connectDB } from '@/lib/db/mongodb'
import Collection from '@/lib/db/models/Collection'
import Product from '@/lib/db/models/Product'

interface ProductImageInput {
  url: string
  publicId?: string
  alt?: string
}

interface ProductVariantInput {
  size: string
  color: string
  stock: number
  sku: string
}

interface ProductFormData {
  name: string
  slug: string
  description: string
  price: number
  displayOrder: number

  isOnSale: boolean
  salePrice?: number
  saleLabel?: string
  saleStart?: string
  saleEnd?: string

  images: ProductImageInput[]
  variants: ProductVariantInput[]
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

function serialize<T>(value: T): T {
  return JSON.parse(JSON.stringify(value))
}

/**
 * Converts form date values into valid Date objects.
 *
 * Supported formats:
 * - 2026-12-31
 * - 2026-12-31T18:29
 * - 2026-12-31T18:29:00
 * - Full ISO date strings
 *
 * Values without an explicit timezone are interpreted using
 * Sri Lanka Standard Time (+05:30).
 */
function parseSriLankaDate(
  value: string | undefined,
  endOfDay = false
): Date | undefined {
  if (!value?.trim()) {
    return undefined
  }

  const trimmedValue = value.trim()

  let normalizedValue: string

  const dateOnlyPattern = /^\d{4}-\d{2}-\d{2}$/

  const localDateTimePattern =
    /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}(?::\d{2}(?:\.\d{1,3})?)?$/

  if (dateOnlyPattern.test(trimmedValue)) {
    normalizedValue = `${trimmedValue}T${
      endOfDay ? '23:59:59.999' : '00:00:00.000'
    }+05:30`
  } else if (localDateTimePattern.test(trimmedValue)) {
    /*
     * datetime-local inputs do not include a timezone.
     * Treat the chosen time as Sri Lanka local time.
     */
    normalizedValue = `${trimmedValue}+05:30`
  } else {
    /*
     * Full ISO strings already containing Z or an offset can
     * be passed directly to the Date constructor.
     */
    normalizedValue = trimmedValue
  }

  const parsedDate = new Date(normalizedValue)

  if (Number.isNaN(parsedDate.getTime())) {
    throw new Error(
      `Invalid date value received: "${trimmedValue}"`
    )
  }

  return parsedDate
}

function validateSale(
  data: ProductFormData
): string | null {
  if (!data.isOnSale) {
    return null
  }

  if (
    !Number.isFinite(data.salePrice) ||
    !data.salePrice ||
    data.salePrice <= 0
  ) {
    return 'Sale price must be greater than zero'
  }

  if (data.salePrice >= data.price) {
    return 'Sale price must be lower than the regular price'
  }

  if (!data.saleStart || !data.saleEnd) {
    return 'Sale start and end dates are required'
  }

  const saleStart = parseSriLankaDate(data.saleStart)
  const saleEnd = parseSriLankaDate(
    data.saleEnd,
    true
  )

  if (!saleStart || !saleEnd) {
    return 'Sale start and end dates are required'
  }

  if (saleEnd.getTime() <= saleStart.getTime()) {
    return 'Sale end date must be later than the start date'
  }

  return null
}

function validatePreOrder(
  data: ProductFormData
): string | null {
  if (!data.isPreOrder) {
    return null
  }

  if (!data.preOrderStart || !data.preOrderEnd) {
    return 'Pre-order start and end dates are required'
  }

  const preOrderStart = parseSriLankaDate(
    data.preOrderStart
  )

  const preOrderEnd = parseSriLankaDate(
    data.preOrderEnd,
    true
  )

  if (!preOrderStart || !preOrderEnd) {
    return 'Pre-order start and end dates are required'
  }

  if (
    preOrderEnd.getTime() <=
    preOrderStart.getTime()
  ) {
    return 'Pre-order end date must be later than the start date'
  }

  return null
}

function validateProduct(
  data: ProductFormData
): string | null {
  if (
    !data.name.trim() ||
    !data.slug.trim() ||
    !data.description.trim()
  ) {
    return 'Name, slug, and description are required'
  }

  if (
    !Number.isFinite(data.price) ||
    data.price <= 0
  ) {
    return 'Price must be greater than zero'
  }

  if (
    !Number.isInteger(data.displayOrder) ||
    data.displayOrder < 1 ||
    data.displayOrder > 9999
  ) {
    return 'Display order must be a whole number between 1 and 9999'
  }

  if (!Array.isArray(data.images)) {
    return 'Product images must be provided'
  }

  if (data.images.length === 0) {
    return 'At least one product image is required'
  }

  const invalidImage = data.images.some(
    (image) => !image.url?.trim()
  )

  if (invalidImage) {
    return 'Every product image requires a valid URL'
  }

  if (!Array.isArray(data.variants)) {
    return 'Product variants must be provided'
  }

  if (data.variants.length === 0) {
    return 'At least one size/color variant is required'
  }

  const invalidVariant = data.variants.some(
    (variant) =>
      !variant.size?.trim() ||
      !variant.color?.trim() ||
      !variant.sku?.trim() ||
      !Number.isInteger(Number(variant.stock)) ||
      Number(variant.stock) < 0
  )

  if (invalidVariant) {
    return 'Every variant requires a size, color, SKU, and valid stock quantity'
  }

  const duplicateSkus = new Set<string>()

  for (const variant of data.variants) {
    const normalizedSku = variant.sku
      .trim()
      .toUpperCase()

    if (duplicateSkus.has(normalizedSku)) {
      return `Duplicate SKU found: ${normalizedSku}`
    }

    duplicateSkus.add(normalizedSku)
  }

  const preOrderError = validatePreOrder(data)

  if (preOrderError) {
    return preOrderError
  }

  return validateSale(data)
}

function buildProductData(data: ProductFormData) {
  const productData = {
    name: data.name.trim(),
    slug: data.slug.trim().toLowerCase(),
    description: data.description.trim(),
    price: data.price,
    displayOrder: data.displayOrder,

    images: data.images.map((image, index) => ({
      url: image.url.trim(),
      alt: image.alt?.trim() || data.name.trim(),
      order: index,
      publicId: image.publicId?.trim() || undefined,
    })),

    variants: data.variants.map((variant) => ({
      size: variant.size.trim(),
      color: variant.color.trim(),
      stock: Number(variant.stock),
      sku: variant.sku.trim().toUpperCase(),
    })),

    collectionId: data.collectionId || undefined,
    status: data.status,

    fabricDetails:
      data.fabricDetails?.trim() || undefined,

    careInstructions:
      data.careInstructions?.trim() || undefined,

    featured: data.featured,

    isOnSale: data.isOnSale,

    ...(data.isOnSale
      ? {
          salePrice: data.salePrice,
          saleLabel:
            data.saleLabel?.trim() || 'Launch Sale',
          saleStart: parseSriLankaDate(
            data.saleStart
          ),
          saleEnd: parseSriLankaDate(
            data.saleEnd,
            true
          ),
        }
      : {}),

    isPreOrder: data.isPreOrder,

    ...(data.isPreOrder
      ? {
          preOrderStart: parseSriLankaDate(
            data.preOrderStart
          ),
          preOrderEnd: parseSriLankaDate(
            data.preOrderEnd,
            true
          ),
        }
      : {}),
  }

  return productData
}

function revalidateProductPages(slug?: string) {
  revalidatePath('/admin/products')
  revalidatePath('/products')
  revalidatePath('/sale')
  revalidatePath('/collections')

  if (slug) {
    revalidatePath(`/products/${slug}`)
  }
}

export async function getProducts() {
  await connectDB()

  const products = await Product.find()
    .populate({
      path: 'collectionId',
      model: Collection,
      select: 'name slug',
    })
    .sort({
      displayOrder: 1,
      createdAt: -1,
    })
    .lean()

  return serialize(products)
}

export async function getProductById(id: string) {
  await connectDB()

  const product = await Product.findById(id).lean()

  return product ? serialize(product) : null
}

export async function getProductBySlug(
  slug: string
) {
  await connectDB()

  const product = await Product.findOne({
    slug,
    status: {
      $ne: 'archived',
    },
  }).lean()

  return product ? serialize(product) : null
}

export async function getActiveProducts() {
  await connectDB()

  const products = await Product.find({
    status: {
      $ne: 'archived',
    },
  })
    .sort({
      displayOrder: 1,
      createdAt: -1,
    })
    .lean()

  return serialize(products)
}

export async function getSaleProducts() {
  await connectDB()

  const now = new Date()

  const products = await Product.find({
    status: 'active',
    isOnSale: true,
    salePrice: {
      $gt: 0,
    },
    'variants.stock': {
      $gt: 0,
    },
    $and: [
      {
        $or: [
          {
            saleStart: {
              $exists: false,
            },
          },
          {
            saleStart: null,
          },
          {
            saleStart: {
              $lte: now,
            },
          },
        ],
      },
      {
        $or: [
          {
            saleEnd: {
              $exists: false,
            },
          },
          {
            saleEnd: null,
          },
          {
            saleEnd: {
              $gte: now,
            },
          },
        ],
      },
    ],
  })
    .populate({
      path: 'collectionId',
      model: Collection,
      select: 'name slug',
    })
    .sort({
      displayOrder: 1,
      saleEnd: 1,
      createdAt: -1,
    })
    .lean()

  return serialize(products)
}

export async function createProduct(
  data: ProductFormData
) {
  try {
    await requireAdminSession()
    await connectDB()

    const validationError = validateProduct(data)

    if (validationError) {
      return {
        success: false,
        error: validationError,
      }
    }

    const normalizedSlug = data.slug
      .trim()
      .toLowerCase()

    const existing = await Product.findOne({
      slug: normalizedSlug,
    }).lean()

    if (existing) {
      return {
        success: false,
        error:
          'A product with this slug already exists',
      }
    }

    const product = await Product.create({
      ...buildProductData(data),
      views: 0,
    })

    revalidateProductPages(normalizedSlug)

    return {
      success: true,
      id: product._id.toString(),
    }
  } catch (error: unknown) {
    console.error('Create product error:', error)

    if (
      typeof error === 'object' &&
      error !== null &&
      'code' in error &&
      error.code === 11000
    ) {
      return {
        success: false,
        error: 'A slug or SKU is already in use',
      }
    }

    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : 'Failed to create product',
    }
  }
}

export async function updateProduct(
  id: string,
  data: ProductFormData
) {
  try {
    await requireAdminSession()
    await connectDB()

    const validationError = validateProduct(data)

    if (validationError) {
      return {
        success: false,
        error: validationError,
      }
    }

    const normalizedSlug = data.slug
      .trim()
      .toLowerCase()

    const duplicate = await Product.findOne({
      slug: normalizedSlug,
      _id: {
        $ne: id,
      },
    }).lean()

    if (duplicate) {
      return {
        success: false,
        error:
          'A product with this slug already exists',
      }
    }

    const updateData = buildProductData(data)

    const fieldsToUnset: Record<string, 1> = {}

    if (!data.isOnSale) {
      fieldsToUnset.salePrice = 1
      fieldsToUnset.saleLabel = 1
      fieldsToUnset.saleStart = 1
      fieldsToUnset.saleEnd = 1
    }

    if (!data.isPreOrder) {
      fieldsToUnset.preOrderStart = 1
      fieldsToUnset.preOrderEnd = 1
    }

    const updateOperation: {
      $set: ReturnType<typeof buildProductData>
      $unset?: Record<string, 1>
    } = {
      $set: updateData,
    }

    if (Object.keys(fieldsToUnset).length > 0) {
      updateOperation.$unset = fieldsToUnset
    }

    const product = await Product.findByIdAndUpdate(
      id,
      updateOperation,
      {
        new: true,
        runValidators: true,
      }
    )

    if (!product) {
      return {
        success: false,
        error: 'Product not found',
      }
    }

    revalidateProductPages(product.slug)

    return {
      success: true,
    }
  } catch (error: unknown) {
    console.error('Update product error:', error)

    if (
      typeof error === 'object' &&
      error !== null &&
      'code' in error &&
      error.code === 11000
    ) {
      return {
        success: false,
        error: 'A slug or SKU is already in use',
      }
    }

    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : 'Failed to update product',
    }
  }
}

export async function deleteProduct(id: string) {
  try {
    await requireAdminSession()
    await connectDB()

    const product = await Product.findById(id)

    if (!product) {
      return {
        success: false,
        error: 'Product not found',
      }
    }

    const publicIds = product.images
      .map((image: ProductImageInput) => image.publicId)
      .filter(
        (publicId): publicId is string =>
          Boolean(publicId)
      )

    await Promise.allSettled(
      publicIds.map((publicId) =>
        cloudinary.uploader.destroy(publicId)
      )
    )

    await Product.findByIdAndDelete(id)

    revalidateProductPages(product.slug)

    return {
      success: true,
    }
  } catch (error: unknown) {
    console.error('Delete product error:', error)

    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : 'Failed to delete product',
    }
  }
}