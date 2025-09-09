import { Context } from 'hono'
import { getPrismaClient } from '../services/db'

export function createSeedHandlers() {
  const seedProducts = async (c: Context) => {
    const databaseUrl = c.env?.DATABASE_URL as string
    const prisma = getPrismaClient(databaseUrl)

    // 仅在非生产或显式允许时可用
    const environment = (c.env as any)?.ENVIRONMENT || 'development'
    if (environment === 'production') {
      return c.json({ code: 403, message: 'Seeding disabled in production', data: null }, 403)
    }

    const categories = [
      {
        key: 'electronics',
        products: [
          {
            title: '无线蓝牙耳机 Pro',
            description: '降噪 | 续航 24h | 低延迟',
            images: ['https://images.unsplash.com/photo-1518443895914-4d4b90c42252?q=80&w=1200&auto=format&fit=crop'],
            priceInQiancaiDou: 1299,
            stock: 50
          },
          {
            title: '智能手表 S1',
            description: '心率监测 | 50m 防水 | NFC',
            images: ['https://images.unsplash.com/photo-1518443749048-3d393c514afc?q=80&w=1200&auto=format&fit=crop'],
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
            images: ['https://images.unsplash.com/photo-1520975954732-35dd222996f9?q=80&w=1200&auto=format&fit=crop'],
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
            images: ['https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=1200&auto=format&fit=crop'],
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
            images: ['https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=1200&auto=format&fit=crop'],
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
            images: ['https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1200&auto=format&fit=crop'],
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

  return { seedProducts }
}


