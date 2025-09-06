import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export interface JWTPayload {
  userId: number
  email: string
  iat?: number
  exp?: number
}

export class AuthService {
  private jwtSecret: string

  constructor(jwtSecret: string) {
    this.jwtSecret = jwtSecret
  }

  /**
   * 哈希密码
   */
  async hashPassword(password: string): Promise<string> {
    const saltRounds = 12
    return await bcrypt.hash(password, saltRounds)
  }

  /**
   * 验证密码
   */
  async verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword)
  }

  /**
   * 生成 JWT Token
   */
  generateToken(payload: Omit<JWTPayload, 'iat' | 'exp'>): string {
    return jwt.sign(payload, this.jwtSecret, {
      expiresIn: '7d', // 7天有效期
      issuer: 'qianfu-jicai'
    })
  }

  /**
   * 验证 JWT Token
   */
  verifyToken(token: string): JWTPayload | null {
    try {
      const decoded = jwt.verify(token, this.jwtSecret) as JWTPayload
      return decoded
    } catch (error) {
      console.error('Token verification failed:', error)
      return null
    }
  }

  /**
   * 从 Authorization header 中提取 token
   */
  extractTokenFromHeader(authorization: string | undefined): string | null {
    if (!authorization) return null
    
    const [bearer, token] = authorization.split(' ')
    if (bearer !== 'Bearer' || !token) return null
    
    return token
  }
}
