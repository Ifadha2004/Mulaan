// 'use client'

// import React, { useRef } from 'react'
// import HTMLFlipBook from 'react-pageflip'
// import { ChevronLeft, ChevronRight } from 'lucide-react'

// interface Props {
//   pages: string[]
// }

// const Page = React.forwardRef<HTMLDivElement, { image: string; number: number }>((props, ref) => {
//   return (
//     <div className="bg-white shadow-2xl overflow-hidden" ref={ref}>
//       <img 
//         src={props.image} 
//         alt={`Page ${props.number}`} 
//         className="w-full h-full object-cover"
//         loading="lazy"
//       />
//     </div>
//   )
// })
// Page.displayName = 'Page'

// export default function MagazineFlipbook({ pages }: Props) {
//   const bookRef = useRef<any>(null)

//   return (
//     <div className="flex flex-col items-center py-0 px-4">
//       {/* Container fits the "dark boutique" vibe of the brand green section */}
//       <div className="relative group w-full max-w-[90vw] md:max-w-[1000px] aspect-[1.4/1] flex justify-center items-center bg-black/20 rounded-lg p-2 md:p-6 shadow-inner">
        
//         <button 
//           onClick={() => bookRef.current.pageFlip().flipPrev()}
//           className="absolute left-2 md:left-4 z-20 p-3 rounded-full bg-white/5 hover:bg-white/20 text-brand-gold border border-brand-gold/20 backdrop-blur-md transition-all opacity-0 group-hover:opacity-100 hidden md:block"
//         >
//           <ChevronLeft className="w-5 h-5" />
//         </button>

//         <div className="shadow-2xl shadow-black/60">
//           <HTMLFlipBook
//             width={450}
//             height={630}
//             size="stretch"
//             minWidth={315}
//             maxWidth={1000}
//             minHeight={400}
//             maxHeight={1400}
//             maxShadowOpacity={0.5}
//             showCover={true}
//             mobileScrollSupport={true}
//             className="mulaan-magazine"
//             ref={bookRef}
//             style={{ margin: '0 auto' }}
//             startPage={0}
//             drawShadow={true}
//             flippingTime={1000}
//             usePortrait={false}
//             startZIndex={0}
//             autoSize={true}
//             clickEventForward={true}
//             useMouseEvents={true}
//             showPageCorners={true}

//             swipeDistance={30}
//             disableFlipByClick={false}
//           >
//             {pages.map((path, index) => (
//               <Page key={index} image={path} number={index + 1} />
//             ))}
//           </HTMLFlipBook>
//         </div>

//         <button 
//           onClick={() => bookRef.current.pageFlip().flipNext()}
//           className="absolute right-2 md:right-4 z-20 p-3 rounded-full bg-white/5 hover:bg-white/20 text-brand-gold border border-brand-gold/20 backdrop-blur-md transition-all opacity-0 group-hover:opacity-100 hidden md:block"
//         >
//           <ChevronRight className="w-5 h-5" />
//         </button>
//       </div>

//       <div className="mt-8 text-center">
//         <p className="text-[9px] tracking-[0.4em] text-brand-gold/60 uppercase italic">
//           Click or drag corners to explore
//         </p>
//       </div>
//     </div>
//   )
// }

'use client'

import React, { useRef } from 'react'
import HTMLFlipBook from 'react-pageflip'
import {
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'

interface MagazineFlipbookProps {
  pages: string[]
}

interface MagazinePageProps {
  image: string
  number: number
}

const Page = React.forwardRef<
  HTMLDivElement,
  MagazinePageProps
>(({ image, number }, ref) => {
  return (
    <div
      ref={ref}
      className="overflow-hidden bg-white shadow-2xl"
    >
      <img
        src={image}
        alt={`Magazine page ${number}`}
        className="h-full w-full object-cover"
        loading={number === 1 ? 'eager' : 'lazy'}
      />
    </div>
  )
})

Page.displayName = 'MagazinePage'

export default function MagazineFlipbook({
  pages,
}: MagazineFlipbookProps) {
  const bookRef = useRef<any>(null)

  const goToPreviousPage = () => {
    bookRef.current?.pageFlip()?.flipPrev()
  }

  const goToNextPage = () => {
    bookRef.current?.pageFlip()?.flipNext()
  }

  if (pages.length === 0) {
    return null
  }

  return (
    <div className="flex w-full flex-col items-center overflow-hidden px-4 py-0">
      <div
        className="
          group relative flex w-full
          max-w-[calc(100vw-2rem)]
          items-center justify-center
          overflow-hidden rounded-lg
          bg-black/20 p-2 shadow-inner
          aspect-[3/4]
          md:aspect-[1.4/1]
          md:max-w-[1000px]
          md:overflow-visible
          md:p-6
        "
      >
        {/* Desktop previous-page control */}
        <button
          type="button"
          onClick={goToPreviousPage}
          aria-label="View previous magazine page"
          className="
            absolute left-4 z-20 hidden rounded-full
            border border-brand-gold/20 bg-white/5
            p-3 text-brand-gold opacity-0
            backdrop-blur-md transition-all
            hover:bg-white/20
            group-hover:opacity-100
            md:block
          "
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        <div className="flex h-full w-full items-center justify-center md:h-auto">
          <div className="flex h-full w-full items-center justify-center shadow-2xl shadow-black/60 md:h-auto">
            <HTMLFlipBook
              key="responsive-mulaan-magazine"
              width={450}
              height={630}
              size="stretch"
              minWidth={260}
              maxWidth={500}
              minHeight={364}
              maxHeight={700}
              maxShadowOpacity={0.5}
              showCover
              mobileScrollSupport
              className="mulaan-magazine"
              ref={bookRef}
              style={{
                margin: '0 auto',
              }}
              startPage={0}
              drawShadow
              flippingTime={1000}
              usePortrait
              startZIndex={0}
              autoSize
              clickEventForward
              useMouseEvents
              showPageCorners
              swipeDistance={30}
              disableFlipByClick={false}
            >
              {pages.map((path, index) => (
                <Page
                  key={`${path}-${index}`}
                  image={path}
                  number={index + 1}
                />
              ))}
            </HTMLFlipBook>
          </div>
        </div>

        {/* Desktop next-page control */}
        <button
          type="button"
          onClick={goToNextPage}
          aria-label="View next magazine page"
          className="
            absolute right-4 z-20 hidden rounded-full
            border border-brand-gold/20 bg-white/5
            p-3 text-brand-gold opacity-0
            backdrop-blur-md transition-all
            hover:bg-white/20
            group-hover:opacity-100
            md:block
          "
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      <div className="mt-6 text-center md:mt-8">
        <p className="px-4 text-[8px] uppercase italic tracking-[0.28em] text-brand-gold/60 sm:text-[9px] sm:tracking-[0.4em]">
          Swipe or tap the corners to explore
        </p>
      </div>
    </div>
  )
}