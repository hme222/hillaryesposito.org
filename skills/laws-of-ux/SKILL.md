---
name: laws-of-ux
description: Apply psychology principles and the Laws of UX to product strategy, information architecture, visual hierarchy, interaction design, onboarding, forms, navigation, performance feedback, critique, and usability evaluation. Use when choosing or defending a UX pattern, reducing complexity, reviewing decision load or target placement, designing progress and memorable moments, or when the user asks for Laws of UX, behavioral design, psychology-informed design, Gestalt principles, Hick's Law, Fitts's Law, Jakob's Law, Miller's Law, Tesler's Law, Peak-End Rule, or related principles.
---

# Laws of UX

Use psychology principles as testable design lenses, not universal commands. Select only the laws relevant to the user's task, make an explicit prediction, check counter-risks, and validate the result.

Read [references/law-selection-guide.md](references/law-selection-guide.md) when selecting laws or conducting a full audit.

## Evidence Rules

- Attribute the framework to Jon Yablonski's [Laws of UX](https://lawsofux.com/).
- Label source use as **Verified**, **Index-only**, or **Practitioner synthesis**.
- Do not infer research findings from a law's name.
- Do not use a law as proof that a design works. Treat it as a hypothesis until the interface is inspected or tested.
- Do not use psychology to create coercion, false urgency, addiction, hidden costs, obstructed cancellation, or other dark patterns.
- Accessibility, safety, user control, and task truth override persuasion or aesthetic effects.

## Workflow

### 1. Frame the Decision

State the user and context, task and desired outcome, current friction, consequence of error, available evidence, and success measure.

### 2. Select the Smallest Relevant Set

Choose 1–5 laws from the reference guide. Avoid “law shopping” after a design decision has already been made.

For each selected law, write:

```markdown
**Law:** [Name]
**Why it applies:** [Observed task or interface evidence]
**Prediction:** If we [change], then [user behaviour or outcome] should [change]
**Counter-risk:** [What could become worse or who could be excluded]
**Validation:** [Test, metric, or observation]
```

### 3. Reconcile Conflicts

- Hick's Law or Choice Overload vs. Tesler's Law: reduce unnecessary choice without hiding irreducible complexity.
- Jakob's Law vs. differentiation: preserve familiar task mechanics while expressing originality through art direction, content, or optional enhancement.
- Aesthetic-Usability Effect vs. accessibility: polish can improve perceived ease but never excuses inaccessible contrast, motion, or structure.
- Goal-Gradient or Zeigarnik effects vs. ethics: show honest progress; do not manufacture incompleteness or pressure.
- Postel's Law vs. safety: accept humane input variation, but validate strictly at security and data-integrity boundaries.
- Doherty Threshold vs. truth: provide immediate feedback and cancelability; do not fake completion.
- Von Restorff Effect vs. hierarchy: reserve visual distinction for the genuinely important action.
- Miller's Law vs. evidence: never impose “7±2” as a universal navigation or menu limit.

### 4. Convert Laws into Design Criteria

Turn each law into an observable acceptance criterion.

- “Apply Fitts's Law” becomes “primary touch targets are at least 44×44px, comfortably separated, and reachable in the actual device context.”
- “Apply Hick's Law” becomes “the decision point exposes only relevant options, preserves comparison information, and measures decision time and errors.”
- “Use chunking” becomes “groups match the user's mental model, have clear labels, and remain understandable at 200% zoom.”

### 5. Validate

Use the lightest credible method:

- inspect rendered hierarchy, states, and responsive behavior;
- walk the primary and error paths;
- measure target size, response timing, option count, or task duration where relevant;
- test comprehension, decision confidence, error rate, completion, or recall with representative participants;
- pair with `neurodiversity-review` when cognitive variation materially affects the decision.

Do not claim improvement when validation was not run. Mark it **Proposed**.

## Deliverable

```markdown
# Laws of UX Review: [Artifact]

## Decision Frame
[User, task, context, evidence, and success]

## Law Trace
| Law | Interface evidence | Prediction | Counter-risk | Acceptance criterion | Validation | Status |

## Conflicts Resolved
- [Law A] vs. [Law B]: [decision and rationale]

## Findings
### Critical
### Major
### Minor

## What Works
- [Patterns to preserve]

## Recommendation
[Proceed / Revise and test / Research before deciding]

## Matrix Check
**Applied dimensions:** Agentic UX/Trust; Design Systems/Prototyping; Research/Strategy as relevant
**Hard gates:** [Pass/fail/N/A]
**Evidence status:** [Verified / Index-only / Practitioner synthesis]
**Validation still required:** [Tests]
```

## Integration

- **Used by:** `design-strategy`, `ui-composition`, `interaction-design`, `cognitive-accessibility`, and `designpowers-critique`
- **Primary reviewer:** `heuristic-evaluator`
- **Pairs with:** `neurodiversity-review`, `accessible-content`, `adaptive-interfaces`, and `usability-testing`
- **Tracks deferred findings with:** `design-debt-tracker`
