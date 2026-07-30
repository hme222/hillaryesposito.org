# Static Evidence Poster Triad — Independent Accessibility Review

**Date:** 2026-07-29  
**Reviewer:** accessibility-reviewer  
**Verdict:** **REVISE**  
**Scope:** `EvidenceMediaPoster.tsx`, `evidence-media.css`, the Grove/MSK/Mobbin page integrations, the final static copy packet, and six supplied desktop/mobile screenshots  
**Standard:** WCAG 2.1 AA minimum, with WCAG 2.2 target-size/reflow expectations and COGA/neuroinclusive quality checks  

## Summary

The triad is structurally sound and does not contain a critical access blocker. Each poster has a readable live-DOM equivalent; the visually dense composition and all source images are hidden as one decorative unit; status, reconstruction, ownership, problem, decision/method, scale, and a descriptive in-page link remain available in normal reading order. All nine meaningful text/background colour pairs measured between **4.95:1 and 13.18:1**. The three links are underlined, have a 44px minimum block size, and resolve to real IDs. The complete automated suite passes **40/40**, and the optimized production build succeeds.

The implementation was revised during this review. In source, MSK now becomes one column below 30rem, Mobbin source names wrap instead of ellipsizing, folio/provenance floors are 11px, all meaningful portrait-copy floors are 12px, and the repeated figure label is gone. Those source findings are resolved. The remaining gate is runtime evidence: 200%/400% zoom, WCAG text spacing, Windows forced colours, and a real screen-reader pass were not completed after the final edits.

**Critical:** 0  
**Major:** 1 validation gap  
**Minor:** 0 open; 1 resolved in source  
**What works well:** 9 verified strengths

## Priority fixes

1. **P1 — Major validation gap: complete adaptive-mode validation.** Test 200% and 400% zoom/reflow, WCAG text spacing, Windows forced colours, and one real-screen-reader pass before changing the verdict to PASS.

## Critical issues

None found.

## Major issues

### M1. Required zoom, text-spacing, forced-colour, and real screen-reader evidence is still absent

**Who is affected:** People using browser zoom or text-spacing overrides; Windows High Contrast/forced-colour users; screen-reader users whose actual navigation model is not represented by jsdom/axe.

**Evidence:**

- The CSS has a sensible container-query switch at 48rem: it removes the fixed 16:9 ratio and enables portrait layouts.
- A forced-colours rule restores key borders/outlines.
- The complete automated suite passes 40/40, but its jsdom/axe environment has no layout engine and explicitly disables colour-contrast checks.
- The final copy packet itself lists 200% zoom, DOM order with a screen reader, and contrast-in-context as still required.
- Supplied screenshots cover only one desktop and one mobile presentation per project.

**Risk:** `overflow: hidden` remains on the poster and several desktop compositions use a fixed `aspect-ratio: 16 / 9`. The final portrait source is directionally correct, but without adaptive-mode runtime evidence it is not defensible to call reflow verified.

**Specific fix/test:**

- Capture each poster at 200% browser zoom and at 400%/320 CSS px equivalent. Check page-level horizontal overflow, clipped poster text, and reading order.
- Apply the WCAG 1.4.12 text-spacing override (line-height 1.5; paragraph spacing 2em; letter spacing 0.12em; word spacing 0.16em) and verify that the poster or its adjacent equivalent loses no content.
- In Windows forced colours, verify that explicit labels—not colour—distinguish AI default/human override, Before/After, and the four Mobbin method steps.
- In VoiceOver/Safari or NVDA/Firefox, read from the section heading through the link and confirm one announcement of the project name followed by qualifier → problem → decision/method → scale/status → link.

**Acceptance test:** Store screenshots or test notes for all three projects. No clipping or two-dimensional scrolling at 400%; no missing qualifier or ownership language; no duplicate project-title announcement.

## Resolved during review

### M1-source. Portrait microtype and density fixes

**Who benefits:** People with low vision; dyslexic readers; readers with ADHD, cognitive fatigue, or divided attention; older readers; anyone using a small phone in glare or motion.

**Source verification:**

