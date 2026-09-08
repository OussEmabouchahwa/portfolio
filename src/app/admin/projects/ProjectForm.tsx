'use client'

import { useState } from 'react'
import { createProject } from '@/backend/actions/projects'

export default function ProjectForm() {
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    const fd = new FormData(e.currentTarget)
    try {
      await createProject({
        title: fd.get('title') as string,
        description: fd.get('description') as string,
        techStack: fd.get('techStack') as string,
        images: fd.get('images') as string || '',
        year: fd.get('year') as string,
        client: fd.get('client') as string,
        liveUrl: fd.get('liveUrl') as string,
        githubUrl: fd.get('githubUrl') as string,
        isFeatured: fd.get('isFeatured') === 'on',
      })
      setDone(true)
      setTimeout(() => setDone(false), 3000)
      ;(e.target as HTMLFormElement).reset()
    } finally {
      setLoading(false)
    }
  }

  const inputClass = "w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2.5 text-sm text-white placeholder:text-neutral-700 focus:outline-none focus:border-neutral-600 transition-colors"
  const labelClass = "block text-xs text-neutral-500 tracking-widest uppercase mb-1.5"

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <label className={labelClass}>Title *</label>
        <input name="title" required className={inputClass} placeholder="Project name" />
      </div>
      <div>
        <label className={labelClass}>Description *</label>
        <textarea name="description" required rows={3} className={`${inputClass} resize-none`} placeholder="Short project description..." />
      </div>
      <div>
        <label className={labelClass}>Tech Stack *</label>
        <input name="techStack" required className={inputClass} placeholder="Next.js, PostgreSQL, GSAP" />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className={labelClass}>Year</label>
          <input name="year" className={inputClass} placeholder="2024" />
        </div>
        <div>
          <label className={labelClass}>Client</label>
          <input name="client" className={inputClass} placeholder="Client name" />
        </div>
      </div>
      <div>
        <label className={labelClass}>Cover Image URL</label>
        <input name="images" className={inputClass} placeholder="https://..." />
      </div>
      <div>
        <label className={labelClass}>Live URL</label>
        <input name="liveUrl" className={inputClass} placeholder="https://..." />
      </div>
      <div>
        <label className={labelClass}>GitHub URL</label>
        <input name="githubUrl" className={inputClass} placeholder="https://github.com/..." />
      </div>
      <label className="flex items-center gap-2 text-sm text-neutral-400 cursor-pointer">
        <input type="checkbox" name="isFeatured" className="rounded" />
        Mark as featured
      </label>
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-white text-black font-semibold py-3 rounded-lg text-sm hover:bg-neutral-200 transition-colors disabled:opacity-50"
      >
        {loading ? 'Publishing...' : done ? '✓ Published!' : 'Publish Project'}
      </button>
    </form>
  )
}
