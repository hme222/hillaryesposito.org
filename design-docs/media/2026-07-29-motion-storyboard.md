# Grove Decision Trace — Motion Storyboard

**Date:** 2026-07-29  
**Owner:** motion-designer  
**Status:** Landscape candidate is live; corrected 4:5 candidate is locally verified; representative recruiter recall and real assistive-technology review remain open
**Duration:** 7.792 seconds at 24 fps
**Delivery:** Silent, user-initiated film plus an equivalent static evidence poster  

## Purpose

Compress the Grove case study into one truthful causal sentence:

> AI built wide → research narrowed the launch → human judgment overruled risky defaults.

The film is not a product demo and must never imply that the direction cards are finished Grove screens. Its job is to make one decision trace legible enough that a recruiter can repeat the problem, intervention, and current status after one viewing.

## Source lock

Use only the sources below. Do not ask a generative model to redraw, interpolate, relight, or invent product UI.

| Source | Use | Required provenance label |
|---|---|---|
| `my-app/public/assets/grove/grove-live-collection.jpg` | AI-built breadth/contact sheet | `Emergent build · real prototype` |
| `my-app/public/assets/grove/grove-live-add.jpg` | AI-built breadth; plant-ID decision evidence | `Emergent build · real prototype` |
| `my-app/public/assets/grove/grove-live-care.jpg` | AI-built breadth; reminder decision evidence | `Emergent build · real prototype` |
| `my-app/public/assets/grove/grove-live-journal.jpg` | AI-built breadth/contact sheet | `Emergent build · real prototype` |
| `my-app/public/assets/grove/grove-live-personality.jpg` | AI-built breadth; gamification decision evidence | `Emergent build · real prototype` |
| `my-app/public/assets/grove/grove-live-greenhouse.jpg` | AI-built breadth/contact sheet | `Emergent build · real prototype` |
| `SURVEY_FINDINGS` and `MVP_FEATURES` in `my-app/src/pages/case-studies/RisoGrove.tsx` | 34-person sample and the top three reported launch needs: 74% reminders, 56% plant ID, 50% photo diagnosis | `Survey · n=34 · 22 May–8 July 2026` |
| Reminder direction in `OVERRIDES` in `my-app/src/pages/case-studies/RisoGrove.tsx` | Show one completed override only: guilt/urgency → one calm morning summary | `Decision direction · not finished screen` |
| Current page tokens in `my-app/src/styles/riso-page.css` | Warm paper, ink, pine, coral, Archivo, Space Mono | No new brand system |

The case study documents five completed overrides, but this film deliberately proves only the reminder-tone decision. Do not introduce gamification, plant-ID confidence, pet safety, notification frequency, or the future watering-schedule row into this short asset.

### Candidate production record · 3 August 2026

Hillary explicitly approved continuing the Higgsfield candidate before the representative recall study, and the landscape candidate subsequently went live. That approval did not waive the remaining validation. The candidate was assembled in Higgsfield's cloud sandbox with Pillow and ffmpeg from the locked source screens and survey copy; no image-to-video or generative UI model was used, and no generation credits were spent.

The first landscape export was rejected because four sampled timestamps decoded to the same static frame. The corrected landscape export has four distinct decoded frame hashes at 1.2, 3.3, 5.8, and 7.5 seconds and returns to the complete poster. Two portrait poster attempts were then rejected for clipped and crowded copy; the accepted 720×900 version reflows the evidence into three stacked panels with a larger problem statement. The delivery is explicit-play, silent, non-looping, captioned, and paired with the complete static summary. Full provenance is recorded in `design-docs/media/2026-08-03-grove-higgsfield-candidate.md`.

### Pre-production truth lock

The content owner confirmed `34` as the canonical survey count on 29 July 2026, and the stale public `32` references were reconciled. The film remains locked to `Survey · n=34 · 22 May–8 July 2026`.

## Visual frame

- **Master composition:** 16:9, 1280 × 720; derive a separately laid-out 4:5 version at 720 × 900. Do not center-crop the landscape master.
- **Safe area:** 6% on every edge; keep persistent labels and narrative copy inside the inner 88%.
- **Background:** `--paper` `#e8ece3`; primary type `--ink` `#20241c`; secondary type `--ink-2` `#45503f`; evidence `--green` `#3d6b3f`; one signal color `--coral` `#bd3828`.
- **Typography:** Archivo for statements; Space Mono for provenance, counts, and status.
- **Material:** sharp paper plates, thin ink rules, faint static paper grain. Any Higgsfield-generated pigment or print texture may sit behind the evidence only after truth review; it must remain abstract, still, and non-semantic. Never route screenshots through a video-generation or image-to-video model.
- **Persistent folio:** upper left `GROVE · DECISION TRACE`; upper right `PHASE 2 OF 3`.
- **Camera:** locked orthographic view. No pan, parallax, dolly, rotation, depth-of-field shift, or simulated handheld movement.

