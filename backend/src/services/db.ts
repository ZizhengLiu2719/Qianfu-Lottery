import { Pool } from '@neondatabase/serverless'
import { PrismaNeon } from '@prisma/adapter-neon'
import { PrismaClient } from '@prisma/client'

// 数据库连接单例
let prisma: PrismaClient

export function getPrismaClient(databaseUrl: string): PrismaClient {
  if (!prisma) {
    // 创建 Neon 连接池
    const neon = new Pool({ connectionString: databaseUrl })
    
    // 创建 Prisma 适配器
    const adapter = new PrismaNeon(neon)
    
    // 初始化 Prisma 客户端
    prisma = new PrismaClient({ 
      adapter,
      log: ['error', 'warn']
    })
  }
  
  return prisma
}

// 用于清理连接（主要在测试中使用）
export async function closePrismaClient(): Promise<void> {
  if (prisma) {
    await prisma.$disconnect()
  }
}
