/**
 * FRONTEND — Home Page (Server Component)
 * Fetches CMS data from the database with graceful static fallback.
 * Prevents crash if database is temporarily unreachable or paused.
 */
import db from '@/backend/db/client'
import HomeClient from './HomeClient'
import { defaultProjects, defaultExperiences, defaultCertifications } from '@/lib/data/defaults'

export const dynamic = 'force-dynamic'

export default async function HomePage() {
  let projects = defaultProjects
  let experiences = defaultExperiences
  let certifications = defaultCertifications

  try {
    const [dbProjects, dbExperiences, dbCertifications] = await Promise.all([
      db.project.findMany({ orderBy: { createdAt: 'desc' } }),
      db.experience.findMany({ orderBy: { orderIndex: 'asc' } }),
      db.certification.findMany({ orderBy: { orderIndex: 'asc' } }),
    ])

    if (dbProjects && dbProjects.length > 0) projects = dbProjects
    if (dbExperiences && dbExperiences.length > 0) experiences = dbExperiences
    if (dbCertifications && dbCertifications.length > 0) certifications = dbCertifications
  } catch (error) {
    console.warn('Database query failed; serving curated static fallback data:', error)
  }

  return (
    <HomeClient
      projects={projects}
      experiences={experiences}
      certifications={certifications}
    />
  )
}
