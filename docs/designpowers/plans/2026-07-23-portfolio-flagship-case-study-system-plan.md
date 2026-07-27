# Design Plan: Portfolio Flagship Case-Study System

> **Required review:** Use `designpowers-critique` and `verification-before-shipping` before calling the migration complete.

**Goal:** Migrate Grove, MSK, and Mobbin to one reusable flagship case-study framework while preserving project truth, distinct visual identity, Spanish behavior, existing URLs, and WCAG AA.

**Design direction:** `docs/designpowers/briefs/2026-07-23-portfolio-flagship-case-study-system.md`

**Primary users:** Time-limited recruiters, product/UX hiring managers, design peers, keyboard and screen-reader users, low-vision and zoom users, motion-sensitive readers, and Spanish readers.

**Dependency posture:** Native React, CSS, existing portfolio components, and existing packages only. No new runtime dependency is justified.

**Implementation status:** Complete. Hero and comparison behavior were kept page-local where MSK and Mobbin require genuinely different artifacts; the reusable layer owns progress, chapters, decisions, evidence, screen sequencing, completion, reveal behavior, and project semantic tokens.

---

## Task 1: Map each project into the shared narrative spine

**Files:**  
`my-app/src/pages/case-studies/Grove.tsx`  
`my-app/src/pages/case-studies/MSK.tsx`  
`my-app/src/pages/case-studies/Mobbin.tsx`  
`docs/designpowers/matrices/2026-07-23-portfolio-case-study-content-map.md`

- [x] Map hero, status, evidence, decision, system artifact, outcomes, reflection, and next-project content.
- [x] Mark confidential, recreated, incomplete, and verified material.
- [x] Identify which Grove patterns transfer directly and which need project-specific equivalents.

**Accessibility check:** Every planned chapter has a descriptive heading and a non-visual content equivalent.

**Verification:** Every current section is retained, intentionally consolidated, or explicitly documented as deferred.

## Task 2: Extract neutral flagship tokens

**Files:**  
`my-app/src/styles/flagship-case-study.css`  
`my-app/src/styles/riso-page.css`

- [x] Define neutral layout, type, spacing, focus, motion, progress, chapter, outcome, and completion tokens.
- [x] Expose project-level semantic tokens for paper, ink, accent, signal, deep field, and grid.
- [x] Keep Grove’s current appearance stable through Grove token assignments.

**Accessibility check:** Semantic text/background pairings meet WCAG AA in light and dark contexts.

**Verification:** Grove rendered comparison shows no unintended structural regression.

## Task 3: Build shared progress and chapter navigation

**Files:**  
`my-app/src/components/flagship/CaseStudyProgress.tsx`  
`my-app/src/components/flagship/CaseStudyChapters.tsx`  
`my-app/src/styles/flagship-case-study.css`

- [x] Generalize scroll percentage, milestone labels, desktop rail, and compact progress bar.
- [x] Add horizontally scrolling narrow-width chapter shortcuts.
- [x] Support anchor offsets and reduced motion.

**Accessibility check:** Navigation has a descriptive label, keyboard-sized links, and visible focus.

**Verification:** Chapter jumps clear the fixed global navigation at 390px, 900px, and 1440px.

## Task 4: Build the shared hero and project status layer

**Files:**  
`my-app/src/components/flagship/CaseStudyHero.tsx`  
`my-app/src/styles/flagship-case-study.css`

- [x] Support project eyebrow, H1, read time, summary, CTA, tags, metadata, hero artifact, and truth/status label.
- [x] Support asymmetrical split, stacked narrow layout, and project-specific art direction.
- [x] Keep one H1 and concise first-viewport evidence.

**Accessibility check:** Decorative assets are hidden; informative assets have project-specific alt text; CTA names its destination.

**Verification:** Role, problem, scope, and truth status are identifiable in the first viewport.

## Task 5: Build shared evidence and decision primitives

**Files:**  
`my-app/src/components/flagship/EvidenceField.tsx`  
`my-app/src/components/flagship/DecisionStory.tsx`  
`my-app/src/components/flagship/ComparisonStage.tsx`  
`my-app/src/styles/flagship-case-study.css`

- [x] Generalize metric fields, sticky decision sequences, and before/after comparisons.
- [x] Provide stacked non-sticky narrow-width equivalents.
- [x] Support recreated/confidential/in-progress provenance labels.

**Accessibility check:** Reading order matches visual order; sticky visuals duplicate no essential text; comparisons carry adjacent summaries.

**Verification:** Components remain understandable with CSS motion disabled and at 200% zoom.

## Task 6: Build shared completion and next-project path

**Files:**  
`my-app/src/components/flagship/CaseStudyCompletion.tsx`  
`my-app/src/styles/flagship-case-study.css`

- [x] Generalize the session-only journal completion dialog.
- [x] Support project-specific closing language and next-project destination.
- [x] Preserve explicit reopen, close, share, and reduced-motion behavior.

**Accessibility check:** Native dialog semantics, visible close, focus restoration, Escape support, and descriptive actions.

**Verification:** Dialog opens once per session, can be reopened, and does not auto-open for reduced-motion users.

## Task 7: Promote Grove to the live case-study route

**Files:**  
`my-app/src/pages/case-studies/RisoGrove.tsx`  
`my-app/src/app/AppRoutes.tsx`

- [x] Add the existing Spanish fallback to the flagship Grove page.
- [x] Route `/case-study/grove` and `/riso/grove` to the same flagship implementation.
- [x] Replace Grove-only shared code with neutral flagship primitives where stable.

**Accessibility check:** Language of page content remains correct after switching English/Spanish.

**Verification:** Both Grove URLs render, browser history works, and Spanish still opens the existing Spanish case study.

