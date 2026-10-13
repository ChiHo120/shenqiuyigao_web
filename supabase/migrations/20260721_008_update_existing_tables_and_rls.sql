ALTER TABLE IF EXISTS news
  ADD COLUMN IF NOT EXISTS sort_order INT DEFAULT 0,
  ADD COLUMN IF NOT EXISTS created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  ADD COLUMN IF NOT EXISTS updated_by UUID REFERENCES auth.users(id) ON DELETE SET NULL;

ALTER TABLE IF EXISTS notices
  ADD COLUMN IF NOT EXISTS sort_order INT DEFAULT 0,
  ADD COLUMN IF NOT EXISTS created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  ADD COLUMN IF NOT EXISTS updated_by UUID REFERENCES auth.users(id) ON DELETE SET NULL;

ALTER TABLE IF EXISTS teachers
  ADD COLUMN IF NOT EXISTS sort_order INT DEFAULT 0,
  ADD COLUMN IF NOT EXISTS created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  ADD COLUMN IF NOT EXISTS updated_by UUID REFERENCES auth.users(id) ON DELETE SET NULL;

ALTER TABLE IF EXISTS videos
  ADD COLUMN IF NOT EXISTS sort_order INT DEFAULT 0,
  ADD COLUMN IF NOT EXISTS created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  ADD COLUMN IF NOT EXISTS updated_by UUID REFERENCES auth.users(id) ON DELETE SET NULL;

ALTER TABLE IF EXISTS achievements
  ADD COLUMN IF NOT EXISTS sort_order INT DEFAULT 0,
  ADD COLUMN IF NOT EXISTS created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  ADD COLUMN IF NOT EXISTS updated_by UUID REFERENCES auth.users(id) ON DELETE SET NULL;

ALTER TABLE IF EXISTS gallery
  ADD COLUMN IF NOT EXISTS created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  ADD COLUMN IF NOT EXISTS updated_by UUID REFERENCES auth.users(id) ON DELETE SET NULL;

ALTER TABLE IF EXISTS school_pages
  ADD COLUMN IF NOT EXISTS sort_order INT DEFAULT 0,
  ADD COLUMN IF NOT EXISTS created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  ADD COLUMN IF NOT EXISTS updated_by UUID REFERENCES auth.users(id) ON DELETE SET NULL;

ALTER TABLE IF EXISTS school_stats
  ADD COLUMN IF NOT EXISTS created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  ADD COLUMN IF NOT EXISTS updated_by UUID REFERENCES auth.users(id) ON DELETE SET NULL;

UPDATE news SET is_published = TRUE WHERE is_published IS NULL;
UPDATE notices SET is_published = TRUE WHERE is_published IS NULL;
UPDATE teachers SET is_published = TRUE WHERE is_published IS NULL;
UPDATE videos SET is_published = TRUE WHERE is_published IS NULL;
UPDATE achievements SET is_published = TRUE WHERE is_published IS NULL;
UPDATE gallery SET is_published = TRUE WHERE is_published IS NULL;
UPDATE school_pages SET is_published = TRUE WHERE is_published IS NULL;

ALTER TABLE news ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view published news" ON news
  FOR SELECT TO anon, authenticated
  USING (is_published = TRUE);

CREATE POLICY "Admin can view all news" ON news
  FOR SELECT TO authenticated
  USING (public.is_admin());

CREATE POLICY "Admin can insert news" ON news
  FOR INSERT TO authenticated
  WITH CHECK (public.is_admin());

CREATE POLICY "Admin can update news" ON news
  FOR UPDATE TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

CREATE POLICY "Admin can delete news" ON news
  FOR DELETE TO authenticated
  USING (public.is_admin());

ALTER TABLE notices ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view published notices" ON notices
  FOR SELECT TO anon, authenticated
  USING (is_published = TRUE);

CREATE POLICY "Admin can view all notices" ON notices
  FOR SELECT TO authenticated
  USING (public.is_admin());

CREATE POLICY "Admin can insert notices" ON notices
  FOR INSERT TO authenticated
  WITH CHECK (public.is_admin());

CREATE POLICY "Admin can update notices" ON notices
  FOR UPDATE TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

CREATE POLICY "Admin can delete notices" ON notices
  FOR DELETE TO authenticated
  USING (public.is_admin());

ALTER TABLE teachers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view published teachers" ON teachers
  FOR SELECT TO anon, authenticated
  USING (is_published = TRUE);

CREATE POLICY "Admin can view all teachers" ON teachers
  FOR SELECT TO authenticated
  USING (public.is_admin());

CREATE POLICY "Admin can insert teachers" ON teachers
  FOR INSERT TO authenticated
  WITH CHECK (public.is_admin());

