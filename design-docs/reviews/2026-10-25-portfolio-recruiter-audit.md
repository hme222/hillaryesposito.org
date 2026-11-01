# Portfolio Review Evidence Record

- Review ID: portfolio-2026-10-25-healthcare-recruiter-audit
- Review date: 2026-10-25
- Target role: Mid-level Healthcare Product Designer / Digital Product Designer focused on clinical workflows, internal tools, and complex service systems
- Hiring audience: Healthcare-product recruiters and product-design hiring managers
- Artifact version: `main` at `7ac9916` (`Reach green design-taste audit`)
- Reviewed surfaces: Home, About, MSK, Grove, Knowunity, Medical Logistics, UX Woman, Mobbin, recruiter panel, résumé PDF, email/contact paths, and English case-study source
- Audit scope: Full 24-check
- Readiness claim: Internal checkpoint
- Desktop rendered evidence: Current Home and MSK full-page captures at 1440px in `.taste-skill/green-home-r4` and `.taste-skill/green-msk-r2`; 2026-10-22 all-route desktop verification is a baseline only because fresh captures of the other routes timed out in Chrome CDP
- Mobile rendered evidence: Current Home and MSK full-page captures at 390px in `.taste-skill/green-home-r4` and `.taste-skill/green-msk-r2`; 2026-10-22 all-route 390px verification is a baseline only because fresh captures of the other routes timed out in Chrome CDP
- Source status: Verified
- Research gate: Pass
- Accessibility gate: Pass
- Resume and contact gate: Pass
- Independent verification: Not required
- Final verdict: Conditional
- Critical failures: none

## Target and directional score

The portfolio is being judged as a healthcare product-design portfolio, not as a broad senior consumer-product portfolio. Its strongest hiring thesis is operational discovery translated into safer, clearer digital workflows.

- Raw score: **21/24**
- Applicable score: **21/22 (95%)**; target-list and outreach checks are outside the public artifact.
- Directional band: **recruiter-ready; shift attention toward outreach**
- Verification verdict: **Conditional**, because this review could not produce fresh current-commit renders for Grove, Knowunity, Logistics, UX Woman, and Mobbin. The score is not converted into a material `Ready` claim without that evidence and fresh-context confirmation.

## Six-Second Test

- Role clarity: Pass — Home immediately shows `Healthcare Product Designer` and `I design workflows before screens.`
- Visible proof: Pass — the opening hero names the four-department MSK paper detour, the later digital queue, and the 21,000+ clinician/staff scope.
- Next action: Pass — `Review the MSK case study` and `Open the 90-second tour` are visible in the opening hero; the film is optional rather than an automatic obstruction.

## Findings

