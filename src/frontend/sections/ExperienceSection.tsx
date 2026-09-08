'use client'

/**
 * FRONTEND — Experience & Leadership Timeline Section
 * Illuminated axis with cyan radar pulse nodes and full career milestones.
 */
import { motion } from 'framer-motion'

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
    id: '1',
    duration: '2026 — Present',
    role: 'Engineering Cycle — Computer Science (Year 2)',
    company: 'IPSAS Sfax',
    description: 'Advanced software engineering curriculum covering system architecture, database modeling, algorithms, and distributed applications.',
    skillsUsed: 'Java, SQL, System Architecture, C++',
    isActive: true,
  },
  {
    id: '2',
    duration: 'Previous',
    role: 'Engineering Internship',
    company: 'LeadRTech — Sfax',
    description: 'Engineering development workflow, full-stack web application development, and SQL query optimization.',
    skillsUsed: 'Full-Stack, PostgreSQL, Web Engineering',
    isActive: false,
  },
  {
    id: '3',
    duration: 'Previous',
    role: 'Mobile & Software Development Intern',
    company: 'Viss Tunisie — Sfax',
    description: 'Mobile software engineering, UI implementation, and client application development in an agile team.',
    skillsUsed: 'Mobile Dev, Software Engineering, REST APIs',
    isActive: false,
  },
  {
    id: '4',
    duration: 'Previous',
    role: 'Full-Stack Software Developer & Visual Creator',
    company: 'Route Insolite Travel Agency',
    description: 'Engineered a complete multi-destination reservation management system. Also conducted client photography, produced travel promotional videos, and directed digital campaign visual assets.',
    skillsUsed: 'Full-Stack, React, SQL, Photography, Video Editing',
    isActive: false,
  },
  {
    id: '5',
    duration: 'Earlier',
    role: 'Technician Diploma — Multimedia & Web Development',
    company: 'ISET Djerba',
    description: 'Comprehensive foundation in web technology, graphic design, photography, video production, and user experience.',
    skillsUsed: 'Web Dev, Photoshop, Photography, UI/UX Design',
    isActive: false,
  },
  {
    id: '6',
    duration: 'Leadership',
    role: 'Design Lead / Chef Design',
    company: 'Club SOS Village (Engineering Cycle Year 1)',
    description: 'Led visual design direction, brand identity, and media campaign assets for community engineering initiatives.',
    skillsUsed: 'Visual Design, Team Leadership, Brand Identity',
    isActive: false,
  }
]

export default function ExperienceSection({ experiences }: { experiences: Experience[] }) {
  const timeline = experiences.length > 0
    ? experiences.map((e, i) => ({ ...e, isActive: i === 0 }))
    : defaultTimeline

  return (
    <section id="experience" className="py-32 px-6 md:px-12 border-t border-neutral-900">
      <div className="max-w-7xl mx-auto">
        <p className="section-label">04 — Timeline & Leadership</p>
        <h2 className="text-3xl md:text-5xl font-bold leading-tight mb-20 max-w-xl">
          The Journey So Far
        </h2>

        <div className="relative">
          {/* Vertical illuminated line */}
          <div className="absolute left-3 top-0 bottom-0 w-px bg-gradient-to-b from-cyan-500/80 via-neutral-800 to-neutral-900 hidden md:block" />

          <div className="flex flex-col gap-12">
            {timeline.map((entry, i) => {
              const isActiveNode = (entry as any).isActive
              return (
                <motion.div
                  key={entry.id}
                  className="relative md:pl-16 flex flex-col md:flex-row md:gap-16 group"
                  whileInView={{ opacity: 1, x: 0 }}
                  initial={{ opacity: 0, x: -30 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.6, delay: i * 0.08, ease: [0.33, 1, 0.68, 1] }}
                >
                  {/* Timeline Node */}
                  <div className="absolute left-0 top-1.5 hidden md:flex items-center justify-center">
                    {isActiveNode ? (
                      <span className="relative flex h-6 w-6 items-center justify-center">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-400" />
                      </span>
                    ) : (
                      <div className="w-6 h-6 rounded-full border-2 border-neutral-800 bg-neutral-950 group-hover:border-cyan-500/50 transition-colors" />
                    )}
                  </div>

                  {/* Duration & Metadata */}
                  <div className="md:w-48 flex-shrink-0 mb-3 md:mb-0">
                    <span className="font-mono text-xs text-neutral-500 uppercase tracking-wider bg-neutral-900 border border-neutral-800 px-3 py-1 rounded-full inline-block">
                      {entry.duration}
                    </span>
                  </div>

                  {/* Content Card */}
                  <div className="flex-1 bg-neutral-900/40 border border-neutral-800/80 rounded-2xl p-6 backdrop-blur-sm group-hover:border-neutral-700 transition-colors">
                    <h3 className="text-xl font-bold text-white mb-1">{entry.role}</h3>
                    <p className="text-cyan-400 font-mono text-sm font-medium mb-3">{entry.company}</p>
                    <p className="text-neutral-400 text-sm leading-relaxed mb-4">{entry.description}</p>

                    <div className="flex flex-wrap gap-2">
                      {entry.skillsUsed.split(',').map(s => s.trim()).filter(Boolean).map(skill => (
                        <span key={skill} className="font-mono text-[11px] text-neutral-400 bg-neutral-950 border border-neutral-800 px-3 py-1 rounded-full">
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
