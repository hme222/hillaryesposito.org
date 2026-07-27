# Full Portfolio Pre-Reveal Design Review

Date: 2026-07-24  
Repair completed: 2026-07-26  
Status: Critical and major repair round applied; targeted rendered re-review passed

## Repair outcome — 2026-07-26

The focused repair round resolved the four original reveal blockers:

1. Grove now uses one public status model: a functional prototype whose redesign is in Phase 2 of 3.
2. The unsupported care-screen/welcome-screen comparison and visible future-social placeholders were removed.
3. Semantic foreground tokens and tested tailored accents now pass the portfolio's normal-text contrast threshold.
4. Fresh rendered checks passed at 390px and 1440px for Home and at 390px across Grove in English and Spanish, MSK, Mobbin, About, Indyx, and Fashion. No tested route produced page-level horizontal overflow or broken images.

The repair also:

- leads Home with MSK and gives every project a truthful artifact crop;
- labels each homepage metric with its project/source;
- removes automatic and duplicate completion dialogs;
- fixes Grove source disclosure, clipboard/share feedback, tab references, and length;
- moves Spanish summaries into the shared editorial shell;
- shortens tailored pages and links recommended case studies in context;
- replaces Fashion's ARIA grid with a native responsive table;
- redirects legacy/duplicate routes and adds route-aware metadata;
- separates recruiter/back-to-top utilities and removes the invisible keyboard stop;
- replaces roughly 7.2 MB of elevation PNG usage with roughly 1.9 MB of optimized JPEG plates.

Verification evidence: 29/29 tests pass and the production build succeeds. The wider 320/768/900, 200% zoom, short-height, and full dark-mode matrix is still recommended as release hardening before deployment.

## Scope

Reviewed:

- Home
- About
- Grove and its `/riso/grove` alias
- Memorial Sloan Kettering
- Mobbin
- all eight tailored role pages
- Fashion Campaign System
- 404 recovery
- global navigation, footer, recruiter view, back-to-top, theme and language behavior
- shared Riso/editorial system, metadata, routing, responsive rules, accessibility tests, and public assets

The review used the current source, approved briefs, plans, taste direction, design state, existing tests, production build, contrast calculations, and the last recorded rendered-review evidence. The browser's local-site restriction prevented a new post-editorial rendered review, so visual and fixed-layer conclusions that require a browser remain conditional.

## Executive summary

The redesign has a strong, differentiated core. Home communicates the trust positioning quickly; MSK is the most convincing complete case study; Mobbin is unusually disciplined about contribution versus ownership; the recruiter view is an effective 90-second scan path; navigation, 404 recovery, and structural accessibility are thoughtfully implemented.

It is not ready to be shown as a finished redesign. Four reveal gates fail:

1. Grove's public evidence state is contradictory across the site.
2. Grove's showcased before/after does not support the claim it is attached to.
3. Two current accent treatments fail WCAG AA contrast.
4. The latest painted-editorial system has not received representative rendered verification.

The next pass should be a focused repair round, not another aesthetic reset.

## What is already strong

| Surface | What works |
|---|---|
| Home | Clear Product Designer promise, memorable art direction, fast three-project inventory, recruiter shortcut, direct contact |
| About | Strong trust-centered narrative, credible career arc, useful chapter jumps, client proof |
| MSK | Best evidence architecture: real workflow problem, recreated artifact, decisions, attribution, independent proof, outcomes |
| Mobbin | Honest ownership boundary, clear editorial judgment, useful taxonomy example, credible client scale |
| Recruiter view | Best utility in the site: role, strengths, project summaries, resume, email, LinkedIn, About in one modal |
| Navigation | Stable section contract, mobile focus management, inert background, Escape recovery, visible focus |
| 404 | Clear explanation and two useful recovery paths |
| Accessibility foundation | Native dialogs, landmarks, semantic headings, reduced-motion rules, 44px primary targets, route announcements |
| Voice | Direct, evidence-led, warm, and specific; strongest in MSK, Mobbin, and Grove's AI-override language |

