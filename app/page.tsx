'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, Variants } from 'framer-motion'
import Preloader from '@/components/shared/ui/Preloader'

const fadeIn: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] } 
  }
}

export default function HomePage() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // This matches the timing of your Preloader (approx 3.5s to finish 100%)
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, 3800) 

    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      <Preloader />

      <motion.main 
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="min-h-screen bg-[#FCFAF7]"
      >
        
        {/* 1. CINEMATIC VIDEO HERO */}
        <section className="relative h-screen w-full overflow-hidden bg-[#0a1a1a]"> 
          {/* Changed bg-brand-green to a deeper, near-black forest green for cinematic depth */}
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 h-full w-full object-cover opacity-35 mix-blend-luminosity" 
            /* Reduced opacity to 25% and added luminosity blend for a silver-screen effect */
          >
            <source src="/videos/home-video.mp4" type="video/mp4" />
          </video>

          {/* Multi-layered Cinematic Overlay */}
          <div className="absolute inset-0 bg-gradient-to-tr from-black via-transparent to-black/40" />
          <div className="absolute inset-0 bg-black/20" /> 

          <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
            <motion.span 
              initial="hidden"
              animate={isLoaded ? "visible" : "hidden"}
              variants={fadeIn}
              className="mb-4 text-[10px] tracking-[1em] text-brand-gold/80 uppercase font-bold"
            >
              Mulaan Est. 2025
            </motion.span>
            
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 1.5, delay: 0.2 }}
              className="heading-luxury text-6xl md:text-7xl leading-[1.1] tracking-tighter"
            >
              <span 
                className="block text-brand-cream"
                style={{ 
                  textShadow: '0 0 40px rgba(197, 160, 89, 0.2)', /* Subtle gold glow shadow */
                  filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.4))'
                }}
              >
                By women who dare,
              </span>
              <span className="italic font-light text-brand-gold block mt-4">
                for women who define.
              </span>
            </motion.h1>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={isLoaded ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: 1, duration: 1 }}
              className="mt-16"
            >
              <Link 
                href="/collections" 
                className="group relative px-14 py-5 text-[10px] tracking-[0.6em] text-white uppercase border border-white/20 hover:text-brand-green transition-all duration-700 overflow-hidden"
              >
                {/* The text needs to be relative z-10 so it stays above the gold background */}
                <span className="relative z-10">Explore Collections</span>
                
                {/* The Gold Background */}
                <div className="absolute inset-0 bg-brand-gold transform translate-y-[101%] group-hover:translate-y-0 transition-transform duration-500 ease-in-out" />
              </Link>
            </motion.div>
          </div>
        </section>

        {/* 2. THE FOUNDER TEASER */}
        <section className="py-32 bg-[#FCFAF7]">
          <div className="container-luxury flex flex-col md:flex-row items-center gap-20">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeIn}
              className="w-full md:w-1/2 relative"
            >
              <div className="absolute -top-6 -left-6 w-32 h-32 border-t border-l border-brand-gold" />
              <div className="overflow-hidden shadow-2xl aspect-[4/5] bg-brand-green/5"> 
                <img 
                  src="/Us.png"
                  alt="The Founders" 
                  className="w-full h-full object-cover brightness-95 hover:grayscale transition-all duration-1000" 
                />
              </div>
            </motion.div>

            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              className="w-full md:w-1/2 space-y-10 px-4"
            >
              <div className="space-y-4 text-brand-green">
                <span className="text-[10px] tracking-[0.6em] text-brand-gold uppercase font-bold">
                  The Mulaan Duo
                </span>
                <h2 className="heading-luxury text-4xl md:text-6xl leading-[1.1]">
                  Crafted by Kinship, <br /> 
                  <span className="italic">Defined by Elegance.</span>
                </h2>
              </div>
              <p className="text-sm md:text-base leading-relaxed text-brand-green/80 max-w-md font-light">
                Two cousins, one vision. We invite you into the world of Mulaan—where every collection is a digital magazine of our shared journey.
              </p>
              <Link 
                href="/about" 
                className="inline-block text-[11px] tracking-[0.4em] uppercase border-b border-brand-gold pb-2 text-brand-green hover:text-brand-gold transition-all duration-500"
              >
                Discover the Story
              </Link>
            </motion.div>
          </div>
        </section>
      </motion.main>
    </>
  )
}