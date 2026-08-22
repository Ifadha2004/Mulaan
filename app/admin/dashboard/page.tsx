import { getAdminSession } from '@/lib/auth/session'
import { logoutAdmin } from '@/lib/actions/auth.actions'
import { redirect } from 'next/navigation'
import { LogOut } from 'lucide-react'

export default async function AdminDashboardPage() {
  const session = await getAdminSession()

  if (!session) {
    redirect('/admin/login')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top bar with logout */}
      <header className="bg-brand-green-800 text-brand-cream-200 px-8 py-4 flex items-center justify-between">
        <span className="font-serif text-lg tracking-wide">MULAAN — Admin</span>

        <div className="flex items-center gap-4">
          <span className="text-sm">
            {session.name} <span className="opacity-60">({session.role})</span>
          </span>
          <form action={logoutAdmin}>
            <button
              type="submit"
              className="flex items-center gap-2 text-sm px-3 py-1.5 border border-brand-cream-200/30 rounded hover:bg-brand-cream-200/10 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </form>
        </div>
      </header>

      {/* Content */}
      <div className="p-8">
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-8">
          <h1 className="text-2xl font-serif text-brand-green-800 mb-2">
            Welcome, {session.name} 👋
          </h1>
          <p className="text-gray-600 mb-6">
            You're logged in as <strong>{session.role}</strong> ({session.email})
          </p>
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <p className="text-sm text-green-800">
              ✅ Authentication is working end-to-end, including logout. This is a
              placeholder — the real dashboard (KPIs, charts, sidebar) is next on the
              build list.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}