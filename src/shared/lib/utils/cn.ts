import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Tailwind-aware className combiner. Use this everywhere instead of
 * `clsx` alone so conflicting Tailwind classes are merged correctly
 * (e.g. `cn('p-2', 'p-4')` → `'p-4'`).
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
