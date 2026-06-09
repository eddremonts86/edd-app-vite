import { useTranslation } from 'react-i18next'
import { SUPPORTED_LOCALES, type SupportedLocale } from '@/shared/lib/i18n'
import { cn } from '@/shared/lib/utils'

const flagByLocale: Record<SupportedLocale, string> = {
  en: '🇬🇧',
  es: '🇪🇸',
  dk: '🇩🇰',
}

export function LanguageSwitcher({ className }: { className?: string }) {
  const { i18n } = useTranslation()

  return (
    <div className={cn('flex items-center gap-1', className)}>
      {SUPPORTED_LOCALES.map((locale) => (
        <button
          key={locale}
          type="button"
          aria-label={`Switch to ${locale}`}
          aria-pressed={i18n.resolvedLanguage === locale}
          onClick={() => {
            void i18n.changeLanguage(locale)
          }}
          className={cn(
            'rounded-md px-2 py-1 text-base transition-opacity hover:opacity-100',
            i18n.resolvedLanguage === locale ? 'opacity-100' : 'opacity-50',
          )}
        >
          {flagByLocale[locale]}
        </button>
      ))}
    </div>
  )
}
