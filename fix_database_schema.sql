-- 修复数据库表结构，移除不需要的字段
-- 1. 移除 travel_packages 表中的 price_in_qiancai_dou 字段
ALTER TABLE travel_packages DROP COLUMN IF EXISTS price_in_qiancai_dou;

-- 2. 检查并修复 travel_registrations 表的字段名
-- 数据库中使用的是 registered_at, cancelled_at, completed_at
-- 但 Prisma schema 中使用的是 createdAt, updatedAt
-- 我们需要添加正确的字段名

-- 添加 createdAt 和 updatedAt 字段（如果不存在）
ALTER TABLE travel_registrations ADD COLUMN IF NOT EXISTS created_at TIMESTAMP DEFAULT NOW();
ALTER TABLE travel_registrations ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP DEFAULT NOW();

-- 3. 验证表结构
\d travel_packages;
\d travel_registrations;

-- 4. 插入一些测试数据
INSERT INTO travel_packages (title, description, category, subcategory, duration_days, max_participants, location, tags) VALUES
('西湖一日游攻略', '早上断桥、下午灵隐、傍晚苏堤看日落', 'DOMESTIC', '文化体验', 1, 20, '杭州', ARRAY['文化', '历史', '风景']),
('成都·火锅+大熊猫', '必吃推荐与最佳参观时段', 'DOMESTIC', '美食文化', 2, 15, '成都', ARRAY['美食', '大熊猫', '文化']),
('三亚海边拍照点合集', '椰林沙滩、礁石海湾、最佳光线时间', 'DOMESTIC', '自然风光', 3, 25, '三亚', ARRAY['海滩', '摄影', '度假']),
('日本樱花季深度游', '东京、京都、大阪7日赏樱之旅', 'INTERNATIONAL', '自然风光', 7, 12, '日本', ARRAY['樱花', '文化', '自然']),
('欧洲文化探索之旅', '巴黎、罗马、巴塞罗那艺术文化深度体验', 'INTERNATIONAL', '文化体验', 10, 8, '欧洲', ARRAY['艺术', '文化', '历史']),
('东南亚海岛度假', '普吉岛、巴厘岛、马尔代夫海岛休闲游', 'INTERNATIONAL', '休闲度假', 5, 20, '东南亚', ARRAY['海岛', '度假', '休闲'])
ON CONFLICT (id) DO NOTHING;
