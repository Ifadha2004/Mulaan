'use client'

import { motion, AnimatePresence, Variants } from 'framer-motion'
import { useEffect, useState, useRef } from 'react'

const WORD = 'Mulaan'

// Smooth, decelerating fill — feels intentional rather than a raw linear tick
function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
}

const letterContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.09,
      delayChildren: 0.3,
    },
  },
}

const letterVariant: Variants = {
  hidden: { y: 60, opacity: 0, rotateX: 45 },
  visible: {
    y: 0,
    opacity: 1,
    rotateX: 0,
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
  },
}

const cornerVariant = (delay: number): Variants => ({
  hidden: { opacity: 0, scale: 0.5 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] },
  },
})

export default function Preloader() {
  const [loading, setLoading] = useState(true)
  const [percent, setPercent] = useState(0)
  const startRef = useRef<number | null>(null)
  const rafRef = useRef<number | null>(null)

  const DURATION = 2600 // ms — total fill time before exit sequence starts

  useEffect(() => {
    const tick = (timestamp: number) => {
      if (startRef.current === null) startRef.current = timestamp
      const elapsed = timestamp - startRef.current
      const t = Math.min(elapsed / DURATION, 1)
      const eased = easeInOutCubic(t)
      setPercent(Math.round(eased * 100))

      if (t < 1) {
        rafRef.current = requestAnimationFrame(tick)
      } else {
        setTimeout(() => setLoading(false), 900)
      }
    }

    rafRef.current = requestAnimationFrame(tick)
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{
            clipPath: 'inset(0 0 100% 0)', // Luxury "curtain" slide up
            transition: { duration: 1.2, ease: [0.76, 0, 0.24, 1] },
          }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-brand-green overflow-hidden"
        >
          {/* Subtle radial vignette for depth */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                'radial-gradient(circle at 50% 45%, rgba(201,184,150,0.08) 0%, transparent 55%)',
            }}
          />

          {/* Corner ornaments */}
          <motion.span
            variants={cornerVariant(0.2)}
            initial="hidden"
            animate="visible"
            className="absolute top-8 left-8 text-brand-gold/40 text-lg"
          >
            ✦
          </motion.span>
          <motion.span
            variants={cornerVariant(0.35)}
            initial="hidden"
            animate="visible"
            className="absolute top-8 right-8 text-brand-gold/40 text-lg"
          >
            ✦
          </motion.span>
          <motion.span
            variants={cornerVariant(0.5)}
            initial="hidden"
            animate="visible"
            className="absolute bottom-8 left-8 text-brand-gold/40 text-lg"
          >
            ✦
          </motion.span>
          <motion.span
            variants={cornerVariant(0.65)}
            initial="hidden"
            animate="visible"
            className="absolute bottom-8 right-8 text-brand-gold/40 text-lg"
          >
            ✦
          </motion.span>

          <div className="relative z-10 flex flex-col items-center">
            {/* Tagline above wordmark */}
            <motion.span
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="mb-6 text-[9px] tracking-[0.8em] uppercase text-brand-gold/50"
            >
              Est. 2025
            </motion.span>

            {/* Letter-by-letter reveal */}
            <motion.h1
              variants={letterContainer}
              initial="hidden"
              animate="visible"
              className="flex font-blosta italic text-6xl md:text-9xl text-brand-gold select-none"
              style={{ perspective: 400 }}
            >
              {WORD.split('').map((char, i) => (
                <motion.span
                  key={i}
                  variants={letterVariant}
                  className="inline-block"
                  style={{ transformOrigin: 'bottom center' }}
                >
                  {char}
                </motion.span>
              ))}
            </motion.h1>

            {/* Drawn-in underline */}
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 1, delay: 1.15, ease: [0.76, 0, 0.24, 1] }}
              className="mt-6 h-[1px] w-40 md:w-56 bg-gradient-to-r from-transparent via-brand-gold to-transparent"
            />

            {/* Progress bar + counter */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.4, duration: 0.8 }}
              className="mt-10 flex flex-col items-center space-y-3"
            >
              <span className="text-brand-gold/40 text-[9px] tracking-[0.8em] uppercase">
                Loading Excellence
              </span>

              <div className="w-48 md:w-64 h-[1.5px] bg-brand-gold/10 overflow-hidden rounded-full">
                <motion.div
                  className="h-full bg-brand-gold"
                  style={{ width: `${percent}%` }}
                  transition={{ ease: 'linear' }}
                />
              </div>

              <span className="text-brand-cream font-light text-xs tabular-nums tracking-widest">
                {percent.toString().padStart(3, '0')}
              </span>
            </motion.div>
          </div>

          {/* Hidden font preloader to prevent flicker on first paint */}
          <span className="sr-only font-blosta italic">Mulaan</span>
        </motion.div>
      )}
    </AnimatePresence>
  )
}