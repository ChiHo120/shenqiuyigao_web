CREATE TABLE IF NOT EXISTS site_settings (
  id SERIAL PRIMARY KEY,
  key VARCHAR(100) UNIQUE NOT NULL,
  value JSONB,
  label VARCHAR(255),
  description TEXT,
  is_public BOOLEAN DEFAULT TRUE,
  updated_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view public settings" ON site_settings
  FOR SELECT TO anon, authenticated
  USING (is_public = TRUE);

CREATE POLICY "Admin can view all settings" ON site_settings
  FOR SELECT TO authenticated
  USING (public.is_admin());

CREATE POLICY "Admin can insert settings" ON site_settings
  FOR INSERT TO authenticated
  WITH CHECK (public.is_admin());

CREATE POLICY "Admin can update settings" ON site_settings
  FOR UPDATE TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

CREATE POLICY "Admin can delete settings" ON site_settings
  FOR DELETE TO authenticated
  USING (public.is_admin());

CREATE INDEX IF NOT EXISTS idx_site_settings_key ON site_settings(key);
CREATE INDEX IF NOT EXISTS idx_site_settings_is_public ON site_settings(is_public);
