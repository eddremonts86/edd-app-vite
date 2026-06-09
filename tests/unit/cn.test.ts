import { describe, expect, it } from 'vitest'
import { cn } from '@/shared/lib/utils'

describe('cn (className helper)', () => {
  it('merges Tailwind classes with later classes winning', () => {
    expect(cn('p-2', 'p-4')).toBe('p-4')
  })

  it('handles falsy values', () => {
    expect(cn('a', false, null, undefined, 'b')).toBe('a b')
  })

  it('returns empty string for no inputs', () => {
    expect(cn()).toBe('')
  })
})
