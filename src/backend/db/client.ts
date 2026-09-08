/**
 * BACKEND — Database Client
 * Prisma singleton for type-safe DB access
 */
import { PrismaClient } from '@prisma/client'

const prismaClientSingleton = () => new PrismaClient()

declare global {
  var prisma: undefined | ReturnType<typeof prismaClientSingleton>
}

const prisma = globalThis.prisma ?? prismaClientSingleton()
if (process.env.NODE_ENV !== 'production') globalThis.prisma = prisma

export default prisma
