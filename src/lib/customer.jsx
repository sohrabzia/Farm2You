import { createContext, useContext, useEffect, useState } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { api } from './api.js'

const CustomerCtx = createContext(null)

export function CustomerProvider({ children }) {
  const [customer, setCustomer] = useState(null)
  const [loading, setLoading] = useState(true)

  const refresh = async () => {
    try {
      const me = await api('/customer/me')
      setCustomer(me?.customer || null)
    } catch {
      setCustomer(null)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { refresh() }, [])

  const login = async (phone, password) => {
    const res = await api('/customer/login', { method: 'POST', body: { phone, password } })
    setCustomer(res.customer)
    return res.customer
  }

  const signup = async (data) => {
    const res = await api('/customer/signup', { method: 'POST', body: data })
    setCustomer(res.customer)
    return res.customer
  }

  const logout = async () => {
    try { await api('/customer/logout', { method: 'POST' }) } finally { setCustomer(null) }
  }

  return (
    <CustomerCtx.Provider value={{ customer, loading, login, signup, logout, refresh }}>
      {children}
    </CustomerCtx.Provider>
  )
}

export function useCustomer() { return useContext(CustomerCtx) }

export function RequireCustomer({ children }) {
  const { customer, loading } = useCustomer()
  const loc = useLocation()
  if (loading) return <div className="min-h-[60vh] grid place-items-center text-ink/60 text-sm font-mono tracking-[0.2em]">LOADING…</div>
  if (!customer) return <Navigate to="/account/login" state={{ from: loc }} replace />
  return children
}