- Meaningful portrait copy now has a 12px minimum; folio/provenance text has an 11px minimum.
- Grove override text and Mobbin contribution text now explicitly use `0.75rem` minimums.
- MSK changes from two workflow columns to one below 30rem, preserving Before → After source order.
- Mobbin source labels wrap instead of ellipsizing.
- The poster can grow vertically in portrait mode rather than preserving the landscape aspect ratio.

**Remaining runtime test:** Confirm these final edits at 320/390px, 200%/400% zoom, and with WCAG text spacing.

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
| Screen-reader order | **PASS in source; runtime verification required** | Qualifier → summary → scale/ownership → link is preserved; the repeated figure label was removed |
| Duplicate image announcements | **PASS** | All source images have empty alt and sit under the hidden poster |
| Forced-colour semantics | **PASS in source; runtime verification required** | Explicit labels/numbers carry meaning; forced-colour outlines restore key visual states |
| Keyboard/touch interaction | **PASS** | One descriptive standard anchor; 44px minimum block size; no custom interaction |
| Link destinations | **PASS** | `#grove-override`, `#msk-workflow`, and `#mobbin-work` exist |
| Mobile density | **PASS in source; runtime verification required** | 12px meaningful-copy floor, 11px folio/provenance floor, one-column narrow MSK, and wrapped Mobbin labels |
| Zoom/reflow | **CONDITIONAL** | Adaptive source is promising; no 200%/400% rendered evidence supplied |
| Texture A semantics | **PASS** | Decorative background only; hidden, noninteractive, no evidentiary role |
| Copy/truth safeguards | **PASS** | Status, reconstruction, contribution, non-authorship, and unfinished-redesign qualifiers match the final copy packet |

## Evidence and limitations

**Verified repository/runtime evidence:**

- Inspected component, stylesheet, three integrations, final copy packet, and six supplied screenshots.
- Confirmed all three anchor targets in source.
- Ran `CI=true npm test -- --runInBand --watchAll=false`: **40/40 passed**. The run emits known jsdom canvas warnings from an unrelated curated-page measurement hook.
- Ran `npm run build`: optimized production build compiled successfully.
- The implementation handoff records twelve rendered states across 320/390/900/1440 with no overflow, broken images, missing alt text, duplicate IDs, heading skips, console errors, invisible/unstyled focus, or undersized targets. Those captures predate the final text-floor/reflow edits.
- Measured colour contrast from the exact component palette values using the WCAG relative-luminance formula.

**Not verified in this review:**

- A fresh rendered capture after the final source fixes was blocked by the local browser approval quota.
- No 200% or 400% rendered browser capture was supplied.
- No Windows forced-colour runtime capture was supplied.
- No VoiceOver/NVDA transcript was supplied.
- The supplied screenshots do not establish user text-spacing override behavior.

## Matrix check

- **Agentic UX, Trust & Transparency — applied:** qualifiers, ownership, provenance, predictable in-page links, accessible reading order, and correction burden.
- **Enterprise Design Systems & Prototyping — applied:** shared component behavior, responsive variants, token-level contrast, and regression coverage.
- **Source status:** component/CSS/screenshots/test output are **Verified**; WCAG/COGA recommendations are reviewer professional practice; no claims were inferred from index-only source titles.
- **Hard-gate status:** no demonstrated inaccessible critical flow; however, adaptive-mode validation remains open, so readiness is **Conditional / REVISE**.
- **Validation still required:** 200%/400% reflow, WCAG text-spacing override, Windows forced colours, and one real screen-reader pass.

## Final recommendation

**REVISE (conditional on validation only).** Source-level accessibility findings are resolved. Complete 200%/400% reflow, WCAG text-spacing, Windows forced-colour, and VoiceOver or NVDA checks. If those pass, change the verdict to **PASS**. No finding warrants **STOP**.

## Handoff

**accessibility-reviewer → design-builder:** “No critical blocker, and the source fixes are complete: 12px meaningful portrait text, 11px folio/provenance, one-column narrow MSK, wrapped Mobbin labels, and no repeated figure label. The live-DOM fallback, qualifier order, contrast, image hiding, link targets, and texture treatment are solid. Bring back 200%/400%, text-spacing, forced-colour, and real screen-reader evidence; that validation is the only reason this remains REVISE instead of PASS.”
