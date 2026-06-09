import { useEffect, useState, type ReactNode } from 'react'
import { ThemeContext } from '@/shared/providers/ThemeContext'

type Theme = 'dark' | 'light' | 'system'

const STORAGE_KEY = 'edd-app-vite-theme'

function applyTheme(resolved: 'dark' | 'light') {
  if (typeof document === 'undefined') return
  document.documentElement.classList.toggle('dark', resolved === 'dark')
}

function systemPrefersDark(): boolean {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-color-scheme: dark)').matches
}

export function ThemeProvider({
  children,
  defaultTheme = 'system',
  storageKey = STORAGE_KEY,
}: {
  children: ReactNode
  defaultTheme?: Theme
  storageKey?: string
}) {
  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof window === 'undefined') return defaultTheme
    return (localStorage.getItem(storageKey) as Theme) ?? defaultTheme
  })

  // System preference lives in its own state so the media query listener can
  // update it without forcing the consumer to handle the change.
  const [systemPref, setSystemPref] = useState<'dark' | 'light'>(() =>
    systemPrefersDark() ? 'dark' : 'light',
  )

  // Subscribe to system theme changes only when `theme === 'system'`.
  useEffect(() => {
    if (theme !== 'system' || typeof window === 'undefined') return
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    const handler = (e: MediaQueryListEvent) => {
      setSystemPref(e.matches ? 'dark' : 'light')
    }
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [theme])

  // Persist on every theme change. No setState here, only side effects.
  useEffect(() => {
    if (typeof window === 'undefined') return
    localStorage.setItem(storageKey, theme)
  }, [theme, storageKey])

  const resolvedTheme: 'dark' | 'light' = theme === 'system' ? systemPref : theme

  useEffect(() => {
    applyTheme(resolvedTheme)
  }, [resolvedTheme])

  return (
    <ThemeContext.Provider value={{ theme, setTheme: setThemeState, resolvedTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}
