import dk from './locales/dk.json'
import en from './locales/en.json'
import es from './locales/es.json'

export const resources = {
  en: { translation: en },
  es: { translation: es },
  dk: { translation: dk },
} as const

export type SupportedLocale = keyof typeof resources
export const SUPPORTED_LOCALES: SupportedLocale[] = ['en', 'es', 'dk']
export const DEFAULT_LOCALE: SupportedLocale = 'en'
