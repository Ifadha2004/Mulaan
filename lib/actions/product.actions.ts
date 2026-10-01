// 'use server'

// import { connectDB } from '@/lib/db/mongodb'
// import Product from '@/lib/db/models/Product'
// import Collection from '@/lib/db/models/Collection'
// import cloudinary from '@/lib/cloudinary'
// import { requireAdminSession } from '@/lib/auth/session'
// import { revalidatePath } from 'next/cache'

// interface ProductImageInput {
//   url: string
//   publicId?: string
//   alt?: string
// }

// interface ProductVariantInput {
//   size: string
//   color: string
//   stock: number
//   sku: string
// }

// interface ProductFormData {
//   name: string
//   slug: string
//   description: string
//   price: number
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

// function serialize<T>(doc: T): T {
//   return JSON.parse(JSON.stringify(doc))
// }

// export async function getProducts() {
//   await connectDB()

//   const products = await Product.find()
//     .populate({
//       path: 'collectionId',
//       model: Collection,
//       select: 'name slug',
//     })
//     .sort({ createdAt: -1 })
//     .lean()

//   return serialize(products)
// }

// export async function getProductById(id: string) {
//   await connectDB()
//   const product = await Product.findById(id)
//   if (!product) return null
//   return serialize(product)
// }

// export async function getProductBySlug(slug: string) {
//   await connectDB()
//   const product = await Product.findOne({ slug, status: { $ne: 'archived' } })
//   if (!product) return null
//   return serialize(product)
// }

// export async function getActiveProducts() {
//   await connectDB()
//   const products = await Product.find({ status: { $ne: 'archived' } }).sort({ createdAt: -1 })
//   return serialize(products)
// }

// export async function createProduct(data: ProductFormData) {
//   try {
//     await requireAdminSession()
//     await connectDB()

//     const existing = await Product.findOne({ slug: data.slug })
//     if (existing) {
//       return { success: false, error: 'A product with this slug already exists' }
//     }

//     if (data.images.length === 0) {
//       return { success: false, error: 'At least one product image is required' }
//     }
//     if (data.variants.length === 0) {
//       return { success: false, error: 'At least one size/color variant is required' }
//     }

//     const product = await Product.create({
//       name: data.name,
//       slug: data.slug,
//       description: data.description,
//       price: data.price,
//       images: data.images.map((img, i) => ({
//         url: img.url,
//         alt: img.alt || data.name,
//         order: i,
//         publicId: img.publicId,
//       })),
//       variants: data.variants,
//       collectionId: data.collectionId || undefined,
//       status: data.status,
//       isPreOrder: data.isPreOrder,
//       preOrderStart: data.preOrderStart ? new Date(data.preOrderStart) : undefined,
//       preOrderEnd: data.preOrderEnd ? new Date(data.preOrderEnd) : undefined,
//       fabricDetails: data.fabricDetails,
//       careInstructions: data.careInstructions,
//       featured: data.featured,
//       views: 0,
//     })

//     revalidatePath('/admin/products')
//     revalidatePath('/products')

//     return { success: true, id: product._id.toString() }
//   } catch (error: any) {
//     console.error('Create product error:', error)
//     if (error.code === 11000) {
//       return { success: false, error: 'One of the SKUs is already in use by another product' }
//     }
//     return { success: false, error: error.message || 'Failed to create product' }
//   }
// }

// export async function updateProduct(id: string, data: ProductFormData) {
//   try {
//     await requireAdminSession()
//     await connectDB()

//     const existing = await Product.findOne({ slug: data.slug, _id: { $ne: id } })
//     if (existing) {
//       return { success: false, error: 'A product with this slug already exists' }
//     }
//     if (data.images.length === 0) {
//       return { success: false, error: 'At least one product image is required' }
//     }
//     if (data.variants.length === 0) {
//       return { success: false, error: 'At least one size/color variant is required' }
//     }

//     const product = await Product.findByIdAndUpdate(
//       id,
//       {
//         name: data.name,
//         slug: data.slug,
//         description: data.description,
//         price: data.price,
//         images: data.images.map((img, i) => ({
//           url: img.url,
//           alt: img.alt || data.name,
//           order: i,
//           publicId: img.publicId,
//         })),
//         variants: data.variants,
//         collectionId: data.collectionId || undefined,
//         status: data.status,
//         isPreOrder: data.isPreOrder,
//         preOrderStart: data.preOrderStart ? new Date(data.preOrderStart) : undefined,
//         preOrderEnd: data.preOrderEnd ? new Date(data.preOrderEnd) : undefined,
//         fabricDetails: data.fabricDetails,
//         careInstructions: data.careInstructions,
//         featured: data.featured,
//       },
//       { new: true, runValidators: true }
//     )

