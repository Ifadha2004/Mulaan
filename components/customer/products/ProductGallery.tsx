'use client'

import { useState } from 'react'
import { ChevronLeft, ChevronRight, X, ZoomIn } from 'lucide-react'
import { IProductImage } from '@/lib/db/models'

interface ProductGalleryProps {
  images: IProductImage[]
  productName: string
}

export default function ProductGallery({ images, productName }: ProductGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0)
  const [isZoomed, setIsZoomed] = useState(false)

  const handlePrevious = () => {
    setSelectedImage((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setSelectedImage((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }

  if (!images || images.length === 0) {
    return (
      <div className="aspect-[3/4] bg-brand-cream-100 flex items-center justify-center">
        <span className="text-brand-green/40 font-light tracking-widest">No images available</span>
      </div>
    )
  }

  return (
    <div className="space-y-6 max-w-[550px] mx-auto w-full">
      {/* Main Image - Portrait 3:4 Ratio */}
      <div className="relative aspect-[3/4] bg-[#F9F9F7] overflow-hidden group">
        <img
          src={images[selectedImage].url}
          alt={images[selectedImage].alt || productName}
          className="w-full h-full object-cover cursor-zoom-in transition-transform duration-1000 ease-out group-hover:scale-105"
          onClick={() => setIsZoomed(true)}
        />

        {/* Minimalist Floating Actions */}
        <div className="absolute top-6 right-6 flex flex-col gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <button
            onClick={() => setIsZoomed(true)}
            className="p-3 bg-white/80 backdrop-blur-md rounded-full shadow-sm hover:bg-white transition-colors"
          >
            <ZoomIn className="w-4 h-4 text-brand-green" />
          </button>
        </div>

        {/* Ultra-thin Navigation Arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={handlePrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-2 text-brand-green/50 hover:text-brand-green transition-colors"
            >
              <ChevronLeft className="w-8 h-8 stroke-[1px]" />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-2 text-brand-green/50 hover:text-brand-green transition-colors"
            >
              <ChevronRight className="w-8 h-8 stroke-[1px]" />
            </button>
          </>
        )}
      </div>

      {/* Thumbnail Strip - Refined and portrait */}
      {images.length > 1 && (
        <div className="flex justify-center gap-4 px-2">
          {images.map((image, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedImage(idx)}
              className={`relative w-16 aspect-[3/4] overflow-hidden transition-all duration-500 ${
                idx === selectedImage
                  ? 'ring-1 ring-brand-gold ring-offset-4 opacity-100'
                  : 'opacity-40 hover:opacity-100'
              }`}
            >
              <img
                src={image.url}
                alt={`${productName} ${idx + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}

      {/* Fullscreen Zoom Modal */}
      {isZoomed && (
        <div className="fixed inset-0 z-[100] bg-white flex items-center justify-center p-4 lg:p-12 animate-in fade-in duration-300">
          <button
            onClick={() => setIsZoomed(false)}
            className="absolute top-8 right-8 p-2 text-brand-green hover:rotate-90 transition-transform duration-300"
          >
            <X className="w-8 h-8 stroke-[1px]" />
          </button>
          <img
            src={images[selectedImage].url}
            alt={productName}
            className="max-w-full max-h-full object-contain"
          />
        </div>
      )}
    </div>
  )
}