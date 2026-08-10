import mongoose, { Schema, Document, Model } from 'mongoose'

export interface IFounderConfig {
  adminId: mongoose.Types.ObjectId
  name: string
  sharePercentage: number
}

export interface ISettings extends Document {
  businessName: string
  currency: string // "AED"
  founders: IFounderConfig[]
  paymentMethods: string[]
  drops: string[] // ["Drop 01", "Drop 02", "Drop 03"]
  lowStockThreshold: number
  retainedProfitPercentage: number // % kept in business before founder distribution
  whatsappNumber: string
  deliveryFee: number
  freeDeliveryThreshold: number
  updatedBy?: mongoose.Types.ObjectId
  createdAt: Date
  updatedAt: Date
}

const FounderConfigSchema = new Schema<IFounderConfig>(
  {
    adminId: { type: Schema.Types.ObjectId, ref: 'Admin', required: true },
    name: { type: String, required: true },
    sharePercentage: { type: Number, required: true, min: 0, max: 100 },
  },
  { _id: false }
)

const SettingsSchema = new Schema<ISettings>(
  {
    businessName: {
      type: String,
      default: 'Mulaan',
    },
    currency: {
      type: String,
      default: 'AED',
    },
    founders: {
      type: [FounderConfigSchema],
      default: [],
    },
    paymentMethods: {
      type: [String],
      default: ['Cash on Delivery', 'Online Transfer'],
    },
    drops: {
      type: [String],
      default: [],
    },
    lowStockThreshold: {
      type: Number,
      default: 5,
    },
    retainedProfitPercentage: {
      type: Number,
      default: 20,
      min: 0,
      max: 100,
    },
    whatsappNumber: {
      type: String,
      default: '',
    },
    deliveryFee: {
      type: Number,
      default: 0,
    },
    freeDeliveryThreshold: {
      type: Number,
      default: 500,
    },
    updatedBy: {
      type: Schema.Types.ObjectId,
      ref: 'Admin',
    },
  },
  {
    timestamps: true,
  }
)

// Enforce singleton pattern at the application layer via a static helper
SettingsSchema.statics.getSingleton = async function () {
  let settings = await this.findOne()
  if (!settings) {
    settings = await this.create({})
  }
  return settings
}

const Settings: Model<ISettings> =
  mongoose.models.Settings || mongoose.model<ISettings>('Settings', SettingsSchema)

export default Settings