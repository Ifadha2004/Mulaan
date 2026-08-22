import Navbar from '@/components/shared/Navbar'
import Footer from '@/components/shared/Footer'
import CartDrawer from '@/components/customer/cart/CartDrawer'

export default function CustomerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex flex-col bg-brand-cream-200 pt-28">
      {/* pt-28 ensures content doesn't sit under the floating nav */}
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      <CartDrawer />
    </div>
  )
}