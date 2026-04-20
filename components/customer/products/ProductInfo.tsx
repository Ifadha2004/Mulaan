'use client'

import { IProduct } from '@/lib/db/models'
import { Package, Truck, ShieldCheck, Clock } from 'lucide-react'

interface ProductInfoProps {
  product: IProduct
}

export default function ProductInfo({ product }: ProductInfoProps) {
  return (
    <div className="space-y-12 animate-fade-in">
      {/* Header Info - Moved Price/Name focus here if not already handled */}
      <div className="border-b border-brand-green/10 pb-8">
        <h1 className="heading-display text-3xl mb-2 tracking-widest">{product.name}</h1>
        <p className="text-2xl font-light text-brand-green italic">AED {product.price.toFixed(2)}</p>
      </div>

      {/* Description Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 border-b border-brand-green/10 pb-8">
        <h3 className="heading-luxury text-xs uppercase tracking-[0.3em] text-brand-gold">The Detail</h3>
        <div className="md:col-span-2">
          <p className="text-gray-600 leading-relaxed font-light text-sm italic">
            {product.description || "A masterclass in silhouette and fabric choice, designed for the modern woman."}
          </p>
        </div>
      </div>

      {/* Accordion Style for Care/Fabric (Optional but looks Pro) */}
      <div className="space-y-4">
        {product.fabricDetails && (
          <details className="group border-b border-brand-green/10 pb-4">
            <summary className="flex justify-between items-center cursor-pointer list-none heading-luxury text-xs uppercase tracking-widest">
              Fabric & Composition
              <span className="group-open:rotate-180 transition-transform">↓</span>
            </summary>
            <p className="mt-4 text-sm text-gray-500 font-light leading-loose">
              {product.fabricDetails}
            </p>
          </details>
        )}

        {product.careInstructions && (
          <details className="group border-b border-brand-green/10 pb-4">
            <summary className="flex justify-between items-center cursor-pointer list-none heading-luxury text-xs uppercase tracking-widest">
              Care Instructions
              <span className="group-open:rotate-180 transition-transform">↓</span>
            </summary>
            <p className="mt-4 text-sm text-gray-500 font-light leading-loose">
              {product.careInstructions}
            </p>
          </details>
        )}
      </div>

      {/* Luxury Features Grid */}
      <div className="grid grid-cols-2 gap-y-10 gap-x-6 pt-6">
        {[
          { icon: Package, title: "Premium Quality", desc: "Sourced from the finest mills" },
          { icon: Truck, title: "Dubai Express", desc: "Complimentary local delivery" },
          { icon: ShieldCheck, title: "Authenticity", desc: "100% Genuine Mulaan Garment" },
          { icon: Clock, title: "Limited Run", desc: "Exclusive small-batch production" }
        ].map((item, i) => (
          <div key={i} className="flex flex-col items-center text-center space-y-2">
            <item.icon className="w-5 h-5 text-brand-gold stroke-[1px]" />
            <h4 className="heading-luxury text-[10px] uppercase tracking-tighter">{item.title}</h4>
            <p className="text-[10px] text-gray-400 font-light">{item.desc}</p>
          </div>
        ))}
      </div>

      {/* Pre-Order Section - Integrated elegantly */}
      {product.isPreOrder && (
        <div className="mt-8 p-6 border border-brand-gold/30 bg-brand-cream/50 text-center">
          <p className="heading-luxury text-[10px] uppercase tracking-[0.2em] text-brand-green mb-2">Exclusive Pre-Order</p>
          <p className="text-[11px] text-gray-500 font-light">
            Shipping expected by {new Date(product.preOrderEnd!).toLocaleDateString('en-AE', { month: 'long', day: 'numeric' })}
          </p>
        </div>
      )}
    </div>
  )
}