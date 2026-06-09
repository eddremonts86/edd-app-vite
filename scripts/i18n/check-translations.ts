/**
 * Verify that all locale files ship the same key set.
 *
 * Fails the build if a key is added to one locale and forgotten in another.
 * Run via `pnpm i18n:check`.
 */
import { readFileSync } from 'node:fs'
import { join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = fileURLToPath(new URL('.', import.meta.url))
const ROOT = resolve(__dirname, '../..')
const LOCALES_DIR = join(ROOT, 'src/shared/lib/i18n/locales')

function flatten(obj: unknown, prefix = ''): string[] {
  if (obj === null || typeof obj !== 'object') return [prefix].filter(Boolean)
  return Object.entries(obj as Record<string, unknown>).flatMap(([k, v]) => {
    const next = prefix ? `${prefix}.${k}` : k
    return flatten(v, next)
  })
}

const files = ['en.json', 'es.json', 'dk.json']
const baseline = JSON.parse(readFileSync(join(LOCALES_DIR, files[0]), 'utf8')) as Record<
  string,
  unknown
>
const baselineKeys = new Set(flatten(baseline))

let failed = false
for (const file of files.slice(1)) {
  const data = JSON.parse(readFileSync(join(LOCALES_DIR, file), 'utf8')) as Record<string, unknown>
  const keys = new Set(flatten(data))

  const missing = [...baselineKeys].filter((k) => !keys.has(k))
  const extra = [...keys].filter((k) => !baselineKeys.has(k))

  if (missing.length || extra.length) {
    failed = true
    console.error(`\n✘ ${file} is out of sync with ${files[0]}:`)
    if (missing.length) console.error('  missing:', missing)
    if (extra.length) console.error('  extra:  ', extra)
  } else {
    console.log(`✓ ${file} is in sync (${keys.size} keys)`)
  }
}

if (failed) process.exit(1)
console.log(`\n✓ All ${files.length} locales are in sync.`)
