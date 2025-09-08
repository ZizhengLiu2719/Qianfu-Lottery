-- 添加头像存储相关字段
-- 为User表添加头像数据存储字段

ALTER TABLE "users" ADD COLUMN "avatarData" TEXT;
ALTER TABLE "users" ADD COLUMN "avatarMimeType" VARCHAR(50);
ALTER TABLE "users" ADD COLUMN "avatarSize" INTEGER;

-- 添加注释
COMMENT ON COLUMN "users"."avatarData" IS 'Base64编码的头像数据';
COMMENT ON COLUMN "users"."avatarMimeType" IS '头像MIME类型，如image/jpeg, image/png';
COMMENT ON COLUMN "users"."avatarSize" IS '头像文件大小（字节）';
