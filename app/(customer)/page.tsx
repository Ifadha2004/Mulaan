'use client'

import Link from 'next/link'
import { Button } from '@/components/shared/ui'
import { ArrowRight, ShoppingBag, Sparkles } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-brand-cream-200">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-green-900/20 to-transparent" />
        <div className="container-luxury relative z-10 text-center">
          <div className="max-w-4xl mx-auto space-y-8 animate-fade-in-up">
            <div className="flex justify-center mb-4">
              <Sparkles className="w-12 h-12 text-brand-gold" />
            </div>
            <h1 className="font-display text-6xl md:text-7xl lg:text-8xl text-brand-green-800 tracking-luxury">
              MULAAN
            </h1>
            <p className="font-serif text-2xl md:text-3xl text-brand-green-700 tracking-wide">
              Modest Wear for the Modern Woman
            </p>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover timeless elegance in every piece. Limited quantities, exclusive designs crafted with care.
            </p>
            <div className="flex gap-4 justify-center pt-4">
              <Link href="/products">
                <Button variant="gold" size="lg" className="group">
                  Shop Collection
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/about">
                <Button variant="secondary" size="lg">
                  Our Story
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="section-padding bg-white">
        <div className="container-luxury">
          <h2 className="font-serif text-4xl mb-12 text-center text-brand-green-800 tracking-wide">
            Shop by Collection
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {['New Arrivals', 'Best Sellers', 'Ramadan Special'].map((category) => (
              <Link
                key={category}
                href="/products"
                className="group relative aspect-square overflow-hidden bg-gray-100 hover:shadow-2xl transition-all duration-500"
              >
                <div className="absolute inset-0 bg-brand-green-800/40 group-hover:bg-brand-green-800/60 transition-colors flex items-center justify-center">
                  <div className="text-center">
                    <h3 className="font-serif text-3xl text-white mb-4 tracking-wide">
                      {category}
                    </h3>
                    <span className="text-brand-gold group-hover:underline">
                      Explore →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section-padding">
        <div className="container-luxury">
          <h2 className="font-serif text-4xl mb-12 text-center text-brand-green-800 tracking-wide">
            The Mulaan Promise
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8 bg-white shadow-md">
              <div className="w-16 h-16 bg-brand-gold rounded-full flex items-center justify-center mx-auto mb-6">
                <ShoppingBag className="w-8 h-8 text-brand-green-800" />
              </div>
              <h3 className="font-serif text-xl mb-3 text-brand-green-800">Limited Pieces</h3>
              <p className="text-gray-600">
                Each design is produced in limited quantities, ensuring exclusivity and uniqueness.
              </p>
            </div>
            <div className="text-center p-8 bg-white shadow-md">
              <div className="w-16 h-16 bg-brand-gold rounded-full flex items-center justify-center mx-auto mb-6">
                <Sparkles className="w-8 h-8 text-brand-green-800" />
              </div>
              <h3 className="font-serif text-xl mb-3 text-brand-green-800">Premium Quality</h3>
              <p className="text-gray-600">
                Handpicked fabrics and meticulous craftsmanship in every piece we create.
              </p>
            </div>
            <div className="text-center p-8 bg-white shadow-md">
              <div className="w-16 h-16 bg-brand-gold rounded-full flex items-center justify-center mx-auto mb-6">
                <ArrowRight className="w-8 h-8 text-brand-green-800" />
              </div>
              <h3 className="font-serif text-xl mb-3 text-brand-green-800">Fast Delivery</h3>
              <p className="text-gray-600">
                Quick and reliable shipping across the UAE. Your elegance, delivered.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-brand-green-800 text-center">
        <div className="container-luxury">
          <h2 className="font-serif text-4xl mb-6 text-brand-gold tracking-wide">
            Ready to Discover Your Style?
          </h2>
          <p className="text-brand-cream-200 text-lg mb-8 max-w-2xl mx-auto">
            Browse our exclusive collection and find pieces that speak to your elegant style.
          </p>
          <Link href="/products">
            <Button variant="gold" size="lg" className="group">
              Start Shopping
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}