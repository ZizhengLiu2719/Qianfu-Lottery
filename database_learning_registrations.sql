-- 创建学习彩注册表
CREATE TABLE learning_registrations (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL,
  item_id VARCHAR(255) NOT NULL,
  item_type VARCHAR(50) NOT NULL,
  title VARCHAR(255) NOT NULL,
  subtitle VARCHAR(255) NOT NULL,
  category VARCHAR(100) NOT NULL,
  status VARCHAR(50) DEFAULT 'REGISTERED',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  CONSTRAINT fk_learning_registrations_user 
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  
  CONSTRAINT unique_user_item_type 
    UNIQUE (user_id, item_id, item_type)
);

-- 创建索引以提高查询性能
CREATE INDEX idx_learning_registrations_user_id ON learning_registrations(user_id);
CREATE INDEX idx_learning_registrations_item_type ON learning_registrations(item_type);
CREATE INDEX idx_learning_registrations_status ON learning_registrations(status);
CREATE INDEX idx_learning_registrations_created_at ON learning_registrations(created_at);

-- 添加注释
COMMENT ON TABLE learning_registrations IS '学习彩注册表';
COMMENT ON COLUMN learning_registrations.user_id IS '用户ID';
COMMENT ON COLUMN learning_registrations.item_id IS '课程/服务/夏令营的ID';
COMMENT ON COLUMN learning_registrations.item_type IS '项目类型: course, service, camp';
COMMENT ON COLUMN learning_registrations.title IS '标题';
COMMENT ON COLUMN learning_registrations.subtitle IS '副标题';
COMMENT ON COLUMN learning_registrations.category IS '分类';
COMMENT ON COLUMN learning_registrations.status IS '状态: REGISTERED, CANCELLED, COMPLETED';
