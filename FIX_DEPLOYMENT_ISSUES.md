# 仟府集彩部署问题修复指南

## 问题诊断

经过深入分析，发现了以下问题：

### 1. CORS 配置 ✅ 正常

- CORS 中间件配置正确
- 健康检查端点 `/api/health` 工作正常
- 返回正确的 CORS 头

### 2. 500 内部服务器错误 ❌ 需要修复

- 诊断端点 `/api/diag` 返回 500 错误
- 产品端点 `/api/products` 虽然返回 200，但数据库连接可能有问题
- 根本原因：Cloudflare Workers 中缺少环境变量

## 修复步骤

### 步骤 1：设置 Cloudflare Workers 环境变量

你需要在 Cloudflare Dashboard 中设置以下环境变量：

1. **登录 Cloudflare Dashboard**

   - 访问 https://dash.cloudflare.com
   - 进入 `Workers & Pages` 部分
   - 找到你的 Worker：`qianfu-lottery-api`

2. **设置环境变量**

   - 点击进入 Worker 详情页
   - 进入 `Settings` → `Variables`
   - 添加以下环境变量：

   ```
   DATABASE_URL = postgresql://username:password@hostname/database?sslmode=require
   JWT_SECRET = your-super-secret-jwt-key-here
   ```

### 步骤 2：获取数据库连接字符串

如果你还没有 Neon 数据库：

1. **注册 Neon 账号**

   - 访问 https://neon.tech
   - 创建免费账号

2. **创建数据库**
   - 创建新项目
   - 复制连接字符串（格式类似）：
   ```
   postgresql://username:password@ep-xxx.us-east-1.aws.neon.tech/neondb?sslmode=require
   ```

### 步骤 3：生成 JWT 密钥

使用以下命令生成一个安全的 JWT 密钥：

```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

### 步骤 4：执行数据库迁移

在设置环境变量后，需要执行数据库迁移：

```bash
cd backend
npm run migrate:deploy
```

### 步骤 5：重新部署 Worker

```bash
cd backend
npm run deploy
```

## 验证修复

修复完成后，测试以下端点：

1. **健康检查**：

   ```bash
   curl https://qianfu-lottery-api.michaelliu2719.workers.dev/api/health
   ```

2. **诊断端点**：

   ```bash
   curl https://qianfu-lottery-api.michaelliu2719.workers.dev/api/diag
   ```

3. **产品端点**：
   ```bash
   curl https://qianfu-lottery-api.michaelliu2719.workers.dev/api/products
   ```

## 预期结果

修复后，你应该看到：

- 所有 API 端点返回 200 状态码
- 诊断端点显示数据库连接正常
- 前端应用可以正常加载商品数据
- CORS 错误消失

## 如果问题仍然存在

如果按照上述步骤操作后问题仍然存在，请检查：

1. **数据库连接字符串格式**是否正确
2. **JWT 密钥**是否足够复杂
3. **Worker 是否成功重新部署**
4. **Cloudflare 缓存**是否需要清除

## 快速修复脚本

你也可以使用以下命令快速设置环境变量（需要先安装 wrangler）：

```bash
cd backend

# 设置数据库 URL
npx wrangler secret put DATABASE_URL

# 设置 JWT 密钥
npx wrangler secret put JWT_SECRET

# 重新部署
npm run deploy
```

## 联系支持

如果问题仍然无法解决，请提供：

1. Cloudflare Worker 的日志
2. 数据库连接测试结果
3. 具体的错误信息
