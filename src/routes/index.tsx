import { createFileRoute } from '@tanstack/react-router'
import { Hero } from '@/modules/landing'

export const Route = createFileRoute('/')({
  component: LandingPage,
})

function LandingPage() {
  return <Hero />
}
