import { ClerkProvider } from '@clerk/clerk-react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { RouterProvider } from '@tanstack/react-router'
import { useState } from 'react'
import { router } from '@/router'
import { getEnv } from '@/shared/lib/env'
import { ThemeProvider } from '@/shared/providers/ThemeProvider'
import { Toaster } from '@/shared/ui/Toaster'

export function App() {
  const env = getEnv()
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60_000,
            refetchOnWindowFocus: false,
            retry: 1,
          },
        },
      }),
  )

  return (
    <ClerkProvider publishableKey={env.clerkPublishableKey}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider defaultTheme="system" storageKey="edd-app-vite-theme">
          <RouterProvider router={router} />
          <Toaster />
        </ThemeProvider>
        <ReactQueryDevtools initialIsOpen={false} buttonPosition="bottom-left" />
      </QueryClientProvider>
    </ClerkProvider>
  )
}
