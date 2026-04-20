import mongoose, { Schema, Document, Model } from 'mongoose'

export interface IAnalytics extends Document {
  type: string
  productId?: mongoose.Types.ObjectId
  collectionId?: mongoose.Types.ObjectId
  eventData: {
    action: string
    category: string
    label?: string
    value?: number
  }
  metadata: {
    userAgent?: string
    referrer?: string
    country?: string
    city?: string
  }
  createdAt: Date
}

const AnalyticsSchema = new Schema<IAnalytics>(
  {
    type: {
      type: String,
      required: true,
      enum: ['page_view', 'product_view', 'collection_view', 'cart_add', 'checkout_start', 'order_complete'],
    },
    productId: {
      type: Schema.Types.ObjectId,
      ref: 'Product',
    },
    collectionId: {
      type: Schema.Types.ObjectId,
      ref: 'Collection',
    },
    eventData: {
      action: { type: String, required: true },
      category: { type: String, required: true },
      label: { type: String },
      value: { type: Number },
    },
    metadata: {
      userAgent: { type: String },
      referrer: { type: String },
      country: { type: String },
      city: { type: String },
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
  }
)

// Indexes for analytics queries
AnalyticsSchema.index({ type: 1, createdAt: -1 })
AnalyticsSchema.index({ productId: 1, createdAt: -1 })
AnalyticsSchema.index({ collectionId: 1, createdAt: -1 })
AnalyticsSchema.index({ createdAt: -1 })

const Analytics: Model<IAnalytics> =
  mongoose.models.Analytics || mongoose.model<IAnalytics>('Analytics', AnalyticsSchema)

export default Analytics