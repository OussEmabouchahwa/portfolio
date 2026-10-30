'use client'

import { useState } from 'react'
import { Server, Database, Globe, Cpu, Zap } from 'lucide-react'

export default function ArchitectureDiagram() {
  const [activeNode, setActiveNode] = useState<string | null>(null)

  const nodes = [
    {
      id: 'client',
      name: 'Client / Web Layer',
      tech: 'Next.js 16, React 19, Tailwind v4',
      desc: 'Server-rendered pages, edge caching, inertial scrolling, and dynamic state-based cursor.',
      icon: Globe
    },
    {
      id: 'gateway',
      name: 'API & Server Actions',
      tech: 'Next.js Server Actions, REST APIs',
      desc: 'Type-safe server actions, input validation, authentication headers, and middleware checks.',
      icon: Cpu
    },
    {
      id: 'orm',
      name: 'Prisma ORM & DB Client',
      tech: 'Prisma Client v6, Data Models',
      desc: 'Type-safe query engine, automated migrations, relational joins, and transaction handling.',
      icon: Zap
    },
    {
      id: 'db',
      name: 'PostgreSQL Database',
      tech: 'Supabase PostgreSQL, Connection Pool',
      desc: 'Relational storage for projects, credentials, leads, and media metadata.',
      icon: Database
    }
  ]

  return (
    <div
      className="bg-neutral-950/90 border border-neutral-800/80 p-8 backdrop-blur-xl"
      style={{ borderRadius: 'var(--radius-card)' }}
    >
      <div className="flex items-center justify-between mb-8">
        <div>
          <span className="font-mono text-xs text-accent-brand uppercase tracking-widest">// System Architecture</span>
          <h3 className="text-xl font-bold text-white mt-1">Full-Stack Data Flow & Infrastructure</h3>
        </div>
        <span
          className="font-mono text-xs text-neutral-500 bg-neutral-900 border border-neutral-800 px-3 py-1"
          style={{ borderRadius: 'var(--radius-pill)' }}
        >
          Interactive Spec
        </span>
      </div>

      {/* Nodes grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative">
        {nodes.map((node, i) => {
          const Icon = node.icon
          const isActive = activeNode === node.id
          return (
            <div
              key={node.id}
              onMouseEnter={() => setActiveNode(node.id)}
              onMouseLeave={() => setActiveNode(null)}
              style={{ borderRadius: 'var(--radius-card)' }}
              className={`p-5 border transition-all duration-300 cursor-pointer ${
                isActive
                  ? 'bg-neutral-900 border-accent-brand/60 shadow-[0_0_20px_var(--accent-brand-12)] scale-[1.02]'
                  : 'bg-neutral-900/50 border-neutral-800/80 hover:border-neutral-700'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div
                  className={`w-8 h-8 flex items-center justify-center`}
                  style={{
                    borderRadius: 'var(--radius-card)',
                    background: isActive ? 'rgb(var(--color-neutral-900))' : undefined,
                    backgroundColor: isActive ? undefined : 'rgb(38 38 38)',
                    color: isActive ? 'var(--accent-brand)' : 'rgb(163 163 163)'
                  }}
                >
                  <Icon className="w-4 h-4" />
                </div>
                <span className="font-mono text-[10px] text-neutral-500">Node 0{i + 1}</span>
              </div>
              <p className="font-semibold text-white text-sm mb-1">{node.name}</p>
              <p className="font-mono text-[11px] text-accent-brand mb-2">{node.tech}</p>
              <p className="text-neutral-400 text-xs leading-relaxed">{node.desc}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}
