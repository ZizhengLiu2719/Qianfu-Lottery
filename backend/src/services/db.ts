import { PrismaNeon } from '@prisma/adapter-neon'
import { PrismaClient } from '@prisma/client'

// 全局 Prisma 客户端实例
let prismaClient: PrismaClient | null = null

// 获取 Prisma 客户端实例
export function getPrismaClient(databaseUrl: string): PrismaClient {
  if (!prismaClient) {
    // 使用 PrismaNeon 适配器并传入连接配置
    const adapter = new PrismaNeon({ connectionString: databaseUrl })
    
    // 创建全局 Prisma 客户端实例
    prismaClient = new PrismaClient({ 
      adapter,
      log: ['error', 'warn']
    })
  }
  
  return prismaClient
}

// 用于清理连接（主要在测试中使用）
export async function closePrismaClient(prisma: PrismaClient): Promise<void> {
  if (prisma) {
    // 在 Cloudflare Workers 环境中，我们不需要显式断开连接
    // Prisma 会自动管理连接池
    // await prisma.$disconnect()
  }
}
