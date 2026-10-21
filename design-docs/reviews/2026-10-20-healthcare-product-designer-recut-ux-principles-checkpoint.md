# Healthcare Product Designer Recut — UX Design Principles Checkpoint

_Date: 2026-10-20_  
_Status: Pass after correction re-check; owner approval required before Visual queue_  
_Reviewed artifact: implemented Feature-queue recut at the 2026-10-19 structure checkpoint_  
_Target audience: healthcare and health-tech product-design recruiters and hiring managers_

## Correction re-check — 2026-10-21

**Verdict: Pass.** This re-check supersedes the initial `Revise before visual refinement` verdict below. The five Major findings and the two reviewer residuals found during the correction pass are resolved. Independent heuristic and accessibility re-checks report 0 Critical, 0 Major, and 0 Minor findings in scope.

- Home now exposes separate, labelled `Primary product cases` and `Supporting evidence` sections. MSK, Grove, and Knowunity retain the full project-row grammar; Medical Logistics and UX Woman use a smaller supporting row; Mobbin remains a compact documentation route.
- At 390×844, the recruiter panel places View résumé and Email at `y=424px`, `Selected work` at `y=553px`, and the MSK row at `y=602px`. The initial viewport contains the role, proof statement, both hiring actions, the work heading, and the first flagship.
- The case loop is now MSK → Grove → Knowunity → Medical Logistics → UX Woman → Mobbin → MSK, with direct regression coverage.
- Keyboard chapter activation focuses its destination once and promptly; pointer activation does not move destination focus. Delayed scroll-settling retries never move focus and now cancel on the next wheel, touch, pointer, or keyboard input, so the reader's newer intent wins.
- Grove now presents three next-design directions in one semantic `dl`, followed by one representative first-build artifact and the visible Phase 2 limitation. The mobile page height fell from 9,750px to 8,916px as a diagnostic; preserved evidence, not length alone, remains the acceptance standard.
- Recruiter-panel subsections are real `h3` headings with named sections. Small panel labels/status copy increased to `.7rem`/`.75rem` while retaining passing contrast.
- A direct lazy-route link to `#grove-decisions` now lands 64px below the mobile sticky chapter strip and 66px below it at desktop, with focus left on `BODY` and no horizontal overflow.

**Verification:** full Jest 26/26 suites and 229/229 tests passed before the final two reviewer repairs; the post-repair focused accessibility, hiring-path, chapter, and hash matrix passes 112/112; TypeScript passes; the optimized build, component-registry check, final house-style validator, tell scan, and `git diff --check` pass. Known React `act()` and asset-preload messages are test-harness warnings, not failed assertions.

**Anti-AI audit boundary:** the mechanical tell scan passes after adding the previously approved exact exclusions for the rubric's banned-language table and the accessibility test's negative-assertion fixture. A non-blind senior-language pass replaced the RecruiterPanel's one remaining em-dash connective with two direct sentences. The fresh-context blind reviewer could not complete because its delegated account hit a usage limit, so the blind anti-AI release gate remains pending in Task 11; it does not invalidate this structural UX checkpoint.

**Recruiter audit update:** the three formerly failed structural checks now pass under the same expert-review proxy, producing 22/22 applicable checks. This remains a heuristic result, not evidence from representative recruiters or assistive-technology users.

**Gate:** the corrected Feature structure may enter the Visual queue only after Hillary's explicit approval. Commit, push, deployment, applications, and recruiter outreach remain unauthorized.

## Verdict

**Revise before visual refinement.** No Critical access or truth blocker was found. The recut is materially more truthful, predictable, and inspectable than the prior structure, but five Major issues still weaken the intended hiring path:

1. Home still gives five projects near-peer flagship weight.
2. The `90-second tour` delays selected work until the bottom of the first mobile viewport.
3. `Next case study` follows the old loop rather than the approved hiring sequence.
4. Chapter navigation takes keyboard focus back 1.1 seconds after the visitor has moved on.
5. Grove and MSK still demand long default scans, with Grove carrying the clearest removable repetition.

This is an expert heuristic and rendered-interface review, not recruiter or neurodivergent-participant validation. Behavioral effects are predictions until representative testing is run.

## Decision frame

