# Responsive Review: Portfolio Flagship Case Studies

Date: 2026-07-23  
Routes: `/case-study/grove`, `/case-study/msk`, `/case-study/mobbin`

## Coverage

Rendered review covered 390px, 900px, and 1440px for all three flagship case studies, plus a 320px narrow lock and a 720 CSS-pixel viewport as the 200% reflow equivalent for a 1440px display. MSK and Mobbin were also reviewed in dark mode and at deep chapter anchors.

## Findings and fixes

| Severity | Finding | Fix | Result |
|---|---|---|---|
| Major | The desktop progress rail collided with hero artifacts at 900px. | Hide the rail at 1100px and below; compact progress remains available. | Fixed and visually verified. |
| Major | Light-theme muted text and coral accents were below 4.5:1 at small text sizes. | Darkened semantic `--muted` and `--coral` values without changing the project palette structure. | Fixed; measured ratios now range from 4.82:1 to 5.53:1 for the corrected pairs. |
| Minor | MSK’s recreated dashboard heading skipped from H1 to H3 in the hero. | Added a configurable heading level and render H2 in the hero, H3 in the decision story. | Fixed; structural axe scan passes. |
| Minor | Completion controls inherited Grove’s hard-coded green styling. | Theme completion dialog and controls through project semantic tokens. | Fixed in light and dark themes. |
| Minor | Active Mobbin gallery pills used white on the lighter dark-mode green token. | Use the project paper token as active text color. | Fixed; active-state contrast is 8.30:1 in Mobbin dark mode. |

## Responsive results

- 320px: H1, metadata, CTA, tags, and chapter strip reflow without document-level horizontal overflow. Chapter shortcuts intentionally scroll within their own container.
- 390px: hero summaries remain readable; MSK workflow cards stack; Mobbin screen sequence becomes a single-column phone-and-copy story; controls retain 44px targets.
- 720px / 200% equivalent: content reflows to the compact navigation and stacked hero; no clipped text or required two-dimensional page scrolling was observed.
- 900px: project artifacts and hero copy retain clear separation; the compact progress treatment prevents rail collisions.
- 1440px: asymmetrical hero, cinematic transition, sticky decision story, system artifact, and outcome field preserve the intended editorial pacing.
- Dark mode: both MSK and Mobbin retain distinct identity, legible recreated artifacts, and readable outcome fields.

## Interaction and language results

- Chapter shortcuts scroll to named sections and retain fixed-header clearance.
- Mobbin’s sequence exposes previous, next, named-app selection, `aria-pressed`, an announced counter, and an `aria-live` text region.
- Completion uses native dialog semantics with an explicit reopen control, visible close, Escape/cancel handling, focus restoration, session-only auto-open, and reduced-motion suppression.
- Spanish switching was verified through the mobile menu; MSK returned the existing Spanish case study with Spanish navigation, landmarks, and page language.
- Global focus-visible rules cover links and buttons; all new controls are native anchors, buttons, or dialog controls.

## Accessibility evidence

- Structural axe-core test: 2 pages passed, 0 violations with layout-dependent color contrast excluded.
- Token contrast: all tested normal-text foreground/background pairs pass WCAG AA after fixes.
- Heading and landmark structure: verified from rendered accessibility snapshots.
- Reduced motion: source review confirms reveal, capture, cinema, dashboard, progress, and completion behaviors remove or suppress motion where required.
- Touch targets: new interactive controls use a 44px minimum.

## Deferred items

None from this flagship case-study review. Existing sitewide debt DD-007 and DD-008 remains outside this case-study scope.
