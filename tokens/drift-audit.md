# Token drift audit

_Generated 2026-08-27 by scanning `my-app/src/styles/*.css` for raw hex literals against `tokens.json`, then reading the actual surrounding code for every match before calling anything "drift." Re-run after any `:root` change — it goes stale otherwise._

**Correction:** the first pass of this audit (grep counts only) over-reported 23
values as drift. Most of those counts were the token *definitions* themselves,
or hex already correctly wrapped in `var(--token, #fallback)`. Reading the
context around every match dropped that to two real fixes. That's the accurate
version below.

## ✔ Fixed

| File | Was | Now | Why |
|---|---|---|---|
| `App.css` `.hero-btn` (light) | `color: #0a0a0a` | `color: var(--fg)` | Exact match to `--fg`. Button text on the olive gradient just needed the dark-text token, not a fresh literal. |
| `App.css` `.dark-mode .hero-btn` | `color: #1a0e03 !important` | `color: var(--on-accent) !important` | Exact match to `--on-accent`, which App.css:122 defines specifically as *"Buttons on accent backgrounds use dark text for WCAG."* This is the token's exact intended use — it just wasn't wired up. |

## ✔ Consolidated — coral on fixed dark panels (2026-10-09)

| Files | Was | Now | Why |
|---|---|---|---|
| `flagship-case-study.css` — 9 sites (`.fp-cinemaCore span` / `> i`, `.fp-receipt__copy .rp-kicker`, `.fp-receipt__rail span`, `.fp-receipt__token` border + color, `.fp-roleRail__method summary:focus-visible`, `.rp-override .fp-workSplit span` / `.fp-journalLine`) and `riso-page.css` — 6 sites (`.rp-cinema__bridge .rp-kicker`, `.rp-override .rp-kicker` / `.rp-notif__tag` / `.rp-decisionRecord dt`, `.rp-outcomeStage .rp-kicker`, `.rp-routeRecap i`, `.dark-mode .rp-deepDive > summary span`) | `#ff8a78` and `#ff8171` typed as literals | `var(--coral-on-dark)` = `#ff8171`, defined in `portfolio-cohesion.css` `:root`, exported as `color.semantic.fixed.coral-on-dark` | Two hexes, one job: coral text and accents on stages that stay dark in both themes (`--coral` flips with the theme and measured 1.87–2.35:1 there). `#ff8171` kept because it was the majority value and the one previously measured (~4.96:1 median on `.rp-outcomeStage`); computed 5.7:1 on the `#17321b` override panel. `#ff8a78` → `#ff8171` is a sub-perceptual shift. Re-measured on rendered pixels after the swap (Playwright + real Chrome, background sampled behind the glyphs, both themes): MSK `.rp-outcomeStage` kicker and route arrows 4.56–4.87:1, Grove `.rp-override` kickers and `dt`s 5.26–5.71:1, MSK `.rp-override` kicker 5.71:1 — median 5.26:1 across 23 samples, none below 4.5. |

**Trigger to revisit:** only if a fixed-dark stage gets a lighter background — re-measure before lightening the token.

## ✕ Excluded — deliberately fixed-color, not theme tokens

Both have code comments confirming intent; changing these to `var(--fg)`/`var(--bg)` would break them, not fix them.

- **`portfolio-cohesion.css` `.site-footer__base`** (`#f5efe6` on `#12120f`) — the file's own comment: *"Fixed near-black in BOTH themes: --fg/--bg invert with the theme, which would turn the black band white in dark mode... colors are set here rather than in the editorial sheet."*
- **`riso-page.css` `.rp-dispatch__stat`** (`#f5efe6` on `#12120f`) — same pattern, confirmed by the dark-mode rule that explicitly re-asserts the identical value instead of inheriting: the callout is meant to look the same in both themes.

**Trigger to revisit:** only if the design intent behind either component changes — not a scheduled task.

## ✕ Excluded — Riso illustration palette

`riso-page.css` alone contributes roughly 150 of the ~184 unique hex values in
this codebase — mostly single-occurrence, closely-related dark greens and
creams for the Weekend Journal Riso-print art piece. Reusable-system tokens
they are not.

**Reason for exclusion:** one-off illustration values, not decision points.
**Trigger to revisit:** if the same green/cream family gets deliberately reused
in a second piece, promote the 3–5 repeating values into `color.global` then.

## Contrast pass — label sizes and fixed panels (2026-10-15)

No new tokens. Recorded so the next audit doesn't re-flag these.

| File | Change | Why |
|---|---|---|
| `riso-page.css` `.rp-outcomeStage` | Gradient start `#264529` → `#1c3520` (one-off illustration value, not a token) | `--coral-on-dark` kickers measured 4.39:1 on the old start and 3.92:1 inside the coral glow. Rendered pixels after: median 5.75:1, 5th percentile 4.64–4.91:1 on Grove, Logistics, Knowunity, UX Woman, and Mobbin. The only pixels under 4.5 sit on the decorative 1px ring hairlines. |
| `flagship-case-study.css` `.fp-cinemaCore span` | `var(--coral-on-dark)` → `color-mix(var(--fp-light) 86%, transparent)` | This span is now exposed to assistive tech (Logistics), and the label reads as stage ink. Measured 5.4–6.9:1. It drops out of the coral-on-dark consolidation above. |
| `flagship-case-study.css` `.fp-receipt__node span` | `rgba(244,241,230,.55)` → `color-mix(var(--fp-light) 82%, var(--fp-deep-2))` | Solid label ink on the fixed MSK panel. 8.79:1. |
| `riso-page.css` `.rp-decisionRecord dt` | `var(--coral)` → `var(--coral-text)` | Raw coral at label size. 4.96:1 light, 11.46:1 dark. |
| `riso-page.css` `.rp-demoCard h4` / `p` (dark) | Pinned `#20241c` / `#45503f` under `.dark-mode` | Fixed cream card (see the demo palette note). App.css `.dark-mode h4/p` painted light text on it. 13.93:1 / 7.50:1. |

