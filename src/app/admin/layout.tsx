import Link from 'next/link'
import AdminSidebarNav from './AdminSidebarNav'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="admin-layout flex h-screen bg-neutral-950 text-white overflow-hidden" style={{ cursor: 'auto' }}>
      {/* Sidebar */}
      <aside className="w-60 bg-neutral-900 border-r border-neutral-800 flex flex-col flex-shrink-0">
        <div className="p-6 border-b border-neutral-800 flex items-center gap-3">
          <div className="h-9 px-2 py-1 rounded-lg border border-neutral-800 bg-neutral-950 flex items-center justify-center flex-shrink-0">
            <img
              src="/my photos/bo-creation-logo.png"
              alt="BO Creation Logo"
              className="h-6 w-auto object-contain"
            />
          </div>
          <div>
            <p className="text-[10px] text-neutral-500 tracking-[0.2em] uppercase font-mono">BO Creation</p>
            <h1 className="text-sm font-bold tracking-tight text-white">Content Studio</h1>
          </div>
        </div>

        <AdminSidebarNav />

        <div className="p-4 border-t border-neutral-800 space-y-2">
          <Link
            href="/"
            className="flex items-center gap-2 px-3 py-2 text-xs font-mono text-neutral-400 hover:text-white transition-colors rounded-lg hover:bg-neutral-800"
          >
            ← View Portfolio
          </Link>
          <p className="text-[10px] font-mono text-neutral-600 px-3">Studio v2.1</p>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-y-auto p-8" style={{ cursor: 'auto' }}>
        <div className="max-w-5xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  )
}
