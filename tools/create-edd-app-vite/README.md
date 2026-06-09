# create-edd-app-vite

Bootstrap a new project from [`edd-app-vite`](https://github.com/eddremonts86/edd-app-vite) — a lightweight SPA starter built on Vite + React 19 + Clerk, with no database, no SSR, and a typed contract end-to-end.

## Usage

```bash
npx @edd_remonts/create-edd-app-vite my-product
```

This command clones the starter, removes git history, renames `package.json` to your app name, and installs dependencies.

## Options

```bash
npx @edd_remonts/create-edd-app-vite my-product --no-install
npx @edd_remonts/create-edd-app-vite my-product --branch main
npx @edd_remonts/create-edd-app-vite my-product --template https://github.com/eddremonts86/edd-app-vite.git
npx @edd_remonts/create-edd-app-vite my-product --package-manager pnpm
```

## Local test

```bash
node ./bin/create-edd-app-vite.mjs demo-app --no-install
```

## Releasing a new version

The release script lives in the template repo at `scripts/release/create-edd-app-vite-release.mjs`. From the template root:

```bash
pnpm release
```

The script will:

1. Check your working tree is clean.
2. Prompt for bump type (`patch` / `minor` / `major`) or an explicit version.
3. Bump the version in `tools/create-edd-app-vite/package.json`.
4. Create a commit: `chore(create-edd-app-vite): bump version to X.Y.Z`.
5. Create an annotated tag: `create-edd-app-vite-vX.Y.Z`.
6. Push the branch and tag to `origin`.
7. Optionally create a GitHub Release (requires the `gh` CLI).

GitHub Actions then publishes `@edd_remonts/create-edd-app-vite` to npm automatically.

You can also pass the bump type directly to skip the interactive prompt:

```bash
pnpm release patch     # 0.1.0 → 0.1.1
pnpm release minor     # 0.1.0 → 0.2.0
pnpm release major     # 0.1.0 → 1.0.0
pnpm release 1.0.0-rc.1  # explicit pre-release
```

Monitor the publish run:
<https://github.com/eddremonts86/edd-app-vite/actions>

### CI validation rules

- Tag must match `package.json` version exactly: `create-edd-app-vite-v<version>`.
- Publish is silently skipped if that version already exists on npm.
- All publishes use npm provenance (`--provenance`).

### Manual publish (emergency only)

```bash
cd tools/create-edd-app-vite
npm publish --access public --provenance
```

## Why this exists

The full `create-edd-app` ships a TanStack Start monolith with a database. This package is the SPA-only sibling for apps that don't need either: the Vite + Clerk baseline, i18n, modular structure, and the test gate, with zero Postgres, zero SSR, and zero server functions.
