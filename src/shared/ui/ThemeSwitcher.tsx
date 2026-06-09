import { IconMoon, IconSun } from '@tabler/icons-react'
import { useTheme } from '@/shared/providers'
import { Button } from '@/shared/ui/Button'

export function ThemeSwitcher() {
  const { resolvedTheme, setTheme } = useTheme()
  const isDark = resolvedTheme === 'dark'

  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label="Toggle theme"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
    >
      {isDark ? <IconSun className="size-4" /> : <IconMoon className="size-4" />}
    </Button>
  )
}
