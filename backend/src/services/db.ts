import { PrismaNeon } from '@prisma/adapter-neon'
import { PrismaClient } from '@prisma/client'

// 为每个请求创建新的 Prisma 客户端实例
export function getPrismaClient(databaseUrl: string): PrismaClient {
  // 使用 PrismaNeon 适配器并传入连接配置
  const adapter = new PrismaNeon({ connectionString: databaseUrl })
  
  // 为每个请求创建新的 Prisma 客户端实例
  // 这样可以避免 Cloudflare Workers 中的 I/O 对象跨请求访问问题
  return new PrismaClient({ 
    adapter,
    log: ['error', 'warn']
  })
}

// 用于清理连接（主要在测试中使用）
export async function closePrismaClient(prisma: PrismaClient): Promise<void> {
  if (prisma) {
    await prisma.$disconnect()
  }
}
