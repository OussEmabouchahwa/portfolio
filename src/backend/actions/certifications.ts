'use server'

/**
 * BACKEND — Certifications Server Actions
 */
import db from '@/backend/db/client'
import { revalidatePath } from 'next/cache'

export async function getCertifications() {
  return await db.certification.findMany({ orderBy: { orderIndex: 'asc' } })
}

export async function createCertification(data: {
  title: string
  issuer: string
  date: string
  credentialId?: string
  credentialUrl?: string
  imageUrl?: string
  orderIndex?: number
}) {
  const cert = await db.certification.create({ data })
  revalidatePath('/admin/certificates')
  revalidatePath('/')
  return cert
}

export async function deleteCertification(id: string) {
  await db.certification.delete({ where: { id } })
  revalidatePath('/admin/certificates')
  revalidatePath('/')
}
