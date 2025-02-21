import { PrismaClient } from '@prisma/client'
import { Pool } from '@neondatabase/serverless'

declare global {
  var prisma: PrismaClient | undefined
}

const prisma = global.prisma || new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL
    }
  }
})

if (process.env.NODE_ENV !== 'production') global.prisma = prisma

export { prisma } 