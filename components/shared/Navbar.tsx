'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'
import CartIcon from '@/components/customer/cart/CartIcon'
import { Menu, X } from 'lucide-react'

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const isHomePage = pathname === '/'

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    handleScroll(); window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  useEffect(() => setIsOpen(false), [pathname])

  const navBg = isScrolled ? 'bg-brand-green/80 backdrop-blur-xl border-white/10 shadow-2xl' : isHomePage ? 'bg-black/5 backdrop-blur-sm border-white/10' : 'bg-white/80 backdrop-blur-xl border-brand-green/10 shadow-sm'
  const textColor = isScrolled || isHomePage ? 'text-white' : 'text-brand-green'
  const logoColor = isScrolled || isHomePage ? 'text-brand-gold' : 'text-brand-green'
  const navLinks = [
    { name: 'Home', href: '/' }, { name: 'Gallery', href: '/collections' },
    { name: 'Products', href: '/products' }, { name: 'Sale', href: '/sale', accent: true },
    // { name: 'About', href: '/about' },
  ]

  return <>
    <nav className="pointer-events-none fixed inset-x-0 top-0 z-[100] flex justify-center p-4 md:p-6">
      <motion.div initial={{ y: -100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className={`pointer-events-auto flex w-full max-w-5xl items-center justify-between rounded-full border px-6 py-3 transition-all duration-700 md:px-8 md:py-4 ${navBg}`}>
        <Link href="/" className="z-[110] flex items-center"><span className={`font-serif text-lg uppercase italic tracking-[0.3em] transition-colors md:text-xl ${logoColor}`}>Mulaan</span></Link>
        <div className="hidden items-center gap-8 md:flex lg:gap-10">{navLinks.map((link) => { const active = pathname === link.href; return <Link key={link.name} href={link.href} className={`relative text-[10px] font-bold uppercase tracking-[0.35em] transition-all hover:text-brand-gold ${active || link.accent ? 'text-brand-gold' : textColor}`}>{link.name}{active && <motion.div layoutId="nav-underline" className="absolute -bottom-1 inset-x-0 h-px bg-brand-gold" />}</Link> })}</div>
        <div className="z-[110] flex items-center gap-4 md:gap-6"><CartIcon /><button type="button" aria-label={isOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={isOpen} onClick={() => setIsOpen(!isOpen)} className="p-1 md:hidden">{isOpen ? <X className="text-brand-gold" size={24} /> : <Menu className={textColor} size={24} />}</button></div>
      </motion.div>
    </nav>
    <AnimatePresence>{isOpen && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[90] flex flex-col items-center justify-center gap-8 bg-brand-green/95 backdrop-blur-2xl">{navLinks.map((link, index) => <motion.div key={link.name} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }}><Link href={link.href} className={`font-serif text-2xl uppercase italic tracking-[0.3em] ${pathname === link.href || link.accent ? 'text-brand-gold' : 'text-white'}`}>{link.name}</Link></motion.div>)}</motion.div>}</AnimatePresence>
  </>
}
