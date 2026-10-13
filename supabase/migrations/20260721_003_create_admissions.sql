CREATE TABLE IF NOT EXISTS admissions (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(100) UNIQUE NOT NULL,
  category VARCHAR(50) DEFAULT 'admission',
  year INT,
  summary TEXT,
  content TEXT,
  attachment_url VARCHAR(500),
  is_published BOOLEAN DEFAULT FALSE,
  sort_order INT DEFAULT 0,
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  updated_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE admissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view published admissions" ON admissions
  FOR SELECT TO anon, authenticated
  USING (is_published = TRUE);

CREATE POLICY "Admin can view all admissions" ON admissions
  FOR SELECT TO authenticated
  USING (public.is_admin());

CREATE POLICY "Admin can insert admissions" ON admissions
  FOR INSERT TO authenticated
  WITH CHECK (public.is_admin());

CREATE POLICY "Admin can update admissions" ON admissions
  FOR UPDATE TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

CREATE POLICY "Admin can delete admissions" ON admissions
  FOR DELETE TO authenticated
  USING (public.is_admin());

CREATE INDEX IF NOT EXISTS idx_admissions_year ON admissions(year);
CREATE INDEX IF NOT EXISTS idx_admissions_is_published ON admissions(is_published);
CREATE INDEX IF NOT EXISTS idx_admissions_category ON admissions(category);
