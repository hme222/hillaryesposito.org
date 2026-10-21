# Healthcare Product Designer Recut — Build Contract

_Date: 2026-10-19_  
_Status: Approved 2026-10-19; Feature queue built; UX principles checkpoint requires revision before Visual queue_  
_Profile: Standard_  
_Selected queue: Feature_

## Approved outcome

Recut the existing portfolio into a highlights-first Healthcare Product Designer hiring path while preserving the complete evidence archive and every material truth boundary.

## Recovery and worktree boundary

- Recovery HEAD: `dcc42f8f7f5596864840a9bb2a5bc97f72251dd4`
- Rollback unit: initiative-scoped source diff or an initiative-scoped future commit.
- Do not reset or overwrite the worktree.
- The existing modified files under `.agents/skills/higgsfield-*` are unrelated owner/runtime changes. They are excluded from this initiative and must not be edited, staged, reverted, or committed.
- No commit, push, or deployment is authorized by this contract.

## Scope

### Essential feature 1 — hiring hierarchy and contact actions

- Reorder RecruiterPanel primary work to MSK → Grove → Knowunity.
- Add a clearly labeled supporting-evidence group for Medical Logistics, UX Woman, and Mobbin.
- Keep Medical Logistics prominent as Delivery Evidence rather than visually burying it.
- Preserve RecruiterPanel View résumé and Email me actions.
- Add View résumé beside Email in Home Contact and keep the email address visible and selectable.

### Essential feature 2 — six highlights-first case recuts

- Recut MSK, Grove, Knowunity, UX Woman, Medical Logistics, and Mobbin using the existing native `.rp-deepDive` pattern.
- Keep the complete decision trace and material limitations visible by default.
- Place repeated explanation, full galleries, exhaustive secondary artifacts, and extended implementation/method detail behind specifically labeled disclosures.
- Use the exact content allocation and disclosure labels defined in the design brief unless implementation reveals a truth or accessibility conflict.

### Essential feature 3 — direct-link behavior and regression coverage

- Add a small shared hash-arrival behavior that opens the nearest closed disclosure containing the fragment target.
- Do not steal focus or replace native browser history.
- Preserve no-JavaScript disclosure access.
- Cover direct entry, in-page chapter links, Back/forward behavior, keyboard disclosure use, and non-disclosure hashes with automated and rendered checks.

## Key screens and routes

- Home Contact
- RecruiterPanel wherever invoked
- `/case-study/msk`
- `/case-study/grove`
- `/case-study/knowunity`
- `/case-study/ux-woman`
- `/case-study/logistics`
- `/case-study/mobbin`

Spanish routes and content must retain existing behavior; they are regression surfaces, not rewrite targets.

## Technical boundaries

- Existing React, TypeScript, and CSS architecture only.
- No new runtime dependency.
- No new data model, API, authentication, analytics integration, or external service.
- No new visual system or page template.
- Reuse `<details>`, `<summary>`, `.rp-deepDive`, current tokens, and current responsive architecture.
- Component-production adapter: **N/A.** This slice reuses a native semantic element and an existing local pattern; it does not define a new reusable design-system API.
- House style: **Path B — Comply.** Reuse and compose the existing authored system.
- Existing real content only; no placeholders.

## Required visible evidence spine

No case may place these only inside a disclosure:

1. Role and contribution
2. Shipped / implemented / tested / prototype / research status
3. Ownership boundary
4. Research sample size when relevant
5. Metric attribution and qualification
6. Strongest artifact
7. Primary decision
8. Outcome or current state
9. Any limitation that materially changes the claim

## Responsive and access contract

Verify at minimum:

- widths: 320, 390, 900, and 1440px;
- one short landscape viewport;
- keyboard-only interaction;
- touch targets and disclosure hit areas;
- screen-reader names/states and logical heading order;
- 200% equivalent reflow and representative high zoom;
- reduced motion, light/dark themes, and direct hash arrival;
- no horizontal document overflow or clipped disclosure content.

The repaired mobile case-study orientation remains locked: title, contribution, and evidence state precede or orient the first artifact.

## Engineering Law Trace

### Gall's Law — Verified as a design constraint

