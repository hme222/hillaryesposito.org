# Portfolio Evidence Media — Copy and Provenance

**Date:** 2026-07-29  
**Owner:** content-writer  
**Status:** Copy ready for production; source conflicts below must be repaired before integration  
**Reading level target:** Grade 6–8  
**Source status:** Portfolio source files are **Verified** for this copy review. The recruiter-audit interpretation and recommendations are **Practitioner synthesis**. Generated media is not evidence.

## Shared content rules

- Keep all essential meaning in visible text. The Grove film is silent by default and does not need audio to make sense.
- Use the same words in the film, captions, poster, and accessible description: `AI-built prototype`, `survey`, `human override`, `recreated`, `anonymized`, and `documentation`.
- Never call an AI-assisted composite a shipped screen, a research artifact, or an outcome.
- Keep status and ownership labels visible at rest. Do not hide them in a tooltip, credits frame, or alt text.
- Link text must name the destination. Do not use `Watch`, `Learn more`, or `View project` without the project name.
- If a poster repeats all nearby text, use `alt=""`. If the poster is the only place that carries the evidence, use the supplied accessible description.

## 1. Grove decision-trace film

### On-frame copy

| Time | Exact copy | Content job |
|---|---|---|
| 0.0–1.4 s | `GROVE · AI-BUILT PROTOTYPE` | Sets the source and avoids implying a shipped product. |
| 1.4–3.2 s | `34 owners narrowed 11 ideas to 3.` | Shows the research decision in one sentence. |
| 3.2–5.2 s | `AI default: urgency + guilt` | Names the risky default without making AI the protagonist. |
| 5.2–7.2 s | `Human override: one calm morning summary` | Shows Hillary’s product judgment. |
| 7.2–8.0 s | `REDESIGN IN PROGRESS · PHASE 2 OF 3` | Preserves the current product stage. |

Do not add a second metric or another override. The film has one job: AI built wide, research narrowed the scope, and Hillary overruled a trust-breaking default.

### Captions and transcript

The film has no spoken audio. Use the on-frame copy as open captions in this order:

> Grove. AI-built prototype.  
> 34 owners narrowed 11 ideas to 3.  
> AI default: urgency and guilt.  
> Human override: one calm morning summary.  
> Redesign in progress. Phase 2 of 3.

If the player exposes a transcript, use the same text. Do not write a longer transcript that introduces claims the film does not show.

### Accessible description

> An eight-second decision trace for Grove. An AI tool produced the first feature-heavy prototype. A survey of 34 plant owners narrowed 11 tested ideas to three core features. Hillary rejected guilt-based reminder language and chose one calm morning summary. Grove is a functional prototype in Phase 2 of 3; the finished redesign is not shown.

### Static poster copy

**Eyebrow:** `GROVE · AI JUDGMENT`  
**Headline:** `34 owners narrowed 11 ideas to 3.`  
**Decision line:** `Human override: reminders that help, never guilt.`  
**Status:** `Functional prototype · Redesign in progress · Phase 2 of 3`  
**Provenance:** `AI-assisted composite using real Grove prototype screens and survey findings. No finished redesign screen is shown.`

### CTA

- Primary: `Read the Grove decision log`
- Player control: `Play Grove decision trace`
- Replay control: `Replay Grove decision trace`
- Pause control: `Pause Grove decision trace`

### Source trace

- `34` survey responses: `RisoGrove.tsx` lines 33, 61, 79–86, 105, 329, 370, and 385; `spanishCaseStudies.ts` lines 7–27.
- `11` ideas tested and `3` kept: `RisoGrove.tsx` lines 85–107 and 385–388.
- Urgency/guilt versus one calm summary: `RisoGrove.tsx` lines 148–153 and 494–512.
- Product stage: `RisoGrove.tsx` lines 445, 468–470, 589, and 610–612; `RecruiterPill.tsx` lines 111–112.
- AI-built first version: `RisoGrove.tsx` lines 47–50 and 433–436.

## 2. MSK evidence poster

### On-frame copy

**Eyebrow:** `MEMORIAL SLOAN KETTERING · CLINICAL SYSTEMS`  
**Headline:** `Four systems became two.`  
**Mechanism:** `One dashboard action connected the queue to the online chart.`  
**Scale:** `Workflows touching 21,000+ clinicians and staff`  
**Provenance:** `Recreated and anonymized workflow · No patient data`  
**Attribution:** `Hillary led this workflow redesign inside a larger organization-wide initiative.`

