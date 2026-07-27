# Design Brief: Portfolio Flagship Case-Study System

Status: Approved  
Date: 2026-07-23

## Problem Statement

The portfolio contains three strong case studies with credible evidence, but they use different structures and levels of polish. Recruiters and hiring managers have to relearn the page each time, and the older MSK and Mobbin shells do not communicate craft as quickly as the Grove flagship treatment.

Create one shared flagship framework for Grove, MSK, and Mobbin. Reuse Grove’s narrative clarity, responsive rigor, and interaction vocabulary without turning the projects into visual clones.

## Users

- Recruiters scanning role, scope, evidence, and outcomes in roughly 30 seconds.
- Product and UX hiring managers evaluating process, judgment, interaction craft, and truthful impact.
- Peers reviewing systems thinking and design-system decisions.
- Screen-reader and keyboard users who need logical headings, named controls, useful link text, and predictable focus.
- Low-vision users and people browsing at 200% zoom who need strong contrast and reflow without horizontal page scrolling.
- People under time or cognitive pressure who need summaries, chapter shortcuts, short paragraphs, and progressive disclosure.
- English and Spanish readers; the existing Spanish case-study experience must not regress.

## Design Direction

Use a shared editorial framework with project-specific storytelling.

Shared system:

- Progress and chapter navigation.
- Layered hero with role, scope, truth status, and one project-defining artifact.
- Cinematic narrative handoff.
- Evidence shortcuts and a concise route/summary.
- Interactive or inspectable system artifact.
- Sticky decision story with stacked mobile equivalent.
- Before/after or source-to-decision comparison.
- Deep outcome field with only verified evidence.
- Journal-style completion and next-project path.
- Responsive behavior and reduced-motion equivalents.

Project expression:

- **Grove:** botanical risograph, calm trust, AI judgment.
- **MSK:** clinical systems cartography, workflow compression, operational evidence.
- **Mobbin:** editorial capture desk, screen sequencing, taxonomy and documentation judgment.

## Constraints

- React and the existing portfolio codebase; prefer shared native React/CSS components over new dependencies.
- Preserve `/case-study/grove`, `/case-study/msk`, and `/case-study/mobbin`.
- Keep `/riso/grove` as a compatible alias during migration.
- Preserve current verified metrics and evidence; invent no outcomes, screenshots, or shipped-product claims.
- Keep MSK artifacts anonymized and clearly labeled as recreations.
- Keep Mobbin’s contribution framed as app-flow documentation and pattern curation, not product ownership.
- Preserve existing Spanish routes/content behavior.
- Meet WCAG AA, 44px targets, keyboard operation, reduced motion, and 320px/200% reflow requirements.
- Work carefully within the existing dirty worktree and preserve unrelated user edits.

## Existing Design System

- Global portfolio tokens and case-study patterns: `my-app/src/styles/App.css`
- Grove flagship composition and tokens: `my-app/src/styles/riso-page.css`
- Grove flagship components: `my-app/src/components/riso/`
- Existing case-study components: `my-app/src/components/`
- Shared design state: `design-state.md`

The implementation should extract a neutral flagship layer from Grove and expose project-level semantic tokens rather than duplicating the full Grove stylesheet.

## Taste Direction

Quiet authority with organic depth. Editorial rather than templated. Bold typography, generous negative space, evidence before decoration, imperfect warmth in small doses, and dry self-aware copy. The case studies should feel related like issues of one publication, not identical pages with swapped logos.

## Success Criteria

- A recruiter can identify each project’s problem, Hillary’s role, strongest evidence, and outcome from the first viewport and chapter shortcuts.
- All three English case studies share the same narrative spine while remaining visually distinguishable.
- Existing truthful content and project-specific artifacts survive the migration.
- Heading structure, link labels, keyboard behavior, and focus states pass an accessibility review.
- No document-level horizontal overflow at 320px, 390px, 900px, or 1440px.
- Key interactions have reduced-motion and non-pointer equivalents.
- Each page passes a production build and rendered review at narrow, middle, and wide widths.
- The shared format reduces future case-study work to project data plus project-specific story modules.

## Out of Scope

- Redesigning Home, About, recruiter-curated pages, or the global navigation.
- Inventing missing MSK or Mobbin artifacts.
- Changing the underlying Spanish copy or commissioning new translations.
- Publishing or deploying without a separate explicit request.
- Rewriting project history to make the work appear more product-owned or complete than it was.
