-- 学习彩功能数据库更新SQL代码
-- 用于Neon数据库

-- 1. 更新现有表结构
-- 更新offline_courses表，添加新的分类
UPDATE offline_courses 
SET category = 'AI编程学习' 
WHERE category = 'AI_PROGRAMMING' OR category = 'AI编程';

UPDATE offline_courses 
SET category = '英语学习' 
WHERE category = 'ENGLISH_ORAL' OR category = '英语';

-- 更新user_appointments表，修改状态默认值
ALTER TABLE user_appointments 
ALTER COLUMN status SET DEFAULT 'REGISTERED';

-- 2. 创建留学咨询服务表
CREATE TABLE IF NOT EXISTS study_abroad_services (
    id SERIAL PRIMARY KEY,
    service_name VARCHAR(255) NOT NULL,
    description TEXT,
    service_type VARCHAR(50) NOT NULL, -- PLANNING, APPLICATION, VISA, PREPARATION, SUPPORT
    duration_weeks INTEGER,
    price_usd DECIMAL(10,2),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. 创建夏令营表
CREATE TABLE IF NOT EXISTS summer_camps (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    location VARCHAR(255),
    description TEXT,
    image_url VARCHAR(500),
    start_date TIMESTAMP,
    end_date TIMESTAMP,
    age_range VARCHAR(50),
    price_usd DECIMAL(10,2),
    max_participants INTEGER DEFAULT 30,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 4. 创建用户留学咨询注册表
CREATE TABLE IF NOT EXISTS user_study_abroad_registrations (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    service_id INTEGER NOT NULL REFERENCES study_abroad_services(id) ON DELETE CASCADE,
    registration_status VARCHAR(20) DEFAULT 'REGISTERED', -- REGISTERED, CANCELLED, COMPLETED
    registered_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    cancelled_at TIMESTAMP,
    completed_at TIMESTAMP,
    UNIQUE(user_id, service_id)
);

-- 5. 创建用户夏令营注册表
CREATE TABLE IF NOT EXISTS user_summer_camp_registrations (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    summer_camp_id INTEGER NOT NULL REFERENCES summer_camps(id) ON DELETE CASCADE,
    registration_status VARCHAR(20) DEFAULT 'REGISTERED', -- REGISTERED, CANCELLED, COMPLETED
    registered_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    cancelled_at TIMESTAMP,
    completed_at TIMESTAMP,
    UNIQUE(user_id, summer_camp_id)
);

-- 6. 插入留学咨询服务初始数据
INSERT INTO study_abroad_services (service_name, description, service_type, duration_weeks, price_usd) VALUES
('留学规划与定位', '根据学术背景和职业目标提供个性化留学计划', 'PLANNING', 4, 500.00),
('院校选择与专业推荐', '推荐适合的学校和专业，提供详细信息', 'APPLICATION', 2, 300.00),
('申请材料准备指导', '协助准备个人陈述、推荐信等申请材料', 'APPLICATION', 6, 800.00),
('语言培训与考试指导', '提供语言培训课程和考试指导', 'PREPARATION', 8, 1200.00),
('签证申请指导', '协助准备签证材料，提供面试指导', 'VISA', 2, 400.00),
('行前准备支持', '提供行前准备清单和海外生活指导', 'SUPPORT', 1, 200.00);

-- 7. 插入夏令营初始数据
INSERT INTO summer_camps (name, location, description, start_date, end_date, age_range, price_usd, max_participants) VALUES
('哈佛西湖辩论赛夏令营', '马萨诸塞州', '顶级辩论技巧训练，提升公共演讲能力', '2024-07-01', '2024-07-14', '14-18岁', 2500.00, 30),
('麻省理工STEAM沉浸式夏令营', '马萨诸塞州', '科学、技术、工程、艺术、数学综合学习体验', '2024-07-15', '2024-07-28', '15-18岁', 3000.00, 25),
('Wonder Valley度假村夏令营', '加利福尼亚州', '户外探险和团队建设活动', '2024-08-01', '2024-08-14', '10-16岁', 2000.00, 40),
('Rocking Horse牧场夏令营', '纽约州', '马术训练和农场生活体验', '2024-08-15', '2024-08-28', '12-17岁', 2200.00, 35),
('斯坦福大学预科夏令营', '加利福尼亚州', '大学预科课程和学术准备', '2024-07-08', '2024-07-21', '16-18岁', 2800.00, 20),
('耶鲁大学领导力夏令营', '康涅狄格州', '领导力培养和团队合作训练', '2024-07-22', '2024-08-04', '15-18岁', 2600.00, 25);

-- 8. 插入AI编程和英语学习课程初始数据（如果不存在）
INSERT INTO offline_courses (title, description, instructor, category, duration, image_url, is_active) VALUES
('AI 编程入门（直播课）', '每周二/四 晚 20:00 · 60 分钟', '张教授', 'AI编程学习', 60, 'https://example.com/ai-course-1.jpg', true),
('机器学习实战', '从零开始构建AI模型', '李博士', 'AI编程学习', 90, 'https://example.com/ai-course-2.jpg', true),
('深度学习进阶', '神经网络与深度学习应用', '王教授', 'AI编程学习', 120, 'https://example.com/ai-course-3.jpg', true),
('英语口语提升（录播+答疑）', '随时观看 · 每周一次答疑', 'Sarah老师', '英语学习', 45, 'https://example.com/english-course-1.jpg', true),
('商务英语写作', '专业商务邮件与报告写作', 'John老师', '英语学习', 60, 'https://example.com/english-course-2.jpg', true),
('雅思托福备考', '系统化备考，高分通过', 'Mike老师', '英语学习', 90, 'https://example.com/english-course-3.jpg', true)
ON CONFLICT (title) DO NOTHING;

-- 9. 创建索引以提高查询性能
CREATE INDEX IF NOT EXISTS idx_study_abroad_services_type ON study_abroad_services(service_type);
CREATE INDEX IF NOT EXISTS idx_study_abroad_services_active ON study_abroad_services(is_active);
CREATE INDEX IF NOT EXISTS idx_summer_camps_dates ON summer_camps(start_date, end_date);
CREATE INDEX IF NOT EXISTS idx_summer_camps_active ON summer_camps(is_active);
CREATE INDEX IF NOT EXISTS idx_user_study_abroad_user_id ON user_study_abroad_registrations(user_id);
CREATE INDEX IF NOT EXISTS idx_user_study_abroad_service_id ON user_study_abroad_registrations(service_id);
CREATE INDEX IF NOT EXISTS idx_user_summer_camp_user_id ON user_summer_camp_registrations(user_id);
CREATE INDEX IF NOT EXISTS idx_user_summer_camp_camp_id ON user_summer_camp_registrations(summer_camp_id);

-- 10. 添加注释
COMMENT ON TABLE study_abroad_services IS '留学咨询服务表';
COMMENT ON TABLE summer_camps IS '夏令营表';
COMMENT ON TABLE user_study_abroad_registrations IS '用户留学咨询注册表';
COMMENT ON TABLE user_summer_camp_registrations IS '用户夏令营注册表';

COMMENT ON COLUMN study_abroad_services.service_type IS '服务类型：PLANNING-规划, APPLICATION-申请, VISA-签证, PREPARATION-准备, SUPPORT-支持';
COMMENT ON COLUMN user_study_abroad_registrations.registration_status IS '注册状态：REGISTERED-已注册, CANCELLED-已取消, COMPLETED-已完成';
COMMENT ON COLUMN user_summer_camp_registrations.registration_status IS '注册状态：REGISTERED-已注册, CANCELLED-已取消, COMPLETED-已完成';

-- 11. 更新现有表的注释
COMMENT ON COLUMN offline_courses.category IS '课程分类：AI编程学习, 英语学习, 留学咨询, 夏令营';
COMMENT ON COLUMN user_appointments.status IS '预约状态：REGISTERED-已注册, CANCELLED-已取消, COMPLETED-已完成, NO_SHOW-未出席';
