import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { getCollections } from '@/lib/actions/collection.actions'

export const dynamic = 'force-dynamic'

export default async function CollectionsPage() {
  const allCollections = await getCollections()

  const collections = allCollections.filter(
    (collection: any) => collection.isActive
  )

  return (
    <main className="min-h-screen overflow-hidden bg-[#FCFAF7] pb-24 pt-28 lg:pb-32 lg:pt-36">
      <div className="container-luxury">
        {/* Editorial heading */}
        <header className="mx-auto mb-20 max-w-4xl text-center lg:mb-28">
          <p className="mb-6 text-[9px] uppercase tracking-[0.6em] text-brand-gold">
            Mulaan Archive
          </p>

          <h1 className="heading-luxury text-4xl uppercase tracking-[0.24em] text-brand-green md:text-6xl lg:text-7xl">
            The Digital Magazine
          </h1>

          <div className="mx-auto my-7 h-px w-16 bg-brand-gold" />

          <p className="text-[10px] font-light uppercase tracking-[0.35em] text-gray-400">
            Stories told through form, fabric and movement
          </p>
        </header>

        {collections.length === 0 ? (
          <section className="py-24 text-center">
            <p className="text-sm uppercase tracking-[0.3em] text-gray-400">
              New collections coming soon.
            </p>
          </section>
        ) : (
          <section className="grid grid-cols-1 gap-x-10 gap-y-20 md:grid-cols-2 lg:gap-x-16 lg:gap-y-28">
            {collections.map((collection: any, index: number) => {
              const editionNumber = String(index + 1).padStart(2, '0')

              return (
                <Link
                  key={collection.slug}
                  href={`/collections/${collection.slug}`}
                  className="group block"
                >
                  {/* Magazine cover */}
                  <article className="relative">
                    <div className="relative aspect-[4/5] overflow-hidden bg-[#EEEAE3]">
                      <img
                        src={collection.coverImage}
                        alt={collection.name}
                        className="h-full w-full object-cover transition-transform duration-[1600ms] ease-out group-hover:scale-[1.045]"
                      />

                      {/* Editorial gradient */}
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-brand-green/55 via-transparent to-black/10 opacity-70 transition-opacity duration-700 group-hover:opacity-90" />

                      {/* Edition number */}
                      <div className="absolute left-6 top-6 flex items-center gap-3 md:left-8 md:top-8">
                        <span className="text-[9px] uppercase tracking-[0.4em] text-white/75">
                          Edition
                        </span>

                        <span className="text-xs font-light tracking-[0.2em] text-white">
                          {editionNumber}
                        </span>
                      </div>

                      {/* Bottom magazine information */}
                      <div className="absolute inset-x-6 bottom-6 flex items-end justify-between gap-6 md:inset-x-8 md:bottom-8">
                        <div>
                          <p className="mb-3 text-[8px] uppercase tracking-[0.45em] text-white/60">
                            Mulaan Collection
                          </p>

                          <h2 className="heading-luxury text-2xl uppercase tracking-[0.18em] text-white md:text-3xl">
                            {collection.name}
                          </h2>
                        </div>

                        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/30 bg-white/10 text-white backdrop-blur-md transition-all duration-500 group-hover:rotate-45 group-hover:border-brand-gold group-hover:bg-brand-gold group-hover:text-brand-green">
                          <ArrowUpRight className="h-4 w-4" />
                        </span>
                      </div>

                      {/* Hover frame */}
                      <div className="pointer-events-none absolute inset-4 border border-white/0 transition-all duration-700 group-hover:inset-6 group-hover:border-white/30" />
                    </div>

                    {/* Short information only—description removed */}
                    <footer className="mt-6 flex items-center justify-between border-b border-brand-green/10 pb-5">
                      <span className="text-[9px] uppercase tracking-[0.35em] text-gray-400">
                        Digital Lookbook
                      </span>

                      <span className="text-[9px] uppercase tracking-[0.35em] text-brand-green transition-colors duration-500 group-hover:text-brand-gold">
                        Open Edition
                      </span>
                    </footer>
                  </article>
                </Link>
              )
            })}
          </section>
        )}

        <footer className="pt-28 text-center">
          <div className="mx-auto mb-7 h-px w-10 bg-brand-gold/40" />

          <p className="text-[9px] uppercase tracking-[0.5em] text-brand-gold/60">
            Est. 2025 · Modesty in Motion
          </p>
        </footer>
      </div>
    </main>
  )
}