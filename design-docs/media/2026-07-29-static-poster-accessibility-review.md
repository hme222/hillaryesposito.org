# Static Evidence Poster Triad — Independent Accessibility Review

**Date:** 2026-07-29; runtime revalidation 2026-08-03
**Reviewer:** accessibility-reviewer; runtime evidence supplied by verification lead
**Verdict:** **CONDITIONAL PASS**
**Scope:** `EvidenceMediaPoster.tsx`, `evidence-media.css`, the three page integrations, final copy, six original screenshots, and the 18-state adaptive browser audit
**Standard:** WCAG 2.1 AA minimum, with WCAG 2.2 target-size/reflow expectations and COGA/neuroinclusive quality checks  

## Summary

The triad is structurally sound and does not contain a critical access blocker. Each poster has a readable live-DOM equivalent; the visually dense composition and all source images are hidden as one decorative unit; status, reconstruction, ownership, problem, decision/method, scale, and a descriptive in-page link remain available in normal reading order. All nine meaningful text/background colour pairs measured between **4.95:1 and 13.18:1**. The three links are underlined, have a 44px minimum block size, and resolve to real IDs. The complete automated suite passes **40/40**, and the optimized production build succeeds.

The implementation was revised and revalidated. MSK becomes one column below 30rem, Mobbin source names wrap, folio/provenance floors are 11px, all meaningful portrait-copy floors are 12px, and the repeated figure label is gone. The repeatable browser audit now passes desktop, 200%/400%-equivalent reflow, WCAG text spacing, forced colours, and reduced motion for all three projects: 18/18 states, no overflow or clipped poster text, 44px evidence links, valid chapter targets, no running poster animation, and working reflow-safe utility actions. The only remaining condition is one real VoiceOver/Safari or NVDA/Firefox reading-order pass.

**Critical:** 0  
**Major:** 0 implementation issues; 1 external validation condition
**Minor:** 0 open; 1 resolved in source  
**What works well:** 9 verified strengths

## Priority fixes

1. **P1 — Validation condition: complete one real-screen-reader pass.** Confirm the intended heading → qualifier → summary → scale/status → link order in VoiceOver/Safari or NVDA/Firefox before changing the verdict to unconditional PASS.

## Critical issues

None found.

## Validation condition

### V1. A real screen-reader reading-order pass is still absent

**Who is affected:** Screen-reader users whose actual navigation model cannot be represented completely by jsdom/axe or a visual browser audit.

**Verified evidence:**

- The visual poster is one `aria-hidden="true"` unit; its source images are decorative.
- The adjacent live figcaption exposes qualifier, problem, decision/method, scale/status, ownership, and a descriptive chapter link.
- The repeated figure accessible name was removed.
- The complete automated suite passes 40/40.
- The adaptive browser harness passes 18/18 rendered states; details are recorded in `design-docs/reviews/2026-08-03-evidence-media-adaptive-verification.md`.

**Residual risk:** VoiceOver or NVDA could announce the native figure/figcaption grouping differently from the intended sequence even though the DOM structure is correct.

**Acceptance test:** In VoiceOver/Safari or NVDA/Firefox, read from each evidence-section heading through its chapter link. Confirm one project-title announcement followed by qualifier → problem → decision/method → scale/status → ownership → link, with no decorative source-image announcements.

## Resolved during review

### M1-source. Portrait microtype and density fixes

**Who benefits:** People with low vision; dyslexic readers; readers with ADHD, cognitive fatigue, or divided attention; older readers; anyone using a small phone in glare or motion.

**Source verification:**

- Meaningful portrait copy now has a 12px minimum; folio/provenance text has an 11px minimum.
- Grove override text and Mobbin contribution text now explicitly use `0.75rem` minimums.
- MSK changes from two workflow columns to one below 30rem, preserving Before → After source order.
- Mobbin source labels wrap instead of ellipsizing.
- The poster can grow vertically in portrait mode rather than preserving the landscape aspect ratio.

**Runtime result:** Confirmed across 200%/400%-equivalent reflow and the WCAG text-spacing override with no poster overflow or clipped text.

### m1. The repeated accessible figure name was removed

**Who is affected:** Screen-reader users and people navigating by headings/groups who must filter repeated labels.

**Original evidence:** Every page section had an `h2` used by `aria-labelledby`, immediately followed by a `figure` whose `aria-label` repeated the same heading.

**Source verification:** `PosterFrame` no longer accepts or renders the `heading`/`aria-label` prop. The native figure and visible figcaption remain.

**Remaining runtime test:** Confirm the native figure/figcaption announcement once in VoiceOver or NVDA.

## What works well