//     if (!product) {
//       return { success: false, error: 'Product not found' }
//     }

//     revalidatePath('/admin/products')
//     revalidatePath('/products')
//     revalidatePath(`/products/${data.slug}`)

//     return { success: true }
//   } catch (error: any) {
//     console.error('Update product error:', error)
//     if (error.code === 11000) {
//       return { success: false, error: 'One of the SKUs is already in use by another product' }
//     }
//     return { success: false, error: error.message || 'Failed to update product' }
//   }
// }

// export async function deleteProduct(id: string) {
//   try {
//     await requireAdminSession()
//     await connectDB()

//     const product = await Product.findById(id)
//     if (!product) {
//       return { success: false, error: 'Product not found' }
//     }

//     const publicIds = product.images.map((img: any) => img.publicId).filter(Boolean)
//     await Promise.allSettled(publicIds.map((pid: string) => cloudinary.uploader.destroy(pid)))

//     await Product.findByIdAndDelete(id)

//     revalidatePath('/admin/products')
//     revalidatePath('/products')

//     return { success: true }
//   } catch (error: any) {
//     console.error('Delete product error:', error)
//     return { success: false, error: error.message || 'Failed to delete product' }
//   }
// }


'use server'

import { connectDB } from '@/lib/db/mongodb'
import Product from '@/lib/db/models/Product'
import Collection from '@/lib/db/models/Collection'
import cloudinary from '@/lib/cloudinary'
import { requireAdminSession } from '@/lib/auth/session'
import { revalidatePath } from 'next/cache'

interface ProductImageInput { url: string; publicId?: string; alt?: string }
interface ProductVariantInput { size: string; color: string; stock: number; sku: string }

