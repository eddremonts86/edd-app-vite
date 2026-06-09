import { SignedIn, SignedOut } from '@clerk/clerk-react'
import type { ReactNode } from 'react'

/**
 * Convenience wrapper around Clerk's <SignedIn> / <SignedOut> with explicit
 * auth="required" / "optional" naming.
 */
export function RequireAuth({ children }: { children: ReactNode }) {
  return (
    <>
      <SignedIn>{children}</SignedIn>
      <SignedOut>
        <div className="flex min-h-[40vh] items-center justify-center">
          <p className="text-muted-foreground">You need to sign in to view this page.</p>
        </div>
      </SignedOut>
    </>
  )
}