## Reveal blockers

### Critical 1 — Grove's evidence state conflicts across public surfaces

Grove identifies itself as Phase 2 of 3 and visibly contains redesign/prototype placeholders. The recruiter panel accurately calls it a functional prototype with social work not yet built. Tailored pages, however, call it a “shipped consumer app,” “shipped AI consumer app,” “working full-stack prototype,” and “playable demo.”

Evidence:

- `my-app/src/pages/case-studies/RisoGrove.tsx`
- `my-app/src/components/RecruiterPill.tsx`
- `my-app/src/data/curatedPages.tsx`

Why it matters: a hiring manager may interpret the stronger claims as inflated once the case study reveals incomplete screens.

Required fix:

- define one canonical Grove status sentence;
- use it on Home, recruiter view, every tailored page, Spanish, metadata, and the case study;
- distinguish “functional first-version prototype” from “redesign screens still in progress” and “social prototype not built.”

Acceptance criterion: every public Grove claim describes the same deliverable, phase, tested state, and ownership.

### Critical 2 — Grove's before/after visual does not prove its claim

The story says the care screen stopped leading with a feed, but the “after” image is a welcome screen rather than the redesigned care screen. Three adjacent “Redesign — coming” slots make the gap more visible.

Evidence:

- `my-app/src/pages/case-studies/RisoGrove.tsx`

Required fix:

- replace the after state with the actual redesigned care screen; or
- relabel the comparison as a proposed direction and stop presenting it as completed proof.

Acceptance criterion: the before and after depict the same task, state, and interaction problem.

### Critical 3 — Current foreground/accent combinations fail WCAG AA

Confirmed calculations:

- global recruiter pill: white text on `#ef5340` is approximately 3.51:1;
- Indyx CTA: white text on `#C0704A` is approximately 3.71:1.
- Indyx small accent text on the light Riso paper is approximately 3.10:1;
- dark-mode Grove share and selected-tab text: white on `#7cb069` is approximately 2.54:1;
- small translucent text on case-study Next panels falls below 4.5:1 in light and dark themes.

Both are small text and require at least 4.5:1. The structural axe suite disables color-contrast evaluation.

Evidence:

- `my-app/src/styles/riso-page.css`
- `my-app/src/data/curatedPages.tsx`
- `my-app/src/pages/curated/CuratedRolePage.tsx`
- `my-app/src/pages/case-studies/FlagshipCaseStudies.a11y.test.tsx`

Required fix:

- darken the affected light-theme accent or use dark foreground text;
- add semantic `--on-green` and consistently apply the existing `--on-coral`, using a dark foreground on light dark-mode accents;
- stop using reduced-opacity foregrounds for essential small text;
- add regression coverage for every tailored accent and global fixed control.

Acceptance criterion: all normal-size accent text reaches 4.5:1 in light and dark modes.

### Critical 4 — Representative rendered verification is missing

The latest painted/publication changes compile and pass structural tests, but there is no fresh rendered evidence for:

- 320, 390, 768, 900, and 1440 widths;
- 200% zoom and short viewport heights;
- light and dark modes;
- English and Spanish states;
- fixed navbar, progress bar, recruiter pill, and back-to-top stacking;
- Fashion's final craft quality;
- painted image blending and hero contrast.

The canonical matrix treats critical-flow accessibility and representative regression coverage as readiness hard gates.

Required fix: run a fresh rendered review when the browser restriction is lifted.

Acceptance criterion: no clipping, overlap, horizontal page scroll, unreadable compositing, obscured focus, or lost task path across the representative matrix.

## Major findings

### M1 — Grove is too long, repetitive, and visibly unfinished

The case study repeats the same argument through the rebuild sequence, full screen gallery, three placeholder comparisons, care-screen comparison, quote, five overrides, system lab, roadmap, future social concept, outcomes, CTA, thanks section, completion interaction, and next-project card. “4 min” is not credible for this volume.

