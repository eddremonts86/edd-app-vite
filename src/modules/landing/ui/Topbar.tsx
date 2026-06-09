import { Link } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { AuthControls } from '@/modules/auth'
import { appConfig } from '@/modules/core/config'
import { Button } from '@/shared/ui/Button'
import { LanguageSwitcher } from '@/shared/ui/LanguageSwitcher'
import { ThemeSwitcher } from '@/shared/ui/ThemeSwitcher'

export function Topbar() {
  const { t } = useTranslation('landing')

  return (
    <header className="border-border/60 bg-background/80 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-40 w-full border-b backdrop-blur">
      <div className="container flex h-14 items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-2 text-sm font-semibold">
          {appConfig.name}
        </Link>
        <nav className="flex items-center gap-2">
          <LanguageSwitcher />
          <ThemeSwitcher />
          <Button asChild variant="ghost" size="sm">
            <Link to="/">{t('nav.home')}</Link>
          </Button>
          <AuthControls />
        </nav>
      </div>
    </header>
  )
}
