'use client'

/**
 * FRONTEND — Skills Ecosystem & Competency Mapping
 * Honest competency mapping with icy cyan halo effect and contextual usage status.
 */
import { useState } from 'react'
import { motion } from 'framer-motion'

interface SkillItem {
  name: string
  context: 'Production Experience' | 'Engineering Studies' | 'Creative Production' | 'Actively Exploring'
}

interface SkillCategory {
  title: string
  skills: SkillItem[]
}

const categories: SkillCategory[] = [
  {
    title: 'Engineering & Web',
    skills: [
      { name: 'Java', context: 'Engineering Studies' },
      { name: 'SQL', context: 'Production Experience' },
      { name: 'Next.js 15', context: 'Production Experience' },
      { name: 'TypeScript', context: 'Production Experience' },
      { name: 'REST APIs', context: 'Production Experience' },
      { name: 'PostgreSQL', context: 'Production Experience' },
    ]
  },
  {
    title: 'Data & Analytics',
    skills: [
      { name: 'Power BI', context: 'Production Experience' },
      { name: 'SQL Queries', context: 'Production Experience' },
      { name: 'Data Modeling', context: 'Engineering Studies' },
      { name: 'Dashboard Design', context: 'Production Experience' },
    ]
  },
  {
    title: 'Visual & Creative',
    skills: [
      { name: 'Adobe Photoshop', context: 'Creative Production' },
      { name: 'Premiere Pro', context: 'Creative Production' },
      { name: 'DaVinci Resolve', context: 'Creative Production' },
      { name: 'DSLR Photography', context: 'Creative Production' },
      { name: 'Color Grading', context: 'Creative Production' },
    ]
  },
  {
    title: 'AI & Next-Gen',
    skills: [
      { name: 'Prompt Engineering', context: 'Actively Exploring' },
      { name: 'Midjourney', context: 'Creative Production' },
      { name: 'AI Video Generation', context: 'Actively Exploring' },
      { name: 'PyTorch Basics', context: 'Actively Exploring' },
    ]
  }
]

const contextColors: Record<string, string> = {
  'Production Experience': 'text-cyan-400 border-cyan-500/30 bg-cyan-950/30',
  'Engineering Studies': 'text-purple-400 border-purple-500/30 bg-purple-950/30',
  'Creative Production': 'text-emerald-400 border-emerald-500/30 bg-emerald-950/30',
  'Actively Exploring': 'text-amber-400 border-amber-500/30 bg-amber-950/30',
}

export default function SkillsSection() {
  const [hoveredSkill, setHoveredSkill] = useState<SkillItem | null>(null)

  return (
    <section id="skills" className="py-32 px-6 md:px-12 border-t border-neutral-900 bg-neutral-950/60">
      <div className="max-w-7xl mx-auto">
        <p className="section-label">03 — Skills Ecosystem</p>
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <h2 className="text-3xl md:text-5xl font-bold leading-tight max-w-xl">
              Honest Competency Mapping
            </h2>
            <p className="text-neutral-500 mt-4 max-w-lg">
              Hover over any skill tag to reveal its real-world application context. No misleading percentage bars.
            </p>
          </div>

          {/* Active Hover Badge Indicator */}
          <div className="min-h-[44px] flex items-center">
            {hoveredSkill ? (
              <div className={`px-4 py-2 rounded-full border text-xs font-mono transition-all duration-300 ${contextColors[hoveredSkill.context]}`}>
                <span className="font-semibold">{hoveredSkill.name}</span> · <span>{hoveredSkill.context}</span>
              </div>
            ) : (
              <span className="text-xs font-mono text-neutral-600 border border-neutral-800 px-4 py-2 rounded-full">
                Hover over a skill tag
              </span>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.title}
              className="bg-neutral-900/60 border border-neutral-800/80 rounded-2xl p-8 backdrop-blur-md hover:border-neutral-700 transition-colors"
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 30 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <h3 className="text-lg font-bold text-white mb-6 border-b border-neutral-800 pb-3 flex items-center justify-between">
                <span>{cat.title}</span>
                <span className="font-mono text-xs text-neutral-500 font-normal">{cat.skills.length} competencies</span>
              </h3>

              <div className="flex flex-wrap gap-3">
                {cat.skills.map((skill) => {
                  const isHovered = hoveredSkill?.name === skill.name
                  return (
                    <span
                      key={skill.name}
                      onMouseEnter={() => setHoveredSkill(skill)}
                      onMouseLeave={() => setHoveredSkill(null)}
                      className={`px-4 py-2 rounded-full text-xs font-mono transition-all duration-300 cursor-pointer border ${
                        isHovered
                          ? 'bg-cyan-950/80 text-cyan-300 border-cyan-400 shadow-[0_0_15px_rgba(0,240,255,0.2)] scale-105'
                          : 'bg-neutral-900 border-neutral-800 text-neutral-300 hover:border-neutral-600 hover:text-white'
                      }`}
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
