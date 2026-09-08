'use server'

/**
 * BACKEND — Project Server Actions
 * CRUD operations for the Projects model
 */
import db from '@/backend/db/client'
import { revalidatePath } from 'next/cache'

export async function getProjects() {
  return await db.project.findMany({ orderBy: { createdAt: 'desc' } })
}

export async function getFeaturedProjects() {
  return await db.project.findMany({
    where: { isFeatured: true },
    orderBy: { createdAt: 'desc' }
  })
}

export async function getProjectById(id: string) {
  return await db.project.findUnique({ where: { id } })
}

export async function createProject(data: {
  title: string
  description: string
  problem?: string
  solution?: string
  techStack: string
  images: string
  videoUrl?: string
  githubUrl?: string
  liveUrl?: string
  client?: string
  year?: string
  isFeatured?: boolean
}) {
  const project = await db.project.create({ data })
  revalidatePath('/admin/projects')
  revalidatePath('/')
  return project
}

export async function updateProject(id: string, data: Partial<{
  title: string; description: string; problem: string; solution: string;
  techStack: string; images: string; videoUrl: string; githubUrl: string;
  liveUrl: string; client: string; year: string; isFeatured: boolean
}>) {
  const project = await db.project.update({ where: { id }, data })
  revalidatePath('/admin/projects')
  revalidatePath('/')
  return project
}

export async function deleteProject(id: string) {
  await db.project.delete({ where: { id } })
  revalidatePath('/admin/projects')
  revalidatePath('/')
}
