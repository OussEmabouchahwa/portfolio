'use client'

import { useState, useRef } from 'react'
import { createProject } from '@/backend/actions/projects'
import { createClient } from '@/utils/supabase/client'
import { Upload, Image as ImageIcon, Link as LinkIcon, Trash2, CheckCircle2, Loader2 } from 'lucide-react'

export default function ProjectForm() {
  const [loading, setLoading] = useState(false)
  const [uploadingImage, setUploadingImage] = useState(false)
  const [done, setDone] = useState(false)
  const [imageUrl, setImageUrl] = useState('')
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<'upload' | 'url'>('upload')
  const [uploadMsg, setUploadMsg] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Handle direct file upload to Supabase Storage with Base64 fallback
  async function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    // Show instant local preview
    const localPreview = URL.createObjectURL(file)
    setImagePreview(localPreview)
    setUploadingImage(true)
    setUploadMsg('Uploading image...')

    try {
      const supabase = createClient()
      const fileExt = file.name.split('.').pop()
      const fileName = `project-${Date.now()}-${Math.random().toString(36).substring(2, 7)}.${fileExt}`
      const filePath = `projects/${fileName}`

      // Attempt Supabase storage upload
      const { error } = await supabase.storage.from('media').upload(filePath, file, {
        cacheControl: '3600',
        upsert: true,
      })

      if (error) {
        // Fallback: Read file as Base64 Data URL if Supabase storage bucket is not configured
        const reader = new FileReader()
        reader.onload = () => {
          const base64 = reader.result as string
          setImageUrl(base64)
          setImagePreview(base64)
          setUploadingImage(false)
          setUploadMsg('Photo ready!')
          setTimeout(() => setUploadMsg(''), 2500)
        }
        reader.readAsDataURL(file)
        return
      }

      // Supabase public URL
      const { data: urlData } = supabase.storage.from('media').getPublicUrl(filePath)
      setImageUrl(urlData.publicUrl)
      setImagePreview(urlData.publicUrl)
      setUploadingImage(false)
      setUploadMsg('Photo uploaded to storage!')
      setTimeout(() => setUploadMsg(''), 2500)
    } catch (err) {
      console.error(err)
      // Ultimate fallback to base64
      const reader = new FileReader()
      reader.onload = () => {
        const base64 = reader.result as string
        setImageUrl(base64)
        setImagePreview(base64)
        setUploadingImage(false)
        setUploadMsg('Photo ready (offline mode)!')
        setTimeout(() => setUploadMsg(''), 2500)
      }
      reader.readAsDataURL(file)
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

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (uploadingImage) return
    setLoading(true)
    const fd = new FormData(e.currentTarget)
    try {
      await createProject({
        title: fd.get('title') as string,
        description: fd.get('description') as string,
        techStack: fd.get('techStack') as string,
        images: imageUrl || (fd.get('images_url') as string) || '',
        year: fd.get('year') as string,
        client: fd.get('client') as string,
        liveUrl: fd.get('liveUrl') as string,
        githubUrl: fd.get('githubUrl') as string,
        isFeatured: fd.get('isFeatured') === 'on',
      })
      setDone(true)
      setTimeout(() => setDone(false), 3000)
      ;(e.target as HTMLFormElement).reset()
      setImageUrl('')
      setImagePreview(null)
      if (fileInputRef.current) fileInputRef.current.value = ''
    } finally {
      setLoading(false)
    }
  }

  const inputClass = "w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2.5 text-sm text-white placeholder:text-neutral-700 focus:outline-none focus:border-cyan-500/50 transition-colors"
  const labelClass = "block text-xs text-neutral-500 tracking-widest uppercase mb-1.5"

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <label className={labelClass}>Title *</label>
        <input name="title" required className={inputClass} placeholder="e.g. AI Portfolio Dashboard" />
      </div>

      <div>
        <label className={labelClass}>Description *</label>
        <textarea name="description" required rows={3} className={`${inputClass} resize-none`} placeholder="Short project overview and impact..." />
      </div>

      <div>
        <label className={labelClass}>Tech Stack *</label>
        <input name="techStack" required className={inputClass} placeholder="Next.js, TypeScript, PostgreSQL, Tailwind CSS" />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className={labelClass}>Year</label>
          <input name="year" className={inputClass} placeholder="2024" />
        </div>
        <div>
          <label className={labelClass}>Client / Type</label>
          <input name="client" className={inputClass} placeholder="e.g. IPSAS / Personal R&D" />
        </div>
      </div>

      {/* Image Upload / URL Selector */}
      <div className="border border-neutral-800/80 rounded-xl p-4 bg-neutral-950/60 space-y-3">
        <div className="flex items-center justify-between">
          <label className={labelClass}>Project Cover Photo</label>
          <div className="flex items-center gap-1.5 bg-neutral-900 border border-neutral-800 p-0.5 rounded-lg text-[11px] font-mono">
            <button
              type="button"
              onClick={() => setActiveTab('upload')}
              className={`px-2.5 py-1 rounded-md transition-colors flex items-center gap-1.5 ${
                activeTab === 'upload' ? 'bg-cyan-500/20 text-cyan-300 font-semibold' : 'text-neutral-500 hover:text-neutral-300'
              }`}
            >
              <Upload className="w-3 h-3" /> Upload Photo
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('url')}
              className={`px-2.5 py-1 rounded-md transition-colors flex items-center gap-1.5 ${
                activeTab === 'url' ? 'bg-cyan-500/20 text-cyan-300 font-semibold' : 'text-neutral-500 hover:text-neutral-300'
              }`}
            >
              <LinkIcon className="w-3 h-3" /> Image URL
            </button>
          </div>
        </div>

        {/* Tab 1: Upload Photo */}
        {activeTab === 'upload' && (
          <div className="space-y-3">
            {imagePreview ? (
              <div className="relative rounded-lg overflow-hidden border border-neutral-800 bg-neutral-900 group aspect-video">
                <img
                  src={imagePreview}
                  alt="Project Cover Preview"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    className="p-2 bg-red-500/80 hover:bg-red-500 text-white rounded-lg transition-colors flex items-center gap-1.5 text-xs font-mono"
                  >
                    <Trash2 className="w-4 h-4" /> Remove
                  </button>
                </div>
                {uploadingImage && (
                  <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center gap-2 text-cyan-400 text-xs font-mono">
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Uploading...</span>
                  </div>
                )}
              </div>
            ) : (
              <div className="border border-dashed border-neutral-800 hover:border-cyan-500/50 rounded-xl p-6 text-center transition-colors relative bg-neutral-900/30 group">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  disabled={uploadingImage}
                  className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                />
                <div className="w-10 h-10 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center mx-auto mb-2 text-cyan-400 group-hover:border-cyan-400/60 transition-colors">
                  <Upload className="w-5 h-5" />
                </div>
                <p className="text-xs font-medium text-white mb-0.5">Click or drag & drop project photo</p>
                <p className="text-[11px] text-neutral-600 font-mono">PNG, JPG, WEBP up to 20MB</p>
              </div>
            )}

            {uploadMsg && (
              <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>{uploadMsg}</span>
              </div>
            )}
          </div>
        )}

        {/* Tab 2: External Image URL */}
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
              placeholder="https://images.unsplash.com/photo-..."
            />
            {imagePreview && (
              <div className="relative rounded-lg overflow-hidden border border-neutral-800 aspect-video w-full max-h-36">
                <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
              </div>
            )}
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className={labelClass}>Live Demo URL</label>
          <input name="liveUrl" className={inputClass} placeholder="https://..." />
        </div>
        <div>
          <label className={labelClass}>GitHub URL</label>
          <input name="githubUrl" className={inputClass} placeholder="https://github.com/..." />
        </div>
      </div>

      <label className="flex items-center gap-2.5 text-sm text-neutral-400 cursor-pointer select-none pt-1">
        <input type="checkbox" name="isFeatured" className="rounded accent-cyan-500 w-4 h-4 cursor-pointer" />
        <span>Feature on homepage</span>
      </label>

      <button
        type="submit"
        disabled={loading || uploadingImage}
        className="w-full bg-white text-black font-semibold py-3 rounded-lg text-sm hover:bg-neutral-200 transition-colors disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-white/5"
      >
        {loading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Publishing Project...</span>
          </>
        ) : done ? (
          <>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>✓ Project Published!</span>
          </>
        ) : (
          'Publish Project'
        )}
      </button>
    </form>
  )
}
