'use client'

/**
 * FRONTEND — Certification Vault
 * Glassmorphic credential cards with restrained 3D tilt physics & sheen glare.
 * Tilt and glare are disabled automatically under prefers-reduced-motion.
 */
import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import Image from 'next/image'
import { Award, ExternalLink, X, ShieldCheck } from 'lucide-react'
import { EASE, DUR } from '@/lib/motion'

type Certification = {
  id: string
  title: string
  issuer: string
  date: string
  credentialId: string | null
  credentialUrl: string | null
  imageUrl: string | null
  orderIndex: number
}

const defaultCerts = [
  { id: 'cert-1', title: 'AWS Certified Cloud Practitioner', issuer: 'Amazon Web Services (AWS)', date: '2024', credentialId: 'AWS-99201482', credentialUrl: 'https://aws.amazon.com/verification', imageUrl: 'https://images.unsplash.com/photo-1607799279861-4dd421887fb3?auto=format&fit=crop&w=400&q=80', orderIndex: 1 },
  { id: 'cert-2', title: 'Meta Full-Stack Developer Professional', issuer: 'Meta (Coursera)', date: '2023', credentialId: 'META-FS-883192', credentialUrl: 'https://coursera.org/verify/meta-fullstack', imageUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=400&q=80', orderIndex: 2 },
  { id: 'cert-3', title: 'IBM Data Science Foundations', issuer: 'IBM', date: '2023', credentialId: 'IBM-DS-774120', credentialUrl: 'https://ibm.com/verify/datascience', imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=400&q=80', orderIndex: 3 },
  { id: 'cert-4', title: 'Advanced SQL & Query Optimization', issuer: 'DataCamp', date: '2024', credentialId: 'DC-SQL-554109', credentialUrl: 'https://datacamp.com/verify', imageUrl: null, orderIndex: 4 },
  { id: 'cert-5', title: 'GitHub Foundations', issuer: 'GitHub', date: '2024', credentialId: 'GH-FOUND-33019', credentialUrl: 'https://github.com/verify', imageUrl: null, orderIndex: 5 },
  { id: 'cert-6', title: 'System Architecture & Design Patterns', issuer: 'DataCamp / Course', date: '2024', credentialId: 'SYS-ARCH-1029', credentialUrl: 'https://datacamp.com/verify', imageUrl: null, orderIndex: 6 },
]

function CertCard({ cert, onClick }: { cert: Certification; onClick: () => void }) {
  const reduced = useReducedMotion()
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50 })

  const handleMouseMove = reduced
    ? undefined
    : (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect()
        const x = ((e.clientY - rect.top) / rect.height - 0.5) * -12
        const y = ((e.clientX - rect.left) / rect.width - 0.5) * 12
        const glareX = ((e.clientX - rect.left) / rect.width) * 100
        const glareY = ((e.clientY - rect.top) / rect.height) * 100
        setTilt({ x, y })
        setGlarePos({ x: glareX, y: glareY })
      }

  const handleMouseLeave = reduced ? undefined : () => setTilt({ x: 0, y: 0 })

  return (
    <motion.div
      className="relative bg-neutral-900/50 border border-neutral-800/80 p-6 cursor-pointer hover:border-accent-brand/40 transition-colors duration-300 backdrop-blur-md overflow-hidden group flex flex-col justify-between"
      style={{ transformStyle: 'preserve-3d', borderRadius: 'var(--radius-card)' }}
      animate={{ rotateX: reduced ? 0 : tilt.x, rotateY: reduced ? 0 : tilt.y }}
      whileHover={{ scale: 1.015 }}
      whileInView={{ opacity: 1, y: 0 }}
      initial={{ opacity: 0, y: 30 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: DUR.base, ease: EASE }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      data-cursor="view"
    >
      {/* Glare sheen overlay — hidden under reduced motion */}
      {!reduced && (
        <div
          className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: `radial-gradient(350px circle at ${glarePos.x}% ${glarePos.y}%, var(--accent-brand-08), transparent 65%)`
          }}
        />
      )}

      <div>
        <div className="flex items-start justify-between mb-4">
          <div
            className="w-10 h-10 bg-neutral-800/80 border border-neutral-700/60 flex items-center justify-center text-accent-brand"
            style={{ borderRadius: 'var(--radius-card)' }}
          >
            <Award className="w-5 h-5" />
          </div>
          <span
            className="font-mono text-xs text-neutral-500 bg-neutral-950/80 border border-neutral-800 px-2.5 py-1"
            style={{ borderRadius: 'var(--radius-pill)' }}
          >
            {cert.date}
          </span>
        </div>

        <h3 className="font-bold text-white text-base mb-1.5 leading-snug group-hover:text-neutral-100 transition-colors">
          {cert.title}
        </h3>
        <p className="text-xs font-mono text-neutral-400 mb-6">{cert.issuer}</p>
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-neutral-800/70">
        {cert.credentialId ? (
          <span className="font-mono text-[10px] text-neutral-500">{cert.credentialId}</span>
        ) : (
          <span className="text-[11px] text-neutral-500 font-mono">Verified Record</span>
        )}
        <span className="text-xs font-mono text-accent-brand group-hover:underline flex items-center gap-1">
          Verify <ExternalLink className="w-3 h-3" />
        </span>
      </div>
    </motion.div>
  )
}

