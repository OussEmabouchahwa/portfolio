'use client'

import { useState } from 'react'
import { createMedia, deleteMedia } from '@/backend/actions/media'
import { createClient } from '@/utils/supabase/client'
import { Upload, Trash2, Image as ImageIcon, Link as LinkIcon, Plus, CheckCircle2 } from 'lucide-react'

type MediaItem = {
  id: string
  url: string
  category: string
  altText: string | null
  createdAt: Date
}

export default function MediaVaultClient({ initialMedia }: { initialMedia: MediaItem[] }) {
  const [uploading, setUploading] = useState(false)
  const [urlInput, setUrlInput] = useState('')
  const [altInput, setAltInput] = useState('')
  const [category, setCategory] = useState('Photography')
  const [statusMsg, setStatusMsg] = useState('')
  const [activeTab, setActiveTab] = useState<'upload' | 'url'>('upload')

  const categories = ['Photography', 'Video', 'Poster', 'AI Art', 'Couples', 'Travel', 'Events']

  // Direct File Upload to Supabase Storage
  async function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    setStatusMsg('Uploading file to Supabase Storage...')

    try {
      const supabase = createClient()
      const fileExt = file.name.split('.').pop()
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${fileExt}`
      const filePath = `vault/${fileName}`

      // Attempt to upload to 'media' bucket in Supabase Storage
      const { data, error } = await supabase.storage.from('media').upload(filePath, file, {
        cacheControl: '3600',
        upsert: true,
      })

      let publicUrl = ''

      if (error) {
        // Fallback: Read file as Base64 Data URL if bucket is unconfigured
        const reader = new FileReader()
        reader.onload = async () => {
          publicUrl = reader.result as string
          await createMedia({
            url: publicUrl,
            category,
            altText: altInput || file.name,
          })
          setUploading(false)
          setStatusMsg('Media added successfully!')
          setTimeout(() => setStatusMsg(''), 3000)
        }
        reader.readAsDataURL(file)
        return
      }

      // Get public URL from Supabase Storage
      const { data: urlData } = supabase.storage.from('media').getPublicUrl(filePath)
      publicUrl = urlData.publicUrl

      await createMedia({
        url: publicUrl,
        category,
        altText: altInput || file.name,
      })

      setUploading(false)
      setStatusMsg('File uploaded to Supabase Storage & published!')
      setTimeout(() => setStatusMsg(''), 3000)
    } catch (err) {
      console.error(err)
      setUploading(false)
      setStatusMsg('Upload failed. Try URL input mode.')
    }
  }

  // Add via Direct URL
  async function handleAddUrl(e: React.FormEvent) {
    e.preventDefault()
    if (!urlInput) return

    setUploading(true)
    try {
      await createMedia({
        url: urlInput,
        category,
        altText: altInput || 'Media Asset',
      })
      setUrlInput('')
      setAltInput('')
      setUploading(false)
      setStatusMsg('Media asset added!')
      setTimeout(() => setStatusMsg(''), 3000)
    } catch (err) {
      setUploading(false)
      setStatusMsg('Failed to add media.')
    }
  }

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-1 text-white">Media Vault & Storage Studio</h1>
          <p className="text-neutral-400 text-sm font-mono">
            Upload images & video assets directly to Supabase Storage or link external URLs.
          </p>
        </div>
        <div className="flex items-center gap-2 font-mono text-xs bg-neutral-900 border border-neutral-800 px-3 py-1.5 rounded-full text-cyan-400">
          <span>Supabase Storage: Active</span>
        </div>
      </div>

      {/* Upload Panel */}
      <div className="bg-neutral-900/80 border border-neutral-800 rounded-2xl p-8 backdrop-blur-md space-y-6">
        <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveTab('upload')}
              className={`flex items-center gap-2 font-mono text-xs px-4 py-2 rounded-full transition-colors ${
                activeTab === 'upload'
                  ? 'bg-white text-black font-semibold'
                  : 'text-neutral-400 hover:text-white bg-neutral-950 border border-neutral-800'
              }`}
            >
              <Upload className="w-3.5 h-3.5" /> File Upload
            </button>
            <button
              onClick={() => setActiveTab('url')}
              className={`flex items-center gap-2 font-mono text-xs px-4 py-2 rounded-full transition-colors ${
                activeTab === 'url'
                  ? 'bg-white text-black font-semibold'
                  : 'text-neutral-400 hover:text-white bg-neutral-950 border border-neutral-800'
              }`}
            >
              <LinkIcon className="w-3.5 h-3.5" /> External URL
            </button>
          </div>

          {/* Category Selector */}
          <div className="flex items-center gap-2 font-mono text-xs">
            <span className="text-neutral-500">Category:</span>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="bg-neutral-950 border border-neutral-800 text-white rounded-lg px-3 py-1.5 focus:outline-none focus:border-cyan-400"
            >
              {categories.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Tab 1: File Drag & Drop Upload */}
        {activeTab === 'upload' && (
          <div className="border-2 border-dashed border-neutral-800 hover:border-cyan-500/50 rounded-2xl p-10 text-center transition-colors relative bg-neutral-950/40 group">
            <input
              type="file"
              accept="image/*,video/*"
              onChange={handleFileUpload}
              disabled={uploading}
              className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
            />
            <div className="w-12 h-12 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center mx-auto mb-4 group-hover:border-cyan-400 text-cyan-400 transition-colors">
              <Upload className="w-6 h-6" />
            </div>
            <p className="font-semibold text-white mb-1">Click or Drag & Drop File to Upload</p>
            <p className="text-xs text-neutral-500 font-mono">JPG, PNG, WebP, AVIF, MP4 up to 50MB</p>
          </div>
        )}

        {/* Tab 2: External URL */}
        {activeTab === 'url' && (
          <form onSubmit={handleAddUrl} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="url"
                required
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                placeholder="https://images.unsplash.com/photo-..."
                className="bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-white text-sm placeholder:text-neutral-700 focus:outline-none focus:border-cyan-400"
              />
              <input
                type="text"
                value={altInput}
                onChange={(e) => setAltInput(e.target.value)}
                placeholder="Asset Description / Caption"
                className="bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-white text-sm placeholder:text-neutral-700 focus:outline-none focus:border-cyan-400"
              />
            </div>
            <button
              type="submit"
              disabled={uploading}
              className="flex items-center gap-2 bg-white text-black font-semibold text-sm px-6 py-3 rounded-xl hover:bg-neutral-200 transition-colors"
            >
              <Plus className="w-4 h-4" /> Add Asset to Vault
            </button>
          </form>
        )}

        {/* Status Message */}
        {statusMsg && (
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 bg-cyan-950/40 border border-cyan-500/20 px-4 py-2.5 rounded-xl">
            <CheckCircle2 className="w-4 h-4" />
            <span>{statusMsg}</span>
          </div>
        )}
      </div>

      {/* Gallery Showcase Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-white">Media Vault Gallery ({initialMedia.length})</h2>
          <span className="font-mono text-xs text-neutral-500">Live Assets</span>
        </div>

        {initialMedia.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {initialMedia.map((item) => (
              <div
                key={item.id}
                className="bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden group relative flex flex-col justify-between"
              >
                <div className="aspect-square bg-neutral-950 relative overflow-hidden">
                  <img
                    src={item.url}
                    alt={item.altText || 'Media Asset'}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3 left-3 bg-neutral-950/80 border border-neutral-800 px-2.5 py-1 rounded-full text-[10px] font-mono text-cyan-400 backdrop-blur-md">
                    {item.category}
                  </span>
                </div>

                <div className="p-4 flex items-center justify-between bg-neutral-900 border-t border-neutral-800">
                  <p className="text-xs text-neutral-300 font-mono truncate max-w-[150px]">
                    {item.altText || 'Media Asset'}
                  </p>
                  <form action={() => deleteMedia(item.id)}>
                    <button
                      type="submit"
                      className="text-neutral-500 hover:text-red-400 transition-colors p-1.5 rounded-lg hover:bg-neutral-800"
                      title="Delete asset"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </form>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-neutral-900/40 border border-neutral-800 rounded-2xl p-12 text-center text-neutral-500">
            <ImageIcon className="w-10 h-10 mx-auto mb-3 text-neutral-700" />
            <p className="text-sm">No media items in vault yet. Upload files above to get started.</p>
          </div>
        )}
      </div>
    </div>
  )
}
