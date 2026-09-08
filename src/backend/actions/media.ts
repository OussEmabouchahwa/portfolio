'use me'
'use server'

import db from '@/backend/db/client'
import { revalidatePath } from 'next/cache'

export async function createMedia(data: { url: string; category: string; altText?: string }) {
  const media = await db.media.create({
    data: {
      url: data.url,
      category: data.category || 'Photography',
      altText: data.altText || null,
    },
  })
  revalidatePath('/admin/media')
  revalidatePath('/#visuals')
  revalidatePath('/')
  return media
}

export async function deleteMedia(id: string) {
  await db.media.delete({ where: { id } })
  revalidatePath('/admin/media')
  revalidatePath('/#visuals')
  revalidatePath('/')
}
