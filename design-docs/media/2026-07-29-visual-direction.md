# Portfolio Evidence Media — Visual Direction

**Date:** 2026-07-29  
**Owner:** design-lead  
**Status:** Production-ready visual packet; no media generated and no credits spent  
**Direction:** One publication, three evidence plates  

## Visual thesis

These assets should feel like edited evidence, not trailers. Use the portfolio’s existing warm paper, sharp plates, thin rules, painted-cartography material, Archivo hierarchy, and Space Mono folios. The media system adds no new brand language and no glossy “AI” treatment.

The three projects share one grammar:

1. Source artifact
2. Consequential decision
3. Truthful outcome or current status

Grove receives the single expressive motion moment. MSK and Mobbin are static plates until Grove passes the independent judge.

## Shared production system

### Artboards and grid

| Variant | Artboard | Grid | Outer margin | Gutter | Use |
|---|---:|---:|---:|---:|---|
| Landscape | 1280 × 720, 16:9 | 12 columns | 72 px | 24 px | Desktop poster and Grove film |
| Portrait | 720 × 900, 4:5 | 6 columns | 44 px | 18 px | Mobile poster and Grove film |

- Use an 8 px spacing baseline.
- Keep essential content inside an inner 88% safe area.
- Build the 4:5 version separately. Never center-crop the 16:9 master.
- Use a 1 px `--hair` outer rule so the light paper plate remains defined in dark mode.
- Keep the poster itself light in both site themes. It is an evidence sheet, like the existing recreated artifacts, not a theme surface.

### Typography

Use the existing families only:

- Statements and headlines: `"Archivo", system-ui, sans-serif`
- Folios, data, status, provenance: `"Space Mono", ui-monospace, monospace`

| Role | Landscape | Portrait | Treatment |
|---|---:|---:|---|
| Project folio | 12/16 px | 20/26 px | Space Mono 700, uppercase, `.14em` |
| Primary headline | 64/62 px | 48/48 px | Archivo 850, `-.024em` |
| Stage heading | 20/24 px | 28/32 px | Archivo 800 |
| Evidence number | 88/80 px | 64/60 px | Archivo 850 |
| Decision/body line | 24/32 px | 32/40 px | Archivo 600 |
| Status/provenance | 12/18 px | 24/32 px | Space Mono 400–700 |

Do not place essential meaning only in tiny text inside source screenshots. The live DOM caption and accessible description remain the authority.

### Shared composition rules

- Sharp paper plates; 0–8 px radius only. Device crops keep the existing device radius.
- Two-layer shadow only on literal artifact plates: `0 2px 6px rgba(0,0,0,.12), 0 30px 60px -20px rgba(0,0,0,.35)`.
- Reserve coral for the human decision, current causal step, or one selection rule. Keep it below roughly 3% of the frame.
- Green marks verified evidence; it never works without a label or number.
- Painted material remains background atmosphere at 6–12% effective opacity. It may not cross provenance or status text.
- No gradients added to product screenshots. No glow, glass, 3D extrusion, cinematic depth of field, or AI particle field.

### Provenance placement

Provenance is visible at rest, not saved for credits:

- Source-level label: upper-left of each artifact or artifact group.
- Asset-level status: upper-right folio.
- Full qualifier: footer strip spanning the artboard.
- Minimum contrast: WCAG AA for all visible labels.

## 1. Grove flagship poster and film frames

### Source lock

Use only:

- `my-app/public/assets/grove/grove-live-collection.jpg`
- `my-app/public/assets/grove/grove-live-add.jpg`
- `my-app/public/assets/grove/grove-live-care.jpg`
- `my-app/public/assets/grove/grove-live-journal.jpg`
- `my-app/public/assets/grove/grove-live-personality.jpg`
- `my-app/public/assets/grove/grove-live-greenhouse.jpg`
- `SURVEY_FINDINGS`, `MVP_FEATURES`, `OVERRIDES`, and `OUTCOMES` in `my-app/src/pages/case-studies/RisoGrove.tsx`
- Palette and type tokens in `my-app/src/styles/riso-page.css`

