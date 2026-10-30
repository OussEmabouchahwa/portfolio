import db from '@/backend/db/client'
import { deleteLead } from '@/backend/actions/leads'
import { Trash2 } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default async function MessagesPage() {
  let leads: Array<{ id: string; name: string; email: string; message: string; createdAt: Date }> = []

  try {
    leads = await db.lead.findMany({ orderBy: { createdAt: 'desc' } })
  } catch (error) {
    console.warn('Messages query failed:', error)
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-1 text-white">Messages</h1>
        <p className="text-neutral-500 text-sm font-mono">{leads.length} message{leads.length !== 1 ? 's' : ''} reçus via le formulaire de contact.</p>
      </div>

      {leads.length === 0 ? (
        <div className="p-16 text-center bg-neutral-900 border border-neutral-800 rounded-xl">
          <p className="text-neutral-500 font-mono text-sm">Aucun message pour le moment. Ils apparaîtront ici quand quelqu'un vous contactera.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {leads.map((lead) => (
            <div key={lead.id} className="bg-neutral-900 border border-neutral-800 rounded-xl p-6">
              <div className="flex items-start justify-between gap-4 mb-3">
                <div>
                  <h3 className="font-semibold text-white">{lead.name}</h3>
                  <a href={`mailto:${lead.email}`} className="text-sm font-mono text-accent-brand hover:underline transition-colors">{lead.email}</a>
                </div>
                <div className="flex items-center gap-3 flex-shrink-0">
                  <span className="text-xs text-neutral-500 font-mono">{new Date(lead.createdAt).toLocaleDateString()}</span>
                  <form action={async () => { 'use server'; await deleteLead(lead.id) }}>
                    <button type="submit" className="p-1.5 text-neutral-600 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors cursor-pointer" title="Supprimer">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </form>
                </div>
              </div>
              <p className="text-neutral-300 text-sm leading-relaxed whitespace-pre-wrap">{lead.message}</p>
              <a
                href={`mailto:${lead.email}`}
                className="mt-4 inline-flex items-center gap-2 text-xs font-mono text-neutral-400 hover:text-white border border-neutral-800 hover:border-neutral-600 px-3 py-1.5 rounded-lg transition-colors"
              >
                Répondre par email
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
