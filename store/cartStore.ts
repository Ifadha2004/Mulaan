import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { CartStore, CartItem } from '@/types/cart'
import { IProduct, IProductVariant } from '@/lib/db/models'
import toast from 'react-hot-toast'

const calculateTotals = (items: CartItem[]) => {
  const itemCount = items.reduce((total, item) => total + item.quantity, 0)
  const subtotal = items.reduce((total, item) => total + item.price * item.quantity, 0)
  
  return {
    itemCount,
    subtotal,
    total: subtotal, // Can add delivery fees here later
  }
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      itemCount: 0,
      subtotal: 0,
      total: 0,

      addItem: (product: IProduct, variant: IProductVariant, quantity = 1) => {
        const items = get().items
        const existingItemIndex = items.findIndex(
          (item) => item.productId === product._id.toString() && item.variant.sku === variant.sku
        )

        let newItems: CartItem[]

        if (existingItemIndex > -1) {
          // Item already in cart, update quantity
          newItems = items.map((item, index) =>
            index === existingItemIndex
              ? { ...item, quantity: item.quantity + quantity }
              : item
          )
          toast.success('Cart updated!')
        } else {
          // New item, add to cart
          const newItem: CartItem = {
            productId: product._id.toString(),
            name: product.name,
            slug: product.slug,
            price: product.price,
            image: product.images[0]?.url || '',
            variant: {
              size: variant.size,
              color: variant.color,
              sku: variant.sku,
            },
            quantity,
          }
          newItems = [...items, newItem]
          toast.success('Added to cart!')
        }

        const totals = calculateTotals(newItems)
        set({ items: newItems, ...totals })
      },

      removeItem: (productId: string, sku: string) => {
        const items = get().items
        const newItems = items.filter(
          (item) => !(item.productId === productId && item.variant.sku === sku)
        )
        
        const totals = calculateTotals(newItems)
        set({ items: newItems, ...totals })
        toast.success('Removed from cart')
      },

      updateQuantity: (productId: string, sku: string, quantity: number) => {
        if (quantity < 1) {
          get().removeItem(productId, sku)
          return
        }

        const items = get().items
        const newItems = items.map((item) =>
          item.productId === productId && item.variant.sku === sku
            ? { ...item, quantity }
            : item
        )

        const totals = calculateTotals(newItems)
        set({ items: newItems, ...totals })
      },

      clearCart: () => {
        set({ items: [], itemCount: 0, subtotal: 0, total: 0 })
        toast.success('Cart cleared')
      },

      getItemQuantity: (productId: string, sku: string) => {
        const item = get().items.find(
          (item) => item.productId === productId && item.variant.sku === sku
        )
        return item?.quantity || 0
      },

      isInCart: (productId: string, sku: string) => {
        return get().items.some(
          (item) => item.productId === productId && item.variant.sku === sku
        )
      },
    }),
    {
      name: 'mulaan-cart',
      storage: createJSONStorage(() => localStorage),
    }
  )
)