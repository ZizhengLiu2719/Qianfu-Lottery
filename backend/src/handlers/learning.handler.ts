import { Context } from 'hono'
import { getPrismaClient } from '../services/db'

interface LearningRegistrationRequest {
  courseId?: string
  serviceId?: string
  campId?: string
  title: string
  subtitle: string
  category: string
  type: 'course' | 'service' | 'camp'
}

export function createLearningHandlers() {
  
  /**
   * 注册课程
   */
  const registerCourse = async (c: Context) => {
    try {
      const currentUser = c.get('user')
      const body = await c.req.json() as LearningRegistrationRequest

      if (!body.courseId || !body.title) {
        return c.json({
          code: 400,
          message: 'Course ID and title are required',
          data: null
        }, 400)
      }

      const databaseUrl = c.env?.DATABASE_URL as string
      if (!databaseUrl) {
        throw new Error('DATABASE_URL not configured')
      }

      const prisma = getPrismaClient(databaseUrl)

      // 创建学习彩注册记录
      const registration = await (prisma as any).learningRegistration.create({
        data: {
          userId: currentUser.id,
          itemId: body.courseId,
          itemType: 'course',
          title: body.title,
          subtitle: body.subtitle,
          category: body.category,
          status: 'REGISTERED',
        }
      })

      return c.json({
        code: 200,
        message: 'Course registered successfully',
        data: {
          id: body.courseId,
          title: body.title,
          subtitle: body.subtitle,
          category: body.category,
          type: 'course',
          registeredAt: registration.createdAt.toISOString(),
          icon: 'cpu'
        }
      })

    } catch (error) {
      console.error('Register course error:', error)
      return c.json({
        code: 500,
        message: 'Internal server error',
        data: null
      }, 500)
    }
  }

  /**
   * 注册留学咨询服务
   */
  const registerStudyAbroadService = async (c: Context) => {
    try {
      const currentUser = c.get('user')
      const body = await c.req.json() as LearningRegistrationRequest

      if (!body.serviceId || !body.title) {
        return c.json({
          code: 400,
          message: 'Service ID and title are required',
          data: null
        }, 400)
      }

      const databaseUrl = c.env?.DATABASE_URL as string
      if (!databaseUrl) {
        throw new Error('DATABASE_URL not configured')
      }

      const prisma = getPrismaClient(databaseUrl)

      // 创建学习彩注册记录
      const registration = await (prisma as any).learningRegistration.create({
        data: {
          userId: currentUser.id,
          itemId: body.serviceId,
          itemType: 'service',
          title: body.title,
          subtitle: body.subtitle,
          category: body.category,
          status: 'REGISTERED',
        }
      })

      return c.json({
        code: 200,
        message: 'Study abroad service registered successfully',
        data: {
          id: body.serviceId,
          title: body.title,
          subtitle: body.subtitle,
          category: body.category,
          type: 'service',
          registeredAt: registration.createdAt.toISOString(),
          icon: 'messageSquare'
        }
      })

    } catch (error) {
      console.error('Register study abroad service error:', error)
      return c.json({
        code: 500,
        message: 'Internal server error',
        data: null
      }, 500)
    }
  }

  /**
   * 注册夏令营
   */
  const registerSummerCamp = async (c: Context) => {
    try {
      const currentUser = c.get('user')
      const body = await c.req.json() as LearningRegistrationRequest

      if (!body.campId || !body.title) {
        return c.json({
          code: 400,
          message: 'Camp ID and title are required',
          data: null
        }, 400)
      }

      const databaseUrl = c.env?.DATABASE_URL as string
      if (!databaseUrl) {
        throw new Error('DATABASE_URL not configured')
      }

      const prisma = getPrismaClient(databaseUrl)

      // 创建学习彩注册记录
      const registration = await (prisma as any).learningRegistration.create({
        data: {
          userId: currentUser.id,
          itemId: body.campId,
          itemType: 'camp',
          title: body.title,
          subtitle: body.subtitle,
          category: body.category,
          status: 'REGISTERED',
        }
      })

      return c.json({
        code: 200,
        message: 'Summer camp registered successfully',
        data: {
          id: body.campId,
          title: body.title,
          subtitle: body.subtitle,
          category: body.category,
          type: 'camp',
          registeredAt: registration.createdAt.toISOString(),
          icon: 'mapPin'
        }
      })

    } catch (error) {
      console.error('Register summer camp error:', error)
      return c.json({
        code: 500,
        message: 'Internal server error',
        data: null
      }, 500)
    }
  }

  /**
   * 取消注册
   */
  const cancelRegistration = async (c: Context) => {
    try {
      const currentUser = c.get('user')
      const type = c.req.param('type')
      const registrationId = c.req.param('id')

      if (!type || !registrationId) {
        return c.json({
          code: 400,
          message: 'Type and registration ID are required',
          data: null
        }, 400)
      }

      const databaseUrl = c.env?.DATABASE_URL as string
      if (!databaseUrl) {
        throw new Error('DATABASE_URL not configured')
      }

      const prisma = getPrismaClient(databaseUrl)

      // 查找并更新注册记录
      const registration = await (prisma as any).learningRegistration.findFirst({
        where: {
          userId: currentUser.id,
          itemId: registrationId,
          itemType: type,
          status: 'REGISTERED'
        }
      })

      if (!registration) {
        return c.json({
          code: 404,
          message: 'Registration not found',
          data: null
        }, 404)
      }

      // 更新状态为已取消
      await (prisma as any).learningRegistration.update({
        where: { id: registration.id },
        data: { status: 'CANCELLED' }
      })

      return c.json({
        code: 200,
        message: 'Registration cancelled successfully',
        data: null
      })

    } catch (error) {
      console.error('Cancel registration error:', error)
      return c.json({
        code: 500,
        message: 'Internal server error',
        data: null
      }, 500)
    }
  }

  /**
   * 获取用户学习彩注册列表
   */
  const getUserLearningRegistrations = async (c: Context) => {
    try {
      const currentUser = c.get('user')

      const databaseUrl = c.env?.DATABASE_URL as string
      if (!databaseUrl) {
        throw new Error('DATABASE_URL not configured')
      }

      const prisma = getPrismaClient(databaseUrl)

      // 获取用户的所有学习彩注册记录
      const registrations = await (prisma as any).learningRegistration.findMany({
        where: {
          userId: currentUser.id,
          status: 'REGISTERED'
        },
        orderBy: { createdAt: 'desc' }
      })

      // 转换为前端需要的格式
      const formattedRegistrations = registrations.map((reg: any) => {
        let icon = 'helpCircle'
        
        switch (reg.itemType) {
          case 'course':
            icon = 'cpu'
            break
          case 'service':
            icon = 'messageSquare'
            break
          case 'camp':
            icon = 'mapPin'
            break
        }

        return {
          id: reg.itemId,
          title: reg.title,
          subtitle: reg.subtitle,
          category: reg.category,
          type: reg.itemType,
          registeredAt: reg.createdAt.toISOString(),
          icon: icon
        }
      })

      return c.json({
        code: 200,
        message: 'Learning registrations retrieved successfully',
        data: { registrations: formattedRegistrations }
      })

    } catch (error) {
      console.error('Get user learning registrations error:', error)
      return c.json({
        code: 500,
        message: 'Internal server error',
        data: null
      }, 500)
    }
  }

  /**
   * 清空所有学习彩注册
   */
  const clearAllLearningRegistrations = async (c: Context) => {
    try {
      const currentUser = c.get('user')

      const databaseUrl = c.env?.DATABASE_URL as string
      if (!databaseUrl) {
        throw new Error('DATABASE_URL not configured')
      }

      const prisma = getPrismaClient(databaseUrl)

      // 删除用户的所有学习彩注册记录
      await (prisma as any).learningRegistration.deleteMany({
        where: {
          userId: currentUser.id,
          status: 'REGISTERED'
        }
      })

      return c.json({
        code: 200,
        message: 'All learning registrations cleared successfully',
        data: null
      })

    } catch (error) {
      console.error('Clear all learning registrations error:', error)
      return c.json({
        code: 500,
        message: 'Internal server error',
        data: null
      }, 500)
    }
  }

  return {
    registerCourse,
    registerStudyAbroadService,
    registerSummerCamp,
    cancelRegistration,
    getUserLearningRegistrations,
    clearAllLearningRegistrations
  }
}
