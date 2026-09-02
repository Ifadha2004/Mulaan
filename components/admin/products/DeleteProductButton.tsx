'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { Trash2 } from 'lucide-react'
import { deleteProduct } from '@/lib/actions/product.actions'

export default function DeleteProductButton({ id, name }: { id: string; name: string }) {
  const router = useRouter()
  const [confirming, setConfirming] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    setIsDeleting(true)
    const result = await deleteProduct(id)

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
      <div className="flex items-center gap-1">
        <button
          onClick={handleDelete}
          disabled={isDeleting}
          className="px-3 py-1.5 text-xs bg-red-600 text-white rounded hover:bg-red-700 transition-colors disabled:opacity-50"
        >
          {isDeleting ? '...' : 'Confirm'}
        </button>
        <button
          onClick={() => setConfirming(false)}
          disabled={isDeleting}
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
      className="p-1.5 text-red-600 hover:bg-red-50 rounded transition-colors"
      title="Delete product"
    >
      <Trash2 className="w-4 h-4" />
    </button>
  )
}