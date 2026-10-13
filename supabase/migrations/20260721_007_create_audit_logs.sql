CREATE TABLE IF NOT EXISTS audit_logs (
  id SERIAL PRIMARY KEY,
  actor_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  action VARCHAR(50) NOT NULL,
  entity_type VARCHAR(50) NOT NULL,
  entity_id INT,
  metadata JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "No public access to audit_logs" ON audit_logs
  FOR SELECT TO anon
  USING (false);

CREATE POLICY "Authenticated non-admin cannot view audit_logs" ON audit_logs
  FOR SELECT TO authenticated
  USING (false);

CREATE POLICY "Admin can view audit_logs" ON audit_logs
  FOR SELECT TO authenticated
  USING (public.is_admin());

CREATE POLICY "No insert for audit_logs from client" ON audit_logs
  FOR INSERT TO anon, authenticated
  WITH CHECK (false);

CREATE POLICY "No update for audit_logs" ON audit_logs
  FOR UPDATE TO anon, authenticated
  USING (false);

CREATE POLICY "No delete for audit_logs" ON audit_logs
  FOR DELETE TO anon, authenticated
  USING (false);

CREATE INDEX IF NOT EXISTS idx_audit_logs_actor_id ON audit_logs(actor_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_entity_type ON audit_logs(entity_type);
CREATE INDEX IF NOT EXISTS idx_audit_logs_created_at ON audit_logs(created_at);
