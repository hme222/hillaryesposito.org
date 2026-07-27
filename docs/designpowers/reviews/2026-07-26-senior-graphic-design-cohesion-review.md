# Senior Graphic Design Cohesion Review

_Reviewed and repaired 2026-07-26_

## Verdict

The portfolio now reads as one authored editorial system rather than a new Riso direction layered over an older product-portfolio shell. The strongest visual idea is clear: warm publication paper, strict typographic clearings, painterly botanical cartography, direct artifacts, and coral used as a controlled signal.

## What was weakening the system

- The masthead changed from a full-width rule into a floating rounded island after scroll.
- The Home cover carried four simultaneous focal systems: title slab, portrait, fragmented map interface, and recruiter control.
- Technical map drawings, coordinate-style readouts, progress telemetry, micro-label rails, and skill chips made project covers feel like dashboards.
- Fashion behaved like a separate microsite instead of a project-specific expression of the shared system.
- About and project cards retained soft radii and shadows from the previous interface vocabulary.
- Mobbin lacked the painted cover field used by the other flagship work.
- Grove’s secondary phone was too small to function as evidence and read as decorative noise.

## Repairs applied

- Locked the global masthead to one stable, full-width editorial rule in both themes.
- Simplified the identity mark to the symbol and name; removed the secondary tagline/divider treatment.
- Removed the custom cursor and delayed utility controls until the opening composition has passed.
- Reduced Home to one title clearing, one painted plate, and one portrait.
- Removed plotted SVG paths, readouts, location captions, hero rails, duplicate progress mastheads, and flagship skill chips.
- Made the painted collage the dominant cover layer; source maps remain only as faint ink provenance.
- Kept one Grove phone and one journal entry; removed the undersized secondary device.
- Added the shared painted field to Mobbin.
- Migrated Fashion to the common breadcrumb, chapter index, typography, rules, spacing, buttons, and square plate language.
- Removed decorative radii and shadows from editorial surfaces; literal phone/device hardware remains rounded.
- Aligned the footer, About, curated pages, recruiter controls, and 404 surface to the same shell tokens.

## Senior-review criteria

| Criterion | Result |
| --- | --- |
| Focal hierarchy | One dominant title/artifact relationship per cover |
| Typography | Archivo display/body with Space Mono metadata across the shell |
| Shape language | Square paper plates and hairline rules; radius reserved for devices |
| Palette | Warm paper, ink, botanical green, and controlled coral |
| Image direction | Painterly collage leads; cartography no longer reads as navigation |
| Negative space | Clear, intentional reading zones without floating interface debris |
| Responsive composition | Stacked editorial sequence at 390px; no horizontal overflow |
| System consistency | Home, About, all flagships, curated roles, and Fashion share one grammar |

## Rendered verification

Primary routes reviewed at 1440 × 1000 and 390 × 844:

- Home
- About
- Grove
- Memorial Sloan Kettering
- Mobbin
- Indyx tailored role page
- Fashion Campaign System

Across those routes: zero broken images, zero page-level horizontal overflow, no cartographic drawing/readout remnants, and no duplicate flagship progress mastheads. The mobile navigation and dark Grove cover were also visually reviewed.

The structural, interaction, contrast, and anchor suite passes 29/29 tests. The optimized production build compiles successfully, and `git diff --check` reports no whitespace errors.

## Remaining intentional exceptions

- Phone and device frames keep physical radius because they represent real hardware.
- Project artifacts keep their own product palettes inside the shared editorial frame.
- Grove keeps one dated journal note because it advances the care story rather than acting as decoration.
- Fashion keeps its campaign art direction while inheriting the portfolio’s structure and interaction language.

## Final assessment

Ready for owner review. The portfolio now has a coherent point of view with enough restraint to withstand senior graphic-design scrutiny: fewer competing gestures, stronger figure/ground relationships, better repetition, and project distinction created through evidence rather than unrelated UI styling.

## Critic closeout addendum

The remaining findings inherited from the prior full-portfolio critique were also closed:

- visible mobile project arrows;
- wrapped, non-clipping mobile chapter navigation;
- truthful “View résumé” labels;
- private/no-index treatment for tailored and Fashion routes;
- a recoverable Mobbin lazy-load failure state;
- 44px logo and footer-link targets;
- corrected 404 recovery copy;
- canonical design-state references with no missing documents.

The expanded rendered matrix covers 35 route/width combinations from 320–1440px with no overflow, broken-image, or chapter-navigation failure.