Keep `systems` in the headline. The source shows six steps before and five after; `Four steps became two` would be false.

### Caption

> Hillary mapped a filing process that moved a digital record through a dashboard, paper, imaging, and the online chart. The redesign connected the dashboard queue directly to the online chart. This reduced four systems to two. The workflow artifact is recreated and anonymized, and it contains no patient data.

### Accessible description

> A recreated before-and-after workflow from Hillary’s work at Memorial Sloan Kettering. Before the redesign, staff opened a dashboard, printed a digital record, routed the paper to imaging, waited for scanning, and returned later to confirm filing. After the redesign, one dashboard action connected the queue to the online chart and returned staff with the status updated. The case study describes this as four systems becoming two. No patient data appears.

### CTA

- Primary: `Read the MSK workflow case study`
- Optional proof link: `Read Hillary’s MSK News profile`

### Source trace

- Four systems to two and the direct connection: `FlagshipMSK.tsx` lines 26, 127–169, and 205.
- Six steps before and five after: `FlagshipMSK.tsx` lines 71–87 and 158–169.
- `21,000+` scope: `FlagshipMSK.tsx` lines 112–117 and 287.
- Artifact and privacy qualifiers: `FlagshipMSK.tsx` lines 123–126 and 152–157.
- Larger-initiative attribution: `FlagshipMSK.tsx` lines 283–290.

Do not place `20%` on this poster. If it is used elsewhere, the complete line must be:

> `20% organization-wide EMR cost reduction; Hillary’s workflow redesign contributed to the larger initiative.`

## 3. Mobbin capture-desk poster

### On-frame copy

**Eyebrow:** `MOBBIN · UX FLOW DOCUMENTATION`  
**Headline:** `Capture → Map → Name → Verify`  
**Evidence:** `3 live finance apps · 200+ screens · 4 months`  
**Contribution:** `Captured, sequenced, annotated, and labeled for Mobbin Finance+`  
**Ownership:** `Source products by Kikoff, Polymarket, and Discover. Hillary documented the flows; she did not design the apps or Mobbin.`

### Caption

> Over four months, Hillary captured, sequenced, annotated, and labeled more than 200 screens from three live finance apps for Mobbin’s Finance+ reference library. The source products are Kikoff, Polymarket, and Discover. Hillary documented their flows; she did not design those products or Mobbin.

### Accessible description

> A four-step documentation method shown with real source-app captures: capture the task, map the sequence, name the pattern in Mobbin’s vocabulary, and verify the reference. Hillary documented more than 200 screens from Kikoff, Polymarket, and Discover over four months for Mobbin Finance+. The interfaces belong to their source companies; Hillary’s contribution was flow documentation and pattern curation.

### CTA

- Primary: `Read the Mobbin documentation case study`
- Optional proof link: `View the Mobbin Finance+ library`

### Source trace

- Method: `FlagshipMobbin.tsx` lines 32–37, 81–86, and 174.
- `3` apps, `200+` screens, and `4` months: `FlagshipMobbin.tsx` lines 21–25, 62–67, 89, and 164–175.
- Source-company names: `FlagshipMobbin.tsx` lines 21–25 and 150–165.
- Contribution and ownership boundary: `FlagshipMobbin.tsx` lines 162–175.

## Blocked phrases and contradictions

