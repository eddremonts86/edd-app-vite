import { SignInButton, SignUpButton, UserButton, useUser } from '@clerk/clerk-react'
import { IconUserCircle } from '@tabler/icons-react'
import { useTranslation } from 'react-i18next'
import { Button } from '@/shared/ui/Button'

/**
 * Auth controls shown in the topbar. Renders a Sign in / Sign up pair for
 * anonymous users and the Clerk <UserButton /> for signed-in users.
 */
export function AuthControls() {
  const { t } = useTranslation('auth')
  const { isSignedIn, isLoaded } = useUser()

  if (!isLoaded) {
    return null
  }

  if (!isSignedIn) {
    return (
      <div className="flex items-center gap-2">
        <SignInButton mode="modal">
          <Button variant="ghost" size="sm">
            <IconUserCircle className="mr-1 size-4" />
            {t('signIn')}
          </Button>
        </SignInButton>
        <SignUpButton mode="modal">
          <Button size="sm">{t('signUp')}</Button>
        </SignUpButton>
      </div>
    )
  }

  return (
    <UserButton
      afterSignOutUrl="/"
      appearance={{
        elements: {
          avatarBox: 'size-8',
        },
      }}
    />
  )
}
