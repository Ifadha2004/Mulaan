import mongoose, { Schema, Document, Model } from 'mongoose'

export interface IBudgetLine {
  planned: number
  actual: number // recalculated from Transaction sums, but cached here for speed
}

export interface IBudget extends Document {
  dropName: string // "Drop 01" — must match Transaction.drop values
  collectionId?: mongoose.Types.ObjectId
  categories: {
    fabric: IBudgetLine
    tailoring: IBudgetLine
    packaging: IBudgetLine
    ads: IBudgetLine
    shoot: IBudgetLine
    misc: IBudgetLine
  }
  totalPlanned: number
  totalActual: number
  status: 'planning' | 'active' | 'closed'
  createdAt: Date
  updatedAt: Date
}

const BudgetLineSchema = new Schema<IBudgetLine>(
  {
    planned: { type: Number, default: 0, min: 0 },
    actual: { type: Number, default: 0, min: 0 },
  },
  { _id: false }
)

const BudgetSchema = new Schema<IBudget>(
  {
    dropName: {
      type: String,
      required: [true, 'Drop name is required'],
      unique: true,
      trim: true,
    },
    collectionId: {
      type: Schema.Types.ObjectId,
      ref: 'Collection',
    },
    categories: {
      fabric: { type: BudgetLineSchema, default: () => ({}) },
      tailoring: { type: BudgetLineSchema, default: () => ({}) },
      packaging: { type: BudgetLineSchema, default: () => ({}) },
      ads: { type: BudgetLineSchema, default: () => ({}) },
      shoot: { type: BudgetLineSchema, default: () => ({}) },
      misc: { type: BudgetLineSchema, default: () => ({}) },
    },
    totalPlanned: {
      type: Number,
      default: 0,
    },
    totalActual: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ['planning', 'active', 'closed'],
      default: 'planning',
    },
  },
  {
    timestamps: true,
  }
)

// Recalculate totals before saving
BudgetSchema.pre('save', function (next: any) {
  const cats = this.categories
  const lines = [cats.fabric, cats.tailoring, cats.packaging, cats.ads, cats.shoot, cats.misc]
  this.totalPlanned = lines.reduce((sum, line) => sum + (line?.planned || 0), 0)
  this.totalActual = lines.reduce((sum, line) => sum + (line?.actual || 0), 0)
  next()
})

BudgetSchema.index({ dropName: 1 }, { unique: true })
BudgetSchema.index({ status: 1 })

const Budget: Model<IBudget> = mongoose.models.Budget || mongoose.model<IBudget>('Budget', BudgetSchema)

export default Budget