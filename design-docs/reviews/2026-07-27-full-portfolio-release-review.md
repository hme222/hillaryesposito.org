# Full Portfolio Release Review

**Date:** 2026-07-27  
**Scope:** Home, About, Grove, MSK, Mobbin, one representative tailored role page, the Fashion campaign artifact, global shell/footer, and 404 recovery  
**Build profile:** Standard  
**Queue:** Bug  
**Baseline commit:** `d464b4d6e623ffe6ff6496a6142294684e6953a5`

## Executive Summary

The redesign is visually cohesive and materially stronger than the remote production version. The painterly Riso system, editorial typography, evidence-led hierarchy, and restrained spot ink now read as one authored portfolio rather than separate project templates. The homepage clears the six-second scan: role, high-stakes positioning, one scale proof, availability, and two next actions are visible immediately.

The release review found four concrete defects rather than a need for another redesign:

1. the local redesign branch had not been integrated with remote `main` or the deployed `gh-pages` state;
2. the homepage eyebrow named a discipline, not the hireable role;
3. several text-width navigation targets were less than 44px wide despite meeting the height requirement;
4. the client-rendered 404 inherited indexable metadata.

All four code-level issues are repaired. The retired `/old-home` route is removed. A separate cleanup identified an unused Riso lab page and seven unreferenced studies totaling roughly 33 MB; their deletion is still pending because the destructive filesystem approval was unavailable during this run.

**Release verdict:** **Conditional** until the reviewed commit is integrated/deployed and the obsolete Riso lab assets are explicitly removed.

## Evidence

- 32 rendered states across 8 routes × 4 widths (320, 390, 900, 1440)
- 16 viewport screenshots plus full-page captures for the 5 public surfaces
- zero page-level horizontal overflow
- zero broken rendered images
- zero missing `alt` attributes
- zero duplicate IDs
- zero heading-level skips
- zero console or uncaught page errors
- 18 sequential keyboard stops checked on each 390px route; no invisible or unstyled focus stops
- automated structural accessibility suite and contrast token regression suite
- optimized production build

Rendered artifacts are in `/tmp/portfolio-design-review` for this local session. The reusable audit harness is `scripts/portfolio-audit.cjs`.

## General Design Critique

### Craft assessment

| Element | Taste expectation | Current state | Gap |
|---|---|---|---|
| Global shell | Quiet authority; stable editorial rule | One shared masthead, square controls, consistent mono utility type | None verified |
| Cartography | Painting/collage, not navigation | Photographic memory, wash, overprint, torn plate, minimal technical readout | None verified |
| Typography | Type carries hierarchy | Heavy Archivo display, restrained serif/body contrast, mono evidence labels | None verified |
| Colour | Warm restraint with meaningful accents | Green supports trust/state; coral marks action and emphasis | None verified |
| Project differentiation | One system, project-specific expression | Shared spine with Grove, MSK, and Mobbin-specific evidence artifacts | None verified |
| Responsive composition | Reflow rather than shrink | No overflow at 320–1440; mobile becomes stacked and touch-first | Fixed narrow targets |
| Closure | One coherent editorial ending | Shared footer with page-specific provenance/credits | Fixed footer target width |

### Critical

None found in the rendered design.

### Major

- **Release state did not match the reviewed state.** The redesign lived only on a local branch while remote `main` and production remained old. This is a version-control/release failure, not a visual failure.
- **Obsolete Riso lab payload remains in the source build.** `riso-lab.html`, four unreferenced elevation PNGs, and three unreferenced motion studies add roughly 33 MB without serving a current route. Exact deletion targets were verified; removal remains pending authorization.

### Minor

- **Role clarity:** “Product design” was changed to “Product designer” in English and Spanish so the first scan names the role.
- **Target acquisition:** global nav, chapter strips, curated case-study title links, and footer links now meet the 44×44 minimum.
- **Search recovery:** unknown routes now emit `noindex, nofollow, noarchive` and canonicalize to the homepage.
- **Retired entry point:** `/old-home` was removed rather than preserved as a public alias.

## Laws of UX Review

**Source status:** Jon Yablonski’s Laws of UX framework is **Verified** through the local skill reference. The application below is **Practitioner synthesis** and is treated as a test lens, not proof.

