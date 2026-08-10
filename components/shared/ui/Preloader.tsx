'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'

export default function Preloader() {
  const [loading, setLoading] = useState(true)
  const [percent, setPercent] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setPercent((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(() => setLoading(false), 1000) 
          return 100
        }
        return prev + 1
      })
    }, 35) // Smooth, steady crawl
    return () => clearInterval(interval)
  }, [])

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ 
            clipPath: 'inset(0 0 100% 0)', // Luxury "curtain" slide up
            transition: { duration: 1.2, ease: [0.76, 0, 0.24, 1] } 
          }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-brand-green"
        >
          <div className="relative flex flex-col items-center">
            
            {/* THE REVEAL TEXT */}
            <div className="relative overflow-hidden mb-4">
              {/* Background "Ghost" Layer */}
              <h1 className="text-5xl md:text-8xl tracking-tighter font-serif italic opacity-10 text-brand-gold select-none">
                Mulaan
              </h1>
              
              {/* Filling Foreground Layer */}
              <motion.h1
                style={{ 
                    clipPath: `inset(${(100 - percent)}% 0 0 0)`, // Fills from bottom to top
                    // If you want it to fill left-to-right, use: `inset(0 ${100 - percent}% 0 0)`
                }}
                className="absolute inset-0 text-5xl md:text-8xl tracking-tighter font-serif italic text-brand-gold select-none"
              >
                Mulaan
              </motion.h1>
            </div>

            {/* Elegant Minimalist Counter */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center space-y-2"
            >
              <span className="text-brand-gold/40 text-[9px] tracking-[0.8em] uppercase ml-[0.8em]">
                Loading Excellence
              </span>
              <span className="text-brand-cream font-light text-xs tabular-nums">
                {percent.toString().padStart(3, '0')}
              </span>
            </motion.div>
          </div>

          {/* Hidden "Blosta" Font Preloader to prevent flicker */}
          <span className="sr-only font-serif italic">Mulaan</span>
        </motion.div>
      )}
    </AnimatePresence>
  )
}