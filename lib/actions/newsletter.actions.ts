'use server'

import { connectDB } from '@/lib/db/mongodb'
import Newsletter from '@/lib/db/models/Newsletter'
import { resend, EMAIL_FROM } from '@/lib/email/resend'
import { getWelcomeEmailHtml } from '@/lib/email/templates/welcome'

export async function subscribeToNewsletter(email: string, name?: string) {
  try {
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      return { success: false, error: 'Please enter a valid email address' }
    }

    await connectDB()
    const normalizedEmail = email.toLowerCase().trim()

    const existing = await Newsletter.findOne({ email: normalizedEmail })

    if (existing) {
      if (existing.isActive) {
        return { success: false, error: "You're already on the list!" }
      }
      existing.isActive = true
      existing.subscribedAt = new Date()
      existing.unsubscribedAt = undefined
      await existing.save()
    } else {
      await Newsletter.create({
        email: normalizedEmail,
        name: name?.trim() || undefined,
        isActive: true,
      })
    }

    try {
      await resend.emails.send({
        from: EMAIL_FROM,
        to: normalizedEmail,
        subject: 'Welcome to Mulaan ✦',
        html: getWelcomeEmailHtml({ name }),
      })
    } catch (emailError) {
      console.error('Welcome email failed to send:', emailError)
    }

    return { success: true }
  } catch (error: any) {
    console.error('Newsletter subscribe error:', error)
    return { success: false, error: 'Something went wrong. Please try again.' }
  }
}