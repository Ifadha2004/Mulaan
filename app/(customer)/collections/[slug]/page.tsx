'use client'

import { useParams } from 'next/navigation'
import Link from 'next/link'

const mockAlbum = {
  name: 'The Ramadan Series',
  media: [
    { url: 'https://images.unsplash.com/photo-1594633313593-bab3a6e0be87?w=800', type: 'image' },
    { url: 'https://images.unsplash.com/photo-1581044777550-4cfa60707c03?w=800', type: 'image' },
    { url: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=800', type: 'image' },
  ]
}

export default function CollectionDetailPage() {
  const { slug } = useParams()

  return (
    <div className="min-h-screen bg-white">
      {/* Editorial Header */}
      <section className="h-[60vh] relative overflow-hidden flex items-center justify-center">
        <img src={mockAlbum.media[0].url} className="absolute inset-0 w-full h-full object-cover opacity-60 grayscale-[50%]" />
        <div className="relative text-center space-y-6 z-10 px-4">
          <h1 className="heading-luxury text-4xl md:text-6xl text-brand-green tracking-[0.4em] uppercase">{mockAlbum.name}</h1>
          <div className="w-20 h-[1px] bg-brand-gold mx-auto" />
          <p className="text-[10px] tracking-[0.5em] text-brand-green/60 uppercase">Spring Summer 2026</p>
        </div>
      </section>

      {/* The Album Grid */}
      <section className="container-luxury py-24">
        <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
          {mockAlbum.media.map((item, index) => (
            <div key={index} className="break-inside-avoid relative group cursor-zoom-in">
              <img src={item.url} className="w-full h-auto border border-brand-green/5 transition-opacity group-hover:opacity-90" />
            </div>
          ))}
        </div>

        {/* Call to Action: Shop the Collection */}
        <div className="mt-32 text-center py-20 border-t border-brand-green/5">
          <p className="text-gray-400 text-xs tracking-[0.3em] uppercase mb-8">Inspired by these silhouettes?</p>
          <Link 
            href="/products" 
            className="inline-block bg-brand-green text-white px-12 py-5 text-[11px] tracking-[0.4em] uppercase hover:bg-brand-green-800 transition-colors"
          >
            Explore the Collection Shop
          </Link>
        </div>
      </section>
    </div>
  )
}