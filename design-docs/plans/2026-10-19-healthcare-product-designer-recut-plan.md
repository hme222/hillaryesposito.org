# Healthcare Product Designer Recut — Implementation Plan

_Date: 2026-10-19_  
_Status: Visual refinement checkpoint approved; locally verified and ready for the next bounded recut slice_
_Profile: Standard_  
_Recovery HEAD: `dcc42f8f7f5596864840a9bb2a5bc97f72251dd4`_

## Delivery rule

Work one queue at a time. Complete the Feature structure, pass the UX design-principles checkpoint, and obtain owner approval before entering the Visual queue. Use Bug only for defects found during verification. Do not mix styling exploration into the structural slices.

## Phase 0 — baseline and preservation

1. Record the exact initiative-scoped file baseline and confirm unrelated `.agents/skills/higgsfield-*` modifications remain excluded.
2. Run the current focused case-study/recruiter tests and optimized build to establish a baseline.
3. Capture representative current renders at 390 and 1440 for Home, RecruiterPanel, and one long case.
4. Record all chapter and direct-hash targets that will move inside disclosures.

**Gate:** baseline behavior and target map recorded; no source edits outside the initiative scope.

## Feature queue

### Task 1 — content map and recut wrappers

- Create a section-by-section keep-visible / optional-depth map in code comments or a small test fixture only where it improves maintainability.
- Reuse native `<details className="rp-deepDive">` and `<summary>`.
- Add no global view mode, new dependency, or speculative abstraction.
- Preserve existing IDs on sections and targets wherever possible.

**Acceptance:** the six allocations in the brief map to existing source sections; no material claim is marked optional.

### Task 2 — shared hash-open behavior and tests

- Implement the smallest shared hook or utility that detects the active fragment target.
- If the target is inside a closed disclosure, open the nearest enclosing `<details>`.
- Support initial page entry, same-page hash changes, and browser history traversal.
- Do not call `.focus()` during automatic arrival and do not write a replacement history entry.
- Leave native disclosure behavior functional if JavaScript is unavailable.
- Add focused DOM tests for nested target, visible target, missing target, unrelated disclosures, same-page navigation, and history/hash changes.

**Acceptance:** exact-target disclosure opens; unrelated disclosures remain closed; focus stays where the browser/user placed it; Back/forward behaves normally.

### Task 3 — Home and RecruiterPanel hiring hierarchy

- Keep the existing recruiter Resume and Email actions.
- Reorder primary recruiter work to MSK → Grove → Knowunity.
- Add Medical Logistics as visible Delivery Evidence.
- Group UX Woman and Mobbin with the remaining supporting evidence without making them look discarded.
- Add View résumé beside Email in Home Contact; preserve the selectable address.
- Keep link labels and accessible names concise and route-specific.

**Acceptance:** a six-second scan identifies the role, primary digital sequence, delivery proof, résumé, and email.

### Task 4 — MSK recut

- Keep hero/status boundary, before/after workflow, one-button/four-rules decision, adoption handoff, qualified outcomes, and independent proof visible.
- Group the full service blueprint under `Inspect the complete service blueprint`.
- Group related redesigns under `See the related MSK workflow redesigns`.
- Place detailed role history, system map, and extended sustainment evidence with the closest truthful disclosure.
- Test all existing MSK chapter/hash destinations.

**Acceptance:** the default path still proves healthcare workflow judgment and distinguishes proposed design from later implementation.

### Task 5 — Grove recut and copy deduplication

- Keep phase status, five-person test, 35-person survey/top three, three product directions, calm-reminder/trust decision, and next test visible.
- Consolidate repeated Phase 2 and limitation language.
- Place full research evidence under `Inspect Grove's complete research evidence`.
- Retain or rename the prototype disclosure to `Try the full Grove prototype system`.
- Preserve direct access to the working prototype proof.

**Acceptance:** default Grove reads as evidence → decision → product direction → next test; it never implies launch or completed validation.

### Task 6 — Knowunity recut

- Keep status, brief, four interaction decisions, prototype/Storybook actions, contribution split, result, and required student test visible.
- Place the constraint ledger, full reel/transcript, implementation detail, and extended AI disclosure under `Inspect all Knowunity implementation decisions` or a clearly subordinate second disclosure only if semantics require it.
- Remove repeated mocked-recall/not-shipped copy while keeping the surviving boundary adjacent to the demo claim.

