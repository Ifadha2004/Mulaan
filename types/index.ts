// Re-export all types for easy imports
export * from './cart'

// Import and re-export database model types
export type { IProduct, IProductImage, IProductVariant } from '@/lib/db/models/Product'
export type { ICollection, ICollectionMedia } from '@/lib/db/models/Collection'
export type { IOrder, IOrderItem } from '@/lib/db/models/Order'
export type { IPreOrder, PreOrderStatus } from '@/lib/db/models/PreOrder'
export type { IAdmin, AdminRole } from '@/lib/db/models/Admin'
export type { INewsletter } from '@/lib/db/models/Newsletter'
export type { IAnalytics } from '@/lib/db/models/Analytics'