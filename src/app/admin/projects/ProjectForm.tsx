'use client'

import { useState, useRef, useEffect } from 'react'
import { createProject, updateProject } from '@/backend/actions/projects'
import { uploadToCloudinary } from '@/lib/uploadToCloudinary'
import { Upload, Link as LinkIcon, Trash2, CheckCircle2, Loader2, Pencil, X } from 'lucide-react'

export interface ProjectData {
  id: string
  title: string
  description: string
  problem?: string | null
  solution?: string | null
  techStack: string
  images: string
  year?: string | null
  client?: string | null
  liveUrl?: string | null
  githubUrl?: string | null
  isFeatured: boolean
}

interface ProjectFormProps {
  projectToEdit?: ProjectData | null
  onCancel?: () => void
  onSuccess?: () => void
}

export default function ProjectForm({ projectToEdit, onCancel, onSuccess }: ProjectFormProps) {
  const isEditing = Boolean(projectToEdit)

  const [loading, setLoading] = useState(false)
  const [uploadingImage, setUploadingImage] = useState(false)
  const [done, setDone] = useState(false)
  const [imageUrl, setImageUrl] = useState('')
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<'upload' | 'url'>('upload')
  const [uploadMsg, setUploadMsg] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Form field states
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [problem, setProblem] = useState('')
  const [solution, setSolution] = useState('')
  const [techStack, setTechStack] = useState('')
  const [year, setYear] = useState('')
  const [client, setClient] = useState('')
  const [liveUrl, setLiveUrl] = useState('')
  const [githubUrl, setGithubUrl] = useState('')
  const [isFeatured, setIsFeatured] = useState(false)

  // Populate form fields when switching to edit mode
  useEffect(() => {
    if (projectToEdit) {
      setTitle(projectToEdit.title || '')
      setDescription(projectToEdit.description || '')
      setProblem(projectToEdit.problem || '')
      setSolution(projectToEdit.solution || '')
      setTechStack(projectToEdit.techStack || '')
      setYear(projectToEdit.year || '')
      setClient(projectToEdit.client || '')
      setLiveUrl(projectToEdit.liveUrl || '')
      setGithubUrl(projectToEdit.githubUrl || '')
      setIsFeatured(Boolean(projectToEdit.isFeatured))

      let cover = ''
      try {
        if (projectToEdit.images) {
          if (projectToEdit.images.startsWith('[')) {
            const parsed = JSON.parse(projectToEdit.images)
            cover = Array.isArray(parsed) && parsed.length > 0 ? parsed[0] : projectToEdit.images
          } else {
            cover = projectToEdit.images
          }
        }
      } catch {
        cover = projectToEdit.images || ''
      }

      setImageUrl(cover)
      setImagePreview(cover || null)
      if (cover.startsWith('http')) {
        setActiveTab('url')
      }
    } else {
      // Reset form to clean state for creation
      resetForm()
    }
  }, [projectToEdit])

  function resetForm() {
    setTitle('')
    setDescription('')
    setProblem('')
    setSolution('')
    setTechStack('')
    setYear('')
    setClient('')
    setLiveUrl('')
    setGithubUrl('')
    setIsFeatured(false)
    setImageUrl('')
    setImagePreview(null)
    setUploadMsg('')
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  // Handle direct file upload to Cloudinary (Images & Videos)
  async function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    const localPreview = URL.createObjectURL(file)
    setImagePreview(localPreview)
    setUploadingImage(true)
    setUploadMsg('Téléchargement vers Cloudinary...')

    try {
      const { url } = await uploadToCloudinary(file)
      setImageUrl(url)
      setImagePreview(url)
      setUploadingImage(false)
      setUploadMsg('✓ Fichier téléversé sur Cloudinary avec succès !')
      setTimeout(() => setUploadMsg(''), 3000)
    } catch (err: any) {
      console.error('Cloudinary upload error:', err)
      setUploadingImage(false)
      setUploadMsg(err?.message || 'Erreur lors du téléversement Cloudinary')
    }
  }

  function handleRemoveImage() {
    setImageUrl('')
    setImagePreview(null)
    setUploadMsg('')
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (uploadingImage) return
    setLoading(true)

    const finalImage = imageUrl.trim()
    const imagesPayload = finalImage.startsWith('[') ? finalImage : JSON.stringify([finalImage].filter(Boolean))

    const payload = {
      title: title.trim(),
      description: description.trim(),
      problem: problem.trim() || undefined,
      solution: solution.trim() || undefined,
      techStack: techStack.trim(),
      images: imagesPayload,
      year: year.trim() || undefined,
      client: client.trim() || undefined,
      liveUrl: liveUrl.trim() || undefined,
      githubUrl: githubUrl.trim() || undefined,
      isFeatured,
    }

    try {
      if (isEditing && projectToEdit?.id) {
        await updateProject(projectToEdit.id, payload)
      } else {
        await createProject(payload)
      }

      setDone(true)
      setTimeout(() => setDone(false), 3000)

      if (!isEditing) {
        resetForm()
      }

      onSuccess?.()
    } catch (err) {
      console.error('Error saving project:', err)
    } finally {
      setLoading(false)
    }
  }

  const inputClass = "w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-sm text-white placeholder:text-neutral-700 focus:outline-none focus:border-accent-brand transition-colors"
  const labelClass = "block text-xs font-mono text-neutral-400 uppercase tracking-wider mb-1"

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {isEditing && (
        <div className="bg-accent-brand/10 border border-accent-brand/30 rounded-lg p-3 flex items-center justify-between text-xs font-mono text-accent-brand">
          <div className="flex items-center gap-2">
            <Pencil className="w-3.5 h-3.5" />
            <span>Modification en cours : <strong>{projectToEdit?.title}</strong></span>
          </div>
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="text-neutral-400 hover:text-white flex items-center gap-1 bg-neutral-900 border border-neutral-800 px-2 py-0.5 rounded"
            >
              <X className="w-3 h-3" /> Annuler
            </button>
          )}
        </div>
      )}

      <div>
        <label className={labelClass}>Titre du Projet *</label>
        <input
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className={inputClass}
          placeholder="ex. Route Insolite — Travel Platform"
        />
      </div>

      <div>
        <label className={labelClass}>Description *</label>
        <textarea
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          rows={3}
          className={`${inputClass} resize-none`}
          placeholder="Présentation concise de l'application et de son rôle..."
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className={labelClass}>Challenge / Problème (optionnel)</label>
          <input
            name="problem"
            value={problem}
            onChange={(e) => setProblem(e.target.value)}
            className={inputClass}
            placeholder="ex. Double bookings et friction..."
          />
        </div>
        <div>
          <label className={labelClass}>Solution / Architecture (optionnel)</label>
          <input
            name="solution"
            value={solution}
            onChange={(e) => setSolution(e.target.value)}
            className={inputClass}
            placeholder="ex. Système Next.js et PostgreSQL..."
          />
        </div>
      </div>

      <div>
        <label className={labelClass}>Tech Stack (séparé par virgules) *</label>
        <input
          name="techStack"
          value={techStack}
          onChange={(e) => setTechStack(e.target.value)}
          required
          className={inputClass}
          placeholder="Next.js 16, TypeScript, PostgreSQL, Prisma, Tailwind CSS"
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className={labelClass}>Année</label>
          <input
            name="year"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className={inputClass}
            placeholder="2024"
          />
        </div>
        <div>
          <label className={labelClass}>Client / Contexte</label>
          <input
            name="client"
            value={client}
            onChange={(e) => setClient(e.target.value)}
            className={inputClass}
            placeholder="ex. Route Insolite / IPSAS"
          />
        </div>
      </div>

      {/* Image Upload / URL Selector */}
      <div className="border border-neutral-800/80 rounded-xl p-3.5 bg-neutral-950/60 space-y-3">
        <div className="flex items-center justify-between">
          <label className={labelClass}>Photo de Couverture</label>
          <div className="flex items-center gap-1 bg-neutral-900 border border-neutral-800 p-0.5 rounded-lg text-[11px] font-mono">
            <button
              type="button"
              onClick={() => setActiveTab('upload')}
              className={`px-2 py-0.5 rounded transition-colors flex items-center gap-1.5 ${
                activeTab === 'upload' ? 'bg-accent-brand/20 text-accent-brand font-semibold' : 'text-neutral-500 hover:text-neutral-300'
              }`}
            >
              <Upload className="w-3 h-3" /> Fichier
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('url')}
              className={`px-2 py-0.5 rounded transition-colors flex items-center gap-1.5 ${
                activeTab === 'url' ? 'bg-accent-brand/20 text-accent-brand font-semibold' : 'text-neutral-500 hover:text-neutral-300'
              }`}
            >
              <LinkIcon className="w-3 h-3" /> Lien URL
            </button>
          </div>
        </div>

        {activeTab === 'upload' && (
          <div className="space-y-3">
            {imagePreview ? (
              <div className="relative rounded-lg overflow-hidden border border-neutral-800 bg-neutral-900 group aspect-video">
                <img
                  src={imagePreview}
                  alt="Aperçu couverture"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    className="p-2 bg-red-500/80 hover:bg-red-500 text-white rounded-lg transition-colors flex items-center gap-1.5 text-xs font-mono"
                  >
                    <Trash2 className="w-4 h-4" /> Supprimer
                  </button>
                </div>
                {uploadingImage && (
                  <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center gap-2 text-accent-brand text-xs font-mono">
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Téléchargement...</span>
                  </div>
                )}
              </div>
            ) : (
              <div className="border border-dashed border-neutral-800 hover:border-accent-brand/50 rounded-xl p-5 text-center transition-colors relative bg-neutral-900/30 group">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  disabled={uploadingImage}
                  className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                />
                <div className="w-8 h-8 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center mx-auto mb-2 text-accent-brand">
                  <Upload className="w-4 h-4" />
                </div>
                <p className="text-xs font-medium text-white mb-0.5">Glissez ou choisissez une image</p>
                <p className="text-[10px] text-neutral-600 font-mono">PNG, JPG, WEBP</p>
              </div>
            )}

            {uploadMsg && (
              <div className="flex items-center gap-2 text-xs font-mono text-accent-brand">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>{uploadMsg}</span>
              </div>
            )}
          </div>
        )}

        {activeTab === 'url' && (
          <div className="space-y-2">
            <input
              name="images_url"
              value={imageUrl}
              onChange={(e) => {
                setImageUrl(e.target.value)
                setImagePreview(e.target.value || null)
              }}
              className={inputClass}
              placeholder="https://images.unsplash.com/..."
            />
            {imagePreview && (
              <div className="relative rounded-lg overflow-hidden border border-neutral-800 aspect-video w-full max-h-32">
                <img src={imagePreview} alt="Aperçu" className="w-full h-full object-cover" />
              </div>
            )}
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className={labelClass}>Lien Démo Live</label>
          <input
            name="liveUrl"
            value={liveUrl}
            onChange={(e) => setLiveUrl(e.target.value)}
            className={inputClass}
            placeholder="https://..."
          />
        </div>
        <div>
          <label className={labelClass}>Lien GitHub</label>
          <input
            name="githubUrl"
            value={githubUrl}
            onChange={(e) => setGithubUrl(e.target.value)}
            className={inputClass}
            placeholder="https://github.com/..."
          />
        </div>
      </div>

      <label className="flex items-center gap-2.5 text-xs font-mono text-neutral-300 cursor-pointer select-none pt-1">
        <input
          type="checkbox"
          checked={isFeatured}
          onChange={(e) => setIsFeatured(e.target.checked)}
          className="rounded accent-accent-brand w-4 h-4 cursor-pointer"
        />
        <span>Mettre en avant sur la page d'accueil (Featured)</span>
      </label>

      <div className="flex items-center gap-3 pt-2">
        <button
          type="submit"
          disabled={loading || uploadingImage}
          className="flex-1 bg-white text-black font-semibold py-3 rounded-lg text-xs font-mono hover:bg-neutral-200 transition-colors disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-white/5"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Enregistrement...</span>
            </>
          ) : done ? (
            <>
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>{isEditing ? '✓ Modifications enregistrées !' : '✓ Projet publié !'}</span>
            </>
          ) : isEditing ? (
            <>
              <Pencil className="w-3.5 h-3.5" />
              <span>Enregistrer les Modifications</span>
            </>
          ) : (
            'Publier le Projet'
          )}
        </button>

        {isEditing && onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-3 border border-neutral-800 bg-neutral-900 text-neutral-400 hover:text-white rounded-lg text-xs font-mono transition-colors"
          >
            Annuler
          </button>
        )}
      </div>
    </form>
  )
}
