# Show-Not-Tell Pass — Whole Site — 2026-07-29

Benchmarked against the standard already recorded in
`portfolio-overrides/case-study-show-guardrails.md`: **Carmen Elena's "Pilgrimz"
study is ~60% visual and pairs every decision with the pixels it produced.**

Everything below is measured from the rendered pages, not estimated. Visual share
is the union of vertical page bands occupied by a visual unit (image, canvas,
sized SVG, device/screen mock, chart, collage plate), divided by total page
height — overlapping and nested units counted once.

## The numbers

Counting anything a reader parses as a picture rather than prose — including
non-image specimens like the `decision-log.json` block (which carries
`role="img"`), the type-scale specimen, and the interactive token lab.

| Route | Visual share | vs. Pilgrimz 60% | Words | Visual units |
|---|---|---|---|---|
| `/about` | 41% | −19 | 593 | 5 |
| `/` | 38% | −22 | 373 | 6 |
| `/case-study/grove` | 36% | −24 | 1,664 | 14 |
| `/case-study/msk` | **26%** | −34 | 1,452 | 7 |
| `/case-study/mobbin` | **26%** | −34 | 678 | 8 |
| `/curated/meta-instagram-product-designer` | **20%** | −40 | 623 | 3 |

**No page reaches even 70% of the standard.** The three worst are the two case
studies with the least artwork and the flagship targeting page.

> **Method note.** A first pass of this audit scored these 2–4 points lower and
> called Grove's "The system underneath" the largest text-only block on the site.
> That was wrong: the section contains the token lab, the type specimen and the
> decision-log block, and the selector missed all three. Numbers above are the
> corrected run. Flagging it because the same error — counting only `<img>` as a
> visual — is what makes a design-system section look like a wall of text.

## The uncomfortable arithmetic

Cutting words alone cannot get there, and it is worth seeing why before any copy
is deleted.

With visual area held constant, reaching 60% requires text height to fall to
`0.667 × visual height`. On MSK that means removing **~79% of the text** —
1,452 words down to roughly 300. That is not an edit, that is deletion of the
case study.

**So the ratio is an argument for more visuals, not mainly for fewer words.**
Cutting is the smaller half of the job. The realistic split per case study is
roughly a 25–35% word reduction plus three to six new visual units.

This lands on the same blocker as the panel's #1 finding: the assets do not
exist yet. Which makes this pass and "ship four Grove screens" the same task,
not two.

## Where the words are telling instead of showing

Prose blocks that describe a decision, a state, or a before/after with **no
adjacent visual** — exactly what the guardrails forbid.

### `/case-study/msk` — worst offender

| Block | Words | Should be |
|---|---|---|
| "Not one system. Three." | 260 | 3 × `DecisionCard` — each already has finding / change / what-I-got-wrong written, and no pixel |
| "The digital workflow had become a paper ritual." | 100 | The collage plates behind it are decorative, not evidence |
| "Systems that survived leadership changes." | 88 | Outcome numbers exist; nothing shows the surviving system |
| "Designing a system people cannot afford to distrust" | 36 | Closing CTA — fine as prose |

MSK carries **one real artifact** (`MSKDashboardMockup`) for a 1,452-word page,
and at 484 words per visual it is the least-shown case study on the site.
"Four systems became two" (131w) does have a `fp-workflow` diagram — but it is
two prose `<ol>`s side by side, which is a list, not a before-and-after of
anything a reader can see.

### `/case-study/grove`

Grove is the healthiest study — 14 visual units, 36% visual — and its design-system
section is genuinely well-shown. Its prose-only blocks are the *narrative* ones:

| Block | Words | Should be |
|---|---|---|
| "Judgment, not just screens." | 166 | Outcomes stated in prose; nothing shows what changed |
| "Four decisions, from AI-built to trustworthy" | 160 | 4 × `DecisionCard` — this is the section the component was designed for |
| "The system has to survive a tap." | 88 | `StateMatrix` |
| "A palette with jobs." | 86 | The one place a swatch specimen is described rather than shown |

**The six-call override accordion is the clearest `DecisionCard` conversion on
the site**: every entry already has `ai` / `me` / `why` fields and is missing
only `screen`. The data shape and the component were built for each other and
never introduced.

### `/curated/meta-instagram-product-designer`

**623 words, 20% visual, and not one screen.** This is the page aimed at the
role Hillary most wants, and it is the least shown page on the site. The
recruiter's advice not to send the curated pages and this measurement are the
same finding from two directions.

## Read-time labels do not match the copy

At a standard 230 wpm:

| Study | States | Actually | Gap |
|---|---|---|---|
| MSK | 7 min | 6.3 min | close enough |
| Grove | 5 min | **7.2 min** | understates by ~2 min |
| Mobbin | 5 min | **2.9 min** | overstates by ~2 min |

On a site whose whole argument is that its numbers are checkable, two of three
read times are wrong — and Grove's understatement is the one that costs a
reader's trust when the scroll keeps going.

## What to cut where no visual is needed

These are reductions that lose no evidence, available today:

1. **Grove "The system underneath" (319w).** Principles restated from earlier
   sections. Target ~180w.
2. **Curated pages** — "Why I'm a fit" (83w), "Where the experience comes from"
   (79w), and "Consumer craft is mostly knowing what to leave out" (85w) all
   argue the same claim three times. Target one block, ~90w total.
3. **MSK "Not one system. Three." lede** and the per-card `finding` lines
   compress once the cards carry screens.
4. **About "I enter complex systems…" (118w, no visual).**

Rough total available without touching evidence: **350–450 words**, roughly a
15% site-wide reduction. Useful, but on its own it moves visual share by about
four points — which is the point of the arithmetic above.

## The four ways Pilgrimz shows, and where each belongs here

All four already exist in `ShowKit.tsx`, typed so a told-not-shown decision
cannot compile, and all four are currently imported by zero files.

| Primitive | What it does | First place to use it |
|---|---|---|
| `DecisionCard` | "AI said / I chose / why" beside the shipped screen | Grove's six overrides; MSK's three redesigns |
| `StateMatrix` | Every edge state with its screen; no state described-only | Grove's death state and no-data state (both undesigned) |
| `BeforeAfter` | Labelled real-vs-real toggle | MSK four-systems-became-two; Mobbin's messy-first-batch |
| `AnnotatedShot` | Hotspots over a screenshot, "why" on focus/hover | Grove plant-ID confidence; MSK dashboard permissions |

The guardrail that matters most, given this site's honesty discipline:
**`BeforeAfter` must never pair a real screen against a decorative CSS fake.**
The "before" has to be the actual prior artifact.

## Recommended order

1. **Grove's six overrides → `DecisionCard`.** Highest leverage: the data is
   already shaped for it, it wires in the mechanism that has been sitting unused,
   and it converts the page's most-quoted content from prose to evidence.
2. **MSK "Four systems became two" → `BeforeAfter`.** Two prose lists that are
   already a before and an after.
3. **MSK's three redesigns → `DecisionCard` ×3.**
4. **Fix the three read-time labels.** Minutes of work, and it is a numbers claim.
5. **Cut the 350–450 redundant words above.**
6. **Give the Meta curated page any visual at all.**

Items 1–3 and 6 need screens that do not exist yet. Items 4 and 5 do not, and
should not wait for them.
