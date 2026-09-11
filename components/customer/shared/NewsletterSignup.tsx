'use client'

import { useState } from 'react'
import { subscribeToNewsletter } from '@/lib/actions/newsletter.actions'
import { ArrowRight, Loader2 } from 'lucide-react'

export default function NewsletterSignup() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim()) return

    setStatus('loading')
    const result = await subscribeToNewsletter(email)

    if (result.success) {
      setStatus('success')
      setMessage("You're on the list.")
      setEmail('')
    } else {
      setStatus('error')
      setMessage(result.error || 'Something went wrong')
    }
  }

  return (
    <div>
      <h4 className="text-brand-gold text-[9px] tracking-[0.6em] uppercase font-bold mb-4">
        Get On The List
      </h4>

      {status === 'success' ? (
        <p className="text-brand-cream/70 text-xs font-light">✦ {message}</p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-2">
          <div className="flex items-center border-b border-brand-cream/20 focus-within:border-brand-gold transition-colors">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="EMAIL ADDRESS"
              disabled={status === 'loading'}
              className="flex-1 bg-transparent text-brand-cream/80 placeholder:text-brand-cream/30 text-[11px] tracking-[0.15em] uppercase py-2 outline-none font-light"
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              className="p-2 text-brand-gold hover:text-brand-cream transition-colors disabled:opacity-50"
              aria-label="Subscribe"
            >
              {status === 'loading' ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <ArrowRight className="w-4 h-4" />
              )}
            </button>
          </div>
          {status === 'error' && (
            <p className="text-red-300 text-[10px] tracking-wide">{message}</p>
          )}
        </form>
      )}
    </div>
  )
}