import type { AppModuleManifest } from '@/modules/core/types'

/**
 * Core config — env, app name, theme.
 *
 * The values are read once at module-load time. `import.meta.env.*` works in
 * Vite. Override via `.env` / `.env.development` / `.env.production`.
 */
export const appConfig = {
  name: import.meta.env.VITE_APP_NAME ?? 'edd-app-vite',
  description:
    import.meta.env.VITE_APP_DESCRIPTION ??
    'Lightweight SPA starter built on Vite + React 19 + Clerk.',
  defaultLocale: import.meta.env.VITE_DEFAULT_LOCALE ?? 'en',
  supportedLocales: ['en', 'es', 'dk'] as const,
} as const

export type AppConfig = typeof appConfig

/**
 * Module manifest for the `core` (kernel) module.
 *
 * The core module is the registry, navigation host, and theme provider.
 * Every other module depends on it.
 */
export const coreModule: AppModuleManifest = {
  id: 'core',
  title: 'Core',
  description: 'Kernel — registry, navigation, providers, and the app shell.',
  enabledByDefault: true,
  routes: [{ path: '/', kind: 'layout' }],
}
