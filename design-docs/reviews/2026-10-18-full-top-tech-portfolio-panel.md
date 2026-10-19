# Portfolio Review Evidence Record

- Review ID: portfolio-2026-10-18-top-tech-panel
- Review date: 2026-10-18
- Target role: Healthcare Product Designer focused on enterprise workflows, internal tools, service design, and complex systems
- Hiring audience: Product-design recruiters, design directors, product managers, and cross-functional hiring panels at healthcare and top-technology companies
- Artifact version: `main` at `3091c725d4f3a312fc51b9d5dcf3e57d8fdc389c`; live domain last modified 2026-10-16
- Reviewed surfaces: Home, About, MSK, Medical Logistics, Grove, Mobbin, Knowunity, UX Woman, the site-wide 90-second tour, résumé PDF, contact paths, English and Spanish layouts
- Audit scope: Full 24-check
- Readiness claim: Internal checkpoint
- Desktop rendered evidence: Local production and development renders at 1440x1000 under `/tmp/portfolio-audit-2026-10-18`; live domain and résumé returned HTTP 200
- Mobile rendered evidence: Local production and development renders at 390x844 under `/tmp/portfolio-audit-2026-10-18`, including all English and Spanish routes
- Source status: Verified
- Research gate: Pass
- Accessibility gate: Revise
- Resume and contact gate: Revise
- Independent verification: Not required
- Final verdict: Conditional
- Critical failures: none

## Panel Verdict

This is a distinctive, credible portfolio with a real point of view. It is strong enough to earn interviews for healthcare Product and Service Design roles after one focused repair round. It is not yet persuasive for a broad Senior Product Designer search at a top technology company because the site delays its own evidence, shows too many equal-weight projects, and cannot yet point to one directly owned, shipped digital-product result with post-launch iteration.

The central diagnosis is not “add polish.” The shell is already more polished than most portfolios. The hiring work is to remove the first-visit obstruction, sharpen the target, reduce the public set, and let the strongest product evidence carry more of the page.

## Six-Second Test

- Role clarity: Fail — With standard motion enabled on a fresh production visit, a full-screen visual opener covered Home for about 8.4 seconds on desktop and 7.3 seconds on mobile; at one second the only visible text was `Skip →`.
- Visible proof: Fail — The MSK result and 21,000+ scope are strong but remain behind the automatic opener for the entire six-second window.
- Next action: Fail — The MSK and 90-second-tour actions are behind the opener during the six-second window; only `Skip →` is available.

If the opener becomes explicit-play only, all three six-second checks pass on the current underlying Home render.

## Score

- Raw score: **13/24**
- Applicable score: **13/22 (59%)**; checks 7 and 8 are outreach-program checks rather than observable portfolio-artifact checks.
- Directional band: **focused repair round**
- Projected score after making the film explicit-play only: **19/24 raw; 19/22 applicable (86%)**. This is a projection, not a re-score.

## Findings

