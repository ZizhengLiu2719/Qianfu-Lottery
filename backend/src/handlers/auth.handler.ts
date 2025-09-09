import { Context } from 'hono'
import { AuthService } from '../services/auth'
import { getPrismaClient } from '../services/db'
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

interface UploadAvatarRequest {
  avatarData: string // Base64编码的图片数据
  mimeType: string   // 图片MIME类型
  size: number       // 文件大小
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

      // 用户记录中缺少密码哈希（兼容旧数据）
      if (!user.passwordHash) {
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

    } catch (error: any) {
      console.error('Login error:', error)
      const env: Record<string, unknown> = (c.env as unknown as Record<string, unknown>) || {}
      const isProd = env['ENVIRONMENT'] === 'production'
      return c.json({
        code: 500,
        message: isProd ? 'Internal server error' : `Login failed: ${String(error?.message || error)}`,
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

      const prisma = getPrismaClient(databaseUrl)

      const user = await prisma.user.findUnique({
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
   * 上传头像
   */
  const uploadAvatar = async (c: Context) => {
    let prisma: any = null
    try {
      const currentUser = c.get('user')
      const body = await c.req.json() as UploadAvatarRequest

      // 验证图片数据
      if (!body.avatarData || !body.mimeType || !body.size) {
        return c.json({
          code: 400,
          message: 'Avatar data, mime type and size are required',
          data: null
        }, 400)
      }

      // 验证MIME类型
      const allowedMimeTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp']
      if (!allowedMimeTypes.includes(body.mimeType)) {
        return c.json({
          code: 400,
          message: 'Unsupported image format. Allowed: JPEG, PNG, GIF, WebP',
          data: null
        }, 400)
      }

      // 验证文件大小（最大5MB）
      const maxSize = 5 * 1024 * 1024 // 5MB
      if (body.size > maxSize) {
        return c.json({
          code: 400,
          message: 'Image size too large. Maximum 5MB allowed',
          data: null
        }, 400)
      }

      const databaseUrl = c.env?.DATABASE_URL as string
      if (!databaseUrl) {
        throw new Error('DATABASE_URL not configured')
      }

      prisma = getPrismaClient(databaseUrl)

      // 更新用户头像数据
      const updatedUser = await prisma.user.update({
        where: { id: currentUser.id },
        data: {
          avatarData: body.avatarData,
          avatarMimeType: body.mimeType,
          avatarSize: body.size,
          avatarUrl: `data:${body.mimeType};base64,${body.avatarData}`,
          updatedAt: new Date()
        },
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
          avatarUrl: true,
          avatarData: true,
          avatarMimeType: true,
          avatarSize: true,
          qiancaiDouBalance: true,
          language: true,
          createdAt: true,
          updatedAt: true
        }
      })

      return c.json({
        code: 200,
        message: 'Avatar uploaded successfully',
        data: { user: updatedUser }
      })

    } catch (error) {
      console.error('Upload avatar error:', error)
      return c.json({
        code: 500,
        message: 'Internal server error',
        data: null
      }, 500)
    } finally {
      // 确保在请求结束时清理 Prisma 连接
      if (prisma) {
        try {
          // 在 Cloudflare Workers 环境中，我们不需要显式断开连接
          // Prisma 会自动管理连接池
          // await prisma.$disconnect()
        } catch (disconnectError) {
          console.error('Error disconnecting Prisma:', disconnectError)
        }
      }
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
    updateProfile,
    uploadAvatar,
  }
}
