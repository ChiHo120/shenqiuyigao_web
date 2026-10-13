import { createClient, SupabaseClient } from '@supabase/supabase-js'
import type { Database } from '../../types/database'
import { mockNotices, mockNews, mockAchievements, mockTeachers, mockGallery, mockSchoolStats } from '../data/mockData'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || ''

let supabase: SupabaseClient<Database> | null = null

if (supabaseUrl && supabaseAnonKey && supabaseAnonKey.length > 0) {
  supabase = createClient<Database>(supabaseUrl, supabaseAnonKey)
}

export const getNews = async () => {
  if (!supabase) {
    const sortedNews = [...mockNews].sort((a, b) => 
      new Date(b.publish_date).getTime() - new Date(a.publish_date).getTime()
    )
    return { data: sortedNews.slice(0, 6), error: null }
  }
  const { data, error } = await supabase
    .from('news')
    .select('*')
    .order('publish_date', { ascending: false })
    .limit(6)
  return { data: data || mockNews, error }
}

export const getNotices = async () => {
  if (!supabase) {
    const sortedNotices = [...mockNotices]
      .sort((a, b) => Number(b.is_pinned) - Number(a.is_pinned) || new Date(b.publish_date).getTime() - new Date(a.publish_date).getTime())
      .slice(0, 6)
    return { data: sortedNotices, error: null }
  }
  const { data, error } = await supabase
    .from('notices')
    .select('*')
    .not('content', 'ilike', '%DEMO数据%')
    .order('is_pinned', { ascending: false })
    .order('publish_date', { ascending: false })
    .limit(6)
  return { data: data ?? [], error }
}

export const getAchievements = async () => {
  if (!supabase) {
    return { data: mockAchievements, error: null }
  }
  const { data, error } = await supabase
    .from('achievements')
    .select('*')
    .order('year', { ascending: false })
    .limit(10)
  return { data: data || mockAchievements, error }
}

export const getTeachers = async () => {
  if (!supabase) {
    return { data: mockTeachers, error: null }
  }
  const { data, error } = await supabase
    .from('teachers')
    .select('*')
    .limit(20)
  return { data: data || mockTeachers, error }
}

export const getGallery = async () => {
  if (!supabase) {
    return { data: mockGallery, error: null }
  }
  const { data, error } = await supabase
    .from('gallery')
    .select('*')
    .order('upload_date', { ascending: false })
  return { data: data || mockGallery, error }
}

export const getSchoolStats = async () => {
  if (!supabase) {
    return { data: mockSchoolStats, error: null }
  }
  const { data, error } = await supabase
    .from('school_stats')
    .select('*')
  return { data: data || mockSchoolStats, error }
}