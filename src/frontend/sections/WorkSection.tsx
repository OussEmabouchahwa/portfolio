'use client'

/**
 * FRONTEND — Selected Work Section
 * Project containers use --radius-sharp (2px) — editorial photographic framing.
 * Includes architectural problem/solution callouts to emphasize real-world engineering impact.
 */
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowUpRight, GitBranch, Pencil } from 'lucide-react'
import ArchitectureDiagram from '@/frontend/components/ui/ArchitectureDiagram'
import { EASE, DUR } from '@/lib/motion'

type Project = {
  id: string
  title: string
  description: string
  problem?: string | null
  solution?: string | null
  techStack: string
  images: string
  liveUrl: string | null
  githubUrl: string | null
  client: string | null
  year: string | null
  isFeatured: boolean
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const techTags = project.techStack ? project.techStack.split(',').map(t => t.trim()).slice(0, 5) : []
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
  const indexStr = String(index + 1).padStart(2, '0')

  return (
    <motion.article
      className={`group flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 lg:gap-14 items-start lg:items-center`}
      whileInView={{ opacity: 1, y: 0 }}
      initial={{ opacity: 0, y: 50 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: DUR.slow, ease: EASE }}
    >
      {/* Image Framing — Editorial 2px sharp radius */}
      <div
        className="w-full lg:w-3/5 overflow-hidden bg-neutral-900 border border-neutral-800/90 aspect-[16/10] relative group cursor-pointer shadow-xl shadow-black/40"
        style={{ borderRadius: 'var(--radius-sharp)' }}
        data-cursor="view"
      >
        {coverImage ? (
          <Image
            src={coverImage}
            alt={project.title}
            fill
            sizes="(max-width: 1024px) 100vw, 60vw"
            className="object-cover opacity-85 group-hover:opacity-100 group-hover:scale-[1.03] transition-all duration-700"
            loading="lazy"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-neutral-950">
            <div className="text-center font-mono">
              <div className="text-5xl font-bold text-neutral-800 tracking-tighter mb-2">
                {project.title.substring(0, 2).toUpperCase()}
              </div>
              <p className="text-neutral-600 text-xs tracking-widest uppercase">// System Asset</p>
            </div>
          </div>
        )}

        {/* Index Watermark in Photo Corner */}
        <div className="absolute top-4 left-4 z-10 font-mono text-xs text-white/90 bg-neutral-950/80 border border-neutral-800/80 px-2.5 py-1 backdrop-blur-md">
          {indexStr}
        </div>

        {/* Gradient scrim for text contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>

      {/* Info & Architectural Narrative */}
      <div className="w-full lg:w-2/5 flex flex-col gap-4">
        {/* Project Meta Bar */}
        <div className="flex items-center gap-3 text-neutral-500 text-xs font-mono">
          {project.year && <span>{project.year}</span>}
          {project.client && (
            <>
              <span>·</span>
              <span className="text-neutral-400">{project.client}</span>
            </>
          )}
          {project.isFeatured && (
            <>
              <span>·</span>
              <span className="text-accent-brand font-semibold">// Featured</span>
            </>
          )}
        </div>

        {/* Title */}
        <h3 className="text-2xl lg:text-3xl font-bold leading-tight text-white group-hover:text-neutral-100 transition-colors">
          {project.title}
        </h3>

        {/* Description */}
        <p className="text-neutral-400 text-sm leading-relaxed">
          {project.description}
        </p>

        {/* Engineering Challenge & Solution Callout */}
        {(project.problem || project.solution) && (
          <div
            className="bg-neutral-950/80 border border-neutral-800/80 p-3.5 font-mono text-xs space-y-1.5 my-1"
            style={{ borderRadius: 'var(--radius-sharp)' }}
          >
            {project.problem && (
              <div className="text-neutral-400 text-[11px] leading-relaxed">
                <span className="text-neutral-600 font-semibold">// Challenge:</span> {project.problem}
              </div>
            )}
            {project.solution && (
              <div className="text-neutral-300 text-[11px] leading-relaxed">
                <span className="text-accent-brand font-semibold">// Solution:</span> {project.solution}
              </div>
            )}
          </div>
        )}

        {/* Technology Badges */}
        {techTags.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-1">
            {techTags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-neutral-900/90 border border-neutral-800 text-neutral-300 text-xs font-mono"
                style={{ borderRadius: 'var(--radius-pill)' }}
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Action Links */}
        <div className="flex items-center gap-3.5 pt-3">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-white text-black text-xs font-semibold px-5 py-2.5 hover:bg-neutral-200 transition-colors"
              style={{ borderRadius: 'var(--radius-pill)' }}
              data-cursor="view"
            >
              Live Platform <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 border border-neutral-800 bg-neutral-900/50 hover:bg-neutral-800/80 text-xs font-medium text-neutral-300 px-5 py-2.5 transition-colors"
              style={{ borderRadius: 'var(--radius-pill)' }}
              data-cursor="view"
            >
              <GitBranch className="w-3.5 h-3.5" /> Source
            </a>
          )}
          <a
            href="/admin/projects"
            className="flex items-center gap-1.5 border border-neutral-800/80 bg-neutral-900/40 hover:bg-neutral-800 hover:text-accent-brand text-xs font-mono text-neutral-400 px-4 py-2.5 transition-colors"
            style={{ borderRadius: 'var(--radius-pill)' }}
            title="Modifier ce projet dans l'administration"
          >
            <Pencil className="w-3 h-3 text-accent-brand" /> Modifier
          </a>
        </div>
      </div>
    </motion.article>
  )
}

export default function WorkSection({ projects }: { projects: Project[] }) {
  return (
    <section id="work" className="py-32 px-6 md:px-12 border-t border-neutral-900">
      <div className="max-w-7xl mx-auto space-y-24">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <p className="section-label">02 / Selected Work</p>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight max-w-xl">
              Built and Shipped
            </h2>
          </div>
          <p className="text-neutral-500 font-mono text-xs max-w-sm leading-relaxed">
            Production full-stack platforms, database schemas, and creative tooling built with real architectural constraints.
          </p>
        </div>

        {/* Projects Stream */}
        <div className="flex flex-col gap-28">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>

        {/* Interactive Architecture Spec */}
        <div className="pt-8">
          <ArchitectureDiagram />
        </div>
      </div>
    </section>
  )
}