**Acceptance:** Knowunity earns primary placement through craft and implementation evidence without reading as tested or shipped.

### Task 7 — UX Woman recut

- Keep research status, ownership question, six-interview method summary, three strongest findings, next experiment, and `0 of 5 run` visible.
- Place full participant/secondary-research detail, all five findings, and all five pretotype specs under `Review all five findings and pretotypes`.

**Acceptance:** the case reads as disciplined active research, not a validated product outcome.

### Task 8 — Medical Logistics recut

- Keep scale, stakes, three service changes, and qualified time/spending/protocol outcomes visible.
- Place full constraint evidence and detailed mechanism diagrams under `Inspect the logistics constraints and mechanisms`.
- Preserve outcome attribution and missing-measurement caveats.

**Acceptance:** Logistics remains the strongest visible ownership/delivery proof and is never visually treated as leftovers.

### Task 9 — Mobbin recut

- Keep ownership boundary, screenshot-versus-flow distinction, one decision sequence, and outputs visible.
- Place taxonomy/index depth, complete three-app gallery, and per-app analysis under `Explore the complete three-app capture archive`.

**Acceptance:** the default story proves information architecture and client documentation judgment without implying product ownership.

## Owner structure checkpoint — required pause

After Tasks 1–9:

- build the site;
- show Home/RecruiterPanel plus all six default case paths at 390 and 1440;
- demonstrate at least one direct hash into each type of closed evidence;
- report the visible evidence-spine checklist for every case;
- identify every moved section and surviving limitation statement.

The 2026-10-19 render set satisfies this evidence checkpoint, but it does not authorize Task 10 by itself. The UX design-principles gate below must also pass.

## UX design-principles checkpoint — required gate

Review record: `design-docs/reviews/2026-10-20-healthcare-product-designer-recut-ux-principles-checkpoint.md`.

The initial verdict was **Revise before Visual queue**. The 2026-10-20 correction re-check is now **Pass**:

1. Split Home into explicit `Primary product cases` and `Supporting evidence` regions; preserve MSK → Grove → Knowunity and keep Medical Logistics, UX Woman, and Mobbin visible without equal flagship weight.
2. Reorder and tighten RecruiterPanel so View résumé and Email me remain early, secondary utilities follow selected work, and the MSK title enters the first 390×844 viewport.
3. Align all `Next case study` links to MSK → Grove → Knowunity → Medical Logistics → UX Woman → Mobbin → MSK.
4. Repair `CaseStudyChapters` so destination focus happens once and promptly, and a later user focus action is never overridden by a 1,100ms callback.
5. Restructure Grove's three product directions into one accessible scan-first comparison while keeping the evidence boundary, trust decision, Phase 2 state, limitation, and next test visible.
6. Replace or validate `Delivery Evidence` with plain recruiter-facing language and split clause-heavy panel summaries into a proof line plus a status/limitation line.

**Acceptance:** met. The checkpoint's five Major findings are resolved; the specified Home hierarchy, first mobile panel viewport, next-case sequence, delayed-focus regression, Grove evidence spine, recruiter-panel heading navigation, and user-input cancellation pass rendered, automated, heuristic, and accessibility re-checks. Hillary approved entry to Task 10 on 2026-10-21.

## Visual queue

### Task 10 — disclosure and composition refinement

- Refine existing `.rp-deepDive` spacing, summary affordance, focus state, wrapping, and open-state rhythm only after structural approval.
- Refine the approved Grove scan-first comparison without restoring three equal, vertically repeated feature blocks.
- Keep labels readable at 320px and touch targets at least 44px.
- Use existing tokens and case color systems.
- Preserve distinct evidence backbones: workflow for MSK, research-to-direction for Grove, interaction decisions for Knowunity, study-to-experiment for UX Woman, intervention-to-outcome for Logistics, taxonomy-to-output for Mobbin.
- Add no decorative treatment that competes with product evidence.

**Acceptance:** the shared pattern feels coherent without making all six cases look structurally identical.

**Result — 2026-10-21:** Pass. The shared native disclosure gained explicit Open/Close state, stronger wrapping/focus behavior, and 72px minimum summary rows. The three primary openings now use visibly different evidence compositions: MSK workflow handoff, Grove research progression, and Knowunity build/boundary fields. All three H1s hold to two lines at 320 and 390, and live browser checks found no horizontal overflow. A fresh blind anti-AI pass approved entry to refinement; the added `design-taste-frontend` review removed the newly introduced 01/02/03 hero ledger and exposed the remaining deliberate Riso-system conflict for later system-level review.

