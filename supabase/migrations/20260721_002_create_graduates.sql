CREATE TABLE IF NOT EXISTS graduates (
  id SERIAL PRIMARY KEY,
  year INT NOT NULL,
  class_name VARCHAR(100) NOT NULL,
  student_count INT DEFAULT 55,
  image_url VARCHAR(500),
  is_published BOOLEAN DEFAULT FALSE,
  sort_order INT DEFAULT 0,
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  updated_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(year, class_name)
);

ALTER TABLE graduates ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view published graduates" ON graduates
  FOR SELECT TO anon, authenticated
  USING (is_published = TRUE);

CREATE POLICY "Admin can view all graduates" ON graduates
  FOR SELECT TO authenticated
  USING (public.is_admin());

CREATE POLICY "Admin can insert graduates" ON graduates
  FOR INSERT TO authenticated
  WITH CHECK (public.is_admin());

CREATE POLICY "Admin can update graduates" ON graduates
  FOR UPDATE TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

CREATE POLICY "Admin can delete graduates" ON graduates
  FOR DELETE TO authenticated
  USING (public.is_admin());

CREATE INDEX IF NOT EXISTS idx_graduates_year ON graduates(year);
CREATE INDEX IF NOT EXISTS idx_graduates_is_published ON graduates(is_published);
