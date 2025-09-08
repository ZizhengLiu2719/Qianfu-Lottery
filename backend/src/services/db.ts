import { PrismaNeon } from '@prisma/adapter-neon'
import { PrismaClient } from '@prisma/client'

// 数据库连接单例
let prisma: PrismaClient | undefined

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

// 识别可重试的连接类错误
function isTransientDbError(error: unknown): boolean {
  if (!(error instanceof Error)) return false
  const msg = error.message || ''
  return msg.includes('Connection terminated')
    || msg.includes('server closed the connection unexpectedly')
    || msg.includes('ECONNRESET')
    || msg.includes('The connection was closed')
}

/**
 * 在数据库连接异常时自动重置 PrismaClient 并重试一次
 */
export async function runWithPrisma<T>(
  databaseUrl: string,
  runner: (client: PrismaClient) => Promise<T>
): Promise<T> {
  const client = getPrismaClient(databaseUrl)
  try {
    return await runner(client)
  } catch (err) {
    if (!isTransientDbError(err)) throw err
    // 重置并重试一次
    try {
      if (prisma) {
        await prisma.$disconnect().catch(() => {})
      }
      prisma = undefined
      const fresh = getPrismaClient(databaseUrl)
      return await runner(fresh)
    } catch (err2) {
      throw err2
    }
  }
}
