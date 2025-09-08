# 头像上传功能改造指南

## 功能概述

改造后的头像上传功能支持：

- **电脑端**：选择本地文件（支持拖拽或点击选择）
- **手机端**：从相册选择图片
- **数据库存储**：将图片以 Base64 格式存储在 Neon 数据库中

## 数据库变更

### 1. 执行数据库迁移

在 Neon 数据库中执行 `database_migration.sql` 文件中的 SQL 语句：

```sql
-- 添加头像存储字段
ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "avatarData" TEXT;
ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "avatarMimeType" VARCHAR(50);
ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "avatarSize" INTEGER;

-- 添加注释
COMMENT ON COLUMN "users"."avatarData" IS 'Base64编码的头像数据';
COMMENT ON COLUMN "users"."avatarMimeType" IS '头像MIME类型，如image/jpeg, image/png';
COMMENT ON COLUMN "users"."avatarSize" IS '头像文件大小（字节）';
```

### 2. 更新 Prisma Schema

已更新 `backend/prisma/schema.prisma`，添加了新的字段定义。

## 后端 API 变更

### 新增接口

- `POST /api/me/avatar` - 上传头像
  - 请求体：`{ avatarData: string, mimeType: string, size: number }`
  - 响应：`{ code: 200, message: string, data: { user: User } }`

### 支持的图片格式

- JPEG/JPG
- PNG
- GIF
- WebP

### 文件大小限制

- 最大 5MB

## 前端变更

### 新增依赖

```yaml
dependencies:
  image_picker: ^1.0.7 # 手机端图片选择
  file_picker: ^8.0.0+1 # 电脑端文件选择
```

### 功能特性

1. **平台自适应**：

   - Web 端：使用 `file_picker` 选择本地文件
   - 移动端：使用 `image_picker` 从相册选择

2. **图片处理**：

   - 自动压缩（移动端：512x512，质量 85%）
   - 自动转换为 Base64 格式
   - 自动识别 MIME 类型

3. **用户体验**：
   - 上传时显示加载状态
   - 成功/失败提示
   - 按钮禁用防止重复上传

## 部署步骤

### 1. 数据库迁移

```bash
# 在Neon控制台执行 database_migration.sql
```

### 2. 后端部署

```bash
cd backend
npm run deploy
```

### 3. 前端部署

```bash
cd frontend
flutter pub get
# 然后通过你的CI/CD部署
```

## 使用说明

### 用户操作

1. 进入个人中心页面
2. 点击头像下方的"更换"按钮
3. 选择图片：
   - **电脑**：从文件管理器选择图片文件
   - **手机**：从相册选择图片
4. 等待上传完成，头像会自动更新

### 开发者注意事项

1. 图片数据存储在数据库中，注意数据库大小增长
2. 考虑添加图片缓存机制以提高性能
3. 可以后续添加图片 CDN 存储以优化性能

## 技术实现细节

### 数据流程

1. 用户选择图片 → 2. 前端压缩转换 → 3. Base64 编码 → 4. 发送到后端 → 5. 存储到数据库 → 6. 返回 data URL → 7. 前端显示

### 安全考虑

- 文件类型验证
- 文件大小限制
- Base64 数据验证
- 用户身份验证

### 性能优化

- 图片自动压缩
- 异步上传处理
- 错误重试机制
