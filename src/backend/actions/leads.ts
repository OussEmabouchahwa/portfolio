'use server'

/**
 * BACKEND — Lead (Contact Form) Server Actions
 */
import db from '@/backend/db/client'
import { revalidatePath } from 'next/cache'

export async function getLeads() {
  return await db.lead.findMany({ orderBy: { createdAt: 'desc' } })
}

export async function createLead(data: {
  name: string
  email: string
  message: string
}) {
  const lead = await db.lead.create({ data })
  revalidatePath('/admin/messages')
  return lead
}

export async function deleteLead(id: string) {
  await db.lead.delete({ where: { id } })
  revalidatePath('/admin/messages')
}
