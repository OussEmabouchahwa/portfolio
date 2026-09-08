'use client'

/**
 * FRONTEND — Visual Stories & AI Showcase ("Behind the Lens")
 * Dynamic Masonry Grid, Image & Video Lightbox player with keyboard controls (ESC, Left, Right).
 */
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Sparkles, ChevronLeft, ChevronRight, Play, Volume2 } from 'lucide-react'

const photoCategories = ['All', 'Travel', 'Couples', 'Events', 'Lifestyle']

const defaultPhotos = [
  { id: '1', category: 'Travel', label: 'Sahara Expedition', aspectClass: 'aspect-[4/5]', imgUrl: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1200&q=80' },
  { id: '2', category: 'Couples', label: 'Anniversary Session', aspectClass: 'aspect-square', imgUrl: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=1200&q=80' },
  { id: '3', category: 'Events', label: 'Wedding Ceremony', aspectClass: 'aspect-[4/5]', imgUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80' },
  { id: '4', category: 'Travel', label: 'Coastal Horizons', aspectClass: 'aspect-square', imgUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80' },
  { id: '5', category: 'Lifestyle', label: 'Golden Hour Studio', aspectClass: 'aspect-[4/5]', imgUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=80' },
  { id: '6', category: 'Couples', label: 'Route Insolite Memories', aspectClass: 'aspect-square', imgUrl: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=1200&q=80' },
]

interface VideoItem {
  id: string
  title: string
  tools: string[]
  cover: string
  videoUrl: string
}

const aiVideos: VideoItem[] = [
  {
    id: 'vid-1',
    title: 'Generative Visual Composition #1',
    tools: ['Midjourney v6', 'Runway Gen-2', 'DaVinci Resolve'],
    cover: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1000&q=80',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4'
  },
  {
    id: 'vid-2',
    title: 'AI Cybernetic Portrait Study',
    tools: ['Midjourney', 'Photoshop AI', 'Color Grade'],
    cover: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1000&q=80',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4'
  },
]

export default function VisualsSection() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const [activeVideo, setActiveVideo] = useState<VideoItem | null>(null)

  const filtered = activeCategory === 'All'
    ? defaultPhotos
    : defaultPhotos.filter(p => p.category === activeCategory)

  // Keyboard navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedIndex(null)
        setActiveVideo(null)
      }
      if (selectedIndex !== null) {
        if (e.key === 'ArrowRight') {
          setSelectedIndex((prev) => (prev !== null ? (prev + 1) % filtered.length : null))
        }
        if (e.key === 'ArrowLeft') {
          setSelectedIndex((prev) => (prev !== null ? (prev - 1 + filtered.length) % filtered.length : null))
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedIndex, filtered.length])

  return (
    <section id="visuals" className="py-32 px-6 md:px-12 border-t border-neutral-900">
      <div className="max-w-7xl mx-auto">
        <p className="section-label">06 — Visual Stories</p>
        <h2 className="text-3xl md:text-5xl font-bold leading-tight mb-4 max-w-xl">
          Behind the Lens
        </h2>
        <p className="text-neutral-400 mb-12 max-w-lg text-sm md:text-base">
          Working on location at Route Insolite put professional camera gear in my hands. Photographed couples, directed travel sessions, and captured authentic moments.
        </p>

        {/* Category filter tabs */}
        <div className="flex flex-wrap gap-2 mb-12">
          {photoCategories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-mono transition-all duration-300 relative ${
                activeCategory === cat
                  ? 'bg-white text-black font-semibold shadow-[0_0_15px_rgba(255,255,255,0.2)]'
                  : 'border border-neutral-800 text-neutral-400 hover:border-neutral-600 hover:text-white bg-neutral-900/40'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Masonry grid */}
        <div className="columns-2 md:columns-3 gap-4 space-y-4">
          {filtered.map((photo, i) => (
            <motion.div
              key={photo.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className={`break-inside-avoid rounded-2xl overflow-hidden bg-neutral-900 border border-neutral-800 ${photo.aspectClass} relative group cursor-pointer`}
              onClick={() => setSelectedIndex(i)}
              data-cursor="view"
            >
              <img
                src={photo.imgUrl}
                alt={photo.label}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-neutral-950/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4 text-center backdrop-blur-[2px]">
                <div>
                  <span className="text-white text-sm font-bold block mb-1">{photo.label}</span>
                  <span className="font-mono text-[10px] text-cyan-400 uppercase tracking-widest">{photo.category}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* AI & Video Showcase */}
        <div className="mt-28 border-t border-neutral-900/80 pt-16">
          <div className="flex items-center gap-3 mb-4">
            <Sparkles className="w-5 h-5 text-cyan-400" />
            <p className="font-mono text-xs text-cyan-400 uppercase tracking-widest">AI × Visual Synthesis</p>
          </div>
          <h3 className="text-2xl md:text-4xl font-bold mb-4 max-w-lg">
            When Code Meets Creative Direction
          </h3>
          <p className="text-neutral-400 mb-12 max-w-lg text-sm leading-relaxed">
            AI is an extension of my creative process. Click any video card below to play full screen.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {aiVideos.map((video) => (
              <motion.div
                key={video.id}
                whileInView={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: 30 }}
                viewport={{ once: true }}
                onClick={() => setActiveVideo(video)}
                className="bg-neutral-900/60 border border-neutral-800/80 rounded-2xl overflow-hidden group cursor-pointer hover:border-cyan-500/50 transition-all duration-300 backdrop-blur-md"
                data-cursor="play"
              >
                <div className="aspect-video bg-neutral-950 relative overflow-hidden">
                  <img
                    src={video.cover}
                    alt={video.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80"
                  />
                  <div className="absolute inset-0 bg-neutral-950/40 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-cyan-950/80 border border-cyan-400/60 text-cyan-300 flex items-center justify-center backdrop-blur-md group-hover:scale-110 transition-transform duration-300 shadow-[0_0_25px_rgba(0,240,255,0.3)]">
                      <Play className="w-6 h-6 fill-current ml-1" />
                    </div>
                  </div>
                  <div className="absolute bottom-3 left-3 bg-neutral-950/80 border border-neutral-800 px-3 py-1 rounded-full font-mono text-[10px] text-cyan-400 backdrop-blur-md flex items-center gap-1.5">
                    <Volume2 className="w-3 h-3 text-cyan-400" /> Click to Play
                  </div>
                </div>

                <div className="p-6">
                  <h4 className="font-bold text-white text-lg mb-3 group-hover:text-cyan-400 transition-colors">{video.title}</h4>
                  <div className="flex gap-2 flex-wrap font-mono text-xs">
                    {video.tools.map(t => (
                      <span key={t} className="text-neutral-400 bg-neutral-950 border border-neutral-800 px-3 py-1 rounded-full">{t}</span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Image Lightbox Modal */}
      <AnimatePresence>
        {selectedIndex !== null && filtered[selectedIndex] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-neutral-950/95 backdrop-blur-md flex items-center justify-center p-6"
            onClick={() => setSelectedIndex(null)}
          >
            <div className="relative max-w-4xl w-full flex flex-col items-center" onClick={e => e.stopPropagation()}>
              <div className="w-full flex items-center justify-between mb-4">
                <span className="font-mono text-xs text-neutral-400">
                  {selectedIndex + 1} / {filtered.length} · {filtered[selectedIndex].label}
                </span>
                <button
                  onClick={() => setSelectedIndex(null)}
                  className="flex items-center gap-2 text-neutral-400 hover:text-white transition-colors text-xs font-mono bg-neutral-900 border border-neutral-800 px-3 py-1.5 rounded-full"
                >
                  <X className="w-4 h-4" /> ESC
                </button>
              </div>

              <div className="relative w-full rounded-2xl overflow-hidden border border-neutral-800 max-h-[75vh] flex items-center justify-center bg-black">
                <img
                  src={filtered[selectedIndex].imgUrl}
                  alt={filtered[selectedIndex].label}
                  className="max-h-[75vh] w-auto object-contain"
                />

                <button
                  onClick={() => setSelectedIndex((selectedIndex - 1 + filtered.length) % filtered.length)}
                  className="absolute left-4 w-10 h-10 rounded-full bg-neutral-900/80 border border-neutral-700/80 flex items-center justify-center text-white hover:bg-neutral-800 transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setSelectedIndex((selectedIndex + 1) % filtered.length)}
                  className="absolute right-4 w-10 h-10 rounded-full bg-neutral-900/80 border border-neutral-700/80 flex items-center justify-center text-white hover:bg-neutral-800 transition-colors"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Video Player Modal */}
      <AnimatePresence>
        {activeVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-neutral-950/95 backdrop-blur-xl flex items-center justify-center p-6"
            onClick={() => setActiveVideo(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative max-w-5xl w-full bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between p-5 border-b border-neutral-800 bg-neutral-950">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-cyan-400 animate-ping" />
                  <h3 className="font-bold text-white text-lg">{activeVideo.title}</h3>
                </div>
                <button
                  onClick={() => setActiveVideo(null)}
                  className="flex items-center gap-2 text-neutral-400 hover:text-white transition-colors text-xs font-mono bg-neutral-800 px-3 py-1.5 rounded-full"
                >
                  <X className="w-4 h-4" /> Close ESC
                </button>
              </div>

              {/* Video Player Element */}
              <div className="aspect-video bg-black relative flex items-center justify-center">
                <video
                  src={activeVideo.videoUrl}
                  controls
                  autoPlay
                  playsInline
                  className="w-full h-full object-contain"
                />
              </div>

              <div className="p-5 bg-neutral-950 border-t border-neutral-800 flex items-center justify-between font-mono text-xs text-neutral-400">
                <span>Tools: {activeVideo.tools.join(' · ')}</span>
                <span className="text-cyan-400">AI Visual Showcase</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
