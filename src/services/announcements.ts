import { createClient, SupabaseClient } from '@supabase/supabase-js'
import type { Database } from '../types/database'
import { mockNotices } from '../data/mockData'

export type Announcement = Database['public']['Tables']['notices']['Row']

const fallbackNotices: Announcement[] = mockNotices.map(notice => ({
  ...notice,
  is_published: true,
  views: notice.views ?? 0,
}))

const sortAnnouncements = (items: Announcement[]) =>
  [...items].sort(
    (a, b) =>
      Number(b.is_pinned) - Number(a.is_pinned) ||
      new Date(b.publish_date ?? 0).getTime() - new Date(a.publish_date ?? 0).getTime()
  )

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || ''

let supabase: SupabaseClient<Database> | null = null

if (supabaseUrl && supabaseAnonKey && supabaseAnonKey.length > 0) {
  supabase = createClient<Database>(supabaseUrl, supabaseAnonKey)
}

export const getAnnouncements = async (limit = 10) => {
  if (!supabase) {
    return { data: sortAnnouncements(fallbackNotices).slice(0, limit), error: null }
  }

  const { data, error } = await supabase
    .from('notices')
    .select('*')
    .eq('is_published', true)
    .not('content', 'ilike', '%DEMO数据%')
    .order('is_pinned', { ascending: false })
    .order('publish_date', { ascending: false })
    .limit(limit)

  return {
    data: data ?? sortAnnouncements(fallbackNotices).slice(0, limit),
    error,
  }
}

export const getAnnouncementById = async (id: number) => {
  if (!supabase) {
    const data = mockNotices.find(n => n.id === id)
    if (data) {
      data.views = (data.views || 0) + 1
    }
    return { data, error: null }
  }

  const { data, error } = await supabase
    .from('notices')
    .select('*')
    .eq('id', id)
    .single()

  if (!data) {
    return { data: mockNotices.find(n => n.id === id), error }
  }

  // 自增阅读量（异步执行，不阻塞返回）
  supabase
    .from('notices')
    .update({ views: (data.views || 0) + 1 })
    .eq('id', id)
    .then(() => {})

  return { data, error }
}