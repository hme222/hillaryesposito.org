# Grove — Case Study Interview

_Raw interview via `case-study-interview`, started 2026-08-29. Verbatim-first — draft copy comes later, gaps stay flagged rather than filled._

Scope confirmed: **one continuous throughline, not chapters** — unlike MSK
and Logistics. The work isn't finished (redesign + retest still ahead), so
it reads as an in-progress arc, not a set of completed episodes.
Positioning context: Track B evidence (range, solo founder/shipping
judgment) per `positioning.md` — not competing with MSK/Logistics on
regulated-systems stakes, doesn't need to.

## Q1: What was the problem, in the terms it was actually described to you at the time?

Grove started to see what features were resonating, via exploratory
usability testing on a prototype built through AI vibe-coding (Emergent).
Once built, realized there were real information-architecture issues and
too wide a range of features — unfocused. Ran a 37-person survey to find
out what actually resonated with target users, combining attitudinal and
behavioral signals. Currently redesigning around the features that
mattered; usability testing on the redesign is still ahead.

## Scoping decision

One throughline, not chapters — confirmed explicitly: "because it's not
finished."

## Q2: Judgment/decisions vs. what the AI tooling did (adapted — solo project, no team to separate from)

The AI tooling (Emergent), in adding features, didn't plan the information
architecture well — that's the origin of the sprawl/unfocused-feature
problem, not her own early scope decision. She designed the 37-person
survey and interpreted the results herself; no AI involved in that part.

**Disclosure framing (confirmed, keep as-is):** not "AI made this easy" —
AI's output revealed exactly where it falls short (IA planning), and her
actual contribution was catching that and running real research to fix it.

## Q3: Decision/trade-off

Recognized her own bias as an enthusiast ("huge plant lady") might not
match what a new user actually needs first. Chose to validate against real
user data (the survey) rather than build from her own instinct about which
features mattered most. Getting the MVP right for new users took priority
over her personal enthusiasm for the fuller feature set.

## Q4: What would you do differently?

Would start much smaller with AI — scoped to a single specific UI pathway
rather than a sprawling full-feature build. Notably, this isn't just
hindsight: it's the actual approach being used in the current redesign.

## Q5: Honest current status

Confirmed accurate: 37-person survey complete (attitudinal + behavioral),
twelve proposed features narrowed to three, redesign in progress and
scoped to one UI pathway at a time, usability retest not yet run.

## Q6: AI disclosure

Already answered via Q2 — see disclosure framing above. Not a separate
gap.

## Draft-readiness

All questions answered, adapted appropriately for a solo/AI-collaboration
project rather than a team-based one. Ready to draft — as an in-progress
arc, not a completed result.

## Draft brief

_Built only from the answers above. TODO marks anything still missing.
Functional prototype in progress — not a beta, not shipped. State that
plainly, not implied._

**A solo project, and an honest AI-collaboration story:** what AI got
wrong turned out to be the most useful signal in the project.

**What:** Grove started to see which features actually resonated, tested
against a prototype built through AI vibe-coding (Emergent). Once built,
it was clear the AI-generated feature set had real information-architecture
problems — too broad, unfocused.

**AI disclosure:** the AI tooling added features without planning the IA
well; that's the direct origin of the sprawl. The catch and the fix were
hers — not "AI made this easy," but AI's output showing exactly where it
falls short, and her diagnosing it.

**Research:** designed and ran a 37-person survey herself (no AI involved),
combining attitudinal and behavioral signals, specifically to check her
own bias as an enthusiast ("huge plant lady") against what a new user
actually needs first. Twelve proposed features narrowed to three.

**Decision:** prioritized a validated MVP for new users over her own
instinct about which features mattered most.

**Retrospective, already applied:** would start much smaller with AI next
time — scoped to one specific UI pathway rather than a full sprawling
build. That's the actual approach being used in the redesign happening
right now, not a hindsight-only lesson.

**Current status (state this plainly, not implied):** survey complete,
redesign in progress and scoped to one UI pathway at a time, usability
retest not yet run.

### Open items before this counts as finished
- TODO: paraphrase-back check not yet run
- TODO: `anti-ai-audit` not yet run on this draft
- TODO: headline/positioning language not yet written against
  `positioning.md` — Track B/range framing, not competing with MSK/Logistics
  on stakes it doesn't have

## Claim audit — 2026-10-13 (answers from Hillary)

- **"First build" notifications** ("Why did you forget me?", "counting on
  you", "your plant misses you"): illustrative, not Emergent copy (no trace in
  any Grove commit). Relabeled "The tone, illustrated"; the table row keeps
  "Guilt and urgency." without the quote.
- **"Nudge whenever engagement dips":** row removed. Five product calls now.
- **Usability test:** March–May 2026, 5 users — confirmed; Spanish now matches.
- **"Corrected its tone five times":** confirmed.
- **Recomputed from the raw export:** light confidence new owners n=12 mean
  2.42, experienced n=14 mean 3.43; pet safety was a checkbox — 4 of 12 new
  owners picked it as among the most stressful parts of care (not unprompted);
  "exactly where to place a plant" was picked by 2 people, neither new.

