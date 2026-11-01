# Case-study vet: "name the problem behind the lesson"

Date: 2026-11-01
Lens: Nick Marin's LinkedIn post and before/after graphic (screenshots IMG_8329, IMG_8328).
Two tests per claim:
1. Does the lesson name the problem it answers, or could it sit on any project?
2. Does the page say how you know (research, test, or a call made with what you knew then)?

## Scope and limits

Read: quoted strings of 50+ characters in FlagshipMSK, FlagshipLogistics, FlagshipMobbin, FlagshipKnowunity, FlagshipUxWoman, RisoGrove, RisoHome.
Not read: About page, JSX prose that is not a quoted string, Spanish copy, rendered pages. Drafts below are source-copy first drafts only. Nothing in `src/` was edited.
Drafts use only facts already on the page. `[confirm]` marks a fact I could not source. Run a content-writer voice pass and a Spanish sync before any of this ships.

## Scorecard

| Study | Verdict | Why |
| --- | --- | --- |
| UX Woman | Pass, model case | Each finding carries a confidence line ("Moderate that it matters in several workflows. Low that it is one shared failure."). This is the "how you know" test done best. |
| Grove | Pass, two checks | Care-logic row names the problem, the decision, and the reason, and admits the miss. Check the cited claims and the principle cards (items G1, G2). |
| Knowunity | Mostly pass, two fixes | Decisions carry mechanisms. Learning claim is stated as fact and the testing caveat sits only in the footer (K1, K2). |
| Logistics | Pass, one fix | Every figure is labeled owner-reported. "More efficiently" does not say what improved (L1). |
| MSK | Pass, one fix | Outcome tags say whose result it is. One literal lesson with no problem attached (M1). |
| Mobbin | Weakest | Four step notes read as general lessons; only one is backed by evidence (B1 to B4). |

## Fixes, with draft rewrites

### M1. MSK `FlagshipMSK.tsx:44` (and `data/mskCaseStudy.ts:414`)

Now: "No certificate for this one. Turning leadership decisions into clear briefs taught me to write for the person who has to act. The CPR rewrite and the EMR presentation both came from that practice."
Gap: names a lesson, not the problem. The CPR facts already exist at lines 105-106.

Draft:
> No certificate for this one. Clinicians couldn't finish CPR certification because the instructions read like legal text. I rewrote them as the steps a person has to take, and the whole department certified a month before the original deadline. [confirm: what the EMR presentation changed, or cut that sentence]

### B1. Mobbin step 01 `FlagshipMobbin.tsx:36`

Now: note "A flow, not a pile". Body: "Walk the app like a real person, including empty states, errors, and the screens that only make sense in sequence."
Gap: generic. Missing: what goes wrong when you capture screens one at a time.

Draft note: "Single screens hide the sequence." [confirm: what a one-screen capture failed to show in one of the three apps]

### B2. Mobbin step 02 `:37`

Now: note "Useful beats exhaustive".
Gap: body already says what was cut. The note restates a slogan.

