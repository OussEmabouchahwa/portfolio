'use client'

/**
 * FRONTEND — Selected Work Section
 * Rule: GSAP ScrollTrigger for card reveals. Framer Motion for card hover states.
 * Includes interactive Architecture Diagram component.
 */
import { motion } from 'framer-motion'
import { ArrowUpRight, GitBranch } from 'lucide-react'
import ArchitectureDiagram from '@/frontend/components/ui/ArchitectureDiagram'

type Project = {
  id: string
  title: string
  description: string
  techStack: string
  images: string
  liveUrl: string | null
  githubUrl: string | null
  client: string | null
  year: string | null
  isFeatured: boolean
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const techTags = project.techStack ? project.techStack.split(',').map(t => t.trim()).slice(0, 4) : []
  let coverImage = ''
  try {
    if (project.images) {
      if (project.images.startsWith('[')) {
        const parsed = JSON.parse(project.images)
        if (Array.isArray(parsed) && parsed.length > 0) coverImage = parsed[0]
      } else {
        coverImage = project.images
      }
    }
  } catch {
    coverImage = project.images || ''
  }

  const isEven = index % 2 === 0

  return (
    <motion.article
      className={`group flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} gap-10 md:gap-16 items-start md:items-center`}
      whileInView={{ opacity: 1, y: 0 }}
      initial={{ opacity: 0, y: 60 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
    >
      {/* Image card */}
      <div
        className="w-full md:w-3/5 overflow-hidden rounded-2xl bg-neutral-900 border border-neutral-800 aspect-video relative group cursor-pointer"
        data-cursor="view"
      >
        {coverImage ? (
          <img
            src={coverImage}
            alt={project.title}
            className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
            loading="lazy"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-6xl font-bold text-neutral-800 tracking-tighter mb-2">
                {project.title.substring(0, 2).toUpperCase()}
              </div>
              <p className="text-neutral-600 text-xs tracking-widest uppercase">Project Cover</p>
            </div>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>

      {/* Info */}
      <div className="w-full md:w-2/5 flex flex-col gap-5">
        <div className="flex items-center gap-3 text-neutral-500 text-xs font-mono">
          {project.year && <span>{project.year}</span>}
          {project.client && (
            <>
              <span>·</span>
              <span>{project.client}</span>
            </>
          )}
          {project.isFeatured && (
            <>
              <span>·</span>
              <span className="text-cyan-400 font-semibold">Featured</span>
            </>
          )}
        </div>

        <h3 className="text-2xl md:text-3xl font-bold leading-tight text-white">{project.title}</h3>
        <p className="text-neutral-400 text-sm md:text-base leading-relaxed">{project.description}</p>

        {techTags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {techTags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-neutral-900/90 border border-neutral-800 text-neutral-400 text-xs font-mono rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className="flex items-center gap-4 pt-2">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-white text-black text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-neutral-200 transition-colors"
              data-cursor="view"
            >
              Live Project <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 border border-neutral-700 text-sm font-medium px-5 py-2.5 rounded-full hover:bg-neutral-900 transition-colors"
              data-cursor="view"
            >
              <GitBranch className="w-4 h-4" /> GitHub
            </a>
          )}
        </div>
      </div>
    </motion.article>
  )
}

export default function WorkSection({ projects }: { projects: Project[] }) {
  return (
    <section id="work" className="py-32 px-6 md:px-12 border-t border-neutral-900">
      <div className="max-w-7xl mx-auto space-y-24">
        <div className="flex items-end justify-between">
          <div>
            <p className="section-label">02 — Selected Work</p>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight max-w-xl">
              Engineered Case Studies
            </h2>
          </div>
        </div>

        {/* Projects list */}
        {projects.length > 0 && (
          <div className="flex flex-col gap-28">
            {projects.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </div>
        )}

        {/* Interactive Architecture Spec */}
        <div className="pt-12">
          <ArchitectureDiagram />
        </div>
      </div>
    </section>
  )
}
