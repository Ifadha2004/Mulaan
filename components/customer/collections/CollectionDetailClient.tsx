'use client'

import Link from 'next/link'
import { motion, Variants } from 'framer-motion'
import MagazineFlipbook from '@/components/customer/collections/MagazineFlipbook'

interface CollectionMedia {
  url: string
  type: 'image' | 'video'
  alt?: string
}

interface CollectionDetailClientProps {
  collection: {
    name: string
    slug: string
    description: string
    coverImage: string
    media: CollectionMedia[]
    magazinePages: CollectionMedia[]
  }
}

// Animation variants for the images
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1, // Stagger effect based on index
      duration: 0.8,
      ease: [0.21, 0.47, 0.32, 0.98], // Luxury "silk" easing
    },
  }),
}

export default function CollectionDetailClient({ collection }: CollectionDetailClientProps) {
  // Gallery = cover image + any additional lookbook media uploaded in admin
  const galleryItems: CollectionMedia[] = [
    { url: collection.coverImage, type: 'image', alt: collection.name },
    ...collection.media,
  ]

  // Only show the flipbook section if the admin has actually uploaded pages —
  // many collections (like this one's 3rd) simply won't have a magazine yet,
  // and that's expected, not a bug.
  const hasMagazine = collection.magazinePages && collection.magazinePages.length > 0
  const magazinePages = hasMagazine ? collection.magazinePages.map((p) => p.url) : []

  return (
    <div className="min-h-screen bg-[#FCFAF7]">
      {/* 1. MINIMALIST TITLE HEADER */}
      <header className="pt-32 pb-16 text-center border-b border-brand-green/5">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="container-luxury space-y-4"
        >
          <span className="text-[10px] tracking-[0.6em] text-brand-gold uppercase font-medium">
            Collection Edition
          </span>
          <h1 className="heading-luxury text-4xl md:text-6xl text-brand-green tracking-[0.3em] uppercase">
            {collection.name}
          </h1>
          <div className="w-12 h-[1px] bg-brand-gold mx-auto mt-6" />
          {collection.description && (
            <p className="text-gray-500 text-sm max-w-xl mx-auto italic pt-2">
              {collection.description}
            </p>
          )}
        </motion.div>
      </header>

      {/* 2. THE PHOTO ALBUM GRID WITH SCROLL ANIMATIONS */}
      <section className="container-luxury py-24">
        <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
          {galleryItems.map((item, index) => (
            <motion.div
              key={index}
              custom={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              variants={fadeInUp}
              className="break-inside-avoid relative group overflow-hidden shadow-sm hover:shadow-xl transition-all duration-700"
            >
              <img
                src={item.url}
                className="w-full h-auto transition-transform duration-1000 group-hover:scale-105"
                alt={item.alt || `${collection.name} — image ${index + 1}`}
              />
              {/* Subtle hover overlay */}
              <div className="absolute inset-0 bg-brand-green/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </motion.div>
          ))}
        </div>
      </section>

      {/* 3. THE MAGAZINE EXPERIENCE — only renders if pages exist */}
      {hasMagazine && (
        <section className="py-32 bg-brand-green overflow-hidden">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="container-luxury mb-16 text-center space-y-4"
          >
            <p className="text-brand-gold text-[10px] tracking-[0.5em] uppercase">The Final Chapter</p>
            <h2 className="heading-luxury text-3xl md:text-5xl text-brand-cream tracking-[0.2em] uppercase">
              Digital Magazine
            </h2>
            <p className="text-brand-cream/40 text-[11px] tracking-[0.2em] italic max-w-lg mx-auto leading-relaxed px-4">
              A deeper dive into the craftsmanship and story behind the {collection.name}.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex justify-center"
          >
            <MagazineFlipbook pages={magazinePages} />
          </motion.div>
        </section>
      )}

      {/* CALL TO ACTION */}
      <section className="py-32 text-center">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <p className="text-gray-400 text-[10px] tracking-[0.5em] uppercase mb-10 italic">
            Ready to wear?
          </p>
          <Link
            href="/products"
            className="inline-block bg-brand-green text-brand-cream px-16 py-5 text-[11px] tracking-[0.5em] uppercase hover:bg-brand-gold hover:text-brand-green transition-all duration-500 shadow-xl"
          >
            Shop This Collection
          </Link>
        </motion.div>
      </section>
    </div>
  )
}