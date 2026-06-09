import { defineConfig, devices } from '@playwright/test'
import base from './playwright.config'

/**
 * Local auth config — assumes Clerk dev keys are wired in `.env.local`.
 * Skips the webServer so it can attach to an already-running dev server.
 */
export default defineConfig({
  ...base,
  testDir: './tests/e2e',
  fullyParallel: false,
  workers: 1,
  use: {
    ...base.use,
  },
  webServer: undefined,
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
})
