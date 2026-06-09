import { IconLayoutDashboard } from '@tabler/icons-react'
import type { AppModuleNavigationSection } from '@/modules/core/types'

export const coreNavigation: AppModuleNavigationSection[] = [
  {
    id: 'main',
    title: 'Main',
    kind: 'main',
    order: 0,
    items: [
      {
        id: 'dashboard',
        titleKey: 'nav.dashboard',
        fallbackTitle: 'Dashboard',
        icon: IconLayoutDashboard,
        to: '/dashboard',
        order: 0,
        requiresAuth: true,
      },
    ],
  },
]
