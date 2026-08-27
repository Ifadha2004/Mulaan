import { NextRequest, NextResponse } from 'next/server'
import cloudinary from '@/lib/cloudinary'
import { getAdminSession } from '@/lib/auth/session'

export async function POST(request: NextRequest) {
  console.log('📥 [upload] Request received')

  try {
    const session = await getAdminSession()
    console.log('🔐 [upload] Session check:', session ? `OK (${session.email})` : 'NO SESSION')

    if (!session) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }

    const formData = await request.formData()
    const file = formData.get('file') as File | null
    const folder = (formData.get('folder') as string) || 'mulaan/misc'
    console.log('📎 [upload] File:', file?.name, file?.size, file?.type, '| folder:', folder)

    if (!file) {
      return NextResponse.json({ success: false, error: 'No file provided' }, { status: 400 })
    }

    const MAX_SIZE = 8 * 1024 * 1024
    if (file.size > MAX_SIZE) {
      return NextResponse.json(
        { success: false, error: 'File too large (max 8MB)' },
        { status: 400 }
      )
    }
    if (!file.type.startsWith('image/')) {
      return NextResponse.json(
        { success: false, error: 'Only image files are allowed' },
        { status: 400 }
      )
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    const base64 = `data:${file.type};base64,${buffer.toString('base64')}`
    console.log('🔄 [upload] Converted to base64, calling Cloudinary...')

    const result = await cloudinary.uploader.upload(base64, {
      folder,
      resource_type: 'image',
      transformation: [{ quality: 'auto', fetch_format: 'auto' }],
    })

    console.log('✅ [upload] Cloudinary success:', result.secure_url)

    return NextResponse.json({
      success: true,
      url: result.secure_url,
      publicId: result.public_id,
      width: result.width,
      height: result.height,
    })
  } catch (error: any) {
    console.error('❌ [upload] FULL ERROR:', error)
    console.error('❌ [upload] ERROR MESSAGE:', error?.message)
    console.error('❌ [upload] ERROR NAME:', error?.name)
    return NextResponse.json(
      { success: false, error: error?.message || 'Upload failed' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const session = await getAdminSession()
    if (!session) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }

    const { publicId } = await request.json()
    if (!publicId) {
      return NextResponse.json({ success: false, error: 'publicId is required' }, { status: 400 })
    }

    await cloudinary.uploader.destroy(publicId)

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('Delete error:', error)
    return NextResponse.json(
      { success: false, error: error.message || 'Delete failed' },
      { status: 500 }
    )
  }
}