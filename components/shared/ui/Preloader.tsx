// 'use client'

// import { motion, AnimatePresence, Variants } from 'framer-motion'
// import { useEffect, useState, useRef } from 'react'

// const WORD = 'Mulaan'

// // Smooth, decelerating fill — feels intentional rather than a raw linear tick
// function easeInOutCubic(t: number) {
//   return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
// }

// const letterContainer: Variants = {
//   hidden: {},
//   visible: {
//     transition: {
//       staggerChildren: 0.09,
//       delayChildren: 0.3,
//     },
//   },
// }

// const letterVariant: Variants = {
//   hidden: { y: 60, opacity: 0, rotateX: 45 },
//   visible: {
//     y: 0,
//     opacity: 1,
//     rotateX: 0,
//     transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
//   },
// }

// const cornerVariant = (delay: number): Variants => ({
//   hidden: { opacity: 0, scale: 0.5 },
//   visible: {
//     opacity: 1,
//     scale: 1,
//     transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] },
//   },
// })

// export default function Preloader() {
//   const [loading, setLoading] = useState(true)
//   const [percent, setPercent] = useState(0)
//   const startRef = useRef<number | null>(null)
//   const rafRef = useRef<number | null>(null)

//   const DURATION = 2600 // ms — total fill time before exit sequence starts

//   useEffect(() => {
//     const tick = (timestamp: number) => {
//       if (startRef.current === null) startRef.current = timestamp
//       const elapsed = timestamp - startRef.current
//       const t = Math.min(elapsed / DURATION, 1)
//       const eased = easeInOutCubic(t)
//       setPercent(Math.round(eased * 100))

//       if (t < 1) {
//         rafRef.current = requestAnimationFrame(tick)
//       } else {
//         setTimeout(() => setLoading(false), 900)
//       }
//     }

//     rafRef.current = requestAnimationFrame(tick)
//     return () => {
//       if (rafRef.current) cancelAnimationFrame(rafRef.current)
//     }
//   }, [])

//   return (
//     <AnimatePresence>
//       {loading && (
//         <motion.div
//           initial={{ opacity: 1 }}
//           exit={{
//             clipPath: 'inset(0 0 100% 0)', // Luxury "curtain" slide up
//             transition: { duration: 1.2, ease: [0.76, 0, 0.24, 1] },
//           }}
//           className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-brand-green overflow-hidden"
//         >
//           {/* Subtle radial vignette for depth */}
//           <div
//             className="pointer-events-none absolute inset-0"
//             style={{
//               background:
//                 'radial-gradient(circle at 50% 45%, rgba(201,184,150,0.08) 0%, transparent 55%)',
//             }}
//           />

//           {/* Corner ornaments */}
//           <motion.span
//             variants={cornerVariant(0.2)}
//             initial="hidden"
//             animate="visible"
//             className="absolute top-8 left-8 text-brand-gold/40 text-lg"
//           >
//             ✦
//           </motion.span>
//           <motion.span
//             variants={cornerVariant(0.35)}
//             initial="hidden"
//             animate="visible"
//             className="absolute top-8 right-8 text-brand-gold/40 text-lg"
//           >
//             ✦
//           </motion.span>
//           <motion.span
//             variants={cornerVariant(0.5)}
//             initial="hidden"
//             animate="visible"
//             className="absolute bottom-8 left-8 text-brand-gold/40 text-lg"
//           >
//             ✦
//           </motion.span>
//           <motion.span
//             variants={cornerVariant(0.65)}
//             initial="hidden"
//             animate="visible"
//             className="absolute bottom-8 right-8 text-brand-gold/40 text-lg"
//           >
//             ✦
//           </motion.span>

//           <div className="relative z-10 flex flex-col items-center">
//             {/* Tagline above wordmark */}
//             <motion.span
//               initial={{ opacity: 0, y: -10 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.8, delay: 0.1 }}
//               className="mb-6 text-[9px] tracking-[0.8em] uppercase text-brand-gold/50"
//             >
//               Est. 2025
//             </motion.span>

