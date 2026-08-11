# Anti-Patterns

Derived on: 2026-08-11
Source: existing Riso portfolio reviews, current rendered curated-page template, and the Supabase recruiter audit; this is an existing category/system extension, so no new blank-brief derivation was needed
Review trigger: 2026-11-11 or a material model/system change

@ban-regex: (?i)\b(seamless|leverage|elevate|cutting-edge|game-chang(?:e|ing)|unlock)\b
@ban-regex: (?i)\b(functional beta|shipped consumer app|production product)\b
@max-radius-values: 12
@max-font-size-values: 40
@max-hardcoded-colors: 32

@visual-tell: A custom company-brand skin that replaces Hillary's established editorial identity.
@visual-tell: Repeated rounded cards with equal weight and no evidence priority.
@visual-tell: A full first mobile viewport that contains positioning but no result.
@visual-tell: Three or more generic CTA labels that ask the recruiter to choose before seeing proof.

## Positive replacements
- Instead of a Supabase imitation, use the existing Riso split hero with one accessible green accent.
- Instead of card soup, use the existing proof field, ordered work list, and ruled editorial sections.
- Instead of fit-first prose, put one result in the hero and render proof before the fit explanation.
- Instead of generic actions, use `Review Grove`, `View Supabase résumé`, and `Email Hillary`.

## Approved exceptions
- Existing non-Supabase curated pages retain their current default CTA and section order. The optional Supabase fields do not rewrite those pages.