Do not use `grove1.png` as the primary evidence image. It is a welcome screen and does not explain the decision. Do not use `care.jpg`, `bouquet.jpg`, `Growth.jpg`, or `plantpersonality.jpg` as finished redesign evidence.

### Landscape poster

Use three equal four-column stages separated by 1 px ink rules.

**Persistent folio**

- Upper left: `GROVE · AI JUDGMENT`
- Upper right: `FUNCTIONAL PROTOTYPE · PHASE 2 OF 3`

**Stage 1 — AI built wide**

- 2 × 3 contact sheet of all six `grove-live-*` screenshots.
- Screens remain rectangular crops with no model-generated device frames.
- Label: `EMERGENT BUILD · REAL PROTOTYPE`
- Keep all six crops equal; the point is breadth, not a hero screen.

**Stage 2 — Research narrowed it**

- Primary expression: `34 → 3`
- Supporting line: `34 owners narrowed 11 ideas to 3.`
- Evidence line: `74% reminders · 56% plant ID · 50% photo diagnosis`
- Provenance: `SURVEY · N=34 · 22 MAY–8 JULY 2026`

**Stage 3 — Human overruled risk**

- Primary expression: `5`
- Supporting line: `Five AI defaults overruled to protect trust.`
- Three short labels: `calm reminders · visible confidence · human correction`
- Source label: `DIRECTION · NOT FINISHED SCREENS`
- Coral marks only the move from “AI default” to “human override.”

**Footer**

`AI-assisted composite using real Grove prototype screens and survey findings. No finished redesign screen is shown.`

### Portrait/mobile poster

Stack the same three stages vertically in reading order.

- Stage 1 uses `grove-live-care.jpg` as the representative crop plus `+5 source screens`; do not shrink a six-screen grid below recognition.
- Stage 2 keeps `34 → 3` as the largest element.
- Stage 3 keeps `5` and the three override categories.
- Reserve the bottom 120 px for the full provenance and phase line.
- At a 390 px viewport, no essential embedded text may render below 16 CSS px; keep the equivalent live caption beside the image.

### Film frame system

Follow `design-docs/media/2026-07-29-motion-storyboard.md`. The camera is locked; the frame behaves like an editor clearing a desk.

| Frame | Visual state | Required label |
|---|---|---|
| Full poster | All three stages visible | Phase 2 of 3 |
| AI breadth | Six-screen 2 × 3 contact sheet; other stages at 16% | Emergent build · real prototype |
| Research narrowing | `34 → 3` and three percentages; contact sheet at 12% | Survey · n=34 · dates |
| Human override | Care, personality, and add crops paired with three direction cards | 3 examples of 5 overrides · not finished screens |
| End poster | Return to complete static claim and hold | Functional prototype · Phase 2 of 3 |

The only expressive beat is the contact sheet receding while the three priorities take over. No screen morph, camera move, staggered card cascade, glow, bounce, or loop.

## 2. MSK evidence poster

### Source lock

Use:

- `my-app/src/components/MSKWorkflowMap.tsx`
- `my-app/src/components/MSKDashboardMockup.tsx`
- `WORKFLOW_BEFORE`, `WORKFLOW_AFTER`, and supported outcome copy in `my-app/src/pages/case-studies/FlagshipMSK.tsx`
- MSK semantic tokens in `my-app/src/styles/flagship-case-study.css`

Do not use `my-app/public/assets/msk/mskcc-cover.jpg` as evidence. Do not use `mskcc-map.jpg` as the main visual; it shows locations, not the workflow decision.

### Palette

- Paper: `#e9ede7`
- Paper 2: `#dce4dd`
- Ink: `#1c2925`
- Ink 2: `#40534d`
- Evidence green: `#315f55`
- Decision coral: `#a64031`
- Hairline: `#bdcac2`

### Landscape composition

Use a five-column statement field and seven-column artifact field.

