'use client'

/**
 * FRONTEND — Navigation
 * Floating, hide-on-scroll-down, reveal-on-scroll-up.
 * Rule: Framer Motion ONLY — UI state transition.
 */
import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion'
import { X, Menu } from 'lucide-react'

const navLinks = [
  { label: 'Work', href: '#work' },
  { label: 'Experience', href: '#experience' },
  { label: 'Skills', href: '#skills' },
  { label: 'Visuals', href: '#visuals' },
  { label: 'Contact', href: '#contact' },
]

export default function Navigation() {
  const { scrollY } = useScroll()
  const [hidden, setHidden] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useMotionValueEvent(scrollY, 'change', (latest) => {
    const prev = scrollY.getPrevious() ?? 0
    setHidden(latest > 100 && latest > prev)
    setScrolled(latest > 60)
  })

  return (
    <>
      <motion.header
        variants={{ visible: { y: 0 }, hidden: { y: '-100%' } }}
        animate={hidden && !menuOpen ? 'hidden' : 'visible'}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className={`fixed top-0 inset-x-0 z-40 transition-all duration-300 ${
          scrolled
            ? 'py-4 backdrop-blur-xl bg-neutral-950/80 border-b border-white/5'
            : 'py-7 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group" aria-label="Go to homepage">
            <div className="h-10 px-2.5 py-1 rounded-xl border border-neutral-800 bg-neutral-900/80 flex items-center justify-center group-hover:border-accent-brand/60 group-hover:shadow-[0_0_15px_var(--accent-brand-20)] transition-all duration-300">
              <img
                src="/my photos/bo-creation-logo.png"
                alt="BO Creation Logo"
                className="h-8 w-auto object-contain"
              />
            </div>
            <span className="text-sm font-bold tracking-tight text-white group-hover:text-accent-brand transition-colors hidden sm:inline-block font-mono">
              BO.creation
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm font-medium text-neutral-400 hover:text-white transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Status badge */}
          <div className="hidden md:flex items-center gap-2.5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="text-xs text-neutral-400">Available for opportunities</span>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden relative z-50 p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </motion.header>

      {/* Mobile Fullscreen Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
            animate={{ opacity: 1, clipPath: 'inset(0 0 0% 0)' }}
            exit={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-30 bg-neutral-950 flex flex-col items-center justify-center"
          >
            <nav className="flex flex-col items-center gap-10" aria-label="Mobile navigation">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.07, ease: [0.33, 1, 0.68, 1] }}
                  onClick={() => setMenuOpen(false)}
                  className="text-4xl font-bold text-white hover:text-neutral-400 transition-colors"
                >
                  {link.label}
                </motion.a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
