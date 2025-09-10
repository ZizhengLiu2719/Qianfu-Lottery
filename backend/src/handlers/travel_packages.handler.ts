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

      // 使用原生 SQL 查询避免 Prisma 问题
      let packageExists = null
      
      // 如果 packageId 是数字，直接查找
      if (!isNaN(parseInt(body.packageId))) {
        const result = await prisma.$queryRaw`
          SELECT * FROM travel_packages 
          WHERE id = ${parseInt(body.packageId)} AND is_active = true
        `
        packageExists = Array.isArray(result) ? result[0] : result
      }
      
      // 如果没找到，尝试根据 title 和 category 查找
      if (!packageExists) {
        const result = await prisma.$queryRaw`
          SELECT * FROM travel_packages 
          WHERE title = ${body.title} AND category = ${body.category} AND is_active = true
        `
        packageExists = Array.isArray(result) ? result[0] : result
      }

      if (!packageExists) {
        return c.json({
          code: 404,
          message: 'Travel package not found',
          data: null
        }, 404)
      }

      // 检查是否已经注册
      const existingRegistrations = await prisma.$queryRaw`
        SELECT * FROM travel_registrations 
        WHERE user_id = ${currentUser.id} AND package_id = ${packageExists.id} AND status = 'REGISTERED'
      `
      const existingRegistration = Array.isArray(existingRegistrations) ? existingRegistrations[0] : existingRegistrations

      if (existingRegistration) {
        return c.json({
          code: 400,
          message: 'Already registered for this travel package',
          data: null
        }, 400)
      }

      // 创建旅游注册记录
      const registrationResult = await prisma.$queryRaw`
        INSERT INTO travel_registrations (user_id, package_id, title, subtitle, category, status, registered_at)
        VALUES (${currentUser.id}, ${packageExists.id}, ${body.title}, ${body.subtitle || null}, ${body.category}, 'REGISTERED', NOW())
        RETURNING *
      `
      const registration = Array.isArray(registrationResult) ? registrationResult[0] : registrationResult

      // 更新套餐参与人数
      await prisma.$queryRaw`
        UPDATE travel_packages 
        SET current_participants = current_participants + 1, updated_at = NOW()
        WHERE id = ${packageExists.id}
      `

      return c.json({
        code: 200,
        message: 'Travel package registered successfully',
        data: {
          id: packageExists.id.toString(),
          title: body.title,
          subtitle: body.subtitle,
          category: body.category,
          type: 'travel',
          registeredAt: registration.registered_at ? new Date(registration.registered_at).toISOString() : new Date().toISOString(),
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

      // 使用原生SQL查找注册记录
      const registrationResult = await prisma.$queryRaw`
        SELECT id, user_id, package_id, status
        FROM travel_registrations 
        WHERE id = ${parseInt(registrationId)} 
          AND user_id = ${currentUser.id} 
          AND status = 'REGISTERED'
      `
      
      const registration = Array.isArray(registrationResult) ? registrationResult[0] : registrationResult

      if (!registration) {
        return c.json({
          code: 404,
          message: 'Travel registration not found',
          data: null
        }, 404)
      }

      // 使用原生SQL更新状态为已取消
      await prisma.$queryRaw`
        UPDATE travel_registrations 
        SET status = 'CANCELLED' 
        WHERE id = ${registration.id}
      `

      // 使用原生SQL减少套餐参与人数
      await prisma.$queryRaw`
        UPDATE travel_packages 
        SET current_participants = current_participants - 1 
        WHERE id = ${registration.package_id}
      `

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
      console.log('Getting travel registrations for user:', currentUser.id)

      const databaseUrl = c.env?.DATABASE_URL as string
      if (!databaseUrl) {
        throw new Error('DATABASE_URL not configured')
      }

      const prisma = getPrismaClient(databaseUrl)

      // 使用原生SQL查询获取用户的所有旅游注册记录
      const registrations = await prisma.$queryRaw`
        SELECT 
          tr.id,
          tr.user_id,
          tr.package_id,
          tr.title,
          tr.subtitle,
          tr.category,
          tr.status,
          tr.registered_at,
          tp.title as package_title,
          tp.description as package_description,
          tp.category as package_category,
          tp.duration_days,
          tp.location,
          tp.image_url,
          tp.tags
        FROM travel_registrations tr
        LEFT JOIN travel_packages tp ON tr.package_id = tp.id
        WHERE tr.user_id = ${currentUser.id} 
          AND tr.status = 'REGISTERED'
        ORDER BY tr.registered_at DESC
      `
      
      console.log('Raw SQL result:', registrations)

      // 转换为前端需要的格式
      const formattedRegistrations = Array.isArray(registrations) ? registrations.map((reg: any) => {
        return {
          // registration entity fields
          id: reg.id, // registration id
          userId: reg.user_id,
          packageId: reg.package_id,
          title: reg.title,
          subtitle: reg.subtitle,
          category: reg.category,
          status: reg.status,
          registeredAt: reg.registered_at ? new Date(reg.registered_at).toISOString() : new Date().toISOString(),
          // ui helpers
          type: 'travel',
          icon: 'map',
          // embedded package data
          package: {
            id: reg.package_id,
            title: reg.package_title,
            description: reg.package_description,
            category: reg.package_category,
            durationDays: reg.duration_days,
            location: reg.location,
            imageUrl: reg.image_url,
            tags: reg.tags
          }
        }
      }) : []

      console.log('Formatted registrations:', formattedRegistrations)

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
