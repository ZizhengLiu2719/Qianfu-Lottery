import { Context } from 'hono'
import { PrismaClient } from '@prisma/client'
import { getPrismaClient } from '../services/db'

export function createInventoryHandlers(prisma: any) {
  // 检查库存
  const checkInventory = async (c: Context) => {
    const body = await c.req.json<{
      items: Array<{ productId: number; quantity: number }>
    }>()

    const results = []
    
    for (const item of body.items) {
      const product = await prisma.product.findUnique({
        where: { id: item.productId },
        select: {
          id: true,
          title: true,
          stock: true,
          isActive: true
        }
      })

      if (!product) {
        results.push({
          productId: item.productId,
          available: false,
          reason: 'PRODUCT_NOT_FOUND'
        })
        continue
      }

      if (!product.isActive) {
        results.push({
          productId: item.productId,
          available: false,
          reason: 'PRODUCT_INACTIVE'
        })
        continue
      }

      if (product.stock < item.quantity) {
        results.push({
          productId: item.productId,
          available: false,
          reason: 'INSUFFICIENT_STOCK',
          availableStock: product.stock,
          requestedQuantity: item.quantity
        })
        continue
      }

      results.push({
        productId: item.productId,
        available: true,
        availableStock: product.stock
      })
    }

    return c.json({ code: 200, message: 'Inventory checked', data: results })
  }

  // 锁定库存
  const lockInventory = async (c: Context) => {
    const body = await c.req.json<{
      orderId: number
      items: Array<{ productId: number; quantity: number }>
      expiresInMinutes?: number
    }>()

    const expiresInMinutes = body.expiresInMinutes || 15
    const expiresAt = new Date(Date.now() + expiresInMinutes * 60 * 1000)

    const result = await prisma.$transaction(async (tx: any) => {
      const locks = []

      for (const item of body.items) {
        // 检查库存是否足够
        const product = await tx.product.findUnique({
          where: { id: item.productId }
        })

        if (!product || !product.isActive || product.stock < item.quantity) {
          throw new Error(`Insufficient stock for product ${item.productId}`)
        }

        // 创建库存锁定
        const lock = await tx.inventoryLock.create({
          data: {
            orderId: body.orderId,
            productId: item.productId,
            quantity: item.quantity,
            expiresAt
          }
        })

        locks.push(lock)
      }

      return locks
    })

    return c.json({ code: 200, message: 'Inventory locked', data: result })
  }

  // 释放库存
  const releaseInventory = async (c: Context) => {
    const body = await c.req.json<{
      orderId: number
    }>()

    const result = await prisma.inventoryLock.updateMany({
      where: { 
        orderId: body.orderId,
        status: 'LOCKED'
      },
      data: { status: 'RELEASED' }
    })

    return c.json({ 
      code: 200, 
      message: 'Inventory released', 
      data: { updatedCount: result.count } 
    })
  }

  // 消费库存（支付成功后）
  const consumeInventory = async (c: Context) => {
    const body = await c.req.json<{
      orderId: number
    }>()

    const result = await prisma.$transaction(async (tx: any) => {
      // 获取锁定的库存
      const locks = await tx.inventoryLock.findMany({
        where: { 
          orderId: body.orderId,
          status: 'LOCKED'
        },
        include: {
          product: true
        }
      })

      // 扣减库存
      for (const lock of locks) {
        await tx.product.update({
          where: { id: lock.productId },
          data: {
            stock: {
              decrement: lock.quantity
            }
          }
        })
      }

      // 更新锁定状态为已消费
      const updateResult = await tx.inventoryLock.updateMany({
        where: { 
          orderId: body.orderId,
          status: 'LOCKED'
        },
        data: { status: 'CONSUMED' }
      })

      return updateResult
    })

    return c.json({ 
      code: 200, 
      message: 'Inventory consumed', 
      data: { updatedCount: result.count } 
    })
  }

  // 清理过期锁定
  const cleanupExpiredLocks = async (c: Context) => {
    const now = new Date()
    
    const result = await prisma.inventoryLock.updateMany({
      where: {
        status: 'LOCKED',
        expiresAt: {
          lt: now
        }
      },
      data: { status: 'RELEASED' }
    })

    return c.json({ 
      code: 200, 
      message: 'Expired locks cleaned up', 
      data: { updatedCount: result.count } 
    })
  }

  // 获取库存状态
  const getInventoryStatus = async (c: Context) => {
    const productId = parseInt(c.req.param('productId'))

    const product = await prisma.product.findUnique({
      where: { id: productId },
      select: {
        id: true,
        title: true,
        stock: true,
        isActive: true
      }
    })

    if (!product) {
      return c.json({ code: 404, message: 'Product not found', data: null }, 404)
    }

    // 获取当前锁定的库存
    const lockedStock = await prisma.inventoryLock.aggregate({
      where: {
        productId,
        status: 'LOCKED'
      },
      _sum: {
        quantity: true
      }
    })

    const availableStock = product.stock - (lockedStock._sum.quantity || 0)

    return c.json({
      code: 200,
      message: 'Inventory status retrieved',
      data: {
        productId: product.id,
        title: product.title,
        totalStock: product.stock,
        lockedStock: lockedStock._sum.quantity || 0,
        availableStock,
        isActive: product.isActive
      }
    })
  }

  return {
    checkInventory,
    lockInventory,
    releaseInventory,
    consumeInventory,
    cleanupExpiredLocks,
    getInventoryStatus
  }
}
