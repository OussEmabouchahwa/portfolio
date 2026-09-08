'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Only run the preloader once per session
    const hasLoaded = sessionStorage.getItem('oussema_portfolio_loaded')
    
    if (hasLoaded) {
      setIsLoading(false)
      return
    }

    const timer = setTimeout(() => {
      setIsLoading(false)
      sessionStorage.setItem('oussema_portfolio_loaded', 'true')
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, clipPath: 'inset(100% 0 0 0)' }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[100] bg-neutral-950 flex flex-col items-center justify-center text-white"
        >
          <div className="overflow-hidden">
            <motion.h1 
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
              className="text-sm md:text-base font-bold tracking-widest"
            >
              OUSSEMA BOUCHAHWA
            </motion.h1>
          </div>
          
          <div className="overflow-hidden mt-2">
            <motion.p
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
              className="text-xs text-neutral-500 tracking-[0.2em]"
            >
              SOFTWARE × DESIGN × VISUALS
            </motion.p>
          </div>

          <motion.div 
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 0.8, ease: "easeInOut" }}
            className="w-48 h-[1px] bg-white/20 mt-8 origin-left"
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
