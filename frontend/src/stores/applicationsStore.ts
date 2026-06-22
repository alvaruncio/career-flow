import { create } from 'zustand'
import { api } from '../services/api'

interface Application {
  id: string
  company: string
  position: string
  location?: string
  status: 'applied' | 'interview' | 'offer' | 'hired' | 'rejected'
  notes?: string
  createdAt: string
}

interface ApplicationsState {
  applications: Application[]
  isLoading: boolean
  error: string | null
  fetchApplications: () => Promise<void>
  addApplication: (app: Omit<Application, 'id' | 'createdAt'>) => Promise<void>
  updateApplication: (id: string, data: Partial<Application>) => Promise<void>
  deleteApplication: (id: string) => Promise<void>
}

export const useApplicationsStore = create<ApplicationsState>((set) => ({
  applications: [],
  isLoading: false,
  error: null,

  fetchApplications: async () => {
    set({ isLoading: true, error: null })
    try {
      const data = await api.get<Application[]>('/applications')
      set({ applications: data, isLoading: false })
    } catch (err) {
      set({ error: (err as Error).message, isLoading: false })
    }
  },

  addApplication: async (app) => {
    set({ isLoading: true, error: null })
    try {
      const data = await api.post<Application>('/applications', app)
      set(state => ({ applications: [...state.applications, data], isLoading: false }))
    } catch (err) {
      set({ error: (err as Error).message, isLoading: false })
    }
  },

  updateApplication: async (id, data) => {
    set({ isLoading: true, error: null })
    try {
      const updated = await api.patch<Application>(`/applications/${id}`, data)
      set(state => ({
        applications: state.applications.map(a => a.id === id ? updated : a),
        isLoading: false,
      }))
    } catch (err) {
      set({ error: (err as Error).message, isLoading: false })
    }
  },

  deleteApplication: async (id) => {
    set({ isLoading: true, error: null })
    try {
      await api.delete(`/applications/${id}`)
      set(state => ({
        applications: state.applications.filter(a => a.id !== id),
        isLoading: false,
      }))
    } catch (err) {
      set({ error: (err as Error).message, isLoading: false })
    }
  },
}))
