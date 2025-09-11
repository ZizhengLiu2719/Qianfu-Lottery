-- 创建平台反馈表
CREATE TABLE feedback (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    category VARCHAR(50) NOT NULL DEFAULT 'general', -- general, bug, feature, suggestion, complaint
    status VARCHAR(20) NOT NULL DEFAULT 'pending', -- pending, in_progress, resolved, closed
    priority VARCHAR(10) NOT NULL DEFAULT 'medium', -- low, medium, high, urgent
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    admin_reply TEXT,
    admin_replied_at TIMESTAMP WITH TIME ZONE
);

-- 创建索引以提高查询性能
CREATE INDEX idx_feedback_user_id ON feedback(user_id);
CREATE INDEX idx_feedback_status ON feedback(status);
CREATE INDEX idx_feedback_category ON feedback(category);
CREATE INDEX idx_feedback_created_at ON feedback(created_at);

-- 添加注释
COMMENT ON TABLE feedback IS '平台反馈表';
COMMENT ON COLUMN feedback.id IS '反馈ID';
COMMENT ON COLUMN feedback.user_id IS '用户ID';
COMMENT ON COLUMN feedback.title IS '反馈标题';
COMMENT ON COLUMN feedback.content IS '反馈内容';
COMMENT ON COLUMN feedback.category IS '反馈分类：general(一般), bug(错误), feature(功能), suggestion(建议), complaint(投诉)';
COMMENT ON COLUMN feedback.status IS '处理状态：pending(待处理), in_progress(处理中), resolved(已解决), closed(已关闭)';
COMMENT ON COLUMN feedback.priority IS '优先级：low(低), medium(中), high(高), urgent(紧急)';
COMMENT ON COLUMN feedback.created_at IS '创建时间';
COMMENT ON COLUMN feedback.updated_at IS '更新时间';
COMMENT ON COLUMN feedback.admin_reply IS '管理员回复';
COMMENT ON COLUMN feedback.admin_replied_at IS '管理员回复时间';
