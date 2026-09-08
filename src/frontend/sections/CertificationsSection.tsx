'use client'

/**
 * FRONTEND — Interactive 3D Certification Vault
 * Glassmorphism cards with real-time 3D tilt physics & sheen glare effect.
 */
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Award, ExternalLink, X, ShieldCheck } from 'lucide-react'

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
  { id: '1', title: 'AWS Certified Cloud Practitioner', issuer: 'Amazon Web Services (AWS)', date: '2024', credentialId: 'AWS-99201482', credentialUrl: 'https://aws.amazon.com/verification', imageUrl: 'https://images.unsplash.com/photo-1607799279861-4dd421887fb3?auto=format&fit=crop&w=400&q=80', orderIndex: 1 },
  { id: '2', title: 'Meta Full-Stack Developer Professional', issuer: 'Meta (Coursera)', date: '2023', credentialId: 'META-FS-883192', credentialUrl: 'https://coursera.org/verify/meta-fullstack', imageUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=400&q=80', orderIndex: 2 },
  { id: '3', title: 'IBM Data Science Foundations', issuer: 'IBM', date: '2023', credentialId: 'IBM-DS-774120', credentialUrl: 'https://ibm.com/verify/datascience', imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=400&q=80', orderIndex: 3 },
  { id: '4', title: 'Advanced SQL & Query Optimization', issuer: 'DataCamp', date: '2024', credentialId: 'DC-SQL-554109', credentialUrl: 'https://datacamp.com/verify', imageUrl: null, orderIndex: 4 },
  { id: '5', title: 'GitHub Foundations', issuer: 'GitHub', date: '2024', credentialId: 'GH-FOUND-33019', credentialUrl: 'https://github.com/verify', imageUrl: null, orderIndex: 5 },
  { id: '6', title: 'System Architecture & Design Patterns', issuer: 'DataCamp / Course', date: '2024', credentialId: 'SYS-ARCH-1029', credentialUrl: 'https://datacamp.com/verify', imageUrl: null, orderIndex: 6 },
]

function CertCard({ cert, onClick }: { cert: Certification; onClick: () => void }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientY - rect.top) / rect.height - 0.5) * -15
    const y = ((e.clientX - rect.left) / rect.width - 0.5) * 15
    const glareX = ((e.clientX - rect.left) / rect.width) * 100
    const glareY = ((e.clientY - rect.top) / rect.height) * 100

    setTilt({ x, y })
    setGlarePos({ x: glareX, y: glareY })
  }

  return (
    <motion.div
      className="relative bg-neutral-900/60 border border-neutral-800/80 rounded-2xl p-6 cursor-pointer hover:border-cyan-500/50 transition-colors duration-300 backdrop-blur-md overflow-hidden group"
      style={{ transformStyle: 'preserve-3d' }}
      animate={{ rotateX: tilt.x, rotateY: tilt.y }}
      whileHover={{ scale: 1.02 }}
      whileInView={{ opacity: 1, y: 0 }}
      initial={{ opacity: 0, y: 30 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, ease: [0.33, 1, 0.68, 1] }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setTilt({ x: 0, y: 0 })}
      onClick={onClick}
      data-cursor="view"
    >
      {/* Glare sheen overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `radial-gradient(400px circle at ${glarePos.x}% ${glarePos.y}%, rgba(0, 240, 255, 0.08), transparent 60%)`
        }}
      />

      <div className="flex items-start justify-between mb-4">
        <div className="w-10 h-10 rounded-xl bg-neutral-800/80 border border-neutral-700/60 flex items-center justify-center text-cyan-400">
          <Award className="w-5 h-5" />
        </div>
        <span className="font-mono text-xs text-neutral-500 bg-neutral-950 border border-neutral-800 px-2.5 py-1 rounded-full">
          {cert.date}
        </span>
      </div>

      <h3 className="font-bold text-white mb-1 leading-snug">{cert.title}</h3>
      <p className="text-sm font-mono text-neutral-400 mb-4">{cert.issuer}</p>

      <div className="flex items-center justify-between pt-2 border-t border-neutral-800/80">
        {cert.credentialId ? (
          <span className="font-mono text-[11px] text-neutral-500">{cert.credentialId}</span>
        ) : (
          <span className="text-xs text-neutral-500 italic">Verified Credential</span>
        )}
        <span className="text-xs font-mono text-cyan-400 group-hover:underline flex items-center gap-1">
          Verify <ExternalLink className="w-3 h-3" />
        </span>
      </div>
    </motion.div>
  )
}

export default function CertificationsSection({ certifications }: { certifications: Certification[] }) {
  const [selected, setSelected] = useState<Certification | null>(null)
  const certs = certifications.length > 0 ? certifications : defaultCerts

  return (
    <section id="certifications" className="py-32 px-6 md:px-12 border-t border-neutral-900 bg-neutral-950/40">
      <div className="max-w-7xl mx-auto">
        <p className="section-label">05 — Certification Vault</p>
        <h2 className="text-3xl md:text-5xl font-bold leading-tight mb-4 max-w-xl">
          Verified Credentials
        </h2>
        <p className="text-neutral-400 mb-16 max-w-lg">
          Interactive glassmorphic credential cards. Click any certificate to open real-world verification metadata.
        </p>

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
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3, ease: [0.33, 1, 0.68, 1] }}
              className="bg-neutral-900 border border-neutral-700/80 rounded-2xl p-8 max-w-lg w-full shadow-2xl relative"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-cyan-950 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="font-mono text-[10px] uppercase text-cyan-400 tracking-wider">Official Certification</span>
                    <p className="text-xs text-neutral-400">{selected.issuer}</p>
                  </div>
                </div>

                <button
                  onClick={() => setSelected(null)}
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-neutral-800 hover:bg-neutral-700 transition-colors text-neutral-400 hover:text-white"
                  aria-label="Close"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {selected.imageUrl && (
                <div className="mb-6 rounded-xl overflow-hidden border border-neutral-800 aspect-video relative">
                  <img src={selected.imageUrl} alt={selected.title} className="w-full h-full object-cover" />
                </div>
              )}

              <h3 className="text-2xl font-bold text-white mb-2">{selected.title}</h3>
              <p className="font-mono text-sm text-neutral-400 mb-6">{selected.date}</p>

              {selected.credentialId && (
                <div className="bg-neutral-950 border border-neutral-800 rounded-xl p-4 mb-6 font-mono text-xs">
                  <p className="text-neutral-500 mb-1">// Credential Identifier</p>
                  <p className="text-cyan-300 font-semibold text-sm">{selected.credentialId}</p>
                </div>
              )}

              {selected.credentialUrl && !selected.credentialUrl.includes('[ADD') && (
                <a
                  href={selected.credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-white text-black text-sm font-semibold px-6 py-3 rounded-full hover:bg-neutral-200 transition-colors w-full"
                >
                  Verify Credential Direct <ExternalLink className="w-4 h-4" />
                </a>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
