import { coreNavigation } from '@/modules/core/navigation'
import type { AppModuleManifest } from '@/modules/core/types'

/**
 * The `auth` module is a thin wrapper around Clerk. It owns the topbar
 * `AuthControls`, a `<RequireAuth>` route guard, and exposes a navigation
 * section that is always visible (signed in or not).
 */
export const authModule: AppModuleManifest = {
  id: 'auth',
  title: 'Auth',
  description: 'Clerk authentication — sign in / sign up, user button, route guards.',
  enabledByDefault: true,
  dependencies: ['core'],
  routes: [],
  navigation: coreNavigation,
}
