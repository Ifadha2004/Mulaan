'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { Trash2 } from 'lucide-react'
import { deleteCollection } from '@/lib/actions/collection.actions'

export default function DeleteCollectionButton({ id, name }: { id: string; name: string }) {
  const router = useRouter()
  const [confirming, setConfirming] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    setIsDeleting(true)
    const result = await deleteCollection(id)

    if (result.success) {
      toast.success(`"${name}" deleted`)
      router.refresh()
    } else {
      toast.error(result.error || 'Failed to delete')
    }
    setIsDeleting(false)
    setConfirming(false)
  }

  if (confirming) {
    return (
      <div className="flex-1 flex items-center gap-1">
        <button
          onClick={handleDelete}
          disabled={isDeleting}
          className="flex-1 py-2 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
        >
          {isDeleting ? 'Deleting...' : 'Confirm'}
        </button>
        <button
          onClick={() => setConfirming(false)}
          disabled={isDeleting}
          className="px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
      </div>
    )
  }

  return (
    <button
      onClick={() => setConfirming(true)}
      className="p-2 text-red-600 border border-gray-300 rounded-lg hover:bg-red-50 hover:border-red-200 transition-colors"
      title="Delete collection"
    >
      <Trash2 className="w-4 h-4" />
    </button>
  )
}