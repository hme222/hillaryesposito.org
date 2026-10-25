# Design-taste fix round

## Problem

The portfolio's risograph language is memorable, but repeated eyebrow labels, rules, grids, shadows, and identical project rows make the presentation feel more system-generated than intentionally art-directed. At 768px, the MSK hero also holds its desktop split too long, collapsing the headline and evidence into a narrow rail.

## Audience

Healthcare product-design recruiters and hiring managers scanning for workflow judgment, evidence quality, and truthful ownership. The same path must remain usable for keyboard, screen-reader, zoom, reduced-motion, low-vision, and cognitively overloaded readers.

## Approved direction: evidence-first restraint

- Keep the painted cartography, red/green palette, typography hierarchy, real artifacts, case-study content, routes, and recruiter path.
- Make metadata read like editorial context instead of interface badges.
- Let each flagship preview use a composition suited to its evidence: MSK balanced, Grove artifact-led, Knowunity flow-led.
- Flatten portfolio chrome around product artifacts so the artifact, not the frame, carries the visual weight.
- Remove decorative sequencing and redundant kickers; retain provenance, evidence boundaries, attribution, and disclosure controls.

## Constraints

- Do not invent evidence, metrics, research, ownership, or product screens.
- Do not change claims, case-study order, navigation, language routes, or interaction behavior.
- Add no dependency or generated asset.
- Keep product-interface recreations semantically identified as interface fragments.

## Success criteria

- The MSK hero becomes a clear title-first stack at 768px, with its artifact below rather than beside a narrow text rail.
- The homepage's three flagship previews are compositionally distinct at 1440px and collapse to one coherent column at 390px.
- Visible micro-labels, decorative numbering, grid-paper treatments, shadows, and separator rules are materially reduced on Home and MSK.
- No horizontal overflow or clipped evidence at 1440px, 768px, or 390px.
- Existing accessibility tests, unit tests, and production build pass; reduced-motion behavior remains unchanged.

## Out of scope

New portfolio claims or imagery, a full recut of supporting cases, replacement of the global risograph identity, and changes to published project evidence.

## Final verification — 2026-10-25

- Strict inspector: Home 0 FAIL / 4 WARN; MSK 0 FAIL / 5 WARN across 1440px, 768px, and 390px.
- Visual review: all generated fold and full-page captures reviewed; no clipped evidence, horizontal overflow, or broken responsive hierarchy.
- Accessibility/regression suite: 231/231 tests pass, including axe-backed flagship checks.
- Design-system registry: regenerated after the evidence-field structure changed and rechecked as current.
- Dark mode: late strict-cleanup tokens have explicit dark-theme counterparts; reconstructed product UI retains its light interface canvas.
- Accepted warnings: the optional homepage opener is not forced into the recruiter scan; MSK deliberately uses privacy-safe recreated workflow artifacts instead of stock people/clinical footage; the cream flag matches light-on-dark type; remaining mobile size/alignment notices are warning-only and visually intact.