Recommendation:

1. Problem and evidence
2. Three product decisions
3. One resolved before/after
4. Interactive trust states
5. Current evidence and next test

Move all unfinished future work into one “What remains” note. Keep one ending and one next-project mechanism.

### M2 — The central “Check sources” trust control does nothing

The Plant ID live component labels itself as interactive, but `Check sources` has no handler.

Evidence:

- `my-app/src/components/riso/GroveSystemLab.tsx`

Recommendation: open a real or transparently reconstructed source panel, or render the element as a specimen label rather than a button.

### M3 — Share and clipboard feedback is not truthful

- token swatches report “Copied” even when Clipboard API fails;
- Grove celebrates sharing after cancellation or failure;
- completion dialogs swallow share failures and provide no success state.

Recommendation: distinguish shared, copied, cancelled, unavailable, and failed. Announce only confirmed success.

### M4 — Home proves art direction before product-interface craft

The active project index is text-only. The first viewport is painterly collage plus portrait; project UI appears only after a click.

Recommendation: keep the ruled editorial index but add a compact project contact sheet or one truthful artifact crop per project. Do not turn the page back into a card grid.

### M5 — Grove is first even though MSK is the strongest finished case

Home and recruiter view lead with the least-complete flagship. That makes the first depth test weaker than necessary.

Recommendation: either finish Grove's core proof before reveal or lead with MSK while labeling Grove as an active product journal.

### M6 — The editorial vocabulary is only partly propagated

Sharp clearings, rules, and evidence columns coexist with rounded cards, elevated frames, graph-paper modules, sticky bordered stages, pills, and dashboard containers. The site can feel like an editorial cover applied over an older UI system.

Recommendation: define one container vocabulary:

- spreads and plates for primary artifacts;
- thin rules for grouping;
- square or near-square corners;
- shadows only for physical overlap;
- pills only for true compact states/tags;
- no default “card” when spacing and a rule can organize the content.

### M7 — Spanish receives a legacy, condensed product

English case studies use the flagship Riso/editorial shell. Spanish switches to a different `gh-layout` with less evidence, no equivalent artifacts, and different navigation.

Recommendation: preserve the same structural shell and evidence hierarchy in both languages. Until parity is complete, warn before entering English-only pages and label condensed case studies clearly.

### M8 — Tailored role pages are template-heavy and not fully actionable

All eight routes repeat Fit, Proof, Work, Strengths, Experience, Keywords, Supporting Work, and Closing. “What to review” names projects but does not link them. Every hero points to Grove even when another project is more relevant.

Recommendation:

- cut approximately one third of the self-positioning copy;
- lead with two or three role-specific evidence blocks;
- link every recommended project at the moment it is named;
- derive the hero case-study CTA from the strongest role-relevant support link;
- prefer observed evidence over “I would bring” language.

### M9 — Fashion is not yet flagship visual-design evidence

The route is honestly labeled speculative, but its assets are mostly CSS-built abstract garment/gradient constructions. For a graphic-design role, it reads more like a polished art-direction wireframe than a resolved campaign.

Recommendation: either add original/licensed image-led art direction and fully resolved crops, or keep the route direct-link/private until it reaches the same proof quality as MSK and Mobbin.

### M10 — Completion dialogs interrupt the ending

MSK, Mobbin, and Grove can automatically open a modal when the reader reaches the end, then show a second inline next-project card underneath.

Recommendation: make completion user-triggered or replace it with one inline editorial colophon. Do not interrupt a reader who already completed the task.

### M11 — Recruiter pill and back-to-top occupy the same fixed corner

Both controls use the bottom-right position; the recruiter pill has the higher z-index and can obscure the smaller control.

Recommendation: create one floating-utility stack or suppress back-to-top when the recruiter shortcut is visible.

### M12 — Metadata and public-route cleanup are incomplete

