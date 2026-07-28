# Build Contract: Portfolio Redesign Release

**Date:** 2026-07-27
**Profile:** Standard
**Selected queue:** Bug
**Authorization:** The owner asked to commit the new site, remove the old site, run the full design review, and repair the verified findings.

## Outcome

- **Problem:** The approved redesign is committed only on the local `portfolio-senior-rework` branch. The remote `main` and deployed `gh-pages` states still represent the previous portfolio.
- **Users:** Recruiters, hiring managers, design peers, and readers using keyboard, screen reader, zoom, reduced motion, mobile, or Spanish content.
- **Primary task:** Understand Hillary's role and proof quickly, inspect the strongest case studies, and reach résumé or contact actions without friction.
- **Success evidence:** The reviewed redesign passes build/tests, route and responsive inspection, accessibility checks, recruiter scan checks, and replaces the older branch/deployment state with a recoverable Git history.

## Current Release

- Preserve the Riso/editorial portfolio system and the three public flagship case studies.
- Remove retired public entry points and obsolete deployment state.
- Repair only findings verified during this release review.
- Key screens: Home, About, Grove, MSK, Mobbin, curated role pages, Fashion artifact, and 404 recovery.

## Experience Direction

- **Approved strategy:** Quiet authority; evidence before decoration; human judgment over AI; process-improvement credibility lives in the work rather than competing with the role title.
- **Design system:** Risograph editorial system with painterly cartography, square publication plates, semantic device radii, shared typography, and restrained spot inks.
- **Taste direction:** Warm restraint, organic within structure, typographic hierarchy, and crafted specificity.
- **Responsive locks:** 320px, 390px, 900px, and 1440px; reflow evidence at narrow width; short-height navigation spot check.
- **Input modes:** Pointer, touch, keyboard, and screen-reader-compatible semantics.

## Technical Boundaries

- **Inputs and outputs:** React/TypeScript source in `my-app/src`; static assets in `my-app/public`; generated deploy artifact in `docs`.
- **Data and persistence:** Static content; local theme and language preferences only.
- **Authentication:** Not applicable.
- **Integrations:** Email link, résumé PDF, external portfolio links, browser share when supported.
- **Existing architecture:** Create React App with React Router; GitHub Pages deployment.

## Inclusive Requirements

- WCAG 2.2 AA-oriented semantics, focus, contrast, keyboard access, reflow, and reduced-motion behavior.
- Clear wayfinding, honest labels, resumable long-form reading, low memory burden, and no condition-specific accessibility claims without lived-experience validation.
- Spanish pages must declare language accurately; private curated routes must remain excluded from indexing.

## Scope Control

- **In scope:** Current portfolio routes, source/build parity, obsolete public routes, responsive behavior, visual cohesion, recruiter scan, Laws of UX, cognitive/neuroinclusive review, release evidence, Git integration, and replacement of the old deployed version.
- **Out of scope:** New case studies, invented metrics, a new visual direction, new dependencies, or rewriting truthful project evidence.
- **Preserve unchanged:** Approved positioning, Hillary's storytelling voice, Riso/painterly system, factual claims, résumé/contact destinations, and current case-study order unless verified review evidence requires a correction.

## Recovery

- **Existing commit SHA:** `d464b4d6e623ffe6ff6496a6142294684e6953a5`
- **Dirty-worktree notes:** Clean before review. `my-app/build` is intentionally ignored; `docs` is the tracked deployment artifact.
- **Rollback approach:** The pre-release SHA remains addressable. The release will be one additional commit before branch integration and deployment.

## Matrix Check

- **Applied dimensions:** Agentic UX, Trust & Transparency; Enterprise Design Systems & Prototyping; UX Research, Workshops & Strategy; Prompt Engineering, Personas & Evals.
- **Hard gates:** Preview/verification, recovery, accessibility, representative route checks, provenance, and no silent change of portfolio purpose.
- **Evidence status:** Rendered and code observations are **Verified**; Laws of UX and recruiter interpretations are **Practitioner synthesis**; no source-specific claim is inferred from an index title.
- **Validation required:** Automated tests, production build, route audit, keyboard/focus checks, responsive screenshots, visual inspection, source/build parity, and post-commit verification.

