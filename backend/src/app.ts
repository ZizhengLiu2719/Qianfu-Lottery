import { Hono } from 'hono'
import { createAppointmentHandlers } from './handlers/appointments.handler'
import { createAuthHandlers } from './handlers/auth.handler'
import { createProductHandlers } from './handlers/products.handler'
import { createTravelHandlers } from './handlers/travel.handler'
import { corsMiddleware, createAuthMiddleware } from './middleware/auth.middleware'
import { AuthService } from './services/auth'
import { getPrismaClient } from './services/db'
import { QiancaiDouService } from './services/qiancaidou'

// 创建 Hono 应用实例
export const app = new Hono()

// 全局中间件
app.use('*', corsMiddleware())

// 健康检查端点
app.get('/api/health', (c) => {
  return c.json({
    code: 200,
    message: 'API is healthy',
    data: {
      timestamp: new Date().toISOString(),
      environment: (c.env as any)?.ENVIRONMENT || 'development'
    }
  })
})

// 初始化服务和处理器的工厂函数
function initializeServices(c: any) {
  const databaseUrl = c.env?.DATABASE_URL as string
  const jwtSecret = c.env?.JWT_SECRET as string

  if (!databaseUrl) {
    throw new Error('DATABASE_URL environment variable is required')
  }
  if (!jwtSecret) {
    throw new Error('JWT_SECRET environment variable is required')
  }

  const prisma = getPrismaClient(databaseUrl)
  const authService = new AuthService(jwtSecret)
  const qiancaiDouService = new QiancaiDouService(prisma)
  const authMiddleware = createAuthMiddleware(authService)

  return {
    authService,
    qiancaiDouService,
    authMiddleware,
    prisma
  }
}

// 认证相关路由 (公开)
app.post('/api/auth/register', async (c) => {
  const { authService, qiancaiDouService } = initializeServices(c)
  const handlers = createAuthHandlers(authService, qiancaiDouService)
  return handlers.register(c)
})

app.post('/api/auth/login', async (c) => {
  const { authService, qiancaiDouService } = initializeServices(c)
  const handlers = createAuthHandlers(authService, qiancaiDouService)
  return handlers.login(c)
})

// 受保护的用户路由
app.get('/api/me', async (c) => {
  const { authService, qiancaiDouService, authMiddleware } = initializeServices(c)
  await authMiddleware(c, async () => {})
  const handlers = createAuthHandlers(authService, qiancaiDouService)
  return handlers.getMe(c)
})

// 更新资料（受保护）
app.patch('/api/me', async (c) => {
  const { authService, qiancaiDouService, authMiddleware } = initializeServices(c)
  await authMiddleware(c, async () => {})
  const handlers = createAuthHandlers(authService, qiancaiDouService)
  return handlers.updateProfile(c)
})

// 商品相关路由
app.get('/api/products', async (c) => {
  const { qiancaiDouService } = initializeServices(c)
  const handlers = createProductHandlers(qiancaiDouService)
  return handlers.getProducts(c)
})

app.get('/api/products/:id', async (c) => {
  const { qiancaiDouService } = initializeServices(c)
  const handlers = createProductHandlers(qiancaiDouService)
  return handlers.getProduct(c)
})

// 受保护的订单路由
app.post('/api/orders', async (c) => {
  const { qiancaiDouService, authMiddleware } = initializeServices(c)
  await authMiddleware(c, async () => {})
  const handlers = createProductHandlers(qiancaiDouService)
  return handlers.createOrder(c)
})

app.get('/api/me/orders', async (c) => {
  const { qiancaiDouService, authMiddleware } = initializeServices(c)
  await authMiddleware(c, async () => {})
  const handlers = createProductHandlers(qiancaiDouService)
  return handlers.getUserOrders(c)
})

// 课程和预约相关路由
app.get('/api/courses', async (c) => {
  const { qiancaiDouService } = initializeServices(c)
  const handlers = createAppointmentHandlers(qiancaiDouService)
  return handlers.getCourses(c)
})

app.get('/api/courses/:id/schedules', async (c) => {
  const { qiancaiDouService } = initializeServices(c)
  const handlers = createAppointmentHandlers(qiancaiDouService)
  return handlers.getCourseSchedules(c)
})

// 受保护的预约路由
app.post('/api/appointments', async (c) => {
  const { qiancaiDouService, authMiddleware } = initializeServices(c)
  await authMiddleware(c, async () => {})
  const handlers = createAppointmentHandlers(qiancaiDouService)
  return handlers.createAppointment(c)
})

app.get('/api/me/appointments', async (c) => {
  const { qiancaiDouService, authMiddleware } = initializeServices(c)
  await authMiddleware(c, async () => {})
  const handlers = createAppointmentHandlers(qiancaiDouService)
  return handlers.getUserAppointments(c)
})

app.patch('/api/appointments/:id/cancel', async (c) => {
  const { qiancaiDouService, authMiddleware } = initializeServices(c)
  await authMiddleware(c, async () => {})
  const handlers = createAppointmentHandlers(qiancaiDouService)
  return handlers.cancelAppointment(c)
})

// 旅游相关路由 (公开)
app.get('/api/travel/posts', async (c) => {
  const handlers = createTravelHandlers()
  return handlers.getTravelPosts(c)
})

app.get('/api/travel/posts/:id', async (c) => {
  const handlers = createTravelHandlers()
  return handlers.getTravelPost(c)
})

app.get('/api/travel/tags', async (c) => {
  const handlers = createTravelHandlers()
  return handlers.getPopularTags(c)
})

app.get('/api/travel/search', async (c) => {
  const handlers = createTravelHandlers()
  return handlers.searchTravelPosts(c)
})

// 仟彩豆交易历史 (受保护)
app.get('/api/me/qiancaidou/transactions', async (c) => {
  const { qiancaiDouService, authMiddleware } = initializeServices(c)
  await authMiddleware(c, async () => {})
  
  try {
    const currentUser = c.get('user')
    const page = Math.max(1, parseInt(c.req.query('page') || '1'))
    const limit = Math.min(50, Math.max(1, parseInt(c.req.query('limit') || '20')))

    const result = await qiancaiDouService.getTransactionHistory(currentUser.id, page, limit)

    return c.json({
      code: 200,
      message: 'Transaction history retrieved successfully',
      data: result
    })
  } catch (error) {
    console.error('Get transaction history error:', error)
    return c.json({
      code: 500,
      message: 'Internal server error',
      data: null
    }, 500)
  }
})

// 娱乐彩占位路由
app.get('/api/entertainment/*', (c) => {
  return c.json({
    code: 200,
    message: 'Entertainment module coming soon',
    data: {
      message: '娱乐彩模块即将上线，敬请期待！',
      features: [
        '小游戏',
        '抽奖活动',
        '积分任务',
        '社区互动'
      ]
    }
  })
})

// 404 处理
app.notFound((c) => {
  return c.json({
    code: 404,
    message: 'API endpoint not found',
    data: null
  }, 404)
})

// 全局错误处理
app.onError((err, c) => {
  console.error('Unhandled error:', err)
  return c.json({
    code: 500,
    message: 'Internal server error',
    data: null
  }, 500)
})
