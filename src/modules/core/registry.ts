import { authModule } from '@/modules/auth'
import { coreModule } from '@/modules/core/config'
import type { AppModuleManifest, SidebarRuntimeSection } from '@/modules/core/types'
import { dashboardModule } from '@/modules/dashboard'
import { landingModule } from '@/modules/landing'
import { i18n } from '@/shared/lib/i18n'

const manifests: AppModuleManifest[] = [coreModule, authModule, landingModule, dashboardModule]

/** All registered module manifests in declaration order. */
export function getModuleManifests(): AppModuleManifest[] {
  return manifests
}

/** Look up a module by id, or undefined. */
export function getModule(id: string): AppModuleManifest | undefined {
  return manifests.find((m) => m.id === id)
}

/**
 * Build the sidebar sections for the current locale, translated.
 *
 * This is intentionally a pure function over the registry so it can be called
 * from any component (sidebar, mobile menu, etc.) and react to i18n changes
 * without a re-mount.
 */
export function buildSidebarSections(): SidebarRuntimeSection[] {
  return manifests
    .flatMap((m) => m.navigation ?? [])
    .sort((a, b) => a.order - b.order)
    .map((section) => ({
      title: section.title,
      order: section.order,
      items: section.items
        .slice()
        .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
        .map((item) => ({
          title: i18n.t(item.titleKey, { defaultValue: item.fallbackTitle }),
          url: item.to,
          icon: item.icon,
          onClick: item.onClick,
        })),
    }))
}
