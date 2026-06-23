import { create } from 'zustand'
import { api } from '../services/api'
import type { User, AuthResponse, AuthState } from '../interfaces/auth'

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
