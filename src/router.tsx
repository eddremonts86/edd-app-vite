import { createRouter } from '@tanstack/react-router'
import { routeTree } from '@/routeTree.gen'

// Set up a Router instance with the generated route tree.
// The router's `context` is supplied at render-time via <RouterProvider> in
// `App.tsx` — that lets the QueryClient (created inside <App>) be threaded
// through to every loader without leaking the instance globally.
export const router = createRouter({
  routeTree,
  defaultPreload: 'intent',
  defaultPreloadStaleTime: 0,
  scrollRestoration: true,
})

// Register the router instance for type safety.
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}
