import { cookies } from 'next/headers'
import { jwtVerify } from 'jose'
import type { AdminRole } from '@/lib/db/models/Admin'

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'mulaan_luxury_secret_key_2026'
)

export interface SessionPayload {
  id: string
  name: string
  email: string
  role: AdminRole
}

// Reads and verifies the admin_session cookie — use in server components/actions
export async function getAdminSession(): Promise<SessionPayload | null> {
  const cookieStore = await cookies()
  const token = cookieStore.get('admin_session')?.value

  if (!token) return null

  try {
    const { payload } = await jwtVerify(token, JWT_SECRET)
    return payload as unknown as SessionPayload
  } catch {
    return null
  }
}

// Throws if not logged in — use at the top of protected server actions/pages
export async function requireAdminSession(): Promise<SessionPayload> {
  const session = await getAdminSession()
  if (!session) {
    throw new Error('Not authenticated')
  }
  return session
}

// Role hierarchy check — e.g. requireRole(session, ['super_admin', 'admin'])
export function hasRole(session: SessionPayload, allowedRoles: AdminRole[]): boolean {
  return allowedRoles.includes(session.role)
}