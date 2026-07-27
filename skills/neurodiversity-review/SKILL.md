---
name: neurodiversity-review
description: Review interfaces, content, flows, research plans, prototypes, or implemented products for neuroinclusive UX. Use when a design may create barriers involving attention, memory, language, literacy, numeracy, sensory load, predictability, task resumption, or cognitive stress; when the user asks for a neurodiversity, ADHD, autism, dyslexia, dyscalculia, or cognitive-accessibility review; and after a build as part of the Designpowers reviewer round.
---

# Neurodiversity Review

Use this skill to dispatch the `neurodiversity-reviewer` and turn cognitive-accessibility guidance into specific, testable design findings. Treat neurodivergence as human variation, not a single condition or deficit.

## Guardrails

- Do not claim to speak as a neurodivergent person or simulate lived experience.
- Do not diagnose users or infer a condition from behaviour.
- Do not generalise one condition, preference, or research finding to every neurodivergent person.
- Separate standards, practitioner guidance, research evidence, and hypotheses.
- Do not claim WCAG conformance from this review. W3C COGA is supplemental guidance.
- For consequential or condition-specific decisions, require research, co-design, or usability testing with appropriately accommodated neurodivergent participants.

Read [references/source-framework.md](references/source-framework.md) before conducting the review.

## Workflow

### 1. Establish the Review Frame

Gather the design brief, personas, key tasks, supported devices, current artifact, and any research evidence. State what is being reviewed and what cannot be verified.

Identify whether the experience is high consequence: health, safety, finance, education, employment, government, caregiving, or autonomy. Raise the evidence bar for high-consequence work.

### 2. Map Cognitive Demands

Review each key task across these dimensions:

| Dimension | Look for |
|---|---|
| Attention and focus | Interruptions, competing motion, dense screens, unclear priorities |
| Working memory | Information users must remember across steps, hidden rules, lost context |
| Language and literacy | Jargon, figurative language, long clauses, dense text, weak hierarchy |
| Numeracy | Unexplained quantities, mental calculation, unfamiliar units, chart interpretation |
| Predictability | Unexpected movement, inconsistent controls, unexplained state changes |
| Wayfinding | Weak location cues, ambiguous next steps, difficult task resumption |
| Executive function | Too many decisions, unclear sequencing, no save-and-return path |
| Sensory regulation | Motion, flashing, sound, colour intensity, visual clutter, lack of control |
| Error recovery | Punitive errors, data loss, timeouts, missing undo, unclear recovery |
| Adaptation | Missing user control over motion, density, text, timing, or presentation |

### 3. Check the W3C COGA Objectives

Evaluate whether the design:

1. Helps users understand what things are and how to use them.
2. Helps users find what they need.
3. Uses clear and understandable content.
4. Helps users avoid and correct mistakes.
5. Helps users focus.
6. Avoids relying on memory.
7. Provides help and support.
8. Supports adaptation and personalization.

### 4. Distinguish Evidence from Assumption

Label every finding:

- **Verified** — observed in the rendered product, code, or user evidence.
- **Standards-based** — supported by W3C/WCAG or another named public standard.
- **Research-informed** — supported by a cited study or practitioner synthesis.
- **Hypothesis** — plausible risk that requires user research or testing.

Never turn a hypothesis into a universal rule.

### 5. Prioritize and Recommend

Classify findings:

- **Critical** — prevents an essential task or creates serious harm or exclusion.
- **Major** — substantially increases cognitive effort, error risk, or abandonment.
- **Minor** — meaningful improvement that does not block task completion.
- **Note** — research question, opportunity, or future consideration.

For every finding include:

- affected task and cognitive dimension;
- who may be affected, without stereotyping;
- evidence label and source;
- concrete design or content change;
- how to verify the fix.

### 6. Require Lived-Experience Validation

End with a validation plan. Identify which findings can be verified technically and which require neurodivergent participants. Recommend accommodations such as flexible session length, breaks, advance materials, multiple response modes, low-distraction settings, and permission to pause or resume.

## Deliverable

```markdown
# Neurodiversity Review: [Artifact]

**Scope:** [What was reviewed]
**Evidence available:** [Build, code, research, or limitations]
**Consequence level:** [Standard / High]

## Summary
[Overall neuroinclusive UX assessment]

## Cognitive Demand Map
| Task | Attention | Memory | Language/Numeracy | Predictability | Recovery |

## Findings
### Critical
- [Finding] — [dimension] — [evidence label] → [specific fix] → [verification]

### Major
### Minor
### Notes and Research Questions

## What Works
- [Existing strengths worth preserving]

## Lived-Experience Validation Plan
- [Participants, accommodations, tasks, and success evidence]

## Recommendation
[Proceed / Revise and re-review / Research before deciding]
```

## Integration

- **Dispatches:** `neurodiversity-reviewer`
- **Pairs with:** `cognitive-accessibility`, `accessible-content`, `adaptive-interfaces`, `inclusive-personas`, and `usability-testing`
- **Runs with:** `accessibility-reviewer`, `design-critic`, and `heuristic-evaluator` after a build
- **Hands fixes to:** `design-builder`, `content-writer`, `design-lead`, or `design-strategist`
- **Tracks deferred findings with:** `design-debt-tracker`
