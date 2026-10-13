import { createClient, SupabaseClient } from '@supabase/supabase-js'
import type { Database } from '../types/database'
import { mockTeachers } from '../data/mockData'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || ''

let supabase: SupabaseClient<Database> | null = null

if (supabaseUrl && supabaseAnonKey && supabaseAnonKey.length > 0) {
  supabase = createClient<Database>(supabaseUrl, supabaseAnonKey)
}

export const getTeachers = async (limit = 20, subject?: string) => {
  if (!supabase) {
    let data = mockTeachers
    if (subject && subject !== 'all') {
      data = data.filter(t => t.subject === subject)
    }
    return { data: data.slice(0, limit), error: null }
  }

  let query = supabase
    .from('teachers')
    .select('*')
    .limit(limit)

  if (subject && subject !== 'all') {
    query = query.eq('subject', subject)
  }

  const { data, error } = await query
  return { data: data || mockTeachers.slice(0, limit), error }
}

export const getTeacherById = async (id: number) => {
  if (!supabase) {
    const data = mockTeachers.find(t => t.id === id)
    return { data, error: null }
  }

  const { data, error } = await supabase
    .from('teachers')
    .select('*')
    .eq('id', id)
    .single()

  if (!data) {
    return { data: mockTeachers.find(t => t.id === id), error }
  }

  return { data, error }
}

export const getTeacherSubjects = async () => {
  if (!supabase) {
    return {
      data: ['校委会', '语文', '数学', '英语', '物理', '化学', '历史', '生物'],
      error: null
    }
  }

  const { data, error } = await supabase
    .from('teachers')
    .select('subject')

  if (data) {
    const subjects = [...new Set(data.map((d: { subject: string | null }) => d.subject).filter(Boolean))] as string[]
    return { data: subjects, error }
  }

  return {
    data: ['校委会', '语文', '数学', '英语', '物理', '化学', '历史', '生物'],
    error
  }
}