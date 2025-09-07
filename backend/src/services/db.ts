import { Pool } from '@neondatabase/serverless'
import { PrismaNeon } from '@prisma/adapter-neon'
import { PrismaClient } from '@prisma/client'
import * as wasm from '../../node_modules/.prisma/client/query_engine_bg.wasm'

// 数据库连接单例
let prisma: PrismaClient

export function getPrismaClient(databaseUrl: string): PrismaClient {
  if (!prisma) {
    // 重新引入 Pool 来正确初始化适配器
    const pool = new Pool({ connectionString: databaseUrl })
    const adapter = new PrismaNeon(pool)
    
    // 初始化 Prisma 客户端
    prisma = new PrismaClient({ 
      adapter,
      log: ['error', 'warn'],
      queryEngineWasm: { ...wasm }
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