| Rule | Status | Evidence | Confidence | Repair | Interview transfer |
| --- | --- | --- | --- | --- | --- |
| 1. Hero names one specific role | Pass | Home visibly says Healthcare Product Designer and open to healthcare product-design roles. | High | Keep the role explicit even if the thesis headline remains. | Portfolio-visible |
| 2. Case studies support a coherent niche | Pass | MSK, Logistics, Grove, UX Woman, Knowunity, and Mobbin consistently emphasize workflows, decisions, evidence boundaries, and complex systems. | High | Preserve the workflow and high-stakes-system thesis. | Portfolio-visible |
| 3. Visitor can explain what to hire Hillary to do within five seconds | Fail | The automatic opener hides the role and thesis beyond five seconds in the production build. | High | Make the opener explicit-play only; land directly on the hero. | Portfolio-visible |
| 4. Every case title carries a result, scale, or meaningful outcome | Pass | Titles include a paper detour replaced, resupply reduced to weeks, twelve features narrowed to three, searchable flows, a retrieval-proof decision, and a bounded hypothesis. | High | Keep outcome-led titles; demote research-in-progress work rather than inventing an outcome. | Portfolio-visible |
| 5. Hero includes impact evidence | Pass | Home names the four-department detour, implementation boundary, and workflows reaching 21,000+ staff. | High | Preserve this exact truth boundary. | Portfolio-visible |
| 6. Project titles avoid generic redesign language | Pass | No primary title uses a generic redesigning-the-experience formula. | High | Keep titles tied to the decision or changed state. | Portfolio-visible |
| 7. Focused target-company list exists | N/A | A target-company list is not a public portfolio artifact and was outside this repository review. | High | Maintain this in the job-search workflow, not on the public site. | Not relevant |
| 8. Outreach reaches relevant people | N/A | Outreach activity is not observable in the portfolio artifact. | High | Track recruiter, hiring-manager, and design-leader outreach separately. | Not relevant |
| 9. Portfolio loads quickly, works on mobile, and puts proof near the top | Fail | All 16 route and viewport captures returned 200 with no overflow or console errors, but the production opener withholds Home proof for 7.3–8.4 seconds. | High | Remove automatic playback; then measure the production bundle and media under a throttled connection. | Portfolio-visible |
| 10. Real outcomes appear above the fold or in the first scan path | Fail | Standard-motion first-time visitors see only the visual opener and Skip action during the first scan. | High | Default to the existing hero, which already contains MSK proof and scope. | Portfolio-visible |
| 11. A proof strip, recognizable client, metric, or testimonial appears near opening | Pass | Directly below the hero, Home shows 21,000+, 1–2 months to 1–2 weeks, and 35 survey participants with source links. | High | Keep the strip immediately after the hero. | Portfolio-visible |
| 12. Proposition survives without decoration | Pass | The core argument remains credible as text: workflow diagnosis, implementation boundaries, source-labeled outcomes, and named constraints. | High | Do not add more decorative proof. | Portfolio-visible |
| 13. Each case foregrounds a meaningful decision and reason | Pass | Examples include one button with four rules, move the warehouse then fix handoffs, one calm reminder, and task naming for retrieval. | High | Preserve decision logs while reducing repetition around them. | Portfolio-visible |
| 14. Generic process theatre is removed or compressed | Pass | The portfolio uses project-specific workflow maps, constraints, decision records, and evidence boundaries rather than a generic design-process diagram. | High | Keep only diagrams that expose a project-specific decision. | Portfolio-visible |
| 15. Every case is concise enough for recruiter scanning | Fail | MSK is 1,578 words and 12,707px on mobile; Grove is 10,511px; several cases repeat status and limitation copy across hero, body, and outcome bands. | High | Build a complete 60–90-second default path and place deep evidence behind disclosures. | Portfolio-visible |
| 16. Six-second role clarity | Fail | The full-screen opener contains no role text during the six-second window. | High | Default to Home hero; keep film as a labeled optional action. | Portfolio-visible |
| 17. Six-second visible result | Fail | The opener contains no project result during the six-second window. | High | Default to the MSK result already present in the hero. | Portfolio-visible |
| 18. Six-second next action | Fail | The only action during the six-second window is Skip, not review work, résumé, or contact. | High | Default to the existing MSK and 90-second-tour actions. | Portfolio-visible |
| 19. No more than three primary public case studies | Fail | Home gives five projects equal numbered treatment and links a sixth public study, Mobbin. | High | Use MSK, Medical Logistics, and Grove as the three primary studies; move the rest to supporting evidence. | Portfolio-visible |
| 20. Every public study earns its place through relevance and credible outcomes | Fail | UX Woman has zero pretotypes run; Knowunity has mocked recall and no student testing; Mobbin documents third-party products. These are credible supporting proofs but weaken an equal-weight flagship set. | High | Keep them public but secondary: research log, AI prototype, and client documentation proof. | Portfolio-visible |
| 21. Strongest relevant study appears first | Pass | MSK is first on Home and leads with the clearest healthcare workflow story. | High | Keep MSK first. | Portfolio-visible |
| 22. Email or contact is one click away on every page | Pass | Every route exposes mailto links and a selectable address; the footer and tour provide recovery if a mail client does not open. | High | Improve discovery without removing the visible-address fallback. | Portfolio-visible |
| 23. Résumé action matches its label and positioning | Pass | Résumé links open the one-page Healthcare Product Designer PDF; the PDF is titled and tagged. | High | Keep the title and positioning aligned after future résumé edits. | Portfolio-visible |
| 24. Complete first-look journey works on mobile | Pass | English and Spanish routes at 390px showed zero horizontal overflow; route titles, content, footer, résumé, and contact remained reachable. | High | Retest after mobile hero and navigation changes. | Portfolio-visible |

## What the Panel Would Hire

### Strongest fit now

- Healthcare Product Designer for internal tools, clinical operations, care-delivery workflows, or enterprise systems.
- Product/Service Designer where operational discovery, workflow redesign, and stakeholder alignment matter as much as screen craft.
- A role that values prototyping and implementation literacy but does not require proof of owning a mature shipped consumer product.

### Not yet proven

- Broad Senior Product Designer ownership at a top technology company.
- A role that expects direct ownership of a shipped digital product, post-launch iteration, experimentation, and measured product outcomes.

The honest gap is direct product ownership, not talent. MSK was implemented after Hillary changed roles; Grove is Phase 2; UX Woman has not run a pretotype; Knowunity is mocked and untested; Mobbin is documentation; Logistics is the strongest measured outcome but is service and operations design.

## Strongest Assets to Preserve

