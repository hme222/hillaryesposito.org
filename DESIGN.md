# DESIGN.md

How we decide when the system doesn't answer the question. This is not the
design system — that's `tokens/tokens.json`,
`.designpowers/house-style/voice-spec.md`, and
`design-docs/design-system/registry.md`. This file is for the handful of
things that stay true no matter how those three grow.

Test for whether something belongs here: does it change when you add a
component? If yes, it belongs on the shelf (the files above), not in this one.

## Locked
- Semantic color tokens. Never a raw hex — new colors go through
  `tokens/tokens.json`, not a one-off literal (see `.claude/rules/tokens.md`).
- Type scale and spacing scale (App.css `--type-*`, `--space-*`, `--measure*`).
  A new value needs a real reason the scale doesn't cover, not a one-off px.
- WCAG AA contrast on every text/background pair — already enforced once
  (see the `--accent-warm`/`--on-accent` comments in App.css); don't
  reintroduce a value that breaks it.
- Voice register and hard bans in `voice-spec.md`. Headlines never cliffhang;
  copy is cut before it's added, not padded (see CLAUDE.md).
- One canonical domain (hillaryesposito.org) and the per-route metadata
  discipline already in place (title = who, description = what + proof,
  unique OG/canonical per route) — don't fork a page's metadata without
  the same rigor `scripts/prerender-routes.mjs` already applies.

## Conditional
- A new component in an existing family (the MSK visualization set, Grove's
  case-study set-pieces, the Decision trio) is allowed only after checking
  `registry.md` for why the existing siblings don't already cover it.
- The `fashion-system-page`'s local palette may merge into the global tokens
  only as a deliberate decision, not a find-and-replace — see
  `tokens/drift-audit.md`.

## Open
- Adopting `ai-interface-patterns` / `voice-interaction-design` vocabulary —
  additive, no approval needed; it names things, it doesn't change a locked
  rule.
- Motion treatment for AI-generated content — still evolving per
  `.designpowers/house-style/taste-profile.md`; each use is its own call,
  not a precedent for the next one.

## Deprecated
None yet. Several components are marked `unused — verify before removing`
in `registry.md` — that's a narrower, more honest claim than deprecated;
see there rather than assuming removal is decided.

> TODO: this file stays short on purpose. Add a category only when a real
> disagreement or a repeated correction forces the question — don't
> pre-populate it to look complete.
