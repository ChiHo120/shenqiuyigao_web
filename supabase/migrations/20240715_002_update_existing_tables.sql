ALTER TABLE IF EXISTS news 
  ADD COLUMN IF NOT EXISTS category_id INT,
  ADD COLUMN IF NOT EXISTS views INT DEFAULT 0,
  ADD COLUMN IF NOT EXISTS is_published BOOLEAN DEFAULT TRUE;

ALTER TABLE IF EXISTS teachers 
  ADD COLUMN IF NOT EXISTS department VARCHAR(100),
  ADD COLUMN IF NOT EXISTS is_published BOOLEAN DEFAULT TRUE;

ALTER TABLE IF EXISTS gallery 
  ADD COLUMN IF NOT EXISTS is_published BOOLEAN DEFAULT TRUE,
  ADD COLUMN IF NOT EXISTS "order" INT DEFAULT 0;

ALTER TABLE IF EXISTS achievements 
  ADD COLUMN IF NOT EXISTS level VARCHAR(50) DEFAULT 'municipal',
  ADD COLUMN IF NOT EXISTS is_published BOOLEAN DEFAULT TRUE;

ALTER TABLE IF EXISTS notices 
  ADD COLUMN IF NOT EXISTS is_published BOOLEAN DEFAULT TRUE;

ALTER TABLE IF EXISTS news 
  ADD CONSTRAINT fk_news_category 
  FOREIGN KEY (category_id) 
  REFERENCES news_categories(id);

CREATE INDEX IF NOT EXISTS idx_news_category ON news(category_id);
CREATE INDEX IF NOT EXISTS idx_news_publish_date ON news(publish_date);
CREATE INDEX IF NOT EXISTS idx_notices_priority ON notices(priority);
CREATE INDEX IF NOT EXISTS idx_videos_published_at ON videos(published_at);
CREATE INDEX IF NOT EXISTS idx_honors_year ON honors(year);