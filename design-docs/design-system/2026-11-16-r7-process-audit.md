# R7 process audit: Knowunity, UX Woman, Logistics, Mobbin (2026-11-16)

Lex's note: "only show work-in-progress that supports the story." MSK and Grove are already folded and were not audited.

- **Who:** design-critic, read-only.
- **How:** headless Chromium at 1440×900 against the production build, measured with getBoundingClientRect.
- **Coverage:** English pages only, default motion preference.

Recommendation: **revise, small.** No new components.

## Summary

| Case study | Page px | Proposed | Saved | Change |
|---|---|---|---|---|
| Knowunity | 6,400 | 6,257 | 143 | Cut the duplicate "What I'd change" line (lines 283-285). Keep the decisions. |
| UX Woman | 6,041 | 5,121 | 920 | Fold the 13-minute midterm section into `rp-deepDive`. Hillary's call: she added it in 65c508c. |
| Logistics | 4,284 | 4,284 | 0 | Every visible block carries a beat. |
| Mobbin | 4,862 | 4,862 | 0 | Every visible block carries a beat. |

## Knowunity, `FlagshipKnowunity.tsx`

| # | Block | Lines | Height | Verdict |
|---|---|---|---|---|
| 1 | Hero phone capture | 176-186 | 563 | KEEP: the final screen, shown first |
| 2 | `fp-workSplit` | 205-208 | 170 | KEEP: ownership |
| 3 | `CaseStudyReel` (52 s) | 209 | 590 | KEEP: the product before the journey |
| 4 | `fp-knowunityMockNote` | 221 | 45 | KEEP |
| 5 | `rp-deepDive` "See how I built it" | 225-250 | 78 closed | KEEP folded |
| 6 | `DecisionStory`, four decisions | 252-282 | 2,089 (track 1,620 at 180vh, panel 1,004) | KEEP: the hero promises four decisions |
| 7 | `fp-knowunityChange` | 283-285 | 143 | CUT: repeats the outcomes intro (line 292) |
| 8 | `EvidenceField` | 288-300 | 901 | KEEP |

## UX Woman, `FlagshipUxWoman.tsx`

| # | Block | Lines | Height | Verdict |
|---|---|---|---|---|
| 1 | Hero guide screen and ledger | 136-149 | 373 + 255 | KEEP |
| 2 | Midterm presentation section | 153-158 | 998 | FOLD into `rp-deepDive`, "Watch my 13-minute midterm presentation" (78 closed) |
| 3 | `fp-letterStats` | 163-173 | 183 | KEEP: stakes |
| 4 | `fp-themes`, six cards | 183-191 | 287 | KEEP only with a linking line (Major 2) |
| 5 | `fp-hypotheses` | 202-213 | 145 | KEEP |
| 6 | `fp-readerNeeds` | 214-217 | 68 | KEEP: the Test 1 rubric |
| 7 | `fp-guideScreens` | 224-232 | 587 | KEEP: the final design |
| 8 | `CaseMore` wireframes | 233-240 | 44 closed | KEEP folded |
| 9 | `EvidenceField` | 244-255 | 666 | KEEP |

Why fold the midterm:
- It retells the whole page.
- Its poster slide repeats the hero h1.
- It pushes the problem statement down to 1,823px.

## Logistics and Mobbin

Nothing to fold. The deep dives are already closed. The `DecisionStory` on Mobbin is the work itself.

## Issues

**Major 1. The Knowunity decision panel overflows its pin.**
- The panel is 1,004px tall, but only about 825px is free at 900px tall.
- Decision 04 is clipped while pinned.
- Fix: trim each `STEPS` body (lines 94-119) to about two sentences, keeping the "untested with students" caveat in step 01. Target under about 760px; Mobbin's panel is 801px.
- Owner: content-writer, with Hillary's sign-off.

**Major 2. The UX Woman themes don't connect to the letter.**
- The six staff-work themes never say how they led to a patient letter.
- This needs one sentence from Hillary.
- If there is no such line, fold the grid into the `CaseMore` at line 192, which saves about 300px more.

**Minor**
- **Mobbin:** the panel is 801px against a 900px viewport. A shorter real browser window likely clips step 04.
- **Knowunity:** "recall is mocked" is repeated seven times (lines 71, 167, 221, 284, 291-293).
- **UX Woman:** the hero (line 132) lists artifacts that never appear on the page: affinity map, persona, user flows.
- **Mobbin:** the four steps are restated three times (lines 112, the steps, 178).

**Notes**
- The 180vh track is shared with MSK. Shortening it is a motion decision and was not counted.
- The Spanish data (`UXWOMAN_ES`, `KNOWUNITY_ES`) needs the same folds.