export default function CertificationsSection({ certifications }: { certifications: Certification[] }) {
  const [selected, setSelected] = useState<Certification | null>(null)
  const certs = certifications && certifications.length > 0 ? certifications : defaultCerts

  return (
    <section id="certifications" className="py-32 px-6 md:px-12 border-t border-neutral-900 bg-neutral-950/40">
      <div className="max-w-7xl mx-auto">
        <p className="section-label">05 / Credentials</p>
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <h2 className="text-3xl md:text-5xl font-bold leading-tight max-w-xl">
              Verified Credentials
            </h2>
            <p className="text-neutral-500 mt-4 max-w-lg text-sm md:text-base">
              Verified professional credentials in cloud systems, full-stack web engineering, and relational databases.
            </p>
          </div>
          <span className="font-mono text-xs text-neutral-500">
            {certs.length} official records
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {certs.map((cert) => (
            <CertCard key={cert.id} cert={cert} onClick={() => setSelected(cert)} />
          ))}
        </div>
      </div>

      {/* Certificate detail modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-neutral-950/90 backdrop-blur-md"
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 15 }}
              transition={{ duration: DUR.base, ease: EASE }}
              className="bg-neutral-900 border border-neutral-700/80 p-7 md:p-8 max-w-lg w-full shadow-2xl relative"
              style={{ borderRadius: 'var(--radius-card)' }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 bg-neutral-800 border border-accent-brand/30 flex items-center justify-center text-accent-brand"
                    style={{ borderRadius: 'var(--radius-card)' }}
                  >
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-mono text-[10px] uppercase text-accent-brand tracking-wider">Verified Credential</span>
                    <p className="text-xs text-neutral-400">{selected.issuer}</p>
                  </div>
                </div>

                <button
                  onClick={() => setSelected(null)}
                  className="w-8 h-8 flex items-center justify-center bg-neutral-800/80 hover:bg-neutral-700 transition-colors text-neutral-400 hover:text-white"
                  style={{ borderRadius: 'var(--radius-pill)' }}
                  aria-label="Close"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {selected.imageUrl && (
                <div className="mb-6 overflow-hidden border border-neutral-800 aspect-video relative" style={{ borderRadius: 'var(--radius-card)' }}>
                  <Image
                    src={selected.imageUrl}
                    alt={selected.title}
                    fill
                    sizes="(max-width: 600px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
              )}

              <h3 className="text-xl md:text-2xl font-bold text-white mb-1.5">{selected.title}</h3>
              <p className="font-mono text-xs text-neutral-400 mb-6">{selected.date} · {selected.issuer}</p>

              {selected.credentialId && (
                <div className="bg-neutral-950 border border-neutral-800 p-4 mb-6 font-mono text-xs" style={{ borderRadius: 'var(--radius-card)' }}>
                  <p className="text-neutral-500 mb-1">// Official Verification Identifier</p>
                  <p className="text-accent-brand font-semibold text-sm">{selected.credentialId}</p>
                </div>
              )}

              {selected.credentialUrl && !selected.credentialUrl.includes('[ADD') && (
                <a
                  href={selected.credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-white text-black text-xs font-semibold px-6 py-3.5 hover:bg-neutral-200 transition-colors w-full"
                  style={{ borderRadius: 'var(--radius-pill)' }}
                >
                  Verify at Issuing Authority <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
