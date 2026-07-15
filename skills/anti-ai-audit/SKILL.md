---
name: anti-ai-audit
description: Use to find the "AI tells" in a portfolio, case study, page, or codebase — the patterns a discerning reader, a hiring manager, or another AI would clock as machine-generated. Scans prose, visual design, and code through a senior practitioner's lens, rates each tell by how loudly it reads as AI, and gives a concrete human rewrite. Run before shipping anything a skeptical senior will read.
---

# Anti-AI Audit

The job: read the work the way a skeptical senior would — a staff engineer on a PR, a design director on a portfolio, a hiring manager who has read 200 AI-written case studies this month — and flag everything that reads as *generated* rather than *authored*. Then say exactly how to make it read human.

This is not about detector scores. It's about the texture that makes an experienced reader think "a model wrote this," lose trust, and stop reading. One loud tell can sink an otherwise strong piece.

**Write the audit itself in plain, specific, human prose.** An anti-AI skill that reads like AI has failed. No buzzwords, no triads, no em dashes as a crutch.

## When to use

- Before shipping a portfolio, case study, landing page, README, or PR.
- When something is "technically fine" but feels flat, generic, or over-polished.
- After a heavy AI-assisted writing or coding session, to scrub the residue.

## How to run

1. **Gather the surfaces.** Prose (copy, case studies, i18n strings, docs), visual design (CSS tokens, layout, imagery), and code (components, styles, config).
2. **Grep for the cheap tells first** (fast, high-signal):
   - Em dashes: `—` (the single loudest prose tell for this owner).
   - Buzzwords: `leverage|seamless|robust|delve|elevate|showcase|underscore|testament|tapestry|landscape|realm|utilize|foster|empower|navigate the|in today's|fast-paced|ever-evolving|it's worth noting|it's important to note|cutting-edge|game-chang|unlock|dive into|treasure trove`.
   - Not-X-but-Y frames: `not just|isn't just|not about .* it's about|more than just`.
   - Template selfhood: `I am not a|I'm not just a|I don't just`.
   - Emoji as section markers, Title Case Headings Everywhere.
3. **Read for the texture tells** (judgment, below).
4. **Report** as a ranked table. Loudest tells first. Every row gets a concrete fix, not "consider revising."

## The tells

### Prose (what a hiring manager clocks)

- **Em dashes as default connective tissue.** A comma, colon, semicolon, or full stop almost always reads more human. Reserve em dashes for the rare real aside.
- **Rule-of-three everything.** "Clarity, completeness, and accuracy." "Research, strategy, and execution." Real writers break the pattern; models love the triad. Cut to two or expand to a real list.
- **Not-just / it's-not-X-it's-Y.** "Not just a screenshot — a decision." Once is a device; three times is a tell. Keep at most one per page.
- **Capability inflation and input-counting.** "32 respondents grounding every decision." Numbers that count *your* activity, not an outcome. Rewrite as a capability or a result.
- **Hedging that isn't yours.** "suggested," "helped drive," "contributed to," "aimed to." Sometimes honest (keep those); often just softening. Claim the verifiable part cleanly.
- **Symmetry that's too clean.** Every paragraph three sentences, every section the same shape, every list four items. Humans are lumpy. Vary length on purpose.
- **Buzzword vocabulary** (list above). None of these survive a senior read.
- **Explaining the obvious.** "Open the app" as a flow step. "First, we conducted research." Cut narration that carries no decision.
- **The same insight, restated.** A model will re-hit its best line in the summary, the body, and the reflection. State a twist once, where it happened.
- **Marketing voice in the wrong place.** A README, a code comment, or an alt tag written like a landing page.

### Visual design (what a design director clocks)

- **The AI-design default cluster:** warm cream `#F4F1EA` + a serif display + a terracotta accent; near-black with one acid-green/vermilion pop; a purple-to-blue gradient hero on white; Inter or Space Grotesk as the "safe" face; emoji as section markers; everything centered; `rounded-lg` and a coloured accent bar on every card.
- **Card soup.** Page regions forced into identical rounded cards with no hierarchy.
- **Even grids with no focal point.** Nothing is bigger, first, or louder — so nothing is the point.
- **Gradient text everywhere** as a substitute for real hierarchy.
- **Generated imagery** (obvious Midjourney lighting, uncanny hands, stock-mimic hero photos).
- **No details only a human would notice.** No optical adjustments, no considered widow fixes, no intentional asymmetry. Suspicious perfection.

### Code (what a staff engineer clocks on a PR)

- **Comments that restate the code** ("`// increment counter`") instead of explaining *why*.
- **Marketing-voice or over-eager comments** ("This powerful helper elegantly handles...").
- **Defensive boilerplate for cases that can't happen;** `try/catch` that swallows errors silently.
- **Hallucinated or wrong APIs / props** that don't exist in the actual library version.
- **Inconsistent patterns across files** — three ways to do the same thing, because each was generated fresh.
- **Over-abstraction** — a wrapper component or util with exactly one caller.
- **Copy-paste with slight variations** where a loop or map belongs.
- **Left-behind residue** — unused imports, dead vars, `console.log`, `TODO: implement`.
- **Uniform, over-formatted everything** that no human actually maintains by hand.
- **Magic numbers and inline styles** mixed inconsistently with a token system that already exists.

## The senior lens (apply to every finding)

Ask, in order:
1. **Would a senior write it this way?** If a staff engineer or design lead would phrase it differently, that gap is the tell.
2. **Is it intentional or inherited?** A human makes a choice you can defend. A model reaches for the most probable token. Flag the probable-token default.
3. **Does it survive being read aloud?** Buzzword prose and triads collapse when spoken. If you'd be embarrassed to say it in an interview, cut it.
4. **Does the fix add a fingerprint?** The best fix doesn't just remove the tell; it adds something only this person, on this project, would write — a specific number, a real constraint, a named tradeoff, an opinion.

## Reporting format

Return a single ranked table, loudest tells first, plus a one-line "tell density" read.

| # | Where (file:line) | Surface | The tell | Why it reads as AI | Sev | Human fix |
|---|---|---|---|---|---|---|

- **Surface**: Prose / Design / Code.
- **Sev**: High (a senior clocks it instantly and loses trust) · Med (adds up across the page) · Low (polish).
- **Human fix**: the concrete rewrite or change, ideally adding a fingerprint. Never "consider revising."

Close with: **the 3 loudest tells to fix first**, and — if the work is already clean — say so plainly instead of manufacturing findings. A short honest audit beats a padded one (which is itself an AI tell).

## Guardrails

- Do not flag correct, specific, human choices just to hit a quota. False positives destroy trust in the audit.
- Real hedging tied to honesty (liability-conscious attribution, "prototype not shipped") is a *feature*, not a tell. Distinguish honest precision from reflexive softening.
- Cite exact `file:line`. Vague findings can't be acted on.
