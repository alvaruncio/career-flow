export interface Translation {
  nav: Record<string, string>
  footer: Record<string, string>
  landing: Record<string, string>
  login: Record<string, string>
  language: Record<string, string>
}

export type Locale = 'es' | 'en'
