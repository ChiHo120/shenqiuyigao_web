CREATE TABLE IF NOT EXISTS contact_messages (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  email VARCHAR(254),
  phone VARCHAR(30),
  subject VARCHAR(100) NOT NULL,
  content TEXT NOT NULL,
  status VARCHAR(20) DEFAULT 'unread',
  consent_at TIMESTAMPTZ NOT NULL,
  ip_hash VARCHAR(64),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  read_at TIMESTAMPTZ,
  archived_at TIMESTAMPTZ
);

ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "No public access to contact_messages" ON contact_messages
  FOR SELECT TO anon
  USING (false);

CREATE POLICY "Authenticated non-admin cannot view contact_messages" ON contact_messages
  FOR SELECT TO authenticated
  USING (false);

CREATE POLICY "Admin can view contact_messages" ON contact_messages
  FOR SELECT TO authenticated
  USING (public.is_admin());

CREATE POLICY "No public insert to contact_messages" ON contact_messages
  FOR INSERT TO anon
  WITH CHECK (false);

CREATE POLICY "Authenticated non-admin cannot insert contact_messages" ON contact_messages
  FOR INSERT TO authenticated
  WITH CHECK (false);

CREATE POLICY "Admin can update contact_messages" ON contact_messages
  FOR UPDATE TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

CREATE POLICY "Admin can delete contact_messages" ON contact_messages
  FOR DELETE TO authenticated
  USING (public.is_admin());

CREATE INDEX IF NOT EXISTS idx_contact_messages_status ON contact_messages(status);
CREATE INDEX IF NOT EXISTS idx_contact_messages_created_at ON contact_messages(created_at);
CREATE INDEX IF NOT EXISTS idx_contact_messages_ip_hash ON contact_messages(ip_hash);
