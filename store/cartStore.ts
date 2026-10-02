import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { CartStore, CartItem } from '@/types/cart'
import { IProduct, IProductVariant } from '@/lib/db/models'
import { getProductPricing } from '@/lib/utils/product-pricing'
import toast from 'react-hot-toast'

const calculateTotals = (items: CartItem[]) => {
  const itemCount = items.reduce((total, item) => total + item.quantity, 0)
  const subtotal = items.reduce((total, item) => total + item.price * item.quantity, 0)
  return { itemCount, subtotal, total: subtotal }
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [], itemCount: 0, subtotal: 0, total: 0,
      addItem: (product: IProduct, variant: IProductVariant, quantity = 1) => {
        const items = get().items
        const pricing = getProductPricing(product)
        const index = items.findIndex((item) => item.productId === product._id.toString() && item.variant.sku === variant.sku)
        const newItems: CartItem[] = index > -1
          ? items.map((item, itemIndex) => itemIndex === index ? { ...item, price: pricing.currentPrice, quantity: item.quantity + quantity } : item)
          : [...items, { productId: product._id.toString(), name: product.name, slug: product.slug, price: pricing.currentPrice, image: product.images[0]?.url || '', variant: { size: variant.size, color: variant.color, sku: variant.sku }, quantity }]
        set({ items: newItems, ...calculateTotals(newItems) })
        toast.success(index > -1 ? 'Cart updated!' : 'Added to cart!')
      },
      removeItem: (productId: string, sku: string) => {
        const newItems = get().items.filter((item) => !(item.productId === productId && item.variant.sku === sku))
        set({ items: newItems, ...calculateTotals(newItems) }); toast.success('Removed from cart')
      },
      updateQuantity: (productId: string, sku: string, quantity: number) => {
        if (quantity < 1) return get().removeItem(productId, sku)
        const newItems = get().items.map((item) => item.productId === productId && item.variant.sku === sku ? { ...item, quantity } : item)
        set({ items: newItems, ...calculateTotals(newItems) })
      },
      clearCart: () => { set({ items: [], itemCount: 0, subtotal: 0, total: 0 }); toast.success('Cart cleared') },
      getItemQuantity: (productId: string, sku: string) => get().items.find((item) => item.productId === productId && item.variant.sku === sku)?.quantity || 0,
      isInCart: (productId: string, sku: string) => get().items.some((item) => item.productId === productId && item.variant.sku === sku),
    }),
    { name: 'mulaan-cart', storage: createJSONStorage(() => localStorage) }
  )
)
