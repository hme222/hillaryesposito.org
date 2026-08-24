# Design Plan: Headlines + Visuals Hiring Pass

> **For agentic workers:** REQUIRED: Use `designpowers-critique` to review completed work against this plan.

**Goal:** Make a senior recruiter advance Hillary from visuals, headlines, evidence labels, and actions without relying on body paragraphs.
**Design Direction:** `docs/designpowers/briefs/2026-08-24-headlines-visuals-hiring-pass.md`
**Personas:** Senior healthcare recruiter, Product/Service Design leader, hybrid UXR/Service Design lead, and adaptive-access reader in the approved brief.
**Build Contract:** `docs/designpowers/builds/2026-08-24-headlines-visuals-hiring-build-contract.md`
**Build Profile:** Standard
**Engineering Law Trace:** Build contract above.

## Task 1: Lock governance and baseline

**Queue:** Visual
**Functional slice:** Approved direction, recovery, system move, and first-scan failure points are recorded before source changes.
**Files:** Approved brief, build contract, `design-state.md`, House Style artifacts, generated registry.

- [x] Record approval, Standard profile, Compose decision, and recovery SHA.
- [x] Supersede only the autoplay rule while preserving the Weekend Journal owner work.
- [x] Regenerate the component registry and pass the prebuild validator.

**Accessibility check:** Direct entry and equivalent access are hard gates, not polish.
**Dependency check:** Existing React, native video/dialog behavior, CSS, and audit runtime only.
**Verification:** Registry and House Style prebuild checks pass; diff contains no unrelated reversal.

## Task 2: Make the film optional

**Queue:** Feature
**Functional slice:** Home opens directly to hiring proof and a descriptive control starts the authored film on demand.
**Files:** `HomepageOpeningFilm.tsx`, `RisoHome.tsx`, focused tests, existing Riso styles.

- [x] Convert the film to a controlled, explicit-play overlay.
- [x] Restore focus to the trigger after Skip, Escape, end, error, or failsafe.
- [x] Keep muted, non-looping video and a complete static direct-entry path.

**Accessibility check:** Native button, 44px target, visible focus, focus containment, Escape, and reduced-motion-safe exit.
**Dependency check:** Native React and browser APIs; no library required.
**Verification:** Focused tests prove no autoplay, all exits, scroll restoration, and focus return.

## Task 3: Strengthen the Home visual index

**Queue:** Visual
**Functional slice:** The first scan shows role, qualified outcome, three outcome headlines, and artifact-led project evidence.
**Files:** `RisoHome.tsx`, shared strings if needed, `riso-page.css`, focused tests.

- [x] Replace the Logistics context-only thumbnail with a service artifact composition.
- [x] Replace the low-signal Grove cover with a legible product screen.
- [x] Keep each link's visible title and action meaningful without body prose.

**Accessibility check:** Every image has task-specific alt text; service diagrams retain text equivalents; project links remain distinguishable out of context.
**Dependency check:** Existing project assets and `LogisticsMechanism`; Compose only.
**Verification:** 390/900/1440 renders show at least two product/service artifacts and no overflow.

## Task 4: Move case boundaries into the opening field

**Queue:** Visual
**Functional slice:** MSK, Grove, and Logistics openings show Problem · Role · Decision · Outcome/State before narrative depth.
**Files:** `FlagshipMSK.tsx`, `RisoGrove.tsx`, `FlagshipLogistics.tsx`, existing flagship/Riso styles, focused tests.

- [x] MSK exposes implemented state and the qualified 20% contribution beside the artifact.
- [x] Grove exposes 34-person self-report, 11→3 decision, and Phase 2 prototype state beside the screen.
- [x] Logistics preserves its passing story and receives only parallel label consistency where needed.

**Accessibility check:** Use semantic lists or definition structures; do not encode relationships by position or colour alone.
**Dependency check:** Reuse existing evidence-strip styles or compose from locked primitives.
**Verification:** Headline-only DOM scan and 390/1440 screenshots expose all required facts with valid heading order.

## Task 5: Add the masked-body recruiter audit

**Queue:** Feature
**Functional slice:** A repeatable test hides ordinary prose and evaluates the exact evidence a fast scanner receives.
**Files:** `scripts/headline-visual-recruiter-audit.cjs`, package script if warranted, audit documentation.

- [x] Hide ordinary paragraphs while preserving headings, metric labels, figure labels, and actions.
- [x] Freeze route-specific required evidence, image health, overflow, and action checks.
- [x] Capture desktop and mobile masked-body screenshots for visual review.

**Accessibility check:** The audit supplements—not replaces—semantic, screen-reader, and full-content testing.
**Dependency check:** Existing Playwright runtime only.
**Verification:** Fixed audit passes on all six hiring-critical routes and fails when a required first-scan fact is removed.

## Task 6: Critique, repair, verify, and release

**Queue:** Bug, then Visual as separate bounded slices
**Functional slice:** All approved hiring, truth, accessibility, system, and production gates pass without weakening criteria.

- [x] Run design critique against this plan and repair material findings.
- [x] Run TypeScript, full tests, build, axe, responsive/adaptive/localization, research-integrity, House Style, registry, and masked-body gates.
- [x] Run fresh-context anti-AI review and senior-recruiter visual review.
- [x] Deploy only the exact verified build and confirm public asset hashes.

**Accessibility check:** Keyboard, focus, reduced motion, reflow, dark mode, Spanish, and semantic equivalents must all pass.
**Dependency check:** Existing repository scripts and GitHub Pages workflow only.
**Verification:** Ready health report, 23/23 both lanes, Advance decision, and verified public hash.
