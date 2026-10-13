-- 未发布记录仅管理员可见；不开放匿名写入。
DO $$ DECLARE tab text; BEGIN
  FOREACH tab IN ARRAY ARRAY['news_categories', 'honors', 'student_activities'] LOOP
    EXECUTE format('ALTER TABLE public.%I ENABLE ROW LEVEL SECURITY', tab);
    IF tab = 'news_categories' THEN
      EXECUTE format('CREATE POLICY public_read ON public.%I FOR SELECT TO anon, authenticated USING (true)', tab);
    ELSE
      EXECUTE format('CREATE POLICY public_read ON public.%I FOR SELECT TO anon, authenticated USING (is_published = true)', tab);
    END IF;
    EXECUTE format('CREATE POLICY admin_manage ON public.%I FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin())', tab);
  END LOOP;
END $$;
-- 对公开数据表明确授权；RLS 决定哪些行可访问。
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT SELECT ON ALL TABLES IN SCHEMA public TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO authenticated;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO authenticated;
