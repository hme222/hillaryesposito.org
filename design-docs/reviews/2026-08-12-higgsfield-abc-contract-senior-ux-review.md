# Senior UX Review — Higgsfield A/B/C Mini Lab Contract

**Date:** 2026-08-12  
**Artifact:** `design-docs/builds/2026-08-12-higgsfield-ab-mini-lab-contract.md`  
**Reviewed against:** approved Higgsfield Innovation Reset brief, portfolio taste override, interaction-design requirements, Laws of UX, and recruiter-scan priorities  
**Recommendation:** **Revisions applied 2026-08-12; contract awaits owner approval and implementation validation**

> Resolution note: all seven required contract changes below were applied after this review. The original 63/100 score records the pre-revision contract and is not a post-build craft score.

## Executive assessment

The private comparison strategy is sound: exact evidence, no credit spend, an unlinked route, responsive prototypes, reduced motion, and explicit stop conditions make this a safe way to choose a direction. A and B are appropriately small hypotheses. C contains credible senior AI-product thinking, but it currently asks one mini to communicate too many system concepts and therefore risks reproducing the rejected method explainer as an embodied control surface.

The contract is not yet a fair A/B/C test. A tests atmosphere, B tests continuity, while C tests an entire agentic execution model. The strongest revision is not to remove its systems depth, but to sequence that depth through one legible task and keep exceptional system states out of the default experience.

## Contract score

| Dimension | Score | Senior UX judgment |
|---|---:|---|
| Problem and audience fit | 12/20 | The private lab serves Hillary's selection task, but C drifts from visual-craft evaluation into system-model evaluation. |
| Interaction coherence | 10/20 | A and B have one primary action. C has anchors, ranges, step buttons, reset, commit, cancel, replay, progressive fields, and nine execution states. |
| Recruiter-value signal | 9/15 | C could show advanced AI-product judgment, but the current experience is more likely to signal tooling complexity than portfolio judgment. |
| Accessibility and recovery | 13/15 | Strong intent: alternatives, live feedback, cancellation, preserved intent, reduced motion, and 44px targets. The accessible equivalent is not yet behaviorally specified. |
| Trust and system truth | 14/15 | Exact evidence, simulated-cloud labeling, idempotency, provenance, and recoverable failure are excellent constraints. |
| Comparison validity | 5/15 | Identical evidence is not enough: C has materially greater scope, state count, and explanatory burden than A or B. |
| **Total** | **63/100** | **Below the portfolio's 95-point pass bar. Contract revision required before implementation.** |

## Critical findings

### 1. C violates the approved brief unless the brief is explicitly amended

The approved reset requests exactly two concepts and prohibits Frame of Intent, sliders, endpoint buttons, workflow controls, and AI feature demos. The owner's later request clearly authorizes exploring a third private control, but the source brief still says the opposite. This creates ambiguous authority for implementation and review.

**Who it affects:** Hillary and the build team; reviewers cannot distinguish a deliberate exception from design drift.  
**Required revision:** Add an owner-approved brief amendment that permits C only as a private diagnostic experiment. State that C is not a third public direction and cannot graduate without separate approval.

### 2. The embodied mappings are not self-evident

Dragging an anchor has a plausible spatial relationship to composition and depth. It does not naturally communicate latency tolerance, consistency requirements, or “willingness to wait.” Those are invisible policy choices. Encoding them in location, hold duration, or release behavior would require learning, make accidental input likely, and burden motor and cognitive accessibility.

**Who it affects:** everyone encountering C for the first time, especially keyboard, switch, voice, tremor, low-vision, and reduced-motion users.  
**Required revision:** Let spatial manipulation express only spatial intent: framing, depth, emphasis, and atmosphere. Derive processing constraints from one familiar commitment choice—`Preview now` or `Finish with highest fidelity`—or from a visible time promise at commit. Do not encode policy in hold duration.

## Major findings

### 3. C has no concrete user job

“Shape the intent” describes system behavior, not a reason to act. Without a task, local/cloud routing and receipts become technology demonstrations.

**Required revision:** Ground C in one portfolio-production job: “Create a cinematic treatment around this exact MSK artifact without changing the artifact.” Every state must advance or protect that job.

### 4. The default path carries too many concepts

The contract specifies nine execution states and five system ideas. If all are visible or explained during the happy path, C becomes the infrastructure visualizer prohibited by its own stop conditions.

**Required revision:** Use a four-beat default path:

1. **Shape locally** — immediate, reversible spatial preview.
2. **Commit** — one explicit fidelity/time decision; exact evidence locks visibly.
3. **Keep working while it resolves** — local state remains usable through simulated delay.
4. **Receive result + receipt** — surrounding material settles; a compact receipt confirms protection and route.

Load, inconsistency, cancellation, cloud unavailability, and idempotent replay should be evaluator-triggered scenarios outside the default path—not simultaneous UI states.

### 5. The comparison is not controlled

C requires much more interaction, implementation, explanation, and testing than A or B. A more elaborate prototype may win through novelty or lose through complexity, neither of which answers which Higgsfield direction is strongest.

