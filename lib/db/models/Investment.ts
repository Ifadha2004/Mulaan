import mongoose, { Schema, Document, Model } from 'mongoose'

export type InvestmentType = 'capital' | 'withdrawal'

export interface IInvestment extends Document {
  founderId: mongoose.Types.ObjectId // references Admin
  founderName: string // denormalized for fast display
  type: InvestmentType
  amount: number
  sharePercentage: number // e.g. 50
  date: Date
  notes?: string
  recordedBy: mongoose.Types.ObjectId
  createdAt: Date
  updatedAt: Date
}

const InvestmentSchema = new Schema<IInvestment>(
  {
    founderId: {
      type: Schema.Types.ObjectId,
      ref: 'Admin',
      required: true,
    },
    founderName: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ['capital', 'withdrawal'],
      required: true,
      default: 'capital',
    },
    amount: {
      type: Number,
      required: true,
      min: [0, 'Amount cannot be negative'],
    },
    sharePercentage: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },
    date: {
      type: Date,
      required: true,
      default: Date.now,
    },
    notes: {
      type: String,
      maxlength: [500, 'Notes cannot exceed 500 characters'],
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

InvestmentSchema.index({ founderId: 1, date: -1 })

const Investment: Model<IInvestment> =
  mongoose.models.Investment || mongoose.model<IInvestment>('Investment', InvestmentSchema)

export default Investment