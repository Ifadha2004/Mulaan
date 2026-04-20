import mongoose, { Schema, Document, Model } from 'mongoose'

export interface IPreOrder extends Document {
  productId: mongoose.Types.ObjectId
  campaignName: string
  startDate: Date
  endDate: Date
  isActive: boolean
  ordersCount: number
  totalOrders: number
  createdAt: Date
  updatedAt: Date
}

const PreOrderSchema = new Schema<IPreOrder>(
  {
    productId: {
      type: Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
      unique: true,
    },
    campaignName: {
      type: String,
      required: [true, 'Campaign name is required'],
      trim: true,
      maxlength: [100, 'Campaign name cannot exceed 100 characters'],
    },
    startDate: {
      type: Date,
      required: [true, 'Start date is required'],
    },
    endDate: {
      type: Date,
      required: [true, 'End date is required'],
      validate: {
        validator: function (this: any, value: Date) {
          return value > this.startDate
        },
        message: 'End date must be after start date',
      },
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    ordersCount: {
      type: Number,
      default: 0,
      min: 0,
    },
    totalOrders: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  {
    timestamps: true,
  }
)

// Indexes
PreOrderSchema.index({ productId: 1 }, { unique: true })
PreOrderSchema.index({ isActive: 1, endDate: 1 })

// Methods
PreOrderSchema.methods.isExpired = function (): boolean {
  return new Date() > this.endDate
}

PreOrderSchema.methods.daysRemaining = function (): number {
  const now = new Date()
  const end = new Date(this.endDate)
  const diff = end.getTime() - now.getTime()
  return Math.ceil(diff / (1000 * 60 * 60 * 24))
}

const PreOrder: Model<IPreOrder> =
  mongoose.models.PreOrder || mongoose.model<IPreOrder>('PreOrder', PreOrderSchema)

export default PreOrder