- **User:** a time-constrained healthcare-product recruiter or hiring manager, including readers who use keyboard navigation, screen readers, zoom, reduced motion, or who benefit from lower memory and attention demands.
- **Primary task:** identify Hillary's target role, inspect the three strongest product cases, verify one decision and its evidence, understand status and ownership limits, then open the résumé or make contact.
- **Desired outcome:** the reviewer can form a correct hiring hypothesis quickly without losing access to deeper evidence.
- **Consequence of error:** the reviewer may misclassify supporting work as flagship proof, miss the strongest sequence, overread an unvalidated claim, or abandon before reaching a decision.
- **Evidence inspected:** current source; live Home, RecruiterPanel, and Grove at 390×844; 390/1440 rendered audit data for Home and six English cases; five direct-link renders; automated accessibility/hash/hiring/mobile results; approved brief, build contract, implementation plan, and structure checkpoint.
- **Evidence limit:** no representative six-second, timed-comprehension, screen-reader, or neurodivergent-participant session was run for this checkpoint.

## Verified rendered evidence

- Home identifies `Healthcare Product Designer`, leads with MSK, exposes a sourced proof strip, and keeps Email and View résumé together.
- The Home work region places MSK, Grove, Knowunity, Medical Logistics, and UX Woman inside one `Selected work` region using the same large project-row grammar. Logistics and UX Woman rely on smaller inline classification labels; Mobbin is already demoted to a compact documentation link.
- At 390×844, RecruiterPanel places `Selected work` at `y = 834.64px`, after the role, a long one-line summary, and four full-width actions: View résumé, Email me, LinkedIn, and About me.
- The default mobile heights remain Home 7,243px, MSK 8,882px, Grove 9,750px, Knowunity 7,521px, UX Woman 5,807px, Medical Logistics 5,982px, and Mobbin 5,865px. Height is diagnostic, not a quality verdict.
- Grove keeps its evidence boundary, three decisions, trust decision, state, limitation, and next test visible with optional research and prototype depth closed.
- Native disclosures, specific summary labels, direct-link recovery, selectable email fallback, and sticky chapter navigation are implemented.
- The current `Next case study` loop is MSK → Mobbin → Grove → UX Woman → Knowunity → Medical Logistics → MSK, which contradicts the approved MSK → Grove → Knowunity primary path.
- A live keyboard test confirmed that after activating Grove's `Decisions` chapter and moving focus onward, the scheduled 1,100ms callback moves focus back to the destination H2 `Three features, one testable direction each.`
- Existing verification remains valid: flagship structural accessibility 70/70, shared hash/hiring/mobile 35/35, build pass, registry current, zero horizontal overflow in the 390/1440 render set, and no focus theft on automatic deep-link arrival. The delayed chapter-focus defect is a separate click-navigation behavior not covered by those passes.

## Nielsen heuristic checkpoint

| Heuristic | Status | Evidence and judgment |
| --- | --- | --- |
| Visibility of system status | Pass | Sticky active chapters, reading-progress cues, disclosure state, explicit project phase/status, and visible claim boundaries make location and evidence state legible. |
| Match between system and the real world | Revise | Outcome-led titles are strong. `Delivery Evidence` reads like internal portfolio taxonomy; a recruiter should not have to translate what it proves. |
| User control and freedom | Major | Native disclosures and Back/forward-safe hashes are strong. The verified delayed chapter focus overrides a newer user action and must be repaired. |
| Consistency and standards | Major | Native links and details are predictable. Home's five peer-weight rows contradict the declared three-primary hierarchy, while next-case links contradict the same order. |
| Error prevention | Pass | Visible ownership, status, sample, attribution, and limitation language prevents consequential overclaiming. |
| Recognition rather than recall | Major | Evidence spines and chapters reduce memory demand, but project priority must still be inferred from order and small labels. |
| Flexibility and efficiency | Major | Direct hashes, chapter links, prototype links, disclosures, résumé, and email support multiple routes. The tour delays work, and the sequential case loop sends readers through the wrong evidence order. |
| Aesthetic and minimalist design | Revise | Progressive disclosure removed real process theatre. Five peer rows, four large utility actions before work, and repeated Grove comparison blocks still compete with priority. |
| Help users recognize and recover from errors | Pass / limited applicability | The portfolio has no form-error flow; selectable email provides recovery when `mailto:` is unavailable. |
| Help and documentation | Pass / limited applicability | Plain status labels, specific disclosures, and scoped glossary terms are sufficient; the portfolio should remain self-explanatory. |

## Laws of UX trace

Framework attribution: Jon Yablonski's [Laws of UX](https://lawsofux.com/). Application below is **practitioner synthesis**. Predictions are **Proposed** until representative validation.