**Left field**

- Eyebrow: `MEMORIAL SLOAN KETTERING · CLINICAL SYSTEMS`
- Headline: `Four systems became two.`
- Mechanism: `One dashboard action connected the queue to the online chart.`
- Scale: `Workflows touching 21,000+ clinicians and staff`

**Right field**

- Render `MSKWorkflowMap` as live/vector artwork, not as model-generated pixels.
- Keep BEFORE and AFTER visible simultaneously.
- Add one 220–260 px crop of `MSKDashboardMockup` over the lower-right edge, showing the `File to chart` action and rule.
- Label the map `RECREATED CURRENT/FUTURE-STATE MAP`.
- Label the dashboard `ANONYMIZED INTERNAL TOOL CONCEPT`.

**Footer**

- Left: `RECREATED AND ANONYMIZED WORKFLOW · NO PATIENT DATA`
- Right: `Hillary led this workflow redesign inside a larger organization-wide initiative.`

### Portrait/mobile composition

- Headline and mechanism occupy the first 220 px.
- Stack BEFORE above AFTER; do not scale the full horizontal SVG until its labels become illegible.
- Convert each path into a labeled ordered row using the exact source step names.
- Place the dashboard action crop after AFTER, not between the two paths.
- Keep the scale and both qualifiers in the bottom band.

### Exclusions

Never generate patient-facing screens, people, charts, MRNs, document types, timestamps, outcomes, or a “real MSK dashboard.” Never place `20%` on this poster. Never recolor source material to imply official MSK brand approval.

## 3. Mobbin capture-desk poster

### Source lock

Use:

- `my-app/public/assets/mobbin/kikoff.jpg`
- `my-app/public/assets/mobbin/polymarket.jpg`
- `my-app/public/assets/mobbin/discover.jpg`
- `APPS`, `STEPS`, and outcomes in `my-app/src/pages/case-studies/FlagshipMobbin.tsx`
- Mobbin semantic tokens in `my-app/src/styles/flagship-case-study.css`

`mobbin-logo.png` is optional attribution, not the central mark.

### Palette

- Paper: `#eee9df`
- Paper 2: `#e3ddd1`
- Ink: `#242522`
- Ink 2: `#4e514a`
- Evidence green: `#4c6055`
- Decision coral: `#ad3e2e`
- Hairline: `#c9c4b8`

### Landscape composition

Use four columns for the editorial method and eight for the capture desk.

**Left field**

- Eyebrow: `MOBBIN · UX FLOW DOCUMENTATION`
- Headline: `Capture → Map → Name → Verify`
- Evidence: `3 live finance apps · 200+ screens · 4 months`
- Contribution: `Captured, sequenced, annotated, and labeled for Mobbin Finance+.`

**Right capture desk**

- Fan the three full source captures at `-5° / 0° / +5°`; Polymarket sits forward.
- Maintain at least 72% visibility of each capture. Do not overlap a product name or primary identity mark.
- Add a visible folio above each: `SOURCE PRODUCT · KIKOFF`, `SOURCE PRODUCT · POLYMARKET`, `SOURCE PRODUCT · DISCOVER`.
- A thin four-step rule runs beneath the captures with numbered labels `01 Capture / 02 Map / 03 Name / 04 Verify`.
- The coral marker appears once at `04 Verify`; the four steps are also numbered so color does not carry sequence.

**Footer**

`Source products by Kikoff, Polymarket, and Discover. Hillary documented the flows; she did not design the apps or Mobbin.`

### Portrait/mobile composition

- Headline and evidence occupy the first 210 px.
- Place three 156–166 px-wide source captures in one row with no rotation greater than 2°.
- Use a 2 × 2 step grid below the captures.
- Keep all three product names and the full ownership line visible.
- Do not crop to a single app; that would erase the “three trust models” evidence.

### Exclusions

Never redraw, relight, restyle, extend, or generate inside any source-app screen. Never invent intermediate screens or annotations. Never imply Hillary designed Kikoff, Polymarket, Discover, Mobbin, or the whole Finance+ library.

