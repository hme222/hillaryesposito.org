# About Page — Information Architecture Rework (Scope)

_Drafted 2026-07-27. Not approved. No code changed._

## Why this is worth doing

The About page is the only surface whose unique job is answering **"what is this person like to work with."** Every other page answers "what did she build." Right now About answers the second question in a slightly different font, and buries the material that answers the first.

## Current structure

| Order | Section | Anchor | In chapter nav? |
|---|---|---|---|
| 1 | Hero — "I design products where the details decide whether people trust them." | — | — |
| 2 | **My pattern** — "I enter complex systems and find where trust breaks." + 4-step list | `#about-pattern` | Yes ("Approach") |
| 3 | **My story** — "How I got here." + chapter cards with article links | `#about-story` | Yes ("Story") |
| 4 | **Outside of work** — running, reading, Luna | *none* | **No** |
| 5 | **Client feedback** — "How clients describe working with me." | `#about-proof` | Yes ("Proof") |
| 6 | Closing CTA | `#about-contact` | Yes ("Contact") |

## Problems

**P1 — The only third-party voice on the site sits fifth.** `AboutMe.tsx:256-277` holds real client quotes with names, roles, and context. They are placed *below* a section about the cat. For a hiring manager, this is the highest-credibility content on the page and it is the last thing before the CTA.

**P2 — "Outside of work" is unreachable by the nav.** `AboutMe.tsx:247` has no `id`, and the chapter strip (`:121-127`) lists only Approach / Story / Proof / Contact. Anyone navigating by the strip never learns the section exists. Same defect class as the flagship brief sections found in the 2026-07-27 review.

**P3 — "My pattern" is process boilerplate.** Observe → map → design → measure (`AboutMe.tsx:167-172`) is the generic register the taste profile explicitly rejects. It also duplicates MSK's Observe / Align / Redesign, which is the same claim *with evidence attached*. About asserts the method; MSK proves it. Only one of those should exist.

**P4 — Credentials still absent.** After the 2026-07-27 restoration, MHA and Lean Six Sigma appear on Home (credential strip) and inside the MSK case study. The page a reader opens specifically to learn who Hillary is does not name them.

**P5 — Ordered by chronology, not by belief.** Method → history → personal → proof asks the reader to invest before giving them a reason to.

## Proposed structure

| Order | Section | Change |
|---|---|---|
| 1 | Hero | Keep as-is. Sizing was already fixed 2026-07-27. |
| 2 | **Client feedback** | **Move up.** Rename the nav entry from "Proof" to something that says whose voice it is. |
| 3 | **How I got here** | Keep. Fold MHA + Lean Six Sigma into the chapter where they were earned, rather than listing them. |
| 4 | **Outside of work** | Give it `id="about-life"` and a chapter entry — or consciously drop it from the nav and say so. |
| 5 | Closing CTA | Keep. |

"My pattern" is **cut or reduced**. Two options:
- **Cut entirely** — MSK carries the method with evidence; About stops restating it.
- **Reduce to one distinctive line** — replace the four generic verbs with the single thing that is actually true only of Hillary. This needs a writing pass, not a layout pass.

## What this costs

- `pages/AboutMe.tsx` — section reorder, chapter-strip rewrite, one section cut or rewritten.
- `i18n/strings.ts` — About copy is currently inline ternaries in the component, **not** in the strings file. Any new copy needs its Spanish counterpart written inline the same way. A cut section removes both languages at once.
- `styles/portfolio-editorial.css` — `.about-pattern-card`, `.about-pattern-list` become dead if the section is cut; remove rather than orphan them (this session already showed how orphaned rules hide).
- Anchor contract — `#about-pattern` may be linked from elsewhere. **Must grep before removing**; the `/about?scrollTo=` and curated-page cross-links are the risk.
- Tests — `FlagshipCaseStudies.a11y.test.tsx` does not cover About. Heading order and anchor integrity would need a check added.

## Open questions for Hillary

1. **Cut "My pattern" or rewrite it?** Cutting is cleaner and removes the duplication with MSK. Rewriting keeps a "how I work" answer on the page, but only earns its place if the line is specific.
2. **Do the client quotes carry enough weight to open the page?** They are all Mobbin-sourced (`AboutMe.tsx:265-267` renders the Mobbin logo on each). One client's voice leading the page is strong but narrow — worth deciding whether that reads as focused or thin.
3. **Should "Outside of work" be in the nav at all?** Some portfolios deliberately keep the personal note as an unlisted coda. Either is defensible; being accidentally unlisted is not.
4. **Do credentials belong in the story chapters or as their own line?** Story is more earned; a line is more scannable.

## Verification if this proceeds

- Rendered check at 390, 900, 1440px, both themes.
- Heading order remains h1 → h2 → h3 with no skips.
- Every chapter-strip anchor resolves to a real section, and every real section is reachable.
- Spanish parity confirmed for any new or moved copy.
- Full test suite and production build green.
