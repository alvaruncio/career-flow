export interface Application {
  id: string
  company: string
  position: string
  location?: string
  status: 'applied' | 'interview' | 'offer' | 'hired' | 'rejected'
  notes?: string
  createdAt: string
}

export interface ApplicationsState {
  applications: Application[]
  isLoading: boolean
  error: string | null
  fetchApplications: () => Promise<void>
  addApplication: (app: Omit<Application, 'id' | 'createdAt'>) => Promise<void>
  updateApplication: (id: string, data: Partial<Application>) => Promise<void>
  deleteApplication: (id: string) => Promise<void>
}
