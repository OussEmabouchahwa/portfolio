export default function Footer() {
  return (
    <footer className="bg-neutral-950 pt-32 pb-12 px-6 md:px-12 border-t border-neutral-900 mt-24">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-end gap-12">
        <div>
          <h2 className="text-2xl font-bold tracking-tight mb-2">OUSSEMA BOUCHAHWA</h2>
          <p className="text-neutral-500 mb-6">Software Engineering · Development · Visuals</p>
          
          <div className="flex gap-6 text-sm">
            <a href="https://www.linkedin.com/in/bouchahwa-oussema-0216b3264/" target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-white transition-colors" data-cursor="view">LinkedIn</a>
            <a href="https://github.com/OussEmabouchahwa" target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-white transition-colors" data-cursor="view">GitHub</a>
            <a href="mailto:oussema.bouchahwa@ipsas.tn" className="text-neutral-400 hover:text-white transition-colors" data-cursor="view">Email</a>
          </div>
        </div>

        <div className="text-left md:text-right">
          <p className="text-neutral-400 mb-2">Sfax, Tunisia</p>
          <p className="text-sm text-neutral-600">
            Designed, built & continuously improved by Oussema.
          </p>
          <p className="text-xs text-neutral-700 mt-4">
            &copy; {new Date().getFullYear()} All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
