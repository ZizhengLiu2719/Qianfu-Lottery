import { PrismaNeon } from '@prisma/adapter-neon'
import { PrismaClient } from '@prisma/client'

// 数据库连接单例
let prisma: PrismaClient

export function getPrismaClient(databaseUrl: string): PrismaClient {
  if (!prisma) {
    // 使用 PrismaNeon 适配器并传入连接配置
    const adapter = new PrismaNeon({ connectionString: databaseUrl })
    
    // 初始化 Prisma 客户端 - 在 Prisma 6.15.0+ 中不再需要 queryEngineWasm
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
