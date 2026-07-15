# Astryx Integration Posture (Hillary's Portfolio)

Reference for design-lead, design-builder, and design-system-alignment when
implementing UI in this repo. Derived from a 3-agent Designpowers panel
(design-strategist, design-lead, accessibility-reviewer) that evaluated Astryx
v0.1.5 against the existing portfolio and Hillary's taste profile on 2026-07-14.

## One-line posture

**Astryx is infrastructure, not aesthetic.** Adopt its primitives, plumbing, and
a11y-correct interactive components. Hand-author every color / type / radius
token. Keep the signature moments and the editorial identity fully custom. Never
lean on Astryx defaults — they drift toward the "corporate / SaaS template"
anti-references in the taste profile.

## Hard gates (must clear before ANY Astryx component ships)

- `@astryxdesign/core` peer-requires **React >= 19** and **`@stylexjs/stylex ^0.19`**.
  The app is on **React 18.3.1 + CRA**, which does not support StyleX without
  ejecting or migrating (Vite/Next). Adopting core = React 19 upgrade +
  StyleX toolchain + likely leaving CRA. Only `@astryxdesign/cli` is installed
  today (docs/scaffolding only — no runtime components).
- Astryx is app/dashboard-first: its layout archetypes are Tracker / Console /
  Messaging / Media / Settings. A portfolio is a "plain content column
  (marketing)" in its own docs — a conceded, secondary use, not its center.

## Adopt (a11y-safe, low identity risk)

- **Layout primitives** — `Grid` (responsive `columns={{minWidth,max}}`),
  `Section` (page regions — explicitly NOT Card), `Stack`, `Divider`.
- **`Dialog`** for the Recruiter slide-out — native `<dialog>` + `showModal()`;
  its focus capture/restore matches our hardened RecruiterPill pattern and adds
  IME-safe Escape + an `escapeStack`. Equal-or-better than current.
- **`TextInput` + `FieldStatus`** for the password gate — auto-wires
  `aria-invalid` / `aria-describedby`. (Refocus-after-error stays our logic.)
- **`AppShell`** — gives a `<main>` + automatic skip-to-content link we don't
  currently have. Pure upside; confirm skip-link focus styling once themed.
- **Spacing + motion tokens** — `prefers-reduced-motion` is baked into shared
  component classes system-wide (not per-component opt-in).
- **`Tooltip`** (`focusTrigger:'auto'` = hover + keyboard), `Skeleton`, `Spinner`,
  form controls (`Field`, `TextArea`) for a contact form.

## Adapt (structure/plumbing from Astryx, behavior stays ours)

- **Theming** — reproduce the warm-editorial + matcha-honey palette via explicit
  `defineTheme` `[light, dark]` token tuples, NOT the `neutralStyle` accent
  wizard (single-accent; can't express the 3-tier palette). Map: `--bg`→
  `--color-background-body`, `--fg`→`--color-text-primary`, `--olive-2`/
  `--accent-warm`→`--color-accent` (already WCAG-tuned). Override the ~10
  categorical status colors or avoid the components that expose them.
- **Typography** — load Optima (body) + Switzer (heads) via `typography.*.url`.
  Astryx's scale is geometric/stepped; keep our fluid `clamp()` hero scale and
  the large-screen root-font-size locks (1500/1900/2400px) CUSTOM.
- **`MobileNav`** — native-`<dialog>` drawer out-does our hand-rolled `inert`
  toggle, BUT our drawer mixes nav links + theme/lang toggles + resume; re-verify
  tab order when non-nav controls go in (LOW–MED risk; don't drop-in swap).
- **`TopNav`/`TopNavItem`** — `isSelected`→`aria-current="page"` plumbing is
  useful, but it's `href`-first; our same-page scroll nav uses `<button>`s to
  avoid router interception. Use the `as` prop / swizzle, don't adopt unmodified.
- **Motion** — keep `--ease-spring` (overshoot) as a project token for the one
  flourish-per-project; use Astryx `--ease-standard`/`--duration-*` for the rest.

## Keep custom (Astryx has no equivalent — forcing it REGRESSES)

- **`WorkflowKnot`** three.js hero/nav — no canvas/WebGL primitive exists.
  Island it: fight "no raw div" exactly once, at the hero, and comment why.
- **`JumpNav` scroll-spy** — IntersectionObserver + `aria-current="location"`.
  TabList implies single-panel switching (wrong ARIA); MED–HIGH regression if
  forced. Keep as-is.
- **EN/ES i18n** (`useT()`, `SpanishCaseStudy`), `lang` switching — no Astryx
  localization story.
- **The editorial voice, the recruiter panel's content contract, curated
  `/curated/:slug` routes, the one-off gradient/tilt/stagger flourishes** — these
  are what keep the site from reading as a generic AI prototype.

## Non-negotiables to preserve through any rebuild

WorkflowKnot hero · Optima/Switzer + fluid clamp type · matcha-honey dark mode ·
EN/ES i18n · the 6 hardened a11y features (inert drawer, password focus,
recruiter focus-trap, jump-nav scroll-spy, reduced-motion, landmarks/lang) ·
the hand-tuned WCAG contrast fixes (`--accent-warm` ≈4.5:1).

## Using the best parts of Astryx WITHOUT adopting it

Astryx's value here is ~80% ideas + a11y patterns, ~20% runtime components — and
the React 19 / StyleX / off-CRA migration cost is almost entirely about that 20%.
So extract the 80% natively into the existing React 18 app, zero dependency:

1. **Native `<dialog>` + `showModal()` pattern** (the single biggest win). Reimplement
   in ~40 lines: replaces BOTH `focus-trap-react` in RecruiterPill AND the hand-rolled
   `inert` toggle in Navbar. Gives browser-native background inertness, focus
   capture/restore, IME-safe Escape, and an escapeStack for nested overlays.
2. **Skip-to-content link** — AppShell gives it free; natively it's one
   `<a class="skip-link" href="#main">` + a focus style. We currently have none.
3. **Token architecture** — keep our tokens but adopt Astryx's discipline: semantic
   names, `light-dark()` pairing, no raw hex/px in components.
4. **Reduced-motion as one global rule** on shared animated classes, not per-component.
5. **Form a11y auto-wiring** convention (aria-invalid/describedby) — already mostly done.
6. **Layout primitives** — Stack/Grid/Section are ~15 lines of CSS each as tiny local
   components if the ergonomics are wanted; not worth a dependency.
7. **The CLI as a design advisor** — keep `@astryxdesign/cli` installed purely as an
   oracle: `npx astryx docs layout|color|motion|spacing`, `astryx build "<idea>"`,
   `astryx component <Name>` are pure knowledge, usable without importing anything.

Recommended first step: port the native-`<dialog>` pattern into the live app.

## Color/contrast caveat

Astryx documents `light-dark()` semantic tokens but guarantees no WCAG ratio per
pairing; the ~10 categorical family tokens are 20%-alpha overlays whose effective
contrast depends on the surface behind them. Spot-check every pairing in both
modes, same as any hand-rolled palette.
