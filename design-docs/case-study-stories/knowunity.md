# Knowunity — Say It Back (case-study interview master file)

Raw material, not finished copy. Interview started 2026-10-13 via the
case-study-interview skill. Sources alongside this file: the project repo at
`~/Desktop/Knowunity` (README, SPEC.md, docs/design-brief.md,
docs/sprint-context.md, 78 commits 2026-09-11 → 2026-10-13), the live
prototype https://knowunity-voice-recall.vercel.app/, and the Chromatic
Storybook linked from Home row 04.

## Q1: What was the problem, in the terms it was described at the time?

**Engagement (Hillary):** a design sprint run by **Yummy Labs** (a program),
using Knowunity's real brief. **Not a hiring sprint** — Hillary corrected her
first answer in Q5. Solo entry.

**Brief, as recorded in `docs/design-brief.md` / `sprint-context.md`** (reflected
back to Hillary for confirmation):
- 2.5-week sprint. Mobile iOS only, 390px, dark mode, recall mocked (no real
  speech-to-text or judging).
- The ask: an active-recall step driven by voice. After revising a section, a
  student explains the key ideas out loud in their own words; Knowie (the
  mascot) answers in text.
- User problem: after revising, a student has *seen* the material but hasn't
  proven they can *retrieve* it; existing steps test recognition or
  application. Students lack a felt signal of "I actually know this now" — it
  has to be earned, not asserted.
- Mid-sprint Knowunity shipped a light version to beta; the brief says treat it
  as one team's first pass and find where a stronger version is.
- Success targets: activation ≥25% of students who see it start it; completion
  ≥70% of starters finish.
- The brief cites Knowunity usage numbers (voice ~15.2% of AI Chat users,
  ~642,000; exam plan reach 16.6%; mock exam completion 57.2%). **TODO: confirm
  whether these can be published** — they are the company's internal data from
  a design-sprint program.

**Q1 confirmed by Hillary.** Publishing decision: **no Knowunity internal
numbers on the site** (no 642,000 / 15.2% / 16.6% / 57.2%, no 25%/70% targets
as figures). Describe the goals in words.

## Q2: What was your specific contribution?

**Hillary:** "Mine + their assets."
- **Knowunity supplied:** Knowie mascot art; the Greed font and brand; the
  Figma components / kit; access to the live app and the beta (captured as
  screenshots + a screen recording in `reference/`).
- **Hillary's:** the design work and the coded prototype + Storybook, built
  by her **with AI coding tools** (details in Q6).
- Solo — no other people named.

**Cowork note:** Hillary says all Knowunity info lives in her "Knowunity"
project in Claude Cowork (claude.ai). Not reachable from Claude Code; not on
disk. If exported into `~/Desktop/Knowunity/docs/`, re-read it against this file.

## Q3: A decision someone else might have made differently

**Hillary picked:** echoing the student's own words back on a clean pass,
instead of Knowie generating praise.
**Why (Hillary selected both, from offered options — no free-text wording yet):**
- Proof, not praise: seeing their own correct explanation is evidence they can
  retrieve it; "Great job!" from an AI asserts mastery, it doesn't prove it.
- Builds exam confidence: their own words are what they'll use in the exam, so
  it rehearses the real thing.
TODO: capture this in her own phrasing if she offers it later.

## Q4: What would you do differently?

**Hillary:** Test with real students — recall was mocked (no real
speech-to-text, no students); she'd get a real STT prototype in front of
students earlier. (Selected from offered options; no extra wording.)

## Q5: Observable result and honest status

**Hillary:** "it was a design sprint, not hiring sprint." Setup: Yummy Labs
program using Knowunity's brief, kickoff and assets; she worked **solo** ("we"
/ "our" meant the sprint's participants).
**Outcome:** "We got a Badge from Yummy Labs and Know Unity reviewed our work."
→ for the page: Yummy Labs awarded her a badge; Knowunity reviewed the work.
TODO: badge name, and whether Knowunity's review feedback can be quoted.
**Limitations to state plainly (Hillary chose):** recall is mocked (no real
speech recognition or judging); no student testing.
**Status (from the repo, `docs/current-state.md`, 2026-10-13):** working
Next.js prototype, 43 routes, 390px dark mode, Storybook catalog on
Knowunity's Figma kit; not a shipped Knowunity feature.

## Q6: AI in the workflow

**Hillary (selected):** "Built the code with me" — she designed and directed;
Claude Code wrote most of the Next.js and Storybook code from her specs and
Knowunity's Figma components.
Not selected: AI critique panels, AI as a thinking partner, where AI fell short.
TODO: whether AI measurably improved anything (the skill asks "did it actually
improve anything") — no answer captured; don't claim one.

---

# Draft brief (built only from the answers above — gaps flagged, not filled)

**One line:** In a 2.5-week Yummy Labs design sprint on Knowunity's real
brief, I designed a voice active-recall step — a student explains a term out
loud, Knowie replies in text — and built it as a working prototype on
Knowunity's own component kit.

**Problem (Q1):** After revising, students have seen the material but haven't
proven they can retrieve it, and they lack a felt "I actually know this now"
signal. Knowunity had shipped a light beta; the brief asked for a stronger
version, not a copy. Goals: more students starting the step, and more of them
finishing it (stated in words — no internal numbers, per Hillary).

**My part (Q2):** Solo. The flows, decisions, and the coded prototype +
Storybook are mine, built with Claude Code. Knowunity supplied Knowie, the
Greed font and brand, their Figma kit, and live-app + beta access.

**The decision (Q3):** On a clean answer, Knowie shows the student's own words
back instead of praising them. Proof, not praise: their own correct
explanation is evidence they can retrieve it, and it rehearses the words
they'll use in the exam. (TODO: her own phrasing.)

**What I'd change (Q4):** Put a real speech-to-text version in front of
students earlier; recall was mocked.

**Result + status (Q5):** Yummy Labs awarded a badge; Knowunity reviewed the
work. (TODO: badge name; whether review feedback can be quoted.) Working
prototype, 43 routes. Limits stated plainly: recall is mocked, no student
testing. Not a shipped Knowunity feature.

**AI (Q6):** I designed and directed; Claude Code wrote most of the code from
my specs and Knowunity's components.

## Validation (2026-10-13)

- Badge: **Design Sprint Badge** from Yummy Labs. Knowunity's review is not
  quoted.
- Paraphrase-back: when asked to confirm the cold paraphrase, Hillary pointed
  to `~/Desktop/Knowunity/docs/code-history.md` (2,040 lines, 144 dated
  entries; entries marked "designer" are her decisions, e.g. 2026-10-12 step
  meter, mic primer asked in context, "the colors feel off brand"). Treated as
  the authoritative source for specific decisions on the page: every mechanism
  on the case study must trace to an entry there or to this file. It does not
  contradict the paraphrase; the Pass snackbar reads "Said it back in your own
  words." (supports Q3).
