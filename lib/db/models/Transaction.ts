import mongoose, { Schema, Document, Model } from 'mongoose'

export type TransactionType = 'income' | 'expense'

export const TRANSACTION_CATEGORIES = {
  income: ['Sales', 'Investment', 'Refund Received', 'Other Income'],
  expense: ['Fabric', 'Tailoring', 'Packaging', 'Ads', 'Shoot', 'Shipping', 'Platform Fees', 'Misc'],
} as const

export interface ITransaction extends Document {
  date: Date
  type: TransactionType
  category: string
  description: string
  amount: number // always stored positive; sign is implied by `type`
  paymentMethod: string
  drop?: string // e.g. "Drop 01" — links to Budget.dropName
  vendorId?: mongoose.Types.ObjectId
  orderId?: mongoose.Types.ObjectId // auto-linked when generated from a paid Order
  founderId?: mongoose.Types.ObjectId // set when type=income & category=Investment
  attachmentUrl?: string // receipt/invoice image (Cloudinary)
  recordedBy: mongoose.Types.ObjectId // Admin who logged it
  createdAt: Date
  updatedAt: Date
}

const TransactionSchema = new Schema<ITransaction>(
  {
    date: {
      type: Date,
      required: true,
      default: Date.now,
    },
    type: {
      type: String,
      enum: ['income', 'expense'],
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      maxlength: [300, 'Description cannot exceed 300 characters'],
    },
    amount: {
      type: Number,
      required: true,
      min: [0, 'Amount cannot be negative'],
    },
    paymentMethod: {
      type: String,
      required: true,
      default: 'Cash',
    },
    drop: {
      type: String,
    },
    vendorId: {
      type: Schema.Types.ObjectId,
      ref: 'Vendor',
    },
    orderId: {
      type: Schema.Types.ObjectId,
      ref: 'Order',
    },
    founderId: {
      type: Schema.Types.ObjectId,
      ref: 'Admin',
    },
    attachmentUrl: {
      type: String,
    },
    recordedBy: {
      type: Schema.Types.ObjectId,
      ref: 'Admin',
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

// Indexes for fast dashboard queries
TransactionSchema.index({ date: -1 })
TransactionSchema.index({ type: 1, date: -1 })
TransactionSchema.index({ category: 1 })
TransactionSchema.index({ drop: 1 })
TransactionSchema.index({ vendorId: 1 })

const Transaction: Model<ITransaction> =
  mongoose.models.Transaction || mongoose.model<ITransaction>('Transaction', TransactionSchema)

export default Transaction