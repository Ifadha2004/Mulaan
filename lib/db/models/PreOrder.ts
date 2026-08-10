import mongoose, { Schema, Document, Model } from 'mongoose'

export type PreOrderStatus = 'scheduled' | 'active' | 'closed'

export interface IPreOrder extends Document {
  productId: mongoose.Types.ObjectId
  campaignName: string
  startDate: Date
  endDate: Date
  isActive: boolean
  totalOrders: number
  createdAt: Date
  updatedAt: Date
  isExpired(): boolean
  daysRemaining(): number
  getStatus(): PreOrderStatus
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
    },
    isActive: {
      type: Boolean,
      default: true,
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

// Document-level validation — synchronous hook, no `next` callback needed.
// Mongoose (v5+) treats a pre-hook with no callback param as synchronous,
// which sidesteps the overload ambiguity that was breaking `next`'s type.
PreOrderSchema.pre('validate', function () {
  if (this.startDate && this.endDate && this.endDate <= this.startDate) {
    this.invalidate('endDate', 'End date must be after start date')
  }
})

// ── Instance methods ──────────────────────────
PreOrderSchema.methods.isExpired = function (): boolean {
  return new Date() > this.endDate
}

PreOrderSchema.methods.daysRemaining = function (): number {
  const now = new Date()
  const end = new Date(this.endDate)
  const diff = end.getTime() - now.getTime()
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)))
}

PreOrderSchema.methods.getStatus = function (): PreOrderStatus {
  const now = new Date()
  if (!this.isActive || now > this.endDate) return 'closed'
  if (now < this.startDate) return 'scheduled'
  return 'active'
}

const PreOrder: Model<IPreOrder> =
  mongoose.models.PreOrder || mongoose.model<IPreOrder>('PreOrder', PreOrderSchema)

export default PreOrder