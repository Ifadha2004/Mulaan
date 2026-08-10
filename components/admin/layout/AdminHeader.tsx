'use client'

import { usePathname } from 'next/navigation'
import { Bell, ExternalLink, LogOut, Search } from 'lucide-react'

export default function AdminHeader() {
  const pathname = usePathname()
  
  if (pathname === '/admin/login') return null

  // Format the title based on path (e.g., /admin/pre-orders -> PRE-ORDERS)
  const pageTitle = pathname.split('/').pop()?.replace('-', ' ') || 'Dashboard'

  return (
    <header className="h-20 bg-white border-b border-gray-100 px-8 flex items-center justify-between sticky top-0 z-30">
      <div>
        <h2 className="text-[12px] tracking-[0.3em] uppercase font-bold text-brand-green">
          {pageTitle}
        </h2>
        <p className="text-[9px] text-gray-400 uppercase tracking-widest mt-1">
          Mulaan Management System v1.0
        </p>
      </div>

      <div className="flex items-center gap-8">
        {/* Search Bar - Aesthetic only for now */}
        <div className="hidden md:flex items-center bg-gray-50 border border-gray-100 px-4 py-2 rounded-full">
          <Search className="w-3 h-3 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search orders, products..." 
            className="bg-transparent border-none focus:ring-0 text-[10px] w-48 ml-2 uppercase tracking-widest"
          />
        </div>

        <div className="flex items-center gap-5 border-l pl-8">
          <a 
            href="/" 
            target="_blank" 
            className="p-2 text-gray-400 hover:text-brand-green transition-colors"
            title="View Live Site"
          >
            <ExternalLink className="w-4 h-4" />
          </a>
          
          <button className="relative p-2 text-gray-400 hover:text-brand-green transition-colors">
            <Bell className="w-4 h-4" />
            <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-brand-gold rounded-full"></span>
          </button>

          <button 
            onClick={() => console.log('Logout logic')}
            className="flex items-center gap-2 px-4 py-2 text-red-800/60 hover:text-red-800 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span className="text-[10px] tracking-widest uppercase font-bold">Logout</span>
          </button>
        </div>
      </div>
    </header>
  )
}