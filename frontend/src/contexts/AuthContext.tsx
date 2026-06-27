import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'
import axios from 'axios'
import { api, setAccessToken } from '../services/api'
import type { User } from '../interfaces/auth'

const API_BASE = '/api/v1'

interface AuthContextType {
  user: User | null
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  register: (name: string, email: string, password: string) => Promise<void>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function init() {
      try {
        const refreshRes = await axios.post(
          `${API_BASE}/auth/refresh`,
          {},
          { withCredentials: true },
        )
        const newToken = refreshRes.data.accessToken as string
        setAccessToken(newToken)

        const meRes = await api.get<{ user: User }>('/auth/me')
        setUser(meRes.user)
      } catch {
        setAccessToken(null)
        setUser(null)
      } finally {
        setLoading(false)
      }
    }
    init()
  }, [])

  const login = async (email: string, password: string) => {
    const res = await api.post<{ accessToken: string; user: User }>('/auth/login', { email, password })
    setAccessToken(res.accessToken)
    setUser(res.user)
  }

  const register = async (name: string, email: string, password: string) => {
    const res = await api.post<{ accessToken: string; user: User }>('/auth/register', { name, email, password })
    setAccessToken(res.accessToken)
    setUser(res.user)
  }

  const logout = async () => {
    try {
      await api.post('/auth/logout', {})
    } finally {
      setAccessToken(null)
      setUser(null)
    }
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth debe usarse dentro de AuthProvider')
  }
  return context
}
