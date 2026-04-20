import CartDrawer from '@/components/customer/cart/CartDrawer'
import CartIcon from '@/components/customer/cart/CartIcon'
import Link from 'next/link'

export default function CustomerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex flex-col bg-brand-cream-200">
      {/* Header with Cart */}
      <header className="bg-brand-green-800 border-b border-brand-gold/20 sticky top-0 z-40 shadow-md">
        <div className="container-luxury">
          <div className="flex items-center justify-between py-6">
            <Link href="/" className="font-display text-3xl tracking-luxury text-brand-gold">
              MULAAN
            </Link>
            <nav className="hidden md:flex gap-8">
              <Link href="/" className="text-brand-cream-200 hover:text-brand-gold transition-colors tracking-wide text-sm uppercase">
                Home
              </Link>
              <Link href="/collections" className="text-brand-cream-200 hover:text-brand-gold transition-colors tracking-wide text-sm uppercase">
                Collections
              </Link>
              <Link href="/products" className="text-brand-cream-200 hover:text-brand-gold transition-colors tracking-wide text-sm uppercase">
                Products
              </Link>
              <Link href="/about" className="text-brand-cream-200 hover:text-brand-gold transition-colors tracking-wide text-sm uppercase">
                About
              </Link>
            </nav>
            <CartIcon />
          </div>
        </div>
      </header>
      
      <main className="flex-1">{children}</main>
      
      {/* Footer */}
      <footer className="bg-brand-green-800 border-t border-brand-gold/20 mt-auto">
        <div className="container-luxury py-12">
          <div className="text-center space-y-4">
            <h2 className="font-display text-2xl tracking-luxury text-brand-gold">
              MULAAN
            </h2>
            <p className="text-brand-cream-200/70 text-sm tracking-wide">
              Modest wear for the modern woman
            </p>
            <p className="text-brand-cream-200/50 text-xs tracking-wide pt-4">
              © 2026 Mulaan. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* Cart Drawer */}
      <CartDrawer />
    </div>
  )
}