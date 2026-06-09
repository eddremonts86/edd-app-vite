# PRODUCT.md — what this template is for

## The pitch

`edd-app-vite` is the smallest sensible opinion for a React SPA that needs auth, a typed contract, and an end-to-end quality gate, but doesn't need a back-end.

If you find yourself writing `useEffect` to fetch from a public API, storing user state in `localStorage`, and thinking "do I really need a Postgres for this?" — this is the template.

## The anti-pitch (when NOT to use this)

- **You need a database.** Use `edd-app-template` and Drizzle.
- **You need server-side rendering for SEO.** Use Next.js, or `edd-app-template` with TanStack Start.
- **You need server functions (RSC, server actions, anything that runs on the server).** Use TanStack Start.
- **You need to compute heavy things off the client.** Use a worker, a Cloudflare Worker, or `edd-app-template`.
- **You need anything other than Clerk for auth.** Use `edd-app-template` and wire Better Auth, or build your own.
- **You need to run AI locally with RAG.** Use `edd-app-template`.

## Personas

### Solo dev shipping a side project

You want:

- One `git clone` and you're running.
- TypeScript that doesn't surprise you.
- A landing page that looks good without you designing it.
- Clerk to handle the sign-in flow so you don't.
- Tests you can actually run, not ceremony.

You get all of that. Deploy to Netlify in 30 seconds.

### Small team, 1–3 engineers

You want:

- A modular structure so two people can land features without colliding.
- A quality gate so PRs don't rot.
- An i18n pipeline that doesn't make adding Spanish a research project.
- A clear path to grow: if the app needs a DB later, migrate to `edd-app-template`.

You get all of that.

### Agency / studio scaffolding client work

You want:

- `npx @edd_remonts/create-edd-app-vite` and start the timer.
- A known shape so you can hand off to a junior and they have a chance.
- The escape hatch: if the client outgrows the SPA, the migration to `edd-app-template` is the same repo with more `pnpm add` and some `server.fn.ts` extraction.

You get all of that.

## Tone

- **Confident but not preachy.** The template makes choices; it doesn't argue.
- **Boring where boring is right.** Tailwind, TanStack Query, Zod. Nothing exotic.
- **Opinionated about structure, liberal about implementation.** The folder layout is the law; the contents are yours.
- **Honest about limits.** The SPEC.md and CLAUDE.md say plainly what this is and what it isn't. If a feature belongs in `edd-app-template`, it doesn't ship here.

## Anti-references

We are NOT building:

- A "low-code" platform. This is a developer starter.
- A Vite plugin ecosystem. We use Vite, we don't extend it.
- A UI kit. We ship four primitives (Button, Card, Badge, Toaster) and call it done. Pull in shadcn if you want more.
- An opinion about data fetching libraries. We chose TanStack Query because it's the best for the job. Don't @ us.
- An SSR emulator. If you want SSR, use TanStack Start. Period.
