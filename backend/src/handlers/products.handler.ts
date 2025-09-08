import { Context } from 'hono'
import { getPrismaClient } from '../services/db'
import { QiancaiDouService } from '../services/qiancaidou'

interface CreateOrderRequest {
  items: {
    productId: number
    quantity: number
  }[]
  shippingAddress?: string
  note?: string
}

export function createProductHandlers(qiancaiDouService: QiancaiDouService) {
  
  /**
   * 获取商品列表
   */
  const getProducts = async (c: Context) => {
    try {
      const databaseUrl = c.env?.DATABASE_URL as string
      if (!databaseUrl) {
        throw new Error('DATABASE_URL not configured')
      }

      const prisma = getPrismaClient(databaseUrl)

      // 获取查询参数
      const page = Math.max(1, parseInt(c.req.query('page') || '1'))
      const limit = Math.min(50, Math.max(1, parseInt(c.req.query('limit') || '20')))
      const category = c.req.query('category')
      const offset = (page - 1) * limit

      // 构建查询条件
      const where = {
        isActive: true,
        ...(category && { category })
      }

      const [products, total] = await Promise.all([
        prisma.product.findMany({
          where,
          orderBy: { createdAt: 'desc' },
          skip: offset,
          take: limit
        }),
        prisma.product.count({ where })
      ])

      return c.json({
        code: 200,
        message: 'Products retrieved successfully',
        data: {
          products,
          pagination: {
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit)
          }
        }
      })

    } catch (error) {
      console.error('Get products error:', error)
      return c.json({
        code: 500,
        message: 'Internal server error',
        data: null
      }, 500)
    }
  }

  /**
   * 获取商品详情
   */
  const getProduct = async (c: Context) => {
    try {
      const productId = parseInt(c.req.param('id'))
      
      if (isNaN(productId)) {
        return c.json({
          code: 400,
          message: 'Invalid product ID',
          data: null
        }, 400)
      }

      const databaseUrl = c.env?.DATABASE_URL as string
      if (!databaseUrl) {
        throw new Error('DATABASE_URL not configured')
      }

      const prisma = getPrismaClient(databaseUrl)

      const product = await prisma.product.findUnique({
        where: { 
          id: productId,
          isActive: true
        }
      })

      if (!product) {
        return c.json({
          code: 404,
          message: 'Product not found',
          data: null
        }, 404)
      }

      return c.json({
        code: 200,
        message: 'Product retrieved successfully',
        data: { product }
      })

    } catch (error) {
      console.error('Get product error:', error)
      return c.json({
        code: 500,
        message: 'Internal server error',
        data: null
      }, 500)
    }
  }

  /**
   * 创建订单
   */
  const createOrder = async (c: Context) => {
    try {
      const currentUser = c.get('user')
      const body = await c.req.json() as CreateOrderRequest

      if (!body.items || body.items.length === 0) {
        return c.json({
          code: 400,
          message: 'Order items are required',
          data: null
        }, 400)
      }

      const databaseUrl = c.env?.DATABASE_URL as string
      if (!databaseUrl) {
        throw new Error('DATABASE_URL not configured')
      }

      const prisma = getPrismaClient(databaseUrl)

      // 使用数据库事务确保数据一致性
      const result = await prisma.$transaction(async (tx) => {
        // 验证所有商品存在且有库存
        const productIds = body.items.map(item => item.productId)
        const products = await tx.product.findMany({
          where: {
            id: { in: productIds },
            isActive: true
          }
        })

        if (products.length !== productIds.length) {
          throw new Error('Some products not found or inactive')
        }

        // 计算总价并检查库存
        let totalCost = 0
        const orderItems = []

        for (const item of body.items) {
          const product = products.find(p => p.id === item.productId)
          if (!product) {
            throw new Error(`Product ${item.productId} not found`)
          }

          if (product.stock < item.quantity) {
            throw new Error(`Insufficient stock for product: ${product.title}`)
          }

          const itemTotal = product.priceInQiancaiDou * item.quantity
          totalCost += itemTotal

          orderItems.push({
            productId: product.id,
            quantity: item.quantity,
            unitPrice: product.priceInQiancaiDou,
            totalPrice: itemTotal
          })
        }

        // 扣除用户仟彩豆
        await qiancaiDouService.debitQiancaiDou({
          userId: currentUser.id,
          amount: totalCost,
          reason: 'PRODUCT_REDEMPTION',
          description: `Order for ${body.items.length} items`,
          refTable: 'orders'
        })

        // 创建订单
        const order = await tx.order.create({
          data: {
            userId: currentUser.id,
            totalCost,
            shippingAddress: body.shippingAddress,
            note: body.note,
            items: {
              create: orderItems
            }
          },
          include: {
            items: {
              include: {
                product: true
              }
            }
          }
        })

        // 减少商品库存
        for (const item of body.items) {
          await tx.product.update({
            where: { id: item.productId },
            data: {
              stock: {
                decrement: item.quantity
              }
            }
          })
        }

        return order
      })

      return c.json({
        code: 200,
        message: 'Order created successfully',
        data: { order: result }
      })

    } catch (error) {
      console.error('Create order error:', error)
      
      if (error instanceof Error) {
        if (error.message.includes('Insufficient')) {
          return c.json({
            code: 400,
            message: error.message,
            data: null
          }, 400)
        }
      }

      return c.json({
        code: 500,
        message: 'Internal server error',
        data: null
      }, 500)
    }
  }

  /**
   * 获取用户订单列表
   */
  const getUserOrders = async (c: Context) => {
    try {
      const currentUser = c.get('user')
      const page = Math.max(1, parseInt(c.req.query('page') || '1'))
      const limit = Math.min(50, Math.max(1, parseInt(c.req.query('limit') || '10')))
      const offset = (page - 1) * limit

      const databaseUrl = c.env?.DATABASE_URL as string
      if (!databaseUrl) {
        throw new Error('DATABASE_URL not configured')
      }

      const prisma = getPrismaClient(databaseUrl)

      const [orders, total] = await Promise.all([
        prisma.order.findMany({
          where: { userId: currentUser.id },
          include: {
            items: {
              include: {
                product: {
                  select: {
                    id: true,
                    title: true,
                    images: true
                  }
                }
              }
            }
          },
          orderBy: { createdAt: 'desc' },
          skip: offset,
          take: limit
        }),
        prisma.order.count({
          where: { userId: currentUser.id }
        })
      ])

      return c.json({
        code: 200,
        message: 'Orders retrieved successfully',
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

    } catch (error) {
      console.error('Get user orders error:', error)
      return c.json({
        code: 500,
        message: 'Internal server error',
        data: null
      }, 500)
    }
  }

  /**
   * 获取单个订单详情（仅本人可见）
   */
  const getOrderById = async (c: Context) => {
    try {
      const currentUser = c.get('user')
      const orderId = parseInt(c.req.param('id'))

      if (isNaN(orderId)) {
        return c.json({ code: 400, message: 'Invalid order ID', data: null }, 400)
      }

      const databaseUrl = c.env?.DATABASE_URL as string
      if (!databaseUrl) {
        throw new Error('DATABASE_URL not configured')
      }

      const prisma = getPrismaClient(databaseUrl)

      const order = await prisma.order.findFirst({
        where: { id: orderId, userId: currentUser.id },
        include: {
          items: {
            include: { product: true }
          }
        }
      })

      if (!order) {
        return c.json({ code: 404, message: 'Order not found', data: null }, 404)
      }

      return c.json({ code: 200, message: 'Order retrieved successfully', data: { order } })
    } catch (error) {
      console.error('Get order by id error:', error)
      return c.json({ code: 500, message: 'Internal server error', data: null }, 500)
    }
  }

  /**
   * 取消订单（仅 PENDING 可取消），回退库存并退还仟彩豆
   */
  const cancelOrder = async (c: Context) => {
    try {
      const currentUser = c.get('user')
      const orderId = parseInt(c.req.param('id'))

      if (isNaN(orderId)) {
        return c.json({ code: 400, message: 'Invalid order ID', data: null }, 400)
      }

      const databaseUrl = c.env?.DATABASE_URL as string
      if (!databaseUrl) {
        throw new Error('DATABASE_URL not configured')
      }

      const prisma = getPrismaClient(databaseUrl)

      const result = await prisma.$transaction(async (tx) => {
        const order = await tx.order.findFirst({
          where: { id: orderId, userId: currentUser.id },
          include: { items: true }
        })

        if (!order) {
          throw new Error('Order not found')
        }

        if (order.status !== 'PENDING') {
          throw new Error('Only PENDING orders can be cancelled')
        }

        // 回退库存
        for (const item of order.items) {
          await tx.product.update({
            where: { id: item.productId },
            data: { stock: { increment: item.quantity } }
          })
        }

        // 退还仟彩豆（与下单时一致，按 totalCost 原路退还）
        const user = await tx.user.findUnique({
          where: { id: currentUser.id },
          select: { qiancaiDouBalance: true }
        })
        if (!user) throw new Error('User not found')

        const newBalance = user.qiancaiDouBalance + order.totalCost

        await tx.user.update({
          where: { id: currentUser.id },
          data: { qiancaiDouBalance: newBalance }
        })

        await tx.qiancaiDouTransaction.create({
          data: {
            userId: currentUser.id,
            amount: order.totalCost,
            newBalance,
            reason: 'REFUND',
            description: `Refund for order #${order.id}`,
            refTable: 'orders',
            refId: order.id.toString(),
          }
        })

        // 更新订单状态
        const updated = await tx.order.update({
          where: { id: order.id },
          data: { status: 'CANCELLED' },
          include: { items: { include: { product: true } } }
        })

        return updated
      })

      return c.json({ code: 200, message: 'Order cancelled successfully', data: { order: result } })
    } catch (error) {
      console.error('Cancel order error:', error)

      if (error instanceof Error) {
        if (error.message.includes('not found') || error.message.includes('Only PENDING')) {
          return c.json({ code: 400, message: error.message, data: null }, 400)
        }
      }

      return c.json({ code: 500, message: 'Internal server error', data: null }, 500)
    }
  }

  return {
    getProducts,
    getProduct,
    createOrder,
    getUserOrders,
    getOrderById,
    cancelOrder
  }
}
