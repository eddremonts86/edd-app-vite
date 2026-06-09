# CLAUDE.md — orientation for AI agents

> **Audience:** Claude Code, Codex, Copilot, and any other LLM-driven agent dropped into this repository.
> **Goal:** give the agent enough context in one screen to start doing useful, safe work.

---

## What this is

`edd-app-vite` is the lightweight SPA starter for the edd-app family. Same skeleton, same rules as `edd-app-template`, but pure SPA: no SSR, no database, no server functions. Use it when the app is small enough that a TanStack Start monolith would be overkill.

The authoritative product / scope documents are:

- [`README.md`](README.md) — what's inside, how to bootstrap, scripts reference.
- [`SPEC.md`](SPEC.md) — acceptance criteria, tech stack, boundaries.
- [`PRODUCT.md`](PRODUCT.md) — what this template is for (and what it isn't).
- [`DESIGN.md`](DESIGN.md) — design tokens, components, layout rules.

Always read SPEC.md before changing behavior — it documents constraints that aren't visible from the code.

---

## Tech stack at a glance

- **Runtime:** Vite 8 + React 19 + TypeScript 6 strict. Pure SPA, no SSR.
- **Routing:** TanStack Router, file-based (`src/routes/`).
- **State / data:** TanStack Query + TanStack Form + Zod.
- **Auth:** Clerk (client-only via `@clerk/clerk-react`).
- **UI:** Tailwind v4 + Radix + hand-rolled primitives in `@/shared/ui`.
- **i18n:** i18next with EN + ES + DK.
- **Testing:** Vitest (unit) + Playwright (E2E).
- **Quality:** ESLint + Prettier + Husky + lint-staged.

---

## Module architecture

All feature code lives under `src/modules/<name>/`. Each module is self-contained and ships:

- `manifest.ts` — exports an `AppModuleManifest` that auto-registers into the navigation registry.
- `ui/` — React components.
- `index.ts` — barrel, the only public surface for the module.

Active modules: `core` (kernel), `auth` (Clerk), `landing` (public), `dashboard` (signed-in home).

**Hard rule:** cross-module imports go through the module's `index.ts` barrel. No deep imports — `@/modules/auth/ui/RequireAuth` is forbidden, use `@/modules/auth`.

---

## Commands you'll actually use

| Want to…             | Run                                                    |
| -------------------- | ------------------------------------------------------ |
| Boot dev             | `pnpm dev` — Vite on port 3000                         |
| Type-check           | `pnpm type-check`                                      |
| Lint / format        | `pnpm lint` · `pnpm format`                            |
| Run all unit tests   | `pnpm test`                                            |
| Run E2E (Playwright) | `pnpm test:e2e`                                        |
| Full pre-commit gate | `pnpm validate` — type + lint + prettier + i18n + unit |
| Build                | `pnpm build`                                           |
| Preview production   | `pnpm preview`                                         |

Husky + lint-staged runs prettier + eslint --fix on every commit. Don't bypass with `--no-verify` unless explicitly asked.

---

## Source of truth before you "fix" something

- **Scripts:** `package.json` — not the README. Update both when you add one.
- **Modules:** `src/modules/<name>/manifest.ts` — not the README.
- **Env vars:** `.env.example` is the single source of truth for required variables. Add new ones there, then read them via the typed `env` object in `@/shared/lib/env`.

---

## Conventions to respect

- **Conventional commits** (`feat:`, `fix:`, `docs:`, `chore:`, `refactor:`, scoped where useful — `docs(readme):`, `feat(auth):`).
- **No business logic in routes** — routes are thin adapters; logic lives in modules.
- **All user-visible strings via `t('key')`** — no hardcoded UI text.
- **Env access via the typed `env` object** — never `import.meta.env.X` directly in components.

---

## Things to ask the user before doing

- Adding a new dev dependency to the template.
- Changing the supported locales set.
- Switching or disabling the auth provider.
- Touching `tools/create-edd-app-vite/` — that's the npm package, releases go through `pnpm release`.

---

## Differences vs `edd-app-template`

| Has                                   | edd-app-template | edd-app-vite |
| ------------------------------------- | :--------------: | :----------: |
| Vite + React + TS strict              |        ✓         |      ✓       |
| Tailwind v4 + shadcn-style primitives |        ✓         |      ✓       |
| TanStack Router (client)              |        ✓         |      ✓       |
| TanStack Query + Form + Zod           |        ✓         |      ✓       |
| Vitest + Playwright                   |        ✓         |      ✓       |
| i18n (EN/ES/DK)                       |        ✓         |      ✓       |
| Modular architecture + manifests      |        ✓         |      ✓       |
| TanStack Start (SSR + server fns)     |        ✓         |      —       |
| PostgreSQL + Drizzle ORM              |        ✓         |      —       |
| Better Auth (dual mode)               |        ✓         |      —       |
| Multi-provider AI + RAG (ChromaDB)    |        ✓         |      —       |
| Docker / dev containers               |        ✓         |      —       |
| Clerk (client-only)                   |        —         |      ✓       |

If you need any of the "—" rows above, use `edd-app-template` instead.
