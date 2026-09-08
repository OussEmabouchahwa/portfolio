'use client'
import { useState } from 'react'
import { createCertification } from '@/backend/actions/certifications'

export default function CertForm() {
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    const fd = new FormData(e.currentTarget)
    try {
      await createCertification({
        title: fd.get('title') as string,
        issuer: fd.get('issuer') as string,
        date: fd.get('date') as string,
        credentialId: fd.get('credentialId') as string || undefined,
        credentialUrl: fd.get('credentialUrl') as string || undefined,
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
        <label className={labelClass}>Certificate Title *</label>
        <input name="title" required className={inputClass} placeholder="Advanced SQL" />
      </div>
      <div>
        <label className={labelClass}>Issuer *</label>
        <input name="issuer" required className={inputClass} placeholder="DataCamp" />
      </div>
      <div>
        <label className={labelClass}>Date *</label>
        <input name="date" required className={inputClass} placeholder="2024" />
      </div>
      <div>
        <label className={labelClass}>Credential ID</label>
        <input name="credentialId" className={inputClass} placeholder="ABC-12345" />
      </div>
      <div>
        <label className={labelClass}>Verification URL</label>
        <input name="credentialUrl" className={inputClass} placeholder="https://..." />
      </div>
      <div>
        <label className={labelClass}>Order</label>
        <input name="orderIndex" type="number" defaultValue={0} className={inputClass} />
      </div>
      <button type="submit" disabled={loading} className="w-full bg-white text-black font-semibold py-3 rounded-lg text-sm hover:bg-neutral-200 transition-colors disabled:opacity-50">
        {loading ? 'Saving...' : done ? '✓ Saved!' : 'Add Certificate'}
      </button>
    </form>
  )
}
