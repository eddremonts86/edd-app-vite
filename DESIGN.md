# DESIGN.md — tokens, components, layout rules

## Tokens

All design tokens live as CSS variables in `src/shared/styles/globals.css` and are exposed to Tailwind v4 via `@theme inline`. Two themes are shipped: `light` (default) and `dark` (auto-applied via the `.dark` class on `<html>`).

| Token                | Light (oklch)               | Dark (oklch)                | Tailwind class          |
| -------------------- | --------------------------- | --------------------------- | ----------------------- |
| `--background`       | `oklch(1 0 0)`              | `oklch(0.145 0 0)`          | `bg-background`         |
| `--foreground`       | `oklch(0.145 0 0)`          | `oklch(0.985 0 0)`          | `text-foreground`       |
| `--card`             | `oklch(1 0 0)`              | `oklch(0.205 0 0)`          | `bg-card`               |
| `--muted`            | `oklch(0.97 0 0)`           | `oklch(0.269 0 0)`          | `bg-muted`              |
| `--muted-foreground` | `oklch(0.556 0 0)`          | `oklch(0.708 0 0)`          | `text-muted-foreground` |
| `--primary`          | `oklch(0.205 0 0)`          | `oklch(0.922 0 0)`          | `bg-primary`            |
| `--border`           | `oklch(0.922 0 0)`          | `oklch(0.269 0 0)`          | `border-border`         |
| `--destructive`      | `oklch(0.577 0.245 27.325)` | `oklch(0.396 0.141 25.723)` | `bg-destructive`        |
| `--radius`           | `0.5rem`                    | `0.5rem`                    | `--radius-md/lg/xl`     |

**Rule:** never use raw hex / rgb in component code. Read from the tokens so dark mode Just Works™.

## Components

Four primitives ship in `src/shared/ui/`:

- `Button` — variants: `default`, `outline`, `ghost`, `secondary`, `destructive`. Sizes: `sm`, `md`, `lg`, `icon`. Supports `asChild` for `<Link>`-style composition.
- `Card` + `CardHeader` + `CardTitle` + `CardContent` — the standard shadcn trio, in case you want to drop in more from the shadcn CLI later.
- `Badge` — variants: `default`, `secondary`, `outline`, `destructive`.
- `Toaster` — wraps `sileo` with sensible defaults.

Pull more from [shadcn/ui](https://ui.shadcn.com) when you need them. The Tailwind v4 setup is compatible out of the box.

## Layout rules

- **Max content width:** `max-w-6xl`, centered, with `px-4 sm:px-6 lg:px-8` padding. The `.container` utility in `globals.css` does this for you.
- **Vertical rhythm:** section padding is `py-20` for hero, `py-10` for content blocks.
- **Typography scale:** `text-sm` for body, `text-base` for cards, `text-2xl`–`text-3xl` for h1, `text-4xl`–`text-5xl` for landing heroes.
- **Touch targets:** minimum `h-8` for compact buttons, `h-10` for primary actions, `h-11` for landing CTAs.
- **Spacing scale:** stick to Tailwind's default scale (`2`, `4`, `6`, `8`, `10`, `12`, `16`, `20`).

## Dark mode

The `ThemeProvider` in `@/shared/providers` toggles the `.dark` class on `<html>`. The system preference is honored by default. The `<ThemeSwitcher>` component in the topbar flips between `light` and `dark`. Persisted in `localStorage` under `edd-app-vite-theme`.

## Accessibility

- All interactive elements are keyboard-focusable with visible focus rings (`focus-visible:ring-2`).
- Color contrast meets WCAG AA in both themes. If you add a new color, check it.
- All icons are decorative or `aria-label`-ed; never both.
- All form fields have a visible label and a Zod-validated error message.
