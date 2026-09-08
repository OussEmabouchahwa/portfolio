import db from '@/backend/db/client'
import { deleteLead } from '@/backend/actions/leads'
import { Trash2 } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default async function MessagesPage() {
  const leads = await db.lead.findMany({ orderBy: { createdAt: 'desc' } })

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-1">Messages</h1>
        <p className="text-neutral-500 text-sm">{leads.length} message{leads.length !== 1 ? 's' : ''} from the contact form.</p>
      </div>

      {leads.length === 0 ? (
        <div className="p-16 text-center bg-neutral-900 border border-neutral-800 rounded-xl">
          <p className="text-neutral-500">No messages yet. They will appear here when someone uses the contact form.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {leads.map(lead => (
            <div key={lead.id} className="bg-neutral-900 border border-neutral-800 rounded-xl p-6">
              <div className="flex items-start justify-between gap-4 mb-3">
                <div>
                  <h3 className="font-semibold">{lead.name}</h3>
                  <a href={`mailto:${lead.email}`} className="text-sm text-neutral-400 hover:text-white transition-colors">{lead.email}</a>
                </div>
                <div className="flex items-center gap-3 flex-shrink-0">
                  <span className="text-xs text-neutral-600">{new Date(lead.createdAt).toLocaleDateString()}</span>
                  <form action={async () => { 'use server'; await deleteLead(lead.id) }}>
                    <button type="submit" className="p-1.5 text-neutral-600 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </form>
                </div>
              </div>
              <p className="text-neutral-400 text-sm leading-relaxed whitespace-pre-wrap">{lead.message}</p>
              <a
                href={`mailto:${lead.email}`}
                className="mt-4 inline-flex items-center gap-2 text-xs text-neutral-500 hover:text-white border border-neutral-800 hover:border-neutral-600 px-3 py-1.5 rounded-lg transition-colors"
              >
                Reply via email
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
