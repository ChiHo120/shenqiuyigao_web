import { createClient, SupabaseClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || ''

let supabase: SupabaseClient | null = null

try {
  if (supabaseUrl && supabaseKey && supabaseKey.length > 0) {
    supabase = createClient(supabaseUrl, supabaseKey)
  }
} catch (err) {
  console.warn('Supabase initialization failed, using mock data fallback')
}

const createSafeClient = () => {
  if (supabase) {
    return supabase
  }
  
  return {
    from: () => ({
      select: async () => ({ data: null, error: null }),
      insert: async () => ({ data: null, error: { message: 'Supabase not configured' } }),
      update: async () => ({ data: null, error: { message: 'Supabase not configured' } }),
      delete: async () => ({ data: null, error: { message: 'Supabase not configured' } }),
      order: () => ({
        select: async () => ({ data: null, error: null }),
      }),
      eq: () => ({
        select: async () => ({ data: null, error: null }),
        update: async () => ({ data: null, error: { message: 'Supabase not configured' } }),
        delete: async () => ({ data: null, error: { message: 'Supabase not configured' } }),
      }),
    }),
    auth: {
      getUser: async () => ({ data: { user: null }, error: null }),
      signInWithPassword: async () => ({ data: null, error: { message: 'Supabase not configured' } }),
      signOut: async () => ({ error: null }),
    },
    rpc: async () => ({ data: null, error: null }),
  } as unknown as SupabaseClient
}

export const safeSupabase = createSafeClient()

export { supabase }

export default safeSupabase
