# Logistics — Case Study Interview

_Raw interview via `case-study-interview`, started 2026-08-29. Verbatim-first — draft copy comes later, gaps stay flagged rather than filled._

Scope confirmed: three connected chapters (same shape as the MSK case
study). Positioning context: Track A primary evidence per `positioning.md`
— arguably the single highest-stakes proof point for
operator-trust/regulated-systems positioning, given literal safety and
medical-cold-chain stakes.

## Q1: What was the problem, in the terms it was actually described to you at the time?

**Chapter 1 — The warehouse relocation.**
On arrival in-country, the existing logistics system took 1–2 months to
get resupply to sites. Presented a case to move the warehouse from one
country into another — moving it *into* a combat zone — to get the most
vulnerable, attack-prone locations resupplied within 1–2 weeks instead.
Moved in phases she tracked, most-essential to least-essential, splitting
personnel so all locations kept getting resupplied even while the move was
happening. Move completed a month ahead of schedule.

**Chapter 2 — The visibility system.**
After the move succeeded, sites gave feedback that they wanted to track
their own orders. Built an online (SharePoint) system making order status
visible to every site — what they'd ordered, what status it was at.
Created slideshow training materials explaining how to order and what each
status meant.

**Chapter 3 — Time-critical cold-chain coordination.**
Some required supplies (vaccines) had a hard 48-hour delivery window and
needed to be kept at a specific temperature. Tracked all missions,
submitted the critical paperwork required, and worked with her team to
ensure safety, since the delivery routes ran through dangerous areas.

## Scoping decision

Three chapters, same structure as MSK — confirmed after two rounds of
clarification (the vaccine/cold-chain thread was initially unclear whether
it was a detail inside Chapter 1 or its own chapter; confirmed as its own
chapter).

## Q2: What was your specific contribution, separate from the team?

**Chapter 1:** Built the case and the phase-by-phase tracking (data/
analytics behind "most-essential to least-essential" sequencing). Also did
physical labor during the move itself, alongside her team — not purely a
planning/data role.

**Chapter 2:** Personally built the databases and SharePoint components —
hands-on, not just directed.

**Chapter 3:** The paperwork/data person — tracked missions, submitted
critical paperwork, built the Excel/analytics. Also personally ran one
mission herself, specifically to relieve her team, who were burnt out from
back-to-back runs.

## Q3: Decision/trade-off made that someone else might have made differently

**Chapter 1:** Chose to move the warehouse *into* a combat zone — accepting
more risk to the location — to get the most vulnerable sites resupplied in
1–2 weeks instead of 1–2 months. The warehouse was sited next to her own
team specifically so they could oversee and own it directly, rather than
delegate oversight remotely.

**Chapter 2:** The prior default was long email chains with data buried in
lines of text. Chose a real-time online system everyone could access and
see status changes in, instead.

**Chapter 3:** Ran one mission herself instead of pushing an already
burnt-out team further.

## Q4: What would you do differently?

Nothing — no changes identified across any of the three chapters.

## Q5: Observable result + honest limitation/status

**Chapter 1:** 85% faster resupply — this figure belongs specifically to
the warehouse relocation, not the combined effort.

**Chapter 2:** 60% cost reduction — this figure belongs specifically to the
visibility system: real-time order status meant sites stopped
over-ordering or "going black" on supplies (running out), which is what
drove the cost reduction, not the relocation itself.

**Chapter 3:** No isolated percentage. The honest result: every deadline
was met, no one died, even under sporadic, last-minute cold-chain ordering
requirements — met by working proactively with local units to get what was
needed in time.

## Q6: AI disclosure

**Confirmed: no.** No AI involved at all — consistent with the MSK
timeframe; this predates AI tooling in her practice.

## Draft-readiness

All six questions answered across all three chapters. The 85%/60% figures
are now precisely attributed to specific chapters, not a combined,
ambiguous claim the way the resume bullet reads. Ready to draft.

## Draft brief

_Built only from the answers above. TODO marks anything still missing._

