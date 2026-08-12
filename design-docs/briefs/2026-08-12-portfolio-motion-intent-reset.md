# Discovery Draft — Portfolio Motion Intent Reset

**Date:** 2026-08-12  
**Status:** **Approved by Hillary Esposito on 2026-08-12**  
**Trigger:** Owner rejection of the isolated A/B/C lab premise

## Problem statement

The private lab separated motion from the portfolio moments it was supposed to improve. A and B became demonstrations beside the real projects instead of behaviors within browsing and navigation. C became a production-tool exercise whose purpose was unclear to a portfolio visitor.

The next direction must answer a practical visitor question at the exact moment motion occurs. It may not ask recruiters to understand a motion concept, production system, or evaluator interface.

## Users and context

- Recruiters scanning adjacent Selected Work rows and deciding which project to open.
- Design and product leaders looking for authored interaction judgment rather than spectacle.
- Touch, keyboard, switch, voice, screen-reader, reduced-motion, low-data, and zoom users who need the same project identity and route cues without cursor dependence.
- Returning or interrupted visitors who need spatial continuity and easy resumption.

## Motion principles

Each motion must answer at least one of these questions:

1. **What changed?** The active project or portfolio context becomes unmistakable.
2. **What should I look at next?** Attention moves toward the authentic artifact or case-study route.
3. **How are these related?** Homepage evidence and destination evidence feel connected without pretending one artifact became another.

Motion is short product feedback, not a 9–12 second film. Use a 100–200ms response and a 250–700ms complete choreography. Nothing delays the case-study route.

## Cursor-following hypothesis

Cursor-following is useful only when it reveals the visitor's current intent:

- the material field may softly follow the pointer within the currently focused/hovered project row;
- the response must stop at the row boundary and settle toward that project's authentic artifact and route;
- the cursor never controls evidence, generates content, or requires precise tracking;
- keyboard focus produces the same selected state, touch uses press/selection, and reduced motion uses a static registered highlight;
- the interaction must survive without a visible custom cursor.

Continuous decorative following, magnetic lag, particles, pointer trails, parallax, or movement across all project rows is out of scope.

## Integration requirement

Every proposed concept must be shown in the real portfolio sequence:

1. adjacent MSK, Grove, and Mobbin rows at rest;
2. one row under pointer, focus, or touch selection;
3. the route activation moment;
4. the first truthful case-study destination state;
5. reduced-motion and non-pointer equivalents.

No concept may be evaluated only inside an isolated stage.

## Design system and taste

Preserve the current Riso/editorial portfolio, exact evidence, quiet authority, warm restraint, strong typography, normal links, and current mobile order. Motion can bend surrounding paper, light, shadow, and registration, but cannot distort project imagery, copy, metrics, attribution, status, or routes.

Target: responsive, surprising, tactile, precise, and inevitable after interaction.  
Avoid: ambient decoration, poster motion, demo-player grammar, long sequences, custom-cursor gimmicks, AI spectacle, instructional controls, or a named framework.

## Success criteria

- A new viewer can state why the motion occurred and what action it supports.
- The selected project becomes easier to distinguish while adjacent projects remain calm.
- The real artifact or route is visible within the same viewport as the motion.
- Pointer, keyboard focus, and touch reach the same meaningful selected state.
- Reduced motion retains project identity, relationship, and route clarity.
- Route activation begins immediately; motion never delays navigation.
- The behavior feels embedded in the portfolio rather than added as a showcase module.
- The selected direction must still pass the ≥95 craft gate, recruiter comprehension, accessibility, performance, and blind anti-AI review.

## Out of scope

- Continuing the current A/B/C visual treatment unchanged.
- Reusing the Spatial Intent Playground or its distributed-system evaluator on the public portfolio.
- New Higgsfield generation or credit spend before a real-context no-credit prototype passes.
- Camera access, hand tracking, synthetic UI, generated evidence, or a visible AI feature.
- Deployment.

## Open decision

Select the real portfolio moment that should carry the innovation: project-row selection, route transition, case-study artifact inspection, or a deliberately connected combination. Motion-panel recommendations are pending.

## Senior product-motion recommendations

### Approach 1 — The selected row has a center of gravity

A soft paper/light registration response follows the pointer only inside the currently hovered project row and settles toward its authentic thumbnail. Keyboard focus receives a canonical selected state; touch receives a brief press state; reduced motion receives a static registered highlight.

- **Purpose:** distinguish the current project from its adjacent rows and point toward its artifact and route.
- **Timing:** 120–160ms response; 8–12px maximum material travel; 140ms return.
- **Boundary:** no custom cursor, lag, trail, particles, magnetic behavior, cross-row movement, or continuous page following.
- **Risk:** literal tracking can become twitchy and compete with reading.
- **Verdict:** useful as a restrained selection cue, not strong enough to be the signature innovation.

### Approach 2 — The artifact survives the route

Activating an existing project link immediately begins navigation while a protected copy of the selected thumbnail holds its identity through the change from portfolio index to case-study context. The destination title and truthful hero artifact resolve around it; the overlay disappears within 560ms.

- **Purpose:** show what changed, retain what the visitor selected, and direct attention toward the case-study title and evidence.
- **Timing:** 0–100ms selection lock; 100–420ms context handoff; complete by 560ms desktop and 420ms mobile.
- **Boundary:** if homepage and destination artifacts differ, preserve the thumbnail only as a neutral identity anchor before revealing the real hero. Never pretend one artifact became another.
- **Adaptation:** identical link activation for pointer, keyboard, touch, switch, and voice; reduced motion receives a 100–120ms simultaneous context crossfade; Save Data, unsupported browsers, no JavaScript, or load uncertainty use the normal route.
- **Risk:** poor mapping or delayed titles could resemble a loader.
- **Verdict:** **recommended signature integration** because it communicates a consequential relationship at the exact moment the visitor needs orientation.

### Approach 3 — Decision relay inside the case study

The existing hero CTA hands attention to the first evidence chapter with one short registration settle and aligned rule.

- **Purpose:** connect the hero claim to the evidence that supports it.
- **Timing:** 120ms press; 180–300ms settle; 400ms maximum.
- **Boundary:** one use per case study; no scroll-wide reveal system.
- **Risk:** may duplicate information scent already supplied by the anchor link.
- **Verdict:** optional secondary echo after the route handoff proves successful.

## Recommended direction

Prototype Approach 2 as the signature behavior in the real Home → case-study and case-study → next-study paths. Use Approach 1 only as the compact pre-click selection cue. Hold Approach 3 until the primary transition is tested.

Use native View Transitions and CSS first; add no runtime and spend no Higgsfield credits. Higgsfield becomes relevant only after the interaction model passes, when it can produce the source-free paper, light, and camera plates composited around exact evidence.

Prototype validation targets:

- 5 of 5 reviewers open the intended project without help;
- at least 4 of 5 understand continuity without believing the evidence changed;
- 0 of 5 describe the transition as a loader or AI demo;
- route-to-readable-title is no more than 100ms slower than the current baseline;
- 390px, 1440px, keyboard, touch, reduced motion, Save Data, back navigation, and late lazy-route loading all preserve the normal route and focus behavior.