## Timeline and shot plan

The film opens and closes on the same evidence poster. A reader who never presses play receives the complete claim; motion only explains the relationship between its three columns.

| Time | Frame and action | Source assets | What changed? | Where to look next? | Relationship communicated | Timing and easing |
|---|---|---|---|---|---|---|
| `0.00–0.35` | Hold the full three-column poster: **AI built wide** / **Research narrowed it** / **Human overruled risk**. The play state has already disappeared; no decorative entrance. | Poster described below | Playback state began, not the evidence itself | Left column | All three stages belong to one causal trace | Static hold |
| `0.35–2.25` | Other poster columns dim to 16% opacity while the left column resolves into a 2 × 3 contact sheet of the six real Emergent screens. One shared label reads `EMERGENT BUILD · REAL PROTOTYPE`. No screen arrives separately. Narrative line: **“AI built wide in one pass.”** | Six `grove-live-*.jpg` assets listed above | A single AI pass produced breadth without a trustworthy priority model | The whole contact sheet, then the coral rule at its right edge | Breadth is the starting condition, not the outcome | Column dim: 240 ms ease-in-out. Contact sheet: 240 ms opacity ease-out plus `scale(0.985 → 1)`. Hold at least 1.35 s |
| `2.25–4.60` | Contact sheet recedes to 12% opacity without moving off-canvas. Three evidence plates replace it: **74% reminders**, **56% plant ID**, **50% photo diagnosis**. A large `34` and the provenance line remain visible. Narrative line: **“34 owners narrowed launch to 3 needs.”** | Survey data rendered as live/vector type; no generated chart image | Unranked feature breadth became three research-backed launch priorities | `34`, then the three percentages in reading order | Research is the narrowing mechanism; the numbers explain why most AI-built features wait | Crossfade: 260 ms ease-in-out. Evidence plates appear simultaneously, not staggered. Coral selection rule reveals by matte over 240 ms ease-out |
| `4.60–7.05` | Survey plates dim to 16%. The real care-screen crop remains on the left. One direction card crossfades in: `AI default · guilt + urgency → Hillary chose · one calm morning summary`. A fixed label reads `REMINDER DIRECTION · NOT A FINISHED SCREEN`. Narrative line: **“I rejected guilt-based reminders for one calm morning summary.”** | `grove-live-care.jpg`; exact reminder decision from `OVERRIDES` | An AI default became one documented human policy decision; no finished redesign is shown | The ownership phrase `Hillary chose`, then the calm-summary direction | Human judgment changes product policy, not merely visual styling | Pair field: 260 ms opacity ease-out. The one direction card settles with `translateX(8px → 0)` over 280 ms ease-out. No strike-through animation |
| `7.05–7.80` | Crossfade back to the full evidence poster. The status line remains: `Rebuilding around trust · Phase 2 of 3`. Hold on the poster after playback ends; never loop. | Static poster | The detailed trace returns to its recruiter-scan summary | Three column headings and status line | The end state is a truthful work-in-progress with a documented decision model | Crossfade: 300 ms ease-in-out; final hold: 450 ms, then indefinite poster |

### Sequence diagram

```text
FULL POSTER
    ↓ user presses Play
AI-BUILT CONTACT SHEET
    ↓ research evidence replaces breadth
34 OWNERS → 3 LAUNCH NEEDS
    ↓ human judgment pairs source with direction
ONE REMINDER OVERRIDE → CALM
    ↓
FULL POSTER · PHASE 2 OF 3
```

## Motion rationale

1. **What changed?** Breadth becomes priority, then priority becomes policy.
2. **What should I look at next?** The coral rule advances once from source evidence to research evidence to human decision.
3. **How are these related?** The same locked frame holds all stages, so no stage reads as a separate project or a fabricated before/after.

The only expressive beat is the contact sheet receding as three priorities take over. There is no spring, bounce, particle field, screen morph, or camera move. The motion should feel like an editor clearing a desk, not an AI trailer.

