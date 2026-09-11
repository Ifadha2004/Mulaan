'use client'

import { useRouter } from 'next/navigation'
import { X } from 'lucide-react'

export default function TermsOfServicePage() {
  const router = useRouter()

  return (
    <div className="relative min-h-screen bg-[#FCFAF7] px-4 py-24">
      <button
        type="button"
        onClick={() => router.back()}
        aria-label="Go back to previous page"
        className="absolute right-6 top-8 flex h-11 w-11 items-center justify-center rounded-full border border-brand-green/20 text-brand-green transition-all duration-300 hover:border-brand-gold hover:bg-brand-green hover:text-brand-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold focus-visible:ring-offset-2 md:right-12 md:top-10"
      >
        <X aria-hidden="true" className="h-5 w-5" />
      </button>

      <div className="container-luxury max-w-3xl">
        <header className="mb-16 space-y-4 text-center">
          <h1 className="heading-luxury text-3xl uppercase tracking-[0.2em] text-brand-green md:text-4xl">
            Terms of Service
          </h1>

          <div className="mx-auto h-px w-16 bg-brand-gold" />

          <p className="text-xs uppercase tracking-[0.2em] text-gray-400">
            Last updated: September 2026
          </p>
        </header>

        <div className="space-y-12 leading-relaxed text-gray-600">
          <p>
            By using the Mulaan website and placing an order, you agree
            to the following:
          </p>

          <section className="space-y-4">
            <h2 className="heading-luxury text-sm font-semibold uppercase tracking-[0.15em] text-brand-green">
              Orders
            </h2>

            <p>
              All orders are manually confirmed via WhatsApp before
              payment is processed. We will only confirm your order once
              availability is verified. If your requested piece is
              unavailable, we will let you know immediately.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="heading-luxury text-sm font-semibold uppercase tracking-[0.15em] text-brand-green">
              Pricing
            </h2>

            <p>
              All prices are listed in Sri Lankan Rupees. Prices may be
              updated from time to time.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="heading-luxury text-sm font-semibold uppercase tracking-[0.15em] text-brand-green">
              Intellectual Property
            </h2>

            <p>
              All content on this website, including images, text and
              designs, belongs to Mulaan and may not be reproduced
              without permission.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="heading-luxury text-sm font-semibold uppercase tracking-[0.15em] text-brand-green">
              Contact
            </h2>

            <p>
              For any queries, reach us on WhatsApp at{' '}
              <a
                href="https://wa.me/94760100965"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-gold transition-colors hover:underline"
              >
                +94 76 010 0965
              </a>
              .
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}