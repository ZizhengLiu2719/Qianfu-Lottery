import { Context } from 'hono'
import { AuthService } from '../services/auth'
import { getPrismaClient, runWithPrisma } from '../services/db'
import { QiancaiDouService } from '../services/qiancaidou'

interface RegisterRequest {
  email: string
  password: string
  firstName?: string
  lastName?: string
  language?: string
}

interface LoginRequest {
  email: string
  password: string
}

interface UpdateProfileRequest {
  firstName?: string
  lastName?: string
  language?: string
  avatarDataUrl?: string // data:image/png;base64,...
}

export function createAuthHandlers(authService: AuthService, qiancaiDouService: QiancaiDouService) {
  
  /**
   * 用户注册
   */
  const register = async (c: Context) => {
    try {
      const body = await c.req.json() as RegisterRequest
      
      // 验证必填字段
      if (!body.email || !body.password) {
        return c.json({
          code: 400,
          message: 'Email and password are required',
          data: null
        }, 400)
      }

      // 验证邮箱格式
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(body.email)) {
        return c.json({
          code: 400,
          message: 'Invalid email format',
          data: null
        }, 400)
      }

      // 验证密码强度
      if (body.password.length < 6) {
        return c.json({
          code: 400,
          message: 'Password must be at least 6 characters long',
          data: null
        }, 400)
      }

      const databaseUrl = c.env?.DATABASE_URL as string
      if (!databaseUrl) {
        throw new Error('DATABASE_URL not configured')
      }

      const prisma = getPrismaClient(databaseUrl)

      // 检查邮箱是否已存在
      const existingUser = await prisma.user.findUnique({
        where: { email: body.email }
      })

      if (existingUser) {
        return c.json({
          code: 409,
          message: 'Email already registered',
          data: null
        }, 409)
      }

      // 哈希密码
      const passwordHash = await authService.hashPassword(body.password)

      // 创建用户
      const user = await prisma.user.create({
        data: {
          email: body.email,
          passwordHash,
          firstName: body.firstName,
          lastName: body.lastName,
          language: body.language || 'zh',
          qiancaiDouBalance: 100 // 新用户奖励100仟彩豆
        }
      })

      // 记录新用户奖励
      await qiancaiDouService.creditQiancaiDou({
        userId: user.id,
        amount: 100,
        reason: 'ADMIN_ADJUSTMENT',
        description: 'Welcome bonus for new user'
      })

      // 生成 JWT
      const token = await authService.generateToken({
        userId: user.id,
        email: user.email
      })

      return c.json({
        code: 200,
        message: 'User registered successfully',
        data: {
          token,
          user: {
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            qiancaiDouBalance: user.qiancaiDouBalance,
            language: user.language,
            createdAt: user.createdAt
          }
        }
      })

    } catch (error) {
      console.error('Registration error:', error)
      return c.json({
        code: 500,
        message: 'Internal server error',
        data: null
      }, 500)
    }
  }

  /**
   * 用户登录
   */
  const login = async (c: Context) => {
    try {
      const body = await c.req.json() as LoginRequest
      
      if (!body.email || !body.password) {
        return c.json({
          code: 400,
          message: 'Email and password are required',
          data: null
        }, 400)
      }

      const databaseUrl = c.env?.DATABASE_URL as string
      if (!databaseUrl) {
        throw new Error('DATABASE_URL not configured')
      }

      const prisma = getPrismaClient(databaseUrl)

      // 查找用户
      const user = await prisma.user.findUnique({
        where: { email: body.email }
      })

      if (!user) {
        return c.json({
          code: 401,
          message: 'Invalid email or password',
          data: null
        }, 401)
      }

      // 验证密码
      const isPasswordValid = await authService.verifyPassword(body.password, user.passwordHash)
      if (!isPasswordValid) {
        return c.json({
          code: 401,
          message: 'Invalid email or password',
          data: null
        }, 401)
      }

      // 生成 JWT
      const token = await authService.generateToken({
        userId: user.id,
        email: user.email
      })

      return c.json({
        code: 200,
        message: 'Login successful',
        data: {
          token,
          user: {
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            qiancaiDouBalance: user.qiancaiDouBalance,
            language: user.language,
            createdAt: user.createdAt
          }
        }
      })

    } catch (error) {
      console.error('Login error:', error)
      return c.json({
        code: 500,
        message: 'Internal server error',
        data: null
      }, 500)
    }
  }

  /**
   * 获取当前用户信息
   */
  const getMe = async (c: Context) => {
    try {
      const currentUser = c.get('user')
      
      const databaseUrl = c.env?.DATABASE_URL as string
      if (!databaseUrl) {
        throw new Error('DATABASE_URL not configured')
      }

      const user = await runWithPrisma(databaseUrl, async (prisma) => {
        return prisma.user.findUnique({
          where: { id: currentUser.id },
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
            qiancaiDouBalance: true,
            language: true,
            avatarUrl: true,
            createdAt: true,
            updatedAt: true
          }
        })
      })

      if (!user) {
        return c.json({
          code: 404,
          message: 'User not found',
          data: null
        }, 404)
      }

      return c.json({
        code: 200,
        message: 'User information retrieved successfully',
        data: { user }
      })

    } catch (error) {
      console.error('Get user info error:', error)
      return c.json({
        code: 500,
        message: 'Internal server error',
        data: null
      }, 500)
    }
  }

  /**
   * 更新当前用户资料（姓名/语言/头像）
   */
  const updateProfile = async (c: Context) => {
    try {
      const currentUser = c.get('user')
      const body = await c.req.json() as UpdateProfileRequest

      const databaseUrl = c.env?.DATABASE_URL as string
      if (!databaseUrl) {
        throw new Error('DATABASE_URL not configured')
      }

      const prisma = getPrismaClient(databaseUrl)

      const data: any = {}
      if (typeof body.firstName === 'string') data.firstName = body.firstName
      if (typeof body.lastName === 'string') data.lastName = body.lastName
      if (typeof body.language === 'string') data.language = body.language
      if (typeof body.avatarDataUrl === 'string' && body.avatarDataUrl.length > 0) {
        // 直接存 data URL （前端需控制大小）
        data.avatarUrl = body.avatarDataUrl
      }

      const user = await prisma.user.update({
        where: { id: currentUser.id },
        data,
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
          qiancaiDouBalance: true,
          language: true,
          avatarUrl: true,
          createdAt: true,
          updatedAt: true
        }
      })

      return c.json({
        code: 200,
        message: 'Profile updated successfully',
        data: { user }
      })
    } catch (error) {
      console.error('Update profile error:', error)
      return c.json({
        code: 500,
        message: 'Internal server error',
        data: null
      }, 500)
    }
  }

  return {
    register,
    login,
    getMe,
    updateProfile
  }
}
