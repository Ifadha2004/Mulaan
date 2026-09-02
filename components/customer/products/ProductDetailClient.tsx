'use client'

import { useState } from 'react'
import ProductGallery from '@/components/customer/products/ProductGallery'
import VariantSelector from '@/components/customer/products/VariantSelector'
import ProductInfo from '@/components/customer/products/ProductInfo'
import StockIndicator from '@/components/customer/products/StockIndicator'
import AddToCartButton from '@/components/customer/cart/AddToCartButton'
import { Badge, Button } from '@/components/shared/ui'
import { Heart, Share2, Truck, ShieldCheck } from 'lucide-react'

export default function ProductDetailClient({ product }: { product: any }) {
  const [selectedVariant, setSelectedVariant] = useState<any | null>(null)
  const [quantity, setQuantity] = useState(1)
  const [isFavorite, setIsFavorite] = useState(false)

  const totalStock =
    product.variants?.reduce((sum: number, v: any) => sum + v.stock, 0) || 0

  const getStatusBadge = () => {
    if (product.status === 'sold_out') {
      return <Badge variant="sold-out">Sold Out</Badge>
    }
    if (product.isPreOrder && product.status === 'pre_order') {
      return <Badge variant="pre-order">Pre-Order</Badge>
    }
    if (product.featured) {
      return <Badge variant="featured">Featured</Badge>
    }
    if (
      product.createdAt &&
      new Date(product.createdAt) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
    ) {
      return <Badge variant="new">New Arrival</Badge>
    }
    return null
  }

  const isPurchasable = product.status === 'active' || product.status === 'pre_order'

  return (
    <div className="min-h-screen bg-brand-cream-200 py-12">
      <div className="container-luxury">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left Column - Images */}
          <div>
            <ProductGallery images={product.images || []} productName={product.name} />
          </div>

          {/* Right Column - Product Details */}
          <div className="space-y-6">
            {/* Status Badge */}
            {getStatusBadge() && <div>{getStatusBadge()}</div>}

            {/* Product Name */}
            <h1 className="font-serif text-4xl text-brand-green-800 tracking-wide">
              {product.name}
            </h1>

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className="text-4xl font-bold text-brand-green-800">
                AED {product.price.toFixed(2)}
              </span>
            </div>

            {/* Stock Indicator */}
            <StockIndicator
              variant={selectedVariant || undefined}
              totalStock={!selectedVariant ? totalStock : undefined}
            />

            {/* Short Description */}
            <p className="text-gray-600 leading-relaxed border-b pb-6">
              {product.description?.split('.')[0]}.
            </p>

            {/* Variant Selector */}
            {product.variants && product.variants.length > 0 && (
              <VariantSelector
                variants={product.variants}
                onVariantChange={setSelectedVariant}
              />
            )}

            {/* Quantity Selector */}
            {isPurchasable && (
              <div>
                <label className="block font-medium text-brand-green-800 mb-3">
                  Quantity
                </label>
                <div className="flex items-center gap-4">
                  <div className="flex items-center border-2 border-brand-green-800">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-6 py-3 hover:bg-brand-green-800 hover:text-brand-cream-200 transition-colors"
                      disabled={quantity <= 1}
                    >
                      −
                    </button>
                    <span className="px-8 py-3 font-semibold text-lg border-x-2 border-brand-green-800">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-6 py-3 hover:bg-brand-green-800 hover:text-brand-cream-200 transition-colors"
                      disabled={selectedVariant ? quantity >= selectedVariant.stock : false}
                    >
                      +
                    </button>
                  </div>
                  {selectedVariant && (
                    <span className="text-sm text-gray-600">
                      Max: {selectedVariant.stock} available
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="space-y-3 pt-4">
              {!isPurchasable ? (
                <Button variant="primary" size="lg" disabled className="w-full py-4">
                  {product.status === 'sold_out' ? 'Sold Out' : 'Currently Unavailable'}
                </Button>
              ) : selectedVariant ? (
                <AddToCartButton
                  product={product}
                  variant={selectedVariant}
                  quantity={quantity}
                  className="w-full py-4 text-base"
                />
              ) : (
                <Button variant="primary" size="lg" disabled className="w-full py-4">
                  Select Size &amp; Color
                </Button>
              )}

              <div className="grid grid-cols-2 gap-3">
                <Button
                  variant="outline"
                  onClick={() => setIsFavorite(!isFavorite)}
                  className="py-3"
                >
                  <Heart
                    className={`w-5 h-5 ${isFavorite ? 'fill-red-500 text-red-500' : ''}`}
                  />
                  {isFavorite ? 'Saved' : 'Save'}
                </Button>
                <Button variant="outline" className="py-3">
                  <Share2 className="w-5 h-5" />
                  Share
                </Button>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="border-t border-b py-6 space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <Truck className="w-5 h-5 text-brand-gold" />
                <span className="text-gray-700">Free delivery on orders over AED 500</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <ShieldCheck className="w-5 h-5 text-brand-gold" />
                <span className="text-gray-700">100% authentic &amp; quality guaranteed</span>
              </div>
            </div>

            {/* WhatsApp Contact */}
            <div className="bg-green-50 border border-green-200 p-4 rounded">
              <p className="text-sm text-gray-700 mb-2">Need help? Contact us on WhatsApp</p>
              <Button variant="ghost" className="text-green-600 hover:bg-green-100 p-2">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Chat with us
              </Button>
            </div>
          </div>
        </div>

        {/* Product Information Tabs */}
        <div className="mt-16">
          <div className="bg-white shadow-md p-8">
            <ProductInfo product={product} />
          </div>
        </div>

        {/* Related Products Section */}
        <div className="mt-16">
          <h2 className="font-serif text-3xl mb-8 text-center text-brand-green-800 tracking-wide">
            You May Also Like
          </h2>
          <div className="text-center text-gray-600">
            <p>Related products will appear here</p>
          </div>
        </div>
      </div>
    </div>
  )
}