Draft note: "Cut: marketing splashes. Kept: sign-up, payment, account, recovery." [confirm the Finance+ library's own criteria for what earns a slot]

### B3. Mobbin step 03 `:38`, the only one with evidence

Now: note "Search words are design".
Gap: the proof ("My first batch used my vocabulary. Revisions dropped once I learned Mobbin's.", line 120) sits in a different section.

Draft note: "My labels needed revisions. Mobbin's words didn't." Move the revision-drop line next to this step. [confirm: any count of revisions before and after]

### B4. Mobbin step 04 `:39`

Now: note "Context must travel".

Draft note: "Annotations had to work with the source app closed."

### B5. Mobbin line 129 "Preserve the useful state, sequence the task, name it for retrieval."

Rule-shaped. Keep only if the section it sits in shows each clause once. [confirm]

### K1. Knowunity `:97`

Now: "Seeing your own correct explanation is evidence you can retrieve it."
Gap: stated as learning-science fact, no source, and the study has no student testing.

Draft:
> My reasoning, not yet tested with students: seeing your own correct explanation is evidence you can retrieve it. Those are also the words you'll use in the exam.

### K2. Knowunity decision header `:206-207`

Now: title "The student does the proving, not Knowie." intro "Echo the words. Offer the misses. Ask for the mic when it's needed. Say where you are."
Gap: a rule and four imperatives. The testing caveat is only in the footer claimer.

Draft kicker: "Four decisions · design-sprint judgment calls, not test findings"
Draft intro: "Each one answers a break I saw in the beta, and none has been tried with students yet." [confirm each of the four breaks against the beta review]

### L1. Logistics `:57`

Now: "critical supplies reached the stations 15% more efficiently."
Gap: "efficiently" is undefined. Methods are honestly marked not preserved.

Draft: "the service record reports a 15% efficiency gain in getting critical supplies to the stations. It does not say how efficiency was measured." [confirm the record's wording]

### G1. Grove `RisoGrove.tsx:148`

"Care that feels like paperwork is the top reason people quit."
Gap: no source inline. The 37-person sample is confirmed (Hillary, 2026-11-01), so the denominator is settled. Add the survey figure next to this claim, from the current export.

### G2. Grove principle cards `:518-521`

Each card says "Principle · locked" plus a rule. Add the trace to a survey result or session finding on each, or relabel as "Decision." [confirm]

## Keep as is

- Home hero "I design workflows before screens." Keep the MSK proof directly under it.
- UX Woman confidence lines. Use them as the template for the others.
- MSK `:100` "I misjudged how small it would look to IT."
- Grove care-logic row and its stated cost to engagement.

---

# Second pass: About page, closing paragraphs, Grove cards, Spanish

Read in this pass: `AboutMe.tsx` (all copy), JSX prose in every case study, Grove principle cards, Spanish lines in `data/spanishCaseStudies.ts` for the strings flagged. Not read: rendered pages, the résumé PDF, Home hero JSX (only the About hero and the audit's quote of it).

## New findings, ranked

### A1. About callout: the same shape as the graphic's "before" card (`AboutMe.tsx:37`, ES `:78`)

Now: "Systems fail where a real person has to use them."
Gap: could sit on any project. The story paragraphs beside it do carry specifics (four departments, CPR, EMR, 20%).
Draft: "A filing task crossed four departments because nobody sat in all four seats. I had sat in three." (Source: MSK `:359`, "I had already sat in three of its seats." `[confirm]` "nobody sat in all four" before using it.)

### A2. About closer: "AI moves the work faster. The calls stay mine." (`:207`, ES `:207`)

Gap: a position with no example. Grove and Knowunity both disclose AI-assisted builds and name which calls were hers.
Draft: "AI moved the Grove and Knowunity builds faster. The care-logic fix and the mic-permission order were my calls." (Sources: Grove `:550`, Knowunity `:109`, `:245`.)

### A3. Mobbin closer (`FlagshipMobbin.tsx:192-193`, ES `spanishCaseStudies.ts:294-295`)

Now: "After 200 screens per app, I know a habit from a pattern. Some 'common patterns' are habits nobody questioned. I can tell you which."
Gap: the strongest claim on the page, with no example. "I can tell you which" invites the question and doesn't answer it.
Draft: "After 200 screens per app, I know a habit from a pattern. [one named habit, the app it appeared in, and what the better pattern did]." `[confirm]` Only Hillary can supply the example. If none holds up, cut to: "After 200 screens per app, I know which flows earn their length." (The Kikoff line, `:32`, supports that.)

### A4. Logistics closer (`FlagshipLogistics.tsx:226-227`)

Now: "Supply lines and clinic workflows break the same way. In both, I found the step that should not exist and changed the sequence."
Gap: the claim is general. Both halves have concrete steps on their own pages.
Draft: "A supply run began too far from the aid stations. A chart filing left the record for paper. In both I moved the step that did not belong." (Sources: Logistics `:50`, MSK `:98`, `:316`.)

### A5. Grove principle cards (`RisoGrove.tsx:520-522`), confirmed gap

All three read "Principle · locked" with a rule, and none says where it came from. They sit inside a collapsed `<details>`, so the risk is low, but they are the page's only unsourced rules.
Drafts (only facts already on the Grove page):
- One task a day: add "Five sessions showed people stalled when care led with a feed and a mission." (`:306`)
- Grouped by where they live: `[confirm]` source. I could not find the trace in the page copy. Check the survey export, or relabel as "Decision."
- Automated advice stays reviewable: add "Plant ID shows top guesses with confidence and sources, not one verdict." (`:123-125`)

## Checked and fine

- About "My pattern" list (`:172-200`): each claim has a proof link. "I check whether it survives without me" is backed by MSK sustainment.
- About 20% EMR figure: scoped to "one part of an organization-wide effort." Matches MSK `:446`.
- MSK `:411` "No one measured it that I know of": a model of honest evidence.
- Knowunity `:196`: the problem is stated plainly ("Nothing makes them say it."). K2 should link the four decisions back to that line.
- UX Woman `:255`, Knowunity `:305`: "shows how I work" closers, backed by the claimer lines above them.

## Spanish sync

Every flagged English line has a Spanish twin: MSK "taught me" (`:167`), Mobbin closer (`:294-295`), Logistics 15% (`:359`), Logistics protocol (`:333`). Each fix above must change the twin in the same commit.

## Update to K2

Replace the draft intro with a link to the stated problem:
> Four decisions, each answering one gap. Nothing makes a student say it, so each lets them prove it. Judgment calls, not test findings.
