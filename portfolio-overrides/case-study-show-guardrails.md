# Case-Study "Show, Don't Tell" Guardrails

Standard for Hillary's portfolio case studies, derived from a 4-agent Fable panel
that benchmarked them against Carmen Elena's "Pilgrimz" study (2026-07-15). That
study is ~60% visual and pairs every decision with the pixels it produced; the
panel's unanimous verdict was that Hillary's writing is senior but the portfolio
*tells* its rigor and *files away* its evidence.

## The rule

**Every design decision, edge state, or before/after must be paired with the
pixel it produced — real screenshot, recreated mock, or diagram.** Nothing that
is a decision may be described in prose alone.

## Enforced structurally (not just by discipline)

Use the ShowKit primitives in `my-app/src/components/casestudy/ShowKit.tsx`. Their
TypeScript props REQUIRE the visual, so a told-not-shown decision won't compile:

- `DecisionCard` — `{ ai, chose, why, screen }`; `screen` is required (the "AI
  said / I chose / why" pattern with its shipped screen).
- `StateMatrix` — each row requires a `screen`; no edge state described-only.
- `BeforeAfter` — a labeled real-vs-real toggle. NEVER pair a real screen against
  a decorative CSS fake (the Grove wireframe bug); the "before" must be the actual
  prior artifact.
- `AnnotatedShot` — hotspots over a screenshot; the "why" reveals on hover/focus.

When you catch yourself writing a prose table of decisions/states, convert it to a
ShowKit component and supply the screens.

## Interaction + accessibility guardrails (baked into ShowKit)

- Every hover reveal has a **keyboard (focus) + touch (click) fallback**, and
  `AnnotatedShot` also renders all annotations as an always-visible ordered list —
  nothing is hover-only.
- Motion is limited to opacity/transform and is neutralized by the global
  `prefers-reduced-motion` reset in App.css.
- BeforeAfter uses real `role="tab"` semantics; hotspots are real `<button>`s with
  `aria-expanded`/`aria-label`.

## Companion narrative rules (from the same panel)

1. Every case-study hero opens with a **one-line problem→solution hook**; role,
   dates, and method move to the meta strip.
2. **Invert the Disclosures**: hide supporting detail, never the thinking. Buried
   rigor (AI overrides, reframes, stakeholder stories) becomes headings.
3. Outcomes are **capability statements**, not input counts ("no plant is
   identified above its confidence", not "32 respondents"). Keep real numbers,
   subordinate them to what the design now guarantees.
4. Add **one business-literacy sentence** per study (market wedge, revenue call,
   cost/conversion impact) — the one Pilgrimz marker missing across all four.
5. Never invent a metric; never bury a real one. If a number lacks a unit
   (MSK "70%"), state the unit or say "roughly, by the team's own tracking".

See [[project_astryx_integration]] for the design-system posture.
