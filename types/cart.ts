import { IProduct, IProductVariant } from '@/lib/db/models'

export interface CartItem {
  productId: string
  name: string
  slug: string
  price: number
  image: string
  variant: {
    size: string
    color: string
    sku: string
  }
  quantity: number
}

export interface Cart {
  items: CartItem[]
  itemCount: number
  subtotal: number
  total: number
}

export interface CartStore extends Cart {
  // Actions
  addItem: (product: IProduct, variant: IProductVariant, quantity?: number) => void
  removeItem: (productId: string, sku: string) => void
  updateQuantity: (productId: string, sku: string, quantity: number) => void
  clearCart: () => void
  getItemQuantity: (productId: string, sku: string) => number
  isInCart: (productId: string, sku: string) => boolean
}