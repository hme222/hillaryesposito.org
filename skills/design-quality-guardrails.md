# Design Quality Guardrails

Use these guardrails alongside the Designpowers workflow when doing UX, UI,
motion, or content design work in this portfolio.

## Anti-Generic UX Protocol

Before recommending or building a pattern:

1. Resolve the context first: mobile, tablet, desktop, keyboard, touch, and
   reduced-motion states.
2. Check how mature products solve the same pattern when the work is large
   enough to justify reference gathering.
3. Present or implement the proven path unless there is a strong reason to take
   a bolder path.
4. If choosing a bolder path, name the tradeoff clearly: what improves, what
   becomes riskier, and who may be underserved.

## Default Failure Modes To Avoid

Do not default to:

- A modal for every secondary action.
- A spinner when a skeleton, inline state, or optimistic response would be
  clearer.
- Empty states that only say "no data yet" without a next action.
- Centered hero stacks for every page.
- Generic cards repeated until the page feels templated.
- Decorative motion that does not teach hierarchy, state, or relationship.

When one of these patterns is still the right choice, state why.

## Conflict Resolution Order

When UX principles collide, decide in this order:

1. Task frequency: optimize the thing users do most often.
2. Error cost: add friction where mistakes are expensive, regulated, or hard to
   undo.
3. Emotional state: reduce cognitive load when users are stressed, uncertain, or
   under time pressure.

Examples:

- Progressive disclosure vs discoverability: show the frequent path, disclose
  the rare path.
- Speed vs safety: speed up reversible actions, slow down risky ones.
- Delight vs clarity: clarity wins unless delight directly improves confidence
  or comprehension.

## Design-System-Is-Law

If an existing design system, token file, component pattern, or visual language
exists, read it before inventing anything new.

- Use existing tokens before adding values.
- Use existing components before creating variants.
- Put uniqueness into composition, scale, sequencing, art direction, imagery, or
  interaction behavior, not random new colors or one-off UI chrome.
- Add a new token or component only when it removes real complexity or solves a
  repeated need.
- For typography/system refinements, prefer stricter type tokens and scoped
  end-of-file overrides before invasive component rewrites. This keeps the
  experience more product-native while avoiding destabilizing mature layouts.

## Banned As Defaults

These are not forbidden forever, but they are banned as lazy defaults:

- Purple or blue-purple gradient hero sections.
- Glassmorphism as the main aesthetic.
- Serif plus gradient plus centered hero stack as the default "premium" look.
- Timid type scales where nothing has a clear focal point.
- Emoji as UI icons.
- Hand-drawn custom SVG icons when an established icon family exists.
- Brandless layouts that could be shipped unchanged by a competitor.

If using any of these, the rationale must be explicit.

## Distinct Direction Requirement

For ambiguous visual work, generate or consider three genuinely different
directions before converging:

1. Conservative: safest fit with the existing system.
2. Editorial or expressive: stronger point of view.
3. Product-native: most usable and systematic.

Each direction needs one signature element. Do not render a bold direction
timidly.

## Asset Sourcing Hierarchy

Prefer assets in this order:

1. User-owned real assets already in the repo.
2. Generated assets when the user asks for custom visuals and copyright risk is
   low.
3. Licensed stock or illustration libraries with clear usage rights.
4. Self-made SVG/CSS/canvas work only when it can meet the craft bar honestly.

Document any asset assumptions and avoid embedding unclear third-party assets.

## Verification Expectations

Before calling design work done:

- Build or render the work.
- Screenshot the actual output at the relevant responsive locks.
- Critique the pixels, not just the code.
- Check dark mode when the touched surface exists in dark mode.
- Confirm keyboard/focus behavior for interactive changes.
- Respect `prefers-reduced-motion` for motion or animation changes.

For this portfolio, use the three responsive locks unless the task needs more:

- Mobile: 390px
- Mid-size: 900px
- Desktop: 1440px