| Lens | Interface evidence | Prediction | Counter-risk | Observable acceptance criterion | Status |
| --- | --- | --- | --- | --- | --- |
| Law of Common Region + Similarity | Five Home projects share one labelled region and the same large row grammar. | Separate primary and supporting regions should improve correct classification. | Supporting work could become too hidden or look weak. | Distinct labelled DOM regions; five-second participants consistently identify the same three primary cases and still find Logistics/UX Woman. | Revise and test |
| Hick's Law / Choice Overload | Four or five large RecruiterPanel utilities precede its project list. | Keeping résumé and email early while demoting LinkedIn/About/Ask should shorten the choice point and expose proof sooner. | Secondary paths may lose discoverability. | First 390×844 viewport includes role, one proof statement, résumé, email, `Selected work`, and the MSK title; keyboard order matches. | Revise and test |
| Serial Position Effect | MSK is first, but old next-case links immediately break the primary sequence. | Aligning Home, panel, and sequential navigation should reinforce the strongest three-case narrative. | A rigid loop could bury relevant supporting evidence. | Exact sequence: MSK → Grove → Knowunity → Medical Logistics → UX Woman → Mobbin → MSK, with supporting status named. | Revise |
| Cognitive Load + Chunking + Tesler's Law | Details remove secondary depth, but Grove repeats three full first-build/next-design blocks and MSK carries irreducible safety-system context. | One scan-first Grove comparison should reduce extraneous effort without deleting evidence. | Overcompression could erase rationale, limits, or attribution. | All nine evidence-spine items remain visible; timed reviewers can state role, status, decision, outcome/current state, and limitation. | Revise and test |
| Jakob's Law | Native links, buttons, dialog, `<details>`, and familiar résumé/email labels are used. | Familiar mechanics should reduce learning effort and support assistive technology. | Closed depth could hide required evidence. | Specific summary labels, exact-target opening, keyboard operation, and no automatic focus movement remain verified. | Pass, except chapter-focus defect |

## Conflicts resolved

- **Hick's Law vs. Tesler's Law:** remove unnecessary decision competition, not material claim complexity. Résumé and email stay early; truth boundaries stay visible.
- **Serial position vs. evidence access:** prioritize three primary cases while preserving labelled access to delivery, active research, and documentation proof.
- **Jakob's Law vs. portfolio distinctiveness:** keep familiar mechanics; express distinctiveness through evidence, typography, composition, and case-specific artifacts.
- **Aesthetic-usability effect vs. accessibility:** visual polish may improve perceived ease, but it cannot begin by papering over false grouping, delayed focus, or misleading sequence.

## Findings

### Critical

None verified.

### Major 1 — Home still renders five flagships

**Who is affected:** time-boxed recruiters, hiring managers comparing project relevance, interrupted readers, and people who benefit from explicit grouping.

**Why it matters:** one `Selected work` region and one project-row grammar communicate peer status more strongly than small inline labels communicate hierarchy. The current render asks the reader to infer the approved primary/supporting distinction.

**Required correction:** create a real semantic and visual boundary after Knowunity:

- `Primary product cases`: MSK, Grove, Knowunity.
- `Supporting evidence`: Medical Logistics and UX Woman.
- Keep Mobbin as the compact documentation proof inside or immediately after the supporting region.

Supporting cases must remain prominent enough to inspect, but they should not retain identical flagship scale.

### Major 2 — the 90-second tour delays the work

**Who is affected:** recruiters who opened the panel specifically for a fast work scan, mobile visitors, and people managing attention or language-processing load.

**Why it matters:** `Selected work` begins at the last 9.36px of the first 390×844 viewport. The panel first asks the visitor to process biography and four utility choices.

**Required correction:** keep View résumé and Email me adjacent and early; move LinkedIn, About, and Ask below Selected work or into a clearly secondary utility row; tighten `In one line` to a true scan-length proof statement.

### Major 3 — sequential navigation contradicts the approved hierarchy

**Who is affected:** reviewers who use `Next case study` instead of returning Home.

**Why it matters:** the interface says MSK → Grove → Knowunity is the primary story, then sends MSK readers to Mobbin and Grove readers to UX Woman. This is a direct information-architecture conflict, not a styling preference.

**Required correction:** use one canonical loop: MSK → Grove → Knowunity → Medical Logistics → UX Woman → Mobbin → MSK. Preserve honest supporting labels in each next-card tag.

