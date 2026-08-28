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

## ✕ Excluded — deliberately fixed-color, not theme tokens

Both have code comments confirming intent; changing these to `var(--fg)`/`var(--bg)` would break them, not fix them.

- **`portfolio-cohesion.css` `.site-footer__base`** (`#f5efe6` on `#12120f`) — the file's own comment: *"Fixed near-black in BOTH themes: --fg/--bg invert with the theme, which would turn the black band white in dark mode... colors are set here rather than in the editorial sheet."*
- **`riso-page.css` `.rp-dispatch__stat`** (`#f5efe6` on `#12120f`) — same pattern, confirmed by the dark-mode rule that explicitly re-asserts the identical value instead of inheriting: the callout is meant to look the same in both themes.

**Trigger to revisit:** only if the design intent behind either component changes — not a scheduled task.

## ✕ Excluded — coincidental match, different system

**`App.css` `.fashion-system-page`** (`--fashion-label`, `--fashion-action`, and the `.fashion-artifact--editorial` gradient) uses `#3d5a1e`, `#d9a55e`, and `#15120c` — numerically identical to `--olive-3`, dark `--olive-2`, and dark `--bg`. But this block defines its own bespoke local palette (`--fashion-paper`, `--fashion-bone`, `--fashion-stone`, `--fashion-espresso`, `--fashion-oxblood`, `--fashion-gold`, …) for what reads as a self-contained case-study demo composition, not the portfolio's own theme. Folding it into the global tokens would couple a demo artifact's colors to the real brand palette on a coincidence.

**Reason for exclusion:** different semantic system, matching value looks accidental.
**Trigger to revisit:** ask before merging — if it turns out `--fashion-label`/`--fashion-action` really is meant to track the site's olive tokens, that's a one-line change, but it's a decision, not a find-and-replace.

## ✕ Excluded — Riso illustration palette

`riso-page.css` alone contributes roughly 150 of the ~184 unique hex values in
this codebase — mostly single-occurrence, closely-related dark greens and
creams for the Weekend Journal Riso-print art piece. Reusable-system tokens
they are not.

**Reason for exclusion:** one-off illustration values, not decision points.
**Trigger to revisit:** if the same green/cream family gets deliberately reused
in a second piece, promote the 3–5 repeating values into `color.global` then.

## Two accidental duplicates, still unresolved

`#C68A2E`/`#c68a2e` and `#BC5A78`/`#bc5a78` each appear once in different
casing — almost certainly the same color typed twice. Left for you to confirm
which file/casing is correct rather than guessing.