- **Evidence:** the repository already has a functional native `.rp-deepDive` pattern, including existing Grove disclosures.
- **Risk:** a new global Highlights / Full mode creates parallel state, duplicated interaction logic, and more failure states.
- **Counter-risk:** reusing the existing pattern can create repetitive pages if every section collapses identically.
- **Required change:** extend the working native disclosure pattern only where evidence is truly optional; vary the visible evidence topology per case.
- **Acceptance test:** no new disclosure dependency or global mode; every summary works with keyboard and without custom JavaScript.
- **Result:** Structure checkpoint Pass; final health gate pending.

### Law of Unintended Consequences — Verified as a design constraint

- **Evidence:** existing chapter and direct-fragment links may target sections that the recut would place inside closed `<details>` elements.
- **Risk:** a successful content cut can silently make deep links appear broken or land on invisible content.
- **Counter-risk:** automatically opening every disclosure on any hash would erase the intended hierarchy and make Back behavior surprising.
- **Required change:** open only the nearest enclosing closed disclosure for the exact target, without focus theft or history replacement.
- **Acceptance test:** every affected direct link and chapter link reveals its target; unrelated disclosures remain closed; Back/forward remains predictable.
- **Result:** Structure checkpoint Pass; final history/keyboard matrix pending.

### Testing Pyramid — Verified as a delivery constraint

- **Evidence:** the repository has Jest/DOM coverage and an established rendered-browser verification workflow.
- **Risk:** screenshot-only review can miss semantic state, hash logic, history, and keyboard regressions.
- **Counter-risk:** unit tests alone cannot prove mobile composition, clipping, or scan hierarchy.
- **Required change:** cover disclosure/hash logic with focused DOM tests, then run a smaller rendered matrix for composition and access.
- **Acceptance test:** focused tests, representative browser checks, the full relevant suite, optimized build, and validators all pass.
- **Result:** Structure checkpoint Pass; full release suite pending.

### Goodhart's Law — Verified as a content constraint

- **Evidence:** scroll height and word count identify density but do not prove that the surviving story is complete or persuasive.
- **Risk:** optimizing for a fixed percentage reduction rewards deleting context or hiding the limitation that makes a claim honest.
- **Counter-risk:** refusing all quantitative signals can let repetition survive without scrutiny.
- **Required change:** use length measurements diagnostically, but approve each default case against the visible evidence-spine checklist.
- **Acceptance test:** every case passes the nine-item spine with no required disclosure; repeated copy is demonstrably removed; no fixed reduction target is used as the verdict.
- **Result:** Structure checkpoint Pass; fresh recruiter review pending.

## Checkpoints and stop conditions

1. **Structure checkpoint:** implement hierarchy and disclosure grouping without visual polish; present representative desktop/mobile renders for owner review.
2. **UX design-principles checkpoint:** evaluate hierarchy, recruiter task completion, cognition, wayfinding, user control, accessibility, and case sequence against the rendered structure. Record predictions separately from validated behavior.
3. **Correction and owner approval required:** do not begin visual refinement until Major UX findings are repaired, re-checked, and the corrected structure is accepted.
4. **Visual checkpoint:** refine existing disclosure spacing, labels, and case-specific composition without creating a new pattern.
5. **Verification checkpoint:** accessibility, responsive, direct-link, test, build, registry, house-style, tell, and blind-review gates.
6. Stop and return to the owner if a proposed cut would hide a material claim boundary, if the visible path becomes incomplete, or if the existing disclosure primitive cannot meet direct-link/access requirements without a larger architecture change.

## Definition of done

- The approved hierarchy appears consistently on Home and in RecruiterPanel.
- Home exposes three primary cases as a labelled region; supporting evidence remains visible without equal flagship weight.
- Resume and Email are adjacent and discoverable in both hiring paths.
- RecruiterPanel's first 390×844 viewport reaches selected work and the MSK title without removing résumé or email.
- All six English case studies have a complete highlights-first visible story.
- Optional evidence remains reachable under specific native disclosure labels.
- Direct hashes reveal hidden targets without focus theft or history breakage.
- Chapter navigation never reclaims focus after a newer user action.
- The sequential case-study loop matches MSK → Grove → Knowunity → Medical Logistics → UX Woman → Mobbin → MSK.
- Spanish behavior is unchanged.
- Responsive/accessibility requirements pass.
- Focused and relevant full tests, production build, registry, house-style, tell, and blind review pass or have owner-reviewed documented exceptions.
- The design state and evidence records are updated.
- No unrelated file is included.
- Commit and deployment remain separate owner decisions.

