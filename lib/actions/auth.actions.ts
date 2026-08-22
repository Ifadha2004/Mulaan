'use server'

import { connectDB } from '@/lib/db/mongodb'
import Admin from '@/lib/db/models/Admin'
import { SignJWT } from 'jose'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'mulaan_luxury_secret_key_2026'
)

export async function loginAdmin(formData: { email: string; password: string }) {
  const { email, password } = formData

  try {
    await connectDB()

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

    const isPasswordCorrect = await admin.comparePassword(password)
    if (!isPasswordCorrect) {
      admin.failedLoginAttempts = (admin.failedLoginAttempts || 0) + 1
      if (admin.failedLoginAttempts >= 5) {
        admin.lockedUntil = new Date(Date.now() + 15 * 60 * 1000)
      }
      await admin.save()
      return { success: false, error: 'Invalid credentials' }
    }

    // JWT itself expires after 8 hours — a hard cap regardless of cookie behavior
    const token = await new SignJWT({
      id: admin._id.toString(),
      name: admin.name,
      email: admin.email,
      role: admin.role,
    })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('8h')
      .sign(JWT_SECRET)

    const cookieStore = await cookies()
    cookieStore.set('admin_session', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      // No `maxAge` / `expires` set — this makes it a SESSION cookie.
      // The browser deletes it automatically once fully closed (all windows quit),
      // so re-opening the browser later always requires logging in again.
    })

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
  redirect('/admin/login')
}