1. **A memorable thesis:** `I design the workflow before the screen.`
2. **Evidence honesty:** owner-reported, not shipped, none run, AI-assisted, and implementation boundaries are stated instead of buried.
3. **Rare domain credibility:** clinical operations, medical logistics, high-stakes workflows, and Lean/process fluency form a defensible niche.
4. **Decision-led storytelling:** the cases show judgment, not a generic design-process performance.
5. **Authored visual identity:** warm editorial cartography and Riso texture feel specific to Hillary and support the quiet-authority goal.

## Critical Hiring Finding

### The portfolio delays its own argument

`RisoHome.tsx` opens the film once per browser tab for standard-motion visitors. In a local production build, the overlay remained for about 8.4 seconds on desktop and 7.3 seconds on mobile. At one second the screen was decorative cartography plus `Skip →`; the role, evidence, and hiring action were absent.

This behavior is recorded as an owner-approved reversal in the divergence ledger, so it is not an undocumented implementation accident. It is still the wrong conversion decision under recruiter timing pressure. Keep the film, but require an explicit play action.

## Major Findings

### 1. The public set communicates breadth before judgment

Five equal numbered Home rows plus Mobbin tell a recruiter that Hillary has many things to show. A senior portfolio needs to show that she knows which three matter. Use:

1. MSK — strongest healthcare workflow and stakeholder story.
2. Medical Logistics — strongest owned, measured service outcome.
3. Grove — clearest end-to-end product and working-prototype evidence.

Keep Knowunity as AI-prototyping proof, UX Woman as a research-in-progress log, and Mobbin as client/documentation evidence.

### 2. The shell signals a higher product level than the public evidence can prove

The portfolio itself is senior in craft. The product record is more mixed. For targeted healthcare workflow and service-design roles, that contrast can work. For a broad top-tech Senior Product Designer search, a panel will ask: What digital product did you directly own through launch, feedback, iteration, and measured outcome?

The smallest valid repair is positioning, not inflated copy: target healthcare Product/Service Design and enterprise workflow roles now. Build one documented iteration loop in Grove or another real product before asking the portfolio to prove senior generalist product ownership.

### 3. Mobile case studies orient too late

At 390x844, the case-study H1 begins around 630–670px. Direct entrants first encounter dock, breadcrumb, chapters, and artifact. The title appears near the bottom of the first screen; role, state, and summary fall below it.

On mobile, place the H1, one-line contribution, and evidence state before the hero artifact. Target an H1 top under roughly 300px, then place the artifact immediately below.

### 4. Résumé and contact are reachable but not discoverable enough

The persistent dock has no résumé or contact item. The visible résumé link is in the footer or inside the 90-second tour, and direct case-study pages reach 6,817–12,707px on mobile.

Add a direct Résumé action to the persistent utility surface and keep Email one action away from it. Do not remove the visible email address fallback.

### 5. Homepage project links are excessively verbose for assistive technology

Each selected-work row is one large link. Its accessible name includes the entire evidence block: approximately 684 characters for MSK, 454 for UX Woman, 334 for Logistics, 308 for Knowunity, and 274 for Grove.

Prefer an `article` with a concise title link. If a full-card hit area remains, give it a concise accessible name that begins with the visible title and ends with `review case study`.

### 6. Evidence-boundary copy is over-repeated

The fresh-context anti-AI review found low-to-moderate tell density. The visual system feels authored; the residue is in copy that proves its honesty too many times. Grove repeats `Phase 2 of 3` across the page. Knowunity repeats mocked recall, no speech recognition, and not shipped across hero, labels, demo, and outcome.

Keep one compact status block in the hero and one note beside the evidence the limitation changes. Remove the rest. This preserves trust while sounding less rubric-written and reducing scroll.

## Minor Findings

- The repeated `X, not Y` construction appears across Knowunity, Mobbin, UX Woman, and Grove. Keep one strong contrast per page and rewrite the rest directly.
- Several consequential desktop labels use roughly 10.6–11.2px uppercase monospace type. Set a 12px floor, preferably 13px for longer evidence labels.
- The same pale/dark/coral case-study rhythm creates excellent cohesion but makes six projects feel poured into one template. Keep tokens; vary evidence topology.
- The Spanish implementation still contains a source TODO for native-speaker owner review. Complete and date that review before treating Spanish as finished parity.
- The About page is strong, but `Running, reading, and Luna the cat` feels thinner than the rest of the authored story.
- The tell checker currently fails on banned words inside negative tests and an evaluation rubric. Treat these as scoped checker exceptions or teach the checker to ignore negative assertions; they are not public-copy failures.

## Accessibility and Neuroinclusive Status

No critical access blocker surfaced.

