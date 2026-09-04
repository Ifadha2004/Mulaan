import AdminSidebar from '@/components/admin/layout/AdminSidebar'
import AdminHeader from '@/components/admin/layout/AdminHeader'

export const dynamic = 'force-dynamic'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Logic to hide sidebar on login page
  const isLoginPage = false // We will handle this with segments later

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* SIDEBAR - Only visible if logged in */}
      <AdminSidebar />

      <div className="flex-1 flex flex-col">
        {/* TOP NAVIGATION */}
        <AdminHeader />

        {/* CONTENT AREA */}
        <main className="p-8 lg:p-12 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  )
}