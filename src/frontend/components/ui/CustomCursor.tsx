'use client'

/**
 * FRONTEND — Custom Cursor
 * Rule: Framer Motion ONLY — state-based UI interaction. Desktop only.
 * Uses data-cursor attributes: "view" | "play" | "drag"
 */
import { useEffect, useState } from 'react'
import { motion, type TargetAndTransition } from 'framer-motion'

type CursorVariant = 'default' | 'hover' | 'view' | 'play' | 'drag'

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 })
  const [variant, setVariant] = useState<CursorVariant>('default')
  const [active, setActive] = useState(false)

  useEffect(() => {
    // Enable custom cursor only on desktop devices with fine pointer (mouse)
    const isPointerFine = window.matchMedia('(pointer: fine)').matches
    if (!isPointerFine) return

    setActive(true)
    document.documentElement.classList.add('custom-cursor-active')

    const moveCursor = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY })
    }

    const detectVariant = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const dataCursor = target.closest('[data-cursor]')?.getAttribute('data-cursor')

      if (dataCursor === 'view') return setVariant('view')
      if (dataCursor === 'play') return setVariant('play')
      if (dataCursor === 'drag') return setVariant('drag')

      const isInteractive =
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        !!target.closest('a') ||
        !!target.closest('button')

      setVariant(isInteractive ? 'hover' : 'default')
    }

    window.addEventListener('mousemove', moveCursor)
    window.addEventListener('mouseover', detectVariant)

    return () => {
      document.documentElement.classList.remove('custom-cursor-active')
      window.removeEventListener('mousemove', moveCursor)
      window.removeEventListener('mouseover', detectVariant)
    }
  }, [])

  if (!active) return null

  const ringVariants: Record<CursorVariant, TargetAndTransition> = {
    default: { width: 32, height: 32, x: pos.x - 16, y: pos.y - 16, backgroundColor: 'rgba(0,0,0,0)', border: '1px solid rgba(255,255,255,0.4)' },
    hover:   { width: 56, height: 56, x: pos.x - 28, y: pos.y - 28, backgroundColor: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.8)' },
    view:    { width: 80, height: 80, x: pos.x - 40, y: pos.y - 40, backgroundColor: 'rgba(255,255,255,0.9)', border: 'none' },
    play:    { width: 80, height: 80, x: pos.x - 40, y: pos.y - 40, backgroundColor: 'rgba(255,255,255,0.9)', border: 'none' },
    drag:    { width: 80, height: 80, x: pos.x - 40, y: pos.y - 40, backgroundColor: 'rgba(255,255,255,0.9)', border: 'none' },
  }

  const label: Partial<Record<CursorVariant, string>> = {
    view: 'VIEW', play: 'PLAY', drag: 'DRAG'
  }

  return (
    <>
      {/* Outer ring */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[9998] flex items-center justify-center backdrop-blur-[1px]"
        animate={ringVariants[variant]}
        transition={{ type: 'spring', stiffness: 450, damping: 30, mass: 0.3 }}
      >
        {label[variant] && (
          <span className="text-black text-[10px] font-bold tracking-widest select-none">
            {label[variant]}
          </span>
        )}
      </motion.div>

      {/* Inner dot */}
      <div
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-white pointer-events-none z-[9999] shadow-[0_0_8px_rgba(255,255,255,0.8)]"
        style={{ transform: `translate(${pos.x - 4}px, ${pos.y - 4}px)` }}
      />
    </>
  )
}
