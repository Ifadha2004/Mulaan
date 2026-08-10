// 'use client'

// import Link from 'next/link'
// import { motion } from 'framer-motion'

// export default function Footer() {
//   const currentYear = new Date().getFullYear()

//   const footerLinks = {
//     pages: [
//       { name: 'Collections', href: '/collections' },
//       { name: 'The Studio', href: '/about' },
//       { name: 'Journal', href: '/journal' },
//       { name: 'Private Gallery', href: '/gallery' },
//     ],
//     socials: [
//       { name: 'Instagram', href: '#' },
//       { name: 'Pinterest', href: '#' },
//       { name: 'Twitter', href: '#' },
//       { name: 'LinkedIn', href: '#' },
//     ],
//     legal: [
//       { name: 'Privacy Policy', href: '/privacy' },
//       { name: 'Terms of Service', href: '/terms' },
//       { name: 'Cookie Policy', href: '/cookies' },
//     ],
//   }

//   return (
//     <footer className="relative bg-brand-green pt-24 pb-12 overflow-hidden">
//       {/* 1. TOP DIVIDER LINE */}
//       <div className="container-luxury mb-20">
//         <div className="w-full h-[1px] bg-white/10" />
//       </div>

//       <div className="container-luxury grid grid-cols-1 md:grid-cols-12 gap-12 relative z-10">
        
//         {/* 2. LOGO & COPYRIGHT SECTION */}
//         <div className="md:col-span-4 space-y-8">
//           <div className="flex items-center space-gap-3">
//              {/* Replace with your actual SVG logo icon */}
//             <div className="w-8 h-8 bg-brand-gold flex items-center justify-center rounded-sm">
//                 <span className="text-brand-green font-bold text-xs font-serif">M</span>
//             </div>
//             <span className="text-xl tracking-[0.3em] uppercase text-brand-cream font-serif italic" style={{ fontFamily: 'Blosta, serif' }}>
//               Mulaan
//             </span>
//           </div>
//           <p className="text-brand-cream/40 text-xs leading-loose max-w-[240px] font-light tracking-widest">
//             © copyright Mulaan {currentYear}. <br />
//             All rights reserved. Designed for the daring.
//           </p>
//         </div>

//         {/* 3. NAVIGATION COLUMNS */}
//         <div className="md:col-span-8 grid grid-cols-2 md:grid-cols-3 gap-8">
//           {/* Pages */}
//           <div className="space-y-6">
//             <h4 className="text-brand-gold text-[10px] tracking-[0.5em] uppercase font-bold">Pages</h4>
//             <ul className="space-y-4">
//               {footerLinks.pages.map((link) => (
//                 <li key={link.name}>
//                   <Link href={link.href} className="text-brand-cream/60 hover:text-brand-gold text-sm font-light transition-colors duration-500">
//                     {link.name}
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* Socials */}
//           <div className="space-y-6">
//             <h4 className="text-brand-gold text-[10px] tracking-[0.5em] uppercase font-bold">Socials</h4>
//             <ul className="space-y-4">
//               {footerLinks.socials.map((link) => (
//                 <li key={link.name}>
//                   <Link href={link.href} className="text-brand-cream/60 hover:text-brand-gold text-sm font-light transition-colors duration-500">
//                     {link.name}
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* Legal */}
//           <div className="space-y-6">
//             <h4 className="text-brand-gold text-[10px] tracking-[0.5em] uppercase font-bold">Legal</h4>
//             <ul className="space-y-4">
//               {footerLinks.legal.map((link) => (
//                 <li key={link.name}>
//                   <Link href={link.href} className="text-brand-cream/60 hover:text-brand-gold text-sm font-light transition-colors duration-500">
//                     {link.name}
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         </div>
//       </div>

//       {/* 4. THE MASSIVE BACKGROUND LOGO (The "Studio" look) */}
//       <div className="relative mt-20 select-none pointer-events-none">
//         <h2 
//           className="text-[18vw] leading-none text-black/20 font-serif italic tracking-tighter text-center whitespace-nowrap"
//           style={{ fontFamily: 'Blosta, serif' }}
//         >
//           Mulaan
//         </h2>
//       </div>

//     </footer>
//   )
// }


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
    <footer className="relative bg-brand-green pt-32 pb-10 overflow-hidden">
      {/* Top Border Line */}
      <div className="container mx-auto px-6 mb-20">
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