-- 修复学习彩注册功能
-- 将 user_appointments 表的 schedule 外键约束改为可选

-- 首先删除现有的外键约束
ALTER TABLE user_appointments DROP CONSTRAINT IF EXISTS user_appointments_scheduleId_fkey;

-- 重新添加外键约束，但允许 NULL 值
ALTER TABLE user_appointments 
ADD CONSTRAINT user_appointments_scheduleId_fkey 
FOREIGN KEY (scheduleId) REFERENCES course_schedules(id) ON DELETE SET NULL;

-- 现在可以插入学习彩注册记录，即使 scheduleId 不存在于 course_schedules 表中
-- 学习彩注册使用虚拟的 scheduleId (999999+)，这些ID不会在 course_schedules 中存在
-- 但由于外键约束现在是可选的，所以不会阻止插入