## Design-value cleanup (2026-10-15)

Invisible to visitors: every swap below resolves to the same computed value.
Checked with full-page captures of all 9 routes (EN/ES, 390/1440,
light/dark, plus open disclosures, tabs, toggles, recruiter panel, settings
popover, glossary tooltip) against two baselines; remaining pixel
differences are font-rasterization and hero-video noise that also appear
between the two baselines.

### New tokens

| Token | Value | Where | Replaced |
|---|---|---|---|
| `--mint-on-dark` | `#a9d28f` | `portfolio-cohesion.css` `:root` | 10 literals + 2 `rgba(169,210,143,α)` in `riso-page.css` / `flagship-case-study.css` |
| `--ink-on-dark` | `#f4f1e6` | `portfolio-cohesion.css` `:root` | 14 literals + 46 `rgba(244,241,230,α)`; `--fp-light` now points at it |
| `--status-ready` / `-bg` / `-edge` | `#4f6d1f` / `#edf5dc` / `#7aa02f` | `App.css` `:root` | MSK queue chip + row edge |
| `--status-review` / `-bg` / `-edge` | `#8a5a00` / `#fff2ce` / `#c98a2b` | `App.css` `:root` | same |
| `--status-filed` / `-bg` / `-edge` | `#315a75` / `#deeff8` / `#4f88a8` | `App.css` `:root` | same |
| dark `--status-*` / `-bg` | `#d8f1a3`, `#ffd889`, `#b9dcf0` on `rgba(91,123,45,.34)`, `rgba(186,128,63,.28)`, `rgba(85,128,151,.3)` | `App.css` `.dark-mode` | the three `.dark-mode .msk-dashboard-status--*` rules (deleted) |
| `--grove-amber` / `--grove-rose` | `#c68a2e` / `#bc5a78` | `riso-page.css` `.riso-page` | resolves the casing duplicates below |

Alphas use `color-mix(in srgb, var(--token) N%, transparent)`, which
computes to the same rgba.

### Resolved: the two casing duplicates

`#C68A2E`/`#c68a2e` and `#BC5A78`/`#bc5a78` were the same colours: Grove's
"Due amber" and "Overdue rose" (the hexes `GroveSystemLab.tsx` displays as
swatches, where uppercase is display text and stays). The CSS now reads
`var(--grove-amber)` / `var(--grove-rose)`.

### `--rp-coral` (recruiter panel)

`#bd3828` light / `#ff8c82` dark were exactly `--shell-coral` in both themes,
so `--rp-coral` is now `var(--shell-coral)` and the `.dark-mode
.recruiter-panel` override is gone. Same computed colours, so no exception
is needed.

### Other bindings

- Radius: `--radius-sm` → `--r-plate` (both 4px); `--radius-md`/`--radius-xl`
  deleted (no users); literal `4px`/`3px` corners → `--r-plate`/`--r-control`.
  `--radius-lg` (12px, one use on `.msk-systemmap`) stays: no `--r-*` match.
- Motion: 18 durations of exactly `0.2s` → `var(--dur-fast)`. No `0.34s`
  durations existed (the two `340ms` are delays).
- Spacing: five section clamps that were exact copies of `--sp-md`,
  `--sp-lg`, `--sp-2xl` now use the tokens.

### Left literal, on purpose

- **`color: #fff` sites** (`App.css` recruiter buttons and
  `.msk-dashboard-action--primary`; `riso-page.css` `.rp-quote cite`,
  `.rp-override .rp-acc__next`, `.rp-neutral`, the Grove demo button). The
  only white tokens are `--on-coral`/`--on-green`, which flip to `#14150e`
  in dark mode, and `--footer-icon-*`, which mean something else. Binding
  would change dark-mode colour or the meaning.
- **Repeated durations with no exact token:** `0.3s`/`.3s` (4 rules),
  `140ms` (4, the Weekend Dispatch reveal), `220ms` (3), `320ms` (3),
  `120ms` (2). Candidates for a `--dur-*` step if motion gets a pass.
- **Radius `10px` (3 uses) and `16px` (2):** no token at those values.
- **Spacing clamps** that sit between tokens (e.g. `clamp(2.5rem, 6vw,
  6rem)`, 6px off `--sp-lg` at 1440). Card-level `clamp(.7rem, 1.8vw,
  1.1rem)` repeats 3 times but is component padding, not section spacing.

**Trigger to revisit:** any change to `--dur-fast`, `--r-plate`, or the
fixed dark stages' backgrounds.
