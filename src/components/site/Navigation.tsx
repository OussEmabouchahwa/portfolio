'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, useScroll, useMotionValueEvent } from 'framer-motion'

export default function Navigation() {
  const { scrollY } = useScroll()
  const [hidden, setHidden] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious()
    if (latest > 150 && latest > previous!) {
      setHidden(true)
    } else {
      setHidden(false)
    }
    setIsScrolled(latest > 50)
  })

  return (
    <motion.header
      variants={{
        visible: { y: 0 },
        hidden: { y: "-100%" },
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled ? 'py-4 backdrop-blur-md bg-neutral-950/80 border-b border-white/5' : 'py-8 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        <Link href="/" className="font-bold tracking-tighter text-xl">
          OB.
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          <Link href="#work" className="hover:text-white text-neutral-400 transition-colors">Work</Link>
          <Link href="#experience" className="hover:text-white text-neutral-400 transition-colors">Experience</Link>
          <Link href="#visuals" className="hover:text-white text-neutral-400 transition-colors">Visuals</Link>
          <Link href="#contact" className="hover:text-white text-neutral-400 transition-colors">Contact</Link>
        </nav>

        <div className="hidden md:flex items-center gap-3 text-sm">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-neutral-400">Available for opportunities</span>
        </div>

        {/* Mobile Menu Button - Simplistic mock */}
        <button className="md:hidden flex flex-col gap-1.5 p-2">
          <div className="w-6 h-[1.5px] bg-white" />
          <div className="w-4 h-[1.5px] bg-white ml-auto" />
        </button>
      </div>
    </motion.header>
  )
}
