# Healthcare Product Designer Recut — Structure Checkpoint

_Date: 2026-10-19_  
_Status: Structure evidence complete; superseded as the active gate by the 2026-10-20 UX principles checkpoint_  
_Queue completed: Feature_  
_Recovery HEAD: `dcc42f8f7f5596864840a9bb2a5bc97f72251dd4`_

## Checkpoint verdict

**Structure evidence is complete.** The approved healthcare hiring hierarchy, contact path, six case-study recuts, and hash-safe disclosures are implemented without a new visual system or dependency. Visual refinement has not started.

**2026-10-20 gate update:** a separate UX design-principles checkpoint reviewed this rendered structure and returned **Revise before Visual queue**. It found no Critical blocker, but it requires explicit Home grouping, RecruiterPanel first-viewport reprioritization, canonical next-case sequencing, delayed chapter-focus repair, and Grove scan compression before owner approval. See `design-docs/reviews/2026-10-20-healthcare-product-designer-recut-ux-principles-checkpoint.md`.

The default paths are materially shorter or more selective, but scroll height is treated as diagnostic rather than the verdict. Grove remains the longest mobile case because its three product directions and trust decision are still visible; visual compression is a candidate for the next queue, not a reason to hide those decisions.

## Hiring hierarchy now rendered

### Home

1. MSK
2. Grove
3. Knowunity
4. Medical Logistics — visibly labeled `Delivery Evidence`
5. UX Woman — visibly labeled `Supporting research · active`
6. Mobbin — retained as the supporting documentation link

Home Contact now keeps `Email me` and `View résumé` adjacent and preserves the visible, selectable email address.

### RecruiterPanel

- Selected work: MSK → Grove → Knowunity
- Supporting evidence: Delivery Evidence / Medical Logistics → UX Woman → Mobbin
- Existing View résumé, Email me, LinkedIn, About, and Ask actions remain.

## Case-by-case visible evidence spine

| Case | Problem / role / status | Evidence and strongest artifact | Decision | Outcome / limitation | Result |
| --- | --- | --- | --- | --- | --- |
| MSK | Clinical filing detour; Hillary's workflow diagnosis and proposal; later implementation remains attributed to IT/UX | Recreated filing queue, exact before/after workflow, no-patient-data boundary | One button with four rules | Adoption handoff, independent proof, qualified outcomes, and initiative attribution remain visible | Pass |
| Grove | Sole designer; Phase 2 of 3; retest pending | 5-user moderated test, 37-person survey, top three priorities, visible evidence boundary | Three product directions plus calm reminder and trust decision | Current state, next test, and no-behavior/no-demand limitation remain visible | Pass |
| Knowunity | Solo sprint on Knowunity's brief and kit; working prototype, not shipped | Four interaction decisions, working prototype, Storybook, supplied-versus-created split, visible AI-assisted implementation | Student's own words as proof; transparent recovery states | Badge/review, mocked recall, no student testing, and required speech-to-text test remain visible | Pass |
| UX Woman | Active healthcare research; sole researcher | Six-interview summary, no dedicated patient stream, three strongest findings | Reconstruct recent cases before choosing a build | Cannot-claim statement, next experiment, and `0 of 5` pretotypes run remain visible | Pass |
| Medical Logistics | Direct service ownership at operational scale | Stakes, scale, three service changes, strongest mechanism in hero | Move the supply point, standardize the request, expose order status | Owner-reported time/spending/protocol outcomes and missing measurement periods remain visible | Pass |
| Mobbin | Client documentation, not product ownership | Screenshot-versus-flow method, one complete decision sequence, visible source-product boundary | Preserve useful states, sequence the task, name it for retrieval | Searchable output and ownership disclaimer remain visible | Pass |

## Evidence moved into optional depth

### MSK

- `Inspect the complete service blueprint`: complete actor/handoff blueprint.
- `See the related MSK workflow redesigns`: certification/onboarding mechanisms, three-role history, methods, service scope, and system map.
- Visible after the disclosures: implementation handoff, adoption record, independent MSK proof, and qualified outcomes.

### Grove

- `Inspect Grove's complete research evidence`: lower-ranked nine features, extended research artifacts, florist quote, and complete six-screen first-build gallery.
- `Try the full Grove prototype system`: AI/implementation record, conditional five-call table, interactive component lab, Storybook link, type scale, care-logic record, tokens/principles.
- Visible research limitation retained outside the disclosure.

### Knowunity

