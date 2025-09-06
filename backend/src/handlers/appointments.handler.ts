import { Context } from 'hono'
import { getPrismaClient } from '../services/db'
import { QiancaiDouService } from '../services/qiancaidou'

interface CreateAppointmentRequest {
  scheduleId: number
  note?: string
}

export function createAppointmentHandlers(qiancaiDouService: QiancaiDouService) {
  
  /**
   * 获取线下课程列表
   */
  const getCourses = async (c: Context) => {
    try {
      const databaseUrl = c.env?.DATABASE_URL as string
      if (!databaseUrl) {
        throw new Error('DATABASE_URL not configured')
      }

      const prisma = getPrismaClient(databaseUrl)

      const category = c.req.query('category')
      const where = {
        isActive: true,
        ...(category && { category })
      }

      const courses = await prisma.offlineCourse.findMany({
        where,
        orderBy: { createdAt: 'desc' }
      })

      return c.json({
        code: 200,
        message: 'Courses retrieved successfully',
        data: { courses }
      })

    } catch (error) {
      console.error('Get courses error:', error)
      return c.json({
        code: 500,
        message: 'Internal server error',
        data: null
      }, 500)
    }
  }

  /**
   * 获取课程的可预约时间段
   */
  const getCourseSchedules = async (c: Context) => {
    try {
      const courseId = parseInt(c.req.param('id'))
      
      if (isNaN(courseId)) {
        return c.json({
          code: 400,
          message: 'Invalid course ID',
          data: null
        }, 400)
      }

      const databaseUrl = c.env?.DATABASE_URL as string
      if (!databaseUrl) {
        throw new Error('DATABASE_URL not configured')
      }

      const prisma = getPrismaClient(databaseUrl)

      // 只获取未来的时间段
      const schedules = await prisma.courseSchedule.findMany({
        where: {
          courseId,
          isActive: true,
          startTime: {
            gte: new Date()
          }
        },
        include: {
          course: {
            select: {
              id: true,
              title: true,
              instructor: true
            }
          }
        },
        orderBy: { startTime: 'asc' }
      })

      return c.json({
        code: 200,
        message: 'Course schedules retrieved successfully',
        data: { schedules }
      })

    } catch (error) {
      console.error('Get course schedules error:', error)
      return c.json({
        code: 500,
        message: 'Internal server error',
        data: null
      }, 500)
    }
  }

  /**
   * 创建预约
   */
  const createAppointment = async (c: Context) => {
    try {
      const currentUser = c.get('user')
      const body = await c.req.json() as CreateAppointmentRequest

      if (!body.scheduleId) {
        return c.json({
          code: 400,
          message: 'Schedule ID is required',
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
        // 获取时间段信息
        const schedule = await tx.courseSchedule.findUnique({
          where: { 
            id: body.scheduleId,
            isActive: true
          },
          include: {
            course: true
          }
        })

        if (!schedule) {
          throw new Error('Schedule not found or inactive')
        }

        // 检查时间段是否已过期
        if (schedule.startTime < new Date()) {
          throw new Error('Cannot book past schedule')
        }

        // 检查是否还有容量
        if (schedule.bookedSlots >= schedule.capacity) {
          throw new Error('Schedule is fully booked')
        }

        // 检查用户是否已经预约了这个时间段
        const existingAppointment = await tx.userAppointment.findUnique({
          where: {
            userId_scheduleId: {
              userId: currentUser.id,
              scheduleId: body.scheduleId
            }
          }
        })

        if (existingAppointment) {
          throw new Error('You have already booked this schedule')
        }

        // 如果有费用，扣除仟彩豆
        if (schedule.feeInQiancaiDou > 0) {
          await qiancaiDouService.debitQiancaiDou({
            userId: currentUser.id,
            amount: schedule.feeInQiancaiDou,
            reason: 'APPOINTMENT_FEE',
            description: `Appointment for ${schedule.course.title}`,
            refTable: 'user_appointments',
            refId: body.scheduleId.toString()
          })
        }

        // 创建预约
        const appointment = await tx.userAppointment.create({
          data: {
            userId: currentUser.id,
            scheduleId: body.scheduleId,
            note: body.note
          },
          include: {
            schedule: {
              include: {
                course: true
              }
            }
          }
        })

        // 增加已预约数量
        await tx.courseSchedule.update({
          where: { id: body.scheduleId },
          data: {
            bookedSlots: {
              increment: 1
            }
          }
        })

        return appointment
      })

      return c.json({
        code: 200,
        message: 'Appointment created successfully',
        data: { appointment: result }
      })

    } catch (error) {
      console.error('Create appointment error:', error)
      
      if (error instanceof Error) {
        if (error.message.includes('fully booked') || 
            error.message.includes('already booked') || 
            error.message.includes('past schedule')) {
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
   * 获取用户的预约列表
   */
  const getUserAppointments = async (c: Context) => {
    try {
      const currentUser = c.get('user')
      const status = c.req.query('status') // 可选的状态过滤

      const databaseUrl = c.env?.DATABASE_URL as string
      if (!databaseUrl) {
        throw new Error('DATABASE_URL not configured')
      }

      const prisma = getPrismaClient(databaseUrl)

      const where = {
        userId: currentUser.id,
        ...(status && { status })
      }

      const appointments = await prisma.userAppointment.findMany({
        where,
        include: {
          schedule: {
            include: {
              course: {
                select: {
                  id: true,
                  title: true,
                  instructor: true,
                  category: true
                }
              }
            }
          }
        },
        orderBy: [
          { schedule: { startTime: 'asc' } },
          { createdAt: 'desc' }
        ]
      })

      return c.json({
        code: 200,
        message: 'Appointments retrieved successfully',
        data: { appointments }
      })

    } catch (error) {
      console.error('Get user appointments error:', error)
      return c.json({
        code: 500,
        message: 'Internal server error',
        data: null
      }, 500)
    }
  }

  /**
   * 取消预约
   */
  const cancelAppointment = async (c: Context) => {
    try {
      const currentUser = c.get('user')
      const appointmentId = parseInt(c.req.param('id'))

      if (isNaN(appointmentId)) {
        return c.json({
          code: 400,
          message: 'Invalid appointment ID',
          data: null
        }, 400)
      }

      const databaseUrl = c.env?.DATABASE_URL as string
      if (!databaseUrl) {
        throw new Error('DATABASE_URL not configured')
      }

      const prisma = getPrismaClient(databaseUrl)

      const result = await prisma.$transaction(async (tx) => {
        // 获取预约信息
        const appointment = await tx.userAppointment.findUnique({
          where: { 
            id: appointmentId,
            userId: currentUser.id 
          },
          include: {
            schedule: {
              include: {
                course: true
              }
            }
          }
        })

        if (!appointment) {
          throw new Error('Appointment not found')
        }

        if (appointment.status === 'CANCELLED') {
          throw new Error('Appointment already cancelled')
        }

        // 检查是否可以取消（比如开始前24小时）
        const hoursUntilStart = (appointment.schedule.startTime.getTime() - new Date().getTime()) / (1000 * 60 * 60)
        if (hoursUntilStart < 24) {
          throw new Error('Cannot cancel appointment within 24 hours of start time')
        }

        // 更新预约状态
        const updatedAppointment = await tx.userAppointment.update({
          where: { id: appointmentId },
          data: { status: 'CANCELLED' },
          include: {
            schedule: {
              include: {
                course: true
              }
            }
          }
        })

        // 减少已预约数量
        await tx.courseSchedule.update({
          where: { id: appointment.scheduleId },
          data: {
            bookedSlots: {
              decrement: 1
            }
          }
        })

        // 如果有费用，退还仟彩豆
        if (appointment.schedule.feeInQiancaiDou > 0) {
          await qiancaiDouService.creditQiancaiDou({
            userId: currentUser.id,
            amount: appointment.schedule.feeInQiancaiDou,
            reason: 'REFUND',
            description: `Refund for cancelled appointment: ${appointment.schedule.course.title}`,
            refTable: 'user_appointments',
            refId: appointmentId.toString()
          })
        }

        return updatedAppointment
      })

      return c.json({
        code: 200,
        message: 'Appointment cancelled successfully',
        data: { appointment: result }
      })

    } catch (error) {
      console.error('Cancel appointment error:', error)
      
      if (error instanceof Error) {
        if (error.message.includes('not found') || 
            error.message.includes('already cancelled') || 
            error.message.includes('within 24 hours')) {
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

  return {
    getCourses,
    getCourseSchedules,
    createAppointment,
    getUserAppointments,
    cancelAppointment
  }
}
