'use client'

/**
 * FRONTEND — Cinematic Preloader
 * Fires once per session via sessionStorage.
 * Respects prefers-reduced-motion.
 * Rule: Framer Motion ONLY — UI state transition.
 */
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Preloader() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const hasLoaded = sessionStorage.getItem('ob_loaded')
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (hasLoaded || prefersReduced) {
      setShow(false)
      return
    }

    setShow(true)
    const timer = setTimeout(() => {
      setShow(false)
      sessionStorage.setItem('ob_loaded', '1')
    }, 1800)

    return () => clearTimeout(timer)
  }, [])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{
            clipPath: 'inset(0 0 100% 0)',
            transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1], delay: 0.2 }
          }}
          className="fixed inset-0 z-[10000] bg-neutral-950 flex flex-col items-center justify-center select-none"
        >
          <div className="flex flex-col items-center gap-3">
            <div className="overflow-hidden">
              <motion.p
                initial={{ y: '110%' }}
                animate={{ y: 0 }}
                transition={{ duration: 0.55, delay: 0.1, ease: [0.33, 1, 0.68, 1] }}
                className="text-white text-sm font-bold tracking-[0.3em] uppercase"
              >
                Oussema Bouchahwa
              </motion.p>
            </div>

            <div className="overflow-hidden">
              <motion.p
                initial={{ y: '110%' }}
                animate={{ y: 0 }}
                transition={{ duration: 0.55, delay: 0.25, ease: [0.33, 1, 0.68, 1] }}
                className="text-neutral-600 text-xs tracking-[0.2em] uppercase"
              >
                Software × Design × Visuals
              </motion.p>
            </div>

            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.1, delay: 0.5, ease: [0.33, 1, 0.68, 1] }}
              className="w-40 h-px bg-neutral-800 origin-left mt-4"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
