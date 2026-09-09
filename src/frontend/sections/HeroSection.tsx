'use client'

/**
 * FRONTEND — Hero Section
 * Dual-layer Layout: Left narrative + Right Real Portrait Visual & HUD floating terminal & system metrics.
 */
import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowRight, Terminal, Activity, CheckCircle2 } from 'lucide-react'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [typedIndex, setTypedIndex] = useState(0)

  const codeSnippets = [
    "> Stack: Next.js 15, TypeScript, Tailwind v4",
    "> DB: PostgreSQL, Prisma ORM, Supabase",
    "> Tech: Java, SQL, System Architecture",
    "> Creative: Photography, Videography, AI Visuals",
    "> Status: Production Ready & Deployed"
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setTypedIndex((prev) => (prev + 1) % codeSnippets.length)
    }, 2800)
    return () => clearInterval(timer)
  }, [codeSnippets.length])

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Staggered hero text reveal
      gsap.fromTo(
        '.hero-line',
        { yPercent: 100, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 1.1,
          stagger: 0.15,
          ease: 'power4.out',
          delay: 0.2,
        }
      )

      // Meta info & HUD elements
      gsap.fromTo(
        '.hero-meta',
        { opacity: 0, y: 25 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: 0.6 }
      )

      // Parallax background on scroll
      gsap.to('.hero-bg', {
        yPercent: 20,
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
  }, [])

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative min-h-screen flex flex-col justify-center pt-28 pb-16 px-6 md:px-12 overflow-hidden border-b border-neutral-900/60"
      aria-label="Hero section"
    >
      {/* Background layers */}
      <div className="hero-bg absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_-10%,rgba(0,240,255,0.08),transparent)]" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Narrative */}
        <div className="lg:col-span-7 flex flex-col justify-center">
          {/* Status Badge */}
          <div className="hero-meta inline-flex items-center gap-2.5 bg-neutral-900/80 border border-neutral-800/80 px-4 py-2 rounded-full text-xs text-neutral-300 w-fit mb-8 backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="font-mono text-emerald-400">Available for Software & Creative Projects</span>
          </div>

          {/* Headline */}
          <div className="mb-6">
            <div className="split-line">
              <h1 className="hero-line text-[clamp(2.5rem,5.5vw,5.2rem)] font-bold tracking-tight leading-[1.05]">
                Oussema Bouchahwa
              </h1>
            </div>
            <div className="split-line">
              <h2 className="hero-line text-[clamp(1.8rem,3.8vw,3.5rem)] font-semibold tracking-tight leading-[1.1] text-neutral-400">
                Software Engineer & <span className="text-white underline decoration-neutral-700 underline-offset-8">Creative Technologist</span>
              </h2>
            </div>
          </div>

          {/* Narrative Subtext */}
          <p className="hero-meta text-neutral-400 text-base md:text-lg leading-relaxed max-w-xl mb-10">
            Bridging low-level architecture, high-level web systems, and visual storytelling. Engineering scalable digital products from Sfax, Tunisia.
          </p>

          {/* CTAs */}
          <div className="hero-meta flex flex-wrap items-center gap-5">
            <a
              href="#work"
              className="group flex items-center gap-3 bg-white text-black text-sm font-semibold px-7 py-3.5 rounded-full hover:bg-neutral-200 transition-all duration-300 shadow-[0_0_25px_rgba(255,255,255,0.15)]"
              data-cursor="view"
            >
              Explore Work
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
            </a>
            <a
              href="#contact"
              className="flex items-center gap-2 border border-neutral-800 bg-neutral-900/50 hover:bg-neutral-800/80 text-sm font-medium text-neutral-300 px-6 py-3.5 rounded-full transition-all duration-200 backdrop-blur-md"
            >
              Contact Me
            </a>
          </div>
        </div>

        {/* Right Section: Real Portrait + Floating Developer HUD Canvas */}
        <div className="hero-meta lg:col-span-5 flex flex-col gap-6 justify-center relative">
          {/* Oussema's Real Portrait Canvas */}
          <div className="relative rounded-3xl overflow-hidden border border-neutral-800/80 bg-neutral-900/60 shadow-2xl group">
            <div className="aspect-[4/5] relative overflow-hidden">
              <img
                src="/my photos/my photo.jpg"
                alt="Oussema Bouchahwa"
                className="w-full h-full object-cover object-top opacity-85 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                style={{
                  maskImage: 'linear-gradient(to bottom, black 75%, transparent 100%)',
                  WebkitMaskImage: 'linear-gradient(to bottom, black 75%, transparent 100%)'
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent opacity-80" />
            </div>

            {/* Overlaid Brand Identity Mark */}
            <div className="absolute top-4 right-4 bg-neutral-950/80 border border-neutral-800 p-2 rounded-2xl backdrop-blur-md">
              <img
                src="/my photos/my logo offeciel.png"
                alt="OB Logo"
                className="w-8 h-8 object-contain"
              />
            </div>
          </div>

          {/* Card 1: Live Terminal HUD */}
          <div className="bg-neutral-950/90 border border-neutral-800 rounded-2xl p-5 shadow-2xl backdrop-blur-xl font-mono text-xs relative overflow-hidden group hover:border-cyan-500/50 transition-colors">
            <div className="flex items-center justify-between border-b border-neutral-800/80 pb-3 mb-3">
              <div className="flex items-center gap-2 text-neutral-400">
                <Terminal className="w-4 h-4 text-cyan-400" />
                <span className="font-semibold tracking-wider text-neutral-300">system.stream.log</span>
              </div>
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-neutral-800" />
                <div className="w-2.5 h-2.5 rounded-full bg-neutral-800" />
                <div className="w-2.5 h-2.5 rounded-full bg-neutral-800" />
              </div>
            </div>

            <div className="space-y-2 min-h-[60px] flex flex-col justify-center">
              <p className="text-neutral-500">// Real-time system telemetry</p>
              <p className="text-cyan-300 transition-all duration-300 font-semibold">
                {codeSnippets[typedIndex]}
              </p>
            </div>
          </div>

          {/* Card 2: Engineering Metric Node */}
          <div className="bg-neutral-900/60 border border-neutral-800/80 rounded-2xl p-5 backdrop-blur-md flex items-center justify-between hover:border-neutral-700 transition-colors">
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-cyan-950/40 border border-cyan-500/20 flex items-center justify-center">
                <Activity className="w-5 h-5 text-cyan-400 animate-pulse" />
              </div>
              <div>
                <p className="text-xs text-neutral-500 uppercase tracking-widest font-mono">Live Deployment</p>
                <p className="text-sm font-semibold text-white">Route Insolite v2.1</p>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-emerald-950/40 border border-emerald-500/20 px-3 py-1 rounded-full text-[11px] font-mono text-emerald-400">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>ONLINE</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
