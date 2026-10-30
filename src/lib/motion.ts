/**
 * Shared motion tokens — use these in every GSAP and Framer Motion call
 * so easing and duration are defined once.
 */

/** Framer Motion transition array — expo out. */
export const EASE = [0.16, 1, 0.3, 1] as const

/** GSAP ease string — power4.out ≈ expo out, visually matches EASE. */
export const EASE_GSAP = 'power4.out'

/** Duration scale in seconds. */
export const DUR = {
  fast: 0.35,
  base: 0.6,
  slow: 0.9,
} as const

/** Check reduced-motion preference (safe on server: returns false). */
export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}