- all routes inherit the homepage description and social image;
- the Open Graph image is a 256×256 favicon despite `summary_large_image`;
- sitemap omits Mobbin;
- `/old-home` publicly exposes the previous design;
- `/riso/grove` duplicates the canonical case study without canonical handling.

Recommendation: add route-level metadata and share images, include public canonical pages in the sitemap, redirect legacy/duplicate routes, and noindex any intentionally private tailored route.

### M13 — Painted heroes are too heavy for mobile

The shared `CartoField` loads the painted plate in addition to base and secondary map imagery. Representative hero combinations request roughly 3–5 MB before other page imagery:

- About and Grove: approximately 5 MB of hero plates;
- MSK: approximately 3 MB;
- Home: painted plate plus elevation plate.

Recommendation: generate responsive AVIF/WebP variants, avoid loading the same painted plate twice, omit secondary plates at narrow widths, and provide explicit responsive background selection.

### M14 — The approved system intent and current implementation have drifted

The brief and design state preserve the workflow knot as Home's single expressive moment, but active Home no longer renders it. The painted hero is now the expressive moment. This is a defensible evolution, but the canonical state is contradictory.

Recommendation: formally supersede the knot decision, redirect/remove `/old-home`, and update the state so future work does not try to preserve both systems.

### M15 — Canonical review artifacts are missing

`design-state.md` points to canonical Grove/Pilgrimz and taste artifacts that are not present at the referenced paths. That weakens traceability and future review.

Recommendation: restore the missing files or update the state to the real canonical artifacts.

### M16 — Back-to-top creates an invisible keyboard stop

The button always remains in the DOM. Its hidden state uses opacity and pointer-events, which do not remove it from the keyboard tab order.

Evidence:

- `my-app/src/components/BackToTop.tsx`
- `my-app/src/styles/App.css`

Recommendation: conditionally render it, use `hidden`/`visibility`, or remove it from the tab order until it becomes visible.

### M17 — SPA navigation announces a route but does not move focus

Route changes update a live region and scroll to the top, but focus is not moved to the new page heading or the existing focusable `#main-content`.

Evidence:

- `my-app/src/app/AppRoutes.tsx`
- `my-app/src/app/App.tsx`

Recommendation: after pathname changes, focus the new page heading or `#main-content` with intentional scroll coordination.

### M18 — Grove's tab contract is incomplete

Inactive tabs reference tabpanel IDs that do not exist because only the active panel is mounted. The same component contains the dead “Check sources” control.

Evidence:

- `my-app/src/components/riso/GroveSystemLab.tsx`

Recommendation: keep all panels mounted with `hidden`, or remove the invalid `aria-controls` relationships; implement or remove the dead action.

### M19 — Fashion's production table loses visible headers when stacked

The ARIA table rows become single-column records at mobile/zoom sizes, but values do not repeat visible Channel, Size, and Purpose labels.

Evidence:

- `my-app/src/pages/curated/FashionCampaignSystem.tsx`
- `my-app/src/styles/App.css`

Recommendation: use a native table with controlled horizontal scrolling or add visible per-record field labels in the stacked layout.

## Minor findings

- Home repeats the same headshot in the hero and mini-About; use the second slot for a process artifact or remove it.
- Home proof statistics need visible Grove/MSK/Mobbin attribution.
- Mobile project rows hide their arrows without adding an explicit “Read case study” label.
- Horizontal chapter strips hide the scrollbar and provide no overflow cue.
- “Download resume” opens a PDF; add `download` or rename it “View résumé.”
- Nav smooth scrolling does not consistently respect reduced motion.
- Route announcements and back-to-top labeling are not fully localized.
- The English MSK article title inside Spanish About content needs `lang="en"`.
- CartoField and curated data retain obsolete coordinate/station APIs even though the visual language rejected them.
- `App.css` is highly accretive and still contains substantial legacy page styling, increasing drift risk.
- Mobbin's lazy route has a loading fallback but no chunk-failure recovery.
- The 404 copy says “case studies” but sends readers to the Home work section; either change the copy or offer a direct MSK link.
- Small mono labels frequently fall between `.54rem` and `.7rem`; preserve the editorial scale, but raise the smallest essential labels and verify at 200% zoom.