**Required revision:** Give each concept the same evaluation window and output contract: one authentic artifact, one primary gesture/action, one 8–12 second complete experience, one still fallback, and one sentence of guidance. Evaluate C's advanced recovery states separately after the first preference test.

### 6. The receipt risks becoming provenance theater

Intent ID, route, source, allowed changes, completion state, and replay status are defensible system fields, but all six at once are not recruiter-facing value. A receipt that unfolds visually could also compete with the artifact at the ending—the moment most likely to be remembered.

**Required revision:** Default receipt copy should answer only three human questions: `What stayed protected?`, `What changed?`, and `Was this already run?` Put the technical ID and route in a secondary disclosure for the evaluator.

### 7. “Local” and “cloud” are implementation terms, not automatically meaningful choices

Asking people to select a processing location pushes irreducible complexity onto them. The useful UX is choosing an outcome constraint—speed, fidelity, privacy, or continued editability—while the system explains the route it selected.

**Required revision:** Make routing system-recommended and reversible. The user chooses the desired outcome; the interface states, for example, `Preview stays on this device. The atmosphere can finish remotely in about 8 seconds.`

## Minor findings

- Rename `Replay receipt` to `View receipt`; replay should apply to an execution or animation, not a document.
- Define whether `Cancel` cancels remote processing, visual settling, or both. Cancellation must preserve the local composition.
- Define the stable intent-ID inputs and explicitly exclude pointer noise, timestamps, focus order, and animation preference so equivalent accessible input produces the same receipt.
- Replace “byte-for-byte unchanged” homepage language with a user-visible and bundle-isolation requirement; adding a route can legitimately alter generated artifacts without changing the homepage experience.
- Add a maximum status-copy budget and prohibit engineering terms such as `eventual consistency`, `idempotency`, `queue`, or `hash` in the visible experience.

## What already works

- Authentic evidence is exact, local, immutable, and shared across concepts.
- The prototype cannot spend credits or imply a live distributed system.
- Local feedback remains responsive through remote delay and failure.
- Cancellation and cloud failure preserve user intent.
- Repeat execution has a defined duplicate-prevention model.
- Static, mobile, keyboard, touch, live-region, and reduced-motion expectations are present.
- The contract contains explicit stop conditions for posters, dashboards, players, AI demos, and control-panel readings.

## Accessibility status

**Contract-level status: Revise.** The foundations are strong, but equivalent access is not yet equivalent intent. Range inputs and step buttons cannot be treated as sufficient until the contract maps their values to the same spatial outcomes, defines focus order, announces changes without verbosity, preserves state at 200% zoom, and specifies error recovery. Do not use press duration as a required semantic input. Representative testing remains required; no WCAG pass can be claimed before implementation.

## Laws of UX trace

| Lens | Interface evidence | Prediction | Counter-risk | Acceptance criterion | Status |
|---|---|---|---|---|---|
| Doherty Threshold | Immediate local preview while remote work resolves | Continuous feedback should preserve momentum | The preview may be mistaken for the final output | Visual and announced labels distinguish `local preview` from `finished`; response begins under 100ms | Proposed |
| Tesler's Law | User currently expresses latency and consistency policy | System can absorb routing complexity | Hiding routing may weaken trust | User selects outcome constraints; system recommends and explains route with an override only when consequential | Failing contract |
| Jakob's Law | Dragging maps naturally to spatial composition | Familiar direct manipulation should reduce instruction | Hidden hold/release semantics create surprise | Drag changes spatial qualities only; commit uses a familiar button | Partially met |
| Hick's Law | C exposes many actions and states | A four-beat path should improve first-use comprehension | Excess reduction could hide recovery | Default path has one primary action per beat; exceptional states are evaluator-triggered | Failing contract |
| Peak-End Rule | Receipt appears at completion | A concise proof of protection can create a trustworthy ending | A technical receipt can displace the visual result | Artifact remains dominant; receipt answers three human questions in one glance | Proposed |

These are practitioner hypotheses informed by the Laws of UX framework, not validated user findings.

## Recruiter lens

The lab is private, so a full 24-check portfolio score is not applicable until a direction is integrated and rendered. At concept level, A and B reinforce the approved “felt first” visual-craft goal. C can demonstrate senior AI-product judgment to design and product leaders, but only if its system intelligence is inferred from a simple, trustworthy interaction. If a recruiter must understand anchors, envelopes, routing, settling, consistency, and receipts to appreciate it, C fails the six-second test and should remain a private process artifact.

## Required contract changes before approval

1. Amend the reset brief to authorize C as a private diagnostic exception.
2. Give C one concrete production job and one primary spatial action.
3. Restrict gesture semantics to spatial qualities; move policy to a familiar commit choice.
4. Reduce the happy path to four beats and move failure/load scenarios into evaluator controls.
5. Equalize the A/B/C comparison window and interaction budget.
6. Compress the visible receipt to protection, change, and duplicate status.
7. Add observable first-use criteria: task comprehension, route comprehension, completion, error recovery, and artifact recall.

After those revisions, the contract should receive a second senior UX review before implementation. The current recommendation is **Revise**, not Reject: C's underlying model is valuable, but the interface needs to conceal more machinery than it reveals.
