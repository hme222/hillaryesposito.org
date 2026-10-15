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

## Two accidental duplicates, still unresolved

`#C68A2E`/`#c68a2e` and `#BC5A78`/`#bc5a78` each appear once in different
casing — almost certainly the same color typed twice. Left for you to confirm
which file/casing is correct rather than guessing.