| Rule | Status | Evidence | Confidence | Repair | Interview transfer |
| --- | --- | --- | --- | --- | --- |
| 1. Hero names one specific role | Pass | Current Home render names `Healthcare Product Designer` above the proof and does not stack competing titles. | High | none | Portfolio-visible |
| 2. Cases support a coherent niche | Pass | MSK, Grove, Knowunity, Logistics, UX Woman, and Mobbin consistently center workflow clarity, evidence boundaries, internal systems, and decision design. | High | none | Portfolio-visible |
| 3. Visitor can explain the hire within five seconds | Pass | The visible thesis is designing workflows before screens; the hero immediately grounds it in MSK operations and training. | High | none | Portfolio-visible |
| 4. Case titles carry result, scale, or meaningful outcome | Pass | `One queue. Four teams.`, `Twelve features became three.`, `Six healthcare interviews point to one hypothesis.`, `Resupply went from months to weeks.`, and `200+ screens per app, searchable by task` carry scale or changed state; Knowunity states the core proof decision. | Medium | If an unfamiliar reviewer cannot explain Knowunity's changed state, rename its H1 around the working recall loop without implying validation. | Portfolio-visible |
| 5. Hero includes impact evidence | Pass | Home names the paper detour, implementation boundary, and workflows in scope reaching 21,000+ clinicians and staff. | High | none | Portfolio-visible |
| 6. Titles avoid generic redesign language | Pass | No current project title uses generic `redesigning the experience` language; titles name the decision, scale, or result. | High | none | Portfolio-visible |
| 7. Focused target-company list exists | N/A | A target-company list is not a public portfolio artifact and was not included in this repository audit. | High | Track this in the job-search workflow. | Not relevant |
| 8. Outreach reaches relevant people | N/A | Outreach activity is not observable in the portfolio artifact. | High | Track recruiter, hiring-manager, and design-leader outreach separately. | Not relevant |
| 9. Portfolio loads quickly, works on mobile, and puts proof near the top | Pass | Current production build compiles with a 110.07 kB gzip main bundle; current Home and MSK renders work at 390px and 1440px, and the Home proof is in the opening hero. | Medium | Re-run all-route throttled mobile capture after the CDP environment is healthy. | Portfolio-visible |
| 10. Real outcomes appear in the first scan path | Pass | MSK scope and implementation boundary are in the hero; the source-linked proof strip immediately follows with 21,000+, 1–2 months to 1–2 weeks, and 37 research responses. | High | none | Portfolio-visible |
| 11. A proof strip or recognizable proof appears near opening | Pass | Home places three source-linked proof points immediately after the hero. | High | none | Portfolio-visible |
| 12. Proposition survives without decoration | Pass | The argument remains credible as plain text: workflow diagnosis, bounded ownership, measured or owner-reported outcomes, and explicit limitations. | High | none | Portfolio-visible |
| 13. Each case foregrounds a meaningful decision and reason | Pass | Examples include one MSK action governed by readiness/permission/exception/return rules; Grove cutting twelve features to three; and Knowunity quoting the student's own words back as evidence. | High | none | Portfolio-visible |
| 14. Generic process theatre is compressed | Pass | Default paths use project-specific workflow maps, research-to-decision traces, and evidence states; complete research/system detail is behind native disclosures. | High | none | Portfolio-visible |
| 15. Cases are concise enough for recruiter scanning | Pass | Primary cases state four-to-six-minute read times; optional research, system, constraint, and blueprint detail is moved behind `<details>` disclosures. | Medium | Validate with unprompted 60–90-second recruiter scans rather than further self-editing by default. | Portfolio-visible |
| 16. Six-second role clarity | Pass | The optional opener no longer blocks the immediate role label and workflow thesis. | High | none | Portfolio-visible |
| 17. Six-second visible result | Pass | The first hero view identifies a paper detour replaced by a queue and names the 21,000+ scope. | High | none | Portfolio-visible |
| 18. Six-second next action | Pass | The hero exposes direct work review and the optional 90-second tour. | High | none | Portfolio-visible |
| 19. No more than three primary public cases | Pass | Home source explicitly tiers MSK, Grove, and Knowunity as `primary`; Logistics is supporting, while UX Woman and Mobbin sit behind `More work`. | High | Keep this hierarchy explicit in future edits. | Portfolio-visible |
| 20. Every public study earns its place through relevance and credible outcomes | Fail | Knowunity is a working prototype with external review but no student test and no shipped outcome; UX Woman has five designed pretotypes and zero run. Their boundaries are honest, but public availability still exceeds outcome evidence. | High | Either keep these routes off the default hiring path until a real test changes a decision, or add truthful observed test evidence; do not manufacture product outcomes. | Missing |
| 21. Strongest relevant study appears first | Pass | MSK remains first and is the strongest clinical-workflow, stakeholder, and healthcare-domain story. | High | none | Portfolio-visible |
| 22. Email or contact is one click away on every page | Pass | Each case closes with `Email me`; the site-wide footer includes Email plus a selectable address and the recruiter panel keeps Email and Résumé together. | High | Keep a visible-address fallback when mail clients fail. | Portfolio-visible |
| 23. Résumé label matches behavior and positioning | Pass | `View résumé` opens `/assets/Hillary_Esposito_Portfolio_Resume.pdf` in a new tab; the hiring-path tests verify the label, target, rel, and aria label. | High | Recheck whenever the PDF changes. | Portfolio-visible |
| 24. Complete first-look journey works on mobile | Pass | Current Home and MSK 390px captures show role, proof, project path, footer, and hiring actions without visible clipping; the 2026-10-22 all-route check recorded zero overflow and intact résumé/email paths. | Medium | Produce fresh current-commit 390px captures for all remaining routes before a material Ready claim. | Portfolio-visible |

## Research Evidence Integrity Gate

### Grove — Pass

- Decision at stake: which first-build features earned the next prototype.
- Method fit: five moderated sessions exposed navigation confusion; a 37-person self-report survey ranked launch priorities.
- Participants, date, and stage: five people from March–May 2026; 37 people from May 22–October 16, 2026; Phase 2 of 3.
- Evidence type: the moderated sessions are behavioral/qualitative; the survey is attitudinal/self-report and quantitative only for that defined sample.
- Decision trace: twelve features became three; guilt-heavy reminders and false AI certainty were rejected.
- Limits: task records are not preserved; self-report does not prove behavior or demand; retest is pending.

