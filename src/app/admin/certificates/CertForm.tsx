'use client'
import { useState, useRef } from 'react'
import { createCertification } from '@/backend/actions/certifications'
import { uploadToCloudinary } from '@/lib/uploadToCloudinary'
import { Upload, Link as LinkIcon, Trash2, CheckCircle2, Loader2 } from 'lucide-react'

export default function CertForm() {
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)
  const [uploadingImage, setUploadingImage] = useState(false)
  const [imageUrl, setImageUrl] = useState('')
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<'upload' | 'url'>('upload')
  const [uploadMsg, setUploadMsg] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  async function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    setImagePreview(URL.createObjectURL(file))
    setUploadingImage(true)
    setUploadMsg('Téléchargement vers Cloudinary...')

    try {
      const { url } = await uploadToCloudinary(file)
      setImageUrl(url)
      setImagePreview(url)
      setUploadingImage(false)
      setUploadMsg('✓ Photo téléversée sur Cloudinary !')
      setTimeout(() => setUploadMsg(''), 2500)
    } catch (err: any) {
      console.error('Cloudinary upload error:', err)
      setUploadingImage(false)
      setUploadMsg(err?.message || 'Erreur lors du téléversement Cloudinary')
    }
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (uploadingImage) return
    setLoading(true)
    const fd = new FormData(e.currentTarget)
    try {
      await createCertification({
        title: fd.get('title') as string,
        issuer: fd.get('issuer') as string,
        date: fd.get('date') as string,
        credentialId: (fd.get('credentialId') as string) || undefined,
        credentialUrl: (fd.get('credentialUrl') as string) || undefined,
        imageUrl: imageUrl || (fd.get('imageUrl_url') as string) || undefined,
        orderIndex: parseInt(fd.get('orderIndex') as string) || 0,
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

      {/* Certificate Image Upload */}
      <div className="border border-neutral-800/80 rounded-xl p-4 bg-neutral-950/60 space-y-3">
        <div className="flex items-center justify-between">
          <label className={labelClass}>Certificate Image</label>
          <div className="flex items-center gap-1 bg-neutral-900 border border-neutral-800 p-0.5 rounded-lg text-[11px] font-mono">
            <button
              type="button"
              onClick={() => setActiveTab('upload')}
              className={`px-2.5 py-1 rounded-md transition-colors flex items-center gap-1.5 ${
                activeTab === 'upload' ? 'bg-cyan-500/20 text-cyan-300 font-semibold' : 'text-neutral-500 hover:text-neutral-300'
              }`}
            >
              <Upload className="w-3 h-3" /> Upload
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('url')}
              className={`px-2.5 py-1 rounded-md transition-colors flex items-center gap-1.5 ${
                activeTab === 'url' ? 'bg-cyan-500/20 text-cyan-300 font-semibold' : 'text-neutral-500 hover:text-neutral-300'
              }`}
            >
              <LinkIcon className="w-3 h-3" /> URL
            </button>
          </div>
        </div>

        {activeTab === 'upload' && (
          <div className="space-y-2">
            {imagePreview ? (
              <div className="relative rounded-lg overflow-hidden border border-neutral-800 bg-neutral-900 group">
                <img src={imagePreview} alt="Preview" className="w-full h-28 object-cover" />
                {uploadingImage && (
                  <div className="absolute inset-0 bg-black/70 flex items-center justify-center gap-2 text-cyan-400 text-xs font-mono">
                    <Loader2 className="w-4 h-4 animate-spin" /> Uploading...
                  </div>
                )}
                {!uploadingImage && (
                  <button
                    type="button"
                    onClick={() => { setImageUrl(''); setImagePreview(null); if (fileInputRef.current) fileInputRef.current.value = '' }}
                    className="absolute top-2 right-2 p-1.5 bg-red-500/80 hover:bg-red-500 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            ) : (
              <div className="border border-dashed border-neutral-800 hover:border-cyan-500/50 rounded-xl p-5 text-center relative bg-neutral-900/30 group transition-colors">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  disabled={uploadingImage}
                  className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                />
                <Upload className="w-5 h-5 mx-auto mb-1.5 text-cyan-400 group-hover:scale-110 transition-transform" />
                <p className="text-xs text-white font-medium">Click to upload certificate photo</p>
                <p className="text-[11px] text-neutral-600 font-mono mt-0.5">PNG, JPG, PDF preview</p>
              </div>
            )}
            {uploadMsg && (
              <div className="flex items-center gap-1.5 text-xs font-mono text-cyan-400">
                <CheckCircle2 className="w-3.5 h-3.5" /> {uploadMsg}
              </div>
            )}
          </div>
        )}

        {activeTab === 'url' && (
          <div className="space-y-2">
            <input
              name="imageUrl_url"
              value={imageUrl}
              onChange={(e) => { setImageUrl(e.target.value); setImagePreview(e.target.value || null) }}
              className={inputClass}
              placeholder="https://example.com/cert-image.png"
            />
            {imagePreview && (
              <img src={imagePreview} alt="Preview" className="w-full h-24 object-cover rounded-lg border border-neutral-800" />
            )}
          </div>
        )}
      </div>

      <div>
        <label className={labelClass}>Order</label>
        <input name="orderIndex" type="number" defaultValue={0} className={inputClass} />
      </div>

      <button
        type="submit"
        disabled={loading || uploadingImage}
        className="w-full bg-white text-black font-semibold py-3 rounded-lg text-sm hover:bg-neutral-200 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
      >
        {loading ? (
          <><Loader2 className="w-4 h-4 animate-spin" /> Saving...</>
        ) : done ? (
          <><CheckCircle2 className="w-4 h-4 text-emerald-600" /> ✓ Certificate Saved!</>
        ) : 'Add Certificate'}
      </button>
    </form>
  )
}
