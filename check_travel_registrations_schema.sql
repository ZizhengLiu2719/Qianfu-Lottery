-- 检查 travel_registrations 表的实际字段名
\d travel_registrations;

-- 查看所有字段
SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns 
WHERE table_name = 'travel_registrations' 
ORDER BY ordinal_position;