### Major 4 — chapter navigation steals focus after the user moves on

**Who is affected:** keyboard and screen-reader users and anyone who resumes interaction quickly after a chapter jump.

**Why it matters:** a delayed callback overrides a newer explicit user action, undermining predictability and task resumption.

**Required correction:** focus the destination once, promptly after activation, then use any later layout-settling passes for scroll only. Cancel pending focus work on a subsequent pointer, keyboard, or focus action.

### Major 5 — Grove's default comparison is still too repetitive

**Who is affected:** time-boxed recruiters and readers managing sustained-attention or reading fatigue.

**Why it matters:** progressive disclosure removed secondary depth, but three vertically repeated first-build/next-design units still consume a long scan before the trust decision and current state. MSK is also long, but its workflow/permission context is less obviously redundant.

**Required correction:** structure Grove's three directions as one accessible scan-first comparison, then feature the strongest artifact. Keep the evidence boundary, trust decision, Phase 2 status, limitation, and next test visible. Test MSK comprehension before cutting further.

### Minor — wording and signal strength

- Replace or validate `Delivery Evidence`; `Delivery ownership`, `Operational delivery`, or another truthful plain-language phrase should say why the case matters without inflating product ownership.
- Raise consequential classification labels out of the smallest mono-text tier; the primary/supporting distinction should not depend on visually quiet metadata.
- Split clause-heavy panel project summaries into one proof line and one explicit status/limitation line.

These Minor items are assigned to the immediate correction/visual pass, so no new design-debt row is created at this checkpoint.

## Recruiter audit — 24 checks

| # | Check | Status | Rendered evidence / repair |
| ---: | --- | --- | --- |
| 1 | Hero names one role | Pass | `Healthcare Product Designer` is explicit. |
| 2 | Cases support a coherent niche/capability | Pass | Healthcare workflows, research-to-product judgment, interaction craft, delivery, and documentation form a coherent product-design story. |
| 3 | Visitor can explain what to hire Hillary to do | Pass | `I design the workflow before the screen` plus the MSK proof defines the job. Representative recall remains untested. |
| 4 | Every case title carries a result, scale, or meaningful outcome | Pass | All six lead with a decision, outcome, hypothesis, or scale. |
| 5 | Hero includes evidence of impact | Pass | MSK workflow replacement and 21,000+ scope are visible. |
| 6 | Titles avoid generic redesign language | Pass | Titles state the change or evidence, not generic process. |
| 7 | Focused target-company list exists | N/A | Outreach artifact, not verifiable in this portfolio. |
| 8 | Outreach reaches relevant people | N/A | Outreach behavior, not verifiable in this portfolio. |
| 9 | Loads on mobile with proof near the top | Pass | 390px audit has zero overflow; role, MSK proof, CTA, and sourced proof strip lead. |
| 10 | Real outcomes appear in the first scan | Pass | MSK scope and Logistics operating change appear near the opening. |
| 11 | Proof strip/client/metrics appears near opening | Pass | Sourced MSK, Logistics, and Grove proof strip is present. |
| 12 | Proposition survives without decoration | Pass | Role, decision, evidence, and CTA remain textually persuasive. |
| 13 | Each case foregrounds a meaningful decision | Pass | Six visible evidence-spine checks passed. |
| 14 | Generic process theatre is compressed | Pass | Secondary method, galleries, and implementation depth use specific disclosures. |
| 15 | Each study is concise enough for recruiter scanning | Fail | Grove 9,750px and MSK 8,882px at 390px; Grove retains removable repetition. |
| 16 | Six-second role identification | Pass | Role is explicit in hero and panel; expert-render proxy only. |
| 17 | Six-second recall of one result | Pass | MSK detour/queue result is visible without explanation; representative recall remains untested. |
| 18 | Six-second next action | Pass | Review MSK, open the tour, email, and résumé actions are explicit. |
| 19 | No more than three primary public cases | Fail | Declared hierarchy has three, but Home visually groups five as peer selected work. |
| 20 | Every public study earns its place | Pass | Each carries a distinct hiring signal and truthful outcome/state. |
| 21 | Strongest relevant study appears first | Pass | MSK leads Home, RecruiterPanel, and hero CTA. |
| 22 | Contact is one click away on every page | Pass | Email links exist on Home, cases, panel, and footer. |
| 23 | Résumé label matches behavior and positioning | Pass | `View résumé` opens the healthcare-product résumé; new-tab behavior is announced. |
| 24 | Complete first-look journey works on mobile | Fail | The Home path works, but the `90-second tour` withholds selected work until the first viewport edge and the next-case loop breaks priority. |

