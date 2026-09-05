// 'use client'

// import Link from 'next/link'

// export default function Footer() {
//   const currentYear = new Date().getFullYear()

//   const footerLinks = {
//     pages: [
//       { name: 'Collections', href: '/collections' },
//       { name: 'The Studio', href: '/about' },
//       { name: 'Journal', href: '/journal' },
//     ],
//     socials: [
//       { name: 'Instagram', href: '#' },
//       { name: 'Pinterest', href: '#' },
//       { name: 'LinkedIn', href: '#' },
//     ],
//     legal: [
//       { name: 'Privacy Policy', href: '/privacy' },
//       { name: 'Terms of Service', href: '/terms' },
//     ],
//   }

//   return (
//     <footer className="relative bg-brand-green pt-0 pb-10 overflow-hidden">
//       {/* Top Border Line */}
//       <div className="container mx-auto px-6 mb-10">
//         <div className="w-full h-[0.5px] bg-brand-gold/20" />
//       </div>

//       <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-16 relative z-10">
        
//         {/* Brand Column */}
//         <div className="md:col-span-4 space-y-6">
//           <div className="flex items-center gap-4">
//             <div className="w-10 h-10 border border-brand-gold/30 flex items-center justify-center">
//                 <span className="text-brand-gold font-light text-sm">M</span>
//             </div>
//             <span className="text-2xl tracking-[0.2em] text-brand-cream uppercase font-serif italic" style={{ fontFamily: 'Blosta, serif' }}>
//               Mulaan
//             </span>
//           </div>
//           <p className="text-brand-cream/40 text-[11px] leading-relaxed tracking-[0.2em] uppercase max-w-xs">
//             © {currentYear} Mulaan Studios. <br />
//             Crafted for those who define elegance.
//           </p>
//         </div>

//         {/* Links Columns */}
//         <div className="md:col-span-8 grid grid-cols-2 md:grid-cols-3 gap-8">
//           <div className="space-y-6">
//             <h4 className="text-brand-gold text-[9px] tracking-[0.6em] uppercase font-bold">Explore</h4>
//             <ul className="space-y-3">
//               {footerLinks.pages.map((link) => (
//                 <li key={link.name}>
//                   <Link href={link.href} className="text-brand-cream/60 hover:text-brand-gold text-xs transition-all duration-500 font-light">
//                     {link.name}
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           <div className="space-y-6">
//             <h4 className="text-brand-gold text-[9px] tracking-[0.6em] uppercase font-bold">Social</h4>
//             <ul className="space-y-3">
//               {footerLinks.socials.map((link) => (
//                 <li key={link.name}>
//                   <Link href={link.href} className="text-brand-cream/60 hover:text-brand-gold text-xs transition-all duration-500 font-light">
//                     {link.name}
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           <div className="space-y-6">
//             <h4 className="text-brand-gold text-[9px] tracking-[0.6em] uppercase font-bold">Legal</h4>
//             <ul className="space-y-3">
//               {footerLinks.legal.map((link) => (
//                 <li key={link.name}>
//                   <Link href={link.href} className="text-brand-cream/60 hover:text-brand-gold text-xs transition-all duration-500 font-light">
//                     {link.name}
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         </div>
//       </div>

//       {/* MASSIVE BACKGROUND TEXT (The "DevStudio" Style) */}
//       <div className="relative mt-10 opacity-[0.03] pointer-events-none select-none">
//         <h2 
//           className="text-[22vw] leading-none text-brand-gold text-center whitespace-nowrap italic font-serif"
//           style={{ fontFamily: 'Blosta, serif' }}
//         >
//           Mulaan
//         </h2>
//       </div>
//     </footer>
//   )
// }

import Link from 'next/link'
import { Instagram, MessageCircle } from 'lucide-react'

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M19.321 5.562a5.122 5.122 0 0 1-.443-.258 6.228 6.228 0 0 1-1.137-.966c-.849-.984-1.166-1.983-1.281-2.686h.004C16.354.913 16.398 0 16.398 0h-3.848v14.55c0 .683-.216 1.353-.618 1.902a2.79 2.79 0 0 1-1.62 1.028 2.798 2.798 0 0 1-1.92-.279 2.804 2.804 0 0 1-1.242-1.401 2.815 2.815 0 0 1-.06-1.874 2.807 2.807 0 0 1 1.09-1.484 2.79 2.79 0 0 1 1.83-.531c.283.021.562.078.828.171v-3.9a6.65 6.65 0 0 0-.774-.048 6.61 6.61 0 0 0-4.902 2.163A6.667 6.667 0 0 0 3.5 14.99a6.673 6.673 0 0 0 1.756 4.494 6.61 6.61 0 0 0 4.318 2.213c.28.026.56.04.842.04a6.61 6.61 0 0 0 4.71-1.958 6.673 6.673 0 0 0 1.951-4.7V8.284a9.917 9.917 0 0 0 5.795 1.85V6.284a6.203 6.203 0 0 1-3.551-.722z" />
    </svg>
  )
}