## Route-by-route verdict

| Route/surface | Verdict | Before reveal |
|---|---|---|
| Home | Strong, revise | Add compact product proof, attribute stats, decide Grove/MSK order, optimize hero assets |
| About | Strong, revise | Replace repeated headshot, verify mobile hero height, retain chapter clarity |
| Grove | Not ready | Normalize truth, replace unsupported comparison, remove placeholders/dead control, cut length, fix feedback |
| MSK | Ready after global fixes | Remove interruption/duplicate ending; verify rendered layers |
| Mobbin | Ready after global fixes | Remove interruption; add lazy-load recovery |
| Tailored pages | Revise | Link proof, tailor first CTA, cut template copy, fix accents, define indexing/privacy |
| Fashion artifact | Conditional | Resolve real visual outputs or keep direct-link/private |
| 404 | Ready | Minor copy/destination refinement only |
| Navigation/footer | Strong | Fix reduced-motion scroll and localization; verify fixed stacking |
| Recruiter view | Strong utility, revise | Fix contrast, floating collision, and resume action label |
| Spanish | Not parity-ready | Move condensed content into flagship shell and label English-only destinations |
| Dark mode | Conditional | Token source looks sound; compositing and contrast need fresh rendered verification |

## Recruiter walkthrough

Goal: understand positioning, find strongest proof, and access resume/contact in 30 seconds.

- Positioning: pass.
- Project inventory: pass.
- Resume/contact: pass through recruiter view.
- Strongest first evidence: partial; Grove is first but unfinished.
- Trust in claims: fail until Grove status is normalized.

## Design-peer walkthrough

Goal: evaluate process/craft and move among case studies.

- MSK: pass.
- Mobbin: pass.
- Grove: partial; strong judgment narrative, insufficient final proof.
- Cross-case navigation: pass.
- Completion: friction from automatic dialogs and duplicate next-project controls.
- System cohesion: partial; editorial and legacy card vocabularies coexist.

## Accessibility status

Structural automated tests: pass, 17/17.  
Production build: pass.  
Token contrast calculations: core Riso body pairs pass; recruiter pill, Indyx accent, dark-mode green controls, and small translucent Next-panel text fail.  
Source audit: invisible Back-to-top focus stop, automatic focus-stealing completion dialogs, missing route focus placement, incomplete tab relationships, and reflowed table labels require repair.  
Keyboard, screen reader, 200% zoom, fixed-layer, and post-editorial rendered verification: pending.

Verdict: not WCAG AA-ready until the confirmed accent failures are fixed and representative manual/rendered checks pass.

## Prioritized remediation

### Now — reveal blockers

1. Normalize Grove status and all public claims.
2. Replace or relabel the unsupported Grove comparison.
3. Fix recruiter/Indyx contrast and add accent regression checks.
4. Fix dark-mode green/coral foreground tokens and Next-panel small text.
5. Make Grove live controls, tab relationships, and share/copy states truthful.
6. Remove visible redesign placeholders or consolidate them into one bounded “What remains” note.

### Next — portfolio quality

7. Remove automatic completion dialogs, the invisible focus stop, and repair route focus.
8. Cut and restructure Grove.
9. Add compact UI proof to Home and reconsider project order.
10. Link and shorten tailored role pages.
11. Unify remaining rounded/card-heavy components with the editorial system.
12. Bring Spanish case studies into the same shell.
13. Resolve the Fashion route and its responsive evidence table.

### Then — release readiness

14. Optimize hero imagery.
15. Remove legacy/duplicate routes and obsolete coordinate APIs.
16. Add route metadata, social images, canonical URLs, and sitemap coverage.
17. Run the complete rendered matrix and manual accessibility checks.

## Verification evidence