CREATE POLICY "Admin can update teachers" ON teachers
  FOR UPDATE TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

CREATE POLICY "Admin can delete teachers" ON teachers
  FOR DELETE TO authenticated
  USING (public.is_admin());

ALTER TABLE videos ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view published videos" ON videos
  FOR SELECT TO anon, authenticated
  USING (is_published = TRUE);

CREATE POLICY "Admin can view all videos" ON videos
  FOR SELECT TO authenticated
  USING (public.is_admin());

CREATE POLICY "Admin can insert videos" ON videos
  FOR INSERT TO authenticated
  WITH CHECK (public.is_admin());

CREATE POLICY "Admin can update videos" ON videos
  FOR UPDATE TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

CREATE POLICY "Admin can delete videos" ON videos
  FOR DELETE TO authenticated
  USING (public.is_admin());

ALTER TABLE achievements ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view published achievements" ON achievements
  FOR SELECT TO anon, authenticated
  USING (is_published = TRUE);

CREATE POLICY "Admin can view all achievements" ON achievements
  FOR SELECT TO authenticated
  USING (public.is_admin());

CREATE POLICY "Admin can insert achievements" ON achievements
  FOR INSERT TO authenticated
  WITH CHECK (public.is_admin());

CREATE POLICY "Admin can update achievements" ON achievements
  FOR UPDATE TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

CREATE POLICY "Admin can delete achievements" ON achievements
  FOR DELETE TO authenticated
  USING (public.is_admin());

ALTER TABLE gallery ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view published gallery" ON gallery
  FOR SELECT TO anon, authenticated
  USING (is_published = TRUE);

CREATE POLICY "Admin can view all gallery" ON gallery
  FOR SELECT TO authenticated
  USING (public.is_admin());

CREATE POLICY "Admin can insert gallery" ON gallery
  FOR INSERT TO authenticated
  WITH CHECK (public.is_admin());

CREATE POLICY "Admin can update gallery" ON gallery
  FOR UPDATE TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

CREATE POLICY "Admin can delete gallery" ON gallery
  FOR DELETE TO authenticated
  USING (public.is_admin());

ALTER TABLE school_pages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view published school_pages" ON school_pages
  FOR SELECT TO anon, authenticated
  USING (is_published = TRUE);

CREATE POLICY "Admin can view all school_pages" ON school_pages
  FOR SELECT TO authenticated
  USING (public.is_admin());

CREATE POLICY "Admin can update school_pages" ON school_pages
  FOR UPDATE TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

ALTER TABLE school_stats ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view school_stats" ON school_stats
  FOR SELECT TO anon, authenticated
  USING (true);

CREATE POLICY "Admin can update school_stats" ON school_stats
  FOR UPDATE TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_news_updated_at
  BEFORE UPDATE ON news
  FOR EACH ROW
  EXECUTE FUNCTION public.set_updated_at();

CREATE TRIGGER trigger_notices_updated_at
  BEFORE UPDATE ON notices
  FOR EACH ROW
  EXECUTE FUNCTION public.set_updated_at();

CREATE TRIGGER trigger_teachers_updated_at
  BEFORE UPDATE ON teachers
  FOR EACH ROW
  EXECUTE FUNCTION public.set_updated_at();

CREATE TRIGGER trigger_videos_updated_at
  BEFORE UPDATE ON videos
  FOR EACH ROW
  EXECUTE FUNCTION public.set_updated_at();

CREATE TRIGGER trigger_achievements_updated_at
  BEFORE UPDATE ON achievements
  FOR EACH ROW
  EXECUTE FUNCTION public.set_updated_at();

CREATE TRIGGER trigger_gallery_updated_at
  BEFORE UPDATE ON gallery
  FOR EACH ROW
  EXECUTE FUNCTION public.set_updated_at();

CREATE TRIGGER trigger_graduates_updated_at
  BEFORE UPDATE ON graduates
  FOR EACH ROW
  EXECUTE FUNCTION public.set_updated_at();

CREATE TRIGGER trigger_admissions_updated_at
  BEFORE UPDATE ON admissions
  FOR EACH ROW
  EXECUTE FUNCTION public.set_updated_at();

CREATE TRIGGER trigger_albums_updated_at
  BEFORE UPDATE ON albums
  FOR EACH ROW
  EXECUTE FUNCTION public.set_updated_at();

CREATE TRIGGER trigger_album_photos_updated_at
  BEFORE UPDATE ON album_photos
  FOR EACH ROW
  EXECUTE FUNCTION public.set_updated_at();

CREATE TRIGGER trigger_site_settings_updated_at
  BEFORE UPDATE ON site_settings
  FOR EACH ROW
  EXECUTE FUNCTION public.set_updated_at();
