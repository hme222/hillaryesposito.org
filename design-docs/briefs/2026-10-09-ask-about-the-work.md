# Design Brief: Ask about the work

Approved by Hillary 2026-10-09.

## Problem Statement
Recruiters, developers, and UX designers each arrive wanting one specific
answer — "what did she own at MSK?", "what's the stack?", "why the Riso
look?" — and today get it only by reading a whole case study. A fast answer
helps only if it is true: on this portfolio a fabricated answer is a failure,
not a quality issue (claim-truth gate; fabricated mechanisms were found and
removed on 2026-08-03).

## Users
- **Recruiters** — scanning on a phone, time-pressed; want plain answers on
  roles, numbers, scope.
- **Developers** — how the site is built, deployed, tested.
- **UX designers** — what inspired each page and why decisions were made.
- Across all three: screen-reader users (answers announced), keyboard-only
  users, people reading in their second language (English and Spanish
  supported), people arriving tired or distracted.

## Design Direction
Approach C — grounded retrieval first, AI layer on top:
1. A curated knowledge base holds every answerable passage **verbatim**, each
   with its source (résumé or a published page) and a link.
2. Retrieval runs first, in the browser, at no cost, and always returns the
   matching passages with sources.
3. The AI layer (Claude, via a Vercel serverless function holding
   `ANTHROPIC_API_KEY` server-side) writes a short conversational answer
   **only from the retrieved passages**, citing each passage it uses. If the
   passages do not support an answer, it says the portfolio doesn't cover it.
4. If the AI step is unavailable (no key, error, rate limit, budget cap), the
   visitor still gets the retrieved passages and links — never a dead end.
5. No match → "That isn't covered in the portfolio", the closest related links,
   and Hillary's email. Never a guess.
6. It is a way to find answers, not a showcase of AI — it does not explain its
   own intelligence (rubric, Craft "local trap").

## Constraints
- Stack: existing CRA app on Vercel; existing Riso tokens and components
  (check design-docs/design-system/registry.md first); run check:registry.
- Accessibility: every rubric hard gate (contrast, 44px targets, no orphaned
  headline), keyboard operable, new answers announced to screen readers,
  works at 390px.
- Claim truth: every knowledge passage traced to the résumé or a published
  page before it ships; dev/UX-designer entries drafted from verifiable repo
  facts and approved by Hillary entry by entry.
- Cost: small fast model by default, short answers, per-visitor rate limit,
  daily cap, and a spending limit set in the Anthropic console.
- Performance: lazy-loaded; must not slow the homepage.
- Secrets: the API key lives only in Vercel environment variables — never in
  the repo, the browser bundle, or chat.
- Languages: English and Spanish.

## Existing Design System
Riso tokens (my-app/src/styles/*, tokens/tokens.json), component registry
(design-docs/design-system/registry.md), house style
(.designpowers/house-style/).

## Taste Direction (Early Signal)
Existing direction: quiet authority, warm restraint. Voice spec: plain,
specific, no hype.

## Success Criteria
- On a ~40-question test set across the three audiences, in both languages:
  zero sentences not traceable to a cited passage.
- Correct passage in the top 3 for ≥80% of in-scope questions.
- 100% of out-of-scope questions get the "not covered" response.
- Every AI answer cites at least one passage; clean fallback with no key.
- Passes contrast, touch-target, keyboard and screen-reader checks at 390
  and 1440.

## Out of Scope (v1)
Conversation memory, accounts, voice, storing the text of visitors'
questions (aggregate usage counts only).

## Open Questions
- Placement (nav entry, recruiter panel, or homepage) — decided in strategy.