- `CI=true npm test -- --watchAll=false`: 17/17 passing
- `npm run build`: successful
- source asset check: all referenced `/assets` and `/riso` project assets exist
- core Riso contrast calculations:
  - `#20241c` on `#e8ece3`: 13.18:1
  - `#45503f` on `#e8ece3`: 7.09:1
  - `#5d6656` on `#e8ece3`: 5.01:1
  - `#3d6b3f` on `#e8ece3`: 5.20:1
  - `#ece7d4` on `#14150e`: 14.82:1
  - `#a9a582` on `#14150e`: 7.34:1
- confirmed failures:
  - white on `#ef5340`: approximately 3.51:1
  - white on `#C0704A`: approximately 3.71:1
  - `#C0704A` on `#e8ece3`: approximately 3.10:1
  - white on dark-mode `#7cb069`: approximately 2.54:1

## Matrix check

Applied dimensions:

- **Enterprise Design Systems & Prototyping:** shared tokens, component variants, responsive behavior, visual-system drift, prototype-to-production truth, and representative verification.
- **UX Research / Strategy:** recruiter and design-peer tasks, evidence hierarchy, project status truth, and alignment with the approved portfolio promise.
- **Agentic UX / Trust & accessibility:** user control, truthful feedback, source visibility, recovery, keyboard/focus, language, contrast, and motion.
- **Prompting / Personas / Evals:** representative route, language, theme, viewport, zoom, failure-state, and regression coverage.

Evidence status:

- current source, test output, build output, contrast calculations, public assets, local briefs, and supplied visual reference: **Verified**
- older resource-index titles not retrieved in full: **Index-only**
- severity, sequencing, and design recommendations: **Practitioner synthesis**

Unresolved hard gates:

- critical flow contrast;
- consistent provenance/status claims;
- representative rendered regressions;
- manual keyboard, zoom, and screen-reader verification after the final repair round.

## Original recommendation — superseded by the repair closeout

Do not reveal this as the finished redesign yet. Fix the five “Now” items, then the Grove/Home/tailored-language system issues, and run one fresh representative review. The portfolio does not need a new direction; it needs the current direction completed, made truthful, and verified.

## Final closeout — 2026-07-26

Every Critical and Major finding in this review is resolved or intentionally bounded:

- Grove uses one Phase 2 truth model, one ending, truthful comparison language, working source disclosure, mounted tab panels, and confirmed share/copy feedback.
- Home leads with MSK, shows a real artifact crop for every project, and attributes every proof metric.
- The editorial vocabulary now covers the shell, Home, About, all flagship studies, Spanish summaries, tailored role pages, Fashion, footer, recruiter controls, and 404 recovery.
- Automatic completion dialogs, duplicate progress mastheads, invisible focus stops, technical cartography readouts, hero rails, and redundant skill chips are removed.
- Tailored and Fashion routes are explicitly private through `noindex, nofollow, noarchive`; they remain direct-link surfaces rather than public flagship evidence.
- Mobile project arrows remain visible, chapter navigation wraps without clipping, résumé controls accurately say “View,” and the Mobbin lazy route has a recovery state.
- The canonical design state no longer references missing artifacts and formally records the painted hero as the Home expressive moment.

Current evidence:

- 35 rendered route/width checks across 320, 390, 768, 900, and 1440px: no page overflow, broken images, or chapter-navigation overflow.
- Dark-mode Grove and the Spanish Grove summary pass rendered review at 390px.
- The 720 × 450 mobile menu scrolls while the page remains locked.
- Home project arrows remain visible at 320px.
- Logo and footer links expose 44px targets; hidden Back to Top remains `tabindex="-1"` and `aria-hidden="true"`.
- Private curated routes expose the intended robots metadata.
- Structural, interaction, anchor, and contrast suite: 29/29 passing.
- Optimized production build: successful.
- Diff whitespace and canonical-document-reference audits: clean.

Final verdict: ready for owner review. No unresolved Critical, Major, or deferred Minor finding from this critique remains.
