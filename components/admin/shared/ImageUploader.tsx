'use client'

import { useState, useRef } from 'react'
import { Upload, X, ArrowLeft, ArrowRight, Loader2, ImageIcon } from 'lucide-react'
import toast from 'react-hot-toast'

export interface UploadedImage {
  url: string
  publicId: string
  alt?: string
}

interface ImageUploaderProps {
  value: UploadedImage[]
  onChange: (images: UploadedImage[]) => void
  folder: string // e.g. "mulaan/products" or "mulaan/collections"
  maxImages?: number
  label?: string
}

export default function ImageUploader({
  value,
  onChange,
  folder,
  maxImages = 8,
  label = 'Images',
}: ImageUploaderProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const uploadFiles = async (files: FileList | File[]) => {
    const fileArray = Array.from(files)
    const remainingSlots = maxImages - value.length

    if (remainingSlots <= 0) {
      toast.error(`Maximum ${maxImages} images allowed`)
      return
    }

    const filesToUpload = fileArray.slice(0, remainingSlots)
    if (fileArray.length > remainingSlots) {
      toast.error(`Only ${remainingSlots} more image(s) can be added`)
    }

    setIsUploading(true)
    const uploaded: UploadedImage[] = []

    for (const file of filesToUpload) {
      try {
        const formData = new FormData()
        formData.append('file', file)
        formData.append('folder', folder)

        const res = await fetch('/api/admin/upload', {
          method: 'POST',
          body: formData,
        })
        const data = await res.json()

        if (data.success) {
          uploaded.push({ url: data.url, publicId: data.publicId, alt: '' })
        } else {
          toast.error(data.error || `Failed to upload ${file.name}`)
        }
      } catch (err) {
        toast.error(`Failed to upload ${file.name}`)
      }
    }

    if (uploaded.length > 0) {
      onChange([...value, ...uploaded])
      toast.success(`${uploaded.length} image(s) uploaded`)
    }

    setIsUploading(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    if (e.dataTransfer.files?.length) {
      uploadFiles(e.dataTransfer.files)
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      uploadFiles(e.target.files)
    }
    e.target.value = ''
  }

  const removeImage = async (index: number) => {
    const image = value[index]
    try {
      await fetch('/api/admin/upload', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ publicId: image.publicId }),
      })
    } catch {
      // Even if Cloudinary delete fails, still remove from the form —
      // admin can clean up orphaned Cloudinary assets separately if needed
    }
    const next = value.filter((_, i) => i !== index)
    onChange(next)
  }

  const moveImage = (index: number, direction: 'left' | 'right') => {
    const targetIndex = direction === 'left' ? index - 1 : index + 1
    if (targetIndex < 0 || targetIndex >= value.length) return

    const next = [...value]
    ;[next[index], next[targetIndex]] = [next[targetIndex], next[index]]
    onChange(next)
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <label className="block font-medium text-brand-green-800">
          {label}
        </label>
        <span className="text-xs text-gray-500">
          {value.length}/{maxImages}
        </span>
      </div>

      {/* Existing image thumbnails */}
      {value.length > 0 && (
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 mb-4">
          {value.map((image, index) => (
            <div
              key={image.publicId || index}
              className="relative group aspect-square bg-gray-100 rounded overflow-hidden border border-gray-200"
            >
              <img
                src={image.url}
                alt={image.alt || `Image ${index + 1}`}
                className="w-full h-full object-cover"
              />

              {/* Position badge */}
              <div className="absolute top-1 left-1 bg-black/60 text-white text-[10px] px-1.5 py-0.5 rounded">
                {index === 0 ? 'Main' : index + 1}
              </div>

              {/* Hover controls */}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-1.5">
                <div className="flex gap-1">
                  <button
                    type="button"
                    onClick={() => moveImage(index, 'left')}
                    disabled={index === 0}
                    className="p-1.5 bg-white rounded disabled:opacity-30 disabled:cursor-not-allowed hover:bg-brand-gold transition-colors"
                    title="Move left"
                  >
                    <ArrowLeft className="w-3.5 h-3.5 text-brand-green-800" />
                  </button>
                  <button
                    type="button"
                    onClick={() => moveImage(index, 'right')}
                    disabled={index === value.length - 1}
                    className="p-1.5 bg-white rounded disabled:opacity-30 disabled:cursor-not-allowed hover:bg-brand-gold transition-colors"
                    title="Move right"
                  >
                    <ArrowRight className="w-3.5 h-3.5 text-brand-green-800" />
                  </button>
                </div>
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="p-1.5 bg-red-500 rounded hover:bg-red-600 transition-colors"
                  title="Remove"
                >
                  <X className="w-3.5 h-3.5 text-white" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Drop zone */}
      {value.length < maxImages && (
        <div
          onDragOver={(e) => {
            e.preventDefault()
            setIsDragging(true)
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
          className={`
            border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
            ${isDragging ? 'border-brand-gold bg-brand-gold/5' : 'border-gray-300 hover:border-brand-green-800'}
          `}
        >
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileSelect}
            className="hidden"
          />

          {isUploading ? (
            <div className="flex flex-col items-center gap-2 text-gray-500">
              <Loader2 className="w-8 h-8 animate-spin" />
              <p className="text-sm">Uploading...</p>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2 text-gray-500">
              {value.length === 0 ? (
                <ImageIcon className="w-8 h-8" />
              ) : (
                <Upload className="w-8 h-8" />
              )}
              <p className="text-sm">
                <span className="text-brand-green-800 font-medium">Click to upload</span> or drag and drop
              </p>
              <p className="text-xs text-gray-400">PNG, JPG up to 8MB each</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}