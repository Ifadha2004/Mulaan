'use server'

import { connectDB } from '@/lib/db/mongodb'
import Product from '@/lib/db/models/Product'
import cloudinary from '@/lib/cloudinary'
import { requireAdminSession } from '@/lib/auth/session'
import { revalidatePath } from 'next/cache'

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

function serialize<T>(doc: T): T {
  return JSON.parse(JSON.stringify(doc))
}

export async function getProducts() {
  await connectDB()
  const products = await Product.find()
    .populate('collectionId', 'name slug')
    .sort({ createdAt: -1 })
  return serialize(products)
}

export async function getProductById(id: string) {
  await connectDB()
  const product = await Product.findById(id)
  if (!product) return null
  return serialize(product)
}

export async function getProductBySlug(slug: string) {
  await connectDB()
  const product = await Product.findOne({ slug, status: { $ne: 'archived' } })
  if (!product) return null
  return serialize(product)
}

export async function getActiveProducts() {
  await connectDB()
  const products = await Product.find({ status: { $ne: 'archived' } }).sort({ createdAt: -1 })
  return serialize(products)
}

export async function createProduct(data: ProductFormData) {
  try {
    await requireAdminSession()
    await connectDB()

    const existing = await Product.findOne({ slug: data.slug })
    if (existing) {
      return { success: false, error: 'A product with this slug already exists' }
    }

    if (data.images.length === 0) {
      return { success: false, error: 'At least one product image is required' }
    }
    if (data.variants.length === 0) {
      return { success: false, error: 'At least one size/color variant is required' }
    }

    const product = await Product.create({
      name: data.name,
      slug: data.slug,
      description: data.description,
      price: data.price,
      images: data.images.map((img, i) => ({
        url: img.url,
        alt: img.alt || data.name,
        order: i,
        publicId: img.publicId,
      })),
      variants: data.variants,
      collectionId: data.collectionId || undefined,
      status: data.status,
      isPreOrder: data.isPreOrder,
      preOrderStart: data.preOrderStart ? new Date(data.preOrderStart) : undefined,
      preOrderEnd: data.preOrderEnd ? new Date(data.preOrderEnd) : undefined,
      fabricDetails: data.fabricDetails,
      careInstructions: data.careInstructions,
      featured: data.featured,
      views: 0,
    })

    revalidatePath('/admin/products')
    revalidatePath('/products')

    return { success: true, id: product._id.toString() }
  } catch (error: any) {
    console.error('Create product error:', error)
    if (error.code === 11000) {
      return { success: false, error: 'One of the SKUs is already in use by another product' }
    }
    return { success: false, error: error.message || 'Failed to create product' }
  }
}

export async function updateProduct(id: string, data: ProductFormData) {
  try {
    await requireAdminSession()
    await connectDB()

    const existing = await Product.findOne({ slug: data.slug, _id: { $ne: id } })
    if (existing) {
      return { success: false, error: 'A product with this slug already exists' }
    }
    if (data.images.length === 0) {
      return { success: false, error: 'At least one product image is required' }
    }
    if (data.variants.length === 0) {
      return { success: false, error: 'At least one size/color variant is required' }
    }

    const product = await Product.findByIdAndUpdate(
      id,
      {
        name: data.name,
        slug: data.slug,
        description: data.description,
        price: data.price,
        images: data.images.map((img, i) => ({
          url: img.url,
          alt: img.alt || data.name,
          order: i,
          publicId: img.publicId,
        })),
        variants: data.variants,
        collectionId: data.collectionId || undefined,
        status: data.status,
        isPreOrder: data.isPreOrder,
        preOrderStart: data.preOrderStart ? new Date(data.preOrderStart) : undefined,
        preOrderEnd: data.preOrderEnd ? new Date(data.preOrderEnd) : undefined,
        fabricDetails: data.fabricDetails,
        careInstructions: data.careInstructions,
        featured: data.featured,
      },
      { new: true, runValidators: true }
    )

    if (!product) {
      return { success: false, error: 'Product not found' }
    }

    revalidatePath('/admin/products')
    revalidatePath('/products')
    revalidatePath(`/products/${data.slug}`)

    return { success: true }
  } catch (error: any) {
    console.error('Update product error:', error)
    if (error.code === 11000) {
      return { success: false, error: 'One of the SKUs is already in use by another product' }
    }
    return { success: false, error: error.message || 'Failed to update product' }
  }
}

export async function deleteProduct(id: string) {
  try {
    await requireAdminSession()
    await connectDB()

    const product = await Product.findById(id)
    if (!product) {
      return { success: false, error: 'Product not found' }
    }

    const publicIds = product.images.map((img: any) => img.publicId).filter(Boolean)
    await Promise.allSettled(publicIds.map((pid: string) => cloudinary.uploader.destroy(pid)))

    await Product.findByIdAndDelete(id)

    revalidatePath('/admin/products')
    revalidatePath('/products')

    return { success: true }
  } catch (error: any) {
    console.error('Delete product error:', error)
    return { success: false, error: error.message || 'Failed to delete product' }
  }
}