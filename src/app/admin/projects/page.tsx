import db from '@/backend/db/client'
import { deleteProject } from '@/backend/actions/projects'
import { Trash2 } from 'lucide-react'
import ProjectForm from './ProjectForm'

export const dynamic = 'force-dynamic'

export default async function ProjectsPage() {
  const projects = await db.project.findMany({ orderBy: { createdAt: 'desc' } })

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-1">Projects</h1>
        <p className="text-neutral-500 text-sm">Add and manage your selected work.</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-5 gap-8">
        {/* Project list */}
        <div className="xl:col-span-3 space-y-3">
          {projects.length === 0 ? (
            <div className="p-10 text-center bg-neutral-900 border border-neutral-800 rounded-xl">
              <p className="text-neutral-500 text-sm">No projects yet. Use the form to add your first project.</p>
            </div>
          ) : (
            projects.map((p) => (
              <div key={p.id} className="bg-neutral-900 border border-neutral-800 rounded-xl p-5 flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-sm truncate">{p.title}</h3>
                    {p.isFeatured && <span className="text-xs bg-amber-500/10 text-amber-400 border border-amber-500/20 px-2 py-0.5 rounded-full flex-shrink-0">Featured</span>}
                  </div>
                  <p className="text-neutral-500 text-xs line-clamp-2 mb-2">{p.description}</p>
                  <div className="flex gap-3 text-xs text-neutral-600">
                    {p.year && <span>{p.year}</span>}
                    {p.client && <span>· {p.client}</span>}
                  </div>
                </div>
                <form action={async () => { 'use server'; await deleteProject(p.id) }}>
                  <button type="submit" className="p-2 text-neutral-600 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors flex-shrink-0">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </form>
              </div>
            ))
          )}
        </div>

        {/* Add project form */}
        <div className="xl:col-span-2">
          <div className="sticky top-0 bg-neutral-900 border border-neutral-800 rounded-xl p-6">
            <h2 className="font-semibold mb-5 text-sm">Add New Project</h2>
            <ProjectForm />
          </div>
        </div>
      </div>
    </div>
  )
}
