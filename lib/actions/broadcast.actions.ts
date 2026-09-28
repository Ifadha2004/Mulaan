// lib/actions/broadcast.actions.ts
'use server'

import { connectDB } from '@/lib/db/mongodb'
import Collection from '@/lib/db/models/Collection'
import Newsletter from '@/lib/db/models/Newsletter'
import { resend, EMAIL_FROM } from '@/lib/email/resend'
import { getCollectionLaunchEmailHtml } from '@/lib/email/templates/collectionLaunch'
import { requireAdminSession } from '@/lib/auth/session'
import { revalidatePath } from 'next/cache'

export async function sendCollectionLaunchEmail(collectionId: string) {
  try {
    await requireAdminSession()
    await connectDB()

    const collection = await Collection.findById(collectionId)
    if (!collection) {
      return { success: false, error: 'Collection not found' }
    }

    const subscribers = await Newsletter.find({ isActive: true }).select('email')
    if (subscribers.length === 0) {
      return { success: false, error: 'No active subscribers to send to yet' }
    }

    const html = getCollectionLaunchEmailHtml({
      collectionName: collection.name,
      description: collection.description,
      coverImage: collection.coverImage,
      slug: collection.slug,
    })

    let sentCount = 0
    const failedEmails: string[] = []

    // Send one at a time so a single bad/invalid address (or Resend's
    // sandbox restriction on unverified domains) can't block delivery
    // to everyone else in the list.
    for (const sub of subscribers) {
      try {
        await resend.emails.send({
          from: EMAIL_FROM,
          to: sub.email,
          subject: `✦ New Collection: ${collection.name}`,
          html,
        })
        sentCount++
      } catch (err: any) {
        console.error(`Failed to send to ${sub.email}:`, err?.error?.message || err)
        failedEmails.push(sub.email)
      }
    }

    collection.launchEmailSent = true
    collection.launchEmailSentAt = new Date()
    await collection.save()

    revalidatePath('/admin/collections')

    if (failedEmails.length > 0) {
      return {
        success: true,
        sentCount,
        warning: `Sent to ${sentCount} of ${subscribers.length} subscribers. Failed: ${failedEmails.join(', ')}`,
      }
    }

    return { success: true, sentCount }
  } catch (error: any) {
    console.error('Collection launch email error:', error)
    return { success: false, error: error.message || 'Failed to send launch email' }
  }
}