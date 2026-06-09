import { createFileRoute } from '@tanstack/react-router'
import { RequireAuth } from '@/modules/auth'
import { DashboardHome } from '@/modules/dashboard'

export const Route = createFileRoute('/dashboard')({
  component: DashboardRoute,
})

function DashboardRoute() {
  return (
    <RequireAuth>
      <DashboardHome />
    </RequireAuth>
  )
}