**Three connected chapters in Iraq, medical resupply for 5,000+ soldiers
across 7 aid stations in 3 countries:** diagnose the real constraint, make
a structural change, then keep adapting to what the mission actually
demanded next.

### Chapter 1 — Moving the warehouse into harm's way

**What:** Resupply took 1–2 months under the existing system — too slow
for the most vulnerable, attack-prone locations.

**Contribution:** Built the case for relocating the warehouse, planned and
tracked the move in phases (most-essential to least-essential), split
personnel so every location kept getting resupplied during the move
itself, and worked the physical labor of the move alongside her team.

**Decision:** Moved the warehouse into a combat zone — accepting more risk
to the location — and sited it next to her own team so they could oversee
and own it directly.

**Result:** 85% faster resupply. Move completed a month ahead of schedule.

### Chapter 2 — Making status visible

**What:** After the move, sites wanted to track their own orders. The
prior default was long email chains with data buried in lines of text.

**Contribution:** Personally built the databases and SharePoint components
making order status visible in real time, plus slideshow training
materials on how to order and what each status meant.

**Decision:** Real-time online visibility instead of email-chain reporting.

**Result:** 60% cost reduction — driven specifically by sites no longer
over-ordering or running out of supplies ("going black"), now that they
could see real status instead of guessing.

### Chapter 3 — Cold-chain under pressure

**What:** Some required supplies (vaccines) carried a hard 48-hour delivery
window and strict temperature requirements, with sporadic, last-minute
ordering.

**Contribution:** Tracked all missions, submitted the critical paperwork,
built the supporting Excel/analytics, and worked with her team on safety
for routes through dangerous areas. Personally ran one mission herself to
relieve a team that was burnt out from back-to-back runs.

**Decision:** Ran the mission herself rather than push an already
exhausted team further.

**Result:** Every deadline met. No one died. Met by working proactively
with local units, even under sporadic, last-minute requirements.

### Retrospective

Nothing she'd change.

### Open items before this counts as finished
- TODO: paraphrase-back check not yet run
- TODO: `anti-ai-audit` not yet run on this draft
- TODO: headline/positioning language for this case study not yet written
  against `positioning.md`

---

## Follow-up interview — 2026-09-27

Purpose: a scored critic panel found the live site crediting the 60% to a
mechanism this file does not describe. Raw answers below.

### F1: What earned the 60% — forecasting or order-status visibility?

**Asked because:** `FlagshipLogistics.tsx:54` said "Built weekly and
monthly forecasting; the service record reports 60% lower spending", and
Home said "AFTER · WEEKLY + MONTHLY DEMAND → 60% less spend". But Q5
Chapter 2 in this file is specific about the causal chain: "real-time order
status meant sites stopped over-ordering or going black on supplies, which
is what drove the cost reduction". "Forecasting" appeared nowhere in the
original interview, and entered the code in `a10ac50` (2026-08-22), a week
before an interview.

**Answer: order-status visibility earned the 60%** — matching this file.

**Amendment, volunteered immediately after:** "btw i also built
forecasting." So forecasting is real work, not an invention. The site's
error was welding the two into one sentence, which made forecasting appear
to earn the saving.

**Applied:** the 60% is credited to shared real-time order status. Both the
case-study line and the Home line change.

**Not captured:** what the forecasting actually was — its scope, who used
it, whether it shipped, and whether any result attaches to it.
**TODO: interview the forecasting work on its own.** Until then it stays
out of public copy rather than being described from inference. It is
recorded here so it is not lost, and so nobody later assumes its absence
from the site means it did not happen.

### F2: Pentagon reporting — Iraq or 2020 COVID?

**Asked because:** the résumé attaches Pentagon reporting to the Iraq
bullet (5,000+ soldiers, $2M — this case study); the About page attaches it
to New Jersey National Guard COVID-19 response in 2020.

**Answer: two separate deployments, both true.** Pentagon reporting
happened in both. Not a contradiction. Recorded so future audits stop
flagging it.
