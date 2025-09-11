# 千府集彩 (Qianfu Jicai)

一个现代化的积分商城与预约平台，采用 Flutter + Hono + Prisma + Cloudflare 技术栈。

## 功能特色

- 🎯 **生活彩**: 使用千彩豆兑换商品的积分商城
- 📚 **学习彩**: 线下课程预约系统 (英语口语、AI 编程)
- 🗺️ **旅游彩**: 国内外旅游内容与攻略
- 🎮 **娱乐彩**: 娱乐模块 (待开发)
- 👤 **个人中心**: 用户资料、千彩豆余额、订单管理

## 技术栈

### 前端

- **Flutter**: 跨平台应用 (Web/iOS/Android)
- **Riverpod**: 状态管理
- **GoRouter**: 路由管理
- **Dio**: HTTP 客户端
- **国际化**: 中英双语支持

### 后端

- **Hono**: 轻量级 Web 框架
- **Prisma**: 数据库 ORM
- **Neon**: Serverless PostgreSQL
- **Cloudflare Workers**: 全球边缘计算

### 部署

- **Cloudflare Pages**: 前端托管
- **Cloudflare Workers**: 后端 API
- **GitHub**: 代码仓库与自动部署

## 快速开始

### 前置要求

- Node.js 20+
- Flutter 3.10+
- Neon 数据库账号
- Cloudflare 账号

### 本地开发

1. **克隆项目**

```bash
git clone <your-repo-url>
cd qianfu-jicai
```

2. **配置后端**

```bash
cd backend
npm install
cp .env.example .env
# 编辑 .env 文件，填入您的数据库连接字符串
npm run migrate:dev
npm run dev
```

3. **启动前端**

```bash
cd frontend
flutter pub get
flutter run -d chrome
```

### 部署

1. **部署后端到 Cloudflare Workers**

```bash
cd backend
wrangler deploy
```

2. **部署前端到 Cloudflare Pages**

- 将代码推送到 GitHub
- 在 Cloudflare Pages 中连接仓库并配置自动部署

## 项目结构

```
qianfu-jicai/
├── backend/          # 后端 API (Hono + Prisma)
├── frontend/         # 前端应用 (Flutter)
└── README.md
```

## 开发团队

由 AI 助手协助开发，为现代 Web 应用提供最佳实践示例。

## 许可证

MIT License
