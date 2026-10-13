import { createClient, SupabaseClient } from '@supabase/supabase-js'
import type { Database } from '../types/database'
import { mockGallery } from '../data/mockData'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || ''

let supabase: SupabaseClient<Database> | null = null

if (supabaseUrl && supabaseAnonKey && supabaseAnonKey.length > 0) {
  supabase = createClient<Database>(supabaseUrl, supabaseAnonKey)
}

export const getGallery = async (category?: string) => {
  if (!supabase) {
    let data = mockGallery
    if (category && category !== 'all') {
      data = data.filter(g => g.category === category)
    }
    return { data, error: null }
  }

  let query = supabase
    .from('gallery')
    .select('*')
    .order('upload_date', { ascending: false })

  if (category && category !== 'all') {
    query = query.eq('category', category)
  }

  const { data, error } = await query
  return { data: data || mockGallery, error }
}

export const getGalleryById = async (id: number) => {
  if (!supabase) {
    const data = mockGallery.find(g => g.id === id)
    return { data, error: null }
  }

  const { data, error } = await supabase
    .from('gallery')
    .select('*')
    .eq('id', id)
    .single()

  if (!data) {
    return { data: mockGallery.find(g => g.id === id), error }
  }

  return { data, error }
}

export const getGalleryCategories = async () => {
  return {
    data: ['all', 'campus', 'activity', 'achievement', 'teacher'],
    error: null
  }
}