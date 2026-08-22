import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/db/mongodb'
import Admin from '@/lib/db/models/Admin'

// One-time seed route to create the first super_admin.
// Protected by a secret key so randoms can't hit this and create accounts.
// DELETE THIS FILE once you've successfully created your admin account(s).
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, password, secret } = body

    // Simple shared-secret gate — set SEED_SECRET in .env.local
    if (secret !== process.env.SEED_SECRET) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }

    if (!name || !email || !password) {
      return NextResponse.json(
        { success: false, error: 'name, email, and password are required' },
        { status: 400 }
      )
    }

    if (password.length < 8) {
      return NextResponse.json(
        { success: false, error: 'Password must be at least 8 characters' },
        { status: 400 }
      )
    }

    await connectDB()

    const existing = await Admin.findOne({ email: email.toLowerCase() })
    if (existing) {
      return NextResponse.json(
        { success: false, error: 'An admin with this email already exists' },
        { status: 409 }
      )
    }

    // password gets hashed automatically by the pre-save hook in Admin.ts
    const admin = await Admin.create({
      name,
      email: email.toLowerCase(),
      password,
      role: 'super_admin',
      isActive: true,
    })

    return NextResponse.json({
      success: true,
      admin: {
        id: admin._id.toString(),
        name: admin.name,
        email: admin.email,
        role: admin.role,
      },
    })
  } catch (error: any) {
    console.error('Seed admin error:', error)
    return NextResponse.json(
      { success: false, error: error.message || 'Internal server error' },
      { status: 500 }
    )
  }
}