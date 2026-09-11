import { Resend } from 'resend'

if (!process.env.RESEND_API_KEY) {
  console.error('❌ Missing RESEND_API_KEY in .env.local')
}

export const resend = new Resend(process.env.RESEND_API_KEY)

// Falls back to Resend's shared test domain until you verify your own
// (mulaan.lk) domain under Resend → Domains. Once verified, set
// EMAIL_FROM in .env.local to something like: Mulaan <hello@mulaan.lk>
export const EMAIL_FROM = process.env.EMAIL_FROM || 'Mulaan <onboarding@resend.dev>'