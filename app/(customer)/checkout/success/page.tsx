'use client'

import Link from 'next/link'
import { Check, MessageCircle, ArrowRight, Instagram } from 'lucide-react'

export default function CheckoutSuccessPage() {
  return (
    <div className="min-h-screen bg-[#FCFAF7] flex items-center justify-center py-24 px-4">
      <div className="max-w-2xl w-full text-center space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-1000">
        
        {/* Elegant Animated Success Icon */}
        <div className="relative mx-auto w-24 h-24 flex items-center justify-center">
          <div className="absolute inset-0 bg-brand-gold/10 rounded-full animate-ping duration-[3000ms]" />
          <div className="relative w-20 h-20 bg-brand-green rounded-full flex items-center justify-center shadow-2xl">
            <Check className="text-brand-gold w-10 h-10 stroke-[1.5px]" />
          </div>
        </div>

        <header className="space-y-4">
          <h1 className="heading-luxury text-4xl tracking-[0.3em] text-brand-green uppercase">
            Request Received
          </h1>
          <div className="w-16 h-[1px] bg-brand-gold mx-auto" />
          <p className="text-[11px] tracking-[0.2em] text-gray-400 uppercase font-light">
            Thank you for choosing Mulaan
          </p>
        </header>

        <div className="bg-white p-10 border border-brand-green/5 shadow-[0_20px_50px_rgba(20,38,34,0.03)] space-y-8">
          <p className="text-brand-green/80 text-sm leading-relaxed font-light italic">
            "Your selection has been curated. Our concierge team has been notified of your order via WhatsApp."
          </p>
          
          <div className="grid gap-6 text-left border-t border-brand-green/5 pt-8">
            <div className="flex gap-4 items-start">
              <div className="w-8 h-8 rounded-full bg-brand-cream-400 flex items-center justify-center flex-shrink-0 text-brand-green font-serif italic text-xs">1</div>
              <div>
                <h3 className="text-[10px] tracking-widest uppercase text-brand-green mb-1 font-semibold">Message Sent</h3>
                <p className="text-[10px] text-gray-400 uppercase tracking-wider leading-relaxed">Ensure you clicked 'Send' in the WhatsApp window that opened.</p>
              </div>
            </div>
            
            <div className="flex gap-4 items-start">
              <div className="w-8 h-8 rounded-full bg-brand-cream-400 flex items-center justify-center flex-shrink-0 text-brand-green font-serif italic text-xs">2</div>
              <div>
                <h3 className="text-[10px] tracking-widest uppercase text-brand-green mb-1 font-semibold">Concierge Review</h3>
                <p className="text-[10px] text-gray-400 uppercase tracking-wider leading-relaxed">We will verify stock and share payment link/details shortly.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
          <Link
            href="/products"
            className="flex items-center gap-3 px-10 py-4 bg-brand-green text-white text-[10px] tracking-[0.3em] uppercase hover:bg-brand-green/90 transition-all w-full sm:w-auto"
          >
            Continue Browsing
            <ArrowRight className="w-3 h-3" />
          </Link>
          
          <a
            href="https://instagram.com/mulaan.lk"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-10 py-4 border border-brand-green/10 text-brand-green text-[10px] tracking-[0.3em] uppercase hover:bg-white transition-all w-full sm:w-auto"
          >
            <Instagram className="w-3 h-3" />
            Follow @mulaan.lk
          </a>
        </div>
      </div>
    </div>
  )
}