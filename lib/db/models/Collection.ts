import mongoose, { Schema, Document, Model } from 'mongoose'

export interface ICollectionMedia {
  url: string
  type: 'image' | 'video'
  alt?: string
  order: number
}

export interface ICollection extends Document {
  name: string
  slug: string
  description: string
  coverImage: string
  coverImagePublicId?: string
  media: ICollectionMedia[] // Lookbook gallery
  launchDate?: Date
  isActive: boolean
  featured: boolean
  order: number
  createdAt: Date
  updatedAt: Date
}

const CollectionMediaSchema = new Schema<ICollectionMedia>(
  {
    url: { type: String, required: true },
    type: { type: String, enum: ['image', 'video'], default: 'image' },
    alt: { type: String },
    order: { type: Number, default: 0 },
  },
  { _id: false }
)

const CollectionSchema = new Schema<ICollection>(
  {
    name: {
      type: String,
      required: [true, 'Collection name is required'],
      trim: true,
      maxlength: [100, 'Collection name cannot exceed 100 characters'],
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      index: true,
    },
    description: {
      type: String,
      required: [true, 'Collection description is required'],
      maxlength: [1000, 'Description cannot exceed 1000 characters'],
    },
    coverImage: {
      type: String,
      required: [true, 'Collection cover image is required'],
    },
    coverImagePublicId: {
      type: String,
    },
    media: {
      type: [CollectionMediaSchema],
      default: [],
    },
    launchDate: {
      type: Date,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
)

// Indexes
CollectionSchema.index({ slug: 1 }, { unique: true })
CollectionSchema.index({ isActive: 1, order: 1 })

const Collection: Model<ICollection> =
  mongoose.models.Collection || mongoose.model<ICollection>('Collection', CollectionSchema)

export default Collection