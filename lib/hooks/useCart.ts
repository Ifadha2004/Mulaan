'use client'

import { useCartStore } from '@/store/cartStore'
import { IProduct, IProductVariant } from '@/lib/db/models'

export const useCart = () => {
  const {
    items,
    itemCount,
    subtotal,
    total,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    getItemQuantity,
    isInCart,
  } = useCartStore()

  // Helper function to add item with validation
  const addToCart = (product: IProduct, variant: IProductVariant, quantity = 1) => {
    // Check if variant has stock
    if (variant.stock < quantity) {
      return {
        success: false,
        message: `Only ${variant.stock} items available`,
      }
    }

    // Check product status
    if (product.status === 'sold_out') {
      return {
        success: false,
        message: 'This product is sold out',
      }
    }

    if (product.status === 'archived') {
      return {
        success: false,
        message: 'This product is no longer available',
      }
    }

    // Add to cart
    addItem(product, variant, quantity)
    
    return {
      success: true,
      message: 'Added to cart!',
    }
  }

  // Helper to get total items in cart
  const getTotalItems = () => itemCount

  // Helper to check if cart is empty
  const isEmpty = () => items.length === 0

  // Helper to get cart item by product and variant
  const getCartItem = (productId: string, sku: string) => {
    return items.find(
      (item) => item.productId === productId && item.variant.sku === sku
    )
  }

  return {
    // State
    items,
    itemCount,
    subtotal,
    total,
    isEmpty: isEmpty(),
    
    // Actions
    addToCart,
    removeItem,
    updateQuantity,
    clearCart,
    
    // Helpers
    getItemQuantity,
    isInCart,
    getTotalItems,
    getCartItem,
  }
}