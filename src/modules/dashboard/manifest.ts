import type { AppModuleManifest } from '@/modules/core/types'

export const dashboardModule: AppModuleManifest = {
  id: 'dashboard',
  title: 'Dashboard',
  description: 'Signed-in home — first authenticated route.',
  enabledByDefault: true,
  dependencies: ['auth'],
  routes: [{ path: '/dashboard', kind: 'page' }],
}
