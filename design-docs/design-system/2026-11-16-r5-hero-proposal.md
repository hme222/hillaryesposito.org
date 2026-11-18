# R5 hero proposal: bigger hero media (proposal only)

2026-11-16 · design-lead · Status: **proposal, nothing under `my-app/src` changed**

Ask: Lex said "make hero images big; phone screens up in a wide flashy way." Hillary said to do it for all six case studies.

## How this was measured

- The production build in `my-app/build` (built 14:26 today) was served on a private port, so the 3023 restart didn't affect it. Measured with headless Chrome (playwright-core) using `getBoundingClientRect`.
- "% viewport" means **width % of viewport width / height % of viewport height** for the visible artifact: the phone, card or diagram, not the empty `.rp-hero__media` column.
- 1440×900: the nav takes 81px, so the hero starts at y=81. Every hero is 702–745px tall, and every H1 runs to **2 lines** at both widths, each breaking at a clean phrase.
- No hero causes horizontal scroll at 390 today (`scrollWidth` = 390 on all six).
- Screenshots: `/private/tmp/claude-501/-Users-hills-mac-Documents-portfolio-github-hme222-github-io/26f3bab3-90d6-45e7-84b1-538b16ff2a24/scratchpad/r5/{msk,logistics,knowunity,ux-woman,mobbin,grove}-{1440,390}.png`
- **Conflict to note:** design-state says the UX Woman guide screens went from 220px to 300px (uncommitted). The build measured **210×373** at 1440, so the build predates that change. The UX Woman row uses 300px as the starting point.

## Table

| Case study | Now at 1440 (px / % vw·vh) | Now at 390 (px / % vw·vh) | Proposed | Move | Risk |
|---|---|---|---|---|---|
| **Knowunity** (FLAIR) | 1 phone 260×563 / 18%·63% | 1 phone **107×232 / 27%·27%**, starts at y=698 so mostly below the fold | 1440: centre phone **300×649** (21%·72%) plus two side frames at 260×563, rotated ±6°, strip about **760px (53% vw)**. 390: centre **220×476** (56% vw), sides about 170px peeking | **Phones fanned in a wide strip that bleeds off the right edge.** Use the three `FRAMES` (pass, recap, second miss) in the existing `.fp-capture` fan pattern from Mobbin, so no new component. The text column is untouched | Rotated side phones must stay inside `.rp-hero { overflow:hidden }`. The 390 check is `scrollWidth`=390. The CTA stays at y≈618 (unchanged). Side frames are decorative: `alt=""` and `aria-hidden`. Any fan-out entrance is static under reduced motion |
| **Mobbin** | 3 phones 264×479 each (fan ≈610px) / 18%·53% each, fan 42% vw | 3 phones 135×246 / 35%·29% | 1440: each phone **300×649** (72% vh), fan about **820px (57% vw)**. 390: centre 46% (≈180×390), sides 38% | **Fan spans wider than the media column and bleeds off the left edge**, CSS only (`.fp-capture` width and offsets) | Undoes the 2026-08 fix that kept the outer phones off the edge at 390. The bleed is now deliberate, but `.fp-heroArt--mobbin { overflow:hidden }` must keep clipping it. The Kikoff tagline gets cropped; fine, because these are documented screens, not her design |
| **Grove** | Video phone 270×585 / 19%·65% | 265×575 / 68%·68% | 1440: **320×693** (22%·77%). 390: **300×650** (77% vw) | **Phone grows to nearly the full hero height**, CSS only (`.rp-device` width) | The hero grows from 736 to about 765px, and the CTA must stay above 900px (now 617–663, so OK). The demo loop must show a still frame under reduced motion: confirm before shipping. Keep the 430:932 frame |
| **MSK** | Journey card 588×482 / 41%·54% | 358×662 / 92%·78% | 1440: **640×525** (44%·58%). 390: **no change** | **Wider within its own column**: cut media padding and use `.fp-heroArt--msk` `min(700px, 100%)`. No bleed, because it is a 6-step text diagram | Small gain. At 390 it already fills the width and is 662px tall; any bigger pushes the case further down without showing anything new |
| **Logistics** | Move map 588×507 / 41%·56% | 358×437 / 92%·52% | 1440: **640×550** (44%·61%). 390: **no change** | **Wider within its own column**, same CSS move as MSK. No bleed, because the legend and the "not a map" caveat must stay readable | Same as MSK. The caveat line must not wrap to 3 lines at the new width |
| **UX Woman** | Guide screen 210×373 (build) / 15%·41%, ledger 420×255 | Guide 164×291 / 42%·34%. Ledger box measured x=199, w=329: it runs past 390 and is **clipped** | **Hold at the uncommitted 300px.** No further increase. At 390, fix the ledger clipping first | **No size move.** Keep the guide screen next to the 0-patient / 0-tests ledger | **Bigger would hurt** (see below). The ledger overflow at 390 needs checking on the current code, because the build is stale |

## Flair pick: Knowunity

The taste profile allows one flair moment per project, and Knowunity is the right place for it:

- It's her own **shipped, coded consumer prototype**, so it fits the widened consumer/product positioning.
- Its 390 hero is the weakest of the six: a 107px phone below the fold.
- It already has four real 390:844 captures (`FRAMES`).

Mobbin fans **other companies'** screens, so its strip stays quieter: wider, but flat and with no entrance motion. That keeps Knowunity as the only "flashy" moment.

## Where bigger would hurt

- **UX Woman.** The guide is an untested concept wireframe, and the hero's honesty depends on "0 patient interviews · 0 tests run". Blowing it up to phone-hero scale would make the concept look like a shipped product. It also isn't a 390:844 capture (it measures about 0.56 width to height, not 0.46), so it would read as fake hardware.
- **MSK at 390.** It's already 92% of the width and 78% of the viewport height. More height buries the case.
- **Logistics bleed.** Bleeding the schematic off the edge would crop the legend and the "schematic, not a map" caveat, and that caveat is the honesty line.

## Guardrails for whoever builds this

- Phones keep their true shape: 390:844 (`.fp-capture`, `.fp-sequence__phone`) or 430:932 (Grove's `.rp-device`). Change width only and let `aspect-ratio` set the height.
- The text column does not narrow on any hero, because every bleed lives inside the media column or past the viewport edge. All six H1s should therefore keep their current 2-line phrase breaks. Re-check with a line count at 1440, 1024, 760 and 390.
- 1440: the CTA (Knowunity, Grove) stays above y=900.
- 390: `document.documentElement.scrollWidth === 390` on all six.
- Reduced motion: no new motion is required. If Knowunity gets a fan-out entrance, it renders in its final position under `prefers-reduced-motion: reduce`.
- No new component. Knowunity reuses the Mobbin `.fp-capture` fan. Everything else is CSS in `flagship-case-study.css` and `riso-page.css`.
