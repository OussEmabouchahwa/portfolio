'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [cursorVariant, setCursorVariant] = useState('default')
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined' && window.innerWidth < 768) {
      setIsMobile(true)
      return
    }

    const mouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY
      })
    }

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      
      if (target.tagName.toLowerCase() === 'a' || target.tagName.toLowerCase() === 'button' || target.closest('a') || target.closest('button')) {
        setCursorVariant('hover')
      } else if (target.closest('[data-cursor="view"]')) {
        setCursorVariant('view')
      } else if (target.closest('[data-cursor="play"]')) {
        setCursorVariant('play')
      } else if (target.closest('[data-cursor="drag"]')) {
        setCursorVariant('drag')
      } else {
        setCursorVariant('default')
      }
    }

    window.addEventListener('mousemove', mouseMove)
    window.addEventListener('mouseover', handleMouseOver)

    return () => {
      window.removeEventListener('mousemove', mouseMove)
      window.removeEventListener('mouseover', handleMouseOver)
    }
  }, [])

  if (isMobile) return null

  const variants = {
    default: {
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
      height: 32,
      width: 32,
      backgroundColor: 'transparent',
      border: '1px solid rgba(255, 255, 255, 0.3)',
      mixBlendMode: 'difference' as const,
    },
    hover: {
      x: mousePosition.x - 32,
      y: mousePosition.y - 32,
      height: 64,
      width: 64,
      backgroundColor: 'rgba(255, 255, 255, 1)',
      border: 'none',
      mixBlendMode: 'difference' as const,
    },
    view: {
      x: mousePosition.x - 40,
      y: mousePosition.y - 40,
      height: 80,
      width: 80,
      backgroundColor: 'rgba(255, 255, 255, 1)',
      mixBlendMode: 'normal' as const,
    },
    play: {
      x: mousePosition.x - 40,
      y: mousePosition.y - 40,
      height: 80,
      width: 80,
      backgroundColor: 'rgba(255, 255, 255, 1)',
      mixBlendMode: 'normal' as const,
    }
  }

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-50 flex items-center justify-center text-black font-bold text-xs"
        variants={variants}
        animate={cursorVariant}
        transition={{ type: 'spring', stiffness: 500, damping: 28, mass: 0.5 }}
      >
        {cursorVariant === 'view' && <span>VIEW</span>}
        {cursorVariant === 'play' && <span>PLAY</span>}
        {cursorVariant === 'drag' && <span>DRAG</span>}
      </motion.div>
      <div 
        className="fixed top-0 left-0 w-2 h-2 bg-white rounded-full pointer-events-none z-50 mix-blend-difference transition-transform duration-75"
        style={{
          transform: `translate(${mousePosition.x - 4}px, ${mousePosition.y - 4}px)`
        }}
      />
    </>
  )
}
