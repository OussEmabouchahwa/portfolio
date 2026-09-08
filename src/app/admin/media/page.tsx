import db from '@/backend/db/client'
import MediaVaultClient from './MediaVaultClient'

export const dynamic = 'force-dynamic'

export default async function MediaPage() {
  const media = await db.media.findMany({
    orderBy: { createdAt: 'desc' },
  })

  return <MediaVaultClient initialMedia={media} />
}
