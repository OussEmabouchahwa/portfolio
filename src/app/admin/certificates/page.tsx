import db from '@/backend/db/client'
import { deleteCertification } from '@/backend/actions/certifications'
import { Trash2 } from 'lucide-react'
import CertForm from './CertForm'
import { defaultCertifications } from '@/lib/data/defaults'

export const dynamic = 'force-dynamic'

export default async function CertificatesPage() {
  let certs = defaultCertifications

  try {
    const dbCerts = await db.certification.findMany({ orderBy: { orderIndex: 'asc' } })
    if (dbCerts && dbCerts.length > 0) {
      certs = dbCerts
    }
  } catch (error) {
    console.warn('Certificates query failed, falling back to defaults:', error)
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-1 text-white">Certifications</h1>
        <p className="text-neutral-500 text-sm font-mono">Manage your credentials and learning achievements.</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-5 gap-8">
        <div className="xl:col-span-3 space-y-3">
          {certs.length === 0 ? (
            <div className="p-10 text-center bg-neutral-900 border border-neutral-800 rounded-xl">
              <p className="text-neutral-500 text-sm font-mono">No certificates yet.</p>
            </div>
          ) : (
            certs.map((cert) => (
              <div key={cert.id} className="bg-neutral-900 border border-neutral-800 rounded-xl p-5 flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-sm mb-0.5 text-white">{cert.title}</h3>
                  <p className="text-neutral-400 text-xs font-mono">{cert.issuer}</p>
                  <p className="text-neutral-600 text-xs mt-1 font-mono">{cert.date}</p>
                </div>
                <form action={async () => { 'use server'; await deleteCertification(cert.id) }}>
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
            <h2 className="font-semibold mb-5 text-sm text-white">Add Certificate</h2>
            <CertForm />
          </div>
        </div>
      </div>
    </div>
  )
}
