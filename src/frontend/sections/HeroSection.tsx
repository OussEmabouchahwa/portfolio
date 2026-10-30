'use client'

/**
 * FRONTEND — Hero Section
 * Dual-layer Layout: Left narrative (7 cols) + Right portrait & unified telemetry console (5 cols).
 * Art-directed editorial balance with subtle baseline offset and authentic personal metadata.
 */
import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowRight, Terminal, Activity, CheckCircle2 } from 'lucide-react'
import { useReducedMotion } from 'framer-motion'
import { EASE_GSAP, DUR } from '@/lib/motion'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [typedIndex, setTypedIndex] = useState(0)
  const reduced = useReducedMotion()

  const codeSnippets = [
    '> Stack: Next.js 16, TypeScript, Tailwind v4',
    '> DB: PostgreSQL, Prisma ORM, Supabase',
    '> Backend: Java, SQL, System Architecture',
    '> Creative: Route Insolite — Travel & Portrait Photography',
    '> Status: Production deployed & active',
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setTypedIndex((prev) => (prev + 1) % codeSnippets.length)
    }, 2800)
    return () => clearInterval(timer)
  }, [codeSnippets.length])

  useEffect(() => {
    if (reduced) return

    const ctx = gsap.context(() => {
      // Staggered hero text reveal
      gsap.fromTo(
        '.hero-line',
        { yPercent: 100, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: DUR.slow,
          stagger: 0.12,
          ease: EASE_GSAP,
          delay: 0.2,
        }
      )

      // Meta info & HUD elements
      gsap.fromTo(
        '.hero-meta',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: DUR.base, ease: EASE_GSAP, delay: 0.45 }
      )

      // Parallax background on scroll
      gsap.to('.hero-bg', {
        yPercent: 15,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [reduced])

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative min-h-screen flex flex-col justify-center pt-28 pb-20 px-6 md:px-12 overflow-hidden border-b border-neutral-900/60"
      aria-label="Hero section"
    >
      {/* Background atmospheric layers */}
      <div className="hero-bg absolute inset-0 -z-10">
        <div
          className="absolute inset-0"
          style={{ background: `radial-gradient(ellipse 65% 45% at 50% -5%, var(--accent-brand-08), transparent)` }}
        />
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-start">
        {/* Left Narrative — 7 cols */}
        <div className="lg:col-span-7 flex flex-col justify-center">
          {/* Status Badge */}
          <div
            className="hero-meta inline-flex items-center gap-2.5 bg-neutral-900/70 border border-neutral-800/80 px-3.5 py-1.5 text-xs text-neutral-300 w-fit mb-8 backdrop-blur-md"
            style={{ borderRadius: 'var(--radius-pill)' }}
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="font-mono text-neutral-300">Available for engineering &amp; creative projects</span>
          </div>

          {/* Headline */}
          <div className="mb-6 lg:max-w-[105%]">
            <div className="split-line">
              <h1 className="hero-line text-[clamp(2.6rem,5.2vw,5.2rem)] font-bold tracking-tight leading-[1.03] text-white">
                Oussema Bouchahwa
              </h1>
            </div>
            <div className="split-line mt-2">
              <h2 className="hero-line text-[clamp(1.5rem,3.2vw,2.8rem)] font-semibold tracking-tight leading-[1.12] text-neutral-400">
                Software Engineer &amp;{' '}
                <span className="text-white border-b-2 border-accent-brand/50 pb-0.5">
                  Visual Technologist
                </span>
              </h2>
            </div>
          </div>

          {/* Subtext */}
          <p className="hero-meta text-neutral-400 text-base md:text-lg leading-relaxed max-w-xl mb-10">
            Full-stack engineering on PostgreSQL, Prisma, and Next.js. Real-world photography at
            Route Insolite in Sfax. Two disciplines, one portfolio.
          </p>

          {/* CTAs */}
          <div className="hero-meta flex flex-wrap items-center gap-4">
            <a
              href="#work"
              className="group flex items-center gap-3 bg-white text-black text-sm font-semibold px-7 py-3.5 hover:bg-neutral-200 transition-all duration-300 shadow-[0_0_25px_rgba(255,255,255,0.12)]"
              style={{ borderRadius: 'var(--radius-pill)' }}
              data-cursor="view"
            >
              See Selected Work
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
            </a>
            <a
              href="#contact"
              className="flex items-center gap-2 border border-neutral-800 bg-neutral-900/50 hover:bg-neutral-800/80 text-sm font-medium text-neutral-300 px-6 py-3.5 transition-all duration-200 backdrop-blur-md"
              style={{ borderRadius: 'var(--radius-pill)' }}
            >
              Get in Touch
            </a>
          </div>

          {/* Grounded Authenticity Ribbon */}
          <div className="hero-meta mt-12 pt-8 border-t border-neutral-900/80 grid grid-cols-1 sm:grid-cols-3 gap-6 font-mono text-xs">
            <div>
              <span className="text-neutral-500 block text-[10px] uppercase tracking-wider mb-1">// Focus 01</span>
              <span className="text-neutral-300 font-medium">PostgreSQL &amp; Next.js</span>
            </div>
            <div>
              <span className="text-neutral-500 block text-[10px] uppercase tracking-wider mb-1">// Focus 02</span>
              <span className="text-neutral-300 font-medium">Route Insolite Visuals</span>
            </div>
            <div>
              <span className="text-neutral-500 block text-[10px] uppercase tracking-wider mb-1">// Base &amp; Studies</span>
              <span className="text-neutral-300 font-medium">IPSAS · Sfax, Tunisia</span>
            </div>
          </div>
        </div>

        {/* Right — portrait + integrated telemetry console (5 cols, slight offset) */}
        <div className="hero-meta lg:col-span-5 flex flex-col gap-5 justify-start lg:pt-10 relative">
          {/* Portrait Container */}
          <div
            className="relative overflow-hidden border border-neutral-800/80 bg-neutral-900/60 shadow-2xl group"
            style={{ borderRadius: 'var(--radius-card)' }}
          >
            <div className="aspect-[4/5] relative overflow-hidden">
              <Image
                src="/my photos/my photo.png"
                alt="Oussema Bouchahwa — Software Engineer and photographer, Sfax Tunisia"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover object-top opacity-90 group-hover:opacity-100 group-hover:scale-[1.03] transition-all duration-700"
                style={{
                  maskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)',
                  WebkitMaskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)',
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent opacity-75" />
            </div>

            {/* Official Logo Watermark */}
            <div
              className="absolute top-4 right-4 bg-neutral-950/80 border border-neutral-800/80 px-2.5 py-1.5 backdrop-blur-md"
              style={{ borderRadius: 'var(--radius-card)' }}
            >
              <Image
                src="/my photos/bo-creation-logo.png"
                alt="BO Creation Official Logo"
                width={52}
                height={30}
                className="object-contain"
              />
            </div>

            {/* Location Pill Overlay on Photo */}
            <div
              className="absolute bottom-4 left-4 font-mono text-[11px] text-neutral-300 bg-neutral-950/80 border border-neutral-800/80 px-3 py-1 backdrop-blur-md flex items-center gap-2"
              style={{ borderRadius: 'var(--radius-pill)' }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-accent-brand" />
              <span>Sfax, Tunisia (34.74° N, 10.76° E)</span>
            </div>
          </div>

          {/* Unified Architectural Console (Combines Telemetry + System Status) */}
          <div
            className="bg-neutral-950/90 border border-neutral-800/90 p-5 shadow-2xl backdrop-blur-xl font-mono text-xs relative overflow-hidden group hover:border-accent-brand/40 transition-colors"
            style={{ borderRadius: 'var(--radius-card)' }}
          >
            {/* Console Header */}
            <div className="flex items-center justify-between border-b border-neutral-800/80 pb-3 mb-3">
              <div className="flex items-center gap-2 text-neutral-400">
                <Terminal className="w-4 h-4 text-accent-brand" />
                <span className="font-semibold tracking-wider text-neutral-300">system.telemetry.log</span>
              </div>
              <div
                className="flex items-center gap-1.5 px-2.5 py-0.5 text-[10px] text-emerald-400 border border-emerald-500/20 bg-emerald-950/40"
                style={{ borderRadius: 'var(--radius-pill)' }}
              >
                <Activity className="w-3 h-3 animate-pulse" />
                <span>ONLINE</span>
              </div>
            </div>

            {/* Console Body */}
            <div className="space-y-1.5 min-h-[50px] flex flex-col justify-center">
              <div className="flex items-center justify-between text-neutral-500 text-[11px]">
                <span>// Route Insolite &amp; Production Stack</span>
                <span className="text-[10px] text-neutral-600">v2.1</span>
              </div>
              <p className="text-accent-brand transition-all duration-300 font-semibold text-xs tracking-tight">
                {codeSnippets[typedIndex]}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
