'use client'

import { motion, Variants } from 'framer-motion'

const fadeIn: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#FCFAF7] text-brand-green">
      {/* SECTION 1: THE EDITORIAL HEADER */}
      <section className="pt-48 pb-24 px-6">
        <div className="container-luxury max-w-5xl text-center space-y-10">
          <motion.span 
            initial="hidden" 
            animate="visible" 
            variants={fadeIn}
            className="text-[10px] tracking-[1em] text-brand-gold uppercase font-bold block"
          >
            Behind the Silhouette
          </motion.span>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2 }}
            className="heading-luxury text-6xl md:text-9xl tracking-tighter leading-[0.9]"
          >
            A Dialogue <br /> 
            <span className="italic font-light text-brand-gold/80">of Two Minds.</span>
          </motion.h1>

          <motion.p 
            initial="hidden" 
            animate="visible" 
            variants={fadeIn}
            className="text-sm md:text-xl font-light leading-relaxed max-w-2xl mx-auto opacity-70 pt-6"
          >
            Mulaan was born from a shared childhood and a singular vision: to redefine modest luxury through the lens of modern design and technical precision.
          </motion.p>
        </div>
      </section>

      {/* SECTION 2: THE CO-FOUNDERS (REFINED LAYOUT) */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="container-luxury max-w-6xl">
          <div className="grid md:grid-cols-2 gap-24 items-start">
            {/* Founder 1: The Creative */}
            <motion.div 
              whileInView="visible" 
              initial="hidden" 
              viewport={{ once: true, margin: "-100px" }} 
              variants={fadeIn}
              className="space-y-10"
            >
              <div className="group relative aspect-[4/5] overflow-hidden bg-brand-cream-200 shadow-2xl">
                 <img 
                   src="/about/founder-1.jpg" 
                   alt="Co-founder" 
                   className="w-full h-full object-cover grayscale brightness-90 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000 ease-out" 
                 />
                 <div className="absolute inset-0 border-[20px] border-white/10 pointer-events-none" />
              </div>
              <div className="space-y-4">
                <h3 className="heading-luxury text-3xl uppercase tracking-widest text-brand-green">The Creative Pulse</h3>
                <p className="text-base leading-relaxed opacity-80 italic font-light max-w-md">
                  "We wanted to create pieces that didn't just cover, but empowered. Every stitch in a Mulaan garment is a tribute to the women who carry their heritage with modern grace."
                </p>
              </div>
            </motion.div>

            {/* Founder 2: The Strategist (Ifadha) */}
            <motion.div 
              whileInView="visible" 
              initial="hidden" 
              viewport={{ once: true, margin: "-100px" }} 
              variants={fadeIn}
              className="space-y-10 md:mt-40" // Keeps the "staggered" editorial look
            >
              <div className="group relative aspect-[4/5] overflow-hidden bg-brand-cream-200 shadow-2xl">
                 <img 
                   src="/about/founder-2.jpg" 
                   alt="Ifadha Imran" 
                   className="w-full h-full object-cover grayscale brightness-95 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000 ease-out" 
                 />
                 <div className="absolute inset-0 border-[20px] border-white/10 pointer-events-none" />
              </div>
              <div className="space-y-4">
                <h3 className="heading-luxury text-3xl uppercase tracking-widest text-brand-green">The Strategic Lens</h3>
                <p className="text-base leading-relaxed opacity-80 italic font-light max-w-md">
                  "With a background in AI and Data Science, I look at fashion as a system of patterns and precision. Mulaan is where that technical rigor meets the fluid beauty of silk."
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION 3: THE BRAND MANIFESTO (LEGIBILITY + WATERMARK) */}
      <section className="py-40 bg-brand-green text-[#f5f1e8] relative overflow-hidden">
        
        {/* The "Mulaan" Watermark - Fixed behind everything */}
        <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
          <span className="text-[25vw] font-serif italic text-white/[0.03] leading-none">
            Mulaan
          </span>
        </div>

        <div className="container-luxury relative z-10 text-center flex flex-col items-center">
          
          {/* Label */}
          <motion.div 
            initial={{ opacity: 0 }} 
            whileInView={{ opacity: 1 }} 
            viewport={{ once: true }}
            className="mb-16"
          >
            <h2 className="text-[10px] tracking-[1em] text-brand-gold uppercase font-bold border-b border-brand-gold/30 pb-4 inline-block">
              The Mulaan Manifesto
            </h2>
          </motion.div>

          {/* The Quote - Forcing high-contrast cream and gold */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2 }}
            viewport={{ once: true }}
            className="w-full max-w-5xl px-6"
          >
            <blockquote className="heading-luxury text-4xl md:text-7xl lg:text-8xl leading-[1.2] tracking-tight">
              {/* We use inline-style colors here to ensure no CSS overrides them */}
              <span className="block opacity-90" style={{ color: '#f5f1e8' }}>
                Luxury is not loud.
              </span>
              <span className="block mt-4 text-brand-gold italic font-light">
                quiet confidence
              </span>
              <span className="block mt-4 opacity-80 text-3xl md:text-5xl" style={{ color: '#f5f1e8' }}>
                of a silhouette that fits perfectly.
              </span>
            </blockquote>
          </motion.div>

          {/* Elegant Closer */}
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            viewport={{ once: true }}
            className="mt-24 flex flex-col items-center gap-8"
          >
            <div className="w-[1px] h-24 bg-gradient-to-b from-brand-gold to-transparent opacity-50" />
            <span className="text-[10px] tracking-[0.8em] uppercase text-brand-gold/80">
              Defined by Elegance • Est. 2025
            </span>
          </motion.div>
        </div>
      </section>
    </div>
  )
}