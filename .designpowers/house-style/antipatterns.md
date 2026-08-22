# Anti-Patterns

Derived on: 2026-08-11
Source: existing Riso portfolio reviews, current rendered curated-page template, and the Supabase recruiter audit; this is an existing category/system extension, so no new blank-brief derivation was needed
Review trigger: 2026-11-11 or a material model/system change

@ban-regex: (?i)\b(seamless|leverage|elevate|cutting-edge|game-chang(?:e|ing)|unlock)\b
@ban-regex: (?i)\b(functional beta|shipped consumer app|production product)\b
@max-radius-values: 12
@max-font-size-values: 40
@max-hardcoded-colors: 32

@allow-path: .claude/**
@allow-path: design-docs/**
@allow-path: design-state.md
@allow-path: designpowers/**
@allow-path: docs/**
@allow-path: portfolio-overrides/**
@allow-path: my-app/src/components/**
@allow-path: my-app/src/styles/**

@visual-tell: A custom company-brand skin that replaces Hillary's established editorial identity.
@visual-tell: Repeated rounded cards with equal weight and no evidence priority.
@visual-tell: A full first mobile viewport that contains positioning but no result.
@visual-tell: Three or more generic CTA labels that ask the recruiter to choose before seeing proof.
@visual-tell: Three concept cards with matching thumbnails, descriptions, and buttons.
@visual-tell: A spatial playground enclosed by a glowing frame, dashboard shell, or control rail.
@visual-tell: Persistent infrastructure labels, nodes, route diagrams, spinners, or telemetry competing with the MSK artifact.
@visual-tell: A receipt styled as a large terminal, data table, or provenance panel.
@visual-tell: A raw social-media embed, engagement counter, or faux-official transit card standing in for product evidence.
@visual-tell: An official transit logo, route bullet, realistic service banner, or endlessly looping train that implies MTA endorsement or distracts from the journal.
@visual-tell: A prose block introduces a decision, finding, state, handoff, or before/after without the artifact it produced.
@visual-tell: A screenshot gallery uses equal thumbnails and generic captions, making evidence priority impossible to identify.
@visual-tell: Decorative photography, texture, or motion is counted as product evidence.
@visual-tell: Essential method, limitation, ownership, or status is embedded only inside an image or hidden from the default reading path.

## Positive replacements
- Instead of a Supabase imitation, use the existing Riso split hero with one accessible green accent.
- Instead of card soup, use the existing proof field, ordered work list, and ruled editorial sections.
- Instead of fit-first prose, put one result in the hero and render proof before the fit explanation.
- Instead of generic actions, use `Review Grove`, `View Supabase résumé`, and `Email Hillary`.
- Instead of concept cards, use a numbered editorial index that swaps one shared stage.
- Instead of a control panel, make the material field respond directly and keep exceptional scenarios behind a post-comparison disclosure.
- Instead of infrastructure visualization, show continuity of control: instant local response, an honest bounded wait, unchanged evidence, and a short receipt.
- Instead of social chrome or engagement metrics, extract the verified product decision into the portfolio's ruled editorial language and link to provenance quietly.
- Instead of official transit branding or a decorative loop, use one original editorial train that delivers the issue label and identifies `MTA Open Data` as a source in plain text.
- Instead of compressing prose into smaller prose, lead with one dominant artifact and attach one decision or boundary to it.
- Instead of a contact sheet, sequence evidence by hiring risk: strongest result, hardest decision, then supporting states.
- Instead of decorative visual share, count only product screens, workflows, service artifacts, research evidence, state models, and owned documentary proof.

## Approved exceptions
- Existing non-Supabase curated pages retain their current default CTA and section order. The optional Supabase fields do not rewrite those pages.

### Mechanical tell-check scope — approved 2026-08-22

Owner: Hillary Esposito. Reason: the repository contains archived reviews, generated release bundles, a separate Claude worktree, shared Designpowers source, and a mature pre-house-style CSS/component baseline. Counting those as new visual-pass decisions produces false failures and hides the changed hiring surfaces.

Exact excluded scope: `.claude/**`, `design-docs/**`, `design-state.md`, `designpowers/**`, `docs/**`, `portfolio-overrides/**`, `my-app/src/components/**`, and `my-app/src/styles/**`. The Carmen pass introduced no dependency, global token, hard-coded colour, or radius. Its additions to `riso-page.css` compose existing Riso variables; rendered screenshots, registry checks, contrast tests, and diff review remain authoritative for that stylesheet.

Review trigger: remove or narrow these exclusions when the legacy stylesheet/component consolidation begins, or immediately if a future pass adds a token, reusable component, style file, or brand palette. Current page/data copy remains mechanically scanned.
