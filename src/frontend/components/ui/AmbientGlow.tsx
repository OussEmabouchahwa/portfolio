'use client'

import { useEffect, useState } from 'react'

export default function AmbientGlow() {
  const [pos, setPos] = useState({ x: -500, y: -500 })

  useEffect(() => {
    const isFine = window.matchMedia('(pointer: fine)').matches
    if (!isFine) return

    const handleMouseMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div
      className="fixed inset-0 pointer-events-none z-[1] transition-opacity duration-500"
      style={{
        background: `radial-gradient(550px circle at ${pos.x}px ${pos.y}px, rgba(0, 240, 255, 0.06), rgba(15, 23, 42, 0.03) 40%, transparent 80%)`,
      }}
    />
  )
}
