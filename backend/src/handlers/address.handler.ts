import { Context } from 'hono'
import { PrismaClient } from '@prisma/client'
import { getPrismaClient } from '../services/db'

export function createAddressHandlers(prisma: any) {
  // 获取用户地址列表
  const getAddresses = async (c: Context) => {
    const currentUser = c.get('user')
    const addresses = await prisma.address.findMany({
      where: { userId: currentUser.id },
      orderBy: [
        { isDefault: 'desc' },
        { createdAt: 'desc' }
      ]
    })
    return c.json({ code: 200, message: 'Addresses retrieved', data: addresses })
  }

  // 创建新地址
  const createAddress = async (c: Context) => {
    const currentUser = c.get('user')
    const body = await c.req.json<{
      receiverName: string
      phone: string
      province: string
      city: string
      district?: string
      detail: string
      zip?: string
      isDefault?: boolean
    }>()

    // 如果设为默认地址，先取消其他默认地址
    if (body.isDefault) {
      await prisma.address.updateMany({
        where: { userId: currentUser.id, isDefault: true },
        data: { isDefault: false }
      })
    }

    const address = await prisma.address.create({
      data: {
        userId: currentUser.id,
        receiverName: body.receiverName,
        phone: body.phone,
        province: body.province,
        city: body.city,
        district: body.district,
        detail: body.detail,
        zip: body.zip,
        isDefault: body.isDefault || false
      }
    })

    return c.json({ code: 200, message: 'Address created', data: address })
  }

  // 更新地址
  const updateAddress = async (c: Context) => {
    const currentUser = c.get('user')
    const addressId = parseInt(c.req.param('id'))
    const body = await c.req.json<{
      receiverName?: string
      phone?: string
      province?: string
      city?: string
      district?: string
      detail?: string
      zip?: string
      isDefault?: boolean
    }>()

    // 检查地址是否属于当前用户
    const existingAddress = await prisma.address.findFirst({
      where: { id: addressId, userId: currentUser.id }
    })

    if (!existingAddress) {
      return c.json({ code: 404, message: 'Address not found', data: null }, 404)
    }

    // 如果设为默认地址，先取消其他默认地址
    if (body.isDefault) {
      await prisma.address.updateMany({
        where: { userId: currentUser.id, isDefault: true },
        data: { isDefault: false }
      })
    }

    const address = await prisma.address.update({
      where: { id: addressId },
      data: body
    })

    return c.json({ code: 200, message: 'Address updated', data: address })
  }

  // 删除地址
  const deleteAddress = async (c: Context) => {
    const currentUser = c.get('user')
    const addressId = parseInt(c.req.param('id'))

    // 检查地址是否属于当前用户
    const existingAddress = await prisma.address.findFirst({
      where: { id: addressId, userId: currentUser.id }
    })

    if (!existingAddress) {
      return c.json({ code: 404, message: 'Address not found', data: null }, 404)
    }

    await prisma.address.delete({
      where: { id: addressId }
    })

    return c.json({ code: 200, message: 'Address deleted', data: null })
  }

  // 设为默认地址
  const setDefaultAddress = async (c: Context) => {
    const currentUser = c.get('user')
    const addressId = parseInt(c.req.param('id'))

    // 检查地址是否属于当前用户
    const existingAddress = await prisma.address.findFirst({
      where: { id: addressId, userId: currentUser.id }
    })

    if (!existingAddress) {
      return c.json({ code: 404, message: 'Address not found', data: null }, 404)
    }

    // 先取消其他默认地址
    await prisma.address.updateMany({
      where: { userId: currentUser.id, isDefault: true },
      data: { isDefault: false }
    })

    // 设置当前地址为默认
    const address = await prisma.address.update({
      where: { id: addressId },
      data: { isDefault: true }
    })

    return c.json({ code: 200, message: 'Default address set', data: address })
  }

  return {
    getAddresses,
    createAddress,
    updateAddress,
    deleteAddress,
    setDefaultAddress
  }
}
