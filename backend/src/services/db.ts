import { PrismaClient } from '@prisma/client'

// 为每个请求创建新的 Prisma 客户端实例
export function getPrismaClient(databaseUrl: string): PrismaClient {
  // 直接使用 Prisma 客户端，不使用 Neon 适配器
  // 这样可以避免 Cloudflare Workers 中的事务问题
  return new PrismaClient({ 
    datasources: {
      db: {
        url: databaseUrl
      }
    },
    log: ['error', 'warn']
  })
}

// 用于清理连接（主要在测试中使用）
export async function closePrismaClient(prisma: PrismaClient): Promise<void> {
  if (prisma) {
    // 在 Cloudflare Workers 环境中，我们不需要显式断开连接
    // Prisma 会自动管理连接池
    // await prisma.$disconnect()
  }
}
