# SPEC.md — what edd-app-vite is

## In scope

- Pure SPA: Vite + React 19 + TypeScript 6 strict.
- Client-side routing with TanStack Router (file-based).
- Clerk for authentication. No other auth providers.
- i18n with three locales shipped: EN, ES, DK.
- Typed API client (axios) pointed at any external HTTP endpoint via `VITE_API_BASE_URL`.
- Static content loaded via `import.meta.glob` or `fetch` — no database of any kind.
- Modular architecture: `src/modules/<name>/` with a manifest that auto-registers into the sidebar.
- Quality gate: type-check + lint + prettier + i18n parity + unit tests on every commit.
- Static deploy to any static host (Netlify config included, but Vercel / Cloudflare Pages / S3+CDN all work).

## Out of scope (use edd-app-template for these)

- Server-side rendering of any kind.
- Server functions, server actions, or any back-end in the same repo.
- Any database (PostgreSQL, SQLite, IndexedDB persistence, KV stores, etc.).
- Auth providers other than Clerk.
- AI / RAG / ChromaDB.
- Multi-tenant data models or row-level security.
- Docker dev containers (the SPA is small enough to run directly with Vite).
- Email sending, webhooks, background jobs, cron.

## Acceptance criteria

A consumer app derived from this template MUST be able to:

1. `pnpm install && pnpm dev` and see a working landing page on `http://localhost:3000` within 30 seconds on a clean machine.
2. `pnpm validate` passes with zero warnings: type-check, lint, prettier, i18n parity, unit tests.
3. `pnpm build` produces a `dist/` directory that can be served from any static host with the included `netlify.toml` SPA redirect.
4. `pnpm test:e2e` runs Playwright against a live dev server and the landing + i18n tests pass with no real Clerk account.
5. Adding a new module is a copy-paste job: drop a folder under `src/modules/`, add a `manifest.ts`, register it in `src/modules/core/registry.ts`, ship.
6. `pnpm i18n:check` fails the build if any key is added to one locale and forgotten in another.
7. `pnpm release` (from the template root) bumps `tools/create-edd-app-vite/package.json`, tags `create-edd-app-vite-vX.Y.Z`, and pushes — CI publishes to npm with provenance.

## Tech stack boundaries

- **Build:** Vite 8. No Webpack. No Rollup custom config unless absolutely necessary.
- **Language:** TypeScript 6 strict. No `any` outside generated files. `verbatimModuleSyntax: false` is the one relaxation, to keep interop with shadcn-style JSX ergonomics.
- **Routing:** TanStack Router. File-based via `@tanstack/router-plugin`. No React Router, no Next.js.
- **State / data:** TanStack Query for server state. TanStack Form for forms. Zod for validation. No Redux, no Zustand for global state — use Query's cache.
- **Auth:** `@clerk/clerk-react`. The publishable key is the only env var; sign-in / sign-up are Clerk-hosted modals.
- **UI:** Tailwind v4 with CSS-variable theming (light + dark). Radix primitives for any interactive widget that needs accessibility for free. Hand-rolled components in `@/shared/ui` for the basics.
- **i18n:** i18next with `localStorage` persistence and `navigator` fallback. Three locales are committed: `en`, `es`, `dk`. Adding a fourth is a single file drop + one line in `locales.ts`.
- **Tests:** Vitest for unit, Playwright for E2E. The E2E suite assumes a live dev server; the CI config boots one via `webServer`.
- **Quality:** ESLint flat config, Prettier, Husky pre-commit, lint-staged.

## Bootstrapping a new app

```bash
npx @edd_remonts/create-edd-app-vite my-product
cd my-product
cp .env.example .env.local            # add VITE_CLERK_PUBLISHABLE_KEY
pnpm install
pnpm dev
```

The CLI clones the template, removes git history, renames `package.json` to your app name, and installs dependencies.

## Versioning policy

The template follows SemVer. Breaking changes to the public surface (`@/modules`, `@/shared`) require a major bump. New modules / new shared primitives are minor. Tooling-only changes (ESLint config, Husky hooks) are patch.
