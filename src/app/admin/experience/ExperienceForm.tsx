'use client'
import { useState } from 'react'
import { createExperience } from '@/backend/actions/experience'

export default function ExperienceForm() {
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    const fd = new FormData(e.currentTarget)
    try {
      await createExperience({
        role: fd.get('role') as string,
        company: fd.get('company') as string,
        duration: fd.get('duration') as string,
        description: fd.get('description') as string,
        skillsUsed: fd.get('skillsUsed') as string,
        orderIndex: parseInt(fd.get('orderIndex') as string) || 0,
      })
      setDone(true)
      setTimeout(() => setDone(false), 3000)
      ;(e.target as HTMLFormElement).reset()
    } finally { setLoading(false) }
  }

  const inputClass = "w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2.5 text-sm text-white placeholder:text-neutral-700 focus:outline-none focus:border-neutral-600 transition-colors"
  const labelClass = "block text-xs text-neutral-500 tracking-widest uppercase mb-1.5"

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <label className={labelClass}>Role / Title *</label>
        <input name="role" required className={inputClass} placeholder="Software Engineer" />
      </div>
      <div>
        <label className={labelClass}>Company *</label>
        <input name="company" required className={inputClass} placeholder="Company — City" />
      </div>
      <div>
        <label className={labelClass}>Duration *</label>
        <input name="duration" required className={inputClass} placeholder="2024 — Present" />
      </div>
      <div>
        <label className={labelClass}>Description</label>
        <textarea name="description" rows={3} className={`${inputClass} resize-none`} placeholder="What you did there..." />
      </div>
      <div>
        <label className={labelClass}>Skills (comma separated)</label>
        <input name="skillsUsed" className={inputClass} placeholder="Java, SQL, React" />
      </div>
      <div>
        <label className={labelClass}>Order (lower = higher)</label>
        <input name="orderIndex" type="number" defaultValue={0} className={inputClass} />
      </div>
      <button type="submit" disabled={loading} className="w-full bg-white text-black font-semibold py-3 rounded-lg text-sm hover:bg-neutral-200 transition-colors disabled:opacity-50">
        {loading ? 'Saving...' : done ? '✓ Saved!' : 'Save Experience'}
      </button>
    </form>
  )
}