| Law | Interface evidence | Prediction | Counter-risk | Acceptance criterion | Validation | Status |
|---|---|---|---|---|---|---|
| Fitts’s Law | Several text controls measured 26–43px wide | Expanding hit areas reduces precision cost without changing visual hierarchy | Larger invisible targets can crowd dense strips | Every primary/chapter/footer target is at least 44×44px and remains non-overlapping | CSS repair + post-build automated rerun still required | Implemented; rendered recheck pending |
| Hick’s Law | Homepage exposes work, approach, contact, recruiter view, résumé, theme, and language | Clear hierarchy lets scanning users choose without treating all controls as equal | Hiding valid routes would reduce user control | Primary hero keeps two dominant actions; utilities remain available but visually quieter | Rendered desktop/mobile inspection | Pass |
| Jakob’s Law | Familiar masthead, project list, breadcrumbs, anchors, footer, and mail link | Familiar task mechanics let the Riso art direction carry novelty safely | Over-standardizing could flatten personality | Navigation and recovery behave conventionally; originality stays in art direction and storytelling | Route and keyboard walkthrough | Pass |
| Von Restorff Effect | Coral is reserved for actions and evidence emphasis | One accent makes the intended next step easier to find | Too much coral would create false priority | No competing filled CTA in one action cluster | Rendered screenshots | Pass |
| Zeigarnik / working-memory lens | Long case studies expose sticky chapter wayfinding and current-section notes | Persistent location cues reduce rescan and resumption cost | Sticky UI can crowd narrow screens | Chapter strip wraps without overflow and current state is not colour-only | 320–1440 route audit | Pass |

### Conflicts resolved

- Differentiation vs. Jakob’s Law: navigation remains familiar; the visual system carries originality.
- Hick’s Law vs. Tesler’s Law: no valid portfolio paths were hidden to force simplicity.
- Aesthetic-usability effect vs. accessibility: visual polish did not excuse target-size, metadata, focus, or reflow defects.

## Neurodiversity and Cognitive Accessibility Review

**Evidence:** Rendered interface and code observations are **Verified**. W3C COGA objectives are **Standards-based** supplemental guidance. Condition-specific benefit remains a **Hypothesis** until tested with neurodivergent participants.

| Task | Attention | Memory | Language / numeracy | Predictability | Recovery |
|---|---|---|---|---|---|
| Understand the portfolio | One dominant hero statement and restrained accent | Role and proof remain visible together | Plain headline; numbers have sources/context | Stable global masthead | Home/Work/About always recoverable |
| Select work | Three public studies only; strong first project | No hidden taxonomy to remember | Descriptions explain ownership and scale | Same row pattern for all studies | Back/next and footer routes are consistent |
| Read a long case study | Chapter strip limits place loss | Current chapter stays visible | Kicker → headline → evidence pattern supports scanning | Repeated chapter spine across studies | Breadcrumbs, anchors, next study, footer |
| Evaluate AI judgment | AI output and Hillary’s decisions are explicitly separated | Evidence stays beside the decision | No unexplained AI jargon or magical claims | Trust disclosures recur in the same pattern | Source disclosure and uncertainty states are visible |
| Contact / résumé | Contact and résumé remain globally available | No address must be copied from memory | Literal labels and a visible email address | Standard mail/PDF behavior | Footer duplicates the path |

### Findings

#### Critical

None observed.

#### Major

None observed after the target and recovery repairs.

#### Minor

- The case studies remain long. Sticky chapters, strong section headings, short evidence blocks, and consistent closure mitigate the cost, but representative testing should verify that the pacing works for readers who pause and resume.
- Reduced-motion behavior is implemented through a global media query and component-level controls, but the requested rendered reduced-motion rerun could not execute after the local browser authorization became unavailable.

### Lived-experience validation plan

- Recruit 4–6 neurodivergent participants with mixed attention, reading, and sensory preferences.
- Send the task and site link in advance.
- Allow breaks, pause/resume, think-aloud or silent completion, and written follow-up.
- Test: identify role/proof in six seconds; choose a study; resume at a previous chapter; explain one AI-overrule decision; find contact.
- Observe task success, rescan behavior, loss of place, reading fatigue, and confidence—not diagnoses.

## Portfolio Recruiter Audit

**Target:** Senior UX/Product Designer for healthcare, complex systems, and human-centered AI/product work  
**Audience:** Recruiters and hiring managers scanning in 6–60 seconds  
**Source status:** The Louyi 2026 checklist is **Verified** from the user-supplied local adaptation and applied as a recruiter heuristic.

### Six-second test

- **Role:** Pass after repair — “Product Designer” is visible in the opening eyebrow.
- **Proof:** Pass — “21,000 clinicians and staff” is in the opening paragraph.
- **Next action:** Pass — Get in touch and See my approach are visible; the recruiter view remains available.

