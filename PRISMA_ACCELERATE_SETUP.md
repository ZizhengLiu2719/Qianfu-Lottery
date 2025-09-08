# 🚀 Prisma Accelerate 设置指南

## 🎯 **问题分析**

根据后端日志，错误信息明确指出：

```
PrismaClient failed to initialize because it wasn't configured to run in this environment (Cloudflare Workers).
In order to run Prisma Client in an edge runtime, you will need to configure one of the following options:
- Enable Driver Adapters: https://pris.ly/d/driver-adapters
- Enable Accelerate: https://pris.ly/d/accelerate
```

**Prisma Accelerate** 是 Prisma 推荐的在 Cloudflare Workers 等边缘运行时环境中运行数据库查询的解决方案。

## 📋 **设置步骤**

### 1. **登录 Prisma Data Platform**

- 访问：https://console.prisma.io/
- 使用您的账户登录或注册

### 2. **创建 Accelerate 项目**

- 创建新项目或选择现有项目
- 选择 "Enable Accelerate"
- 提供您的 Neon 数据库连接字符串

### 3. **获取 Accelerate 连接字符串**

- 系统将生成一个新的 Accelerate 连接字符串
- 格式类似：`prisma://accelerate.prisma-data.net/?api_key=YOUR_API_KEY`

### 4. **更新环境变量**

在 Cloudflare Workers 中设置以下环境变量：

```bash
# Accelerate 连接字符串（用于应用运行时）
DATABASE_URL="prisma://accelerate.prisma-data.net/?api_key=YOUR_API_KEY"

# 直接数据库连接（用于迁移和内省）
DIRECT_DATABASE_URL="postgresql://username:password@host.com:5432/database?sslmode=require"
```

### 5. **更新 Prisma Schema**

更新 `backend/prisma/schema.prisma`：

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider  = "postgresql"
  url       = env("DATABASE_URL")
  directUrl = env("DIRECT_DATABASE_URL")
}
```

### 6. **简化数据库客户端代码**

更新 `backend/src/services/db.ts`：

```typescript
import { PrismaClient } from "@prisma/client";

// 简化的 Prisma 客户端创建
export function createPrismaClient(): PrismaClient {
  return new PrismaClient({
    log: ["error"],
    errorFormat: "minimal",
  });
}

// 运行数据库操作
export async function runWithPrisma<T>(
  runner: (client: PrismaClient) => Promise<T>
): Promise<T> {
  const client = createPrismaClient();

  try {
    const result = await runner(client);
    return result;
  } finally {
    await client.$disconnect();
  }
}
```

## 🔧 **立即实施**

由于目前无法访问 Prisma Dashboard，让我创建一个临时的直接连接解决方案...

## ✅ **优势**

- ✅ **连接池管理** - Accelerate 自动管理连接
- ✅ **边缘优化** - 专为无服务器环境设计
- ✅ **全球缓存** - 提高查询性能
- ✅ **自动扩展** - 无需手动配置连接限制

## 🔄 **下一步**

1. 设置 Prisma Accelerate 账户
2. 获取 API 密钥
3. 更新环境变量
4. 重新部署后端

这将彻底解决 Cloudflare Workers 中的 Prisma 兼容性问题！
