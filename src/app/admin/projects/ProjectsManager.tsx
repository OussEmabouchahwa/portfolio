'use client'

import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { deleteProject } from '@/backend/actions/projects'
import { Trash2, Pencil, PlusCircle, ExternalLink, GitBranch } from 'lucide-react'
import ProjectForm, { ProjectData } from './ProjectForm'

interface ProjectsManagerProps {
  initialProjects: ProjectData[]
}

export default function ProjectsManager({ initialProjects }: ProjectsManagerProps) {
  const router = useRouter()
  const [editingProject, setEditingProject] = useState<ProjectData | null>(null)
  const formRef = useRef<HTMLDivElement>(null)

  function handleEdit(project: ProjectData) {
    setEditingProject(project)
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  function handleCancelEdit() {
    setEditingProject(null)
  }

  function handleSuccess() {
    router.refresh()
  }

  async function handleDelete(id: string, title: string) {
    if (confirm(`Êtes-vous sûr de vouloir supprimer le projet "${title}" ?`)) {
      try {
        await deleteProject(id)
        if (editingProject?.id === id) {
          setEditingProject(null)
        }
        router.refresh()
      } catch (err) {
        console.error('Erreur lors de la suppression :', err)
      }
    }
  }

  return (
    <div className="grid grid-cols-1 xl:grid-cols-5 gap-8">
      {/* Project list (3 cols) */}
      <div className="xl:col-span-3 space-y-3">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-mono text-neutral-500 uppercase tracking-wider">
            Projets Enregistrés ({initialProjects.length})
          </span>
          {editingProject && (
            <button
              onClick={() => setEditingProject(null)}
              className="text-xs font-mono text-accent-brand hover:underline flex items-center gap-1"
            >
              <PlusCircle className="w-3.5 h-3.5" /> Passer en mode création
            </button>
          )}
        </div>

        {initialProjects.length === 0 ? (
          <div className="p-10 text-center bg-neutral-900 border border-neutral-800 rounded-xl">
            <p className="text-neutral-500 text-sm">Aucun projet trouvé. Utilisez le formulaire pour ajouter votre premier projet.</p>
          </div>
        ) : (
          initialProjects.map((p) => {
            const isSelected = editingProject?.id === p.id
            return (
              <div
                key={p.id}
                className={`border rounded-xl p-5 flex flex-col sm:flex-row sm:items-start justify-between gap-4 transition-all duration-200 ${
                  isSelected
                    ? 'bg-neutral-900/90 border-accent-brand/50 shadow-lg shadow-black/30 ring-1 ring-accent-brand/30'
                    : 'bg-neutral-900 border-neutral-800 hover:border-neutral-700'
                }`}
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                    <h3 className="font-semibold text-sm text-white truncate">{p.title}</h3>
                    {p.isFeatured && (
                      <span className="text-[10px] font-mono bg-accent-brand/10 text-accent-brand border border-accent-brand/30 px-2 py-0.5 rounded-full flex-shrink-0">
                        Featured
                      </span>
                    )}
                    {isSelected && (
                      <span className="text-[10px] font-mono bg-white text-black px-2 py-0.5 rounded-full font-bold">
                        En cours d'édition
                      </span>
                    )}
                  </div>

                  <p className="text-neutral-400 text-xs line-clamp-2 mb-3 leading-relaxed">
                    {p.description}
                  </p>

                  <div className="flex flex-wrap items-center gap-3 text-xs text-neutral-500 font-mono">
                    {p.year && <span>{p.year}</span>}
                    {p.client && <span>· {p.client}</span>}
                    {p.liveUrl && (
                      <a
                        href={p.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-accent-brand flex items-center gap-1 transition-colors"
                      >
                        <ExternalLink className="w-3 h-3" /> Live
                      </a>
                    )}
                    {p.githubUrl && (
                      <a
                        href={p.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-accent-brand flex items-center gap-1 transition-colors"
                      >
                        <GitBranch className="w-3 h-3" /> Code
                      </a>
                    )}
                  </div>
                </div>

                {/* Actions: Bouton Modifier + Bouton Supprimer */}
                <div className="flex items-center gap-2 flex-shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-neutral-800">
                  <button
                    type="button"
                    onClick={() => handleEdit(p)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono rounded-lg transition-colors border cursor-pointer ${
                      isSelected
                        ? 'bg-accent-brand text-black font-semibold border-accent-brand'
                        : 'text-neutral-300 hover:text-white bg-neutral-800/90 hover:bg-neutral-700/80 border-neutral-700'
                    }`}
                    title="Modifier ce projet"
                  >
                    <Pencil className="w-3.5 h-3.5" />
                    <span>Modifier</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDelete(p.id, p.title)}
                    className="p-1.5 text-neutral-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors border border-transparent hover:border-red-500/20 cursor-pointer"
                    title="Supprimer définitivement"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )
          })
        )}
      </div>

      {/* Form (2 cols, sticky) */}
      <div className="xl:col-span-2" ref={formRef}>
        <div className="sticky top-6 bg-neutral-900 border border-neutral-800 rounded-xl p-6 shadow-xl">
          <div className="flex items-center justify-between mb-5 border-b border-neutral-800 pb-3">
            <div>
              <h2 className="font-semibold text-sm text-white flex items-center gap-2">
                {editingProject ? (
                  <>
                    <Pencil className="w-4 h-4 text-accent-brand" />
                    <span>Modifier le Projet</span>
                  </>
                ) : (
                  <>
                    <PlusCircle className="w-4 h-4 text-accent-brand" />
                    <span>Ajouter un Nouveau Projet</span>
                  </>
                )}
              </h2>
              <p className="text-[11px] text-neutral-500 font-mono mt-0.5">
                {editingProject ? 'Mettez à jour les informations puis enregistrez.' : 'Remplissez les détails pour publier.'}
              </p>
            </div>
          </div>

          <ProjectForm
            projectToEdit={editingProject}
            onCancel={handleCancelEdit}
            onSuccess={handleSuccess}
          />
        </div>
      </div>
    </div>
  )
}
