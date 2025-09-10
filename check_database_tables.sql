-- 检查数据库表结构
-- 1. 检查是否存在 travel_packages 表
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name IN ('travel_packages', 'travel_registrations');

-- 2. 如果表存在，检查表结构
\d travel_packages;
\d travel_registrations;

-- 3. 检查所有表
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
ORDER BY table_name;
