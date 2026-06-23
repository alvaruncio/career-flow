import type { RequestOptions } from '../interfaces/api'

const API_BASE = '/api'

export class ApiError extends Error {
  status: number

  constructor(status: number, message: string) {
    super(message)
    this.name = 'ApiError'
    this.status = status
  }
}

function getToken(): string | null {
  try {
    const stored = localStorage.getItem('auth')
    if (stored) {
      const parsed = JSON.parse(stored)
      return parsed.state?.token ?? null
    }
  } catch {
    return null
  }
  return null
}

export async function apiRequest<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
  const token = getToken()
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...options.headers,
  }

  if (token) {
    headers['Authorization'] = `Bearer ${token}`
  }

  const response = await fetch(`${API_BASE}${endpoint}`, {
    method: options.method ?? 'GET',
    headers,
    body: options.body ? JSON.stringify(options.body) : undefined,
  })

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: 'Error de conexión' }))
    throw new ApiError(response.status, errorData.message || 'Error del servidor')
  }

  const data = await response.json()
  return data as T
}

export const api = {
  get: <T>(endpoint: string) => apiRequest<T>(endpoint),
  post: <T>(endpoint: string, body: unknown) => apiRequest<T>(endpoint, { method: 'POST', body }),
  put: <T>(endpoint: string, body: unknown) => apiRequest<T>(endpoint, { method: 'PUT', body }),
  patch: <T>(endpoint: string, body: unknown) => apiRequest<T>(endpoint, { method: 'PATCH', body }),
  delete: <T>(endpoint: string) => apiRequest<T>(endpoint, { method: 'DELETE' }),
}
