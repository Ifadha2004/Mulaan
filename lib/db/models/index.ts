// Export all models for easy imports
export { default as Product } from './Product'
export { default as Collection } from './Collection'
export { default as Order } from './Order'
export { default as PreOrder } from './PreOrder'
export { default as User } from './User'
export { default as Newsletter } from './Newsletter'
export { default as Analytics } from './Analytics'

// Re-export types
export type { IProduct, IProductImage, IProductVariant } from './Product'
export type { ICollection } from './Collection'
export type { IOrder, IOrderItem } from './Order'
export type { IPreOrder } from './PreOrder'
export type { IUser } from './User'
export type { INewsletter } from './Newsletter'
export type { IAnalytics } from './Analytics'