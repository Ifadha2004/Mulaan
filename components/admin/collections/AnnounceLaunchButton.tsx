'use client'

import { useState } from 'react'
import toast from 'react-hot-toast'
import { Megaphone, Loader2 } from 'lucide-react'
import { sendCollectionLaunchEmail } from '@/lib/actions/broadcast.actions'

interface AnnounceLaunchButtonProps {
  collectionId: string
  collectionName: string
  launchEmailSent: boolean
  launchEmailSentAt?: string
}

export default function AnnounceLaunchButton({
  collectionId,
  collectionName,
  launchEmailSent,
  launchEmailSentAt,
}: AnnounceLaunchButtonProps) {
  const [isSending, setIsSending] = useState(false)
  const [confirming, setConfirming] = useState(false)

  const handleSend = async () => {
    setIsSending(true)
    const result = await sendCollectionLaunchEmail(collectionId)

    if (result.success) {
      toast.success(`Sent to ${result.sentCount} subscriber${result.sentCount === 1 ? '' : 's'}`)
      if (result.warning) toast.error(result.warning)
    } else {
      toast.error(result.error || 'Failed to send')
    }
    setIsSending(false)
    setConfirming(false)
  }

  if (confirming) {
    return (
      <div className="flex items-center gap-1">
        <button
          onClick={handleSend}
          disabled={isSending}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs bg-brand-gold text-brand-green-800 font-medium rounded hover:bg-brand-gold/90 transition-colors disabled:opacity-50"
        >
          {isSending ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : null}
          {isSending ? 'Sending...' : 'Confirm Send'}
        </button>
        <button
          onClick={() => setConfirming(false)}
          disabled={isSending}
          className="px-2 py-1.5 text-xs border border-gray-300 rounded hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
      </div>
    )
  }

  return (
    <button
      onClick={() => setConfirming(true)}
      className="flex items-center gap-1.5 px-3 py-1.5 text-xs border border-brand-gold text-brand-green-800 rounded hover:bg-brand-gold/10 transition-colors"
      title={
        launchEmailSent && launchEmailSentAt
          ? `Already sent on ${new Date(launchEmailSentAt).toLocaleDateString('en-GB')} — click to send again`
          : `Announce "${collectionName}" to all subscribers`
      }
    >
      <Megaphone className="w-3.5 h-3.5" />
      {launchEmailSent ? 'Sent — Resend?' : 'Announce Launch'}
    </button>
  )
}