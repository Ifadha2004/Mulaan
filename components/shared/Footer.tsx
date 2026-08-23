'use client'

import Link from 'next/link'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    pages: [
      { name: 'Collections', href: '/collections' },
      { name: 'The Studio', href: '/about' },
      { name: 'Journal', href: '/journal' },
    ],
    socials: [
      { name: 'Instagram', href: '#' },
      { name: 'Pinterest', href: '#' },
      { name: 'LinkedIn', href: '#' },
    ],
    legal: [
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Terms of Service', href: '/terms' },
    ],
  }

  return (
    <footer className="relative bg-brand-green pt-0 pb-10 overflow-hidden">
      {/* Top Border Line */}
      <div className="container mx-auto px-6 mb-10">
        <div className="w-full h-[0.5px] bg-brand-gold/20" />
      </div>

      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-16 relative z-10">
        
        {/* Brand Column */}
        <div className="md:col-span-4 space-y-6">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 border border-brand-gold/30 flex items-center justify-center">
                <span className="text-brand-gold font-light text-sm">M</span>
            </div>
            <span className="text-2xl tracking-[0.2em] text-brand-cream uppercase font-serif italic" style={{ fontFamily: 'Blosta, serif' }}>
              Mulaan
            </span>
          </div>
          <p className="text-brand-cream/40 text-[11px] leading-relaxed tracking-[0.2em] uppercase max-w-xs">
            © {currentYear} Mulaan Studios. <br />
            Crafted for those who define elegance.
          </p>
        </div>

        {/* Links Columns */}
        <div className="md:col-span-8 grid grid-cols-2 md:grid-cols-3 gap-8">
          <div className="space-y-6">
            <h4 className="text-brand-gold text-[9px] tracking-[0.6em] uppercase font-bold">Explore</h4>
            <ul className="space-y-3">
              {footerLinks.pages.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-brand-cream/60 hover:text-brand-gold text-xs transition-all duration-500 font-light">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="text-brand-gold text-[9px] tracking-[0.6em] uppercase font-bold">Social</h4>
            <ul className="space-y-3">
              {footerLinks.socials.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-brand-cream/60 hover:text-brand-gold text-xs transition-all duration-500 font-light">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="text-brand-gold text-[9px] tracking-[0.6em] uppercase font-bold">Legal</h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-brand-cream/60 hover:text-brand-gold text-xs transition-all duration-500 font-light">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* MASSIVE BACKGROUND TEXT (The "DevStudio" Style) */}
      <div className="relative mt-10 opacity-[0.03] pointer-events-none select-none">
        <h2 
          className="text-[22vw] leading-none text-brand-gold text-center whitespace-nowrap italic font-serif"
          style={{ fontFamily: 'Blosta, serif' }}
        >
          Mulaan
        </h2>
      </div>
    </footer>
  )
}