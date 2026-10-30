'use client'

/**
 * FRONTEND — Cinematic Preloader
 * Fires once per session via sessionStorage.
 * Respects prefers-reduced-motion.
 */
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

export default function Preloader() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) {
      setShow(false)
      return
    }

    // Check if user has already seen the preloader in this session
    try {
      const alreadySeen = sessionStorage.getItem('ob_preloader_seen')
      if (alreadySeen) {
        setShow(false)
        return
      }
      sessionStorage.setItem('ob_preloader_seen', 'true')
    } catch {
      // Ignore storage errors in restricted private browsing
    }

    setShow(true)
    const timer = setTimeout(() => {
      setShow(false)
    }, 1700)

    return () => clearTimeout(timer)
  }, [])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{
            y: '-100%',
            opacity: 0,
            transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1], delay: 0.05 }
          }}
          className="fixed inset-0 z-[10000] bg-neutral-950 flex flex-col items-center justify-center select-none overflow-hidden"
        >
          {/* Subtle animated background gradient glow */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 0.12, scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="absolute w-[500px] h-[500px] rounded-full blur-[120px]"
            style={{ background: 'var(--accent-brand-20)' }}
          />

          <div className="flex flex-col items-center gap-6 relative z-10">
            {/* Logo Reveal */}
            <div className="relative w-44 h-24 md:w-56 md:h-32 overflow-hidden">
              <motion.div
                initial={{ opacity: 0, filter: 'blur(16px)', scale: 0.85 }}
                animate={{ opacity: 1, filter: 'blur(0px)', scale: 1 }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                className="w-full h-full relative"
              >
                <Image
                  src="/my photos/bo-creation-logo.png"
                  alt="BO Creation Logo"
                  fill
                  className="object-contain drop-shadow-[0_0_20px_rgba(0,240,255,0.25)]"
                  priority
                />
              </motion.div>

              {/* Shimmer effect over logo */}
              <motion.div
                initial={{ x: '-100%', opacity: 0.4 }}
                animate={{ x: '100%', opacity: 0 }}
                transition={{ duration: 1.2, delay: 0.4, ease: 'easeInOut' }}
                className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[-20deg]"
              />
            </div>

            {/* Typography Reveal */}
            <div className="flex flex-col items-center gap-1.5">
              <div className="overflow-hidden">
                <motion.p
                  initial={{ y: '110%' }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5, ease: [0.33, 1, 0.68, 1] }}
                  className="text-white text-xs font-bold tracking-[0.3em] uppercase text-center font-mono"
                >
                  Oussema Bouchahwa
                </motion.p>
              </div>

              <div className="overflow-hidden">
                <motion.p
                  initial={{ y: '110%' }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.5, delay: 0.65, ease: [0.33, 1, 0.68, 1] }}
                  className="text-accent-brand text-[10px] tracking-[0.25em] uppercase text-center font-mono"
                >
                  Engineering × Vision
                </motion.p>
              </div>
            </div>

            {/* Minimalist Progress Line */}
            <div className="w-40 h-[1px] bg-neutral-800 relative mt-3 overflow-hidden rounded-full">
              <motion.div
                initial={{ x: '-100%' }}
                animate={{ x: '100%' }}
                transition={{ duration: 1, delay: 0.3, ease: "easeInOut", repeat: 1 }}
                className="absolute inset-0 w-1/2"
                style={{ background: 'linear-gradient(90deg, transparent, var(--accent-brand), transparent)' }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