//             {/* Letter-by-letter reveal */}
//             <motion.h1
//               variants={letterContainer}
//               initial="hidden"
//               animate="visible"
//               className="flex font-blosta italic text-6xl md:text-9xl text-brand-gold select-none"
//               style={{ perspective: 400 }}
//             >
//               {WORD.split('').map((char, i) => (
//                 <motion.span
//                   key={i}
//                   variants={letterVariant}
//                   className="inline-block"
//                   style={{ transformOrigin: 'bottom center' }}
//                 >
//                   {char}
//                 </motion.span>
//               ))}
//             </motion.h1>

//             {/* Drawn-in underline */}
//             <motion.div
//               initial={{ scaleX: 0, opacity: 0 }}
//               animate={{ scaleX: 1, opacity: 1 }}
//               transition={{ duration: 1, delay: 1.15, ease: [0.76, 0, 0.24, 1] }}
//               className="mt-6 h-[1px] w-40 md:w-56 bg-gradient-to-r from-transparent via-brand-gold to-transparent"
//             />

//             {/* Progress bar + counter */}
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ delay: 1.4, duration: 0.8 }}
//               className="mt-10 flex flex-col items-center space-y-3"
//             >
//               <span className="text-brand-gold/40 text-[9px] tracking-[0.8em] uppercase">
//                 Loading Excellence
//               </span>

//               <div className="w-48 md:w-64 h-[1.5px] bg-brand-gold/10 overflow-hidden rounded-full">
//                 <motion.div
//                   className="h-full bg-brand-gold"
//                   style={{ width: `${percent}%` }}
//                   transition={{ ease: 'linear' }}
//                 />
//               </div>

//               <span className="text-brand-cream font-light text-xs tabular-nums tracking-widest">
//                 {percent.toString().padStart(3, '0')}
//               </span>
//             </motion.div>
//           </div>

//           {/* Hidden font preloader to prevent flicker on first paint */}
//           <span className="sr-only font-blosta italic">Mulaan</span>
//         </motion.div>
//       )}
//     </AnimatePresence>
//   )
// }

'use client'

import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

const WORD = 'Mulaan'

const MIN_VISIBLE_MS = 1800
const MAX_WAIT_MS = 5000
const COMPLETE_HOLD_MS = 420

const LUXURY_EASE: [number, number, number, number] = [
  0.76,
  0,
  0.24,
  1,
]

