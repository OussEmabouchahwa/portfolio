'use client'

/**
 * FRONTEND — About Section
 * Four-pillar identity matrix with architectural alignment.
 * Anchored in Oussema's dual background: IPSAS software engineering & Route Insolite visual production.
 */
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Database, Layout, Camera, Sparkles, MapPin, GraduationCap } from 'lucide-react'
import { useReducedMotion } from 'framer-motion'
import { EASE_GSAP, DUR } from '@/lib/motion'

if (typeof window !== 'undefined') gsap.registerPlugin(ScrollTrigger)

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()

  const pillars = [
    {
      index: '01',
      title: 'System Engineering',
      icon: Database,
      desc: 'Relational data modeling, query optimization in SQL, and structured application architecture in Java and C++.',
      badge: 'Engineering Core',
    },
    {
      index: '02',
      title: 'Full-Stack Web',
      icon: Layout,
      desc: 'Next.js 16, TypeScript, Prisma ORM, and PostgreSQL on Supabase — built for low latency and high availability.',
      badge: 'Full-Stack',
    },
    {
      index: '03',
      title: 'Travel Photography',
      icon: Camera,
      desc: 'On-location visual direction for Route Insolite: couples, travel expeditions, and color grading in DaVinci Resolve.',
      badge: 'Visual Arts',
    },
    {
      index: '04',
      title: 'AI Synthesis Pipeline',
      icon: Sparkles,
      desc: 'Midjourney prompt workflows, Runway Gen-2 video experiments, and compositing for editorial visual assets.',
      badge: 'AI Direction',
    },
  ]

  const methodSteps = [
    { step: '01', title: 'Define the problem', desc: 'Identify core operational bottlenecks.' },
    { step: '02', title: 'Model the database', desc: 'Normalized tables, indices, and constraints.' },
    { step: '03', title: 'Craft the interface', desc: 'High visual craft meets responsive ergonomics.' },
    { step: '04', title: 'Ship & observe', desc: 'Deploy to production and measure telemetry.' },
  ]

  useEffect(() => {
    if (reduced) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.about-reveal',
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: DUR.base,
          stagger: 0.08,
          ease: EASE_GSAP,
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
        }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [reduced])

  return (
    <section ref={sectionRef} id="about" className="py-32 px-6 md:px-12 border-t border-neutral-900">
      <div className="max-w-7xl mx-auto">
        <p className="section-label about-reveal">01 / Dual Identity</p>

        <h2 className="about-reveal text-3xl md:text-5xl lg:text-6xl font-bold leading-tight mb-12 max-w-3xl">
          Engineer by training.<br />
          Creator by&nbsp;practice.
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 mb-20 items-stretch">
          {/* Narrative Column */}
          <div className="about-reveal lg:col-span-7 flex flex-col justify-between space-y-6 text-neutral-400 leading-relaxed text-base md:text-lg">
            <div className="space-y-5">
              <p>
                Currently in Year 2 of the Software Engineering cycle at{' '}
                <span className="text-white font-semibold">IPSAS Sfax</span>, following a
                Technician Diploma in Multimedia and Web from{' '}
                <span className="text-white font-semibold">ISET Djerba</span>. The combination is
                deliberate — systems thinking from engineering, visual discipline from multimedia.
              </p>
              <p>
                At Route Insolite, I designed and built the complete reservation management platform,
                then joined field expeditions across Tunisia shooting travel sessions and promotional films.
                Both practices demand the same discipline: clarify the problem, execute without shortcuts, and finish the details.
              </p>
            </div>

            {/* Academic & Geographic Credibility Pills */}
            <div className="flex flex-wrap gap-2.5 pt-4 font-mono text-xs text-neutral-400">
              <span
                className="flex items-center gap-2 bg-neutral-900/80 border border-neutral-800 px-3.5 py-1.5"
                style={{ borderRadius: 'var(--radius-pill)' }}
              >
                <MapPin className="w-3.5 h-3.5 text-accent-brand" />
                Sfax, Tunisia
              </span>
              <span
                className="flex items-center gap-2 bg-neutral-900/80 border border-neutral-800 px-3.5 py-1.5"
                style={{ borderRadius: 'var(--radius-pill)' }}
              >
                <GraduationCap className="w-3.5 h-3.5 text-accent-brand" />
                IPSAS — Computer Engineering
              </span>
              <span
                className="flex items-center gap-2 bg-neutral-900/80 border border-neutral-800 px-3.5 py-1.5"
                style={{ borderRadius: 'var(--radius-pill)' }}
              >
                <GraduationCap className="w-3.5 h-3.5 text-accent-brand" />
                ISET Djerba — Multimedia
              </span>
            </div>
          </div>

          {/* Working Method Manifesto Card */}
          <div
            className="about-reveal lg:col-span-5 flex flex-col justify-between bg-neutral-900/40 border border-neutral-800/80 p-8 backdrop-blur-md"
            style={{ borderRadius: 'var(--radius-card)' }}
          >
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="text-xs text-neutral-500 font-mono tracking-widest uppercase">// Working Method</span>
                <span className="font-mono text-[10px] text-accent-brand">04 Stages</span>
              </div>

              <div className="space-y-4">
                {methodSteps.map((item) => (
                  <div key={item.step} className="flex items-start gap-4 pb-3 border-b border-neutral-800/50 last:border-b-0 last:pb-0">
                    <span className="font-mono text-xs text-accent-brand mt-0.5">{item.step}</span>
                    <div>
                      <p className="text-white font-semibold text-sm leading-snug">{item.title}</p>
                      <p className="text-neutral-500 text-xs mt-0.5">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-neutral-800/60 font-mono text-[11px] text-neutral-500 flex items-center justify-between">
              <span>Standard: Production Ready</span>
              <span className="text-neutral-400">Zero Shortcuts</span>
            </div>
          </div>
        </div>

        {/* 4 Pillars Grid with Architectural Balance */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar) => {
            const Icon = pillar.icon
            return (
              <div
                key={pillar.index}
                className="about-reveal p-6 border transition-all duration-300 backdrop-blur-sm cursor-default group
                  bg-neutral-900/40 border-neutral-800/80 hover:border-accent-brand/40
                  hover:shadow-[0_0_20px_var(--accent-brand-08)] flex flex-col justify-between min-h-[220px]"
                style={{ borderRadius: 'var(--radius-card)' }}
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div
                      className="w-10 h-10 flex items-center justify-center bg-neutral-800/80 text-neutral-400 group-hover:bg-neutral-900 group-hover:text-accent-brand transition-colors"
                      style={{ borderRadius: 'var(--radius-card)' }}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="font-mono text-xs text-neutral-600 group-hover:text-accent-brand transition-colors">
                      {pillar.index}
                    </span>
                  </div>

                  <h3 className="font-bold text-base text-white mb-2 group-hover:text-neutral-100 transition-colors">
                    {pillar.title}
                  </h3>
                  <p className="text-neutral-400 text-xs leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-neutral-800/60 flex items-center justify-between">
                  <span
                    className="font-mono text-[10px] text-neutral-500 bg-neutral-950 px-2.5 py-1 border border-neutral-800/80"
                    style={{ borderRadius: 'var(--radius-pill)' }}
                  >
                    {pillar.badge}
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-neutral-800 group-hover:bg-accent-brand transition-colors" />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
