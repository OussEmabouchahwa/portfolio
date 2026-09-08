import Link from 'next/link'
import { LayoutDashboard, Briefcase, FileText, Award, Image, MessageSquare } from 'lucide-react'

const navItems = [
  { name: 'Overview',      href: '/admin',              icon: LayoutDashboard },
  { name: 'Projects',      href: '/admin/projects',     icon: Briefcase },
  { name: 'Experience',    href: '/admin/experience',   icon: FileText },
  { name: 'Certificates',  href: '/admin/certificates', icon: Award },
  { name: 'Media',         href: '/admin/media',        icon: Image },
  { name: 'Messages',      href: '/admin/messages',     icon: MessageSquare },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="admin-layout flex h-screen bg-neutral-950 text-white overflow-hidden" style={{ cursor: 'auto' }}>
      {/* Sidebar */}
      <aside className="w-60 bg-neutral-900 border-r border-neutral-800 flex flex-col flex-shrink-0">
        <div className="p-6 border-b border-neutral-800">
          <p className="text-xs text-neutral-500 tracking-[0.2em] uppercase mb-1">Oussema Studio</p>
          <h1 className="text-lg font-bold tracking-tight">Content Manager</h1>
        </div>

        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {navItems.map(({ name, href, icon: Icon }) => (
            <Link
              key={name}
              href={href}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-neutral-400 hover:bg-neutral-800 hover:text-white transition-colors text-sm font-medium"
            >
              <Icon className="w-4 h-4 flex-shrink-0" />
              {name}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-neutral-800 space-y-2">
          <Link
            href="/"
            className="flex items-center gap-2 px-3 py-2 text-sm text-neutral-500 hover:text-white transition-colors rounded-lg hover:bg-neutral-800"
          >
            ← View Portfolio
          </Link>
          <p className="text-xs text-neutral-700 px-3">Studio v1.0</p>
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
