'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
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

// Enhanced Mock product with campaign configuration
const mockProduct = {
  _id: '1' as any,
  name: 'Elegant Black Abaya',
  slug: 'elegant-black-abaya',
  price: 299,
  description: 'Experience timeless elegance with our signature black abaya. Crafted from premium fabric, this piece combines traditional modesty with contemporary style. Perfect for both everyday wear and special occasions.',
  images: [
    { url: 'https://images.unsplash.com/photo-1594633313593-bab3a6e0be87?w=800', alt: 'Front View', order: 1 },
    { url: 'https://images.unsplash.com/photo-1583391733981-5aaf6651125a?w=800', alt: 'Side View', order: 2 },
    { url: 'https://images.unsplash.com/photo-1596783074918-c84cb06531ca?w=800', alt: 'Detail', order: 3 },
    { url: 'https://images.unsplash.com/photo-1581044777550-4cfa60707c03?w=800', alt: 'Back View', order: 4 },
  ],
  variants: [
    { size: 'S', color: 'Black', stock: 5, sku: 'EBA-S-BLK' },
    { size: 'M', color: 'Black', stock: 8, sku: 'EBA-M-BLK' },
    { size: 'L', color: 'Black', stock: 3, sku: 'EBA-L-BLK' },
    { size: 'XL', color: 'Black', stock: 2, sku: 'EBA-XL-BLK' },
  ],
  status: 'active' as const, // active, sold_out, pre_order, archived
  preOrderConfig: {
    startAt: '2026-04-10T00:00:00Z',
    endAt: '2026-04-30T23:59:59Z' 
  },
  featured: true,
  fabricDetails: 'Premium polyester blend with a soft, breathable finish.',
  careInstructions: 'Machine wash cold with similar colors.',
  createdAt: new Date(),
}

export default function ProductDetailPage() {
  const params = useParams()
  const [selectedVariant, setSelectedVariant] = useState<IProductVariant | null>(null)
  const [quantity, setQuantity] = useState(1)
  const [isFavorite, setIsFavorite] = useState(false)

  // In a real app, you would fetch product data using params.slug
  const product = mockProduct
  const campaignStatus = getCampaignStatus(product)
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

            {/* PRE-ORDER COUNTDOWN SECTION */}
            {campaignStatus === 'PRE_ORDER_OPEN' && product.preOrderConfig && (
              <div className="bg-white/60 backdrop-blur-sm p-8 border border-brand-gold/20 shadow-sm rounded-sm">
                <p className="text-[10px] tracking-[0.3em] uppercase text-brand-gold mb-4 text-center font-bold">
                  Exclusive Pre-Order Window Closes In:
                </p>
                <CountdownTimer targetDate={product.preOrderConfig.endAt} />
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
                  onVariantChange={setSelectedVariant}
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
            <div className="bg-brand-green text-white p-6 shadow-xl flex items-center justify-between group cursor-pointer">
              <div className="space-y-1">
                <p className="text-[10px] tracking-widest uppercase text-brand-gold font-bold">Inquiries</p>
                <p className="text-xs font-light">Need styling advice or sizing help?</p>
              </div>
              <Button variant="ghost" className="hover:bg-transparent p-0">
                <MessageCircle className="w-6 h-6 text-brand-gold group-hover:scale-110 transition-transform" />
              </Button>
            </div>
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