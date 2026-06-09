import { Toaster as SileoToaster } from 'sileo'

/**
 * Toast wrapper. Sileo ships with sensible defaults; this is just a
 * typed re-export so the rest of the app imports from `@/shared/ui`.
 */
export function Toaster() {
  return <SileoToaster position="top-right" />
}