| Phrase or claim | Status | Why | Safe replacement |
|---|---|---|---|
| `32-person survey` | **Do not ship** | The active Grove case study says `34` throughout and states the survey export was recomputed at `n=34`. One closing paragraph still says `32`. | `34-person survey` or `survey of 34 plant owners` |
| `Research journal · 17/32` | **Do not ship** | Conflicts with the supported `n=34`; it also makes an unclear participant-level claim. | `Research journal · n=34` or remove the fraction |
| `32 participants` in the 2026-07-27 recruiter audit | **Do not reuse** | Stale audit evidence; conflicts with the active case study and survey export note. | `34 survey responses` |
| `Grove is in beta` | **Do not ship until reconciled** | The portfolio describes a functional prototype in Phase 2 of 3 and says high-fidelity redesign screens are still being built. | `Functional prototype · Phase 2 of 3` |
| `Grove is live` without a qualifier | **Do not ship** | `Live prototype` can be read as a released product. | `Functional prototype` or `interactive prototype` |
| `The AI built the redesign` | **Do not ship** | Emergent built the first version. Hillary is redesigning from it. | `An AI tool built the first prototype; Hillary is redesigning it from research.` |
| `34 users validated Grove` | **Do not ship** | The 34-person survey prioritized features; it was not validation of a finished product. | `34 owners helped prioritize 11 ideas; three became core.` |
| `Six AI calls overruled` | **Do not ship as completed work** | Five overrides are described as completed; the sixth watering-schedule call is marked `designing now`. | `Five AI defaults overruled · one more decision in progress` |
| `Four steps became two` | **Do not ship** | MSK shows six steps before and five after. Four-to-two refers to systems. | `Four systems became two.` |
| `I reduced EMR costs by 20%` | **Do not ship** | The 20% result is organization-wide and attributed to a larger initiative. | `My workflow redesign contributed to a larger initiative that reduced organization-wide EMR costs by 20%.` |
| `21,000 users` | **Avoid** | The source names clinicians and administrative staff across affected workflows, not a measured active-user count. | `Workflows touching 21,000+ clinicians and staff` |
| `Real MSK dashboard` or `real patient workflow screenshot` | **Do not ship** | The public artifacts are recreated and anonymized. | `Recreated workflow artifact · no patient data` |
| `I designed Kikoff, Polymarket, Discover, or Mobbin` | **Do not ship** | Hillary’s role was freelance app-capture, flow documentation, and pattern curation. | `I documented source-app flows for Mobbin Finance+.` |
| `I built Mobbin’s searchable library` | **Avoid** | The source supports contributing reusable references to the library, not ownership of the Mobbin product or full library. | `I built reusable references for Mobbin’s Finance+ library.` |
| `Revisions dropped by half` on the poster | **Hold pending provenance** | The case study states this result, but the reviewed source packet does not show its measurement record. It is not needed for the poster’s core claim. | Omit from evidence media. |

## Screen-reader and implementation notes

1. Place the project heading before the media.
2. Place the status/provenance text immediately after the heading and before the Play control.
3. The Play control must announce `Play Grove decision trace, 8 seconds`.
4. When playback starts, announce `Grove decision trace playing` in a polite live region. Do not announce every visual transition.
5. Keep the open-caption text visible during playback. Do not rely on an auto-scrolling transcript.
6. Put the full accessible description after the media or inside a native `<details>` labeled `Read the Grove decision trace`.
7. For reduced motion, load the poster and the same accessible description. Do not autoplay a crossfade-only substitute.
8. If real app screenshots contain small text, do not use that text as the only carrier of meaning. The poster headline and caption carry the evidence.
9. When a visible ownership or status label already gives the necessary information, do not repeat it word-for-word in image alt text.

## Vocabulary

| Use | Avoid |
|---|---|
| AI-built prototype | AI-made product |
| Human override | Human in the loop |
| Survey of 34 plant owners | 34 users validated it |
| Functional prototype · Phase 2 of 3 | Live app / beta |
| Recreated and anonymized | Real dashboard |
| Workflow redesign contributed to the initiative | I delivered the 20% reduction |
| Flow documentation and pattern curation | Product design for Kikoff, Polymarket, Discover, or Mobbin |
| Source products | My app screens |

## Matrix check

- **Agentic UX / Trust:** visible AI-assistance disclosure, user-initiated playback, named controls, static recovery, and ownership/status labels are specified.
- **Enterprise Design Systems / Prototyping:** copy uses the existing case-study vocabulary and does not create a second truth model.
- **UX Research / Strategy:** Grove’s survey is described as feature prioritization, not product validation; MSK research scope is not inflated; Mobbin is not framed as user research.
- **Prompting / Evals:** any generated output remains illustrative and must be judged against this frozen copy. Fabricated evidence or a missing provenance label is a critical failure.
- **Unresolved hard gates:** repair the Grove `32/34` conflict, reconcile any résumé `beta` wording, inspect the final crops, and run recruiter comprehension plus screen-reader/reduced-motion checks before integration.

## Handoff

**content-writer → producer:** The exact strings are ready. Keep Grove to one concrete override and use the visible provenance line even if the generated treatment looks fully plausible; plausibility is exactly why the label matters. Do not generate around the `32` references—the supported source count is 34, and the stale phrases need repair before integration.

**content-writer → independent judge:** Treat any missing status or ownership label as a truth failure, not a polish note. Check that a recruiter can say `AI-built prototype → 34-person prioritization → human override`, `four systems → two`, and `documentation contribution, not app ownership` from the static posters alone.
