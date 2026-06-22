import { create } from 'zustand'
import { api } from '../services/api'

interface User {
  id: string
  email: string
  name?: string
}

interface AuthResponse {
  user: User
  token: string
}

interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<void>
  register: (email: string, password: string, name?: string) => Promise<void>
  logout: () => void
  setAuth: (user: User, token: string) => void
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,

  login: async (email: string, password: string) => {
    const data = await api.post<AuthResponse>('/auth/login', { email, password })
    set({ user: data.user, token: data.token, isAuthenticated: true })
  },

  register: async (email: string, password: string, name?: string) => {
    const data = await api.post<AuthResponse>('/auth/register', { email, password, name })
    set({ user: data.user, token: data.token, isAuthenticated: true })
  },

  logout: () => {
    set({ user: null, token: null, isAuthenticated: false })
  },

  setAuth: (user: User, token: string) => {
    set({ user, token, isAuthenticated: true })
  },
}))
