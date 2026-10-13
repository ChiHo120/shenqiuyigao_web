import { createClient, SupabaseClient } from '@supabase/supabase-js'
import type { Database } from '../types/database'
import { mockVideos } from '../data/mockData'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || ''

let supabase: SupabaseClient<Database> | null = null

if (supabaseUrl && supabaseAnonKey && supabaseAnonKey.length > 0) {
  supabase = createClient<Database>(supabaseUrl, supabaseAnonKey)
}

export const getVideos = async (limit = 20) => {
  if (!supabase) {
    return { data: mockVideos.slice(0, limit), error: null }
  }

  const { data, error } = await supabase
    .from('videos')
    .select('*')
    .order('published_at', { ascending: false })
    .limit(limit)

  return { data: data || mockVideos.slice(0, limit), error }
}

export const getVideoById = async (id: number) => {
  if (!supabase) {
    const data = mockVideos.find(v => v.id === id)
    return { data, error: null }
  }

  const { data, error } = await supabase
    .from('videos')
    .select('*')
    .eq('id', id)
    .single()

  if (!data) {
    return { data: mockVideos.find(v => v.id === id), error }
  }

  return { data, error }
}