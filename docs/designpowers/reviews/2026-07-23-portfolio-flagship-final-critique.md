# Design Critique: Portfolio Flagship Case-Study System

**Reviewed against:** Approved flagship brief, implementation plan, portfolio design principles, taste profile, content map, rendered responsive review  
**Date:** 2026-07-23

## Summary

The three live case studies now read as issues of one editorial publication: consistent wayfinding and evidence pacing, with distinct project logic and art direction. Grove carries human-over-AI judgment, MSK carries clinical systems credibility, and Mobbin carries documentation craft without blurring ownership.

## Craft assessment

The work meets the “quiet authority” target. Typography and negative space lead; color is restrained and semantic; artifacts explain the work instead of decorating it. MSK avoids generic hospital blue, Mobbin avoids pretending app capture was product ownership, and Grove keeps its warmer botanical/riso character.

| Element | Taste expectation | Current state | Gap |
|---|---|---|---|
| Composition | Editorial, asymmetrical, generous | Shared rhythm with project-specific hero artifacts and deep fields | None |
| Typography | Bold hierarchy, readable body copy | Large display headlines, short paragraphs, mono evidence labels | None |
| Color | Warm restraint with small signal accents | Neutral fields, project greens, limited coral evidence signals | None after contrast fixes |
| Interaction | Purposeful, inspectable, calm | Chapter jumps, scroll narrative, gallery, native completion dialog | None |
| Voice | Direct, evidence-led, warm, dry | Claims lead with evidence and preserve attribution boundaries | None |

## Findings

### Critical

- None.

### Major

- None after the 900px rail collision and contrast corrections.

### Minor

- None deferred from this review.

### Notes

- Grove remains the proven composition rather than being fully rewritten into every neutral primitive. This is an intentional stability choice, not a visible inconsistency.
- Spanish content remains the existing condensed version; new English storytelling was not machine-translated.

## Accessibility status

Pass for the implemented scope. New interactions use semantic controls, visible focus is inherited from the global system, touch targets meet 44px, language switching is preserved, informative images have specific alt text, decorative motion has reduced-motion handling, and structural axe tests report no violations. Corrected light/dark semantic color pairs meet WCAG AA.

## Truth and ownership audit

- MSK artifacts are labeled recreated/anonymized and contain no patient data.
- The 20% EMR cost reduction is attributed to the wider initiative; copy describes Hillary’s workflow contribution.
- Mobbin explicitly states that Hillary did not design Kikoff, Polymarket, Discover, or Mobbin.
- No new metric, shipped feature claim, or confidential artifact was invented.

## Recommendation

Proceed. The flagship case-study migration is ready to serve as the design reference for the remaining portfolio redesign.

## Verification report

- Plan completion: 16 of 16 tasks complete.
- Brief alignment: all success criteria met for the implemented scope.
- Production build: `npm run build` compiled successfully.
- Automated accessibility: 3 tests passed; MSK and Mobbin report zero structural axe-core violations, and the Mobbin gallery plus completion open/share/close flow passed.
- Responsive review: Grove, MSK, and Mobbin checked at 390px, 900px, and 1440px; 320px and 720px/200%-equivalent reflow checks passed.
- Content status: no placeholders or unresolved ownership language in the new flagship pages.
- Design debt: no new flagship debt; existing unrelated sitewide items DD-007 and DD-008 remain open.
- Verdict: ready to use as the reference system for the next portfolio phase.
