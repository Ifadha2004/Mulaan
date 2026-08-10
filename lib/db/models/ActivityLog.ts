import mongoose, { Schema, Document, Model } from 'mongoose'

export interface IActivityLog extends Document {
  adminId: mongoose.Types.ObjectId
  adminName: string
  adminEmail: string
  action: string // e.g. "created_product", "deleted_order", "updated_transaction"
  resource: string // e.g. "Product", "Order", "Transaction"
  resourceId?: string
  details?: Record<string, any> // before/after diff or extra context
  ipAddress: string
  userAgent?: string
  createdAt: Date
}

const ActivityLogSchema = new Schema<IActivityLog>(
  {
    adminId: {
      type: Schema.Types.ObjectId,
      ref: 'Admin',
      required: true,
    },
    adminName: {
      type: String,
      required: true,
    },
    adminEmail: {
      type: String,
      required: true,
    },
    action: {
      type: String,
      required: true,
    },
    resource: {
      type: String,
      required: true,
    },
    resourceId: {
      type: String,
    },
    details: {
      type: Schema.Types.Mixed,
    },
    ipAddress: {
      type: String,
      required: true,
    },
    userAgent: {
      type: String,
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
  }
)

// Indexes for audit queries
ActivityLogSchema.index({ adminId: 1, createdAt: -1 })
ActivityLogSchema.index({ resource: 1, resourceId: 1 })
ActivityLogSchema.index({ createdAt: -1 })

// Auto-expire logs after 1 year (compliance-friendly, keeps collection lean)
ActivityLogSchema.index({ createdAt: 1 }, { expireAfterSeconds: 60 * 60 * 24 * 365 })

const ActivityLog: Model<IActivityLog> =
  mongoose.models.ActivityLog || mongoose.model<IActivityLog>('ActivityLog', ActivityLogSchema)

export default ActivityLog