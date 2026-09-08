/**
 * FRONTEND — Site Layout
 * Wraps the public-facing portfolio with smooth scroll, cursor, and preloader
 */
import SmoothScrollProvider from '@/frontend/providers/SmoothScrollProvider'
import CustomCursor from '@/frontend/components/ui/CustomCursor'
import Preloader from '@/frontend/components/ui/Preloader'
import Navigation from '@/frontend/components/layout/Navigation'
import Footer from '@/frontend/components/layout/Footer'

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-neutral-950 text-neutral-50 min-h-screen">
      {/* Cinematic grain overlay */}
      <div className="grain-overlay" aria-hidden="true" />
      <Preloader />
      <CustomCursor />
      <SmoothScrollProvider>
        <Navigation />
        <main id="main-content" tabIndex={-1}>
          {children}
        </main>
        <Footer />
      </SmoothScrollProvider>
    </div>
  )
}
