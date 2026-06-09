import { type HTMLAttributes, forwardRef } from 'react'
import { cn } from '@/shared/lib/utils'

export type BadgeVariant = 'default' | 'secondary' | 'outline' | 'destructive'

const variantClasses: Record<BadgeVariant, string> = {
  default: 'bg-primary text-primary-foreground',
  secondary: 'bg-secondary text-secondary-foreground',
  outline: 'text-foreground border',
  destructive: 'bg-destructive text-destructive-foreground',
}

export interface BadgeProps extends HTMLAttributes<HTMLDivElement> {
  variant?: BadgeVariant
}

export const Badge = forwardRef<HTMLDivElement, BadgeProps>(function Badge(
  { className, variant = 'default', ...rest },
  ref,
) {
  return (
    <div
      ref={ref}
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold',
        variantClasses[variant],
        className,
      )}
      {...rest}
    />
  )
})
