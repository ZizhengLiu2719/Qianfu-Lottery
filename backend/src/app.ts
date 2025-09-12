import { Hono } from 'hono'
import { createAccountHandlers } from './handlers/account.handler'
import { createAddressHandlers } from './handlers/address.handler'
import { createAppointmentHandlers } from './handlers/appointments.handler'
import { createAuthHandlers } from './handlers/auth.handler'
import { createCartHandlers } from './handlers/cart.handler'
import { createCheckoutHandlers } from './handlers/checkout.handler'
import { createFeedbackHandlers } from './handlers/feedback.handler'
import { createInventoryHandlers } from './handlers/inventory.handler'
import { createLearningHandlers } from './handlers/learning.handler'
import { createOrderHandlers } from './handlers/order.handler'
import { createProductHandlers } from './handlers/products.handler'
import { createSeedHandlers } from './handlers/seed.handler'
import { createTravelHandlers, createTravelPackageHandlers } from './handlers/travel.handler'
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

// 诊断端点：检查环境变量配置
app.get('/api/diag', async (c) => {
  try {
    const env: Record<string, unknown> = (c.env as unknown as Record<string, unknown>) || {}
    const databaseUrl = env['DATABASE_URL'] as string | undefined
    const jwtSecret = env['JWT_SECRET'] as string | undefined

    const result: any = {
      environment: (c.env as any)?.ENVIRONMENT || 'development',
      hasDatabaseUrl: Boolean(databaseUrl),
      hasJwtSecret: Boolean(jwtSecret),
      envKeys: Object.keys(env),
      timestamp: new Date().toISOString()
    }

    return c.json({ code: 200, message: 'Diagnostic completed', data: result })
  } catch (error) {
    console.error('Diagnostic endpoint error:', error)
    return c.json({
      code: 500,
      message: 'Diagnostic failed',
      data: {
        error: String(error),
        environment: (c.env as any)?.ENVIRONMENT || 'development'
      }
    }, 500)
  }
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

// 上传头像（受保护）
app.post('/api/me/avatar', async (c) => {
  const { authService, qiancaiDouService, authMiddleware } = initializeServices(c)
  await authMiddleware(c, async () => {})
  const handlers = createAuthHandlers(authService, qiancaiDouService)
  return handlers.uploadAvatar(c)
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

// 账户与千彩豆（受保护）
app.get('/api/account', async (c) => {
  const { authMiddleware, qiancaiDouService } = initializeServices(c)
  await authMiddleware(c, async () => {})
  const handlers = createAccountHandlers(qiancaiDouService)
  return handlers.getAccount(c)
})

app.post('/api/qiancaidou/grant', async (c) => {
  const { authMiddleware, qiancaiDouService } = initializeServices(c)
  await authMiddleware(c, async () => {})
  const handlers = createAccountHandlers(qiancaiDouService)
  return handlers.grantQiancaiDou(c)
})

// 购物车（受保护）
app.get('/api/cart', async (c) => {
  const { authMiddleware } = initializeServices(c)
  await authMiddleware(c, async () => {})
  const handlers = createCartHandlers()
  return handlers.getCart(c)
})

app.post('/api/cart/items', async (c) => {
  const { authMiddleware } = initializeServices(c)
  await authMiddleware(c, async () => {})
  const handlers = createCartHandlers()
  return handlers.addItem(c)
})

app.patch('/api/cart/items/:itemId', async (c) => {
  const { authMiddleware } = initializeServices(c)
  await authMiddleware(c, async () => {})
  const handlers = createCartHandlers()
  return handlers.updateItem(c)
})

app.delete('/api/cart/items/:itemId', async (c) => {
  const { authMiddleware } = initializeServices(c)
  await authMiddleware(c, async () => {})
  const handlers = createCartHandlers()
  return handlers.removeItem(c)
})

// 结算/下单（受保护）
app.post('/api/checkout/preview', async (c) => {
  const { authMiddleware, qiancaiDouService } = initializeServices(c)
  await authMiddleware(c, async () => {})
  const handlers = createCheckoutHandlers(qiancaiDouService)
  return handlers.preview(c)
})

// 注意：统一在订单管理路由区块注册 `/api/orders/from-cart`，避免重复注册导致覆盖

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

// 学习彩相关路由 (受保护)
app.post('/api/learning/courses/register', async (c) => {
  const { authMiddleware } = initializeServices(c)
  await authMiddleware(c, async () => {})
  const handlers = createLearningHandlers()
  return handlers.registerCourse(c)
})

app.post('/api/learning/study-abroad/register', async (c) => {
  const { authMiddleware } = initializeServices(c)
  await authMiddleware(c, async () => {})
  const handlers = createLearningHandlers()
  return handlers.registerStudyAbroadService(c)
})

app.post('/api/learning/summer-camps/register', async (c) => {
  const { authMiddleware } = initializeServices(c)
  await authMiddleware(c, async () => {})
  const handlers = createLearningHandlers()
  return handlers.registerSummerCamp(c)
})

app.delete('/api/learning/:type/cancel/:id', async (c) => {
  const { authMiddleware } = initializeServices(c)
  await authMiddleware(c, async () => {})
  const handlers = createLearningHandlers()
  return handlers.cancelRegistration(c)
})

app.delete('/api/learning/:type/delete/:id', async (c) => {
  const { authMiddleware } = initializeServices(c)
  await authMiddleware(c, async () => {})
  const handlers = createLearningHandlers()
  return handlers.deleteRegistration(c)
})

app.get('/api/learning/registrations', async (c) => {
  const { authMiddleware } = initializeServices(c)
  await authMiddleware(c, async () => {})
  const handlers = createLearningHandlers()
  return handlers.getUserLearningRegistrations(c)
})

app.delete('/api/learning/registrations/clear', async (c) => {
  const { authMiddleware } = initializeServices(c)
  await authMiddleware(c, async () => {})
  const handlers = createLearningHandlers()
  return handlers.clearAllLearningRegistrations(c)
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

// 旅游套餐相关路由 (受保护)
app.get('/api/travel/packages', async (c) => {
  const handlers = createTravelPackageHandlers()
  return handlers.getTravelPackages(c)
})

app.get('/api/travel/packages/:id', async (c) => {
  const handlers = createTravelPackageHandlers()
  return handlers.getTravelPackage(c)
})

app.post('/api/travel/packages/register', async (c) => {
  const { authMiddleware } = initializeServices(c)
  await authMiddleware(c, async () => {})
  const handlers = createTravelPackageHandlers()
  return handlers.registerTravelPackage(c)
})

app.delete('/api/travel/registrations/:id', async (c) => {
  const { authMiddleware } = initializeServices(c)
  await authMiddleware(c, async () => {})
  const handlers = createTravelPackageHandlers()
  return handlers.cancelTravelRegistration(c)
})

app.delete('/api/travel/registrations/:id/delete', async (c) => {
  const { authMiddleware } = initializeServices(c)
  await authMiddleware(c, async () => {})
  const handlers = createTravelPackageHandlers()
  return handlers.deleteTravelRegistration(c)
})

app.get('/api/travel/registrations', async (c) => {
  const { authMiddleware } = initializeServices(c)
  await authMiddleware(c, async () => {})
  const handlers = createTravelPackageHandlers()
  return handlers.getUserTravelRegistrations(c)
})

app.delete('/api/travel/registrations/clear', async (c) => {
  const { authMiddleware } = initializeServices(c)
  await authMiddleware(c, async () => {})
  const handlers = createTravelPackageHandlers()
  return handlers.clearAllTravelRegistrations(c)
})

// 开发环境：种子产品（按分类填充示例）
app.post('/api/dev/seed-products', async (c) => {
  const handlers = createSeedHandlers()
  return handlers.seedProducts(c)
})

app.post('/api/dev/update-product-images', async (c) => {
  const handlers = createSeedHandlers()
  return handlers.updateProductImages(c)
})

// 地址管理路由 (受保护)
app.get('/api/addresses', async (c) => {
  const { prisma, authMiddleware } = initializeServices(c)
  await authMiddleware(c, async () => {})
  const handlers = createAddressHandlers(prisma)
  return handlers.getAddresses(c)
})

app.post('/api/addresses', async (c) => {
  const { prisma, authMiddleware } = initializeServices(c)
  await authMiddleware(c, async () => {})
  const handlers = createAddressHandlers(prisma)
  return handlers.createAddress(c)
})

app.put('/api/addresses/:id', async (c) => {
  const { prisma, authMiddleware } = initializeServices(c)
  await authMiddleware(c, async () => {})
  const handlers = createAddressHandlers(prisma)
  return handlers.updateAddress(c)
})

app.delete('/api/addresses/:id', async (c) => {
  const { prisma, authMiddleware } = initializeServices(c)
  await authMiddleware(c, async () => {})
  const handlers = createAddressHandlers(prisma)
  return handlers.deleteAddress(c)
})

app.put('/api/addresses/:id/default', async (c) => {
  const { prisma, authMiddleware } = initializeServices(c)
  await authMiddleware(c, async () => {})
  const handlers = createAddressHandlers(prisma)
  return handlers.setDefaultAddress(c)
})

// 订单管理路由 (受保护)
app.get('/api/orders', async (c) => {
  const { prisma, qiancaiDouService, authMiddleware } = initializeServices(c)
  await authMiddleware(c, async () => {})
  const handlers = createOrderHandlers(prisma, qiancaiDouService)
  return handlers.getOrders(c)
})

app.get('/api/orders/:id', async (c) => {
  const { prisma, qiancaiDouService, authMiddleware } = initializeServices(c)
  await authMiddleware(c, async () => {})
  const handlers = createOrderHandlers(prisma, qiancaiDouService)
  return handlers.getOrder(c)
})

app.post('/api/orders/from-cart', async (c) => {
  const { qiancaiDouService, authMiddleware } = initializeServices(c)
  await authMiddleware(c, async () => {})
  const handlers = createCheckoutHandlers(qiancaiDouService)
  return handlers.createOrderFromCart(c)
})

app.post('/api/orders/:id/pay', async (c) => {
  const { prisma, qiancaiDouService, authMiddleware } = initializeServices(c)
  await authMiddleware(c, async () => {})
  const handlers = createOrderHandlers(prisma, qiancaiDouService)
  return handlers.payOrder(c)
})

app.post('/api/orders/:id/cancel', async (c) => {
  const { prisma, qiancaiDouService, authMiddleware } = initializeServices(c)
  await authMiddleware(c, async () => {})
  const handlers = createOrderHandlers(prisma, qiancaiDouService)
  return handlers.cancelOrder(c)
})

app.post('/api/orders/:id/confirm-delivery', async (c) => {
  const { prisma, qiancaiDouService, authMiddleware } = initializeServices(c)
  await authMiddleware(c, async () => {})
  const handlers = createOrderHandlers(prisma, qiancaiDouService)
  return handlers.confirmDelivery(c)
})

app.get('/api/orders/:id/tracking', async (c) => {
  const { prisma, qiancaiDouService, authMiddleware } = initializeServices(c)
  await authMiddleware(c, async () => {})
  const handlers = createOrderHandlers(prisma, qiancaiDouService)
  return handlers.getTracking(c)
})

// 库存管理路由 (受保护)
app.post('/api/inventory/check', async (c) => {
  const { prisma, authMiddleware } = initializeServices(c)
  await authMiddleware(c, async () => {})
  const handlers = createInventoryHandlers(prisma)
  return handlers.checkInventory(c)
})

app.post('/api/inventory/lock', async (c) => {
  const { prisma, authMiddleware } = initializeServices(c)
  await authMiddleware(c, async () => {})
  const handlers = createInventoryHandlers(prisma)
  return handlers.lockInventory(c)
})

app.post('/api/inventory/release', async (c) => {
  const { prisma, authMiddleware } = initializeServices(c)
  await authMiddleware(c, async () => {})
  const handlers = createInventoryHandlers(prisma)
  return handlers.releaseInventory(c)
})

app.post('/api/inventory/consume', async (c) => {
  const { prisma, authMiddleware } = initializeServices(c)
  await authMiddleware(c, async () => {})
  const handlers = createInventoryHandlers(prisma)
  return handlers.consumeInventory(c)
})

app.get('/api/inventory/:productId/status', async (c) => {
  const { prisma, authMiddleware } = initializeServices(c)
  await authMiddleware(c, async () => {})
  const handlers = createInventoryHandlers(prisma)
  return handlers.getInventoryStatus(c)
})

app.post('/api/inventory/cleanup-expired', async (c) => {
  const { prisma, authMiddleware } = initializeServices(c)
  await authMiddleware(c, async () => {})
  const handlers = createInventoryHandlers(prisma)
  return handlers.cleanupExpiredLocks(c)
})

// 千彩豆交易历史 (受保护)
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

// 反馈路由 (受保护)
app.post('/api/feedback', async (c) => {
  const { prisma, authMiddleware } = initializeServices(c)
  await authMiddleware(c, async () => {})
  const handlers = createFeedbackHandlers(prisma)
  return handlers.createFeedback(c)
})

app.get('/api/feedback', async (c) => {
  const { prisma, authMiddleware } = initializeServices(c)
  await authMiddleware(c, async () => {})
  const handlers = createFeedbackHandlers(prisma)
  return handlers.getUserFeedback(c)
})

app.get('/api/feedback/:id', async (c) => {
  const { prisma, authMiddleware } = initializeServices(c)
  await authMiddleware(c, async () => {})
  const handlers = createFeedbackHandlers(prisma)
  return handlers.getFeedback(c)
})

app.put('/api/feedback/:id', async (c) => {
  const { prisma, authMiddleware } = initializeServices(c)
  await authMiddleware(c, async () => {})
  const handlers = createFeedbackHandlers(prisma)
  return handlers.updateFeedback(c)
})

app.delete('/api/feedback/:id', async (c) => {
  const { prisma, authMiddleware } = initializeServices(c)
  await authMiddleware(c, async () => {})
  const handlers = createFeedbackHandlers(prisma)
  return handlers.deleteFeedback(c)
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
