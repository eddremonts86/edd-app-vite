import { useUser } from '@clerk/clerk-react'
import { useTranslation } from 'react-i18next'
import { Badge } from '@/shared/ui/Badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/Card'

export function DashboardHome() {
  const { t } = useTranslation('dashboard')
  const { user, isLoaded } = useUser()

  if (!isLoaded) {
    return <div className="container py-10 text-muted-foreground">{t('loading')}</div>
  }

  return (
    <div className="container flex flex-col gap-6 py-10">
      <div className="flex flex-col gap-2">
        <Badge variant="secondary" className="w-fit">
          {t('badge')}
        </Badge>
        <h1 className="text-3xl font-semibold tracking-tight">
          {t('greeting', { name: user?.firstName ?? user?.username ?? 'friend' })}
        </h1>
        <p className="text-muted-foreground max-w-prose">{t('intro')}</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>{t('cards.api.title')}</CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground text-sm">{t('cards.api.body')}</CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>{t('cards.i18n.title')}</CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground text-sm">
            {t('cards.i18n.body')}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>{t('cards.modules.title')}</CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground text-sm">
            {t('cards.modules.body')}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
