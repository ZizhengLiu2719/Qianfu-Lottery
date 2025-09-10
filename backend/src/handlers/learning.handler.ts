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

      // 生成一个虚拟的scheduleId，避免外键约束问题
      // 使用courseId的哈希值生成一个唯一的数字ID
      const virtualScheduleId = Math.abs(body.courseId.split('').reduce((a, b) => {
        a = ((a << 5) - a) + b.charCodeAt(0);
        return a & a;
      }, 0)) % 1000000 + 900000; // 生成900000-999999之间的ID

      // 创建学习彩注册记录
      const registration = await prisma.userAppointment.create({
        data: {
          userId: currentUser.id,
          scheduleId: virtualScheduleId,
          status: 'REGISTERED',
          note: `学习彩课程注册: ${body.title}`,
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

      // 生成一个虚拟的scheduleId，避免外键约束问题
      const virtualScheduleId = Math.abs(body.serviceId.split('').reduce((a, b) => {
        a = ((a << 5) - a) + b.charCodeAt(0);
        return a & a;
      }, 0)) % 1000000 + 800000; // 生成800000-899999之间的ID

      // 创建学习彩注册记录
      const registration = await prisma.userAppointment.create({
        data: {
          userId: currentUser.id,
          scheduleId: virtualScheduleId,
          status: 'REGISTERED',
          note: `学习彩留学咨询注册: ${body.title}`,
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

      // 生成一个虚拟的scheduleId，避免外键约束问题
      const virtualScheduleId = Math.abs(body.campId.split('').reduce((a, b) => {
        a = ((a << 5) - a) + b.charCodeAt(0);
        return a & a;
      }, 0)) % 1000000 + 700000; // 生成700000-799999之间的ID

      // 创建学习彩注册记录
      const registration = await prisma.userAppointment.create({
        data: {
          userId: currentUser.id,
          scheduleId: virtualScheduleId,
          status: 'REGISTERED',
          note: `学习彩夏令营注册: ${body.title}`,
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

      // 生成对应的虚拟scheduleId
      let virtualScheduleId: number
      if (type === 'course') {
        virtualScheduleId = Math.abs(registrationId.split('').reduce((a, b) => {
          a = ((a << 5) - a) + b.charCodeAt(0);
          return a & a;
        }, 0)) % 1000000 + 900000
      } else if (type === 'service') {
        virtualScheduleId = Math.abs(registrationId.split('').reduce((a, b) => {
          a = ((a << 5) - a) + b.charCodeAt(0);
          return a & a;
        }, 0)) % 1000000 + 800000
      } else if (type === 'camp') {
        virtualScheduleId = Math.abs(registrationId.split('').reduce((a, b) => {
          a = ((a << 5) - a) + b.charCodeAt(0);
          return a & a;
        }, 0)) % 1000000 + 700000
      } else {
        return c.json({
          code: 400,
          message: 'Invalid registration type',
          data: null
        }, 400)
      }

      // 查找并更新注册记录
      const registration = await prisma.userAppointment.findFirst({
        where: {
          userId: currentUser.id,
          scheduleId: virtualScheduleId,
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
      await prisma.userAppointment.update({
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
      const registrations = await prisma.userAppointment.findMany({
        where: {
          userId: currentUser.id,
          status: 'REGISTERED',
          note: {
            contains: '学习彩'
          }
        },
        orderBy: { createdAt: 'desc' }
      })

      // 转换为前端需要的格式
      const formattedRegistrations = registrations.map(reg => {
        // 从note中提取信息
        const note = reg.note || ''
        let type = 'course'
        let title = '未知课程'
        let icon = 'helpCircle'
        let originalId = ''

        if (note.includes('课程')) {
          type = 'course'
          title = note.replace('学习彩课程注册: ', '')
          icon = 'cpu'
          // 从虚拟scheduleId反推原始ID（这是一个简化的方法）
          originalId = `course_${reg.scheduleId - 900000}`
        } else if (note.includes('留学咨询')) {
          type = 'service'
          title = note.replace('学习彩留学咨询注册: ', '')
          icon = 'messageSquare'
          originalId = `service_${reg.scheduleId - 800000}`
        } else if (note.includes('夏令营')) {
          type = 'camp'
          title = note.replace('学习彩夏令营注册: ', '')
          icon = 'mapPin'
          originalId = `camp_${reg.scheduleId - 700000}`
        }

        return {
          id: originalId,
          title: title,
          subtitle: '学习彩服务',
          category: '学习彩',
          type: type,
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
      await prisma.userAppointment.deleteMany({
        where: {
          userId: currentUser.id,
          status: 'REGISTERED',
          note: {
            contains: '学习彩'
          }
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
