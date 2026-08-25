'use server'

import { connectDB } from '@/lib/db/mongodb'
import Collection from '@/lib/db/models/Collection'
import cloudinary from '@/lib/cloudinary'
import { requireAdminSession } from '@/lib/auth/session'
import { revalidatePath } from 'next/cache'

interface CollectionMediaInput {
  url: string
  publicId: string
  type?: 'image' | 'video'
  alt?: string
}

interface CollectionFormData {
  name: string
  slug: string
  description: string
  coverImage: string
  coverImagePublicId?: string
  media: CollectionMediaInput[]
  launchDate?: string
  isActive: boolean
  featured: boolean
  order: number
}

function serialize<T>(doc: T): T {
  return JSON.parse(JSON.stringify(doc))
}

export async function getCollections() {
  await connectDB()
  const collections = await Collection.find().sort({ order: 1, createdAt: -1 })
  return serialize(collections)
}

export async function getCollectionById(id: string) {
  await connectDB()
  const collection = await Collection.findById(id)
  if (!collection) return null
  return serialize(collection)
}

export async function createCollection(data: CollectionFormData) {
  try {
    await requireAdminSession()
    await connectDB()

    const existing = await Collection.findOne({ slug: data.slug })
    if (existing) {
      return { success: false, error: 'A collection with this slug already exists' }
    }

    const collection = await Collection.create({
      name: data.name,
      slug: data.slug,
      description: data.description,
      coverImage: data.coverImage,
      coverImagePublicId: data.coverImagePublicId,
      media: data.media.map((m, i) => ({
        url: m.url,
        type: m.type || 'image',
        alt: m.alt || '',
        order: i,
      })),
      launchDate: data.launchDate ? new Date(data.launchDate) : undefined,
      isActive: data.isActive,
      featured: data.featured,
      order: data.order,
    })

    revalidatePath('/admin/collections')
    revalidatePath('/collections')

    return { success: true, id: collection._id.toString() }
  } catch (error: any) {
    console.error('Create collection error:', error)
    return { success: false, error: error.message || 'Failed to create collection' }
  }
}

export async function updateCollection(id: string, data: CollectionFormData) {
  try {
    await requireAdminSession()
    await connectDB()

    const existing = await Collection.findOne({ slug: data.slug, _id: { $ne: id } })
    if (existing) {
      return { success: false, error: 'A collection with this slug already exists' }
    }

    const collection = await Collection.findByIdAndUpdate(
      id,
      {
        name: data.name,
        slug: data.slug,
        description: data.description,
        coverImage: data.coverImage,
        coverImagePublicId: data.coverImagePublicId,
        media: data.media.map((m, i) => ({
          url: m.url,
          type: m.type || 'image',
          alt: m.alt || '',
          order: i,
        })),
        launchDate: data.launchDate ? new Date(data.launchDate) : undefined,
        isActive: data.isActive,
        featured: data.featured,
        order: data.order,
      },
      { new: true, runValidators: true }
    )

    if (!collection) {
      return { success: false, error: 'Collection not found' }
    }

    revalidatePath('/admin/collections')
    revalidatePath('/collections')
    revalidatePath(`/collections/${data.slug}`)

    return { success: true }
  } catch (error: any) {
    console.error('Update collection error:', error)
    return { success: false, error: error.message || 'Failed to update collection' }
  }
}

export async function deleteCollection(id: string) {
  try {
    await requireAdminSession()
    await connectDB()

    const collection = await Collection.findById(id)
    if (!collection) {
      return { success: false, error: 'Collection not found' }
    }

    // Best-effort cleanup of Cloudinary assets tied to this collection
    try {
      if (collection.coverImagePublicId) {
        await cloudinary.uploader.destroy(collection.coverImagePublicId)
      }
    } catch {
      // Non-fatal — proceed with DB deletion even if Cloudinary cleanup fails
    }

    await Collection.findByIdAndDelete(id)

    revalidatePath('/admin/collections')
    revalidatePath('/collections')

    return { success: true }
  } catch (error: any) {
    console.error('Delete collection error:', error)
    return { success: false, error: error.message || 'Failed to delete collection' }
  }
}