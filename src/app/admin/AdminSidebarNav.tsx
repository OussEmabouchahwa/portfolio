'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, Briefcase, FileText, Award, Image as ImageIcon, MessageSquare } from 'lucide-react'

const navItems = [
  { name: 'Overview', href: '/admin', icon: LayoutDashboard },
  { name: 'Projects', href: '/admin/projects', icon: Briefcase },
  { name: 'Experience', href: '/admin/experience', icon: FileText },
  { name: 'Certificates', href: '/admin/certificates', icon: Award },
  { name: 'Media', href: '/admin/media', icon: ImageIcon },
  { name: 'Messages', href: '/admin/messages', icon: MessageSquare },
]

export default function AdminSidebarNav() {
  const pathname = usePathname()

  return (
    <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
      {navItems.map(({ name, href, icon: Icon }) => {
        const isActive = pathname === href || (href !== '/admin' && pathname.startsWith(href))

        return (
          <Link
            key={name}
            href={href}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
              isActive
                ? 'bg-neutral-800 text-accent-brand font-semibold shadow-sm'
                : 'text-neutral-400 hover:bg-neutral-800/60 hover:text-white'
            }`}
          >
            <Icon className={`w-4 h-4 flex-shrink-0 ${isActive ? 'text-accent-brand' : 'text-neutral-400'}`} />
            <span>{name}</span>
          </Link>
        )
      })}
    </nav>
  )
}
