# Healthcare Product Designer Recut — Density Continuation Review

_Date: 2026-10-21_  
_Scope: Task 12 — six case-study disclosure controls and Grove's default research-to-decision path_  
_Reviewed against: approved recut brief, Task 12 plan, Riso direction lock, voice specification, `design-taste-frontend`, accessible-content, Laws of UX, and recruiter-audit criteria_

## Summary

The slice reduces recruiter reading cost without changing the case-study architecture or hiding evidence. Eight generic disclosure preambles are gone; every control now leads with the specific object a reviewer can inspect. Grove's moderated-test and self-report evidence is one chronological passage, while sample, dates, participant mix, method type, limitation, ranked findings, current phase, and next test remain visible.

Verdict: **Pass.** A fresh context-isolated anti-AI review returned 0 High, 0 Medium, and 0 Low findings with Low tell density. The neuroinclusive assessment remains a standards-based, non-blind review and makes no condition-specific or lived-experience claim.

## Findings

### Critical

None.

### Major

None.

### Minor

None introduced by this slice.

### Notes

- Grove still asks readers to interpret four survey figures. That is essential evidence, not decorative numeracy; the plain `Limit:` sentence immediately after the figures states what those numbers cannot prove.
- Real healthcare recruiters, neurodivergent participants, and assistive-technology users remain external validation. This slice does not convert synthetic or standards-based review into lived-experience evidence.

## Accessible-content and neuroinclusive review

- One H1 and the existing H2/H3 hierarchy remain intact.
- Disclosure titles make sense out of context: `Inspect the complete service blueprint`, `Review all five findings and pretotypes`, and their peers name the revealed object without a generic category line.
- Grove's merged research copy uses three sentences and keeps the evidence in chronological order. The longest sentence stays within the project's 24-word voice limit.
- Attention and working-memory demand improve because the reader no longer has to reconcile two repeated study introductions or decode a separate evidence-boundary card.
- Predictability is preserved through native `details`/`summary`, visible Open/Close text, retained 72px summary rows, 44px state targets, and unchanged chapter navigation.
- This is a standards-based, non-blind review. No condition-specific or lived-experience claim is made.

## Laws of UX trace

| Lens | Interface evidence | Prediction | Counter-risk | Acceptance criterion | Validation | Status |
|---|---|---|---|---|---|---|
| Cognitive Load | Two Grove study introductions and generic disclosure preambles repeated information already carried by the headings. | Removing duplicate orientation should reduce extraneous reading without reducing evidence. | Compression could hide method or limits. | Dates, sample, participant mix, evidence type, limitation, decision, and next test remain visible. | Source audit, rendered 390px review, and structural tests. | Verified |
| Chunking | The moderated test and survey form one research sequence before ranked results. | Chronological grouping should make the evidence-to-decision chain easier to reconstruct. | One paragraph could become dense. | Use short sentences and retain a separate visible limit line. | Rendered mobile review and voice-spec check. | Verified |
| Jakob's Law | All optional depth continues to use native disclosure behavior. | Familiar controls preserve keyboard and screen-reader predictability. | Styling could obscure expanded state. | Specific summary name, visible Open/Close state, Space activation, focus outline, and 44px target. | 76/76 accessibility matrix plus rendered Grove and Logistics checks. | Verified |

Source status: practitioner synthesis from Jon Yablonski's Laws of UX selection guide. The behavioral predictions remain hypotheses until representative recruiter testing.

## Recruiter lens

The previously verified audit remains **22/22 applicable checks (100%)**; the two outreach-list checks remain outside the portfolio artifact. This slice touches three audit areas and preserves all three:

- proof remains before optional depth;
- research appears as a decision trace, not a method inventory;
- the page is shorter to scan without moving limitations behind a disclosure.

Research Evidence Integrity Gate: **Pass for Grove.** The method types, participants, dates, product phase, attitudinal/self-report boundary, qualitative task-record limitation, design decision, and retest requirement remain visible.

## Design-system evolution

Verdict: **Compose.** The slice removes an unnecessary sub-label from the existing native disclosure component and simplifies its existing layout. It introduces no component, token, dependency, route, radius, colour, or motion pattern. The Riso direction lock remains authoritative.

## Anti-AI and taste status

- Mechanical tell check: Pass (`radius-values=0`, `font-size-values=0`, `hardcoded-colors=15`).
- New banned-language hit in rendered copy: none.
- Visible effect: fewer mono micro-labels, fewer self-announcing evidence cards, and less repeated process narration.
- Fresh blind review: Pass — 0 High, 0 Medium, and 0 Low findings; tell density Low.
- Existing exception remains: the broader Riso system still uses intentional eyebrow labels, mono captions, hairlines, and genuine numbered sequences. Task 12 does not pretend to be a global art-direction migration.

## Verification evidence

- Rendered 390px Grove research and disclosure states: no horizontal overflow; the merged evidence passage, `Limit:` line, and specific disclosure title are visible.
- Rendered 1440px Grove: document width equals viewport width (1440px); disclosure summary is 76px high.
- Rendered 390px Medical Logistics: the specific disclosure title wraps cleanly and retains visible Open/Close state.
- Full suite: 26 suites, 232/232 tests pass.
- Flagship accessibility matrix: 76/76 pass in isolated rerun.
- Ask retrieval evaluation: 94.7% in-scope top-three hit, 100% coverage; no regression.

## Recommendation

Checkpoint Task 12 as the next recut release. Do not broaden it into a global Riso restyle without a separate six-case, Home, About, recruiter, Spanish, dark-mode, and reduced-motion migration plan.
