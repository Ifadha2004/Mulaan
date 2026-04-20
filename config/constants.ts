export const PRODUCT_STATUS = {
  ACTIVE: 'active',
  SOLD_OUT: 'sold_out',
  PRE_ORDER: 'pre_order',
  ARCHIVED: 'archived',
} as const

export const ORDER_STATUS = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  PRODUCTION: 'production',
  SHIPPED: 'shipped',
  DELIVERED: 'delivered',
  CANCELLED: 'cancelled',
} as const

export const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL'] as const

export const PRE_ORDER_DURATION_DAYS = 10

export const STOCK_WARNING_THRESHOLD = 5

export const CURRENCY = 'RS'

export const ITEMS_PER_PAGE = 12