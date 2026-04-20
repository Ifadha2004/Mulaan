import mongoose, { Schema, Document, Model } from 'mongoose'
import { ORDER_STATUS } from '@/config/constants'

export interface IOrderItem {
  productId: mongoose.Types.ObjectId
  productName: string
  productSlug: string
  productImage: string
  size: string
  color: string
  sku: string
  quantity: number
  price: number
  subtotal: number
}

export interface IOrder extends Document {
  orderNumber: string
  customerName: string
  phone: string
  whatsappNumber: string
  email?: string
  address: string
  city: string
  country: string
  items: IOrderItem[]
  subtotal: number
  deliveryFee: number
  totalAmount: number
  status: string
  notes?: string
  adminNotes?: string
  orderDate: Date
  createdAt: Date
  updatedAt: Date
}

const OrderItemSchema = new Schema<IOrderItem>({
  productId: {
    type: Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  productName: {
    type: String,
    required: true,
  },
  productSlug: {
    type: String,
    required: true,
  },
  productImage: {
    type: String,
    required: true,
  },
  size: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  sku: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: [1, 'Quantity must be at least 1'],
  },
  price: {
    type: Number,
    required: true,
    min: [0, 'Price cannot be negative'],
  },
  subtotal: {
    type: Number,
    required: true,
  },
})

const OrderSchema = new Schema<IOrder>(
  {
    orderNumber: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    customerName: {
      type: String,
      required: [true, 'Customer name is required'],
      trim: true,
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
    },
    whatsappNumber: {
      type: String,
      required: [true, 'WhatsApp number is required'],
    },
    email: {
      type: String,
      lowercase: true,
      trim: true,
    },
    address: {
      type: String,
      required: [true, 'Address is required'],
    },
    city: {
      type: String,
      required: [true, 'City is required'],
    },
    country: {
      type: String,
      default: 'UAE',
    },
    items: {
      type: [OrderItemSchema],
      validate: {
        validator: (v: IOrderItem[]) => v.length > 0,
        message: 'Order must have at least one item',
      },
    },
    subtotal: {
      type: Number,
      required: true,
      min: [0, 'Subtotal cannot be negative'],
    },
    deliveryFee: {
      type: Number,
      default: 0,
      min: [0, 'Delivery fee cannot be negative'],
    },
    totalAmount: {
      type: Number,
      required: true,
      min: [0, 'Total amount cannot be negative'],
    },
    status: {
      type: String,
      enum: Object.values(ORDER_STATUS),
      default: ORDER_STATUS.PENDING,
    },
    notes: {
      type: String,
      maxlength: [500, 'Notes cannot exceed 500 characters'],
    },
    adminNotes: {
      type: String,
      maxlength: [500, 'Admin notes cannot exceed 500 characters'],
    },
    orderDate: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
)

// Indexes
OrderSchema.index({ orderNumber: 1 }, { unique: true })
OrderSchema.index({ status: 1, orderDate: -1 })
OrderSchema.index({ whatsappNumber: 1 })
OrderSchema.index({ createdAt: -1 })

// Generate order number before saving
OrderSchema.pre('save', async function (next: any) {
  if (!this.orderNumber) {
    const count = await mongoose.model('Order').countDocuments()
    this.orderNumber = `MLN${String(count + 1).padStart(6, '0')}`
  }
  next()
})

const Order: Model<IOrder> =
  mongoose.models.Order || mongoose.model<IOrder>('Order', OrderSchema)

export default Order