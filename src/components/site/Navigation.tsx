'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion'
import { X, ArrowUpRight } from 'lucide-react'

export default function Navigation() {
  const { scrollY } = useScroll()
  const [hidden, setHidden] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useMotionValueEvent(scrollY, 'change', (latest) => {
    const previous = scrollY.getPrevious() ?? 0
    if (latest > 180 && latest > previous) {
      setHidden(true)
      setMobileMenuOpen(false)
    } else {
      setHidden(false)
    }
    setIsScrolled(latest > 40)
  })

  const navLinks = [
    { label: 'Work', href: '#work', index: '02' },
    { label: 'Skills', href: '#skills', index: '03' },
    { label: 'Timeline', href: '#experience', index: '04' },
    { label: 'Visuals', href: '#visuals', index: '06' },
    { label: 'Contact', href: '#contact', index: '07' },
  ]

  return (
    <>
      <motion.header
        variants={{
          visible: { y: 0 },
          hidden: { y: '-100%' },
        }}
        animate={hidden ? 'hidden' : 'visible'}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'py-3.5 backdrop-blur-xl bg-neutral-950/80 border-b border-neutral-800/60 shadow-lg shadow-black/20'
            : 'py-6 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Logo Mark */}
          <Link href="#home" className="flex items-center gap-3 group" data-cursor="view">
            <div className="h-9 px-2 py-0.5 rounded-lg border border-neutral-800 bg-neutral-900/70 flex items-center justify-center group-hover:border-accent-brand/50 transition-colors">
              <img
                src="/my photos/bo-creation-logo.png"
                alt="BO Creation Logo"
                className="h-7 w-auto object-contain"
              />
            </div>
            <span className="hidden sm:inline-block font-mono text-[11px] text-neutral-500 pl-2 border-l border-neutral-800/80">
              Sfax, TN
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8 text-xs font-mono uppercase tracking-wider">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-neutral-400 hover:text-white transition-colors duration-200 flex items-center gap-1.5 py-1 group"
                data-cursor="view"
              >
                <span className="text-[10px] text-neutral-600 group-hover:text-accent-brand transition-colors">
                  {link.index}
                </span>
                <span>{link.label}</span>
              </a>
            ))}
          </nav>

          {/* Status Badge & CTA */}
          <div className="hidden lg:flex items-center gap-4 text-xs font-mono">
            <div
              className="flex items-center gap-2 bg-neutral-900/60 border border-neutral-800/80 px-3 py-1.5 text-neutral-400"
              style={{ borderRadius: 'var(--radius-pill)' }}
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span>Available for Work</span>
            </div>

            <a
              href="#contact"
              className="px-3.5 py-1.5 text-white border border-neutral-700/80 hover:border-accent-brand hover:text-accent-brand transition-colors"
              style={{ borderRadius: 'var(--radius-pill)' }}
            >
              Let's Talk
            </a>
          </div>

          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-neutral-400 hover:text-white focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5 text-white" />
            ) : (
              <div className="flex flex-col gap-1.5 w-6 items-end">
                <div className="w-6 h-[1.5px] bg-white transition-all" />
                <div className="w-4 h-[1.5px] bg-accent-brand transition-all" />
              </div>
            )}
          </button>
        </div>
      </motion.header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-x-0 top-[60px] z-30 bg-neutral-950/95 backdrop-blur-2xl border-b border-neutral-800/80 p-6 md:hidden shadow-2xl"
          >
            <div className="flex flex-col gap-5 font-mono text-sm">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between text-neutral-300 hover:text-white py-2 border-b border-neutral-900"
                >
                  <span className="text-xs text-neutral-500">{link.index}</span>
                  <span className="text-base font-sans font-medium text-white">{link.label}</span>
                  <ArrowUpRight className="w-4 h-4 text-accent-brand" />
                </a>
              ))}
              <div className="pt-2 flex items-center justify-between text-xs text-neutral-500">
                <span>Oussema Bouchahwa</span>
                <span className="text-accent-brand">Sfax, Tunisia</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
