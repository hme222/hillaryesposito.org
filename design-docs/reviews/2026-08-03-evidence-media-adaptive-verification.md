# Evidence Media Adaptive Verification

**Date:** 2026-08-03  
**Build tested:** local `main` working tree after reflow repairs  
**Verdict:** **Conditional pass** — static assets verified; representative recall and real VoiceOver/NVDA remain open before motion generation

## Outcome

The Grove, MSK, and Mobbin static evidence posters pass the implemented adaptive regression suite. The run covered 18 live states: desktop, 200%-equivalent reflow, 400%-equivalent reflow, WCAG text spacing, forced colours, and reduced motion for all three projects.

## Verified runtime results

- 18/18 states passed; 0 recorded failures.
- 0 page or poster overflow states.
- 0 clipped poster text nodes.
- All three live-caption links measured at least 44 CSS px high and resolved to existing chapter targets.
- The visual poster remained hidden from assistive technology while the live text equivalent remained present.
- Reduced-motion mode reported 0 running animations inside the poster.
- At widths of 480 px and below, Recruiter View and Back to Top move into the mobile menu; both actions were exercised successfully in every applicable state.
- Forced-colour labels retain written distinctions: AI default/human override, Before/After, and Capture/Map/Name/Verify.

Runtime report: `/tmp/evidence-adaptive-audit/report.json`  
Repeatable harness: `scripts/evidence-adaptive-audit.cjs`

## Repairs made during verification

1. The reduced-motion footer credit list now wraps within the viewport instead of exposing the marquee's intrinsic width.
2. At reflow widths, the fixed Recruiter View shortcut moves into the mobile menu and still opens the dialog.
3. At reflow widths, Back to Top moves into the mobile menu and still returns to the page start.
4. The audit now checks all three utility behaviors rather than relying only on screenshots.

## Automated health

- Jest/axe structural suite: **40/40 passed**.
- Production build: **compiled successfully**.
- Known test-environment warning: jsdom does not implement canvas `getContext`; the warning comes from the unrelated curated-role headline measurement hook and does not fail the suite.

## Synthetic persona and recruiter walkthrough

| Task | Low-vision/reflow reader | Motion-sensitive reader | Recruiter scan | Hiring-manager comparison |
|---|---|---|---|---|
| Read problem and decision | Pass at 200%/400%; no clipping | Pass through static poster | Grove 14/16; MSK 15/16; Mobbin 13/16 | Three senior capabilities remain distinct |
| Reach supporting chapter | Pass; 44 px link target | Pass; no animation required | Descriptive links retained | Provenance and ownership visible |
| Open recruiter summary | Pass through mobile menu | Pass with transitions disabled | Available without covering evidence | Available without covering evidence |
| Return to page start | Pass through mobile menu | Instant under reduced motion | N/A | N/A |

Synthetic results are **Practitioner synthesis**, not real participant evidence.

## Remaining gates

- Run the five-person recruiter recall study in `design-docs/research/2026-08-03-evidence-poster-recruiter-recall-kit.md`.
- Run one VoiceOver/Safari or NVDA/Firefox reading-order pass and retain the transcript or notes.
- If a Grove film candidate is produced, compare it against the poster; motion must improve decision recall rather than preference alone.

## Matrix check

- **Agentic UX / Trust:** provenance, static recovery, user control, target sizing, and utility recovery are verified at runtime.
- **Enterprise Design Systems / Prototyping:** one reusable component and one repeatable browser harness cover all three projects.
- **UX Research / Strategy:** synthetic recall is directional; representative comprehension remains unresolved.
- **Prompting / Personas / Evals:** the regression harness has explicit pass/fail criteria and emits a machine-readable report.
- **Hard-gate status:** no demonstrated inaccessible critical flow; real assistive-technology evidence and representative task evaluation remain open, so motion generation is conditional.