## Caption and text-equivalent plan

There is no audio. The narrative text is part of the visual composition and is also duplicated in a WebVTT caption track and adjacent transcript so the meaning is not trapped in pixels.

| Cue | Time | Text |
|---|---:|---|
| 1 | `00:00.350–00:02.200` | AI built wide in one pass. |
| 2 | `00:02.250–00:04.550` | 34 owners narrowed launch to 3 needs. |
| 3 | `00:04.600–00:07.000` | I rejected guilt-based reminders for one calm morning summary. |

Caption requirements:

- Maximum two lines; sentence case; centered in a solid paper-colored caption band, never directly over product UI.
- Minimum effective rendered size: 18 px at a 390 px viewport and 28 px in the 1280 px master.
- Contrast must meet 4.5:1 in light and dark page contexts.
- Keep captions on by default because they carry the narration, even though the film is silent.
- Visible adjacent summary: “An AI generated a broad Grove prototype. A survey of 34 plant owners narrowed launch to three needs. Hillary rejected guilt-based reminders and chose one calm morning summary; the work is in Phase 2 of 3.”
- Screen-reader text must name the reminder override without requiring video playback.

## Poster frame and static equivalent

The poster is not a decorative thumbnail. It is the complete reduced-motion and loading fallback.

### Landscape poster

Three equal columns separated by thin ink rules:

1. **AI built wide**  
   Six real screen crops in one contact sheet.  
   Folio: `Emergent build · real prototype`
2. **Research narrowed it**  
   Large `34 → 3`; smaller line `74% reminders · 56% plant ID · 50% photo diagnosis`.  
   Folio: `Survey · 22 May–8 July 2026`
3. **Human overruled risk**  
   Large `1`; smaller line `guilt + urgency → one calm morning summary`.
   Folio: `Reminder direction · not a finished screen`

Footer across all columns: `GROVE · REBUILDING AROUND TRUST · PHASE 2 OF 3`.

### 4:5 poster

Stack the same three stages vertically in reading order. Do not remove the provenance or phase line. Use one representative source crop per stage rather than shrinking the six-screen contact sheet below legibility; a small `+5 source screens` label preserves the breadth claim.

### Reduced-motion behavior

- With `prefers-reduced-motion: reduce`, render the static poster and transcript as the primary experience.
- Do not preload or start the film automatically.
- Preserve user agency with a secondary text control, `Play 7.8-second motion version`, for a reader who explicitly chooses it despite the preference.
- If played, use the same encoded film; never substitute a looping fade. Pause, replay, and exit remain available.
- If video fails, the poster and transcript remain in place with no error modal and no lost information.

## Playback and control contract

- Explicit button label: `Play Grove decision trace · 7.8 sec`.
- Minimum target: 44 × 44 CSS px with visible focus.
- No autoplay, hover-play, loop, background playback, or audio track.
- Use `playsinline`, a real `poster`, and `preload="metadata"` only when the component approaches the viewport.
- Show pause and replay after playback begins. Escape returns focus to the play/replay control if playback uses an expanded view.
- Announce state changes with concise text (`Playing`, `Paused`, `Replay available`) without a live countdown.
- Keep the surrounding case-study heading and text available; the film must not open a focus-trapping modal unless the layout genuinely requires enlargement.

## Export, compression, and loading target

| Asset | Target | Hard ceiling |
|---|---:|---:|
| Landscape WebM/VP9, 1280 × 720, 24 fps, no audio | ≤ 1.2 MB | 1.5 MB |
| Landscape MP4/H.264 fallback, 1280 × 720, 24 fps, no audio | ≤ 1.5 MB | 1.8 MB |
| Portrait WebM/VP9, 720 × 900, 24 fps, no audio | ≤ 1.4 MB | 1.7 MB |
| Portrait MP4/H.264 fallback, 720 × 900, 24 fps, no audio | ≤ 1.7 MB | 2.0 MB |
| AVIF poster | ≤ 120 KB | 160 KB |
| WebP poster fallback | ≤ 180 KB | 240 KB |

Use a two-pass encode and inspect the real screenshots at 100% after compression; the film fails if the source UI becomes blocky enough to look generated or if labels lose readability. Poster paints before any video request. If data-saver is active or the connection is constrained, keep the poster and load video only after the explicit play action.

## Critical failure conditions

Any one of these returns the asset to `Revise`; fabricated evidence or inaccessible delivery returns it to `Stop`.