const footerLinks = {
  pages: [
    { name: 'Collections', href: '/collections' },
    { name: 'The Studio', href: '/about' },
    { name: 'Journal', href: '/journal' },
  ],
  socials: [
    {
      name: 'Instagram',
      href: 'https://www.instagram.com/mulaan.lk',
    },
    {
      name: 'TikTok',
      href: 'https://www.tiktok.com/@mulaan.lk',
    },
    {
      name: 'WhatsApp',
      href: 'https://wa.me/94760100965',
    },
  ],
  legal: [
    { name: 'Privacy Policy', href: '/privacy-policy' },
    { name: 'Terms of Service', href: '/terms-of-service' },
    { name: 'Return Policy', href: '/return-policy' },
  ],
}

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative overflow-hidden bg-brand-green pb-10 pt-0">
      {/* Top border */}
      <div className="container mx-auto mb-10 px-6">
        <div className="h-px w-full bg-brand-gold/20" />
      </div>

      <div className="container relative z-10 mx-auto grid grid-cols-1 gap-16 px-6 md:grid-cols-12">
        {/* Brand */}
        <div className="space-y-6 md:col-span-4">
          <div className="flex items-center gap-4">
            <div className="flex h-10 w-10 items-center justify-center border border-brand-gold/30">
              <span className="text-sm font-light text-brand-gold">
                M
              </span>
            </div>

            <span
              className="font-serif text-2xl italic uppercase tracking-[0.2em] text-brand-cream"
              style={{ fontFamily: 'Blosta, serif' }}
            >
              Mulaan
            </span>
          </div>

          <p className="max-w-xs text-[11px] uppercase leading-relaxed tracking-[0.2em] text-brand-cream/40">
            © {currentYear} Mulaan Studios.
            <br />
            Crafted for those who define elegance.
          </p>
        </div>

        {/* Navigation columns */}
        <div className="grid grid-cols-2 gap-8 md:col-span-8 md:grid-cols-3">
          {/* Explore */}
          <div className="space-y-6">
            <h4 className="text-[9px] font-bold uppercase tracking-[0.6em] text-brand-gold">
              Explore
            </h4>

            <ul className="space-y-3">
              {footerLinks.pages.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-xs font-light text-brand-cream/60 transition-colors duration-500 hover:text-brand-gold"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div className="space-y-6">
            <h4 className="text-[9px] font-bold uppercase tracking-[0.6em] text-brand-gold">
              Social
            </h4>

            <ul className="space-y-3">
              {footerLinks.socials.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Visit Mulaan on ${link.name}`}
                    className="flex items-center gap-2 text-xs font-light text-brand-cream/60 transition-colors duration-500 hover:text-brand-gold"
                  >
                    {link.name === 'Instagram' && (
                      <Instagram
                        aria-hidden="true"
                        className="h-3.5 w-3.5"
                      />
                    )}

                    {link.name === 'TikTok' && (
                      <TikTokIcon className="h-3 w-3" />
                    )}

                    {link.name === 'WhatsApp' && (
                      <MessageCircle
                        aria-hidden="true"
                        className="h-3.5 w-3.5"
                      />
                    )}

                    <span>{link.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-6">
            <h4 className="text-[9px] font-bold uppercase tracking-[0.6em] text-brand-gold">
              Legal
            </h4>

            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-xs font-light text-brand-cream/60 transition-colors duration-500 hover:text-brand-gold"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Decorative background wordmark */}
      <div
        aria-hidden="true"
        className="pointer-events-none relative mt-10 select-none opacity-[0.03]"
      >
        <h2
          className="whitespace-nowrap text-center font-serif text-[22vw] italic leading-none text-brand-gold"
          style={{ fontFamily: 'Blosta, serif' }}
        >
          Mulaan
        </h2>
      </div>
    </footer>
  )
}