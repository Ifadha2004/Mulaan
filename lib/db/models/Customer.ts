import mongoose, { Schema, Document, Model } from 'mongoose'

export interface ICustomer extends Document {
  name: string
  phone: string // primary identifier — matched against Order.whatsappNumber
  whatsappNumber: string
  email?: string
  address?: string
  city?: string
  country: string
  totalOrders: number
  totalSpent: number
  lastOrderDate?: Date
  preferredSizes: string[]
  tags: string[] // e.g. "VIP", "Repeat Buyer"
  notes?: string
  createdAt: Date
  updatedAt: Date
}

const CustomerSchema = new Schema<ICustomer>(
  {
    name: {
      type: String,
      required: [true, 'Customer name is required'],
      trim: true,
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      unique: true,
      trim: true,
    },
    whatsappNumber: {
      type: String,
      required: [true, 'WhatsApp number is required'],
      trim: true,
    },
    email: {
      type: String,
      lowercase: true,
      trim: true,
    },
    address: {
      type: String,
    },
    city: {
      type: String,
    },
    country: {
      type: String,
      default: 'UAE',
    },
    totalOrders: {
      type: Number,
      default: 0,
      min: 0,
    },
    totalSpent: {
      type: Number,
      default: 0,
      min: 0,
    },
    lastOrderDate: {
      type: Date,
    },
    preferredSizes: {
      type: [String],
      default: [],
    },
    tags: {
      type: [String],
      default: [],
    },
    notes: {
      type: String,
      maxlength: [1000, 'Notes cannot exceed 1000 characters'],
    },
  },
  {
    timestamps: true,
  }
)

// Indexes
CustomerSchema.index({ phone: 1 }, { unique: true })
CustomerSchema.index({ totalSpent: -1 })
CustomerSchema.index({ lastOrderDate: -1 })

const Customer: Model<ICustomer> =
  mongoose.models.Customer || mongoose.model<ICustomer>('Customer', CustomerSchema)

export default Customer