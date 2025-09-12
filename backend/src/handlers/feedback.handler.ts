import { Context } from 'hono'

interface CreateFeedbackRequest {
  title: string
  content: string
  category: string
  priority: string
}

interface UpdateFeedbackRequest {
  title?: string
  content?: string
  category?: string
  priority?: string
  status?: string
  adminReply?: string
}

export function createFeedbackHandlers(prisma: any) {
  
  /**
   * 创建反馈
   */
  const createFeedback = async (c: Context) => {
    try {
      const currentUser = c.get('user')
      if (!currentUser) {
        return c.json({
          code: 401,
          message: 'Unauthorized',
          data: null
        }, 401)
      }

      const body = await c.req.json() as CreateFeedbackRequest
      
      // 验证必填字段
      if (!body.title || !body.content || !body.category || !body.priority) {
        return c.json({
          code: 400,
          message: 'Title, content, category and priority are required',
          data: null
        }, 400)
      }

      // 验证分类
      const validCategories = ['general', 'bug', 'feature', 'suggestion', 'complaint']
      if (!validCategories.includes(body.category)) {
        return c.json({
          code: 400,
          message: 'Invalid category',
          data: null
        }, 400)
      }

      // 验证优先级
      const validPriorities = ['low', 'medium', 'high', 'urgent']
      if (!validPriorities.includes(body.priority)) {
        return c.json({
          code: 400,
          message: 'Invalid priority',
          data: null
        }, 400)
      }

      // 使用传入的 prisma 实例

      // 创建反馈
      const feedback = await prisma.feedback.create({
        data: {
          userId: currentUser.id,
          title: body.title,
          content: body.content,
          category: body.category,
          priority: body.priority,
          status: 'pending'
        },
        include: {
          user: {
            select: {
              id: true,
              email: true,
              firstName: true,
              lastName: true
            }
          }
        }
      })

      return c.json({
        code: 200,
        message: 'Feedback created successfully',
        data: {
          id: feedback.id,
          userId: feedback.userId,
          title: feedback.title,
          content: feedback.content,
          category: feedback.category,
          status: feedback.status,
          priority: feedback.priority,
          createdAt: feedback.createdAt.toISOString(),
          updatedAt: feedback.updatedAt.toISOString(),
          adminReply: feedback.adminReply,
          adminRepliedAt: feedback.adminRepliedAt?.toISOString()
        }
      })

    } catch (error) {
      console.error('Create feedback error:', error)
      return c.json({
        code: 500,
        message: 'Internal server error',
        data: null
      }, 500)
    }
  }

  /**
   * 获取用户反馈列表
   */
  const getUserFeedback = async (c: Context) => {
    let currentUser: any = null
    try {
      currentUser = c.get('user')
      if (!currentUser) {
        return c.json({
          code: 401,
          message: 'Unauthorized',
          data: null
        }, 401)
      }

      const page = parseInt(c.req.query('page') || '1')
      const limit = parseInt(c.req.query('limit') || '20')
      const offset = (page - 1) * limit

      // 使用传入的 prisma 实例

      // 获取反馈列表
      const feedbacks = await prisma.feedback.findMany({
        where: {
          userId: currentUser.id
        },
        orderBy: {
          createdAt: 'desc'
        },
        skip: offset,
        take: limit
      })

      // 获取总数
      const total = await prisma.feedback.count({
        where: {
          userId: currentUser.id
        }
      })

      return c.json({
        code: 200,
        message: 'Feedback list retrieved successfully',
        data: feedbacks.map((feedback: any) => ({
          id: feedback.id,
          userId: feedback.userId,
          title: feedback.title,
          content: feedback.content,
          category: feedback.category,
          status: feedback.status,
          priority: feedback.priority,
          createdAt: feedback.createdAt.toISOString(),
          updatedAt: feedback.updatedAt.toISOString(),
          adminReply: feedback.adminReply,
          adminRepliedAt: feedback.adminRepliedAt?.toISOString()
        })),
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit)
        }
      })

    } catch (error) {
      console.error('Get user feedback error:', error)
      return c.json({
        code: 500,
        message: 'Internal server error',
        data: null
      }, 500)
    }
  }

  /**
   * 获取单个反馈详情
   */
  const getFeedback = async (c: Context) => {
    try {
      const currentUser = c.get('user')
      if (!currentUser) {
        return c.json({
          code: 401,
          message: 'Unauthorized',
          data: null
        }, 401)
      }

      const feedbackId = parseInt(c.req.param('id'))
      if (!feedbackId) {
        return c.json({
          code: 400,
          message: 'Invalid feedback ID',
          data: null
        }, 400)
      }

      // 使用传入的 prisma 实例

      // 获取反馈详情
      const feedback = await prisma.feedback.findFirst({
        where: {
          id: feedbackId,
          userId: currentUser.id
        }
      })

      if (!feedback) {
        return c.json({
          code: 404,
          message: 'Feedback not found',
          data: null
        }, 404)
      }

      return c.json({
        code: 200,
        message: 'Feedback retrieved successfully',
        data: {
          id: feedback.id,
          userId: feedback.userId,
          title: feedback.title,
          content: feedback.content,
          category: feedback.category,
          status: feedback.status,
          priority: feedback.priority,
          createdAt: feedback.createdAt.toISOString(),
          updatedAt: feedback.updatedAt.toISOString(),
          adminReply: feedback.adminReply,
          adminRepliedAt: feedback.adminRepliedAt?.toISOString()
        }
      })

    } catch (error) {
      console.error('Get feedback error:', error)
      return c.json({
        code: 500,
        message: 'Internal server error',
        data: null
      }, 500)
    }
  }

  /**
   * 更新反馈
   */
  const updateFeedback = async (c: Context) => {
    try {
      const currentUser = c.get('user')
      if (!currentUser) {
        return c.json({
          code: 401,
          message: 'Unauthorized',
          data: null
        }, 401)
      }

      const feedbackId = parseInt(c.req.param('id'))
      if (!feedbackId) {
        return c.json({
          code: 400,
          message: 'Invalid feedback ID',
          data: null
        }, 400)
      }

      const body = await c.req.json() as UpdateFeedbackRequest

      // 使用传入的 prisma 实例

      // 检查反馈是否存在且属于当前用户
      const existingFeedback = await prisma.feedback.findFirst({
        where: {
          id: feedbackId,
          userId: currentUser.id
        }
      })

      if (!existingFeedback) {
        return c.json({
          code: 404,
          message: 'Feedback not found',
          data: null
        }, 404)
      }

      // 验证分类（如果提供）
      if (body.category) {
        const validCategories = ['general', 'bug', 'feature', 'suggestion', 'complaint']
        if (!validCategories.includes(body.category)) {
          return c.json({
            code: 400,
            message: 'Invalid category',
            data: null
          }, 400)
        }
      }

      // 验证优先级（如果提供）
      if (body.priority) {
        const validPriorities = ['low', 'medium', 'high', 'urgent']
        if (!validPriorities.includes(body.priority)) {
          return c.json({
            code: 400,
            message: 'Invalid priority',
            data: null
          }, 400)
        }
      }

      // 验证状态（如果提供）
      if (body.status) {
        const validStatuses = ['pending', 'in_progress', 'resolved', 'closed']
        if (!validStatuses.includes(body.status)) {
          return c.json({
            code: 400,
            message: 'Invalid status',
            data: null
          }, 400)
        }
      }

      // 更新反馈
      const updateData: any = {}
      if (body.title !== undefined) updateData.title = body.title
      if (body.content !== undefined) updateData.content = body.content
      if (body.category !== undefined) updateData.category = body.category
      if (body.priority !== undefined) updateData.priority = body.priority
      if (body.status !== undefined) updateData.status = body.status
      if (body.adminReply !== undefined) {
        updateData.adminReply = body.adminReply
        updateData.adminRepliedAt = new Date()
      }

      const feedback = await prisma.feedback.update({
        where: {
          id: feedbackId
        },
        data: updateData
      })

      return c.json({
        code: 200,
        message: 'Feedback updated successfully',
        data: {
          id: feedback.id,
          userId: feedback.userId,
          title: feedback.title,
          content: feedback.content,
          category: feedback.category,
          status: feedback.status,
          priority: feedback.priority,
          createdAt: feedback.createdAt.toISOString(),
          updatedAt: feedback.updatedAt.toISOString(),
          adminReply: feedback.adminReply,
          adminRepliedAt: feedback.adminRepliedAt?.toISOString()
        }
      })

    } catch (error) {
      console.error('Update feedback error:', error)
      return c.json({
        code: 500,
        message: 'Internal server error',
        data: null
      }, 500)
    }
  }

  /**
   * 删除反馈
   */
  const deleteFeedback = async (c: Context) => {
    try {
      const currentUser = c.get('user')
      if (!currentUser) {
        return c.json({
          code: 401,
          message: 'Unauthorized',
          data: null
        }, 401)
      }

      const feedbackId = parseInt(c.req.param('id'))
      if (!feedbackId) {
        return c.json({
          code: 400,
          message: 'Invalid feedback ID',
          data: null
        }, 400)
      }

      // 使用传入的 prisma 实例

      // 检查反馈是否存在且属于当前用户
      const existingFeedback = await prisma.feedback.findFirst({
        where: {
          id: feedbackId,
          userId: currentUser.id
        }
      })

      if (!existingFeedback) {
        return c.json({
          code: 404,
          message: 'Feedback not found',
          data: null
        }, 404)
      }

      // 删除反馈
      await prisma.feedback.delete({
        where: {
          id: feedbackId
        }
      })

      return c.json({
        code: 200,
        message: 'Feedback deleted successfully',
        data: null
      })

    } catch (error) {
      console.error('Delete feedback error:', error)
      return c.json({
        code: 500,
        message: 'Internal server error',
        data: null
      }, 500)
    }
  }

  return {
    createFeedback,
    getUserFeedback,
    getFeedback,
    updateFeedback,
    deleteFeedback
  }
}
