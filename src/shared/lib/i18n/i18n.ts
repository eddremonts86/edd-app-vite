import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import HttpBackend from 'i18next-http-backend'
import { initReactI18next } from 'react-i18next'
import { DEFAULT_LOCALE, resources, SUPPORTED_LOCALES } from '@/shared/lib/i18n/locales'

let initialized = false
let initPromise: Promise<typeof i18n> | null = null

/**
 * Initialize i18next once per app boot. Safe to call multiple times.
 *
 * Resolution order: explicit `lng` from the caller → `localStorage` →
 * `navigator.language` → DEFAULT_LOCALE.
 */
export function initI18n(lng?: string) {
  if (initialized) {
    return Promise.resolve(i18n)
  }
  if (initPromise) {
    return initPromise
  }

  initPromise = i18n
    .use(HttpBackend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      resources,
      lng: lng ?? undefined,
      fallbackLng: DEFAULT_LOCALE,
      supportedLngs: SUPPORTED_LOCALES,
      load: 'languageOnly',
      debug: false,
      interpolation: { escapeValue: false },
      detection: {
        order: ['localStorage', 'navigator'],
        caches: ['localStorage'],
        lookupLocalStorage: 'edd-app-vite-locale',
      },
      react: { useSuspense: false },
    })
    .then(() => {
      initialized = true
      return i18n
    })

  return initPromise
}

export { i18n }
export * from './locales'