**Score:** 19/22 applicable checks, 86.4% normalized. Directional band: **focused repair round**, not a stop-applying rebuild. The score is a recruiter heuristic, not user evidence.

## Research Evidence Integrity Gate

| Case | Gate | Evidence |
| --- | --- | --- |
| Grove | Pass | Decision and uncertainty are visible; 5-person moderated test and 37-person survey include dates/stage; behavioral observation and self-report are distinguished; the evidence changed scope; missing task records, demand limits, retest status, and outcome boundary remain visible. |
| UX Woman | Pass | Six interviews, participant/source boundary, 2026 research stage, exploratory/self-reported status, strongest findings, next decision, no patient stream, no pretotype run, and current limitation remain visible. |
| MSK, Knowunity, Logistics, Mobbin | Not research-led for this gate | They still retain their relevant ownership, evidence, attribution, prototype, operating-result, or documentation boundaries. Competitor/client documentation is not presented as user validation. |

## Neuroinclusive cognitive-demand checkpoint

**Consequence level:** High for the owner's employment outcome; the portfolio itself does not perform a medical task.

| Task | Attention | Working memory | Language | Predictability / recovery |
| --- | --- | --- | --- | --- |
| Identify fit | Strong role and proof; competing utility actions in the tour | Low when Home is used; higher when hierarchy must be inferred | Mostly plain; `Delivery Evidence` is abstract | Stable shell and familiar actions |
| Choose a case | Five peer rows weaken priority | Reader must remember which three are primary | Outcome titles help | Old next-case loop contradicts declared order |
| Evaluate judgment | Sticky chapters and details support resumption; Grove/MSK remain long | Visible status and limits reduce recall burden | Some multi-clause summaries increase effort | Native details are predictable; delayed chapter focus is not |
| Contact / résumé | Clear adjacent actions | Selectable address removes recall/recovery burden | Familiar labels | Strong recovery from failed `mailto:` |

**What works:** repeated case architecture, specific disclosures, sticky wayfinding, explicit evidence limits, reduced-motion support, selectable email, and no automatic deep-link focus move.

**Validation plan:** run five moderated 60–90 second recruiter scans after the repair, including participants who self-identify access preferences if they choose. Supply the task in advance, allow breaks and pause/resume, accept spoken or written responses, and do not infer diagnosis from behavior. Measure correct primary/supporting classification, time to first relevant case, recall of role/decision/status/limitation, and contact/résumé completion. This expert review cannot claim the experience is neuroinclusive without lived-experience validation.

## Required pre-visual correction set

1. Split Home into labelled primary and supporting regions and reduce supporting peer weight.
2. Reorder/compress RecruiterPanel so selected work and MSK enter the first 390×844 viewport while résumé and email remain early.
3. Align every next-case link to the canonical hiring sequence.
4. Repair and regression-test chapter focus so a later user action always wins.
5. Recompose Grove's three directions into one scan-first semantic comparison without moving truth boundaries into optional depth.

## Re-check acceptance criteria

- Home exposes three primary cases without relying on order or tiny labels; Logistics, UX Woman, and Mobbin remain clearly available as supporting evidence.
- RecruiterPanel first mobile viewport contains role, one proof statement, résumé, email, `Selected work`, and the MSK title.
- Next-case path is exactly MSK → Grove → Knowunity → Medical Logistics → UX Woman → Mobbin → MSK.
- Activate a chapter, then Tab or click elsewhere within one second: focus remains on the newer target after 1.2 seconds.
- Keyboard activation still announces/focuses the chapter destination promptly; pointer activation does not create a late unexpected focus ring.
- Grove keeps every required evidence-spine item visible and passes a timed comprehension test before any further cut is accepted.
- Existing disclosure, direct-link, mobile orientation, truth, build, registry, accessibility, and Spanish regression gates remain green.

## Recommendation

Run one focused pre-visual correction slice, then repeat this checkpoint. Preserve the outcome-led headlines, MSK-first opening, proof strip, visible truth boundaries, adjacent résumé/email actions, native disclosures, and direct-link behavior. Do not start decorative or spacing refinement while the hierarchy, sequence, and focus-control defects remain.
