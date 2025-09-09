import { Context } from 'hono'
import { getPrismaClient } from '../services/db'

export function createCartHandlers() {
  const getCart = async (c: Context) => {
    const databaseUrl = c.env?.DATABASE_URL as string
    const prisma = getPrismaClient(databaseUrl)
    const currentUser = c.get('user')

    const cart = await prisma.cart.upsert({
      where: { userId: currentUser.id },
      update: {},
      create: { userId: currentUser.id }
    })
    const items = await prisma.cartItem.findMany({
      where: { cartId: cart.id },
      include: { product: true }
    })
    return c.json({ code: 200, message: 'Cart fetched', data: { cart, items } })
  }

  const addItem = async (c: Context) => {
    const body = await c.req.json<{ productId: number; quantity?: number }>()
    const qty = Math.max(1, Math.floor(body.quantity ?? 1))
    const databaseUrl = c.env?.DATABASE_URL as string
    const prisma = getPrismaClient(databaseUrl)
    const currentUser = c.get('user')

    const cart = await prisma.cart.upsert({ where: { userId: currentUser.id }, update: {}, create: { userId: currentUser.id } })
    const item = await prisma.cartItem.upsert({
      where: { cartId_productId: { cartId: cart.id, productId: body.productId } },
      update: { quantity: { increment: qty } },
      create: { cartId: cart.id, productId: body.productId, quantity: qty }
    })
    await prisma.cart.update({ where: { id: cart.id }, data: { itemsCount: await prisma.cartItem.count({ where: { cartId: cart.id } }) } })
    return c.json({ code: 200, message: 'Added', data: { itemId: item.id } })
  }

  const updateItem = async (c: Context) => {
    const itemId = parseInt(c.req.param('itemId'))
    const body = await c.req.json<{ quantity: number }>()
    const qty = Math.max(1, Math.floor(body.quantity))
    const databaseUrl = c.env?.DATABASE_URL as string
    const prisma = getPrismaClient(databaseUrl)
    const currentUser = c.get('user')

    const cart = await prisma.cart.findUniqueOrThrow({ where: { userId: currentUser.id } })
    await prisma.cartItem.update({ where: { id: itemId }, data: { quantity: qty } })
    await prisma.cart.update({ where: { id: cart.id }, data: { itemsCount: await prisma.cartItem.count({ where: { cartId: cart.id } }) } })
    return c.json({ code: 200, message: 'Updated' })
  }

  const removeItem = async (c: Context) => {
    const itemId = parseInt(c.req.param('itemId'))
    const databaseUrl = c.env?.DATABASE_URL as string
    const prisma = getPrismaClient(databaseUrl)
    const currentUser = c.get('user')
    const cart = await prisma.cart.findUniqueOrThrow({ where: { userId: currentUser.id } })
    await prisma.cartItem.delete({ where: { id: itemId } })
    await prisma.cart.update({ where: { id: cart.id }, data: { itemsCount: await prisma.cartItem.count({ where: { cartId: cart.id } }) } })
    return c.json({ code: 200, message: 'Removed' })
  }

  return { getCart, addItem, updateItem, removeItem }
}


