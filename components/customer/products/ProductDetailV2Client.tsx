'use client'

import { useState } from 'react'
import ProductGallery from '@/components/customer/products/ProductGallery'
import VariantSelector from '@/components/customer/products/VariantSelector'
import ProductInfo from '@/components/customer/products/ProductInfo'
import StockIndicator from '@/components/customer/products/StockIndicator'
import AddToCartButton from '@/components/customer/cart/AddToCartButton'
import { Badge, Button } from '@/components/shared/ui'
import { Heart, Share2, Truck, ShieldCheck, MessageCircle } from 'lucide-react'
import CountdownTimer from '@/components/customer/CountdownTimer/CountdownTimer'
import { getCampaignStatus } from '@/lib/utils/product-status'
import { getProductPricing } from '@/lib/utils/product-pricing'

export default function ProductDetailV2Client({ product }: { product: any }) {
  const [selectedVariant, setSelectedVariant] = useState<any | null>(null)
  const [quantity, setQuantity] = useState(1)
  const [isFavorite, setIsFavorite] = useState(false)
  const campaignStatus = getCampaignStatus(product)
  const pricing = getProductPricing(product)
  const totalStock = product.variants?.reduce((sum: number, variant: any) => sum + variant.stock, 0) || 0

  const statusBadge = () => {
    if (campaignStatus === 'SOLD_OUT') return <Badge variant="sold-out">Sold Out</Badge>
    if (campaignStatus === 'COMING_SOON') return <Badge variant="featured">Launching Soon</Badge>
    if (campaignStatus === 'PRE_ORDER_OPEN') return <Badge variant="pre-order">Pre-Order Live</Badge>
    if (campaignStatus === 'PRE_ORDER_CLOSED') return <Badge variant="sold-out">Pre-Order Closed</Badge>
    if (pricing.isOnSale) return <Badge variant="featured">{pricing.saleLabel || `${pricing.discountPercent}% Off`}</Badge>
    return product.featured ? <Badge variant="featured">Featured</Badge> : null
  }

  return (
    <div className="min-h-screen bg-brand-cream-200 py-12">
      <div className="container-luxury">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          <div className="relative"><ProductGallery images={product.images || []} productName={product.name} /></div>
          <div className="space-y-8">
            <header className="space-y-4">
              {statusBadge()}
              <h1 className="font-serif text-4xl uppercase tracking-wide text-brand-green-800 lg:text-5xl">{product.name}</h1>
              {pricing.isOnSale ? <div className="flex flex-wrap items-baseline gap-3"><span className="text-lg font-light text-brand-green/40 line-through">LKR {pricing.regularPrice.toFixed(2)}</span><span className="text-3xl font-light text-brand-green-800">LKR {pricing.currentPrice.toFixed(2)}</span><span className="text-[10px] font-bold uppercase tracking-[0.25em] text-brand-gold">Save {pricing.discountPercent}%</span></div> : <span className="text-3xl font-light text-brand-green-800">LKR {pricing.regularPrice.toFixed(2)}</span>}
            </header>

            {campaignStatus === 'PRE_ORDER_OPEN' && product.preOrderEnd && <div className="rounded-sm border border-brand-gold/20 bg-white/60 p-8 shadow-sm backdrop-blur-sm"><p className="mb-4 text-center text-[10px] font-bold uppercase tracking-[0.3em] text-brand-gold">Exclusive Pre-Order Window Closes In:</p><CountdownTimer targetDate={product.preOrderEnd} /></div>}

            <div className="space-y-6 border-t border-brand-green/5 pt-8">
              <StockIndicator variant={selectedVariant || undefined} totalStock={!selectedVariant ? totalStock : undefined} />
              <p className="font-light leading-loose tracking-wide text-gray-600">{product.description}</p>
              {product.variants?.length > 0 && <VariantSelector variants={product.variants} onVariantChange={setSelectedVariant} />}
              <div className="space-y-3"><label className="block text-[10px] font-bold uppercase tracking-widest text-brand-green-800">Quantity</label><div className="flex items-center border border-brand-green/20 bg-white w-fit"><button type="button" onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-5 py-3" disabled={quantity <= 1 || campaignStatus === 'COMING_SOON'}>−</button><span className="min-w-[60px] border-x border-brand-green/10 px-6 py-3 text-center font-medium text-brand-green-800">{quantity}</span><button type="button" onClick={() => setQuantity(quantity + 1)} className="px-5 py-3" disabled={(selectedVariant ? quantity >= selectedVariant.stock : false) || campaignStatus === 'COMING_SOON'}>+</button></div></div>
            </div>

            <div className="space-y-4 pt-6">
              {campaignStatus === 'COMING_SOON' ? <Button variant="outline" disabled className="w-full py-6 tracking-[0.3em]">RELEASING SOON</Button> : campaignStatus === 'PRE_ORDER_CLOSED' || campaignStatus === 'SOLD_OUT' ? <Button variant="outline" disabled className="w-full py-6 tracking-[0.3em]">EDITION CLOSED</Button> : selectedVariant ? <AddToCartButton product={product} variant={selectedVariant} quantity={quantity} className="w-full py-6 text-[11px] uppercase tracking-[0.4em]" /> : <Button variant="primary" size="lg" disabled className="w-full py-6 text-[11px] uppercase tracking-[0.4em] opacity-40">Select Size &amp; Color</Button>}
              <div className="grid grid-cols-2 gap-4"><Button variant="outline" onClick={() => setIsFavorite(!isFavorite)} className="py-4 text-[10px] uppercase tracking-widest"><Heart className={`mr-2 h-4 w-4 ${isFavorite ? 'fill-red-500 text-red-500' : ''}`} />{isFavorite ? 'Saved' : 'Save'}</Button><Button variant="outline" className="py-4 text-[10px] uppercase tracking-widest"><Share2 className="mr-2 h-4 w-4" />Share</Button></div>
            </div>

            <footer className="grid grid-cols-1 gap-4 border-t border-brand-green/5 py-8 md:grid-cols-2"><div className="flex items-center gap-4"><div className="rounded-full bg-white p-3"><Truck className="h-5 w-5 text-brand-gold" /></div><span className="text-[10px] uppercase tracking-widest text-gray-500">Islandwide Delivery Available</span></div><div className="flex items-center gap-4"><div className="rounded-full bg-white p-3"><ShieldCheck className="h-5 w-5 text-brand-gold" /></div><span className="text-[10px] uppercase tracking-widest text-gray-500">Quality Guaranteed</span></div></footer>
            <a href="https://wa.me/94760100965" target="_blank" rel="noopener noreferrer" className="group flex items-center justify-between bg-brand-green p-6 text-white shadow-xl"><div><p className="text-[10px] font-bold uppercase tracking-widest text-brand-gold">Inquiries</p><p className="text-xs font-light">Need styling advice or sizing help?</p></div><MessageCircle className="h-6 w-6 text-brand-gold" /></a>
          </div>
        </div>
        <section className="mt-24"><div className="border border-brand-green/5 bg-white p-10 shadow-sm lg:p-16"><ProductInfo product={product} /></div></section>
        <section className="mt-24 space-y-12"><div className="text-center"><h2 className="font-serif text-3xl uppercase tracking-[0.2em] text-brand-green-800">Completing the Look</h2><div className="mx-auto mt-4 h-px w-12 bg-brand-gold" /></div><div className="border border-dashed border-brand-green/10 py-20 text-center text-[10px] uppercase tracking-[0.3em] text-gray-400">Curated pieces arriving soon</div></section>
      </div>
    </div>
  )
}