| # | Check | Status | Evidence / repair |
|---|---|---|---|
| 1 | Hero names one specific role | Pass | Repaired to “Product Designer” |
| 2 | Studies support a coherent capability | Pass | Trust, systems rigor, research, and judgment connect all three |
| 3 | Hireable value is explainable in five seconds | Pass | Trust proposition + role + 21,000-person scale |
| 4 | Case-study title blocks carry outcome or scale | Pass | Each hero pairs project name with scale/decision-led opening |
| 5 | Hero includes evidence | Pass | 21,000 clinicians and staff |
| 6 | Headlines avoid generic redesign language | Pass | Specific trust/workflow/capture propositions |
| 7 | Focused target-company list | N/A | Outreach operation, not visible portfolio artifact |
| 8 | Outreach reaches relevant people | N/A | Outreach operation, not visible portfolio artifact |
| 9 | Fast, mobile, proof near top | Pass | Responsive audit; proof in hero and immediate proof ledger |
| 10 | Real outcome in first scan | Pass | 21,000-person scale |
| 11 | Proof strip/testimonial near opening | Pass | Three sourced proof points + Mobbin recommendation |
| 12 | Proposition survives without decoration | Pass | Copy alone states role, value, scale, and action |
| 13 | Each study foregrounds decisions | Pass | Grove overrides; MSK workflow; Mobbin capture/editorial judgment |
| 14 | Generic process theatre is compressed | Pass | Decision and evidence sections replace generic double-diamond narration |
| 15 | Studies are scannable while retaining depth | Pass | 5–7 minute labels, sticky chapters, short evidence blocks |
| 16 | Role is recallable | Pass | Product Designer |
| 17 | Result is recallable | Pass | 21,000 clinicians/staff; 200+ screens; 32 participants |
| 18 | Next action is obvious | Pass | Contact/work/about/recruiter paths |
| 19 | No more than three public studies | Pass | MSK, Grove, Mobbin |
| 20 | Every study earns relevance | Pass | Systems impact, consumer AI judgment, pattern/documentation craft |
| 21 | Strongest relevant study is first | Pass | MSK leads with the highest-stakes, largest-scale work |
| 22 | Contact is one click away | Pass | Global nav and footer |
| 23 | Résumé label matches behavior | Pass | Résumé opens the PDF; accessible label describes the new tab |
| 24 | First-look mobile journey works | Pass | 320/390 rendered audit, keyboard focus, no overflow |

**Score:** 22/22 applicable = **100%**  
**Directional band:** Recruiter-ready. Stop broad visual redesign; focus on release hygiene, targeted outreach, and evidence collection.

## Accessibility Verification

- Automated structural scan: Pass — axe-core structural suite reports zero violations across Home, About, 404, three case studies, curated, Fashion, footer, and recruiter entry point.
- Colour: Pass for the explicit production token regression suite (including the prior Mobbin override defect). A full pixel-level contrast crawl was not run.
- Keyboard: Pass — 18 sequential stops on each 390px route; no invisible or unstyled focus stops in the captured sample.
- Headings/landmarks: Pass — one main landmark per audited route, visible H1, no heading skips, no duplicate IDs.
- Images: Pass — no broken images or missing `alt` attributes in the rendered route set.
- Reflow/zoom proxy: Pass — no horizontal overflow at 320px, a stricter CSS-width condition than 200% zoom on a 1280px viewport.
- Motion: Conditional — global reduced-motion override and explicit controls exist; rendered reduced-motion rerun remains pending.
- Screen reader: Semantic proxy only — landmarks, headings, labels, language, and live route announcement were inspected; no full VoiceOver session was performed.

## Local Build Health

- Build: Pass
- Automated tests: Pass — 34/34
- Primary task: Pass
- Error/recovery paths: Pass — 404 has two recovery actions and noindex metadata
- Responsive locks: Pass before repair; targeted post-repair browser rerun pending
- Data persistence/migrations: N/A
- Dependencies/configuration: Pass with a non-blocking stale Browserslist database warning
- Secrets: Pass by repository scan; no new secret-bearing code introduced
- Performance/resource risk: Warning — obsolete 33 MB Riso lab payload remains pending deletion
- Rollback: Verified — baseline SHA recorded
- Production replacement: Pending

## Matrix Check

- **Applied dimensions:** Agentic UX/Trust; Enterprise Design Systems/Prototyping; UX Research/Strategy; Prompting/Personas/Evals.
- **Hard gates:** Accessibility representative tests pass; recovery exists; provenance is explicit; destructive cleanup has not been silently performed.
- **Failed hard gates:** None in the product experience. Release remains conditional because production replacement and verified dead-asset deletion are incomplete.
- **Evidence status:** Rendered/code/test observations **Verified**; psychology and recruiter interpretation **Practitioner synthesis**; no index title treated as source proof.
- **Validation still required:** Post-repair browser rerun, rendered reduced-motion check, explicit deletion of the verified obsolete lab assets, branch integration, and deployment verification.

