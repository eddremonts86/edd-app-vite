import { Outlet, createRootRoute } from '@tanstack/react-router'
import { Topbar } from '@/modules/landing'

export const Route = createRootRoute({
  component: RootLayout,
})

function RootLayout() {
  return (
    <div className="min-h-dvh">
      <Topbar />
      <main>
        <Outlet />
      </main>
    </div>
  )
}
