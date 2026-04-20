'use client'

import { useCart } from '@/lib/hooks/useCart'
import { X, ShoppingBag, ArrowRight } from 'lucide-react'
import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function CartDrawer() {
  const [isOpen, setIsOpen] = useState(false)
  const { items, itemCount, subtotal, removeItem, updateQuantity } = useCart()

  useEffect(() => {
    const handleOpenCart = () => setIsOpen(true)
    window.addEventListener('openCart', handleOpenCart)
    return () => window.removeEventListener('openCart', handleOpenCart)
  }, [])

  if (!isOpen) return null

  return (
    <>
      <div 
        className="fixed inset-0 bg-brand-green/40 backdrop-blur-sm z-40 transition-all duration-500 animate-in fade-in"
        onClick={() => setIsOpen(false)}
      />

      <div className="fixed right-0 top-0 h-full w-full max-w-sm bg-[#FCFAF7] shadow-[-20px_0_50px_rgba(20,38,34,0.1)] z-50 flex flex-col animate-in slide-in-from-right duration-500">
        {/* Editorial Header */}
        <div className="flex items-center justify-between p-8 border-b border-brand-green/5">
          <div className="space-y-1">
            <h2 className="heading-luxury text-sm tracking-[0.3em] text-brand-green uppercase">
              The Drawer
            </h2>
            <p className="text-[9px] tracking-[0.1em] text-gray-400 uppercase">{itemCount} pieces</p>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 text-brand-green/30 hover:text-brand-green hover:rotate-90 transition-all duration-500"
          >
            <X className="w-5 h-5 stroke-[1px]" />
          </button>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto px-8 py-4 custom-scrollbar">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
              <p className="heading-luxury text-[10px] tracking-[0.2em] text-gray-400 uppercase">Your drawer is empty</p>
              <Link href="/products" onClick={() => setIsOpen(false)} className="text-[10px] tracking-[0.3em] text-brand-gold uppercase border-b border-brand-gold pb-1">Begin Browsing</Link>
            </div>
          ) : (
            <div className="space-y-10 py-6">
              {items.map((item) => (
                <div key={`${item.productId}-${item.variant.sku}`} className="flex gap-4">
                  <div className="w-20 aspect-[3/4] bg-[#F9F9F7] overflow-hidden">
                    <img src={item.image} className="w-full h-full object-cover" alt={item.name} />
                  </div>
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <h3 className="heading-luxury text-[10px] tracking-[0.2em] text-brand-green uppercase mb-1">{item.name}</h3>
                        <button onClick={() => removeItem(item.productId, item.variant.sku)} className="text-gray-300 hover:text-brand-green transition-colors">
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                      <p className="text-[9px] text-gray-400 tracking-widest uppercase font-light">
                        {item.variant.size} • {item.variant.color}
                      </p>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-xs">
                        <button onClick={() => updateQuantity(item.productId, item.variant.sku, item.quantity - 1)} className="text-brand-green/30 hover:text-brand-green">-</button>
                        <span className="text-[10px] font-medium">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.productId, item.variant.sku, item.quantity + 1)} className="text-brand-green/30 hover:text-brand-green">+</button>
                      </div>
                      <p className="text-[10px] tracking-widest text-brand-green">AED {(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="p-8 bg-white border-t border-brand-green/5 space-y-4">
            <div className="flex justify-between items-baseline mb-2">
              <span className="heading-luxury text-[10px] tracking-[0.3em] uppercase">Total Selection</span>
              <span className="text-lg tracking-widest text-brand-green">AED {subtotal.toFixed(2)}</span>
            </div>
            <Link
              href="/cart"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-between w-full px-6 py-4 border border-brand-green text-brand-green text-[10px] tracking-[0.3em] uppercase hover:bg-brand-green hover:text-white transition-all"
            >
              Full Summary
              <ArrowRight className="w-3 h-3" />
            </Link>
            <Link
              href="/checkout"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-between w-full px-6 py-4 bg-brand-gold text-brand-green text-[10px] tracking-[0.3em] uppercase hover:opacity-90 transition-all"
            >
              Express Checkout
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        )}
      </div>
    </>
  )
}