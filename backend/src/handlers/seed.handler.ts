import { Context } from 'hono'
import { getPrismaClient } from '../services/db'

export function createSeedHandlers() {
  const seedProducts = async (c: Context) => {
    const databaseUrl = c.env?.DATABASE_URL as string
    const prisma = getPrismaClient(databaseUrl)

    // 允许：非生产；或 query.force=1；或携带正确的 X-Seed-Token（与环境变量 SEED_TOKEN 匹配）
    const environment = (c.env as any)?.ENVIRONMENT || 'development'
    const force = c.req.query('force') === '1'
    const seedToken = c.req.header('X-Seed-Token')
    const envSeedToken = (c.env as any)?.SEED_TOKEN
    // 允许 DB 中的 SEED_TOKEN
    let dbTokenOk = false
    if (seedToken) {
      const databaseToken = await (prisma as any).appSetting.findUnique({ where: { key: 'SEED_TOKEN' } }).catch(() => null)
      if (databaseToken && databaseToken.value === seedToken) dbTokenOk = true
    }
    const tokenOk = Boolean(seedToken && (envSeedToken === seedToken || dbTokenOk))
    if (environment === 'production' && !force && !tokenOk) {
      return c.json({ code: 403, message: 'Seeding disabled in production (use ?force=1 or X-Seed-Token)', data: null }, 403)
    }

    const categories = [
      {
        key: 'electronics',
        products: [
          {
            title: '无线蓝牙耳机 Pro',
            description: '降噪 | 续航 24h | 低延迟',
            images: ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=400&auto=format&fit=crop'],
            priceInQiancaiDou: 1299,
            stock: 50
          },
          {
            title: '智能手表 S1',
            description: '心率监测 | 50m 防水 | NFC',
            images: ['https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=400&auto=format&fit=crop'],
            priceInQiancaiDou: 2199,
            stock: 30
          }
        ]
      },
      {
        key: 'clothing',
        products: [
          {
            title: '城市机能风夹克',
            description: '轻量防水 | 透气面料',
            images: ['https://images.unsplash.com/photo-1551698618-1dfe5d97d256?q=80&w=400&auto=format&fit=crop'],
            priceInQiancaiDou: 899,
            stock: 40
          }
        ]
      },
      {
        key: 'food',
        products: [
          {
            title: '精品咖啡豆 500g',
            description: '产地拼配 | 中度烘焙',
            images: ['https://images.unsplash.com/photo-1559056199-641a0ac8b55e?q=80&w=400&auto=format&fit=crop'],
            priceInQiancaiDou: 199,
            stock: 100
          }
        ]
      },
      {
        key: 'books',
        products: [
          {
            title: '从 0 到 1：开启商业与未来的秘密',
            description: 'Peter Thiel 著 | 创业经典',
            images: ['https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop'],
            priceInQiancaiDou: 79,
            stock: 60
          }
        ]
      },
      {
        key: 'sports',
        products: [
          {
            title: '轻量跑步鞋',
            description: '缓震支撑 | 透气网面',
            images: ['https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=400&auto=format&fit=crop'],
            priceInQiancaiDou: 699,
            stock: 35
          }
        ]
      }
    ]

    let created = 0

    for (const cat of categories) {
      // 若该分类已存在至少 1 个活跃商品则跳过
      const count = await prisma.product.count({ where: { category: cat.key, isActive: true } })
      if (count > 0) continue
      for (const p of cat.products) {
        await prisma.product.create({
          data: {
            title: p.title,
            description: p.description,
            images: p.images as any,
            priceInQiancaiDou: p.priceInQiancaiDou,
            stock: p.stock,
            category: cat.key,
            isActive: true
          }
        })
        created += 1
      }
    }

    const total = await prisma.product.count({ where: { isActive: true } })
    return c.json({ code: 200, message: 'Seeded', data: { created, total } })
  }

  const updateProductImages = async (c: Context) => {
    const databaseUrl = c.env?.DATABASE_URL as string
    const prisma = getPrismaClient(databaseUrl)
    
    const environment = (c.env as any)?.ENVIRONMENT || 'development'
    const force = c.req.query('force') === '1'
    const seedToken = c.req.header('X-Seed-Token')
    const envSeedToken = (c.env as any)?.SEED_TOKEN
    let dbTokenOk = false
    if (seedToken) {
      const databaseToken = await (prisma as any).appSetting.findUnique({ where: { key: 'SEED_TOKEN' } }).catch(() => null)
      if (databaseToken && databaseToken.value === seedToken) dbTokenOk = true
    }
    const tokenOk = Boolean(seedToken && (envSeedToken === seedToken || dbTokenOk))
    if (environment === 'production' && !force && !tokenOk) {
      return c.json({ code: 403, message: 'Update disabled in production (use ?force=1 or X-Seed-Token)', data: null }, 403)
    }

    // 更新图片URL
    const updates = [
      {
        title: '城市机能风夹克',
        images: ['https://images.unsplash.com/photo-1551698618-1dfe5d97d256?q=80&w=400&auto=format&fit=crop']
      },
      {
        title: '从 0 到 1：开启商业与未来的秘密',
        images: ['https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop']
      },
      {
        title: '轻量跑步鞋',
        images: ['https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=400&auto=format&fit=crop']
      },
      {
        title: '智能手表 S1',
        images: ['https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=400&auto=format&fit=crop']
      },
      {
        title: '无线蓝牙耳机 Pro',
        images: ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=400&auto=format&fit=crop']
      }
    ]

    let updated = 0
    for (const update of updates) {
      await prisma.product.updateMany({
        where: { title: update.title },
        data: { images: update.images as any }
      })
      updated += 1
    }

    return c.json({ code: 200, message: 'Images updated', data: { updated } })
  }

  return { seedProducts, updateProductImages }
}


