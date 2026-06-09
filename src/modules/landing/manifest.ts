import type { AppModuleManifest } from '@/modules/core/types'

export const landingModule: AppModuleManifest = {
  id: 'landing',
  title: 'Landing',
  description: 'Public marketing and entry routes.',
  enabledByDefault: true,
  dependencies: ['auth'],
  routes: [{ path: '/', kind: 'page' }],
}
