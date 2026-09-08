'use client'

/**
 * FRONTEND — Home Page Client Component
 * Assembles all sections. Receives server-fetched data as props.
 * This is the only place where all sections are composed.
 */
import HeroSection from '@/frontend/sections/HeroSection'
import AboutSection from '@/frontend/sections/AboutSection'
import WorkSection from '@/frontend/sections/WorkSection'
import SkillsSection from '@/frontend/sections/SkillsSection'
import ExperienceSection from '@/frontend/sections/ExperienceSection'
import CertificationsSection from '@/frontend/sections/CertificationsSection'
import VisualsSection from '@/frontend/sections/VisualsSection'
import ContactSection from '@/frontend/sections/ContactSection'

type Project = {
  id: string; title: string; description: string; techStack: string;
  images: string; liveUrl: string | null; githubUrl: string | null;
  client: string | null; year: string | null; isFeatured: boolean;
}
type Experience = {
  id: string; role: string; company: string; duration: string;
  description: string; skillsUsed: string; orderIndex: number;
}
type Certification = {
  id: string; title: string; issuer: string; date: string;
  credentialId: string | null; credentialUrl: string | null;
  imageUrl: string | null; orderIndex: number;
}

interface HomeClientProps {
  projects: Project[]
  experiences: Experience[]
  certifications: Certification[]
}

export default function HomeClient({ projects, experiences, certifications }: HomeClientProps) {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <WorkSection projects={projects} />
      <SkillsSection />
      <ExperienceSection experiences={experiences} />
      <CertificationsSection certifications={certifications} />
      <VisualsSection />
      <ContactSection />
    </>
  )
}