## Recompute — 2026-10-16 (35 responses)

Source: the Grove repo's `docs/research/findings/2026-grove-concept-survey.md`
and `docs/research/scripts/survey_stats.py` (anonymized CSV, 35 responses,
May 22–Sept 24, 2026: 29 plant owners, 3 florists, 3 bouquet buyers). The late
response moved reminders to 26 of 35 and gave the florist QR care pages its
first vote, so the trade-off now lists twelve features ("Twelve features became
three"). Launch picks: reminders 74%, camera ID 54%, AI diagnosis 49%, journal
23%, light map 23%, Greenhouse 20%, forums 17%, bulk logging 14%, bouquet
scanner 11%, swapping 9%, wishlist 3%, QR pages 3%. Notifications as delete
trigger 11 of 35. AI trust: no AI feature 5 of 35; explain-why 20, verified 17,
confidence 15, photos 13, sources 12; AI-written frustration 7 of 35. Pet
safety 4 of 11 new owners who answered. Light confidence unchanged (2.4, 12
people vs 3.4, 14 people; groups from the "relationship with plants"
question).

## Recompute — 2026-10-19 (37 responses)

Source: same Grove repo files, now with R36 and R37 (both Oct 16, both the
new-plant-owner perspective). 37 responses, May 22–Oct 16, 2026: 31 plant
owners and caretakers (R37 waters a parent's plants and owns none; counted as a
caretaker), 3 florists, 3 bouquet buyers. Top three keep their order: reminders
28 of 37 (76%), camera ID 20 (54%), AI diagnosis 18 (49%). The Greenhouse rose
to 22% and ties the journal and light map; forums 19%, bulk logging 14%,
bouquet scanner 11%, swapping 8%, wishlist 3%, QR pages 3%. Notifications as
delete trigger 12 of 37. AI trust: no AI feature 5 of 37; explain-why 22,
verified 19, confidence 17, sources 14, photos 13; AI-written frustration 8 of
37. Pet safety 4 of 12 new owners who answered. Light confidence 2.4 (13
people) vs 3.4 (14 people). Delete-trigger coding for R36/R37 is a judgment
call (ads, notification volume, hard-to-read text); see `DELETE_CODES`.

---

## Storytelling interview — 2026-11-10 (Better Stories fixes 2 and 4: being redirected)

Raw answers, verbatim first. Nothing below is site copy; it needs her approval.

**Q (a real moment she was redirected, by a manager, team, user or the data, and what
she did next):**

**A (verbatim):** "In grove, i used the user data to guide my information archiecture
and ui change"

**Captured:** on Grove, user data guided her information-architecture and UI changes.
- Consistent with the earlier draft brief above: the 37-person survey she ran herself
  was meant to check her own enthusiast bias ("huge plant lady") against what a new
  user needs first; twelve proposed features became three.
- This answers "who redirected her": the data did, against her own instinct. It is not
  yet a specific moment.
- TODO: no answer captured for what she was sure of before the data, which result
  changed her mind, and what she changed because of it.

**Q (what she was sure of before the data; what changed her mind; what she changed):**

**A (verbatim):** "As someone advanced with plants, i initally thought having a
breadth of features would be best for users. I realized after the testing, I wanted
to be more intentional in how it was built and who it was for"

**Captured:**
- Before: as someone advanced with plants, she thought a breadth of features would be
  best for users.
- After "the testing": she wanted to be more intentional about how it was built and
  who it was for.
- TODO: what "the testing" refers to. Earlier notes say a 37-person survey she ran;
  the Grove page says a usability retest has not been run and that self-report does
  not prove behavior. Confirm it was the survey before any copy says "testing", and do
  not imply usability testing.
- TODO: no specific result or specific cut named; the 12-to-3 narrowing is already in
  the file.

### Material so far for the Grove human line (not copy)
As someone advanced with plants she first thought a breadth of features would serve
users best; after the research she wanted the build to be more intentional about how
it was made and who it was for. (Matches the existing arc: twelve features became
three.)

**Follow-up (what "the testing" was):**

**A (verbatim):** "for grove, the first user testing i conducted befroe the redesign"

**Captured (resolves the earlier TODO):** "the testing" was the first user testing she
conducted before the redesign.
- This matches what the file and the live page already state: usability test, March to
  May 2026, 5 users (confirmed), on the first build made in Emergent; then a 37-person
  self-report survey used to cut twelve features to three; high-fidelity redesign, edge
  states and the retest are still ahead (Phase 2 of 3).
- So the human line can say the first user testing changed her mind. It must not imply
  the redesign has been tested.
- TODO: which finding from those five sessions most changed her thinking is not captured.
