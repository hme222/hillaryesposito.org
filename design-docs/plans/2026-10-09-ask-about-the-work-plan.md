# Plan: Ask about the work

Brief: `design-docs/briefs/2026-10-09-ask-about-the-work.md` · Strategy:
`design-docs/strategy/2026-10-09-ask-about-the-work-strategy.md` · Taste:
`design-docs/taste/2026-10-09-ask-about-the-work-taste.md`.
Builder: design-builder, 2026-10-09. Branch `ask-about-the-work`.

## Shape

Three layers, each a full answer on its own:

1. **Retrieval** (browser, free, always on) — BM25 over the approved
   knowledge entries, lazy-loaded with the engine when the dialog opens.
   Returns ranked passages with sources and a calibrated covered / not-covered
   verdict.
2. **Answer** (Vercel function, Claude Haiku 4.5) — writes 1–3 sentences only
   from the passages retrieval chose, citing their ids. Optional at runtime.
3. **UI** — one dialog on the existing `Modal`, opened from the nav, the
   mobile menu and the recruiter panel. Five states: idle, thinking,
   answered, not covered, passages (AI unavailable).

## Tasks

| # | Task | Files | Verify |
|---|---|---|---|
| 1 | Plan saved | this file | — |
| 2 | Knowledge types + lazy loader | `my-app/src/ask/types.ts`, `loadKnowledge.ts` | tsc |
| 3 | BM25 engine: fold accents, EN/ES stopwords, light stemming + prefix match, tight synonym table, grounding threshold | `my-app/src/ask/retrieval.ts` | eval test |
| 4 | Eval set (~60 questions, 3 audiences, EN/ES, out-of-scope) + jest gate ≥80% top-3 / 100% not-covered | `my-app/src/ask/eval.json`, `retrieval.eval.test.ts` | `react-scripts test` |
| 5 | Server handler (pure, deps-injected) + Vercel adapter; zod schema; citations validated server-side; rate limit; no question logging | `my-app/src/ask/server/askHandler.ts`, `my-app/api/ask.ts` | handler unit tests (SDK mocked) |
| 6 | Strings EN/ES | `my-app/src/i18n/strings.ts` | tsc |
| 7 | Bird icon (24px, currentColor + `--coral`) | `my-app/src/components/ask/AskBirdIcon.tsx` | rendered |
| 8 | AskDialog on `Modal`: starters, labelled input, live region, sources, quote rendering, five states, analytics | `my-app/src/components/ask/AskDialog.tsx`, `my-app/src/styles/ask.css` | tests + rendered |
| 9 | Entry points: nav item + mobile menu (`open-ask` event, hamburger return-focus), recruiter panel link; mount in `App.tsx` | `Navbar.tsx`, `RecruiterPill.tsx`, `App.tsx` | rendered, keyboard |
| 10 | Analytics events `ask_open`, `ask_answered`, `ask_not_covered`, `ask_source_click` (counts only) | `PortfolioAnalytics.tsx` | unit test |
| 11 | Registry JSDoc + `npm run check:registry` | registry.md | script |
| 12 | Vercel build (`build`, prerender, parity), bundle size before/after | — | script output |
| 13 | Rendered checks (Playwright + real Chrome): 390/1440 × EN/ES × light/dark; three entry points; keyboard-only; contrast on pixels; 44px targets; no orphaned title; reduced motion | scratch scripts | screenshots |

## Decisions made while building

- **Tokens:** the dialog carries the `riso-page` class so it inherits
  `--paper/--ink/--coral/--coral-text/--on-coral/--mono/--sans` in both
  themes (riso-page.css is in the main CSS bundle via RisoHome/AboutMe). No
  new colours.
- **Dependencies:** `@anthropic-ai/sdk` and `zod` only. `@vercel/node` was
  dropped: its types are two interfaces and the package pulls ~100 MB of
  build tooling; the adapter types against Node's `http` module instead.
- **Knowledge gap (raised, not patched):** batch 1 has no passages on how the
  site is built or what inspired the look. Only the interview's Q4 wording is
  explicitly approved as quotable, so one quote entry (`interview-site:0`) is
  added in both files so starter 3 answers. Starter 4 ("What inspired the
  look?") will return *not covered* until an inspiration entry is approved.
- **Synonyms count as coverage**, so the table stays tight (true aliases
  only). No "inspired → map/riso" bridge: it would turn an uncovered
  question into a false answer.
- **Out-of-scope gate** is retrieval-side (score + grounding), with the
  model's own `covered=false` as a second gate and server-side citation
  validation as a third.

## Open questions for review

- Approve a quotable inspiration passage (interview Q2) so starter 4 has an
  answer.
- Entry counts: 272 EN / 94 ES in batch 1 (the hand-off said 311 / 133).
