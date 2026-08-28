# Designpowers

This is the Designpowers design workflow system.

## Mandatory: Welcome Sequence First

**Before doing anything else in a new session**, you MUST run the welcome sequence defined in `skills/using-designpowers/SKILL.md`. This is non-negotiable.

1. Invoke the `using-designpowers` skill using the Skill tool **before** responding to any user message
2. The skill will show the bird welcome screen and handle onboarding
3. Do NOT skip the welcome, do NOT jump straight into design work, do NOT answer questions before the welcome runs

The welcome sequence checks for a returning user (taste profile at `~/.designpowers/taste-profile.md`) and shows the appropriate welcome screen with the bird. First-time users get offered a guided walkthrough. This must happen before any design work begins.

**Specifically: do NOT invoke design-discovery, design-strategy, design-memory, design-state, design-taste, or any other Designpowers skill until the welcome sequence has completed.** The bird must appear. The user must see the greeting and the walkthrough offer. Only then can the pipeline begin. If any skill is invoked before the welcome, stop and run the welcome first.

## Skills

All design skills live in `skills/`. The entry point is `skills/using-designpowers/SKILL.md` which orchestrates the entire workflow. Never bypass it.

## Agents

Design agents live in `agents/`. They are invoked by the workflow — do not call them directly without going through the skill orchestration.

## Design principles

How we decide here. Full voice register and bans live in
`.designpowers/house-style/voice-spec.md`, not in this file.

### Always
- Headlines fit on one line, or break at a real phrase boundary — never a
  stranded word on line two. Prose headings use `text-wrap: balance`
  (see flagship-case-study.css). Fixed-width graphics and mockup labels
  (e.g. dashboard role titles) scale type down to fit one line instead.
- Cut before adding. Treat any locked-voice copy you write as a first draft
  to trim, not a finished line — read voice-spec.md's register and bans
  before writing it, then cut anything that doesn't carry a claim.
- Before adding a new component, check `design-docs/design-system/registry.md`
  for a sibling that already does the job — read that family's cross-linked
  descriptions before writing a new one. This is what would have prevented
  `DecisionStory`/`GroveDecisionStory`/`DecisionCard` existing as three
  separate components before anyone noticed. Run `npm run check:registry`
  (in `my-app/`) after adding or renaming a component — it fails if the
  registry has gone stale.

### Never
- Never let a headline wrap into an orphaned second line.
- Never pad copy to sound thorough. If a shorter version says the same
  thing, the longer one isn't done.

Token rules are path-scoped, not here: `.claude/rules/tokens.md` only loads
when you're working inside `my-app/src/styles/**`, so it doesn't take up
room in every session the way this file does.
