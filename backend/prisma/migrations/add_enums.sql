-- 添加缺失的枚举类型

-- 创建OrderStatus枚举
CREATE TYPE "OrderStatus" AS ENUM ('PENDING', 'PAID', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED', 'REFUNDED');

-- 创建PayMethod枚举
CREATE TYPE "PayMethod" AS ENUM ('QIANCAIDOU', 'CREDIT_CARD', 'BANK_TRANSFER');

-- 创建InventoryLockStatus枚举
CREATE TYPE "InventoryLockStatus" AS ENUM ('LOCKED', 'RELEASED', 'CONSUMED');

-- 创建ShipmentStatus枚举
CREATE TYPE "ShipmentStatus" AS ENUM ('PENDING', 'SHIPPED', 'IN_TRANSIT', 'DELIVERED', 'FAILED');

-- 创建QiancaiDouTransactionType枚举
CREATE TYPE "QiancaiDouTransactionType" AS ENUM ('ADMIN_ADJUSTMENT', 'PRODUCT_REDEMPTION', 'APPOINTMENT_FEE', 'TASK_REWARD', 'REFUND');

-- 创建TransactionDirection枚举
CREATE TYPE "TransactionDirection" AS ENUM ('IN', 'OUT');

-- 更新orders表的status列类型
ALTER TABLE "orders" ALTER COLUMN "status" TYPE "OrderStatus" USING "status"::"OrderStatus";

-- 更新orders表的payMethod列类型
ALTER TABLE "orders" ALTER COLUMN "payMethod" TYPE "PayMethod" USING "payMethod"::"PayMethod";

-- 更新qiancaidou_transactions表的reason列类型
ALTER TABLE "qiancaidou_transactions" ALTER COLUMN "reason" TYPE "QiancaiDouTransactionType" USING "reason"::"QiancaiDouTransactionType";
