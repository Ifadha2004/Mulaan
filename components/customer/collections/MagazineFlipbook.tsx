'use client'

import React, { useRef } from 'react'
import HTMLFlipBook from 'react-pageflip'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface Props {
  pages: string[]
}

const Page = React.forwardRef<HTMLDivElement, { image: string; number: number }>((props, ref) => {
  return (
    <div className="bg-white shadow-2xl overflow-hidden" ref={ref}>
      <img 
        src={props.image} 
        alt={`Page ${props.number}`} 
        className="w-full h-full object-cover"
        loading="lazy"
      />
    </div>
  )
})
Page.displayName = 'Page'

export default function MagazineFlipbook({ pages }: Props) {
  const bookRef = useRef<any>(null)

  return (
    <div className="flex flex-col items-center py-0 px-4">
      {/* Container fits the "dark boutique" vibe of the brand green section */}
      <div className="relative group w-full max-w-[90vw] md:max-w-[1000px] aspect-[1.4/1] flex justify-center items-center bg-black/20 rounded-lg p-2 md:p-6 shadow-inner">
        
        <button 
          onClick={() => bookRef.current.pageFlip().flipPrev()}
          className="absolute left-2 md:left-4 z-20 p-3 rounded-full bg-white/5 hover:bg-white/20 text-brand-gold border border-brand-gold/20 backdrop-blur-md transition-all opacity-0 group-hover:opacity-100 hidden md:block"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <div className="shadow-2xl shadow-black/60">
          <HTMLFlipBook
            width={450}
            height={630}
            size="stretch"
            minWidth={315}
            maxWidth={1000}
            minHeight={400}
            maxHeight={1400}
            maxShadowOpacity={0.5}
            showCover={true}
            mobileScrollSupport={true}
            className="mulaan-magazine"
            ref={bookRef}
            style={{ margin: '0 auto' }}
            startPage={0}
            drawShadow={true}
            flippingTime={1000}
            usePortrait={false}
            startZIndex={0}
            autoSize={true}
            clickEventForward={true}
            useMouseEvents={true}
            showPageCorners={true}

            swipeDistance={30}
            disableFlipByClick={false}
          >
            {pages.map((path, index) => (
              <Page key={index} image={path} number={index + 1} />
            ))}
          </HTMLFlipBook>
        </div>

        <button 
          onClick={() => bookRef.current.pageFlip().flipNext()}
          className="absolute right-2 md:right-4 z-20 p-3 rounded-full bg-white/5 hover:bg-white/20 text-brand-gold border border-brand-gold/20 backdrop-blur-md transition-all opacity-0 group-hover:opacity-100 hidden md:block"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      <div className="mt-8 text-center">
        <p className="text-[9px] tracking-[0.4em] text-brand-gold/60 uppercase italic">
          Click or drag corners to explore
        </p>
      </div>
    </div>
  )
}