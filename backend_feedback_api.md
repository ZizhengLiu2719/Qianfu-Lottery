# 反馈功能后端 API 实现建议

## 1. 创建反馈处理器 (feedback.handler.ts)

```typescript
import { Hono } from "hono";
import { PrismaClient } from "@prisma/client";
import { authMiddleware } from "../middleware/auth.middleware";

export function createFeedbackHandlers(prisma: PrismaClient) {
  const app = new Hono();

  // 创建反馈
  app.post("/", authMiddleware, async (c) => {
    try {
      const currentUser = c.get("user");
      const body = await c.req.json();

      const feedback = await prisma.feedback.create({
        data: {
          userId: currentUser.id,
          title: body.title,
          content: body.content,
          category: body.category || "general",
          priority: body.priority || "medium",
        },
      });

      return c.json({
        code: 200,
        message: "反馈创建成功",
        data: feedback,
      });
    } catch (error) {
      console.error("创建反馈失败:", error);
      return c.json(
        {
          code: 500,
          message: "创建反馈失败",
        },
        500
      );
    }
  });

  // 获取用户反馈列表
  app.get("/", authMiddleware, async (c) => {
    try {
      const currentUser = c.get("user");
      const page = parseInt(c.req.query("page") || "1");
      const limit = parseInt(c.req.query("limit") || "20");
      const skip = (page - 1) * limit;

      const [feedbacks, total] = await Promise.all([
        prisma.feedback.findMany({
          where: { userId: currentUser.id },
          orderBy: { createdAt: "desc" },
          skip,
          take: limit,
        }),
        prisma.feedback.count({
          where: { userId: currentUser.id },
        }),
      ]);

      return c.json({
        code: 200,
        message: "获取反馈列表成功",
        data: feedbacks,
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit),
        },
      });
    } catch (error) {
      console.error("获取反馈列表失败:", error);
      return c.json(
        {
          code: 500,
          message: "获取反馈列表失败",
        },
        500
      );
    }
  });

  // 获取单个反馈详情
  app.get("/:id", authMiddleware, async (c) => {
    try {
      const currentUser = c.get("user");
      const feedbackId = parseInt(c.req.param("id"));

      const feedback = await prisma.feedback.findFirst({
        where: {
          id: feedbackId,
          userId: currentUser.id,
        },
      });

      if (!feedback) {
        return c.json(
          {
            code: 404,
            message: "反馈不存在",
          },
          404
        );
      }

      return c.json({
        code: 200,
        message: "获取反馈详情成功",
        data: feedback,
      });
    } catch (error) {
      console.error("获取反馈详情失败:", error);
      return c.json(
        {
          code: 500,
          message: "获取反馈详情失败",
        },
        500
      );
    }
  });

  // 更新反馈
  app.put("/:id", authMiddleware, async (c) => {
    try {
      const currentUser = c.get("user");
      const feedbackId = parseInt(c.req.param("id"));
      const body = await c.req.json();

      // 检查反馈是否存在且属于当前用户
      const existingFeedback = await prisma.feedback.findFirst({
        where: {
          id: feedbackId,
          userId: currentUser.id,
        },
      });

      if (!existingFeedback) {
        return c.json(
          {
            code: 404,
            message: "反馈不存在",
          },
          404
        );
      }

      // 只有待处理状态的反馈才能修改
      if (existingFeedback.status !== "pending") {
        return c.json(
          {
            code: 400,
            message: "只有待处理状态的反馈才能修改",
          },
          400
        );
      }

      const feedback = await prisma.feedback.update({
        where: { id: feedbackId },
        data: {
          title: body.title,
          content: body.content,
          category: body.category,
          priority: body.priority,
          updatedAt: new Date(),
        },
      });

      return c.json({
        code: 200,
        message: "反馈更新成功",
        data: feedback,
      });
    } catch (error) {
      console.error("更新反馈失败:", error);
      return c.json(
        {
          code: 500,
          message: "更新反馈失败",
        },
        500
      );
    }
  });

  // 删除反馈
  app.delete("/:id", authMiddleware, async (c) => {
    try {
      const currentUser = c.get("user");
      const feedbackId = parseInt(c.req.param("id"));

      // 检查反馈是否存在且属于当前用户
      const existingFeedback = await prisma.feedback.findFirst({
        where: {
          id: feedbackId,
          userId: currentUser.id,
        },
      });

      if (!existingFeedback) {
        return c.json(
          {
            code: 404,
            message: "反馈不存在",
          },
          404
        );
      }

      // 只有待处理状态的反馈才能删除
      if (existingFeedback.status !== "pending") {
        return c.json(
          {
            code: 400,
            message: "只有待处理状态的反馈才能删除",
          },
          400
        );
      }

      await prisma.feedback.delete({
        where: { id: feedbackId },
      });

      return c.json({
        code: 200,
        message: "反馈删除成功",
      });
    } catch (error) {
      console.error("删除反馈失败:", error);
      return c.json(
        {
          code: 500,
          message: "删除反馈失败",
        },
        500
      );
    }
  });

  return app;
}
```

## 2. 在主应用中注册反馈路由

在 `src/app.ts` 中添加：

```typescript
// 反馈相关路由
app.route("/api/feedback", createFeedbackHandlers(prisma));
```

## 3. 更新 Prisma Schema

在 `prisma/schema.prisma` 中添加反馈模型：

```prisma
// 平台反馈
model Feedback {
  id              Int      @id @default(autoincrement())
  userId          Int
  user            User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  title           String
  content         String
  category        String   @default("general") // general, bug, feature, suggestion, complaint
  status          String   @default("pending") // pending, in_progress, resolved, closed
  priority        String   @default("medium")  // low, medium, high, urgent
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
  adminReply      String?
  adminRepliedAt  DateTime?

  @@map("feedback")
}
```

并在 User 模型中添加关联：

```prisma
model User {
  // ... 其他字段
  feedbacks       Feedback[]
  // ... 其他字段
}
```

## 4. 运行数据库迁移

```bash
npx prisma db push
```

或者生成迁移文件：

```bash
npx prisma migrate dev --name add_feedback_table
```
