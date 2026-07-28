# Portfolio Designpowers Consumer

This repository is Hillary's portfolio implementation. It consumes the shared Designpowers system; it is not the canonical source for reusable agents or skills.

## Mandatory: Welcome Sequence First

**Before doing anything else in a new design session**, invoke the globally installed `using-designpowers` skill. Its canonical editable source is `/Users/hills_mac/Documents/Chief of Staff/designpowers-team/skills/using-designpowers/SKILL.md`. This is non-negotiable.

1. Invoke the globally installed `using-designpowers` skill **before** responding to any design request
2. The skill will show the bird welcome screen and handle onboarding
3. Do NOT skip the welcome, do NOT jump straight into design work, do NOT answer questions before the welcome runs

The welcome sequence checks for a returning user (taste profile at `~/.designpowers/taste-profile.md`) and shows the appropriate welcome screen with the bird. First-time users get offered a guided walkthrough. This must happen before any design work begins.

**Specifically: do NOT invoke design-discovery, design-strategy, design-memory, design-state, design-taste, or any other Designpowers skill until the welcome sequence has completed.** The bird must appear. The user must see the greeting and the walkthrough offer. Only then can the pipeline begin. If any skill is invoked before the welcome, stop and run the welcome first.

## Shared system

Reusable skills and specialist-agent instructions live in `/Users/hills_mac/Documents/Chief of Staff/designpowers-team/`. The globally installed copies under `~/.agents/skills/` are runtime artifacts, not the editable source. Never re-create shared `skills/` or `agents/` folders in this repository.

Project-specific portfolio guidance remains local under `portfolio-overrides/`:

- `astryx-integration.md`
- `case-study-show-guardrails.md`
- `hme-inspiration-board.md`

Use these only as portfolio context layered on top of the shared system. Do not promote them into global rules unless Hillary explicitly approves the generalization.

## Agents

Invoke the Designpowers specialist roles through the shared workflow. Do not call them directly without going through skill orchestration and the current `design-state.md`.
