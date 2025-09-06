# 仟府集彩部署指南

这是一个完整的部署指南，帮助您将项目从开发环境部署到生产环境。

## 前置要求

### 账号注册

1. **GitHub 账号**: 用于代码仓库托管
2. **Neon 账号**: 用于 PostgreSQL 数据库托管
3. **Cloudflare 账号**: 用于前端和后端部署

### 本地环境

- Node.js 20+
- Flutter 3.10+
- Git

## 部署步骤

### 第一步：数据库设置 (Neon)

1. 登录 [Neon.tech](https://neon.tech)
2. 创建新项目，选择免费计划
3. 创建数据库后，复制连接字符串，格式如下：
   ```
   postgresql://username:password@hostname/database?sslmode=require
   ```
4. 保存此连接字符串，后续配置后端时需要使用

### 第二步：后端部署 (Cloudflare Workers)

1. **安装 Wrangler CLI**

   ```bash
   npm install -g wrangler
   ```

2. **登录 Cloudflare**

   ```bash
   wrangler login
   ```

3. **配置环境变量**

   ```bash
   cd backend

   # 设置数据库连接字符串
   wrangler secret put DATABASE_URL
   # 粘贴您的Neon数据库连接字符串

   # 设置JWT密钥
   wrangler secret put JWT_SECRET
   # 输入一个强密钥，例如：qianfu-jicai-super-secret-jwt-key-2024
   ```

4. **执行数据库迁移**

   ```bash
   # 在本地执行迁移（连接到云端数据库）
   npm run migrate:deploy
   ```

5. **部署后端**

   ```bash
   npm run deploy
   ```

6. **获取后端 URL**
   部署成功后，记录 Worker 的 URL，格式通常为：
   ```
   https://qianfu-jicai-api.your-subdomain.workers.dev
   ```

### 第三步：前端部署 (Cloudflare Pages)

1. **推送代码到 GitHub**

   ```bash
   # 在项目根目录
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **连接 Cloudflare Pages**

   - 登录 [Cloudflare Dashboard](https://dash.cloudflare.com)
   - 进入 `Workers & Pages` 部分
   - 点击 `Create application` → `Pages` → `Connect to Git`
   - 选择您的 GitHub 仓库

3. **配置构建设置**

   - **Framework preset**: `Flutter`
   - **Build command**: `cd frontend && flutter build web`
   - **Build output directory**: `frontend/build/web`
   - **Root directory (advanced)**: 留空

4. **保存并部署**

   - 点击 `Save and Deploy`
   - 等待首次构建完成（通常需要 5-10 分钟）

5. **获取前端 URL**
   部署成功后，您会得到一个类似的 URL：
   ```
   https://qianfu-jicai.pages.dev
   ```

### 第四步：初始化数据 (可选)

为了测试应用，您可以手动向数据库中添加一些测试数据：

1. **连接到 Neon 数据库**

   - 使用 Neon 的在线 SQL 编辑器
   - 或使用本地的 PostgreSQL 客户端

2. **添加测试商品**

   ```sql
   INSERT INTO products (title, description, images, "priceInQiancaiDou", stock, category, "isActive", "createdAt", "updatedAt") VALUES
   ('测试商品1', '这是一个测试商品', '{}', 100, 10, 'electronics', true, NOW(), NOW()),
   ('测试商品2', '这是另一个测试商品', '{}', 200, 5, 'clothing', true, NOW(), NOW()),
   ('测试商品3', '第三个测试商品', '{}', 50, 20, 'food', true, NOW(), NOW());
   ```

3. **添加测试课程**
   ```sql
   INSERT INTO offline_courses (title, description, category, instructor, duration, "isActive", "createdAt", "updatedAt") VALUES
   ('英语口语入门', '适合初学者的英语口语课程', 'ENGLISH_ORAL', '张老师', 90, true, NOW(), NOW()),
   ('AI编程基础', '学习AI编程的基础知识', 'AI_PROGRAMMING', '李老师', 120, true, NOW(), NOW());
   ```

### 第五步：测试部署

1. **访问前端 URL**

   - 打开浏览器，访问您的 Cloudflare Pages URL
   - 测试用户注册功能
   - 新用户会获得 100 仟彩豆的欢迎奖励

2. **测试核心功能**
   - 用户注册/登录
   - 浏览商品
   - 添加到购物车
   - 使用仟彩豆兑换商品
   - 查看订单状态

## 更新部署

### 更新后端

```bash
cd backend
# 如果有数据库模式变更
npm run migrate:deploy
# 部署新版本
npm run deploy
```

### 更新前端

```bash
# 推送代码到GitHub，Cloudflare Pages会自动重新部署
git add .
git commit -m "Update frontend"
git push origin main
```

## 监控和维护

### 日志查看

```bash
# 查看Worker日志
wrangler tail

# 查看特定函数的日志
wrangler tail --format pretty
```

### 数据库备份

建议定期导出 Neon 数据库：

1. 使用 Neon 控制台的导出功能
2. 或使用 `pg_dump` 命令

### 性能监控

- Cloudflare Analytics：监控前端访问情况
- Worker Analytics：监控 API 调用情况
- Neon Metrics：监控数据库性能

## 故障排除

### 常见问题

1. **后端部署失败**

   - 检查环境变量是否正确设置
   - 验证数据库连接字符串
   - 查看 wrangler 输出的错误信息

2. **前端构建失败**

   - 检查 Flutter 版本兼容性
   - 确认 pubspec.yaml 中的依赖版本
   - 查看 Cloudflare Pages 的构建日志

3. **API 调用失败**

   - 检查 CORS 设置
   - 验证 API URL 配置
   - 查看浏览器控制台的网络错误

4. **数据库连接问题**
   - 确认 Neon 数据库状态
   - 检查连接字符串格式
   - 验证 SSL 设置

### 获取帮助

- Cloudflare Workers 文档：https://developers.cloudflare.com/workers/
- Neon 文档：https://neon.tech/docs
- Flutter Web 部署：https://docs.flutter.dev/deployment/web

## 成本预估

### 免费额度阶段

- **Neon**: 免费计划包含 0.5GB 存储和 1 个数据库
- **Cloudflare Workers**: 免费计划包含 100,000 请求/天
- **Cloudflare Pages**: 免费计划包含无限静态请求
- **总成本**: $0/月

### 扩展阶段

当超出免费额度时：

- **Neon Pro**: $19/月（更多存储和计算资源）
- **Cloudflare Workers Paid**: $5/月（1000 万请求）
- **预估总成本**: $25-30/月（支持较大规模使用）

这个成本比传统的服务器部署方案要低得多，同时提供了更好的可扩展性和全球性能。
