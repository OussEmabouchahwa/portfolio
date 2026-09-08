/**
 * FRONTEND — Footer
 */
const socials = [
  { label: 'LinkedIn', href: '[ADD_LINKEDIN_URL]' },
  { label: 'GitHub', href: '[ADD_GITHUB_URL]' },
  { label: 'Instagram', href: '[ADD_INSTAGRAM_URL]' },
  { label: 'Email', href: 'mailto:[ADD_EMAIL]' },
]

export default function Footer() {
  return (
    <footer className="bg-neutral-950 pt-24 pb-12 px-6 md:px-12 border-t border-neutral-900">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-6">
        <div className="md:col-span-2">
          <h2 className="text-2xl font-bold tracking-tight mb-1.5">OUSSEMA BOUCHAHWA</h2>
          <p className="text-neutral-500 text-sm mb-8">Software Engineering · Development · Visuals</p>
          <div className="flex flex-wrap gap-5">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                className="text-sm text-neutral-400 hover:text-white transition-colors duration-200 underline-offset-4 hover:underline"
                target={s.href.startsWith('http') ? '_blank' : undefined}
                rel="noopener noreferrer"
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>

        <div className="text-left md:text-right flex flex-col justify-between">
          <p className="text-neutral-400 text-sm">Sfax, Tunisia</p>
          <div>
            <p className="text-xs text-neutral-600 mb-1">
              Designed, built & continuously improved by Oussema.
            </p>
            <p className="text-xs text-neutral-700">
              &copy; {new Date().getFullYear()}. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
