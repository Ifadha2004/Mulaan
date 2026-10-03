'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import {
  AnimatePresence,
  motion,
  type Variants,
} from 'framer-motion'
import {
  ArrowLeft,
  ArrowRight,
  Expand,
  X,
} from 'lucide-react'
import MagazineFlipbook from '@/components/customer/collections/MagazineFlipbook'

interface CollectionMedia {
  url: string
  type?: 'image' | 'video'
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

const LUXURY_EASE: [number, number, number, number] = [
  0.22,
  1,
  0.36,
  1,
]

const fadeInUp: Variants = {
  hidden: {
    opacity: 0,
    y: 50,
  },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: Math.min(index * 0.08, 0.4),
      duration: 0.9,
      ease: LUXURY_EASE,
    },
  }),
}

const editorialLayouts = [
  'md:col-span-7',
  'md:col-span-5 md:mt-28',
  'md:col-span-5',
  'md:col-span-7 md:mt-20',
  'md:col-span-6',
  'md:col-span-6 md:mt-24',
]

function getEditorialLayout(index: number) {
  return editorialLayouts[index % editorialLayouts.length]
}

export default function CollectionDetailClient({
  collection,
}: CollectionDetailClientProps) {
  const media = collection.media || []
  const magazineMedia = collection.magazinePages || []

  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  const hasMagazine = magazineMedia.length > 0

  const magazinePages = magazineMedia
    .filter((page) => !page.type || page.type === 'image')
    .map((page) => page.url)

  const activeMedia =
    activeIndex !== null ? media[activeIndex] : null

  const closeViewer = () => setActiveIndex(null)

  const showPrevious = () => {
    if (activeIndex === null || media.length === 0) return

    setActiveIndex(
      activeIndex === 0 ? media.length - 1 : activeIndex - 1
    )
  }

  const showNext = () => {
    if (activeIndex === null || media.length === 0) return

    setActiveIndex(
      activeIndex === media.length - 1 ? 0 : activeIndex + 1
    )
  }

  useEffect(() => {
    if (activeIndex === null) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeViewer()
      if (event.key === 'ArrowLeft') showPrevious()
      if (event.key === 'ArrowRight') showNext()
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [activeIndex])

  return (
    <main className="min-h-screen overflow-hidden bg-[#FCFAF7]">
      {/* Opening editorial */}
      <header className="px-6 pb-20 pt-36 text-center md:pb-28 md:pt-44">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: LUXURY_EASE }}
          className="mx-auto max-w-5xl"
        >
          <p className="mb-7 text-[9px] uppercase tracking-[0.65em] text-brand-gold">
            Collection Edition
          </p>

          <h1 className="heading-luxury text-4xl uppercase tracking-[0.2em] text-brand-green md:text-6xl lg:text-8xl">
            {collection.name}
          </h1>

          <div className="mx-auto my-8 h-px w-14 bg-brand-gold" />

          <p className="text-[9px] uppercase tracking-[0.4em] text-gray-400">
            A Mulaan visual story
          </p>
        </motion.div>
      </header>

      {/* Magazine cover */}
      <motion.section
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 1.2,
          delay: 0.15,
          ease: LUXURY_EASE,
        }}
        className="container-luxury"
      >
        <div className="relative min-h-[70vh] overflow-hidden bg-gray-100 md:min-h-[85vh]">
          <img
            src={collection.coverImage}
            alt={`${collection.name} collection cover`}
            className="absolute inset-0 h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-brand-green/65 via-transparent to-black/10" />

          <div className="absolute inset-x-6 bottom-7 flex items-end justify-between border-t border-white/30 pt-5 md:inset-x-10 md:bottom-10">
            <div>
              <p className="mb-2 text-[8px] uppercase tracking-[0.5em] text-white/60">
                Mulaan Archive
              </p>

              <p className="heading-luxury text-xl uppercase tracking-[0.2em] text-white md:text-3xl">
                {collection.name}
              </p>
            </div>

            <p className="hidden text-[9px] uppercase tracking-[0.4em] text-white/65 sm:block">
              Cover Story
            </p>
          </div>
        </div>
      </motion.section>

      {/* Collection story */}
      {collection.description && (
        <section className="container-luxury py-24 md:py-36">
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.9, ease: LUXURY_EASE }}
            className="mx-auto grid max-w-5xl gap-10 md:grid-cols-[180px_1fr] md:gap-20"
          >
            <div>
              <p className="text-[9px] uppercase tracking-[0.5em] text-brand-gold">
                The Story
              </p>

              <div className="mt-6 h-px w-12 bg-brand-gold/50" />
            </div>

            <p className="heading-luxury text-xl font-light italic leading-[1.9] text-brand-green/80 md:text-2xl">
              {collection.description}
            </p>
          </motion.div>
        </section>
      )}

      {/* Editorial gallery */}
      {media.length > 0 && (
        <section className="container-luxury pb-28 md:pb-40">
          <div className="mb-16 flex items-end justify-between border-b border-brand-green/10 pb-6">
            <div>
              <p className="mb-3 text-[8px] uppercase tracking-[0.5em] text-brand-gold">
                Visual Journal
              </p>

              <h2 className="heading-luxury text-2xl uppercase tracking-[0.2em] text-brand-green md:text-4xl">
                The Lookbook
              </h2>
            </div>

            <p className="text-[9px] uppercase tracking-[0.35em] text-gray-400">
              {String(media.length).padStart(2, '0')} Frames
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-12 md:gap-x-8 md:gap-y-20">
            {media.map((item, index) => {
              const isVideo = item.type === 'video'

              return (
                <motion.article
                  key={`${item.url}-${index}`}
                  custom={index}
                  variants={fadeInUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-80px' }}
                  className={getEditorialLayout(index)}
                >
                  <button
                    type="button"
                    onClick={() => setActiveIndex(index)}
                    className="group block w-full text-left"
                    aria-label={`Open ${
                      item.alt || `${collection.name} frame ${index + 1}`
                    }`}
                  >
                    <div className="relative overflow-hidden bg-[#ECE8E1]">
                      {isVideo ? (
                        <video
                          src={item.url}
                          muted
                          playsInline
                          loop
                          autoPlay
                          className="h-auto w-full object-cover transition-transform duration-[1400ms] group-hover:scale-[1.025]"
                        />
                      ) : (
                        <img
                          src={item.url}
                          alt={
                            item.alt ||
                            `${collection.name} — frame ${index + 1}`
                          }
                          loading="lazy"
                          className="h-auto w-full object-cover transition-transform duration-[1400ms] group-hover:scale-[1.025]"
                        />
                      )}

                      <div className="absolute inset-0 bg-brand-green/0 transition-colors duration-700 group-hover:bg-brand-green/10" />

                      <span className="absolute right-5 top-5 flex h-10 w-10 translate-y-2 items-center justify-center rounded-full border border-white/30 bg-black/10 text-white opacity-0 backdrop-blur-md transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                        <Expand className="h-4 w-4" />
                      </span>
                    </div>

                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-[8px] uppercase tracking-[0.35em] text-gray-400">
                        Frame {String(index + 1).padStart(2, '0')}
                      </span>

                      {item.alt && (
                        <span className="max-w-[60%] truncate text-[8px] uppercase tracking-[0.3em] text-brand-green/60">
                          {item.alt}
                        </span>
                      )}
                    </div>
                  </button>
                </motion.article>
              )
            })}
          </div>
        </section>
      )}

      {/* Digital page-flip magazine */}
      {hasMagazine && magazinePages.length > 0 && (
        <section className="overflow-hidden bg-brand-green py-28 md:py-36">
          <motion.header
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: LUXURY_EASE }}
            className="container-luxury mb-16 text-center"
          >
            <p className="mb-5 text-[9px] uppercase tracking-[0.6em] text-brand-gold">
              The Complete Edition
            </p>

            <h2 className="heading-luxury text-3xl uppercase tracking-[0.18em] text-brand-cream md:text-5xl lg:text-6xl">
              Digital Magazine
            </h2>

            <div className="mx-auto my-7 h-px w-14 bg-brand-gold/60" />

            <p className="mx-auto max-w-lg text-[10px] font-light uppercase leading-6 tracking-[0.25em] text-brand-cream/45">
              Turn the pages and discover the complete story behind{' '}
              {collection.name}
            </p>
          </motion.header>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{
              duration: 1,
              delay: 0.15,
              ease: LUXURY_EASE,
            }}
          >
            <MagazineFlipbook pages={magazinePages} />
          </motion.div>
        </section>
      )}

      {/* Shop CTA */}
      <section className="px-6 py-28 text-center md:py-36">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: LUXURY_EASE }}
        >
          <p className="mb-6 text-[9px] uppercase tracking-[0.55em] text-brand-gold">
            From story to wardrobe
          </p>

          <h2 className="heading-luxury mb-10 text-3xl uppercase tracking-[0.16em] text-brand-green md:text-5xl">
            Discover the pieces
          </h2>

          <Link
            href="/products"
            className="group inline-flex items-center gap-5 bg-brand-green px-10 py-5 text-[9px] uppercase tracking-[0.45em] text-brand-cream transition-colors duration-500 hover:bg-brand-gold hover:text-brand-green md:px-14"
          >
            Shop the collection

            <ArrowRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </section>

      {/* Fullscreen gallery viewer */}
      <AnimatePresence>
        {activeMedia && activeIndex !== null && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={`${collection.name} gallery viewer`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-[999] flex items-center justify-center bg-[#071F1C]/95 p-4 backdrop-blur-xl md:p-10"
          >
            <button
              type="button"
              onClick={closeViewer}
              aria-label="Close gallery"
              className="absolute right-5 top-5 z-20 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:border-brand-gold hover:text-brand-gold md:right-8 md:top-8"
            >
              <X className="h-5 w-5" />
            </button>

            {media.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={showPrevious}
                  aria-label="Previous image"
                  className="absolute left-3 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/10 text-white backdrop-blur-md transition-colors hover:border-brand-gold hover:text-brand-gold md:left-8"
                >
                  <ArrowLeft className="h-5 w-5" />
                </button>

                <button
                  type="button"
                  onClick={showNext}
                  aria-label="Next image"
                  className="absolute right-3 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/10 text-white backdrop-blur-md transition-colors hover:border-brand-gold hover:text-brand-gold md:right-8"
                >
                  <ArrowRight className="h-5 w-5" />
                </button>
              </>
            )}

            <motion.div
              key={activeMedia.url}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: LUXURY_EASE }}
              className="flex h-full w-full flex-col items-center justify-center"
            >
              {activeMedia.type === 'video' ? (
                <video
                  src={activeMedia.url}
                  controls
                  autoPlay
                  playsInline
                  className="max-h-[82vh] max-w-[90vw] object-contain"
                />
              ) : (
                <img
                  src={activeMedia.url}
                  alt={
                    activeMedia.alt ||
                    `${collection.name} — frame ${activeIndex + 1}`
                  }
                  className="max-h-[82vh] max-w-[90vw] object-contain"
                />
              )}

              <div className="mt-5 flex items-center gap-5 text-[8px] uppercase tracking-[0.4em] text-white/50">
                <span>
                  {String(activeIndex + 1).padStart(2, '0')} /{' '}
                  {String(media.length).padStart(2, '0')}
                </span>

                {activeMedia.alt && (
                  <>
                    <span className="h-px w-8 bg-brand-gold/50" />
                    <span>{activeMedia.alt}</span>
                  </>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}