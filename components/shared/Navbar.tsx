'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation' 
import { motion, AnimatePresence } from 'framer-motion'
import CartIcon from '@/components/customer/cart/CartIcon'
import { Menu, X } from 'lucide-react'

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const isHomePage = pathname === '/'

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => setIsOpen(false), [pathname])

  // Glassmorphism Logic
  const navBg = isScrolled 
    ? 'bg-brand-green/80 backdrop-blur-xl border-white/10 shadow-2xl' 
    : isHomePage 
      ? 'bg-black/5 backdrop-blur-sm border-white/10' 
      : 'bg-white/30 backdrop-blur-md border-brand-green/5'

  // Text Color Logic: Ensuring contrast against the glass
  const textColor = isScrolled || isHomePage ? 'text-white' : 'text-brand-green'
  const logoColor = isScrolled || isHomePage ? 'text-brand-gold' : 'text-brand-green'

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Collections', href: '/collections' },
    { name: 'Products', href: '/products' },
    { name: 'About', href: '/about' },
  ]

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-[100] flex justify-center p-4 md:p-6 pointer-events-none">
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className={`pointer-events-auto flex items-center justify-between w-full max-w-5xl px-6 md:px-8 py-3 md:py-4 rounded-full border transition-all duration-700 ease-in-out ${navBg}`}
        >
          {/* LOGO */}
          <Link href="/" className="group flex items-center z-[110]">
            <span className={`text-lg md:text-xl tracking-[0.3em] uppercase font-serif italic transition-colors duration-500 ${logoColor}`}>
              Mulaan
            </span>
          </Link>

          {/* DESKTOP NAV LINKS */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => {
              const isActive = pathname === link.href
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`relative text-[10px] tracking-[0.4em] uppercase transition-all duration-300 font-bold hover:text-brand-gold ${isActive ? 'text-brand-gold' : textColor}`}
                >
                  {link.name}
                  {isActive && (
                    <motion.div 
                      layoutId="nav-underline"
                      className="absolute -bottom-1 left-0 right-0 h-[1px] bg-brand-gold"
                    />
                  )}
                </Link>
              )
            })}
          </div>

          {/* RIGHT SIDE */}
          <div className="flex items-center gap-4 md:gap-6 z-[110]">
            <div className="transition-all duration-500">
              <CartIcon />
            </div>
            
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-1"
            >
              {isOpen ? (
                <X className="text-brand-gold" size={24} />
              ) : (
                <Menu className={textColor} size={24} />
              )}
            </button>
          </div>
        </motion.div>
      </nav>

      {/* MOBILE OVERLAY */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[90] bg-brand-green/95 backdrop-blur-2xl flex flex-col items-center justify-center gap-8"
          >
            {navLinks.map((link, i) => (
              <motion.div
                key={link.name}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Link
                  href={link.href}
                  className={`text-2xl tracking-[0.3em] uppercase font-serif italic ${pathname === link.href ? 'text-brand-gold' : 'text-white'}`}
                >
                  {link.name}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}