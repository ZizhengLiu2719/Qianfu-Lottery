import { PrismaClient } from '@prisma/client'

export type TransactionReason = 
  | 'ADMIN_ADJUSTMENT'      // 管理员调整
  | 'PRODUCT_REDEMPTION'    // 商品兑换
  | 'APPOINTMENT_FEE'       // 预约费用
  | 'TASK_REWARD'           // 任务奖励
  | 'REFUND'                // 退款

export interface QiancaiDouTransaction {
  userId: number
  amount: number
  reason: TransactionReason
  description?: string
  refTable?: string
  refId?: string
}

export class QiancaiDouService {
  constructor(private prisma: PrismaClient) {}

  /**
   * 获取用户仟彩豆余额
   */
  async getBalance(userId: number): Promise<number> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { qiancaiDouBalance: true }
    })
    
    return user?.qiancaiDouBalance ?? 0
  }

  /**
   * 增加仟彩豆
   */
  async creditQiancaiDou(transaction: QiancaiDouTransaction): Promise<number> {
    if (transaction.amount <= 0) {
      throw new Error('Credit amount must be positive')
    }

    return await this.prisma.$transaction(async (tx) => {
      // 获取当前余额
      const user = await tx.user.findUnique({
        where: { id: transaction.userId },
        select: { qiancaiDouBalance: true }
      })

      if (!user) {
        throw new Error('User not found')
      }

      const newBalance = user.qiancaiDouBalance + transaction.amount

      // 更新用户余额
      await tx.user.update({
        where: { id: transaction.userId },
        data: { qiancaiDouBalance: newBalance }
      })

      // 记录交易
      await tx.qiancaiDouTransaction.create({
        data: {
          userId: transaction.userId,
          amount: transaction.amount,
          newBalance,
          reason: transaction.reason,
          description: transaction.description,
          refTable: transaction.refTable,
          refId: transaction.refId
        }
      })

      return newBalance
    })
  }

  /**
   * 扣除仟彩豆
   */
  async debitQiancaiDou(transaction: QiancaiDouTransaction): Promise<number> {
    if (transaction.amount <= 0) {
      throw new Error('Debit amount must be positive')
    }

    return await this.prisma.$transaction(async (tx) => {
      // 获取当前余额并锁定行
      const user = await tx.user.findUnique({
        where: { id: transaction.userId },
        select: { qiancaiDouBalance: true }
      })

      if (!user) {
        throw new Error('User not found')
      }

      const newBalance = user.qiancaiDouBalance - transaction.amount

      if (newBalance < 0) {
        throw new Error('Insufficient QiancaiDou balance')
      }

      // 更新用户余额
      await tx.user.update({
        where: { id: transaction.userId },
        data: { qiancaiDouBalance: newBalance }
      })

      // 记录交易（以负数记录）
      await tx.qiancaiDouTransaction.create({
        data: {
          userId: transaction.userId,
          amount: -transaction.amount,
          newBalance,
          reason: transaction.reason,
          description: transaction.description,
          refTable: transaction.refTable,
          refId: transaction.refId
        }
      })

      return newBalance
    })
  }

  /**
   * 获取用户交易历史
   */
  async getTransactionHistory(
    userId: number, 
    page: number = 1, 
    limit: number = 20
  ) {
    const offset = (page - 1) * limit

    const [transactions, total] = await Promise.all([
      this.prisma.qiancaiDouTransaction.findMany({
        where: { userId },
        orderBy: { createdAt: 'desc' },
        skip: offset,
        take: limit
      }),
      this.prisma.qiancaiDouTransaction.count({
        where: { userId }
      })
    ])

    return {
      transactions,
      total,
      page,
      totalPages: Math.ceil(total / limit)
    }
  }

  /**
   * 管理员调整用户余额
   */
  async adminAdjustBalance(
    userId: number,
    newBalance: number,
    description: string = 'Admin adjustment'
  ): Promise<number> {
    const currentBalance = await this.getBalance(userId)
    const amount = newBalance - currentBalance

    if (amount === 0) {
      return currentBalance
    }

    if (amount > 0) {
      return await this.creditQiancaiDou({
        userId,
        amount,
        reason: 'ADMIN_ADJUSTMENT',
        description
      })
    } else {
      return await this.debitQiancaiDou({
        userId,
        amount: Math.abs(amount),
        reason: 'ADMIN_ADJUSTMENT',
        description
      })
    }
  }
}
