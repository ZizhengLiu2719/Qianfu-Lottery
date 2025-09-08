-- 头像存储功能数据库迁移脚本
-- 在Neon数据库中执行以下SQL语句

-- 1. 添加头像存储相关字段到users表
ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "avatarData" TEXT;
ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "avatarMimeType" VARCHAR(50);
ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "avatarSize" INTEGER;

-- 2. 添加字段注释
COMMENT ON COLUMN "users"."avatarData" IS 'Base64编码的头像数据';
COMMENT ON COLUMN "users"."avatarMimeType" IS '头像MIME类型，如image/jpeg, image/png';
COMMENT ON COLUMN "users"."avatarSize" IS '头像文件大小（字节）';

-- 3. 创建索引以提高查询性能（可选）
CREATE INDEX IF NOT EXISTS "idx_users_avatar_data" ON "users"("avatarData") WHERE "avatarData" IS NOT NULL;

-- 4. 验证表结构
SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns 
WHERE table_name = 'users' 
AND column_name IN ('avatarData', 'avatarMimeType', 'avatarSize')
ORDER BY ordinal_position;
