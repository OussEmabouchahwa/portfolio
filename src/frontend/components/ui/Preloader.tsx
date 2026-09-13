'use client'

/**
 * FRONTEND — Cinematic Preloader
 * Fires once per session via sessionStorage.
 * Respects prefers-reduced-motion.
 * Rule: Framer Motion ONLY — UI state transition.
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

    setShow(true)
    const timer = setTimeout(() => {
      setShow(false)
    }, 2800) // Increased time slightly for a more cinematic feel

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
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.1 }
          }}
          className="fixed inset-0 z-[10000] bg-neutral-950 flex flex-col items-center justify-center select-none overflow-hidden"
        >
          {/* Subtle animated background gradient glow */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 0.15, scale: 1 }}
            transition={{ duration: 2, ease: "easeOut" }}
            className="absolute w-[600px] h-[600px] bg-cyan-900/30 rounded-full blur-[120px]"
          />

          <div className="flex flex-col items-center gap-6 relative z-10">
            {/* Logo Reveal */}
            <div className="relative w-32 h-32 md:w-40 md:h-40 overflow-hidden">
              <motion.div
                initial={{ opacity: 0, filter: 'blur(20px)', scale: 0.8 }}
                animate={{ opacity: 1, filter: 'blur(0px)', scale: 1 }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className="w-full h-full relative"
              >
                <Image
                  src="/my photos/my logo offeciel.png"
                  alt="Oussema Bouchahwa Logo"
                  fill
                  className="object-contain drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]"
                  priority
                />
              </motion.div>

              {/* Shimmer effect over the logo */}
              <motion.div
                initial={{ x: '-100%', opacity: 0.5 }}
                animate={{ x: '100%', opacity: 0 }}
                transition={{ duration: 1.5, delay: 0.5, ease: 'easeInOut' }}
                className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[-20deg]"
              />
            </div>

            {/* Text Reveal */}
            <div className="flex flex-col items-center gap-2">
              <div className="overflow-hidden">
                <motion.p
                  initial={{ y: '110%' }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.6, delay: 0.8, ease: [0.33, 1, 0.68, 1] }}
                  className="text-white text-sm font-bold tracking-[0.3em] uppercase text-center"
                >
                  Oussema Bouchahwa
                </motion.p>
              </div>

              <div className="overflow-hidden">
                <motion.p
                  initial={{ y: '110%' }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.6, delay: 0.95, ease: [0.33, 1, 0.68, 1] }}
                  className="text-cyan-500/80 text-xs tracking-[0.2em] uppercase text-center"
                >
                  Engineering × Vision
                </motion.p>
              </div>
            </div>

            {/* Loading Bar */}
            <div className="w-48 h-[1px] bg-neutral-800 relative mt-4 overflow-hidden rounded-full">
              <motion.div
                initial={{ x: '-100%' }}
                animate={{ x: '100%' }}
                transition={{ duration: 1.2, delay: 0.5, ease: "easeInOut", repeat: 1 }}
                className="absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
