import { Context } from 'hono'
import { getPrismaClient } from '../services/db'

interface TravelRegistrationRequest {
  packageId: string
  title: string
  subtitle?: string
  category: string
}

export function createTravelPackageHandlers() {
  
  /**
   * 注册旅游套餐
   */
  const registerTravelPackage = async (c: Context) => {
    try {
      const currentUser = c.get('user')
      const body = await c.req.json() as TravelRegistrationRequest

      if (!body.packageId || !body.title) {
        return c.json({
          code: 400,
          message: 'Package ID and title are required',
          data: null
        }, 400)
      }

      const databaseUrl = c.env?.DATABASE_URL as string
      if (!databaseUrl) {
        throw new Error('DATABASE_URL not configured')
      }

      const prisma = getPrismaClient(databaseUrl)

      // 检查套餐是否存在 - 根据 packageId 或 title+category 查找
      let packageExists = null
      
      // 如果 packageId 是数字，直接查找
      if (!isNaN(parseInt(body.packageId))) {
        packageExists = await (prisma as any).travelPackage.findUnique({
          where: { id: parseInt(body.packageId) }
        })
      }
      
      // 如果没找到，尝试根据 title 和 category 查找
      if (!packageExists) {
        const allPackages = await (prisma as any).travelPackage.findMany({
          where: { isActive: true }
        })
        
        packageExists = allPackages.find((pkg: any) => 
          pkg.title === body.title && pkg.category === body.category
        )
      }

      if (!packageExists) {
        return c.json({
          code: 404,
          message: 'Travel package not found',
          data: null
        }, 404)
      }

      // 检查是否已经注册
      const existingRegistration = await (prisma as any).travelRegistration.findFirst({
        where: {
          userId: currentUser.id,
          packageId: packageExists.id,
          status: 'REGISTERED'
        }
      })

      if (existingRegistration) {
        return c.json({
          code: 400,
          message: 'Already registered for this travel package',
          data: null
        }, 400)
      }

      // 创建旅游注册记录
      const registration = await (prisma as any).travelRegistration.create({
        data: {
          userId: currentUser.id,
          packageId: packageExists.id,
          title: body.title,
          subtitle: body.subtitle,
          category: body.category,
          status: 'REGISTERED',
        }
      })

      // 更新套餐参与人数
      await (prisma as any).travelPackage.update({
        where: { id: packageExists.id },
        data: {
          currentParticipants: {
            increment: 1
          }
        }
      })

      return c.json({
        code: 200,
        message: 'Travel package registered successfully',
        data: {
          id: packageExists.id.toString(),
          title: body.title,
          subtitle: body.subtitle,
          category: body.category,
          type: 'travel',
          registeredAt: registration.createdAt.toISOString(),
          icon: 'map'
        }
      })

    } catch (error) {
      console.error('Register travel package error:', error)
      return c.json({
        code: 500,
        message: 'Internal server error',
        data: null
      }, 500)
    }
  }

  /**
   * 取消旅游注册
   */
  const cancelTravelRegistration = async (c: Context) => {
    try {
      const currentUser = c.get('user')
      const registrationId = c.req.param('id')

      if (!registrationId) {
        return c.json({
          code: 400,
          message: 'Registration ID is required',
          data: null
        }, 400)
      }

      const databaseUrl = c.env?.DATABASE_URL as string
      if (!databaseUrl) {
        throw new Error('DATABASE_URL not configured')
      }

      const prisma = getPrismaClient(databaseUrl)

      // 查找注册记录
      const registration = await (prisma as any).travelRegistration.findFirst({
        where: {
          id: parseInt(registrationId),
          userId: currentUser.id,
          status: 'REGISTERED'
        }
      })

      if (!registration) {
        return c.json({
          code: 404,
          message: 'Travel registration not found',
          data: null
        }, 404)
      }

      // 更新状态为已取消
      await (prisma as any).travelRegistration.update({
        where: { id: registration.id },
        data: { 
          status: 'CANCELLED',
          updatedAt: new Date()
        }
      })

      // 减少套餐参与人数
      await (prisma as any).travelPackage.update({
        where: { id: registration.packageId },
        data: {
          currentParticipants: {
            decrement: 1
          }
        }
      })

      return c.json({
        code: 200,
        message: 'Travel registration cancelled successfully',
        data: null
      })

    } catch (error) {
      console.error('Cancel travel registration error:', error)
      return c.json({
        code: 500,
        message: 'Internal server error',
        data: null
      }, 500)
    }
  }

  /**
   * 获取用户旅游注册列表
   */
  const getUserTravelRegistrations = async (c: Context) => {
    try {
      const currentUser = c.get('user')

      const databaseUrl = c.env?.DATABASE_URL as string
      if (!databaseUrl) {
        throw new Error('DATABASE_URL not configured')
      }

      const prisma = getPrismaClient(databaseUrl)

      // 获取用户的所有旅游注册记录
      const registrations = await (prisma as any).travelRegistration.findMany({
        where: {
          userId: currentUser.id,
          status: 'REGISTERED'
        },
        include: {
          package: true
        },
        orderBy: { createdAt: 'desc' }
      })

      // 转换为前端需要的格式
      const formattedRegistrations = registrations.map((reg: any) => {
        return {
          id: reg.packageId.toString(),
          title: reg.title,
          subtitle: reg.subtitle,
          category: reg.category,
          type: 'travel',
          registeredAt: reg.createdAt.toISOString(),
          icon: 'map',
          package: reg.package
        }
      })

      return c.json({
        code: 200,
        message: 'Travel registrations retrieved successfully',
        data: { registrations: formattedRegistrations }
      })

    } catch (error) {
      console.error('Get user travel registrations error:', error)
      return c.json({
        code: 500,
        message: 'Internal server error',
        data: null
      }, 500)
    }
  }

  /**
   * 获取旅游套餐列表
   */
  const getTravelPackages = async (c: Context) => {
    try {
      const databaseUrl = c.env?.DATABASE_URL as string
      if (!databaseUrl) {
        throw new Error('DATABASE_URL not configured')
      }

      const prisma = getPrismaClient(databaseUrl)

      // 获取查询参数
      const category = c.req.query('category') // DOMESTIC, INTERNATIONAL
      const subcategory = c.req.query('subcategory')
      const page = Math.max(1, parseInt(c.req.query('page') || '1'))
      const limit = Math.min(50, Math.max(1, parseInt(c.req.query('limit') || '20')))
      const offset = (page - 1) * limit

      // 构建查询条件
      const where = {
        isActive: true,
        ...(category && { category }),
        ...(subcategory && { subcategory })
      }

      const [packages, total] = await Promise.all([
        (prisma as any).travelPackage.findMany({
          where,
          orderBy: [
            { createdAt: 'desc' }
          ],
          skip: offset,
          take: limit
        }),
        (prisma as any).travelPackage.count({ where })
      ])

      return c.json({
        code: 200,
        message: 'Travel packages retrieved successfully',
        data: {
          packages,
          pagination: {
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit)
          }
        }
      })

    } catch (error) {
      console.error('Get travel packages error:', error)
      return c.json({
        code: 500,
        message: 'Internal server error',
        data: null
      }, 500)
    }
  }

  /**
   * 获取旅游套餐详情
   */
  const getTravelPackage = async (c: Context) => {
    try {
      const packageId = parseInt(c.req.param('id'))
      
      if (isNaN(packageId)) {
        return c.json({
          code: 400,
          message: 'Invalid package ID',
          data: null
        }, 400)
      }

      const databaseUrl = c.env?.DATABASE_URL as string
      if (!databaseUrl) {
        throw new Error('DATABASE_URL not configured')
      }

      const prisma = getPrismaClient(databaseUrl)

      const packageData = await (prisma as any).travelPackage.findUnique({
        where: { 
          id: packageId,
          isActive: true
        },
        include: {
          posts: {
            where: { isPublished: true },
            orderBy: { createdAt: 'desc' }
          }
        }
      })

      if (!packageData) {
        return c.json({
          code: 404,
          message: 'Travel package not found',
          data: null
        }, 404)
      }

      return c.json({
        code: 200,
        message: 'Travel package retrieved successfully',
        data: { package: packageData }
      })

    } catch (error) {
      console.error('Get travel package error:', error)
      return c.json({
        code: 500,
        message: 'Internal server error',
        data: null
      }, 500)
    }
  }

  /**
   * 清空所有旅游注册
   */
  const clearAllTravelRegistrations = async (c: Context) => {
    try {
      const currentUser = c.get('user')

      const databaseUrl = c.env?.DATABASE_URL as string
      if (!databaseUrl) {
        throw new Error('DATABASE_URL not configured')
      }

      const prisma = getPrismaClient(databaseUrl)

      // 删除用户的所有旅游注册记录
      await (prisma as any).travelRegistration.deleteMany({
        where: {
          userId: currentUser.id,
          status: 'REGISTERED'
        }
      })

      return c.json({
        code: 200,
        message: 'All travel registrations cleared successfully',
        data: null
      })

    } catch (error) {
      console.error('Clear all travel registrations error:', error)
      return c.json({
        code: 500,
        message: 'Internal server error',
        data: null
      }, 500)
    }
  }

  return {
    registerTravelPackage,
    cancelTravelRegistration,
    getUserTravelRegistrations,
    getTravelPackages,
    getTravelPackage,
    clearAllTravelRegistrations
  }
}