export default function Preloader() {
  const shouldReduceMotion = useReducedMotion()

  const [isVisible, setIsVisible] = useState(true)
  const [percent, setPercent] = useState(0)

  const progressRef = useRef(0)

  useEffect(() => {
    let isMounted = true
    let scrollUnlocked = false
    let loadHandler: (() => void) | undefined

    let progressTimer: number | undefined
    let completionTimer: number | undefined

    const timeoutIds = new Set<number>()
    const previousOverflow = document.body.style.overflow

    document.body.style.overflow = 'hidden'

    const unlockScroll = () => {
      if (scrollUnlocked) return

      document.body.style.overflow = previousOverflow
      scrollUnlocked = true
    }

    const wait = (duration: number) =>
      new Promise<void>((resolve) => {
        const timeoutId = window.setTimeout(() => {
          timeoutIds.delete(timeoutId)
          resolve()
        }, duration)

        timeoutIds.add(timeoutId)
      })

    const updateProgress = (value: number) => {
      if (!isMounted) return

      progressRef.current = value
      setPercent(value)
    }

    const pageReady = new Promise<void>((resolve) => {
      if (document.readyState === 'complete') {
        resolve()
        return
      }

      loadHandler = () => resolve()
      window.addEventListener('load', loadHandler, { once: true })
    })

    const fontsReady = document.fonts
      ? document.fonts.ready.then(() => undefined)
      : Promise.resolve()

    // Progress moves naturally towards 92% while assets and fonts load.
    progressTimer = window.setInterval(() => {
      const current = progressRef.current

      if (current >= 92) return

      const remaining = 92 - current
      const increment = Math.max(1, Math.ceil(remaining * 0.075))

      updateProgress(Math.min(92, current + increment))
    }, 55)

    const startPreloader = async () => {
      const actualPageReadiness = Promise.race([
        Promise.all([pageReady, fontsReady]),
        wait(MAX_WAIT_MS),
      ])

      const minimumDisplayTime = wait(
        shouldReduceMotion ? 450 : MIN_VISIBLE_MS
      )

      await Promise.all([
        actualPageReadiness,
        minimumDisplayTime,
      ])

      if (!isMounted) return

      if (progressTimer !== undefined) {
        window.clearInterval(progressTimer)
        progressTimer = undefined
      }

      const exitPreloader = () => {
        const hideTimeout = window.setTimeout(() => {
          if (!isMounted) return

          setIsVisible(false)

          // Keep scrolling locked until the curtain animation finishes.
          const unlockTimeout = window.setTimeout(
            unlockScroll,
            shouldReduceMotion ? 250 : 1100
          )

          timeoutIds.add(unlockTimeout)
        }, shouldReduceMotion ? 120 : COMPLETE_HOLD_MS)

        timeoutIds.add(hideTimeout)
      }

      if (shouldReduceMotion) {
        updateProgress(100)
        exitPreloader()
        return
      }

      // Complete the final few percent smoothly instead of jumping to 100.
      completionTimer = window.setInterval(() => {
        const nextValue = Math.min(100, progressRef.current + 2)

        updateProgress(nextValue)

        if (nextValue === 100) {
          if (completionTimer !== undefined) {
            window.clearInterval(completionTimer)
            completionTimer = undefined
          }

          exitPreloader()
        }
      }, 28)
    }

    void startPreloader()

    return () => {
      isMounted = false

      if (loadHandler) {
        window.removeEventListener('load', loadHandler)
      }

      if (progressTimer !== undefined) {
        window.clearInterval(progressTimer)
      }

      if (completionTimer !== undefined) {
        window.clearInterval(completionTimer)
      }

      timeoutIds.forEach((timeoutId) => {
        window.clearTimeout(timeoutId)
      })

      unlockScroll()
    }
  }, [shouldReduceMotion])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.section
          key="mulaan-preloader"
          role="status"
          aria-label="Mulaan is loading"
          initial={{
            opacity: 1,
            clipPath: 'inset(0% 0% 0% 0%)',
          }}
          animate={{
            opacity: 1,
            clipPath: 'inset(0% 0% 0% 0%)',
          }}
          exit={
            shouldReduceMotion
              ? {
                  opacity: 0,
                  transition: { duration: 0.2 },
                }
              : {
                  clipPath: 'inset(50% 0% 50% 0%)',
                  transition: {
                    duration: 1,
                    ease: LUXURY_EASE,
                  },
                }
          }
          className="fixed inset-0 z-[9999] overflow-hidden bg-brand-green"
          style={{ willChange: 'clip-path' }}
        >
          {/* Atmospheric lighting */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                'radial-gradient(circle at 50% 46%, rgba(212, 190, 145, 0.15) 0%, rgba(212, 190, 145, 0.04) 28%, transparent 58%)',
            }}
          />

          {/* Fine texture */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-[0.035]"
            style={{
              backgroundImage:
                'radial-gradient(rgba(255,255,255,0.9) 0.55px, transparent 0.55px)',
              backgroundSize: '4px 4px',
            }}
          />

          {/* Moving silk-light reflection */}
          {!shouldReduceMotion && (
            <motion.div
              aria-hidden="true"
              initial={{ x: '-70vw', opacity: 0 }}
              animate={{
                x: '150vw',
                opacity: [0, 0.45, 0],
              }}
              transition={{
                duration: 2.8,
                delay: 0.15,
                ease: LUXURY_EASE,
              }}
              className="pointer-events-none absolute -top-1/4 h-[150%] w-[28vw] -skew-x-12 blur-3xl"
              style={{
                background:
                  'linear-gradient(90deg, transparent, rgba(212,190,145,0.12), transparent)',
              }}
            />
          )}

          {/* Editorial frame */}
          <motion.div
            aria-hidden="true"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.15 }}
            className="pointer-events-none absolute inset-3 border border-brand-gold/10 md:inset-5"
          >
            <span className="absolute left-0 top-0 h-8 w-8 border-l border-t border-brand-gold/40" />
            <span className="absolute right-0 top-0 h-8 w-8 border-r border-t border-brand-gold/40" />
            <span className="absolute bottom-0 left-0 h-8 w-8 border-b border-l border-brand-gold/40" />
            <span className="absolute bottom-0 right-0 h-8 w-8 border-b border-r border-brand-gold/40" />
          </motion.div>

          {/* Top metadata */}
          <motion.header
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.2,
              ease: LUXURY_EASE,
            }}
            className="absolute inset-x-7 top-7 z-10 flex items-center justify-between md:inset-x-11 md:top-9"
          >
            <span className="text-[8px] uppercase tracking-[0.35em] text-brand-gold/60 md:text-[9px]">
              Mulaan / 2025
            </span>

            <span className="text-right text-[8px] uppercase tracking-[0.35em] text-brand-gold/60 md:text-[9px]">
              Independent Modestwear
            </span>
          </motion.header>

          {/* Main wordmark */}
          <div className="relative z-10 flex h-full flex-col items-center justify-center px-6">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.25,
                ease: LUXURY_EASE,
              }}
              className="mb-7 text-[8px] uppercase tracking-[0.65em] text-brand-gold/50 md:mb-10 md:text-[10px]"
            >
              A study in modest form
            </motion.p>

            <div className="relative overflow-hidden px-3 pb-5 pt-2">
              <h1
                aria-label="Mulaan"
                className="flex select-none font-blosta text-[clamp(4.8rem,15vw,13rem)] leading-[0.78] tracking-[-0.045em] text-brand-gold"
                style={{ perspective: '900px' }}
              >
                {WORD.split('').map((letter, index) => (
                  <motion.span
                    aria-hidden="true"
                    key={`${letter}-${index}`}
                    initial={
                      shouldReduceMotion
                        ? { opacity: 0 }
                        : {
                            opacity: 0,
                            y: '115%',
                            rotateZ: 4,
                            skewY: 5,
                          }
                    }
                    animate={{
                      opacity: 1,
                      y: 0,
                      rotateZ: 0,
                      skewY: 0,
                    }}
                    transition={{
                      duration: shouldReduceMotion ? 0.35 : 1,
                      delay: shouldReduceMotion
                        ? 0
                        : 0.38 + index * 0.075,
                      ease: LUXURY_EASE,
                    }}
                    className="inline-block"
                    style={{ transformOrigin: 'bottom center' }}
                  >
                    {letter}
                  </motion.span>
                ))}
              </h1>

              {/* Light sweep across the wordmark */}
              {!shouldReduceMotion && (
                <motion.div
                  aria-hidden="true"
                  initial={{ x: '-180%' }}
                  animate={{ x: '480%' }}
                  transition={{
                    duration: 1.5,
                    delay: 1.05,
                    ease: LUXURY_EASE,
                  }}
                  className="pointer-events-none absolute inset-y-0 w-16 rotate-12 bg-gradient-to-r from-transparent via-brand-cream/20 to-transparent blur-xl"
                />
              )}
            </div>

            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{
                duration: 1.1,
                delay: 1,
                ease: LUXURY_EASE,
              }}
              className="mt-3 h-px w-28 origin-center bg-gradient-to-r from-transparent via-brand-gold/70 to-transparent md:mt-5 md:w-44"
            />

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.15 }}
              className="mt-5 text-[8px] uppercase tracking-[0.55em] text-brand-cream/45 md:text-[9px]"
            >
              Quietly distinct
            </motion.p>
          </div>

          {/* Bottom progress rail */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.65,
              ease: LUXURY_EASE,
            }}
            className="absolute inset-x-7 bottom-8 z-10 md:inset-x-11 md:bottom-10"
          >
            <div className="mb-3 flex items-end justify-between">
              <span className="text-[8px] uppercase tracking-[0.4em] text-brand-gold/50 md:text-[9px]">
                {percent === 100
                  ? 'Experience ready'
                  : 'Curating your experience'}
              </span>

              <span
                aria-hidden="true"
                className="font-light tabular-nums text-brand-cream/75"
              >
                <span className="text-lg md:text-xl">
                  {percent.toString().padStart(3, '0')}
                </span>

                <span className="ml-1 text-[8px] text-brand-gold/50">
                  %
                </span>
              </span>
            </div>

            <div
              role="progressbar"
              aria-label="Website loading progress"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={percent}
              className="h-px w-full overflow-hidden bg-brand-gold/10"
            >
              <motion.div
                animate={{ scaleX: percent / 100 }}
                transition={{
                  duration: percent === 100 ? 0.35 : 0.12,
                  ease: 'linear',
                }}
                className="h-full origin-left bg-brand-gold"
              />
            </div>
          </motion.div>
        </motion.section>
      )}
    </AnimatePresence>
  )
}