# Design Strategy: Ask about the work

Approved by Hillary 2026-10-09. Brief: `design-docs/briefs/2026-10-09-ask-about-the-work.md`.

## Design Principles

### Sources before sentences
**The principle:** Every answer shows the passage it came from, with a link; a written answer never appears without its sources.
**In practice:** the answer and its cited passages render together; each source names where it lives (résumé, case study + section) and links there.
**We will NOT:** show an uncited answer, or a summary the reader can't check.

### "Not covered" is a designed answer
**The principle:** When the portfolio doesn't say it, the answer says so plainly and offers the closest links and Hillary's email.
**In practice:** a dedicated not-covered state with next steps; threshold-based, not model-judged alone.
**We will NOT:** guess, write "I think…", or hedge a half-answer.

### A tool, not a trick
**The principle:** It is labelled "Ask about the work" and behaves like a search tool that writes clearly.
**In practice:** plain text label in the nav; no sparkle icon, no "AI-powered" badge, no persona, no simulated typing.
**We will NOT:** let the feature explain its own intelligence (rubric, Craft "local trap"), or speak as Hillary in the first person.

### The same answer for everyone
**The principle:** Keyboard-first, answers announced to screen readers, usable at 390px, plain language, Spanish at the same depth as English.
**In practice:** native dialog (existing Modal), labelled input, polite live region for answers, 44px targets, starter questions as real buttons.
**We will NOT:** ship mouse-only chips, silent updates, or an English-only knowledge base.

## Competitive Position
Most portfolio chatbots are an "AI me" persona that improvises about the person. This one shows its sources, says what it doesn't know, and never speaks as Hillary. For an AI-product reviewer, the trust design is the evidence.

## Placement (decided)
- A text **"Ask"** item in the nav (and the mobile menu) opens one dialog on every route, for all three audiences.
- The recruiter panel gets one **"Ask a question"** link that opens the same dialog.
- One dialog, built on the existing `Modal` (native `<dialog>`, focus wrap, Escape, return focus).

## Experience Map

| | Recruiter (phone, 6 seconds) | Developer | UX designer |
|---|---|---|---|
| Entry | Nav "Ask" or recruiter panel | Nav "Ask" from any page | Nav "Ask" while reading a case study |
| First 5s | Three starter questions, e.g. "What did she own at MSK?" | "How is this site built?" | "What inspired the Riso style?" |
| Answer | 2–3 plain sentences + source passage + jump to section | Stack/deploy/testing facts, repo-backed | Approved inspiration entry, linked to the page it shaped |
| Friction | Small screen, distraction, unfamiliar wording | Wants specifics not in the knowledge base | Asks about something never written down |
| Exit | Jump to cited section, or email | Grove Storybook, case study | The page itself, or not-covered + email |

## Success Metrics

| Metric | Measures | Target | Method |
|---|---|---|---|
| Untraceable sentences | Claim truth | 0 | ~40-question EN/ES test set, every sentence checked against cited passages |
| Retrieval accuracy | Finding the right passage | ≥80% top-3 in-scope | Same test set |
| Not-covered correctness | Refusal | 100% on out-of-scope | Same test set |
| Accessibility | Inclusive use | All rubric gates; keyboard + screen-reader task completion | Playwright at 390/1440, keyboard script, live-region check |
| Usage (aggregate only) | Whether it's used and where it fails | Track opens, answers, not-covered rate, source clicks | Counts only; question text never stored |

## Constraints and Trade-offs
- No conversation memory; short answers; refusal over inference; two languages only.
- It will sometimes feel less clever than a free-form chatbot — deliberately.
- AI layer is optional at runtime: the retrieved passages are always the answer of record.
