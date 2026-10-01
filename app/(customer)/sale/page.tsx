import type { Metadata } from 'next'
import Link from 'next/link'
import ProductCard from '@/components/customer/products/ProductCard'
import { getSaleProducts } from '@/lib/actions/product.actions'

export const dynamic = 'force-dynamic'
export const metadata: Metadata = {
  title: 'Sale | Mulaan',
  description: 'Shop selected Mulaan pieces at special launch prices while stocks last.',
}

export default async function SalePage() {
  const products = await getSaleProducts()
  return (
    <main className="min-h-screen bg-[#FCFAF7] px-6 pb-24 pt-36 md:px-10 md:pt-44">
      <section className="container-luxury">
        <header className="mx-auto mb-20 max-w-3xl text-center">
          <p className="mb-5 text-[9px] uppercase tracking-[0.55em] text-brand-gold">Limited-Time Edit</p>
          <h1 className="font-serif text-5xl uppercase tracking-[0.14em] text-brand-green md:text-7xl">The Sale</h1>
          <div className="mx-auto my-7 h-px w-16 bg-brand-gold" />
          <p className="mx-auto max-w-xl text-sm font-light leading-7 tracking-[0.08em] text-gray-500">Selected silhouettes from our first and third collections, offered at special launch prices while available.</p>
        </header>
        {products.length ? (
          <><div className="mb-10 flex items-center justify-between border-b border-brand-green/10 pb-4"><span className="text-[9px] uppercase tracking-[0.4em] text-brand-green/60">Sale selection</span><span className="text-[9px] uppercase tracking-[0.35em] text-gray-400">{products.length} {products.length === 1 ? 'piece' : 'pieces'}</span></div><div className="grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">{products.map((product: any) => <ProductCard key={String(product._id)} product={product} />)}</div></>
        ) : (
          <div className="border border-brand-green/10 px-6 py-24 text-center"><p className="mb-6 text-xs uppercase tracking-[0.35em] text-gray-400">The next sale edit is being prepared</p><Link href="/products" className="border-b border-brand-gold pb-1 text-[10px] uppercase tracking-[0.35em] text-brand-green">Explore all products</Link></div>
        )}
      </section>
    </main>
  )
}
