import { Context, Next } from 'hono'
import { AuthService } from '../services/auth'

declare module 'hono' {
  interface ContextVariableMap {
    user: {
      id: number
      email: string
    }
  }
}

export function createAuthMiddleware(authService: AuthService) {
  return async (c: Context, next: Next): Promise<Response | void> => {
    try {
      const authorization = c.req.header('Authorization')
      const token = authService.extractTokenFromHeader(authorization)

      if (!token) {
        return c.json({ 
          code: 401, 
          message: 'Authorization token required',
          data: null 
        }, 401)
      }

      const payload = await authService.verifyToken(token)
      if (!payload) {
        return c.json({ 
          code: 401, 
          message: 'Invalid or expired token',
          data: null 
        }, 401)
      }

      // 将用户信息存储到上下文中
      c.set('user', {
        id: payload.userId,
        email: payload.email
      })

      return await next()
    } catch (error) {
      console.error('Auth middleware error:', error)
      return c.json({ 
        code: 500, 
        message: 'Authentication error',
        data: null 
      }, 500)
    }
  }
}

// CORS 中间件
export function corsMiddleware() {
  return async (c: Context, next: Next): Promise<Response | void> => {
    // 设置 CORS 头
    c.header('Access-Control-Allow-Origin', '*')
    c.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS')
    c.header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    c.header('Access-Control-Max-Age', '86400')

    // 处理预检请求
    if (c.req.method === 'OPTIONS') {
      return new Response('', { status: 204 })
    }

    return await next()
  }
}
