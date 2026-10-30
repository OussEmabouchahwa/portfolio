import db from '@/backend/db/client'
import { deleteExperience } from '@/backend/actions/experience'
import { Trash2 } from 'lucide-react'
import ExperienceForm from './ExperienceForm'
import { defaultExperiences } from '@/lib/data/defaults'

export const dynamic = 'force-dynamic'

export default async function ExperiencePage() {
  let experiences = defaultExperiences

  try {
    const dbExperiences = await db.experience.findMany({ orderBy: { orderIndex: 'asc' } })
    if (dbExperiences && dbExperiences.length > 0) {
      experiences = dbExperiences
    }
  } catch (error) {
    console.warn('Experience query failed, falling back to defaults:', error)
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-1 text-white">Experience</h1>
        <p className="text-neutral-500 text-sm font-mono">Manage your professional timeline.</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-5 gap-8">
        <div className="xl:col-span-3 space-y-3">
          {experiences.length === 0 ? (
            <div className="p-10 text-center bg-neutral-900 border border-neutral-800 rounded-xl">
              <p className="text-neutral-500 text-sm font-mono">No experience entries yet.</p>
            </div>
          ) : (
            experiences.map((exp) => (
              <div key={exp.id} className="bg-neutral-900 border border-neutral-800 rounded-xl p-5 flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="text-xs text-accent-brand font-mono mb-1">{exp.duration}</div>
                  <h3 className="font-semibold text-sm mb-0.5 text-white">{exp.role}</h3>
                  <p className="text-neutral-400 text-xs font-mono">{exp.company}</p>
                </div>
                <form action={async () => { 'use server'; await deleteExperience(exp.id) }}>
                  <button type="submit" className="p-2 text-neutral-600 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors cursor-pointer" title="Supprimer">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </form>
              </div>
            ))
          )}
        </div>

        <div className="xl:col-span-2">
          <div className="sticky top-6 bg-neutral-900 border border-neutral-800 rounded-xl p-6">
            <h2 className="font-semibold mb-5 text-sm text-white">Add Experience</h2>
            <ExperienceForm />
          </div>
        </div>
      </div>
    </div>
  )
}
