'use client'

import { useEffect, useState } from 'react'
import { useReducedMotion } from 'framer-motion'

export default function AmbientGlow() {
  const reduced = useReducedMotion()
  const [pos, setPos] = useState({ x: -500, y: -500 })

  useEffect(() => {
    const isFine = window.matchMedia('(pointer: fine)').matches
    if (!isFine || reduced) return

    const handleMouseMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [reduced])

  if (reduced) return null

  return (
    <div
      className="fixed inset-0 pointer-events-none z-[1] transition-opacity duration-500"
      style={{
        background: `radial-gradient(550px circle at ${pos.x}px ${pos.y}px, var(--accent-brand-06), rgba(15, 23, 42, 0.03) 40%, transparent 80%)`,
      }}
    />
  )
}
