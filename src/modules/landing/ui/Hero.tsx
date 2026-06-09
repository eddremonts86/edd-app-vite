import { Link } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { Button } from '@/shared/ui/Button'

export function Hero() {
  const { t } = useTranslation('landing')

  return (
    <section className="container flex flex-col items-center gap-6 py-20 text-center">
      <p className="text-muted-foreground text-xs uppercase tracking-widest">{t('eyebrow')}</p>
      <h1 className="max-w-2xl text-4xl font-semibold tracking-tight sm:text-5xl">
        {t('hero.title')}
      </h1>
      <p className="text-muted-foreground max-w-xl text-lg">{t('hero.subtitle')}</p>
      <div className="flex gap-3">
        <Button asChild size="lg">
          <Link to="/dashboard">{t('hero.ctaPrimary')}</Link>
        </Button>
        <Button asChild variant="outline" size="lg">
          <a href="https://github.com/eddremonts86/edd-app-vite" target="_blank" rel="noreferrer">
            {t('hero.ctaSecondary')}
          </a>
        </Button>
      </div>
    </section>
  )
}
