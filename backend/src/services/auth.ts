import { SignJWT, jwtVerify, type JWTPayload as JoseJWTPayload } from 'jose'

export interface JWTPayload extends JoseJWTPayload {
  userId: number
  email: string
}

/**
 * Converts a hex string to a Uint8Array.
 */
function hexToU8a(hex: string): Uint8Array {
  return new Uint8Array(hex.match(/.{1,2}/g)!.map((byte) => parseInt(byte, 16)))
}

/**
 * Converts a Uint8Array to a hex string.
 */
function u8aToHex(bytes: Uint8Array): string {
  return bytes.reduce((str, byte) => str + byte.toString(16).padStart(2, '0'), '')
}

export class AuthService {
  private jwtSecret: Uint8Array

  constructor(jwtSecret: string) {
    // IMPORTANT: The secret key must be securely generated and managed.
    // For HS256, it's recommended to have a secret of at least 32 bytes.
    // We'll use a TextEncoder to convert the string secret to a Uint8Array.
    this.jwtSecret = new TextEncoder().encode(jwtSecret)
  }

  /**
   * Hashes a password using the Web Crypto API (PBKDF2).
   * @returns A string containing salt and hash, separated by a colon.
   */
  async hashPassword(password: string): Promise<string> {
    const salt = crypto.getRandomValues(new Uint8Array(16))
    const importedKey = await crypto.subtle.importKey(
      'raw',
      new TextEncoder().encode(password),
      { name: 'PBKDF2' },
      false,
      ['deriveBits']
    )
    
    const hashBuffer = await crypto.subtle.deriveBits(
      {
        name: 'PBKDF2',
        salt: salt,
        iterations: 100000,
        hash: 'SHA-256',
      },
      importedKey,
      256
    )

    const hash = new Uint8Array(hashBuffer)
    return `${u8aToHex(salt)}:${u8aToHex(hash)}`
  }

  /**
   * Verifies a password against a stored salted hash.
   */
  async verifyPassword(password: string, storedHash: string): Promise<boolean> {
    const [saltHex, hashHex] = storedHash.split(':')
    if (!saltHex || !hashHex) {
      return false
    }

    const salt = hexToU8a(saltHex)
    const storedHashBytes = hexToU8a(hashHex)
    
    const importedKey = await crypto.subtle.importKey(
      'raw',
      new TextEncoder().encode(password),
      { name: 'PBKDF2' },
      false,
      ['deriveBits']
    )
    
    const derivedBuffer = await crypto.subtle.deriveBits(
      {
        name: 'PBKDF2',
        salt: salt as BufferSource,
        iterations: 100000,
        hash: 'SHA-256',
      },
      importedKey,
      256
    )

    const derivedBytes = new Uint8Array(derivedBuffer)
    
    // Constant-time comparison to prevent timing attacks
    if (storedHashBytes.length !== derivedBytes.length) return false
    let diff = 0
    for (let i = 0; i < storedHashBytes.length; i++) {
      diff |= storedHashBytes[i] ^ derivedBytes[i]
    }
    return diff === 0
  }

  /**
   * Generates a JWT Token using 'jose'.
   */
  async generateToken(payload: Omit<JWTPayload, 'iat' | 'exp' | 'iss'>): Promise<string> {
    return await new SignJWT(payload)
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuer('qianfu-jicai')
      .setIssuedAt()
      .setExpirationTime('7d')
      .sign(this.jwtSecret)
  }

  /**
   * Verifies a JWT Token using 'jose'.
   */
  async verifyToken(token: string): Promise<JWTPayload | null> {
    try {
      const { payload } = await jwtVerify(token, this.jwtSecret, {
        issuer: 'qianfu-jicai'
      })
      return payload as JWTPayload
    } catch (error) {
      console.error('Token verification failed:', error)
      return null
    }
  }

  /**
   * Extracts token from an "Authorization: Bearer <token>" header.
   */
  extractTokenFromHeader(authorization: string | undefined): string | null {
    if (!authorization) return null
    
    const [bearer, token] = authorization.split(' ')
    if (bearer !== 'Bearer' || !token) return null
    
    return token
  }
}
