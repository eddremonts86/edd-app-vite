import { z } from 'zod'

/**
 * Typed env loader. Never read `import.meta.env.X` directly in app code —
 * go through `getEnv()` so the contract is in one place and a missing key
 * fails loudly at boot.
 */
const envSchema = z.object({
  VITE_APP_NAME: z.string().optional(),
  VITE_APP_DESCRIPTION: z.string().optional(),
  VITE_DEFAULT_LOCALE: z.enum(['en', 'es', 'dk']).optional(),
  VITE_CLERK_PUBLISHABLE_KEY: z.string().min(1, 'Missing VITE_CLERK_PUBLISHABLE_KEY'),
  VITE_API_BASE_URL: z.string().url().optional(),
  VITE_SENTRY_DSN: z.string().optional(),
})

const parsed = envSchema.safeParse({
  VITE_APP_NAME: import.meta.env.VITE_APP_NAME,
  VITE_APP_DESCRIPTION: import.meta.env.VITE_APP_DESCRIPTION,
  VITE_DEFAULT_LOCALE: import.meta.env.VITE_DEFAULT_LOCALE,
  VITE_CLERK_PUBLISHABLE_KEY: import.meta.env.VITE_CLERK_PUBLISHABLE_KEY,
  VITE_API_BASE_URL: import.meta.env.VITE_API_BASE_URL,
  VITE_SENTRY_DSN: import.meta.env.VITE_SENTRY_DSN,
})

if (!parsed.success) {
  // eslint-disable-next-line no-console
  console.error('Invalid environment variables:', parsed.error.flatten().fieldErrors)
  throw new Error('Environment validation failed. See console for details.')
}

export const env = parsed.data

/** Sugar for the small handful of places that just need the Clerk key. */
export function getEnv() {
  return {
    clerkPublishableKey: env.VITE_CLERK_PUBLISHABLE_KEY,
    apiBaseUrl: env.VITE_API_BASE_URL,
    sentryDsn: env.VITE_SENTRY_DSN,
  }
}
