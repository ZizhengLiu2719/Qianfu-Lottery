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
  return async (c: Context, next: Next) => {
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

      await next()
      return
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
  return async (c: Context, next: Next) => {
    // 允许的来源（按需添加你的前端域名）
    const allowedOrigins = new Set<string>([
      'https://qianfu-lottery.pages.dev',
      'http://localhost:5173',
      'http://localhost:3000',
      'http://localhost:8080',
      'http://localhost:8787'
    ])

    const requestOrigin = c.req.header('Origin') || ''
    const allowOrigin = allowedOrigins.has(requestOrigin) ? requestOrigin : '*'

    // 设置 CORS 头
    c.header('Access-Control-Allow-Origin', allowOrigin)
    c.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS')
    c.header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    c.header('Access-Control-Max-Age', '86400')
    c.header('Vary', 'Origin')

    // 处理预检请求：必须携带CORS响应头
    if (c.req.method === 'OPTIONS') {
      return new Response('', {
        status: 204,
        headers: {
          'Access-Control-Allow-Origin': allowOrigin,
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
          'Access-Control-Max-Age': '86400'
        }
      })
    }

    await next()
    return
  }
}
