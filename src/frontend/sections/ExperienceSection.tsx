'use client'

/**
 * FRONTEND — Experience & Leadership Timeline
 * Illuminated vertical axis with active node indicator.
 * Traces software engineering trajectory from ISET Djerba to Route Insolite to IPSAS.
 */
import { useReducedMotion, motion } from 'framer-motion'
import { EASE, DUR } from '@/lib/motion'

type Experience = {
  id: string
  role: string
  company: string
  duration: string
  description: string
  skillsUsed: string
  orderIndex: number
}

const defaultTimeline = [
  {
    id: 'exp-1',
    duration: '2025 — Present',
    role: 'Engineering Cycle — Computer Science (Year 2)',
    company: 'IPSAS Sfax',
    description: 'Advanced software engineering curriculum: relational database modeling, distributed systems architecture, algorithms, and object-oriented systems in Java and C++.',
    skillsUsed: 'Java, SQL, System Architecture, C++',
    isActive: true,
  },
  {
    id: 'exp-2',
    duration: '2024',
    role: 'Engineering Intern',
    company: 'LeadRTech — Sfax',
    description: 'Full-stack application engineering, production deployment pipelines, and PostgreSQL query tuning within an agile development team.',
    skillsUsed: 'Full-Stack, PostgreSQL, Web Engineering',
    isActive: false,
  },
  {
    id: 'exp-3',
    duration: '2024',
    role: 'Mobile & Software Development Intern',
    company: 'Viss Tunisie — Sfax',
    description: 'Implemented responsive mobile user interfaces and integrated RESTful backend endpoints in sprint-based release cycles.',
    skillsUsed: 'Mobile Dev, REST APIs, Software Engineering',
    isActive: false,
  },
  {
    id: 'exp-4',
    duration: '2023 — 2024',
    role: 'Full-Stack Developer & Visual Creator',
    company: 'Route Insolite Travel Agency',
    description: 'Architected and deployed the central reservation system from PostgreSQL schema to Next.js UI. Concurrently directed on-location photography sessions and promotional video post-production in DaVinci Resolve.',
    skillsUsed: 'Next.js, PostgreSQL, Prisma, Photography, DaVinci Resolve',
    isActive: false,
  },
  {
    id: 'exp-5',
    duration: '2021 — 2023',
    role: 'Technician Diploma — Multimedia & Web',
    company: 'ISET Djerba',
    description: 'Two-year technical degree establishing core proficiencies in web development, interface design, graphic composition, and digital camera production.',
    skillsUsed: 'Web Dev, Photoshop, Photography, UI Design',
    isActive: false,
  },
  {
    id: 'exp-6',
    duration: '2024',
    role: 'Design Lead',
    company: 'Club SOS Village — IPSAS',
    description: 'Led visual identity and digital media campaigns for community engineering outreach initiatives at IPSAS.',
    skillsUsed: 'Visual Design, Brand Identity, Team Leadership',
    isActive: false,
  },
]

export default function ExperienceSection({ experiences }: { experiences: Experience[] }) {
  const reduced = useReducedMotion()
  const timeline = experiences && experiences.length > 0
    ? experiences.map((e, i) => ({ ...e, isActive: i === 0 }))
    : defaultTimeline

  return (
    <section id="experience" className="py-32 px-6 md:px-12 border-t border-neutral-900">
      <div className="max-w-7xl mx-auto">
        <p className="section-label">04 / Timeline</p>
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-6">
          <h2 className="text-3xl md:text-5xl font-bold leading-tight max-w-xl">
            How I Got Here
          </h2>
          <p className="text-neutral-500 font-mono text-xs max-w-sm leading-relaxed">
            A continuous progression combining university computer science at IPSAS with field experience at Route Insolite.
          </p>
        </div>

        <div className="relative">
          {/* Vertical illuminated line */}
          <div
            className="absolute left-3 top-0 bottom-0 w-px hidden md:block"
            style={{ background: `linear-gradient(to bottom, var(--accent-brand) 0%, oklch(0.22 0 0) 40%, oklch(0.12 0 0) 100%)` }}
          />

          <div className="flex flex-col gap-10">
            {timeline.map((entry, i) => {
              const isActiveNode = (entry as typeof entry & { isActive?: boolean }).isActive
              return (
                <motion.div
                  key={entry.id}
                  className="relative md:pl-16 flex flex-col md:flex-row md:gap-14 group"
                  whileInView={reduced ? undefined : { opacity: 1, x: 0 }}
                  initial={reduced ? undefined : { opacity: 0, x: -25 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ duration: DUR.base, delay: i * 0.06, ease: EASE }}
                >
                  {/* Timeline Node on Vertical Axis */}
                  <div className="absolute left-0 top-3 hidden md:flex items-center justify-center">
                    {isActiveNode ? (
                      <span className="relative flex h-6 w-6 items-center justify-center">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-brand opacity-60" />
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-accent-brand" />
                      </span>
                    ) : (
                      <div className="w-6 h-6 rounded-full border-2 border-neutral-800 bg-neutral-950 group-hover:border-accent-brand/50 transition-colors" />
                    )}
                  </div>

                  {/* Duration Column */}
                  <div className="md:w-48 flex-shrink-0 mb-3 md:mb-0 pt-2">
                    <span
                      className={`font-mono text-xs uppercase tracking-wider px-3 py-1 inline-block border ${
                        isActiveNode
                          ? 'text-accent-brand bg-neutral-900 border-accent-brand/40'
                          : 'text-neutral-500 bg-neutral-900/60 border-neutral-800/80'
                      }`}
                      style={{ borderRadius: 'var(--radius-pill)' }}
                    >
                      {entry.duration}
                    </span>
                  </div>

                  {/* Content Plate */}
                  <div
                    className={`flex-1 p-6 md:p-7 backdrop-blur-sm transition-all duration-300 border ${
                      isActiveNode
                        ? 'bg-neutral-900/50 border-accent-brand/30 shadow-lg shadow-black/20'
                        : 'bg-neutral-900/40 border-neutral-800/80 group-hover:border-neutral-700'
                    }`}
                    style={{ borderRadius: 'var(--radius-card)' }}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-1">
                      <h3 className="text-lg md:text-xl font-bold text-white group-hover:text-neutral-100 transition-colors">
                        {entry.role}
                      </h3>
                      {isActiveNode && (
                        <span className="font-mono text-[10px] text-accent-brand uppercase tracking-widest sm:text-right">
                          // In Progress
                        </span>
                      )}
                    </div>

                    <p className="text-accent-brand font-mono text-xs font-medium mb-3">
                      {entry.company}
                    </p>

                    <p className="text-neutral-400 text-sm leading-relaxed mb-4">
                      {entry.description}
                    </p>

                    <div className="flex flex-wrap gap-2 pt-1 border-t border-neutral-800/50">
                      {entry.skillsUsed.split(',').map(s => s.trim()).filter(Boolean).map(skill => (
                        <span
                          key={skill}
                          className="font-mono text-[10px] text-neutral-400 bg-neutral-950 border border-neutral-800 px-2.5 py-1"
                          style={{ borderRadius: 'var(--radius-pill)' }}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
