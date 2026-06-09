import { describe, expect, it } from 'vitest'
import { appConfig } from '@/modules/core/config'
import { getModule, getModuleManifests } from '@/modules/core/registry'
import { SUPPORTED_LOCALES } from '@/shared/lib/i18n'

describe('module registry', () => {
  it('registers the four core modules', () => {
    const ids = getModuleManifests().map((m) => m.id)
    expect(ids).toEqual(['core', 'auth', 'landing', 'dashboard'])
  })

  it('looks up modules by id', () => {
    expect(getModule('auth')?.title).toBe('Auth')
    expect(getModule('nope')).toBeUndefined()
  })
})

describe('app config', () => {
  it('ships 3 supported locales', () => {
    expect(SUPPORTED_LOCALES).toEqual(['en', 'es', 'dk'])
    expect(appConfig.supportedLocales).toEqual(['en', 'es', 'dk'])
  })
})