## Task 8: Create MSK’s flagship art direction and hero

**Files:**  
`my-app/src/pages/case-studies/FlagshipMSK.tsx`  
`my-app/src/styles/msk-flagship.css`

- [x] Apply clinical-systems semantic tokens without generic hospital blue.
- [x] Build the first viewport around the print-to-digital contradiction, 21,000+ scale, and recreated dashboard artifact.
- [x] Add truthful confidentiality/recreation status.

**Accessibility check:** Status is expressed in text, not color; recreated artifact labeling is adjacent and announced.

**Verification:** The first viewport communicates problem, role, scale, and evidence at all three responsive locks.

## Task 9: Build MSK’s workflow and systems chapters

**Files:**  
`my-app/src/pages/case-studies/FlagshipMSK.tsx`  
`my-app/src/components/MSKDashboardMockup.tsx`  
`my-app/src/components/MSKSystemMap.tsx`  
`my-app/src/styles/msk-flagship.css`

- [x] Turn the four-system-to-two-system workflow into the primary comparison stage.
- [x] Convert dashboard interaction logic into a sticky decision sequence.
- [x] Preserve observation, certification, onboarding, and systems-map evidence through progressive disclosure.

**Accessibility check:** Workflow steps are ordered lists; map content has a complete adjacent text equivalent; confidential data stays absent.

**Verification:** A reader can explain the workflow change without interacting with the visual artifact.

## Task 10: Build MSK’s evidence field and closing

**Files:**  
`my-app/src/pages/case-studies/FlagshipMSK.tsx`  
`my-app/src/styles/msk-flagship.css`

- [x] Lead outcomes with verified 21,000+ scale and 20% cost reduction context.
- [x] Preserve attribution boundaries around initiative-level outcomes.
- [x] End with the MSK News proof point, reflection, completion, and next project.

**Accessibility check:** Metrics include plain-language context and do not rely on oversized numerals alone.

**Verification:** No claim implies sole ownership of organization-wide results.

## Task 11: Create Mobbin’s flagship art direction and hero

**Files:**  
`my-app/src/pages/case-studies/FlagshipMobbin.tsx`  
`my-app/src/styles/mobbin-flagship.css`

- [x] Apply an editorial capture-desk identity using the real three-app assets.
- [x] Lead with App Capture Specialist, three apps, 200+ screens, and the documentation problem.
- [x] Keep contribution language distinct from product-design ownership.

**Accessibility check:** Screen images have concise, non-duplicative alt text and retain legibility at zoom.

**Verification:** First viewport states the role and output without implying Hillary designed the source apps.

## Task 12: Build Mobbin’s gallery, taxonomy, and decision story

**Files:**  
`my-app/src/pages/case-studies/FlagshipMobbin.tsx`  
`my-app/src/components/flagship/ScreenSequence.tsx`  
`my-app/src/styles/mobbin-flagship.css`

- [x] Build a responsive three-app screen sequence with named controls and pagination.
- [x] Turn capture → map → label → verify into the sticky decision narrative.
- [x] Convert the naming lesson and entry anatomy into an inspectable taxonomy artifact.

**Accessibility check:** Gallery works by keyboard and touch; pagination is announced; essential meaning is outside the images.

**Verification:** A reader can understand why documentation required judgment, not just screenshots.

## Task 13: Build Mobbin’s evidence field and closing

**Files:**  
`my-app/src/pages/case-studies/FlagshipMobbin.tsx`  
`my-app/src/styles/mobbin-flagship.css`

- [x] Frame 200+ screens, three apps, and four months as output evidence.
- [x] Preserve NDA-safe detail and remove any ambiguous product-ownership language.
- [x] Add completion and next-project path.

**Accessibility check:** Evidence cards have complete sentences and logical reading order.

**Verification:** Copy audit finds no claim that Hillary designed Kikoff, Polymarket, Discover, or Mobbin itself.

## Task 14: Wire live routes and preserve Spanish behavior

**Files:**  
`my-app/src/app/AppRoutes.tsx`  
`my-app/src/pages/case-studies/FlagshipMSK.tsx`  
`my-app/src/pages/case-studies/FlagshipMobbin.tsx`

- [x] Route existing case-study URLs to the new flagship pages.
- [x] Keep lazy loading for Mobbin’s NDA-sensitive chunk.
- [x] Return existing Spanish case-study content when Spanish is active.

**Accessibility check:** Route announcements and document titles remain accurate in both languages.

**Verification:** Direct navigation, browser refresh, and language switching pass on all three routes.

## Task 15: Cross-project responsive and interaction review

**Files:**  
`docs/designpowers/reviews/2026-07-23-portfolio-flagship-responsive-review.md`

- [x] Render Grove, MSK, and Mobbin at 390px, 900px, and 1440px.
- [x] Check 320px and 200% zoom for document overflow.
- [x] Test chapter navigation, galleries, tabs, disclosures, share, and completion by keyboard.
- [x] Check reduced motion and dark mode where supported.

**Accessibility check:** WCAG AA contrast, 44px targets, focus visibility, headings, landmarks, link names, alt text, and language of parts.

**Verification:** Record screenshots, findings, fixes, and any deferred debt.

## Task 16: Critique, truth audit, and production verification

**Files:**  
`docs/designpowers/reviews/2026-07-23-portfolio-flagship-final-critique.md`  
`design-state.md`

- [x] Review all pages against the approved brief and this plan.
- [x] Compare every metric and ownership claim to the source case studies.
- [x] Run the production build.
- [x] Update design state, artifact index, decisions, debt, and handoff.

**Accessibility check:** No unresolved critical or major accessibility finding.

**Verification:** Build succeeds; the critique records whether every success criterion passed.
