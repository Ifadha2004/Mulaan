'use client'

import { useCart } from '@/lib/hooks/useCart'
import Link from 'next/link'
import { X, ShoppingBag, ArrowRight } from 'lucide-react'

export default function CartPage() {
  const { items, itemCount, subtotal, removeItem, updateQuantity, clearCart, isEmpty } = useCart()

  return (
    <div className="min-h-screen bg-[#FCFAF7] py-24">
      <div className="container-luxury max-w-5xl">
        <header className="mb-16 text-center space-y-4">
          <h1 className="heading-luxury text-4xl lg:text-5xl tracking-[0.25em] text-brand-green uppercase">
            Your Selection
          </h1>
          <div className="w-24 h-[1px] bg-brand-gold mx-auto" />
          <p className="text-gray-400 font-light text-[10px] tracking-[0.3em] uppercase">
            {itemCount} {itemCount === 1 ? 'Piece' : 'Pieces'} in your cart
          </p>
        </header>

        {isEmpty ? (
          <div className="max-w-xl mx-auto py-20 text-center space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <ShoppingBag className="w-16 h-16 mx-auto text-brand-gold/30 stroke-[1px]" />
            <h2 className="heading-luxury text-xl tracking-widest text-brand-green">Your cart is currently empty</h2>
            <Link
              href="/products"
              className="inline-block px-12 py-4 bg-brand-green text-white text-[10px] tracking-[0.4em] uppercase hover:bg-brand-green/90 transition-all"
            >
              Discover the Collection
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-12 gap-16 items-start">
            {/* Cart Items List */}
            <div className="lg:col-span-8 space-y-12">
              <div className="flex justify-end">
                <button
                  onClick={clearCart}
                  className="text-[10px] tracking-widest text-gray-400 uppercase hover:text-red-800 transition-colors"
                >
                  Clear All
                </button>
              </div>

              {items.map((item) => (
                <div
                  key={`${item.productId}-${item.variant.sku}`}
                  className="group relative flex gap-8 pb-12 border-b border-brand-green/5 last:border-0"
                >
                  {/* Portrait aspect ratio image to match gallery */}
                  <div className="w-32 aspect-[3/4] bg-[#F9F9F7] overflow-hidden flex-shrink-0">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-700"
                    />
                  </div>

                  <div className="flex-1 flex flex-col justify-between py-2">
                    <div className="flex justify-between items-start">
                      <div className="space-y-1">
                        <Link
                          href={`/products/${item.slug}`}
                          className="heading-luxury text-lg tracking-wider text-brand-green hover:text-brand-gold transition-colors block uppercase"
                        >
                          {item.name}
                        </Link>
                        <p className="text-[10px] tracking-[0.2em] text-gray-400 uppercase font-light">
                          Size: {item.variant.size} <span className="mx-2 text-brand-gold">•</span> {item.variant.color}
                        </p>
                      </div>
                      <button
                        onClick={() => removeItem(item.productId, item.variant.sku)}
                        className="text-gray-300 hover:text-brand-green transition-all"
                      >
                        <X className="w-4 h-4 stroke-[1.5px]" />
                      </button>
                    </div>

                    <div className="flex items-end justify-between mt-8">
                      {/* Refined Quantity Controls */}
                      <div className="flex items-center border border-brand-green/10 bg-white">
                        <button
                          onClick={() => updateQuantity(item.productId, item.variant.sku, item.quantity - 1)}
                          className="w-10 h-10 flex items-center justify-center text-brand-green/50 hover:text-brand-green transition-colors"
                        >
                          −
                        </button>
                        <span className="w-10 text-center text-[11px] font-medium text-brand-green">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.productId, item.variant.sku, item.quantity + 1)}
                          className="w-10 h-10 flex items-center justify-center text-brand-green/50 hover:text-brand-green transition-colors"
                        >
                          +
                        </button>
                      </div>

                      <div className="text-right">
                        <p className="text-[10px] tracking-[0.1em] text-gray-300 mb-1 uppercase">Total</p>
                        <p className="text-sm font-medium tracking-widest text-brand-green">
                          AED {(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Sticky Summary Card */}
            <div className="lg:col-span-4 lg:sticky lg:top-32">
              <div className="bg-white p-10 border border-brand-green/5 shadow-[0_20px_50px_rgba(20,38,34,0.04)]">
                <h2 className="heading-luxury text-sm tracking-[0.3em] mb-8 text-brand-green uppercase border-b border-brand-green/5 pb-4">
                  Summary
                </h2>

                <div className="space-y-6 mb-10">
                  <div className="flex justify-between text-[11px] tracking-widest uppercase text-gray-400 font-light">
                    <span>Subtotal</span>
                    <span className="text-brand-green">AED {subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-[11px] tracking-widest uppercase text-gray-400 font-light">
                    <span>Shipping</span>
                    <span className="italic normal-case text-[10px]">Calculated next step</span>
                  </div>
                  <div className="pt-6 border-t border-brand-green/5 flex justify-between items-baseline">
                    <span className="heading-luxury text-[10px] tracking-[0.3em] uppercase">Total</span>
                    <span className="text-xl tracking-widest text-brand-green font-medium">AED {subtotal.toFixed(2)}</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <Link
                    href="/checkout"
                    className="flex items-center justify-between w-full px-8 py-5 bg-brand-green text-white text-[11px] tracking-[0.3em] uppercase group hover:bg-brand-green/90 transition-all"
                  >
                    Checkout Securely
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>

                  <Link
                    href="/products"
                    className="block w-full text-center py-4 text-[9px] tracking-[0.3em] text-gray-400 uppercase hover:text-brand-gold transition-colors"
                  >
                    Back to Gallery
                  </Link>
                </div>
              </div>
              
              {/* Optional: Luxury Reassurance Tags */}
              <div className="mt-8 flex justify-center gap-6 opacity-40">
                <p className="text-[8px] tracking-[0.2em] uppercase">Secured by Stripe</p>
                <p className="text-[8px] tracking-[0.2em] uppercase">Premium Packaging</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}