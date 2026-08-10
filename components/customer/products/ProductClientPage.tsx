'use client'

import { useState, useMemo } from 'react'
import ProductGallery from '@/components/customer/products/ProductGallery'
import VariantSelector from '@/components/customer/products/VariantSelector'
import ProductInfo from '@/components/customer/products/ProductInfo'
import StockIndicator from '@/components/customer/products/StockIndicator'
import AddToCartButton from '@/components/customer/cart/AddToCartButton'
import { Badge, Button } from '@/components/shared/ui'
import { Heart, Share2, Truck, ShieldCheck, MessageCircle } from 'lucide-react'
import { IProductVariant } from '@/lib/db/models'
import CountdownTimer from '@/components/customer/CountdownTimer/CountdownTimer'
import { getCampaignStatus } from '@/lib/utils/product-status'

export default function ProductClientPage({ initialProduct }: { initialProduct: any }) {
  const [selectedVariant, setSelectedVariant] = useState<IProductVariant | null>(null)
  const [quantity, setQuantity] = useState(1)
  const [isFavorite, setIsFavorite] = useState(false)

  const product = initialProduct

  // 1. Reconcile the DB model with the Campaign Status utility
  // We use useMemo to avoid re-calculating on every tiny state change
  const campaignStatus = useMemo(() => {
    return getCampaignStatus({
      ...product,
      // Map DB fields to the format expected by the utility
      preOrderConfig: product.isPreOrder ? {
        startAt: product.preOrderStart,
        endAt: product.preOrderEnd
      } : undefined
    })
  }, [product])

  const totalStock = product.variants?.reduce((sum: number, v: any) => sum + v.stock, 0) || 0

  const renderStatusBadge = () => {
    switch (campaignStatus) {
      case 'SOLD_OUT': return <Badge variant="sold-out">Sold Out</Badge>
      case 'COMING_SOON': return <Badge variant="featured">Launching Soon</Badge>
      case 'PRE_ORDER_OPEN': return <Badge variant="pre-order">Pre-Order Live</Badge>
      case 'PRE_ORDER_CLOSED': return <Badge variant="sold-out">Pre-Order Closed</Badge>
      default: return product.featured ? <Badge variant="featured">Featured</Badge> : null
    }
  }

  return (
    <div className="min-h-screen bg-brand-cream-200 py-12">
      <div className="container-luxury">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          
          {/* LEFT: GALLERY */}
          <div className="relative">
            <ProductGallery images={product.images || []} productName={product.name} />
          </div>

          {/* RIGHT: CONTENT */}
          <div className="space-y-8">
            <header className="space-y-4">
              {renderStatusBadge()}
              <h1 className="font-serif text-4xl lg:text-5xl text-brand-green-800 tracking-wide uppercase">
                {product.name}
              </h1>
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-light text-brand-green-800">
                  AED {product.price.toFixed(2)}
                </span>
              </div>
            </header>

            {/* PRE-ORDER COUNTDOWN SECTION - Updated to use preOrderEnd from DB */}
            {campaignStatus === 'PRE_ORDER_OPEN' && product.preOrderEnd && (
              <div className="bg-white/60 backdrop-blur-sm p-8 border border-brand-gold/20 shadow-sm rounded-sm">
                <p className="text-[10px] tracking-[0.3em] uppercase text-brand-gold mb-4 text-center font-bold">
                  Exclusive Pre-Order Window Closes In:
                </p>
                <CountdownTimer targetDate={product.preOrderEnd} />
              </div>
            )}

            <div className="space-y-6 border-t border-brand-green/5 pt-8">
              <StockIndicator 
                variant={selectedVariant || undefined} 
                totalStock={!selectedVariant ? totalStock : undefined}
              />

              <p className="text-gray-600 leading-loose font-light tracking-wide">
                {product.description}
              </p>

              {product.variants && product.variants.length > 0 && (
                <VariantSelector
                  variants={product.variants as IProductVariant[]}
                  onVariantChange={(v) => {
                    setSelectedVariant(v)
                    setQuantity(1) // Reset quantity when size/color changes
                  }}
                />
              )}

              {/* QUANTITY */}
              <div className="space-y-3">
                <label className="block text-[10px] tracking-widest uppercase text-brand-green-800 font-bold">
                  Quantity
                </label>
                <div className="flex items-center gap-6">
                  <div className="flex items-center border border-brand-green/20 bg-white">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-5 py-3 hover:text-brand-gold transition-colors"
                      disabled={quantity <= 1 || campaignStatus === 'COMING_SOON'}
                    >
                      −
                    </button>
                    <span className="px-6 py-3 font-medium text-brand-green-800 border-x border-brand-green/10 min-w-[60px] text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-5 py-3 hover:text-brand-gold transition-colors"
                      disabled={selectedVariant ? quantity >= selectedVariant.stock : false || campaignStatus === 'COMING_SOON'}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* ACTION BUTTONS */}
            <div className="space-y-4 pt-6">
              {campaignStatus === 'COMING_SOON' ? (
                <Button variant="outline" disabled className="w-full py-6 tracking-[0.3em] border-brand-gold/30 opacity-60">
                  RELEASING SOON
                </Button>
              ) : campaignStatus === 'PRE_ORDER_CLOSED' || campaignStatus === 'SOLD_OUT' ? (
                <Button variant="outline" disabled className="w-full py-6 tracking-[0.3em] bg-gray-50">
                  EDITION CLOSED
                </Button>
              ) : selectedVariant ? (
                <AddToCartButton
                  product={product as any}
                  variant={selectedVariant}
                  quantity={quantity}
                  className="w-full py-6 text-[11px] tracking-[0.4em] uppercase"
                />
              ) : (
                <Button variant="primary" size="lg" disabled className="w-full py-6 text-[11px] tracking-[0.4em] uppercase opacity-40">
                  Select Size & Color
                </Button>
              )}

              <div className="grid grid-cols-2 gap-4">
                <Button
                  variant="outline"
                  onClick={() => setIsFavorite(!isFavorite)}
                  className="py-4 text-[10px] tracking-widest uppercase"
                >
                  <Heart className={`w-4 h-4 mr-2 ${isFavorite ? 'fill-red-500 text-red-500' : ''}`} />
                  {isFavorite ? 'Saved' : 'Save'}
                </Button>
                <Button variant="outline" className="py-4 text-[10px] tracking-widest uppercase">
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </Button>
              </div>
            </div>

            {/* TRUST MARKERS */}
            <footer className="grid grid-cols-1 md:grid-cols-2 gap-4 py-8 border-t border-brand-green/5">
              <div className="flex items-center gap-4 group">
                <div className="p-3 bg-white rounded-full group-hover:bg-brand-gold/10 transition-colors">
                  <Truck className="w-5 h-5 text-brand-gold" />
                </div>
                <span className="text-[10px] tracking-widest uppercase text-gray-500">Free Delivery Over AED 500</span>
              </div>
              <div className="flex items-center gap-4 group">
                <div className="p-3 bg-white rounded-full group-hover:bg-brand-gold/10 transition-colors">
                  <ShieldCheck className="w-5 h-5 text-brand-gold" />
                </div>
                <span className="text-[10px] tracking-widest uppercase text-gray-500">Quality Guaranteed</span>
              </div>
            </footer>

            {/* WHATSAPP SUPPORT */}
            <a 
              href={`https://wa.me/YOUR_NUMBER?text=Inquiry about ${product.name}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-brand-green text-white p-6 shadow-xl flex items-center justify-between group cursor-pointer"
            >
              <div className="space-y-1">
                <p className="text-[10px] tracking-widest uppercase text-brand-gold font-bold">Inquiries</p>
                <p className="text-xs font-light">Need styling advice or sizing help?</p>
              </div>
              <MessageCircle className="w-6 h-6 text-brand-gold group-hover:scale-110 transition-transform" />
            </a>
          </div>
        </div>

        {/* DETAILS TABS */}
        <section className="mt-24">
          <div className="bg-white p-10 lg:p-16 border border-brand-green/5 shadow-sm">
            <ProductInfo product={product as any} />
          </div>
        </section>

        {/* RELATED PIECES */}
        <section className="mt-24 space-y-12">
          <div className="text-center">
            <h2 className="font-serif text-3xl text-brand-green-800 tracking-[0.2em] uppercase">
              Completing the Look
            </h2>
            <div className="w-12 h-[1px] bg-brand-gold mx-auto mt-4" />
          </div>
          <div className="text-center text-gray-400 text-[10px] tracking-[0.3em] uppercase py-20 border border-dashed border-brand-green/10">
            Curated pieces arriving soon
          </div>
        </section>
      </div>
    </div>
  )
}