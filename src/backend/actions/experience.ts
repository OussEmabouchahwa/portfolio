'use server'

/**
 * BACKEND — Experience Server Actions
 */
import db from '@/backend/db/client'
import { revalidatePath } from 'next/cache'

export async function getExperiences() {
  return await db.experience.findMany({ orderBy: { orderIndex: 'asc' } })
}

export async function createExperience(data: {
  role: string
  company: string
  duration: string
  description: string
  skillsUsed: string
  orderIndex?: number
}) {
  const exp = await db.experience.create({ data })
  revalidatePath('/admin/experience')
  revalidatePath('/')
  return exp
}

export async function deleteExperience(id: string) {
  await db.experience.delete({ where: { id } })
  revalidatePath('/admin/experience')
  revalidatePath('/')
}
