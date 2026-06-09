import { type HTMLAttributes, forwardRef } from 'react'
import { cn } from '@/shared/lib/utils'

export const Card = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(function Card(
  { className, ...rest },
  ref,
) {
  return (
    <div
      ref={ref}
      className={cn('bg-card text-card-foreground rounded-lg border shadow-sm', className)}
      {...rest}
    />
  )
})

export const CardHeader = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  function CardHeader({ className, ...rest }, ref) {
    return <div ref={ref} className={cn('flex flex-col gap-1.5 p-6', className)} {...rest} />
  },
)

export const CardTitle = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  function CardTitle({ className, ...rest }, ref) {
    return (
      <div
        ref={ref}
        className={cn('text-base leading-none font-semibold tracking-tight', className)}
        {...rest}
      />
    )
  },
)

export const CardContent = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  function CardContent({ className, ...rest }, ref) {
    return <div ref={ref} className={cn('p-6 pt-0', className)} {...rest} />
  },
)
