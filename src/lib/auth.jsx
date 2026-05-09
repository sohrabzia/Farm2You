import { createContext, useContext, useEffect, useState } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { api } from './api.js'

const AuthCtx = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  const refresh = async () => {
    try {
      const me = await api('/auth/me')
      setUser(me?.user || null)
    } catch {
      setUser(null)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    refresh()
  }, [])

  const login = async (email, password) => {
    const res = await api('/auth/login', {
      method: 'POST',
      body: { email, password },
    })
    setUser(res.user)
    return res.user
  }

  const logout = async () => {
    try {
      await api('/auth/logout', { method: 'POST' })
    } finally {
      setUser(null)
    }
  }

  return (
    <AuthCtx.Provider value={{ user, loading, login, logout, refresh }}>
      {children}
    </AuthCtx.Provider>
  )
}

export function useAuth() {
  return useContext(AuthCtx)
}

export function RequireAuth({ children }) {
  const { user, loading } = useAuth()
  const loc = useLocation()
  if (loading) {
    return (
      <div className="min-h-screen bg-bone grid place-items-center">
        <span className="font-mono text-xs tracking-[0.2em] text-ink/60">CHECKING SESSION…</span>
      </div>
    )
  }
  if (!user) return <Navigate to="/login" state={{ from: loc }} replace />
  return children
}
