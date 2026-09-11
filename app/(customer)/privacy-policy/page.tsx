'use client'

import { useRouter } from 'next/navigation'
import { X } from 'lucide-react'

export default function PrivacyPolicyPage() {
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
            Privacy Policy
          </h1>

          <div className="mx-auto h-px w-16 bg-brand-gold" />

          <p className="text-xs uppercase tracking-[0.2em] text-gray-400">
            Last updated: September 2026
          </p>
        </header>

        <div className="space-y-12 leading-relaxed text-gray-600">
          <section className="space-y-4">
            <h2 className="heading-luxury text-sm font-semibold uppercase tracking-[0.15em] text-brand-green">
              Information We Collect
            </h2>

            <p>
              We collect information you provide when placing an order or
              contacting us, including your name, email address, phone
              number, and delivery address.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="heading-luxury text-sm font-semibold uppercase tracking-[0.15em] text-brand-green">
              How We Use Your Information
            </h2>

            <p>
              We use your information to process orders, arrange delivery,
              and occasionally send you updates about new collections. We
              never sell your data to third parties.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="heading-luxury text-sm font-semibold uppercase tracking-[0.15em] text-brand-green">
              Contact
            </h2>

            <p>
              For any privacy concerns, email us at{' '}
              <a
                href="mailto:mulaanclothing@gmail.com"
                className="text-brand-gold transition-colors hover:underline"
              >
                mulaanclothing@gmail.com
              </a>
              .
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}