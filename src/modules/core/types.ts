import type { Icon } from '@tabler/icons-react'
import type { ComponentType, ReactNode } from 'react'

export type AppModuleRouteKind = 'page' | 'layout' | 'api'
export type ModuleNavigationKind = 'main' | 'secondary'

export interface AppModuleRouteDefinition {
  path: string
  kind: AppModuleRouteKind
}

export interface AppModuleNavigationItem {
  id: string
  titleKey: string
  fallbackTitle: string
  icon: Icon
  to?: string
  onClick?: () => void
  order?: number
  /** Set to true to require the user to be signed in. Defaults to false. */
  requiresAuth?: boolean
}

export interface AppModuleNavigationSection {
  id: string
  title: string
  kind: ModuleNavigationKind
  order: number
  items: AppModuleNavigationItem[]
}

export interface AppModuleManifest {
  id: string
  title: string
  description: string
  enabledByDefault?: boolean
  dependencies?: string[]
  tags?: string[]
  routes: AppModuleRouteDefinition[]
  navigation?: AppModuleNavigationSection[]
}

export interface SidebarRuntimeItem {
  title: string
  url?: string
  icon: Icon
  onClick?: () => void
  badge?: ReactNode
}

export interface SidebarRuntimeSection {
  title: string
  order: number
  items: SidebarRuntimeItem[]
}

export interface LoadedModule {
  manifest: AppModuleManifest
  // Reserved for future server-side hooks; intentionally unused in the SPA build.
  Component?: ComponentType
}
