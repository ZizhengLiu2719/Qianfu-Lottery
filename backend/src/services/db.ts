import { PrismaNeon } from '@prisma/adapter-neon'
import { PrismaClient } from '@prisma/client'

// 创建新的 Prisma 客户端实例（每个请求都应该有自己的实例）
export function createPrismaClient(databaseUrl: string): PrismaClient {
  // 使用 PrismaNeon 适配器并传入连接配置
  const adapter = new PrismaNeon({ connectionString: databaseUrl })
  
  // 初始化 Prisma 客户端 - 在 Prisma 6.15.0+ 中不再需要 queryEngineWasm
  return new PrismaClient({ 
    adapter,
    log: ['error', 'warn']
  })
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
 * 在数据库连接异常时自动重试一次，每次都创建新的 PrismaClient
 * 这样确保每个请求都有独立的数据库连接上下文
 */
export async function runWithPrisma<T>(
  databaseUrl: string,
  runner: (client: PrismaClient) => Promise<T>
): Promise<T> {
  let client = createPrismaClient(databaseUrl)
  try {
    const result = await runner(client)
    await client.$disconnect()
    return result
  } catch (err) {
    await client.$disconnect().catch(() => {})
    
    if (!isTransientDbError(err)) throw err
    
    // 重试一次，创建新的客户端
    client = createPrismaClient(databaseUrl)
    try {
      const result = await runner(client)
      await client.$disconnect()
      return result
    } catch (err2) {
      await client.$disconnect().catch(() => {})
      throw err2
    }
  }
}
