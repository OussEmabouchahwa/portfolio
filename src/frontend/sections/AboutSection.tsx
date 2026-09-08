'use client'

/**
 * FRONTEND — About Section & Dual Identity
 * Highlights the 4 pillars: System Engineering, Product & Web, Visual Media, AI Visuals.
 */
import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Database, Layout, Camera, Sparkles } from 'lucide-react'

if (typeof window !== 'undefined') gsap.registerPlugin(ScrollTrigger)

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [activePillar, setActivePillar] = useState<number | null>(null)

  const pillars = [
    {
      id: 1,
      title: 'System Engineering',
      icon: Database,
      desc: 'Backend architecture, SQL database modeling, and clean object-oriented patterns in Java & C++.',
      badge: 'Engineering Core'
    },
    {
      id: 2,
      title: 'Product & Web',
      icon: Layout,
      desc: 'Full-stack web apps, dynamic UIs with Next.js & React 19, RESTful APIs, and Prisma ORM.',
      badge: 'Full-Stack'
    },
    {
      id: 3,
      title: 'Visual Media',
      icon: Camera,
      desc: 'DSLR/Mirrorless photography, color grading in DaVinci Resolve, and cinematic video editing.',
      badge: 'Visual Arts'
    },
    {
      id: 4,
      title: 'AI Visuals & Next-Gen',
      icon: Sparkles,
      desc: 'Generative AI compositing, prompt engineering, and prompt-driven video synthesis workflows.',
      badge: 'AI Pipeline'
    }
  ]

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.about-reveal',
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 0.9, stagger: 0.12, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' }
        }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="about" className="py-32 px-6 md:px-12 border-t border-neutral-900">
      <div className="max-w-7xl mx-auto">
        <p className="section-label about-reveal">01 — Dual Identity</p>

        <h2 className="about-reveal text-3xl md:text-5xl lg:text-6xl font-bold leading-tight mb-12 max-w-3xl">
          Engineer by training.<br />
          Creator by&nbsp;nature.
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20">
          <div className="about-reveal lg:col-span-7 space-y-6 text-neutral-400 leading-relaxed text-base md:text-lg">
            <p>
              Currently pursuing a Software Engineering Degree at{' '}
              <span className="text-white font-semibold">IPSAS Sfax</span> (Year 2), following a Technician Diploma in Multimedia & Web Development from{' '}
              <span className="text-white font-semibold">ISET Djerba</span>.
            </p>
            <p>
              My journey sits intentionally at the crossroads of strict backend engineering, modern web performance, and expressive visual design. Whether architecting database schemas or grading 4K footage, I treat every project as a complete system.
            </p>
            <div className="flex flex-wrap gap-4 pt-2 font-mono text-xs text-neutral-400">
              <span className="bg-neutral-900 border border-neutral-800 px-3 py-1.5 rounded-full">📍 Sfax, Tunisia</span>
              <span className="bg-neutral-900 border border-neutral-800 px-3 py-1.5 rounded-full">🎓 IPSAS Sfax (Computer Science)</span>
              <span className="bg-neutral-900 border border-neutral-800 px-3 py-1.5 rounded-full">🎓 ISET Djerba (Multimedia)</span>
            </div>
          </div>

          <div className="about-reveal lg:col-span-5 flex flex-col justify-center bg-neutral-900/40 border border-neutral-800/80 rounded-2xl p-8 backdrop-blur-md">
            <p className="text-xs text-neutral-500 font-mono tracking-widest uppercase mb-4">// Executive Approach</p>
            <div className="space-y-2">
              <p className="text-2xl md:text-3xl font-bold text-white">Understand the Problem.</p>
              <p className="text-2xl md:text-3xl font-bold text-neutral-500">Architect the Solution.</p>
              <p className="text-2xl md:text-3xl font-bold text-neutral-600">Elevate the Design.</p>
              <p className="text-2xl md:text-3xl font-bold text-neutral-700">Ship to Production.</p>
            </div>
          </div>
        </div>

        {/* 4 Pillars Matrix */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar) => {
            const Icon = pillar.icon
            const isHovered = activePillar === pillar.id
            return (
              <div
                key={pillar.id}
                onMouseEnter={() => setActivePillar(pillar.id)}
                onMouseLeave={() => setActivePillar(null)}
                className={`about-reveal p-6 rounded-2xl border transition-all duration-300 backdrop-blur-sm cursor-pointer ${
                  isHovered
                    ? 'bg-neutral-900/90 border-cyan-500/50 shadow-[0_0_20px_rgba(0,240,255,0.08)]'
                    : 'bg-neutral-900/40 border-neutral-800/80 hover:border-neutral-700'
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                    isHovered ? 'bg-cyan-950/60 text-cyan-400' : 'bg-neutral-800/80 text-neutral-400'
                  }`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="font-mono text-[10px] text-neutral-500 bg-neutral-950 px-2.5 py-1 rounded-full border border-neutral-800">
                    {pillar.badge}
                  </span>
                </div>
                <h3 className="font-bold text-lg text-white mb-2">{pillar.title}</h3>
                <p className="text-neutral-400 text-sm leading-relaxed">{pillar.desc}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
