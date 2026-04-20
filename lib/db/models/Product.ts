import mongoose, { Schema, Document, Model } from 'mongoose'
import { PRODUCT_STATUS } from '@/config/constants'

export interface IProductImage {
  url: string
  alt: string
  order: number
  publicId?: string
}

export interface IProductVariant {
  size: string
  color: string
  stock: number
  sku: string
}

export interface IProduct extends Document {
  name: string
  slug: string
  description: string
  price: number
  images: IProductImage[]
  variants: IProductVariant[]
  collectionId?: mongoose.Types.ObjectId
  status: string
  isPreOrder: boolean
  preOrderStart?: Date
  preOrderEnd?: Date
  fabricDetails?: string
  careInstructions?: string
  featured: boolean
  views: number
  createdAt: Date
  updatedAt: Date
}

const ProductImageSchema = new Schema<IProductImage>({
  url: { type: String, required: true },
  alt: { type: String, required: true },
  order: { type: Number, required: true },
  publicId: { type: String },
})

const ProductVariantSchema = new Schema<IProductVariant>({
  size: { type: String, required: true },
  color: { type: String, required: true },
  stock: { type: Number, required: true, min: 0 },
  sku: { type: String, required: true, unique: true },
})

const ProductSchema = new Schema<IProduct>(
  {
    name: {
      type: String,
      required: [true, 'Product name is required'],
      trim: true,
      maxlength: [200, 'Product name cannot exceed 200 characters'],
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
      required: [true, 'Product description is required'],
      maxlength: [2000, 'Description cannot exceed 2000 characters'],
    },
    price: {
      type: Number,
      required: [true, 'Product price is required'],
      min: [0, 'Price cannot be negative'],
    },
    images: {
      type: [ProductImageSchema],
      validate: {
        validator: (v: IProductImage[]) => v.length > 0,
        message: 'Product must have at least one image',
      },
    },
    variants: {
      type: [ProductVariantSchema],
      validate: {
        validator: (v: IProductVariant[]) => v.length > 0,
        message: 'Product must have at least one variant',
      },
    },
    collectionId: {
      type: Schema.Types.ObjectId,
      ref: 'Collection',
    },
    status: {
      type: String,
      enum: Object.values(PRODUCT_STATUS),
      default: PRODUCT_STATUS.ACTIVE,
    },
    isPreOrder: {
      type: Boolean,
      default: false,
    },
    preOrderStart: {
      type: Date,
    },
    preOrderEnd: {
      type: Date,
    },
    fabricDetails: {
      type: String,
      maxlength: [500, 'Fabric details cannot exceed 500 characters'],
    },
    careInstructions: {
      type: String,
      maxlength: [500, 'Care instructions cannot exceed 500 characters'],
    },
    featured: {
      type: Boolean,
      default: false,
    },
    views: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
)

// Indexes for performance
ProductSchema.index({ status: 1, createdAt: -1 })
ProductSchema.index({ collectionId: 1 })
ProductSchema.index({ isPreOrder: 1, preOrderEnd: 1 })
ProductSchema.index({ slug: 1 }, { unique: true })

// Methods
ProductSchema.methods.getTotalStock = function (): number {
  return this.variants.reduce((total: number, variant: IProductVariant) => total + variant.stock, 0)
}

ProductSchema.methods.isInStock = function (): boolean {
  return this.getTotalStock() > 0
}

ProductSchema.methods.isPreOrderActive = function (): boolean {
  if (!this.isPreOrder) return false
  const now = new Date()
  return (
    this.preOrderStart &&
    this.preOrderEnd &&
    now >= this.preOrderStart &&
    now <= this.preOrderEnd
  )
}

// Prevent model recompilation in development
const Product: Model<IProduct> =
  mongoose.models.Product || mongoose.model<IProduct>('Product', ProductSchema)

export default Product