import { Context } from 'hono'
import { getPrismaClient } from '../services/db'
import { QiancaiDouService } from '../services/qiancaidou'

export function createAccountHandlers(qiancaiDouService: QiancaiDouService) {
  const getAccount = async (c: Context) => {
    const databaseUrl = c.env?.DATABASE_URL as string
    const prisma = getPrismaClient(databaseUrl)
    const currentUser = c.get('user')

    const [user, account] = await Promise.all([
      prisma.user.findUnique({ where: { id: currentUser.id } }),
      (prisma as any).account.findUnique({ where: { userId: currentUser.id } })
    ])

    return c.json({
      code: 200,
      message: 'Account fetched',
      data: {
        balance: user?.qiancaiDouBalance ?? 0,
        account: account ?? null
      }
    })
  }

  // 开发/模拟用途：给当前用户加豆
  const grantQiancaiDou = async (c: Context) => {
    const currentUser = c.get('user')
    const body = await c.req.json<{ amount: number; description?: string }>()
    const amount = Math.max(0, Math.floor(body.amount || 0))
    const newBalance = await qiancaiDouService.creditQiancaiDou({
      userId: currentUser.id,
      amount,
      reason: 'ADMIN_ADJUSTMENT',
      description: body.description ?? 'Dev grant'
    })
    return c.json({ code: 200, message: 'Granted', data: { balance: newBalance } })
  }

  return { getAccount, grantQiancaiDou }
}


