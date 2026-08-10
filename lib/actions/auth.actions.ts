'use server'

import { connectDB } from '@/lib/db/mongodb'
import Admin from '@/lib/db/models/Admin'
import { SignJWT } from 'jose'
import { cookies } from 'next/headers'

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'mulaan_luxury_secret_key_2026'
)

export async function loginAdmin(formData: { email: string; password: string }) {
  const { email, password } = formData

  try {
    await connectDB()

    // 1. Find Admin — .select('+password') is required because the schema
    //    marks password as select: false by default (security best practice)
    const admin = await Admin.findOne({ email: email.toLowerCase() }).select('+password')
    if (!admin) {
      return { success: false, error: 'Invalid credentials' }
    }

    if (!admin.isActive) {
      return { success: false, error: 'Account is disabled. Contact support.' }
    }

    if (admin.lockedUntil && admin.lockedUntil > new Date()) {
      return { success: false, error: 'Account temporarily locked. Try again later.' }
    }

    // 2. Check Password — use the model's own comparePassword() method
    //    (keeps hashing/comparison logic in one place: Admin.ts)
    const isPasswordCorrect = await admin.comparePassword(password)
    if (!isPasswordCorrect) {
      admin.failedLoginAttempts = (admin.failedLoginAttempts || 0) + 1
      if (admin.failedLoginAttempts >= 5) {
        admin.lockedUntil = new Date(Date.now() + 15 * 60 * 1000) // lock 15 min
      }
      await admin.save()
      return { success: false, error: 'Invalid credentials' }
    }

    // 3. Create Session Payload
    const token = await new SignJWT({
      id: admin._id.toString(),
      name: admin.name,
      email: admin.email,
      role: admin.role,
    })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('24h')
      .sign(JWT_SECRET)

    // 4. Set HTTP-Only Cookie
    const cookieStore = await cookies()
    cookieStore.set('admin_session', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24,
      path: '/',
    })

    // 5. Success — reset failed attempts, update login timestamp
    admin.failedLoginAttempts = 0
    admin.lockedUntil = undefined
    admin.lastLogin = new Date()
    await admin.save()

    return { success: true }
  } catch (error) {
    console.error('Login Error:', error)
    return { success: false, error: 'Internal server error' }
  }
}

export async function logoutAdmin() {
  const cookieStore = await cookies()
  cookieStore.delete('admin_session')
}