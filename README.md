# edd-app-vite

Lightweight SPA starter built on **Vite + React 19 + Clerk**, with an opinionated modular structure, a typed contract end-to-end, and zero database.

This is the SPA-only sibling of [`edd-app-template`](https://github.com/eddremonts86/edd-app-template) — same skeleton, same rules, no SSR, no Postgres, no server functions. Use this when the app is small enough that a TanStack Start monolith would be overkill.

## Quick start

```bash
npx @edd_remonts/create-edd-app-vite my-product
cd my-product
cp .env.example .env.local            # fill in VITE_CLERK_PUBLISHABLE_KEY
pnpm dev                              # http://localhost:3000
```

Or clone this repo directly:

```bash
git clone https://github.com/eddremonts86/edd-app-vite.git my-product
cd my-product
pnpm install
cp .env.example .env.local
pnpm dev
```

## What's inside

| Layer        | Choice                                                   |
| ------------ | -------------------------------------------------------- |
| Build        | **Vite 8** (pure SPA, no SSR plugin)                     |
| Framework    | **React 19** + **TypeScript 6** strict                   |
| Routing      | **TanStack Router** (file-based, client-side)            |
| Data         | **TanStack Query** + **TanStack Form** + **Zod**         |
| Auth         | **Clerk** (client-only, no Better Auth, no DB)           |
| UI           | **Tailwind v4** + Radix + hand-rolled primitives         |
| i18n         | **i18next** with **EN / ES / DK** shipped                |
| Tests        | **Vitest** (unit) + **Playwright** (E2E)                 |
| Quality gate | **ESLint** + **Prettier** + **Husky** + **lint-staged**  |
| Deploy       | Static host (Netlify / Cloudflare Pages / Vercel static) |

## Architecture

All feature code lives under `src/modules/<name>/`. Each module is self-contained and ships a `manifest.ts` that auto-registers into the navigation registry.

```
src/
├── modules/
│   ├── core/          # kernel — registry, navigation, config
│   ├── auth/          # Clerk wrappers, RequireAuth guard
│   ├── landing/       # public marketing routes
│   └── dashboard/     # signed-in home
├── routes/            # file-based routes (TanStack Router)
├── shared/            # i18n, providers, ui, lib
│   ├── lib/           # api client, env, utils, i18n
│   ├── providers/     # ThemeProvider, etc.
│   ├── ui/            # Button, Card, Badge, Toaster, …
│   └── styles/        # globals.css (Tailwind v4)
├── App.tsx
├── main.tsx
└── router.tsx
```

**Hard rule:** cross-module imports go through the module's `index.ts` barrel. No deep imports — `@/modules/auth/ui/RequireAuth` is forbidden, use `@/modules/auth`.

## Commands

| Want to…                 | Run                         |
| ------------------------ | --------------------------- |
| Boot dev                 | `pnpm dev`                  |
| Type-check               | `pnpm type-check`           |
| Lint / format            | `pnpm lint` · `pnpm format` |
| Run unit tests           | `pnpm test`                 |
| Run E2E                  | `pnpm test:e2e`             |
| Verify i18n parity       | `pnpm i18n:check`           |
| Full pre-commit gate     | `pnpm validate`             |
| Build                    | `pnpm build`                |
| Preview production build | `pnpm preview`              |

Husky + lint-staged runs prettier + eslint --fix on every commit. Don't bypass with `--no-verify` unless explicitly asked.

## Conventions

- **Conventional commits** (`feat:`, `fix:`, `docs:`, `chore:`, `refactor:`, scoped where useful).
- **No business logic in routes** — routes are thin adapters; logic lives in modules.
- **All user-visible strings via `t('key')`** — no hardcoded UI text.
- **Env access via the typed `env` object** (`@/shared/lib/env`) — never `import.meta.env.X` directly in components.

## Where to look first

- [`SPEC.md`](./SPEC.md) — acceptance criteria, tech stack, boundaries.
- [`PRODUCT.md`](./PRODUCT.md) — what this template is for (and what it isn't).
- [`DESIGN.md`](./DESIGN.md) — design tokens, components, layout rules.
- [`CLAUDE.md`](./CLAUDE.md) — orientation for AI agents.

## Publishing a new version of `create-edd-app-vite`

See [`tools/create-edd-app-vite/README.md`](./tools/create-edd-app-vite/README.md).

## License

MIT
