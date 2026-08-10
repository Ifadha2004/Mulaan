'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  LayoutDashboard, 
  Package, 
  Layers, 
  ShoppingBag, 
  Timer, 
  BarChart3, 
  Image as ImageIcon, 
  Mail, 
  Settings,
  ChevronRight
} from 'lucide-react'
import { cn } from '@/lib/utils/utils'

const navigation = [
  { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
  { name: 'Products', href: '/admin/products', icon: Package },
  { name: 'Inventory', href: '/admin/inventory', icon: Layers },
  { name: 'Orders', href: '/admin/orders', icon: ShoppingBag },
  { name: 'Pre-Orders', href: '/admin/pre-orders', icon: Timer },
  { name: 'Collections', href: '/admin/collections', icon: Layers },
  { name: 'Analytics', href: '/admin/analytics', icon: BarChart3 },
  { name: 'Media Library', href: '/admin/media', icon: ImageIcon },
  { name: 'Newsletter', href: '/admin/newsletter', icon: Mail },
  { name: 'Settings', href: '/admin/settings', icon: Settings },
]

export default function AdminSidebar() {
  const pathname = usePathname()

  // Don't show sidebar on login page
  if (pathname === '/admin/login') return null

  return (
    <aside className="w-72 bg-brand-green text-white flex flex-col sticky top-0 h-screen shadow-2xl">
      <div className="p-8 border-b border-white/10">
        <Link href="/admin/dashboard" className="group">
          <h1 className="font-serif text-2xl tracking-[0.2em] uppercase group-hover:text-brand-gold transition-colors">
            Mulaan
          </h1>
          <p className="text-[9px] tracking-[0.3em] uppercase text-brand-gold/80 mt-1 font-bold">
            Admin Portal
          </p>
        </Link>
      </div>

      <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-1 custom-scrollbar">
        {navigation.map((item) => {
          const isActive = pathname.startsWith(item.href)
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center justify-between px-4 py-3 text-[11px] tracking-widest uppercase transition-all duration-300 group",
                isActive 
                  ? "bg-white/10 text-brand-gold border-r-2 border-brand-gold" 
                  : "hover:bg-white/5 text-gray-400 hover:text-white"
              )}
            >
              <div className="flex items-center gap-4">
                <item.icon className={cn(
                  "w-4 h-4 transition-transform group-hover:scale-110",
                  isActive ? "text-brand-gold" : "text-gray-400"
                )} />
                <span>{item.name}</span>
              </div>
              {isActive && <ChevronRight className="w-3 h-3" />}
            </Link>
          )
        })}
      </nav>

      <div className="p-6 border-t border-white/10 bg-black/10">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-brand-gold flex items-center justify-center text-brand-green font-bold text-xs">
            I
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider">Ifadha</p>
            <p className="text-[8px] text-gray-500 uppercase tracking-widest">Founder</p>
          </div>
        </div>
      </div>
    </aside>
  )
}