- **Screen-reader substitution is deliberate and coherent.** One parent `aria-hidden="true"` removes the visual poster, internal headings, workflow diagram, and source screenshots from the accessibility tree; the adjacent figcaption carries the essential story.
- **Image treatment is correct for this architecture.** Grove and Mobbin source captures use `alt=""`, and their meaning/ownership is repeated in visible live text. Mobbin’s source names—Kikoff, Polymarket, and Discover—remain programmatically available in the ownership note.
- **Qualifier-first order is strong.** Grove begins with prototype phase, MSK with reconstruction/no-patient-data, and Mobbin with source ownership/non-authorship before the explanatory summary.
- **The copy is plain and causally organized.** Each project has one problem and one decision/method story. There is no jargon-dependent instruction or memory-based task.
- **Links are descriptive and local.** “Read the Grove decision log,” “Read the MSK workflow case study,” and “Read the Mobbin documentation case study” make sense out of context and point to real in-page targets.
- **Targets are adequately sized.** The live-copy links have a 44px minimum block size.
- **The responsive fixes are directionally correct.** MSK becomes one column below 30rem, Mobbin source labels wrap, and the poster is allowed to grow rather than preserving a fixed crop.
- **Colour is not the only carrier.** AI default/human override, Before/After, and Capture/Map/Name/Verify are explicitly labeled and ordered. All measured text pairs pass AA.
- **Texture A remains non-semantic.** It is a CSS background on an `aria-hidden` span inside an already-hidden poster, has `pointer-events: none`, uses 7% opacity, and carries no evidence or interaction. The referenced derivative is 165KB; the 13MB master is not referenced by the component.

## Detailed checks

| Check | Result | Evidence |
|---|---|---|
| WCAG text contrast | **PASS** | Grove 5.20:1–13.18:1; MSK 5.22:1–12.73:1; Mobbin 4.95:1–12.74:1 for meaningful text pairs |
| Heading structure | **PASS** | Each integration uses a section `aria-labelledby` by a real `h2`; internal decorative headings are hidden with the poster |
| Screen-reader order | **CONDITIONAL PASS** | DOM order and automated structure pass; one VoiceOver/NVDA reading-order pass remains |
| Duplicate image announcements | **PASS** | All source images have empty alt and sit under the hidden poster |
| Forced-colour semantics | **PASS** | Rendered forced-colour states preserve explicit labels/numbers and key outlines |
| Keyboard/touch interaction | **PASS** | One descriptive standard anchor; 44px minimum block size; no custom interaction |
| Link destinations | **PASS** | `#grove-override`, `#msk-workflow`, and `#mobbin-work` exist |
| Mobile density | **PASS** | Rendered narrow states preserve the 12px/11px floors, one-column MSK, and wrapped Mobbin labels without clipping |
| Zoom/reflow | **PASS** | Eighteen-state audit reports no page/poster overflow or clipped poster text at 200%/400%-equivalent widths |
| Texture A semantics | **PASS** | Decorative background only; hidden, noninteractive, no evidentiary role |
| Copy/truth safeguards | **PASS** | Status, reconstruction, contribution, non-authorship, and unfinished-redesign qualifiers match the final copy packet |

## Evidence and limitations

**Verified repository/runtime evidence:**

- Inspected component, stylesheet, three integrations, final copy packet, and six supplied screenshots.
- Confirmed all three anchor targets in source.
- Ran `CI=true npm test -- --runInBand --watchAll=false`: **40/40 passed**. The run emits known jsdom canvas warnings from an unrelated curated-page measurement hook.
- Ran `npm run build`: optimized production build compiled successfully.
- The implementation handoff records twelve baseline rendered states across 320/390/900/1440 with no overflow, broken images, missing alt text, duplicate IDs, heading skips, console errors, invisible/unstyled focus, or undersized targets.
- The 2026-08-03 adaptive harness records 18/18 passing states across desktop, 200%/400%-equivalent reflow, text spacing, forced colours, and reduced motion.
- Measured colour contrast from the exact component palette values using the WCAG relative-luminance formula.

**Not verified in this review:**

- No VoiceOver/NVDA transcript was supplied.

## Matrix check

- **Agentic UX, Trust & Transparency — applied:** qualifiers, ownership, provenance, predictable in-page links, accessible reading order, and correction burden.
- **Enterprise Design Systems & Prototyping — applied:** shared component behavior, responsive variants, token-level contrast, and regression coverage.
- **Source status:** component/CSS/screenshots/test output are **Verified**; WCAG/COGA recommendations are reviewer professional practice; no claims were inferred from index-only source titles.
- **Hard-gate status:** no demonstrated inaccessible critical flow; readiness is conditional only on real assistive-technology confirmation.
- **Validation still required:** one VoiceOver/Safari or NVDA/Firefox reading-order pass.

## Final recommendation

**CONDITIONAL PASS.** Source and adaptive-runtime findings are resolved. Complete one VoiceOver or NVDA reading-order check to change the verdict to unconditional **PASS**. No finding warrants **STOP**.

## Handoff

**accessibility-reviewer → verification lead:** “The final source and rendered adaptive checks are complete: 18/18 states pass reflow, text spacing, forced colours, reduced motion, target sizing, and utility recovery. Keep the verdict conditional only until one real VoiceOver or NVDA pass confirms the figure/figcaption reading order.”