## Higgsfield boundary

The highest-value assets can be assembled deterministically from existing evidence. Higgsfield is optional enhancement, not the compositor of record.

Allowed after cost preflight and judge approval:

- Generate a non-semantic paper/pigment texture with no text, UI, people, icons, charts, or product marks.
- Outpaint only the abstract painted background field, never a screenshot or workflow.
- Upscale an existing screenshot only if a side-by-side source check confirms that every word, number, control, and logo is unchanged.

Not allowed:

- Image-to-video on UI screenshots
- Generative interpolation between product frames
- Generated charts, participants, clinical material, product screens, labels, metrics, or outcomes
- Synthetic headshot, voice, hands, devices, or “finished” Grove redesign

If the generated texture does not clearly improve the plate at 100% and mobile size, omit it. Quiet authority benefits more from evidence fidelity than visible credit spend.

## Mobile crop and export checks

- Export landscape and portrait from separate layouts.
- Test at 390, 900, and 1440 px; also inspect at 200% zoom.
- Verify every visible qualifier survives the crop.
- Poster paints before video. No blank loading state.
- AVIF target ≤120 KB, ceiling 160 KB; WebP target ≤180 KB, ceiling 240 KB.
- Inspect screenshots at 100% after compression. Blocky or altered UI is a truth failure.

## Perceptual rationale

**Proximity/common region — Practitioner synthesis:** grouping source, evidence, and decision should help a recruiter reconstruct the causal chain. Counter-risk: a compressed plate can oversimplify the case study. Preserve stage labels and provenance. Validate with unaided recall.

**Von Restorff — Practitioner synthesis:** reserving coral for the consequential decision should make Hillary’s judgment memorable. Counter-risk: decoration outranks evidence. Limit coral and test the frame in grayscale.

**Prägnanz/selective attention — Practitioner synthesis:** three stages per plate reduce scan burden. Counter-risk: readers mistake prioritization for validation or contribution for ownership. The status and ownership footer is therefore a hard gate.

## Acceptance criteria

- A recruiter can state the project problem, consequential decision, and truthful outcome/status from the static poster alone.
- Removing color does not remove the sequence or meaning.
- Every source artifact, reconstruction, and ownership boundary is labeled at rest.
- Grove contains no finished redesign implication; MSK contains no patient data implication; Mobbin contains no product-ownership implication.
- The 4:5 asset is composed, not cropped.
- Final media passes independent truth, recruiter-value, accessibility, mobile, reduced-motion, and taste review.

## Matrix check

- **Agentic UX / Trust:** visible provenance, status, ownership, static recovery, and user-controlled motion are required.
- **Enterprise Design Systems / Prototyping:** existing tokens, type, artifact treatments, and project palettes are composed; no new visual fork is proposed.
- **UX Research / Strategy:** Grove is feature prioritization, MSK is a recreated workflow, and Mobbin is documentation contribution.
- **Prompting / Evals:** source packets are frozen; altered UI, fabricated evidence, or missing qualifiers are critical failures.
- **Source status:** Repository assets and copy are **Verified**; perceptual rationale and generation boundaries are **Practitioner synthesis**; evaluation-matrix titles remain **Index-only**.
- **Validation still required:** final crop inspection, source-diff/OCR check after any upscale, recruiter comprehension, contrast, reduced-motion, screen-reader alternative, export weight, and independent judge recommendation.

## Handoff

**design-lead → motion-director:** Keep Grove inside the locked editorial frame: the contact sheet recedes, the research evidence replaces it, and the human decision is the only coral beat. Do not animate or interpolate the UI itself; the source screens are evidence, not raw material for a model.

**design-lead → producer:** Build all three plates from the exact repository sources above and export separate 16:9 and 4:5 layouts. The footer qualifiers are hard gates, and Higgsfield is limited to non-semantic texture or verified upscaling—if it changes a word, number, control, logo, or product state, discard it.
