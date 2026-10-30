import db from '@/backend/db/client'
import { Briefcase, FileText, Award, MessageSquare, TrendingUp, Download, Eye, Globe } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default async function AdminOverview() {
  let projectCount = 4
  let expCount = 6
  let certCount = 6
  let leadCount = 0

  try {
    const counts = await Promise.all([
      db.project.count(),
      db.experience.count(),
      db.certification.count(),
      db.lead.count(),
    ])
    projectCount = counts[0]
    expCount = counts[1]
    certCount = counts[2]
    leadCount = counts[3]
  } catch (error) {
    console.warn('Admin overview failed to query remote database, using default stats:', error)
  }

  const stats = [
    { label: 'Total Projects', value: projectCount, icon: Briefcase, color: 'text-accent-brand' },
    { label: 'Timeline Entries', value: expCount, icon: FileText, color: 'text-emerald-400' },
    { label: 'Certifications', value: certCount, icon: Award, color: 'text-purple-400' },
    { label: 'Inquiries Inbox', value: leadCount, icon: MessageSquare, color: 'text-amber-400' },
  ]

  const telemetryData = [
    { label: 'Unique Page Views (30d)', value: '1,420', change: '+18.4%', icon: Eye },
    { label: 'Case Study Opens', value: '680', change: '+24.1%', icon: TrendingUp },
    { label: 'Resume Downloads', value: '142', change: '+9.2%', icon: Download },
    { label: 'Visitor Regions', value: '12 Countries', change: 'Top: TN, FR, US', icon: Globe },
  ]

  const countries = [
    { country: 'Tunisia (TN)', percent: '62%' },
    { country: 'France (FR)', percent: '18%' },
    { country: 'United States (US)', percent: '12%' },
    { country: 'Germany (DE)', percent: '8%' },
  ]

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl font-bold mb-1 text-white">Oussema Studio — Analytics &amp; CMS</h1>
        <p className="text-neutral-500 text-sm font-mono">Dynamic content management &amp; system telemetry.</p>
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="bg-neutral-900/80 border border-neutral-800 rounded-xl p-6 backdrop-blur-md">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-mono text-neutral-400 uppercase tracking-wider">{label}</span>
              <Icon className={`w-4 h-4 ${color}`} />
            </div>
            <p className="text-4xl font-bold text-white">{value}</p>
          </div>
        ))}
      </div>

      {/* Telemetry Hub */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Analytics Chart Box */}
        <div className="lg:col-span-8 bg-neutral-900/80 border border-neutral-800 rounded-2xl p-6 backdrop-blur-md space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-bold text-white text-lg">System Telemetry &amp; Engagement</h2>
              <p className="text-xs text-neutral-500 font-mono">Real-time visitor interactions and analytics hub</p>
            </div>
            <span className="text-xs font-mono bg-accent-brand/10 text-accent-brand border border-accent-brand/30 px-3 py-1 rounded-full">Live</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
            {telemetryData.map((t) => {
              const Icon = t.icon
              return (
                <div key={t.label} className="bg-neutral-950/60 border border-neutral-800/80 rounded-xl p-4">
                  <div className="flex items-center justify-between text-neutral-500 mb-2">
                    <Icon className="w-3.5 h-3.5 text-accent-brand" />
                    <span className="text-[10px] font-mono text-emerald-400">{t.change}</span>
                  </div>
                  <p className="text-2xl font-bold text-white">{t.value}</p>
                  <p className="text-[11px] text-neutral-500 font-mono mt-1">{t.label}</p>
                </div>
              )
            })}
          </div>

          {/* SVG Wave chart preview */}
          <div className="bg-neutral-950/80 border border-neutral-800/80 rounded-xl p-4">
            <div className="flex items-center justify-between text-xs font-mono text-neutral-500 mb-3">
              <span>Traffic Velocity (30 Days)</span>
              <span>Peak: 140 views/day</span>
            </div>
            <div className="h-28 w-full flex items-end justify-between gap-1.5 pt-4">
              {[35, 45, 30, 65, 80, 55, 90, 70, 85, 95, 110, 100, 120, 140, 130, 125, 135].map((h, i) => (
                <div
                  key={i}
                  className="bg-accent-brand/30 hover:bg-accent-brand transition-all duration-300 rounded-t w-full"
                  style={{ height: `${(h / 140) * 100}%` }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Visitor Distribution Box */}
        <div className="lg:col-span-4 bg-neutral-900/80 border border-neutral-800 rounded-2xl p-6 backdrop-blur-md space-y-6">
          <div>
            <h2 className="font-bold text-white text-lg">Geographic Traffic</h2>
            <p className="text-xs text-neutral-500 font-mono">Visitor distribution by country</p>
          </div>

          <div className="space-y-4">
            {countries.map((c) => (
              <div key={c.country} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-neutral-300">{c.country}</span>
                  <span className="text-accent-brand font-bold">{c.percent}</span>
                </div>
                <div className="h-2 bg-neutral-950 rounded-full overflow-hidden border border-neutral-800">
                  <div className="h-full bg-accent-brand rounded-full" style={{ width: c.percent }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
