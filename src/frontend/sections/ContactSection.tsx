'use client'

/**
 * FRONTEND — Contact Section & Footer
 * Minimalist glassmorphic form with accent-brand focus rings, direct social links,
 * live Sfax GMT+1 timezone clock, and CLI easter egg terminal.
 */
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { createLead } from '@/backend/actions/leads'
import { Send, Terminal, X, CheckCircle, Clock, ArrowUpRight } from 'lucide-react'
import { EASE, DUR } from '@/lib/motion'

const EASTER_EGG_COMBO = ['o', 'b', 'Enter']

export default function ContactSection() {
  const [formState, setFormState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [terminalOpen, setTerminalOpen] = useState(false)
  const [terminalLines, setTerminalLines] = useState<string[]>(['> _'])
  const [sfaxTime, setSfaxTime] = useState<string>('')

  // Live Sfax Tunisia Clock (GMT+1)
  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      const timeStr = new Intl.DateTimeFormat('en-GB', {
        timeZone: 'Africa/Tunis',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      }).format(now)
      setSfaxTime(timeStr)
    }

    updateTime()
    const timer = setInterval(updateTime, 1000)
    return () => clearInterval(timer)
  }, [])

  // Easter egg: type "ob" then Enter
  useEffect(() => {
    let buffer: string[] = []
    const handler = (e: KeyboardEvent) => {
      buffer.push(e.key)
      if (buffer.length > 3) buffer = buffer.slice(-3)
      if (JSON.stringify(buffer) === JSON.stringify(EASTER_EGG_COMBO)) {
        setTerminalOpen(true)
        buffer = []
        setTimeout(() => {
          setTerminalLines(['> whoami', 'Oussema Bouchahwa'])
          setTimeout(() => setTerminalLines(prev => [...prev, '> role', 'Backend / Full-Stack Engineer & Visual Director']), 500)
          setTimeout(() => setTerminalLines(prev => [...prev, '> education', 'IPSAS Sfax (Computer Science Year 2)']), 900)
          setTimeout(() => setTerminalLines(prev => [...prev, '> studio', 'Route Insolite Photography']), 1300)
          setTimeout(() => setTerminalLines(prev => [...prev, '> location', 'Sfax, Tunisia (34.7406° N, 10.7603° E)']), 1700)
          setTimeout(() => setTerminalLines(prev => [...prev, '> status', 'Open for high-impact engineering & visual production']), 2100)
          setTimeout(() => setTerminalLines(prev => [...prev, '> _']), 2500)
        }, 200)
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setFormState('loading')
    const fd = new FormData(e.currentTarget)
    try {
      await createLead({
        name: fd.get('name') as string,
        email: fd.get('email') as string,
        message: fd.get('message') as string,
      })
      setFormState('success')
    } catch {
      setFormState('error')
    }
  }

  return (
    <section id="contact" className="py-32 px-6 md:px-12 border-t border-neutral-900 bg-neutral-950">
      <div className="max-w-7xl mx-auto space-y-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-start">
          {/* Left: Direct Contacts & Context */}
          <div>
            <p className="section-label">07 / Contact</p>
            <h2 className="text-4xl md:text-6xl font-bold leading-[1.06] mb-6 text-white">
              Have something worth building?
            </h2>
            <p className="text-lg text-neutral-400 mb-10 max-w-md leading-relaxed">
              Available for full-stack web engineering, PostgreSQL schema design, and creative visual production.
            </p>

            <div className="space-y-4 font-mono text-sm">
              <a
                href="mailto:oussema.bouchahwa@ipsas.tn"
                className="flex items-center gap-3.5 text-neutral-400 hover:text-white transition-colors group w-fit"
                data-cursor="view"
              >
                <span
                  className="w-10 h-10 border border-neutral-800 bg-neutral-900/80 flex items-center justify-center group-hover:border-accent-brand group-hover:text-accent-brand transition-colors"
                  style={{ borderRadius: 'var(--radius-pill)' }}
                >
                  @
                </span>
                <span className="group-hover:underline">oussema.bouchahwa@ipsas.tn</span>
              </a>

              <a
                href="https://www.linkedin.com/in/bouchahwa-oussema-0216b3264/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3.5 text-neutral-400 hover:text-white transition-colors group w-fit"
                data-cursor="view"
              >
                <span
                  className="w-10 h-10 border border-neutral-800 bg-neutral-900/80 flex items-center justify-center group-hover:border-accent-brand group-hover:text-accent-brand transition-colors text-xs font-bold"
                  style={{ borderRadius: 'var(--radius-pill)' }}
                >
                  in
                </span>
                <span className="flex items-center gap-1.5 group-hover:underline">
                  LinkedIn Profile <ArrowUpRight className="w-3.5 h-3.5 text-neutral-600 group-hover:text-accent-brand" />
                </span>
              </a>

              <a
                href="https://github.com/OussEmabouchahwa"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3.5 text-neutral-400 hover:text-white transition-colors group w-fit"
                data-cursor="view"
              >
                <span
                  className="w-10 h-10 border border-neutral-800 bg-neutral-900/80 flex items-center justify-center group-hover:border-accent-brand group-hover:text-accent-brand transition-colors text-xs font-bold"
                  style={{ borderRadius: 'var(--radius-pill)' }}
                >
                  gh
                </span>
                <span className="flex items-center gap-1.5 group-hover:underline">
                  GitHub Repositories <ArrowUpRight className="w-3.5 h-3.5 text-neutral-600 group-hover:text-accent-brand" />
                </span>
              </a>
            </div>

            <div className="mt-14 pt-8 border-t border-neutral-900 text-xs font-mono text-neutral-500 flex items-center gap-2.5">
              <Terminal className="w-3.5 h-3.5 text-accent-brand" />
              <span>
                CLI Hotkey: type <kbd className="bg-neutral-900 border border-neutral-800 px-1.5 py-0.5 rounded text-neutral-300">o</kbd> <kbd className="bg-neutral-900 border border-neutral-800 px-1.5 py-0.5 rounded text-neutral-300">b</kbd> <kbd className="bg-neutral-900 border border-neutral-800 px-1.5 py-0.5 rounded text-neutral-300">Enter</kbd> to unlock terminal
              </span>
            </div>
          </div>

          {/* Right: Clean Contact Form */}
          <div
            className="bg-neutral-900/50 border border-neutral-800/80 p-8 md:p-9 backdrop-blur-md shadow-2xl"
            style={{ borderRadius: 'var(--radius-card)' }}
          >
            {formState === 'success' ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: DUR.base, ease: EASE }}
                className="py-12 text-center space-y-4"
              >
                <div
                  className="w-12 h-12 bg-neutral-800 border border-accent-brand/40 text-accent-brand flex items-center justify-center mx-auto"
                  style={{ borderRadius: 'var(--radius-pill)' }}
                >
                  <CheckCircle className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white">Message Delivered</h3>
                <p className="text-neutral-400 text-xs max-w-xs mx-auto leading-relaxed">
                  Thank you for reaching out. I typically respond within 24 hours.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="name" className="text-xs font-mono text-neutral-400 uppercase tracking-widest">Name</label>
                    <input
                      id="name"
                      name="name"
                      required
                      style={{ borderRadius: 'var(--radius-card)' }}
                      className="bg-neutral-950/80 border border-neutral-800 px-4 py-3 text-white text-sm placeholder:text-neutral-600 focus:outline-none focus:border-accent-brand focus:ring-1 focus:ring-accent-brand/50 transition-all duration-200"
                      placeholder="Your Name"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="email" className="text-xs font-mono text-neutral-400 uppercase tracking-widest">Email</label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      style={{ borderRadius: 'var(--radius-card)' }}
                      className="bg-neutral-950/80 border border-neutral-800 px-4 py-3 text-white text-sm placeholder:text-neutral-600 focus:outline-none focus:border-accent-brand focus:ring-1 focus:ring-accent-brand/50 transition-all duration-200"
                      placeholder="name@domain.com"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="message" className="text-xs font-mono text-neutral-400 uppercase tracking-widest">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    style={{ borderRadius: 'var(--radius-card)' }}
                    className="bg-neutral-950/80 border border-neutral-800 px-4 py-3 text-white text-sm placeholder:text-neutral-600 focus:outline-none focus:border-accent-brand focus:ring-1 focus:ring-accent-brand/50 transition-all duration-200 resize-none"
                    placeholder="Describe your engineering project, database challenge, or visual production brief..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={formState === 'loading'}
                  style={{ borderRadius: 'var(--radius-card)' }}
                  className="w-full flex items-center justify-center gap-2 bg-white text-black text-sm font-semibold py-3.5 hover:bg-neutral-200 transition-all duration-200 disabled:opacity-60 shadow-md shadow-white/5 cursor-pointer"
                  data-cursor="view"
                >
                  {formState === 'loading' ? (
                    <span className="font-mono text-xs">Transmitting Message...</span>
                  ) : (
                    <>Send Inquiry <Send className="w-3.5 h-3.5" /></>
                  )}
                </button>

                {formState === 'error' && (
                  <p className="text-amber-400 text-xs text-center font-mono pt-1">
                    Direct message failed. Please email directly at{' '}
                    <a href="mailto:oussema.bouchahwa@ipsas.tn" className="underline text-white">
                      oussema.bouchahwa@ipsas.tn
                    </a>
                  </p>
                )}
              </form>
            )}
          </div>
        </div>

        {/* Minimalist Art-Directed Footer */}
        <div className="border-t border-neutral-900 pt-12 flex flex-col sm:flex-row items-center justify-between gap-6 font-mono text-xs text-neutral-500">
          <p>© {new Date().getFullYear()} Oussema Bouchahwa · All rights reserved.</p>

          <div
            className="flex items-center gap-2 bg-neutral-900/80 border border-neutral-800 px-3.5 py-1.5 text-neutral-400"
            style={{ borderRadius: 'var(--radius-pill)' }}
          >
            <Clock className="w-3.5 h-3.5 text-accent-brand" />
            <span>Sfax, Tunisia (GMT+1) {sfaxTime && `· ${sfaxTime}`}</span>
          </div>
        </div>
      </div>

      {/* Easter Egg CLI Terminal Modal */}
      <AnimatePresence>
        {terminalOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: DUR.base, ease: EASE }}
            className="fixed bottom-8 right-8 z-50 w-88 max-w-[calc(100vw-4rem)] bg-neutral-950 border border-neutral-800 shadow-2xl overflow-hidden backdrop-blur-xl"
            style={{ borderRadius: 'var(--radius-card)' }}
          >
            <div className="flex items-center justify-between px-4 py-3 bg-neutral-900 border-b border-neutral-800">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
              </div>
              <span className="text-xs text-neutral-400 font-mono">oussema.terminal</span>
              <button onClick={() => setTerminalOpen(false)} className="text-neutral-500 hover:text-white" aria-label="Close terminal">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-4 font-mono text-xs text-accent-brand space-y-1.5 min-h-[160px] bg-neutral-950">
              {terminalLines.map((line, i) => (
                <p key={i} className={line.startsWith('>') ? 'text-neutral-500' : 'text-accent-brand'}>
                  {line}
                </p>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
