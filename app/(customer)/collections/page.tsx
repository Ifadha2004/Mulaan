import Link from 'next/link'
import { getCollections } from '@/lib/actions/collection.actions'

export const dynamic = 'force-dynamic'

export default async function CollectionsPage() {
  const allCollections = await getCollections()
  const collections = allCollections.filter((c: any) => c.isActive)

  return (
    <div className="min-h-screen bg-[#FCFAF7] py-24 lg:py-32">
      <div className="container-luxury space-y-24">
        {/* Header Section */}
        <div className="text-center space-y-6">
          <h1 className="heading-luxury text-4xl md:text-6xl tracking-[0.3em] text-brand-green uppercase">
            The Collections
          </h1>
          <div className="w-16 h-[1px] bg-brand-gold mx-auto" />
          <p className="text-gray-400 font-light tracking-[0.2em] italic text-xs uppercase">
            The Mulaan Journey
          </p>
        </div>

        {collections.length === 0 ? (
          <p className="text-center text-gray-400 text-sm tracking-widest uppercase">
            New collections coming soon.
          </p>
        ) : (
          /* Symmetrical Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-20 lg:gap-x-20">
            {collections.map((col: any) => (
              <Link key={col.slug} href={`/collections/${col.slug}`} className="group block">
                {/* Image Container with Fixed 3:4 Aspect Ratio */}
                <div className="relative aspect-[3/4] overflow-hidden bg-gray-100 shadow-sm transition-all duration-700 group-hover:shadow-2xl">
                  <img
                    src={col.coverImage}
                    className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-110"
                    alt={col.name}
                  />

                  {/* Minimalist Glassmorphism Overlay */}
                  <div className="absolute inset-0 bg-brand-green/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 flex items-center justify-center">
                    <div className="backdrop-blur-sm bg-white/10 border border-white/30 px-8 py-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-700">
                      <span className="text-white text-[10px] tracking-[0.5em] uppercase font-light">
                        Explore Album
                      </span>
                    </div>
                  </div>
                </div>

                {/* Text Content - Aligned Center */}
                <div className="mt-10 text-center space-y-3">
                  <h2 className="heading-luxury text-xl tracking-[0.25em] text-brand-green-800 transition-colors duration-500 group-hover:text-brand-gold uppercase">
                    {col.name}
                  </h2>
                  <div className="w-8 h-[1px] bg-brand-gold/30 mx-auto transition-all duration-500 group-hover:w-16" />
                  <p className="text-gray-500 font-light text-[11px] tracking-[0.15em] leading-relaxed max-w-[280px] mx-auto uppercase">
                    {col.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Bottom Decorative Element */}
        <div className="pt-20 text-center">
          <p className="text-[10px] tracking-[0.4em] text-brand-gold/50 uppercase">
            EST. 2025 • Modesty in Motion
          </p>
        </div>
      </div>
    </div>
  )
}