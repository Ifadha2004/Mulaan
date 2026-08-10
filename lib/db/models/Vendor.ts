import mongoose, { Schema, Document, Model } from 'mongoose'

export type VendorCategory = 'Fabric' | 'Tailoring' | 'Packaging' | 'Ads' | 'Shoot' | 'Misc'

export interface IVendor extends Document {
  name: string
  category: VendorCategory
  contactPerson?: string
  phone: string
  email?: string
  paymentTerms?: string
  isActive: boolean
  notes?: string
  totalPaid: number // cached sum from linked Transactions
  createdAt: Date
  updatedAt: Date
}

const VendorSchema = new Schema<IVendor>(
  {
    name: {
      type: String,
      required: [true, 'Vendor name is required'],
      trim: true,
    },
    category: {
      type: String,
      enum: ['Fabric', 'Tailoring', 'Packaging', 'Ads', 'Shoot', 'Misc'],
      required: true,
    },
    contactPerson: {
      type: String,
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
    },
    email: {
      type: String,
      lowercase: true,
      trim: true,
    },
    paymentTerms: {
      type: String,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    notes: {
      type: String,
      maxlength: [1000, 'Notes cannot exceed 1000 characters'],
    },
    totalPaid: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  {
    timestamps: true,
  }
)

VendorSchema.index({ category: 1 })
VendorSchema.index({ isActive: 1 })

const Vendor: Model<IVendor> = mongoose.models.Vendor || mongoose.model<IVendor>('Vendor', VendorSchema)

export default Vendor