- 16 route and viewport captures returned 200 with no console errors, page errors, or horizontal overflow.
- Rendered axe checks reported zero automatic violations on all 16 captures. Color contrast, ARIA edge cases, and video captions remained manual-review items.
- The full Jest suite passed: 22 suites, 204 tests.
- Registry freshness passed.
- The optimized production build compiled; main JavaScript was 110.8 kB gzip and main CSS was 30.84 kB gzip.
- The résumé is a one-page, titled, tagged PDF.

Accessibility remains `Revise` because rendered automated checks do not establish WCAG conformance. Before claiming readiness, run VoiceOver/Safari and NVDA/Chrome, keyboard-only recruiter tasks, 200% and 400% zoom, 320px reflow, forced colors, slow-network lazy-media checks, and accommodated testing with disabled and neurodivergent participants.

## Research Evidence Integrity Gate

### Grove — Pass

- Question and decision: which launch features earned the next build.
- Evidence: March–May 2026 moderated test with 5 users; May–September 2026 self-report survey with 35 people and audience composition.
- Boundary: behavior, self-report, demand, and missing task records are separated.
- Decision trace: twelve features became three; AI-written care sheets were removed; uncertainty and sources became product requirements.
- Status: redesign direction chosen; retest pending.

### UX Woman — Pass

- Question and decision: whether ownership ambiguity is one shared problem worth building for.
- Evidence: six healthcare interviews, one adjacent HR interview, no dedicated patient stream, exploratory and self-reported.
- Boundary: prevalence, causality, patient outcomes, and a shared problem are explicitly not claimed.
- Decision trace: five falsifiable pretotypes were designed; none has run; recent-case reconstruction comes next.

### MSK — Pass for workflow evidence, not population research

- The workflow map is reconstructed from memory, contains no patient data, and explicitly states that observation counts were not preserved.
- The case does not convert the reconstruction into a prevalence claim.
- Owner-reported and initiative-level outcomes remain labeled.

### Knowunity — Not applicable as research evidence

- The case explicitly says recall is mocked, no students tested it, and it is not shipped. It does not claim research validation.

### Mobbin and Medical Logistics — Not applicable as user research

- Mobbin is client documentation work with product-ownership limits.
- Logistics uses an owner-reported service record and names the missing measurement periods and methods.

## Highest-Impact Repairs

### Now

1. Make the opening film explicit-play only.
2. Lock the target: Healthcare Product/Service Designer for enterprise workflows, internal tools, and high-stakes systems.
3. Reduce Home to MSK, Medical Logistics, and Grove as primary work.
4. Add a direct Résumé action to the persistent hiring path.
5. Shorten the homepage work-row accessible names.

### Next

1. Recut each flagship into a complete 60–90-second default story; place deep detail behind disclosures.
2. Put mobile title, contribution, and evidence state before the hero artifact.
3. Collapse repeated status and limitation copy.
4. Give each case a project-specific evidence backbone instead of the same closing rhythm.
5. Complete and record Spanish native-speaker review.

### Later

1. Build and document one directly owned digital-product iteration loop: release or real test, observed failure, revision, and measured result.
2. Validate recruiter scan behavior with unfamiliar recruiters and hiring managers.
3. Run assistive-technology, zoom, forced-colors, and lived-experience testing.
4. Repair the tell-checker exception handling for negative tests and rubric fixtures.

## Conflicts and Tradeoffs

- **Owner-approved film vs hiring conversion:** the film is authored and approved, but it fails the first-visit hiring task.
- **Truth vs repetition:** limitations build trust; repeating them makes the prose feel defensive and machine-rubric-driven.
- **Breadth vs prioritization:** the secondary work is credible, but equal treatment dilutes senior judgment.
- **System cohesion vs case identity:** shared tokens strengthen the brand; repeated topology makes distinct evidence feel templated.
- **Top-tech standard vs current role evidence:** the portfolio can credibly sell healthcare Product/Service Design now; a broad senior-product claim needs directly owned shipped evidence.

## Interview Transfer

- Portfolio-visible: Workflow diagnosis, service design, healthcare operations depth, Army logistics scope, research boundaries, product decisions, working prototypes, accessibility intent, implementation literacy
- Interview-story only: Stakeholder influence detail, conflict resolution, tradeoff negotiation, how Hillary kept the MSK proposal alive, and what changed across iterations when source artifacts cannot be public
- Missing: One directly owned shipped digital-product story with post-launch iteration and measured product behavior
- Not relevant: Public display of target-company lists or outreach activity

## Residual Risk

The score is an artifact audit, not evidence of recruiter behavior. The local production build and live HTTP checks verified behavior and availability, but no real recruiter, hiring manager, VoiceOver user, NVDA user, or neurodivergent participant completed the hiring journey in this review. The next observable check is a fresh production render after the opener and project-hierarchy repairs, followed by five unprompted 60–90-second recruiter scans and the required assistive-technology tasks.
