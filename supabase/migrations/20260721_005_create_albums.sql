CREATE TABLE IF NOT EXISTS albums (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(100) UNIQUE NOT NULL,
  location VARCHAR(100),
  description TEXT,
  cover_url VARCHAR(500),
  sort_order INT DEFAULT 0,
  is_published BOOLEAN DEFAULT FALSE,
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  updated_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS album_photos (
  id SERIAL PRIMARY KEY,
  album_id INT NOT NULL REFERENCES albums(id) ON DELETE CASCADE,
  image_url VARCHAR(500) NOT NULL,
  title VARCHAR(255),
  alt_text TEXT,
  captured_at DATE,
  sort_order INT DEFAULT 0,
  is_published BOOLEAN DEFAULT FALSE,
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  updated_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE albums ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view published albums" ON albums
  FOR SELECT TO anon, authenticated
  USING (is_published = TRUE);

CREATE POLICY "Admin can view all albums" ON albums
  FOR SELECT TO authenticated
  USING (public.is_admin());

CREATE POLICY "Admin can insert albums" ON albums
  FOR INSERT TO authenticated
  WITH CHECK (public.is_admin());

CREATE POLICY "Admin can update albums" ON albums
  FOR UPDATE TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

CREATE POLICY "Admin can delete albums" ON albums
  FOR DELETE TO authenticated
  USING (public.is_admin());

ALTER TABLE album_photos ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view published album_photos" ON album_photos
  FOR SELECT TO anon, authenticated
  USING (is_published = TRUE AND EXISTS (
    SELECT 1 FROM albums WHERE albums.id = album_photos.album_id AND albums.is_published = TRUE
  ));

CREATE POLICY "Admin can view all album_photos" ON album_photos
  FOR SELECT TO authenticated
  USING (public.is_admin());

CREATE POLICY "Admin can insert album_photos" ON album_photos
  FOR INSERT TO authenticated
  WITH CHECK (public.is_admin());

CREATE POLICY "Admin can update album_photos" ON album_photos
  FOR UPDATE TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

CREATE POLICY "Admin can delete album_photos" ON album_photos
  FOR DELETE TO authenticated
  USING (public.is_admin());

CREATE INDEX IF NOT EXISTS idx_albums_is_published ON albums(is_published);
CREATE INDEX IF NOT EXISTS idx_album_photos_album_id ON album_photos(album_id);
CREATE INDEX IF NOT EXISTS idx_album_photos_is_published ON album_photos(is_published);