interface ProductFormData {
  name: string
  slug: string
  description: string
  price: number
  isOnSale: boolean
  salePrice?: number
  saleLabel?: string
  saleStart?: string
  saleEnd?: string
  images: ProductImageInput[]
  variants: ProductVariantInput[]
  collectionId?: string
  status: 'active' | 'sold_out' | 'pre_order' | 'archived'
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

function parseSriLankaDate(value?: string, endOfDay = false) {
  if (!value) return undefined
  return new Date(`${value}T${endOfDay ? '23:59:59.999' : '00:00:00.000'}+05:30`)
}

function validateSale(data: ProductFormData) {
  if (!data.isOnSale) return null
  if (!data.salePrice || data.salePrice <= 0) return 'Sale price must be greater than zero'
  if (data.salePrice >= data.price) return 'Sale price must be lower than the regular price'
  if (!data.saleStart || !data.saleEnd) return 'Sale start and end dates are required'
  if (parseSriLankaDate(data.saleEnd, true)! <= parseSriLankaDate(data.saleStart)!) {
    return 'Sale end date must be later than the start date'
  }
  return null
}

function validateProduct(data: ProductFormData) {
  if (!data.name.trim() || !data.slug.trim() || !data.description.trim()) return 'Name, slug, and description are required'
  if (!Number.isFinite(data.price) || data.price <= 0) return 'Price must be greater than zero'
  if (data.images.length === 0) return 'At least one product image is required'
  if (data.variants.length === 0) return 'At least one size/color variant is required'
  if (data.variants.some((variant) => !variant.color.trim() || !variant.sku.trim() || variant.stock < 0)) {
    return 'Every variant requires a color, SKU, and valid stock quantity'
  }
  if (data.isPreOrder && (!data.preOrderStart || !data.preOrderEnd)) return 'Pre-order start and end dates are required'
  return validateSale(data)
}

function productData(data: ProductFormData) {
  return {
    name: data.name.trim(),
    slug: data.slug.trim().toLowerCase(),
    description: data.description.trim(),
    price: data.price,
    isOnSale: data.isOnSale,
    ...(data.isOnSale && {
      salePrice: data.salePrice,
      saleLabel: data.saleLabel?.trim() || 'Launch Sale',
      saleStart: parseSriLankaDate(data.saleStart),
      saleEnd: parseSriLankaDate(data.saleEnd, true),
    }),
    images: data.images.map((image, index) => ({
      url: image.url,
      alt: image.alt || data.name,
      order: index,
      publicId: image.publicId,
    })),
    variants: data.variants,
    collectionId: data.collectionId || undefined,
    status: data.status,
    isPreOrder: data.isPreOrder,
    preOrderStart: data.preOrderStart ? parseSriLankaDate(data.preOrderStart) : undefined,
    preOrderEnd: data.preOrderEnd ? parseSriLankaDate(data.preOrderEnd, true) : undefined,
    fabricDetails: data.fabricDetails?.trim(),
    careInstructions: data.careInstructions?.trim(),
    featured: data.featured,
  }
}

function revalidateProductPages(slug?: string) {
  revalidatePath('/admin/products')
  revalidatePath('/products')
  revalidatePath('/sale')
  revalidatePath('/collections')
  if (slug) revalidatePath(`/products/${slug}`)
}

export async function getProducts() {
  await connectDB()
  const products = await Product.find()
    .populate({ path: 'collectionId', model: Collection, select: 'name slug' })
    .sort({ createdAt: -1 })
    .lean()
  return serialize(products)
}

export async function getProductById(id: string) {
  await connectDB()
  const product = await Product.findById(id).lean()
  return product ? serialize(product) : null
}

export async function getProductBySlug(slug: string) {
  await connectDB()
  const product = await Product.findOne({ slug, status: { $ne: 'archived' } }).lean()
  return product ? serialize(product) : null
}

export async function getActiveProducts() {
  await connectDB()
  const products = await Product.find({ status: { $ne: 'archived' } }).sort({ createdAt: -1 }).lean()
  return serialize(products)
}

export async function getSaleProducts() {
  await connectDB()
  const now = new Date()
  const products = await Product.find({
    status: 'active',
    isOnSale: true,
    salePrice: { $gt: 0 },
    'variants.stock': { $gt: 0 },
    $and: [
      { $or: [{ saleStart: { $exists: false } }, { saleStart: null }, { saleStart: { $lte: now } }] },
      { $or: [{ saleEnd: { $exists: false } }, { saleEnd: null }, { saleEnd: { $gte: now } }] },
    ],
  })
    .populate({ path: 'collectionId', model: Collection, select: 'name slug' })
    .sort({ saleEnd: 1, createdAt: -1 })
    .lean()
  return serialize(products)
}

export async function createProduct(data: ProductFormData) {
  try {
    await requireAdminSession()
    await connectDB()

    const validationError = validateProduct(data)
    if (validationError) return { success: false, error: validationError }

    const existing = await Product.findOne({ slug: data.slug })
    if (existing) return { success: false, error: 'A product with this slug already exists' }

    const product = await Product.create({ ...productData(data), views: 0 })
    revalidateProductPages(data.slug)
    return { success: true, id: product._id.toString() }
  } catch (error: any) {
    console.error('Create product error:', error)
    if (error.code === 11000) return { success: false, error: 'A slug or SKU is already in use' }
    return { success: false, error: error.message || 'Failed to create product' }
  }
}

export async function updateProduct(id: string, data: ProductFormData) {
  try {
    await requireAdminSession()
    await connectDB()

    const validationError = validateProduct(data)
    if (validationError) return { success: false, error: validationError }

    const duplicate = await Product.findOne({ slug: data.slug, _id: { $ne: id } })
    if (duplicate) return { success: false, error: 'A product with this slug already exists' }

    const update = productData(data)
    const product = await Product.findByIdAndUpdate(
      id,
      {
        $set: update,
        ...(!data.isOnSale && { $unset: { salePrice: 1, saleLabel: 1, saleStart: 1, saleEnd: 1 } }),
      },
      { new: true, runValidators: true }
    )

    if (!product) return { success: false, error: 'Product not found' }
    revalidateProductPages(data.slug)
    return { success: true }
  } catch (error: any) {
    console.error('Update product error:', error)
    if (error.code === 11000) return { success: false, error: 'A slug or SKU is already in use' }
    return { success: false, error: error.message || 'Failed to update product' }
  }
}

export async function deleteProduct(id: string) {
  try {
    await requireAdminSession()
    await connectDB()
    const product = await Product.findById(id)
    if (!product) return { success: false, error: 'Product not found' }

    const publicIds = product.images.map((image: any) => image.publicId).filter(Boolean)
    await Promise.allSettled(publicIds.map((publicId: string) => cloudinary.uploader.destroy(publicId)))
    await Product.findByIdAndDelete(id)
    revalidateProductPages(product.slug)
    return { success: true }
  } catch (error: any) {
    console.error('Delete product error:', error)
    return { success: false, error: error.message || 'Failed to delete product' }
  }
}
