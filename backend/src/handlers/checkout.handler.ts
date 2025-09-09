import { Context } from 'hono'
import { getPrismaClient } from '../services/db'
import { QiancaiDouService } from '../services/qiancaidou'

export function createCheckoutHandlers(qiancaiDouService: QiancaiDouService) {
  const preview = async (c: Context) => {
    const databaseUrl = c.env?.DATABASE_URL as string
    const prisma = getPrismaClient(databaseUrl)
    const currentUser = c.get('user')

    const cart = await (prisma as any).cart.findUnique({ where: { userId: currentUser.id } })
    if (!cart) return c.json({ code: 200, message: 'Empty', data: { items: [], total: 0, balance: await qiancaiDouService.getBalance(currentUser.id) } })
    const items = await (prisma as any).cartItem.findMany({ where: { cartId: cart.id }, include: { product: true } })
    let total = 0
    const detail = items.map((i: any) => {
      const subtotal = i.product.priceInQiancaiDou * i.quantity
      total += subtotal
      return { id: i.id, productId: i.productId, title: i.product.title, quantity: i.quantity, unitPrice: i.product.priceInQiancaiDou, subtotal }
    })
    const balance = await qiancaiDouService.getBalance(currentUser.id)
    return c.json({ code: 200, message: 'Preview', data: { items: detail, total, balance } })
  }

  const createOrderFromCart = async (c: Context) => {
    const databaseUrl = c.env?.DATABASE_URL as string
    const prisma = getPrismaClient(databaseUrl)
    const currentUser = c.get('user')
    const body = await c.req.json<{ addressId?: number; note?: string }>().catch(() => ({} as any))

    // 预读取与校验放在事务外，缩短事务时间
    const cart = await (prisma as any).cart.findUnique({ where: { userId: currentUser.id } })
    if (!cart) throw new Error('EMPTY_CART')
    const items = await (prisma as any).cartItem.findMany({ where: { cartId: cart.id }, include: { product: true } })
    if (items.length === 0) throw new Error('EMPTY_CART')

    let total = 0
    const orderItems = items.map((i: any) => {
      if (!i.product.isActive || i.product.stock < i.quantity) throw new Error('INSUFFICIENT_STOCK')
      const subtotal = i.product.priceInQiancaiDou * i.quantity
      total += subtotal
      return { productId: i.productId, quantity: i.quantity, unitPrice: i.product.priceInQiancaiDou, totalPrice: subtotal }
    })

    const result = await prisma.$transaction(async (tx) => {
      // 扣豆（仅在事务中进行写操作）
      await qiancaiDouService.debitQiancaiDou({ userId: currentUser.id, amount: total, reason: 'PRODUCT_REDEMPTION', refTable: 'orders' }, tx)
      // 创建订单
      const order = await (tx as any).order.create({
        data: { 
          userId: currentUser.id, 
          totalCost: total, 
          note: body?.note, 
          items: { create: orderItems }, 
          status: 'PAID', 
          payMethod: 'QIANCAIDOU',
          paidAt: new Date() 
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
      // 扣库存
      for (const i of items) {
        await (tx as any).product.update({ where: { id: i.productId }, data: { stock: { decrement: i.quantity } } })
      }
      // 清空购物车
      await (tx as any).cartItem.deleteMany({ where: { cartId: cart.id } })
      await (tx as any).cart.update({ where: { id: cart.id }, data: { itemsCount: 0 } })
      return order
    })

    return c.json({ code: 200, message: 'Order created', data: result })
  }

  return { preview, createOrderFromCart }
}