1. `32`, `17/32`, or another survey count appears anywhere in the film while the claim is `n=34`.
2. The sixth, future watering-schedule decision is counted as one of five completed overrides.
3. Any generated, interpolated, or composited frame resembles a finished Grove redesign screen.
4. A screenshot loses the label `Emergent build · real prototype`, or a direction card loses `not finished screens`.
5. Playback starts without an explicit action, loops, or cannot be paused and replayed from the keyboard.
6. The poster does not independently communicate AI breadth, research narrowing, the reminder override, and Phase 2 status.
7. Motion, color, or arrows carry meaning that the copy and static layout do not.
8. Captions obscure source evidence, fall below the effective mobile size, or are absent from the accessible text alternative.
9. A pan, zoom, parallax move, flashing transition, or rapid stagger is introduced for atmosphere.
10. The 4:5 version is a crop that removes provenance, the status line, or one stage of the trace.
11. Export exceeds its hard ceiling, stalls interaction, or replaces the poster with an empty loading state.
12. A generative model changes product text, counts, interface controls, participant evidence, or artifact ownership.

## Reusable motion grammar for later MSK and Mobbin films

Do not produce these films until Grove receives an independent `Use` recommendation. Reuse only the grammar, not Grove’s exact composition.

### Shared grammar

- **Structure:** complete poster → real source field → evidence selection → consequential decision → complete poster.
- **Length:** 6–8 seconds, 24 fps, silent, user-initiated, no loop.
- **Frame:** locked camera; changes occur through opacity, matte reveal, and at most 2% scale or 8 px translation.
- **Pacing:** one claim per 1.8–2.4 seconds; no staggered list longer than five; research/evidence items appear simultaneously when they form one set.
- **Semantic lanes:** source artifact, evidence/decision, truthful outcome or status.
- **Signal:** coral marks the current causal step once; green holds verified evidence; neither color works alone.
- **Provenance:** visible throughout, not reserved for credits.
- **End state:** return to the static poster and remain there.
- **Generated-media boundary:** abstract paper/pigment material may be generated; legible UI, charts, workflow evidence, people, and outcomes may not.

### MSK mapping

Start with four explicitly named system/workflow tokens and resolve them into two recreated/anonymized workflow artifacts. The decisive beat is not “four icons merge into two” by itself; the text must name the mechanism and preserve the attribution qualifier. Use the existing `MSKWorkflowMap`, `MSKDashboardMockup`, and anonymized evidence only. Keep `organization-wide results are attributed to the initiative` visible. No patient-facing screens or patient data.

### Mobbin mapping

Keep the three real third-party app captures stationary while the editorial layer advances through `Capture → Map → Name → Verify`. The decisive beat is the transformation from isolated screenshot to searchable reference, not a visual redesign of the source apps. Keep `I documented these products; I did not design them` visible, and preserve ownership for Kikoff, Polymarket, Discover, and Mobbin.

## Matrix check

- **Agentic UX / Trust — Practitioner synthesis:** explicit play, pause/replay, provenance, truthful stage labeling, static recovery, and reduced-motion choice are specified.
- **Enterprise Design Systems / Prototyping — Verified from repository:** current Riso tokens, type, source artifacts, and responsive compositions are reused; no new motion runtime or local visual fork is required for the film itself.
- **UX Research / Strategy — Verified from repository:** the evidence-to-decision chain is specific and the content owner confirmed `n=34`; representative recruiter recall remains required before the pattern is retained or expanded to another case study.
- **Prompting / Evals — Practitioner synthesis:** the source packet is frozen, generation boundaries are explicit, and critical failures are judgeable.
- **Unresolved hard gates:** five-person representative recruiter comprehension and real VoiceOver/NVDA validation. Real export weight, rendered desktop/mobile integration, source truth, explicit playback behavior, and automated accessibility checks now pass.

## Handoff

**motion-designer → producer:** “The landscape candidate is already live. Ship the corrected portrait source only after local verification, then treat representative recall and real AT as urgent post-release validation. If either study changes the story, revise or roll back the motion layer. Do not start MSK or Mobbin motion until this pattern earns a `Use` verdict.”

**motion-designer → accessibility judge:** “Please test the static poster first: it must carry the entire claim without playback. Then check the 18 px mobile caption floor, keyboard play/pause/replay, the reduced-motion default, and whether the three transitions remain understandable without color or motion. The highest-risk points are the short 7.8-second reading pace and any temptation to hide provenance inside the final frame.”
