import React, { useState, useEffect, useContext, createContext } from 'react'
import type { User } from '@supabase/supabase-js'
import { supabase } from '../lib/supabase'
interface AuthContextType { user: User | null; isAdmin: boolean; loading: boolean; login: (email: string, password: string) => Promise<{ error: string | null }>; logout: () => Promise<void> }
const AuthContext = createContext<AuthContextType | null>(null)
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isAdmin, setIsAdmin] = useState(false)
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    let active = true
    let revision = 0
    const sync = async (next: User | null) => {
      const current = ++revision
      if (active) { setUser(next); setIsAdmin(false); setLoading(true) }
      try {
        const result = next && supabase ? await supabase.rpc('is_admin') : null
        if (active && current === revision) setIsAdmin(result?.data === true && !result.error)
      } finally { if (active && current === revision) setLoading(false) }
    }
    if (!supabase) { setLoading(false); return }
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      // Defer database reads until after the auth callback releases its lock.
      setTimeout(() => { if (active) void sync(session?.user ?? null) }, 0)
    })
    return () => { active = false; listener.subscription.unsubscribe() }
  }, [])
  const login = async (email: string, password: string) => {
    if (!supabase) return { error: '未配置自己的 Supabase 项目' }
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    return { error: error?.message ?? null }
  }
  const logout = async () => { await supabase?.auth.signOut(); setUser(null); setIsAdmin(false) }
  return React.createElement(AuthContext.Provider, { value: { user, isAdmin, loading, login, logout } }, children)
}
export function useAuth() { const context = useContext(AuthContext); if (!context) throw new Error('useAuth must be used within an AuthProvider'); return context }
