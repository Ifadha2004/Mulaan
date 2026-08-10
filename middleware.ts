import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { jwtVerify } from 'jose'

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'mulaan_luxury_secret_key_2026'
)

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const session = request.cookies.get('admin_session')?.value

  // 1. If trying to access admin pages (except login)
  if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
    if (!session) {
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }

    try {
      // Verify token
      await jwtVerify(session, JWT_SECRET)
      return NextResponse.next()
    } catch (error) {
      // Token is invalid or expired
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }
  }

  // 2. If already logged in and trying to go to login page
  if (pathname === '/admin/login' && session) {
    try {
      await jwtVerify(session, JWT_SECRET)
      return NextResponse.redirect(new URL('/admin/dashboard', request.url))
    } catch (error) {
      return NextResponse.next()
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
}