- `Inspect all Knowunity implementation decisions`: complete constraint ledger, extended AI-build attribution, and full reel/transcript.
- Visible prototype/Storybook actions, contribution split, AI-assisted boundary, mocked-recall note, result, and required student test remain outside.

### UX Woman

- `Review all five findings and pretotypes`: full participant and secondary-research detail, remaining two findings, and all five pretotype specifications.
- The three strongest findings, no-patient-stream limitation, cannot-claim statement, next step, and zero-run status remain outside.

### Medical Logistics

- `Inspect the logistics constraints and mechanisms`: full fixed-constraint evidence, service-scope explanation, and three mechanism diagrams.
- Stakes, three interventions, and attributed outcomes remain outside.

### Mobbin

- `Explore the complete three-app capture archive`: taxonomy/index lens, three-app gallery, per-app analysis, and verification link.
- Ownership boundary, method, decision sequence, and outputs remain outside.

## Direct-link behavior

The shared case-study chrome now:

- opens only the nearest closed `<details>` containing the exact target;
- supports initial lazy-route entry, `hashchange`, `popstate`, and chapter links that use `history.replaceState`;
- scrolls a late-mounted target into view after opening its disclosure;
- does not call `.focus()` or write browser history;
- leaves native disclosure behavior available without JavaScript.

Rendered 390px direct-link checks:

| Target | Open | Target top | Focus |
| --- | --- | ---: | --- |
| `msk-redesigns` | Yes | 64px | `BODY` |
| `grove-prototype` | Yes | 104px | `BODY` |
| `uxwoman-pretotypes` | Yes | 64px | `BODY` |
| `log-constraints` | Yes | 64px | `BODY` |
| `mobbin-brief` | Yes | 104px | `BODY` |

## Rendered measurements

All fourteen default route/viewport combinations had `overflowX = 0`. Every case-study H1 begins at 246px on the 390px capture, preserving the approved mobile orientation.

| Route | 390px height | 1440px height | Closed disclosures |
| --- | ---: | ---: | ---: |
| Home | 7,243px | 5,949px | 0 |
| MSK | 8,882px | 8,275px | 2 |
| Grove | 9,750px | 7,988px | 2 |
| Knowunity | 7,521px | 7,230px | 1 |
| UX Woman | 5,807px | 5,111px | 1 |
| Medical Logistics | 5,982px | 4,646px | 1 |
| Mobbin | 5,865px | 6,537px | 1 |

Capture evidence for this run is stored temporarily at `/tmp/health-recut-structure/`, including full-page 390/1440 renders, direct-link states, Home work/contact crops, RecruiterPanel crops, and `audit.json`.

## Verification completed

- Flagship structural accessibility: **70/70 passed**.
- Shared hash behavior, hiring path, and mobile orientation: **35/35 passed**.
- TypeScript: passed during the case slices.
- Optimized production build: passed; main JavaScript 111.57 kB gzip, main CSS 30.96 kB gzip.
- Component registry: regenerated for the RecruiterPanel source fingerprint and current.
- `git diff --check`: passed.
- Rendered default paths: Home plus six English cases at 390 and 1440, zero horizontal overflow.
- Rendered direct-link disclosure audit: five representative hidden targets passed with no focus theft.

Known non-blocking test noise: the flagship suite emits pre-existing `act(...)` timer warnings and an axe preload-timeout warning around the optional opening film; all 70 assertions pass.

## Engineering Law checkpoint

- **Gall's Law:** Pass — reused native `.rp-deepDive`; no global mode or dependency.
- **Law of Unintended Consequences:** Pass at structure checkpoint — hidden chapter targets were explicitly tested and rendered.
- **Testing Pyramid:** Pass at structure checkpoint — DOM behavior tests plus browser renders; final full release matrix remains later.
- **Goodhart's Law:** Pass — all six visible evidence spines pass; no case was approved by a fixed scroll-reduction target.

## Owner decision requested — replaced by the UX correction gate

This document preserves the original structure evidence. Final structure approval now follows the corrective re-check defined in the 2026-10-20 UX principles checkpoint, including:

1. explicit primary/supporting Home regions;
2. work-first RecruiterPanel priority while keeping résumé and email early;
3. the canonical next-case sequence;
4. chapter-focus user control;
5. Grove's scan-first comparison and recruiter-facing evidence labels.

Visual styling, full accessibility matrix, blind recruiter review, final house-style validation, commit, and deployment remain unstarted or unauthorized.

