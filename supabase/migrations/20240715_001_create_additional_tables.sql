CREATE TABLE IF NOT EXISTS news_categories (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  slug VARCHAR(100) UNIQUE NOT NULL,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS videos (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  cover_url VARCHAR(500),
  video_url VARCHAR(500),
  duration VARCHAR(20),
  published_at TIMESTAMPTZ DEFAULT NOW(),
  is_published BOOLEAN DEFAULT TRUE,
  views INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS honors (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  year INT,
  level VARCHAR(50) DEFAULT 'municipal',
  image_url VARCHAR(500),
  is_published BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS school_pages (
  id SERIAL PRIMARY KEY,
  slug VARCHAR(100) UNIQUE NOT NULL,
  title VARCHAR(255) NOT NULL,
  content TEXT,
  meta_title VARCHAR(255),
  meta_description TEXT,
  is_published BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS student_activities (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  date TIMESTAMPTZ,
  images TEXT[],
  category VARCHAR(50) DEFAULT 'sports',
  is_published BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

INSERT INTO news_categories (name, slug, description) VALUES
('学校新闻', 'school-news', '学校日常新闻动态'),
('通知公告', 'announcements', '学校通知公告'),
('教育教学', 'teaching', '教育教学相关新闻'),
('校园活动', 'campus', '校园活动新闻'),
('教学成果', 'achievement', '教学成果新闻'),
('教师风采', 'teacher', '教师相关新闻');

INSERT INTO school_pages (slug, title, content) VALUES
('principal-message', '校长寄语', '待学校提供资料'),
('school-introduction', '学校简介', '待学校提供资料'),
('school-history', '学校历史', '待学校提供资料'),
('school-philosophy', '办学理念', '待学校提供资料'),
('school-values', '校训校风', '待学校提供资料');