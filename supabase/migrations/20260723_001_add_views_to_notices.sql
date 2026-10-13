-- 给 notices 表添加 views 字段
ALTER TABLE notices ADD COLUMN IF NOT EXISTS views INT DEFAULT 0;

-- 创建自增阅读量的函数
CREATE OR REPLACE FUNCTION increment_notice_views(notice_id INT)
RETURNS VOID AS $$
BEGIN
  UPDATE notices SET views = COALESCE(views, 0) + 1 WHERE id = notice_id;
END;
$$ LANGUAGE plpgsql;
