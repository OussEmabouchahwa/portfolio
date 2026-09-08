/**
 * FRONTEND — Home Page (Server Component)
 * Fetches all CMS data from the backend and passes it to HomeClient.
 * This pattern: Server fetches → Client renders (clean separation).
 */
import db from '@/backend/db/client'
import HomeClient from './HomeClient'

export const dynamic = 'force-dynamic'

export default async function HomePage() {
  const [projects, experiences, certifications] = await Promise.all([
    db.project.findMany({ orderBy: { createdAt: 'desc' } }),
    db.experience.findMany({ orderBy: { orderIndex: 'asc' } }),
    db.certification.findMany({ orderBy: { orderIndex: 'asc' } }),
  ])

  return (
    <HomeClient
      projects={projects}
      experiences={experiences}
      certifications={certifications}
    />
  )
}
