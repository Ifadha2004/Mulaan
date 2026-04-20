import mongoose, { Schema, Document, Model } from 'mongoose'

export interface INewsletter extends Document {
  email: string
  name?: string
  isActive: boolean
  subscribedAt: Date
  unsubscribedAt?: Date
  createdAt: Date
  updatedAt: Date
}

const NewsletterSchema = new Schema<INewsletter>(
  {
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email'],
    },
    name: {
      type: String,
      trim: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    subscribedAt: {
      type: Date,
      default: Date.now,
    },
    unsubscribedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
)

// Indexes
NewsletterSchema.index({ email: 1 }, { unique: true })
NewsletterSchema.index({ isActive: 1 })

const Newsletter: Model<INewsletter> =
  mongoose.models.Newsletter || mongoose.model<INewsletter>('Newsletter', NewsletterSchema)

export default Newsletter