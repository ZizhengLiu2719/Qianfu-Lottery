import { PrismaClient } from '@prisma/client'

// 为 Cloudflare Workers 创建优化的 Prisma 客户端
export function createPrismaClient(databaseUrl: string): PrismaClient {
  // 直接使用 Prisma 客户端，不使用 PrismaNeon 适配器
  // 这避免了 Cloudflare Workers 中的 I/O 共享问题
  return new PrismaClient({
    datasources: {
      db: {
        url: databaseUrl
      }
    },
    log: ['error'],
    errorFormat: 'minimal'
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
 * 专为 Cloudflare Workers 环境优化，确保每个请求都有独立的数据库连接上下文
 */
export async function runWithPrisma<T>(
  databaseUrl: string,
  runner: (client: PrismaClient) => Promise<T>
): Promise<T> {
  let client: PrismaClient | null = null
  
  try {
    // 确保在请求上下文中创建客户端
    client = createPrismaClient(databaseUrl)
    
    // 强制等待连接建立
    await client.$connect()
    
    const result = await runner(client)
    
    // 确保在完成后立即断开连接
    await client.$disconnect()
    client = null
    
    return result
  } catch (err) {
    // 确保清理连接
    if (client) {
      await client.$disconnect().catch(() => {})
      client = null
    }
    
    if (!isTransientDbError(err)) {
      console.error('Database error (non-transient):', err)
      throw err
    }
    
    console.log('Retrying database operation due to transient error:', err)
    
    // 重试一次，创建完全新的客户端
    try {
      client = createPrismaClient(databaseUrl)
      await client.$connect()
      
      const result = await runner(client)
      
      await client.$disconnect()
      client = null
      
      return result
    } catch (err2) {
      if (client) {
        await client.$disconnect().catch(() => {})
        client = null
      }
      console.error('Database error after retry:', err2)
      throw err2
    }
  }
}