## Verification and Bug queue

### Task 11 — full verification and repair

Run and document:

1. Focused disclosure/hash DOM tests.
2. Existing case-study, recruiter-panel, navigation, accessibility, and localization tests.
3. Full relevant Jest suite and TypeScript checks.
4. Optimized production build.
5. Browser matrix at 320, 390, 900, 1440, and short landscape.
6. Keyboard-only path: open/close disclosures, activate résumé/email, use chapter links, use Back.
7. Screen-reader semantic review of summary names, expanded state, heading order, and link purpose.
8. 200% equivalent reflow, representative higher zoom, reduced motion, light/dark, and Spanish regression.
9. Every initial and in-page hash that targets recut content.
10. Component registry freshness or a documented proof that no registry entry changed.
11. House-style prebuild/final validation and tell scan.
12. Fresh-context recruiter scan and blind anti-AI review.
13. Canonical next-case loop and RecruiterPanel first-viewport hiring path.
14. Chapter activation followed by a newer Tab/click action; verify no delayed focus reclamation.
15. Design-state and review-record update.

Repair failures in the Bug queue, rerun the smallest affected checks, then rerun the release gates.

**Result — 2026-10-21:** Pass locally with one documented taste-system exception. The full suite passes 232/232; the final flagship accessibility matrix passes 76/76; TypeScript, optimized build, registry freshness, house-style final, tell scan, and diff checks pass. Live responsive checks cover 320, 390, 720 short-landscape / 200%-equivalent width, 900, and 1440 with no horizontal overflow. The recruiter panel keeps résumé, email, Selected work, and MSK in its first 390×844 viewport. Native disclosures toggle with Space; representative dark mode passes and the user state was restored. Fresh blind anti-AI review passed entry to Visual refinement. The strict `design-taste-frontend` lint remains red on the established Riso eyebrow/mono/hairline/numbering language; the exception and raw-versus-capped scores are recorded in `design-docs/reviews/2026-10-21-healthcare-recut-design-taste-frontend.md`. Real recruiter and assistive-technology sessions remain external validation.

## Default-path evaluation checklist

Each case passes only if a reviewer can find these without opening a disclosure:

- problem/stakes;
- Hillary's role and contribution;
- status and ownership boundary;
- research/sample evidence where applicable;
- strongest artifact;
- primary decision and why;
- outcome or current state;
- metric attribution where applicable;
- material limitation and next step.

Word count and scroll height may be reported as diagnostics, but neither determines success.

## Engineering Law Trace

| Law | Evidence | Risk / counter-risk | Required response | Acceptance | Result |
| --- | --- | --- | --- | --- | --- |
| Gall's Law | Native `.rp-deepDive`, project-row, panel, and chapter patterns already work. | New global mode adds state; overusing one pattern makes cases monotonous. | Extend native patterns selectively and vary visible evidence topology. | No dependency or global mode; semantic no-JS disclosure remains. | Pass — reused native details/links/sections and existing row grammar |
| Law of Unintended Consequences | Chapter/direct hashes may move inside closed details. | Recuts can make links appear broken; repeated correction can override a newer user action. | Open only the exact enclosing disclosure; focus once; cancel settling on later user input. | Direct entry, in-page hash, Back/forward logic, keyboard, pointer, and interruption tests pass. | Pass — direct Grove target lands at 64–66px; focus and scroll cancellation verified |
| Testing Pyramid | DOM tests and rendered review already exist. | Screenshots miss semantics; unit tests miss composition. | Focused logic tests plus a small representative browser matrix and release suite. | All scoped and release gates pass. | Pass — 229-test full suite, 112-test final focused matrix, TypeScript, build, and responsive renders |
| Goodhart's Law | Length exposes density but not story quality. | Fixed cuts hide truth; no measurement permits repetition. | Use measurements diagnostically and the nine-item visible-spine checklist as the verdict. | Six complete default stories; no fixed percentage target. | Pass — Grove shortened while decisions, limitation, state, and next test remain visible |

## Release boundary

Completion of this plan does not authorize commit, push, deployment, application submission, recruiter outreach, or résumé changes. Those remain explicit owner decisions after final review.

