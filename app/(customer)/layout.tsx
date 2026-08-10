import CartDrawer from '@/components/customer/cart/CartDrawer'
import CartIcon from '@/components/customer/cart/CartIcon'
import Link from 'next/link'

export default function CustomerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex flex-col bg-brand-cream-200 pt-28"> 
      {/* pt-20 ensures content doesn't sit under the floating nav */}
      <main className="flex-1">{children}</main>
      <CartDrawer />
    </div>
  )
}