### UX Woman — Pass

- Decision at stake: whether an ownership gap across healthcare handoffs is coherent enough to choose a problem and run a pretotype.
- Method fit: six exploratory healthcare interviews recruited by behavior, plus one adjacent HR interview explicitly excluded from healthcare validation.
- Participants, date, and stage: six anonymized healthcare roles in 2026; active research phase; five pretotypes designed and zero run.
- Evidence type: attitudinal, qualitative, self-reported accounts; no prevalence, causal, behavioral, or patient-outcome claim.
- Decision trace: the finding remains a hypothesis; the next step is reconstructing recent cases with the same neutral questions before building.
- Limits: no dedicated patient interview stream, no protected health information, and no pretotype evidence yet.

### MSK — Pass for workflow evidence, not population research

- The current-state map is reconstructed from memory of operational documentation; no patient data, exported records, vendor interface, or observation counts are represented.
- The page uses the reconstruction to explain a workflow decision and explicitly avoids prevalence claims.
- Later adoption and initiative-level outcomes remain labeled owner-reported, projected, or not attributable solely to the filing workflow.

### Knowunity — N/A as user-research evidence

The page explicitly states that recall is mocked, no students tested it, and it was not shipped. It does not convert a prototype or external badge into user validation.

### Medical Logistics and Mobbin — N/A as user research

Logistics uses an owner-reported service record and names missing measurement periods/methods. Mobbin is client documentation work and limits product-ownership claims.

## Highest-impact repairs

### Now

1. Do not recut the visual system again by default. Obtain fresh current-commit desktop and mobile renders for the five routes the local CDP session could not capture.
2. Treat the score as recruiter-ready direction, not a material Ready claim, until a fresh-context reviewer can reproduce the full hiring path from those renders.
3. In targeted applications, send MSK first, Grove second, and Knowunity only when the role values prototyping/design-system execution; use Logistics when operational delivery and service design matter more.

### Next

1. Run one real student test on Knowunity or one UX Woman pretotype; show the observed failure and the decision it changed.
2. Run five unfamiliar 60–90-second recruiter scans. Ask only: role, strongest proof, first case they would open, and how to contact Hillary.
3. Recheck the résumé PDF visually and semantically whenever its source changes.

### Later

1. Add one directly owned digital-product iteration loop: release or real test, observed failure, revision, and measured result.
2. Complete manual VoiceOver/Safari, NVDA/Chrome, 200%/400% zoom, forced-colors, and slow-network checks before making a broader accessibility-conformance claim.

## Conflicts and tradeoffs

- **Truth vs recruiter outcome pressure:** Knowunity and UX Woman are valuable because their limitations are honest. They cannot be upgraded into outcome cases through wording.
- **Digital execution vs measured ownership:** Knowunity proves fast prototyping and design-system adaptation; Logistics proves owned operational outcomes. Which one leads after MSK and Grove should depend on the role.
- **Taste restraint vs hierarchy labels:** the strict visual cleanup removed redundant labels. Do not reintroduce badge clutter merely to explain hierarchy that composition and ordering already communicate.
- **Public breadth vs focused scan:** supporting routes can remain available, but they should not compete with the three-case hiring path until their evidence changes.

## Interview Transfer

- Portfolio-visible: Healthcare workflow diagnosis, service design, current-state mapping, research-to-priority decisions, working prototypes, implementation boundaries, accessibility intent, and owner-reported operational outcomes
- Interview-story only: Stakeholder conflict, persuasion sequence, tradeoff negotiation, and what happened inside private MSK and Army working sessions
- Missing: A directly owned shipped digital-product iteration with observed post-launch behavior; real student testing for Knowunity; run pretotype evidence for UX Woman
- Not relevant: Public target-company lists and outreach activity

## Residual Risk

The artifact score is high, but recruiter behavior is still inferred. Current Home and MSK renders are complete; the local Chrome/CDP environment timed out while capturing the remaining routes, so the 2026-10-22 all-route review is only a baseline for those pages. The next observable check is a fresh 1440px and 390px capture of Grove, Knowunity, Logistics, UX Woman, and Mobbin at commit `7ac9916`, followed by a frozen-record fresh-context review. Until then, the record remains `Conditional` even though its directional score sits in the recruiter-ready band.
