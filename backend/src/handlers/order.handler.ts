import { Context } from 'hono'
import { PrismaClient } from '@prisma/client'
import { getPrismaClient } from '../services/db'
import { QiancaiDouService } from '../services/qiancaidou'

export function createOrderHandlers(prisma: any, qiancaiDouService: QiancaiDouService) {
  // 获取用户订单列表
  const getOrders = async (c: Context) => {
    const currentUser = c.get('user')
    const page = parseInt(c.req.query('page') || '1')
    const limit = parseInt(c.req.query('limit') || '10')
    const status = c.req.query('status')

    const where: any = { userId: currentUser.id }
    if (status) {
      where.status = status
    }

    const [orders, total] = await Promise.all([
      prisma.order.findMany({
        where,
        include: {
          items: {
            include: {
              product: true
            }
          },
          shippingAddress: true,
          shipment: true
        },
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit
      }),
      prisma.order.count({ where })
    ])

    return c.json({
      code: 200,
      message: 'Orders retrieved',
      data: {
        orders,
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit)
        }
      }
    })
  }

  // 获取订单详情
  const getOrder = async (c: Context) => {
    const currentUser = c.get('user')
    const orderId = parseInt(c.req.param('id'))

    const order = await prisma.order.findFirst({
      where: { id: orderId, userId: currentUser.id },
      include: {
        items: {
          include: {
            product: true
          }
        },
        shippingAddress: true,
        shipment: true,
        shippingTracks: {
          orderBy: { timestamp: 'desc' }
        }
      }
    })

    if (!order) {
      return c.json({ code: 404, message: 'Order not found', data: null }, 404)
    }

    return c.json({ code: 200, message: 'Order retrieved', data: order })
  }

  // 从购物车创建订单
  const createOrderFromCart = async (c: Context) => {
    try {
      const currentUser = c.get('user')
      const body = await c.req.json<{
        shippingAddressId: number
        note?: string
      }>()

      // 获取购物车
      const cart = await (prisma as any).cart.findUnique({
        where: { userId: currentUser.id },
        include: {
          items: {
            include: {
              product: true
            }
          }
        }
      })

      if (!cart || cart.items.length === 0) {
        return c.json({ code: 400, message: '购物车为空', data: null }, 400)
      }

      // 检查库存
      let totalCost = 0
      const orderItems = []
      
      for (const item of cart.items) {
        if (!item.product.isActive || item.product.stock < item.quantity) {
          return c.json({ code: 400, message: '库存不足', data: null }, 400)
        }
        const subtotal = item.product.priceInQiancaiDou * item.quantity
        totalCost += subtotal
        orderItems.push({
          productId: item.productId,
          quantity: item.quantity,
          unitPrice: item.product.priceInQiancaiDou,
          totalPrice: subtotal
        })
      }

      // 检查千彩豆余额
      const balance = await qiancaiDouService.getBalance(currentUser.id)
      if (balance < totalCost) {
        return c.json({ code: 400, message: '千彩豆余额不足', data: null }, 400)
      }

      // 创建订单
      const order = await (prisma as any).order.create({
        data: {
          userId: currentUser.id,
          totalCost,
          shippingAddressId: body.shippingAddressId,
          note: body.note,
          status: 'PENDING',
          items: {
            create: orderItems
          }
        },
        include: {
          items: {
            include: {
              product: true
            }
          },
          shippingAddress: true
        }
      })

      // 扣除千彩豆
      await qiancaiDouService.deductBalance(
        currentUser.id,
        totalCost,
        'PRODUCT_REDEMPTION',
        `订单 #${order.id} 商品购买`,
        'orders',
        order.id.toString()
      )

      // 更新库存
      for (const item of cart.items) {
        await (prisma as any).product.update({
          where: { id: item.productId },
          data: {
            stock: {
              decrement: item.quantity
            }
          }
        })
      }

      // 清空购物车
      await (prisma as any).cartItem.deleteMany({
        where: { cartId: cart.id }
      })
      await (prisma as any).cart.update({
        where: { id: cart.id },
        data: { itemsCount: 0 }
      })

      const result = order

      return c.json({ code: 200, message: 'Order created', data: result })
    } catch (error) {
      console.error('Create order from cart error:', error)
      return c.json({ code: 500, message: 'Internal server error', data: null }, 500)
    }
  }

  // 支付订单
  const payOrder = async (c: Context) => {
    const currentUser = c.get('user')
    const orderId = parseInt(c.req.param('id'))

    const result = await prisma.$transaction(async (tx: any) => {
      const order = await tx.order.findFirst({
        where: { id: orderId, userId: currentUser.id },
        include: {
          items: {
            include: {
              product: true
            }
          }
        }
      })

      if (!order) {
        throw new Error('ORDER_NOT_FOUND')
      }

      if (order.status !== 'PENDING') {
        throw new Error('INVALID_ORDER_STATUS')
      }

      // 检查库存锁定是否有效
      const locks = await tx.inventoryLock.findMany({
        where: { orderId: order.id, status: 'LOCKED' }
      })

      const now = new Date()
      for (const lock of locks) {
        if (lock.expiresAt && lock.expiresAt < now) {
          throw new Error('INVENTORY_LOCK_EXPIRED')
        }
      }

      // 扣除千彩豆
      await qiancaiDouService.debitQiancaiDou({
        userId: currentUser.id,
        amount: order.totalCost,
        reason: 'PRODUCT_REDEMPTION',
        refTable: 'orders',
        refId: order.id.toString()
      })

      // 更新订单状态
      const updatedOrder = await tx.order.update({
        where: { id: orderId },
        data: {
          status: 'PAID',
          paidAt: new Date()
        }
      })

      // 扣减库存
      for (const item of order.items) {
        await tx.product.update({
          where: { id: item.productId },
          data: {
            stock: {
              decrement: item.quantity
            }
          }
        })
      }

      // 更新库存锁定状态
      await tx.inventoryLock.updateMany({
        where: { orderId: order.id },
        data: { status: 'CONSUMED' }
      })

      return updatedOrder
    })

    return c.json({ code: 200, message: 'Order paid', data: result })
  }

  // 取消订单
  const cancelOrder = async (c: Context) => {
    const currentUser = c.get('user')
    const orderId = parseInt(c.req.param('id'))

    const result = await prisma.$transaction(async (tx: any) => {
      const order = await tx.order.findFirst({
        where: { id: orderId, userId: currentUser.id }
      })

      if (!order) {
        throw new Error('ORDER_NOT_FOUND')
      }

      if (!['PENDING', 'PAID'].includes(order.status)) {
        throw new Error('CANNOT_CANCEL_ORDER')
      }

      // 如果已支付，需要退款
      if (order.status === 'PAID') {
        await qiancaiDouService.creditQiancaiDou({
          userId: currentUser.id,
          amount: order.totalCost,
          reason: 'ORDER_REFUND',
          refTable: 'orders',
          refId: order.id.toString()
        })

        // 恢复库存
        const items = await tx.orderItem.findMany({
          where: { orderId: order.id }
        })

        for (const item of items) {
          await tx.product.update({
            where: { id: item.productId },
            data: {
              stock: {
                increment: item.quantity
              }
            }
          })
        }
      }

      // 释放库存锁定
      await tx.inventoryLock.updateMany({
        where: { orderId: order.id },
        data: { status: 'RELEASED' }
      })

      // 更新订单状态
      const updatedOrder = await tx.order.update({
        where: { id: orderId },
        data: {
          status: 'CANCELLED',
          cancelledAt: new Date()
        }
      })

      return updatedOrder
    })

    return c.json({ code: 200, message: 'Order cancelled', data: result })
  }

  // 确认收货
  const confirmDelivery = async (c: Context) => {
    const currentUser = c.get('user')
    const orderId = parseInt(c.req.param('id'))

    const order = await prisma.order.findFirst({
      where: { id: orderId, userId: currentUser.id }
    })

    if (!order) {
      return c.json({ code: 404, message: 'Order not found', data: null }, 404)
    }

    if (order.status !== 'SHIPPED') {
      return c.json({ code: 400, message: 'Order not shipped', data: null }, 400)
    }

    const updatedOrder = await prisma.order.update({
      where: { id: orderId },
      data: {
        status: 'DELIVERED',
        fulfilledAt: new Date()
      }
    })

    return c.json({ code: 200, message: 'Delivery confirmed', data: updatedOrder })
  }

  // 获取物流跟踪
  const getTracking = async (c: Context) => {
    const currentUser = c.get('user')
    const orderId = parseInt(c.req.param('id'))

    const order = await prisma.order.findFirst({
      where: { id: orderId, userId: currentUser.id },
      include: {
        shippingTracks: {
          orderBy: { timestamp: 'desc' }
        },
        shipment: true
      }
    })

    if (!order) {
      return c.json({ code: 404, message: 'Order not found', data: null }, 404)
    }

    return c.json({ code: 200, message: 'Tracking retrieved', data: order })
  }

  return {
    getOrders,
    getOrder,
    createOrderFromCart,
    payOrder,
    cancelOrder,
    confirmDelivery,
    getTracking
  }
}
