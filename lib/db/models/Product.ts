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
  isOnSale: boolean
  salePrice?: number
  saleLabel?: string
  saleStart?: Date
  saleEnd?: Date
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
  sku: { type: String, required: true },
})

const ProductSchema = new Schema<IProduct>(
  {
    name: { type: String, required: [true, 'Product name is required'], trim: true, maxlength: 200 },
    slug: { type: String, required: true, unique: true, lowercase: true },
    description: { type: String, required: [true, 'Product description is required'], maxlength: 2000 },
    price: { type: Number, required: [true, 'Product price is required'], min: 0 },
    isOnSale: { type: Boolean, default: false },
    salePrice: { type: Number, min: 0 },
    saleLabel: { type: String, trim: true, maxlength: 60 },
    saleStart: { type: Date },
    saleEnd: { type: Date },
    images: {
      type: [ProductImageSchema],
      validate: { validator: (value: IProductImage[]) => value.length > 0, message: 'Product must have at least one image' },
    },
    variants: {
      type: [ProductVariantSchema],
      validate: { validator: (value: IProductVariant[]) => value.length > 0, message: 'Product must have at least one variant' },
    },
    collectionId: { type: Schema.Types.ObjectId, ref: 'Collection' },
    status: { type: String, enum: Object.values(PRODUCT_STATUS), default: PRODUCT_STATUS.ACTIVE },
    isPreOrder: { type: Boolean, default: false },
    preOrderStart: { type: Date },
    preOrderEnd: { type: Date },
    fabricDetails: { type: String, maxlength: 500 },
    careInstructions: { type: String, maxlength: 500 },
    featured: { type: Boolean, default: false },
    views: { type: Number, default: 0 },
  },
  { timestamps: true }
)

ProductSchema.index({ status: 1, createdAt: -1 })
ProductSchema.index({ collectionId: 1 })
ProductSchema.index({ 'variants.sku': 1 }, { unique: true })
ProductSchema.index({ isPreOrder: 1, preOrderEnd: 1 })
ProductSchema.index({ isOnSale: 1, saleStart: 1, saleEnd: 1 })

ProductSchema.methods.getTotalStock = function (): number {
  return this.variants.reduce((total: number, variant: IProductVariant) => total + variant.stock, 0)
}

ProductSchema.methods.isInStock = function (): boolean {
  return this.getTotalStock() > 0
}

ProductSchema.methods.isPreOrderActive = function (): boolean {
  if (!this.isPreOrder) return false
  const now = new Date()
  return Boolean(this.preOrderStart && this.preOrderEnd && now >= this.preOrderStart && now <= this.preOrderEnd)
}

const Product: Model<IProduct> = mongoose.models.Product || mongoose.model<IProduct>('Product', ProductSchema)
export default Product
