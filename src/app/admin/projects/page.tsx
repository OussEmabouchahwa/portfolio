import db from '@/backend/db/client'
import ProjectsManager from './ProjectsManager'
import { defaultProjects } from '@/lib/data/defaults'

export const dynamic = 'force-dynamic'

export default async function ProjectsPage() {
  let projects = defaultProjects

  try {
    const dbProjects = await db.project.findMany({ orderBy: { createdAt: 'desc' } })
    if (dbProjects && dbProjects.length > 0) {
      projects = dbProjects
    }
  } catch (error) {
    console.warn('Database connection unavailable for projects admin, using defaults:', error)
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-1 text-white">Projects</h1>
        <p className="text-neutral-500 text-sm font-mono">Ajoutez, modifiez et gérez vos réalisations.</p>
      </div>

      <ProjectsManager initialProjects={projects} />
    </div>
  )
}
