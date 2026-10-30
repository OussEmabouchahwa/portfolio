'use client'

/**
 * FRONTEND — Skills Ecosystem & Competency Mapping
 * Restrained dark-tech design: categorizes skills by verified production experience,
 * engineering curriculum (IPSAS), and creative production (Route Insolite).
 */
import { useState } from 'react'
import { motion } from 'framer-motion'
import { EASE, DUR } from '@/lib/motion'

interface SkillItem {
  name: string
  context: 'Production Experience' | 'Engineering Studies' | 'Creative Production' | 'Actively Exploring'
}

interface SkillCategory {
  index: string
  title: string
  skills: SkillItem[]
}

const categories: SkillCategory[] = [
  {
    index: '01',
    title: 'Engineering & Web Systems',
    skills: [
      { name: 'Java', context: 'Engineering Studies' },
      { name: 'SQL', context: 'Production Experience' },
      { name: 'Next.js 16', context: 'Production Experience' },
      { name: 'TypeScript', context: 'Production Experience' },
      { name: 'REST APIs', context: 'Production Experience' },
      { name: 'PostgreSQL', context: 'Production Experience' },
      { name: 'Prisma ORM', context: 'Production Experience' },
      { name: 'C++', context: 'Engineering Studies' },
    ],
  },
  {
    index: '02',
    title: 'Data & Relational Modeling',
    skills: [
      { name: 'PostgreSQL Schema Design', context: 'Production Experience' },
      { name: 'Query Optimization', context: 'Production Experience' },
      { name: 'Power BI', context: 'Production Experience' },
      { name: 'Data Normalization', context: 'Engineering Studies' },
      { name: 'Relational Joins', context: 'Engineering Studies' },
    ],
  },
  {
    index: '03',
    title: 'Visual & Camera Production',
    skills: [
      { name: 'DSLR Photography', context: 'Creative Production' },
      { name: 'DaVinci Resolve', context: 'Creative Production' },
      { name: 'Color Grading', context: 'Creative Production' },
      { name: 'Adobe Photoshop', context: 'Creative Production' },
      { name: 'Adobe Premiere Pro', context: 'Creative Production' },
      { name: 'Lighting & Composition', context: 'Creative Production' },
    ],
  },
  {
    index: '04',
    title: 'AI Synthesis & Generative Media',
    skills: [
      { name: 'Midjourney v6', context: 'Creative Production' },
      { name: 'Prompt Engineering', context: 'Actively Exploring' },
      { name: 'Runway Gen-2', context: 'Actively Exploring' },
      { name: 'AI Image Compositing', context: 'Creative Production' },
      { name: 'PyTorch Fundamentals', context: 'Actively Exploring' },
    ],
  },
]

const contextStyles: Record<string, { badge: string; pill: string }> = {
  'Production Experience': {
    badge: 'text-accent-brand border-accent-brand/40 bg-neutral-900/90',
    pill: 'border-accent-brand text-accent-brand bg-neutral-900 shadow-[0_0_15px_var(--accent-brand-12)]',
  },
  'Engineering Studies': {
    badge: 'text-neutral-200 border-neutral-700 bg-neutral-900/90',
    pill: 'border-neutral-500 text-white bg-neutral-800',
  },
  'Creative Production': {
    badge: 'text-emerald-400 border-emerald-500/40 bg-neutral-900/90',
    pill: 'border-emerald-500/80 text-emerald-300 bg-neutral-900 shadow-[0_0_15px_rgba(52,211,153,0.15)]',
  },
  'Actively Exploring': {
    badge: 'text-amber-400 border-amber-500/40 bg-neutral-900/90',
    pill: 'border-amber-500/80 text-amber-300 bg-neutral-900 shadow-[0_0_15px_rgba(251,191,36,0.15)]',
  },
}

export default function SkillsSection() {
  const [hoveredSkill, setHoveredSkill] = useState<SkillItem | null>(null)

  return (
    <section id="skills" className="py-32 px-6 md:px-12 border-t border-neutral-900 bg-neutral-950/60">
      <div className="max-w-7xl mx-auto">
        <p className="section-label">03 / Skills</p>

        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <h2 className="text-3xl md:text-5xl font-bold leading-tight max-w-xl">
              Honest Competency Map
            </h2>
            <p className="text-neutral-500 mt-4 max-w-lg text-sm md:text-base">
              Hover any skill tag to view verified context: production platforms, university coursework at IPSAS, or studio production at Route Insolite.
            </p>
          </div>

          {/* Active Context Readout */}
          <div className="min-h-[44px] flex items-center">
            {hoveredSkill ? (
              <div
                className={`px-4 py-2 border text-xs font-mono transition-all duration-200 flex items-center gap-2 ${contextStyles[hoveredSkill.context].badge}`}
                style={{ borderRadius: 'var(--radius-pill)' }}
              >
                <span className="font-semibold">{hoveredSkill.name}</span>
                <span className="text-neutral-500">→</span>
                <span>{hoveredSkill.context}</span>
              </div>
            ) : (
              <div
                className="text-xs font-mono text-neutral-500 border border-neutral-800/80 px-4 py-2 bg-neutral-900/40 flex items-center gap-2"
                style={{ borderRadius: 'var(--radius-pill)' }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-neutral-700" />
                <span>Hover a skill to inspect context</span>
              </div>
            )}
          </div>
        </div>

        {/* 2x2 Clean Architectural Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.title}
              className="bg-neutral-900/50 border border-neutral-800/80 p-8 backdrop-blur-md hover:border-neutral-700/80 transition-colors"
              style={{ borderRadius: 'var(--radius-card)' }}
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 30 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: DUR.base, delay: i * 0.08, ease: EASE }}
            >
              <div className="border-b border-neutral-800/80 pb-4 mb-6 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="font-mono text-xs text-accent-brand">{cat.index}</span>
                  <h3 className="text-base font-bold text-white">{cat.title}</h3>
                </div>
                <span className="font-mono text-xs text-neutral-500">{cat.skills.length} tools</span>
              </div>

              <div className="flex flex-wrap gap-2.5">
                {cat.skills.map((skill) => {
                  const isHovered = hoveredSkill?.name === skill.name
                  return (
                    <span
                      key={skill.name}
                      onMouseEnter={() => setHoveredSkill(skill)}
                      onMouseLeave={() => setHoveredSkill(null)}
                      className={`px-3.5 py-1.5 text-xs font-mono transition-all duration-200 cursor-pointer border ${
                        isHovered
                          ? contextStyles[skill.context].pill
                          : 'bg-neutral-900/80 border-neutral-800 text-neutral-300 hover:border-neutral-600 hover:text-white'
                      }`}
                      style={{ borderRadius: 'var(--radius-pill)' }}
                    >
                      {skill.name}
                    </span>
                  )
                })}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
