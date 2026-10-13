import { createClient, SupabaseClient } from '@supabase/supabase-js'
import type { Database } from '../types/database'
import { mockNews } from '../data/mockData'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || ''

let supabase: SupabaseClient<Database> | null = null

if (supabaseUrl && supabaseAnonKey && supabaseAnonKey.length > 0) {
  supabase = createClient<Database>(supabaseUrl, supabaseAnonKey)
}

export const getNews = async (limit = 10, category?: string) => {
  if (!supabase) {
    let data = mockNews
    if (category && category !== 'all') {
      data = data.filter(n => n.category === category)
    }
    return { data: data.slice(0, limit), error: null }
  }

  let query = supabase
    .from('news')
    .select('*')
    .order('publish_date', { ascending: false })
    .limit(limit)

  if (category && category !== 'all') {
    query = query.eq('category', category)
  }

  const { data, error } = await query
  return { data: data || mockNews.slice(0, limit), error }
}

export const getNewsById = async (id: number) => {
  if (!supabase) {
    const data = mockNews.find(n => n.id === id)
    return { data, error: null }
  }

  const { data, error } = await supabase
    .from('news')
    .select('*')
    .eq('id', id)
    .single()

  if (!data) {
    return { data: mockNews.find(n => n.id === id), error }
  }

  return { data, error }
}

export const getNewsCategories = async () => {
  if (!supabase) {
    return { 
      data: [
        { id: 1, name: '全部', slug: 'all' },
        { id: 2, name: '学校新闻', slug: 'campus' },
        { id: 3, name: '教育教学', slug: 'teaching' },
        { id: 4, name: '教学成果', slug: 'achievement' },
        { id: 5, name: '教师风采', slug: 'teacher' },
      ],
      error: null 
    }
  }

  const { data, error } = await supabase
    .from('news_categories')
    .select('*')

  return { data, error }
}