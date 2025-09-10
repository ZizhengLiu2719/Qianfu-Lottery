-- 修复旅游彩数据库问题
-- 1. 创建 travel_packages 表
CREATE TABLE IF NOT EXISTS travel_packages (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  category VARCHAR(50) NOT NULL,
  subcategory VARCHAR(100),
  duration_days INTEGER,
  max_participants INTEGER DEFAULT 20,
  current_participants INTEGER DEFAULT 0,
  start_date DATE,
  end_date DATE,
  location VARCHAR(255),
  image_url VARCHAR(500),
  images TEXT[] DEFAULT '{}',
  tags TEXT[] DEFAULT '{}',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- 2. 创建 travel_registrations 表
CREATE TABLE IF NOT EXISTS travel_registrations (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  package_id INTEGER NOT NULL REFERENCES travel_packages(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  subtitle VARCHAR(255),
  category VARCHAR(50) NOT NULL,
  status VARCHAR(20) DEFAULT 'REGISTERED',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id, package_id)
);

-- 3. 更新 travel_posts 表（如果存在）
ALTER TABLE travel_posts ADD COLUMN IF NOT EXISTS subcategory VARCHAR(100);
ALTER TABLE travel_posts ADD COLUMN IF NOT EXISTS package_id INTEGER REFERENCES travel_packages(id);

-- 4. 插入示例旅游套餐数据
INSERT INTO travel_packages (title, description, category, subcategory, duration_days, max_participants, location, tags) VALUES
-- 国内旅游
('西湖一日游攻略', '早上断桥、下午灵隐、傍晚苏堤看日落', 'DOMESTIC', '文化体验', 1, 20, '杭州', ARRAY['文化', '历史', '风景']),
('成都·火锅+大熊猫', '必吃推荐与最佳参观时段', 'DOMESTIC', '美食文化', 2, 15, '成都', ARRAY['美食', '大熊猫', '文化']),
('三亚海边拍照点合集', '椰林沙滩、礁石海湾、最佳光线时间', 'DOMESTIC', '自然风光', 3, 25, '三亚', ARRAY['海滩', '摄影', '度假']),

-- 国外旅游
('日本樱花季深度游', '东京、京都、大阪7日赏樱之旅', 'INTERNATIONAL', '自然风光', 7, 12, '日本', ARRAY['樱花', '文化', '自然']),
('欧洲文化探索之旅', '巴黎、罗马、巴塞罗那艺术文化深度体验', 'INTERNATIONAL', '文化体验', 10, 8, '欧洲', ARRAY['艺术', '文化', '历史']),
('东南亚海岛度假', '普吉岛、巴厘岛、马尔代夫海岛休闲游', 'INTERNATIONAL', '休闲度假', 5, 20, '东南亚', ARRAY['海岛', '度假', '休闲']);

-- 5. 创建索引
CREATE INDEX IF NOT EXISTS idx_travel_packages_category ON travel_packages(category);
CREATE INDEX IF NOT EXISTS idx_travel_packages_subcategory ON travel_packages(subcategory);
CREATE INDEX IF NOT EXISTS idx_travel_packages_is_active ON travel_packages(is_active);
CREATE INDEX IF NOT EXISTS idx_travel_registrations_user_id ON travel_registrations(user_id);
CREATE INDEX IF NOT EXISTS idx_travel_registrations_package_id ON travel_registrations(package_id);
CREATE INDEX IF NOT EXISTS idx_travel_registrations_status ON travel_registrations(status);

-- 6. 验证表创建
SELECT 'travel_packages' as table_name, count(*) as row_count FROM travel_packages
UNION ALL
SELECT 'travel_registrations' as table_name, count(*) as row_count FROM travel_registrations;
