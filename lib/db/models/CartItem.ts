import mongoose, { Schema, Document, Model } from 'mongoose'

export interface ICartVariant {
  size: string
  color: string
  sku: string
}

export interface ICartItem extends Document {
  sessionId: string // anonymous session identifier (cookie-based)
  customerId?: mongoose.Types.ObjectId
  productId: mongoose.Types.ObjectId
  name: string
  slug: string
  price: number
  image: string
  variant: ICartVariant
  quantity: number
  createdAt: Date
  updatedAt: Date
  expiresAt: Date
}

const CartVariantSchema = new Schema<ICartVariant>(
  {
    size: { type: String, required: true },
    color: { type: String, required: true },
    sku: { type: String, required: true },
  },
  { _id: false }
)

const CartItemSchema = new Schema<ICartItem>(
  {
    sessionId: {
      type: String,
      required: true,
      index: true,
    },
    customerId: {
      type: Schema.Types.ObjectId,
      ref: 'Customer',
    },
    productId: {
      type: Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
    name: { type: String, required: true },
    slug: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    image: { type: String, required: true },
    variant: {
      type: CartVariantSchema,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
      default: 1,
    },
    expiresAt: {
      type: Date,
      default: () => new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
    },
  },
  {
    timestamps: true,
  }
)

// Indexes
CartItemSchema.index({ sessionId: 1 })
CartItemSchema.index({ sessionId: 1, productId: 1, 'variant.sku': 1 }, { unique: true })
// TTL index — MongoDB automatically deletes documents once expiresAt passes
CartItemSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 })

const CartItem: Model<ICartItem> =
  mongoose.models.CartItem || mongoose.model<ICartItem>('CartItem', CartItemSchema)

export default CartItem