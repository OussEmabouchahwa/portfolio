'use client'

/**
 * FRONTEND — Contact Section & Footer
 * Glassmorphic form inputs with cyan focus glow rings, dynamic submit feedback, and Sfax timestamp clock.
 */
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { createLead } from '@/backend/actions/leads'
import { Send, Terminal, X, CheckCircle, Clock } from 'lucide-react'

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
          setTimeout(() => setTerminalLines(prev => [...prev, '> role', 'Software Engineer & Creative Technologist']), 500)
          setTimeout(() => setTerminalLines(prev => [...prev, '> location', 'Sfax, Tunisia (34.7406° N, 10.7603° E)']), 1000)
          setTimeout(() => setTerminalLines(prev => [...prev, '> status', 'Ready for engineering challenges 🚀']), 1500)
          setTimeout(() => setTerminalLines(prev => [...prev, '> _']), 2000)
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          {/* Left: Headline & Links */}
          <div>
            <p className="section-label">07 — Contact</p>
            <h2 className="text-4xl md:text-6xl font-bold leading-[1.08] mb-6">
              Have something worth building?
            </h2>
            <p className="text-xl text-neutral-400 mb-12 max-w-md">
              Let's make it real.
            </p>

            <div className="space-y-4 font-mono text-sm">
              <a
                href="mailto:oussema.bouchahwa@ipsas.tn"
                className="flex items-center gap-3 text-neutral-400 hover:text-white transition-colors group w-fit"
                data-cursor="view"
              >
                <span className="w-9 h-9 rounded-full border border-neutral-800 bg-neutral-900 flex items-center justify-center group-hover:border-cyan-400 group-hover:text-cyan-400 transition-colors">
                  @
                </span>
                <span>oussema.bouchahwa@ipsas.tn</span>
              </a>

              <a
                href="https://www.linkedin.com/in/bouchahwa-oussema-0216b3264/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-neutral-400 hover:text-white transition-colors group w-fit"
                data-cursor="view"
              >
                <span className="w-9 h-9 rounded-full border border-neutral-800 bg-neutral-900 flex items-center justify-center group-hover:border-cyan-400 group-hover:text-cyan-400 transition-colors text-xs font-bold">
                  in
                </span>
                <span>LinkedIn Profile</span>
              </a>

              <a
                href="https://github.com/OussEmabouchahwa"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-neutral-400 hover:text-white transition-colors group w-fit"
                data-cursor="view"
              >
                <span className="w-9 h-9 rounded-full border border-neutral-800 bg-neutral-900 flex items-center justify-center group-hover:border-cyan-400 group-hover:text-cyan-400 transition-colors text-xs font-bold">
                  gh
                </span>
                <span>GitHub Repositories</span>
              </a>
            </div>

            <div className="mt-16 text-xs font-mono text-neutral-600 flex items-center gap-2">
              <Terminal className="w-3.5 h-3.5 text-cyan-400" />
              <span>Type <kbd className="bg-neutral-900 border border-neutral-800 px-1.5 py-0.5 rounded text-neutral-400">o</kbd> <kbd className="bg-neutral-900 border border-neutral-800 px-1.5 py-0.5 rounded text-neutral-400">b</kbd> <kbd className="bg-neutral-900 border border-neutral-800 px-1.5 py-0.5 rounded text-neutral-400">Enter</kbd> to unlock CLI terminal</span>
            </div>
          </div>

          {/* Right: Glassmorphic Form */}
          <div className="bg-neutral-900/60 border border-neutral-800/80 rounded-2xl p-8 backdrop-blur-md">
            {formState === 'success' ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-12 text-center space-y-4"
              >
                <div className="w-12 h-12 rounded-full bg-cyan-950 border border-cyan-500/40 text-cyan-400 flex items-center justify-center mx-auto">
                  <CheckCircle className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-white">Message Delivered 🚀</h3>
                <p className="text-neutral-400 text-sm max-w-xs mx-auto leading-relaxed">
                  Thank you for reaching out! I will review your message and reply promptly.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="name" className="text-xs font-mono text-neutral-400 uppercase tracking-widest">Name</label>
                    <input
                      id="name"
                      name="name"
                      required
                      className="bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3.5 text-white text-sm placeholder:text-neutral-700 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/50 transition-all duration-300"
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
                      className="bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3.5 text-white text-sm placeholder:text-neutral-700 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/50 transition-all duration-300"
                      placeholder="your@email.com"
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
                    className="bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3.5 text-white text-sm placeholder:text-neutral-700 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/50 transition-all duration-300 resize-none"
                    placeholder="Describe your project, engineering inquiry, or creative vision..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={formState === 'loading'}
                  className="w-full flex items-center justify-center gap-2 bg-white text-black font-semibold py-4 rounded-xl hover:bg-neutral-200 transition-all duration-300 disabled:opacity-60 shadow-[0_0_20px_rgba(255,255,255,0.1)]"
                  data-cursor="view"
                >
                  {formState === 'loading' ? (
                    <span className="font-mono text-xs">Sending Message...</span>
                  ) : (
                    <>Send Message <Send className="w-4 h-4" /></>
                  )}
                </button>

                {formState === 'error' && (
                  <p className="text-red-400 text-xs text-center font-mono">
                    Failed to send message. Please try emailing directly.
                  </p>
                )}
              </form>
            )}
          </div>
        </div>

        {/* Minimalist Footer */}
        <div className="border-t border-neutral-900 pt-12 flex flex-col sm:flex-row items-center justify-between gap-6 font-mono text-xs text-neutral-500">
          <p>Designed, engineered & built by Oussema Bouchahwa.</p>
          <div className="flex items-center gap-2 bg-neutral-900 border border-neutral-800 px-3.5 py-1.5 rounded-full text-neutral-400">
            <Clock className="w-3.5 h-3.5 text-cyan-400" />
            <span>Sfax, Tunisia (GMT+1) {sfaxTime && `· ${sfaxTime}`}</span>
          </div>
        </div>
      </div>

      {/* Easter Egg CLI Terminal */}
      <AnimatePresence>
        {terminalOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-8 right-8 z-50 w-84 bg-neutral-950 border border-neutral-800 rounded-2xl shadow-2xl overflow-hidden backdrop-blur-xl"
          >
            <div className="flex items-center justify-between px-4 py-3 bg-neutral-900 border-b border-neutral-800">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
                <div className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              </div>
              <span className="text-xs text-neutral-400 font-mono">oussema.terminal</span>
              <button onClick={() => setTerminalOpen(false)} className="text-neutral-500 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-4 font-mono text-xs text-cyan-300 space-y-1.5 min-h-[150px]">
              {terminalLines.map((line, i) => (
                <p key={i} className={line.startsWith('>') ? 'text-neutral-500' : 'text-cyan-300'}>
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
