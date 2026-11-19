# MSK visuals through the Shape of AI "Synthesis" lens (2026-11-19)

Lens: https://www.shapeof.ai/patterns/synthesis. Synthesis combines many sources and restructures them into patterns or themes, which adds interpretation beyond a summary. Its four design rules: keep reasoning visible; separate evidence from interpretation; expose uncertainty; let the reader verify key conclusions. It names four kinds: aggregated, comparative, thematic, generative.

The pattern is written for AI products. MSK is not one, so it is used here as a trust test: the visuals on the MSK page are Hillary's own synthesis of what she observed across four departments, and the same four rules decide whether a reader can tell what is observed, what is reconstructed and what is designed.

Seen live at 1440 and 390 px: hero journey (Before/After), "I talked to every team" section, service blueprint (Before/After), four button rules, "two more places" cards, sustainment timeline, outcomes table.

## What already works

- **Evidence and interpretation are separated in words.** "I wrote these four rules for this portfolio version. They are not MSK's actual design." "I don't know what changed behind the scenes." "Illustration, not a screenshot."
- **The blueprint is a comparative synthesis done well.** The Before/After toggle aligns the same lanes; the shaded "coordinator is waiting" band and the note "No word comes back, which is why step 6 exists" connect the diagram to a decision, so the reasoning is visible.
- **The outcomes table tags every number** with what kind of claim it is: Led, Trained, Initiative result, Projection. Caveats sit beside the numbers, not in a footnote.

## Gaps

1. **After-state mixes built and designed in one visual voice (high).** The After blueprint's IT lane shows "Ready + role checked" and "Permission allows it" in the same style as the steps that were actually built. The page says elsewhere these rules are the portfolio's design, not MSK's. Fix: tag those two nodes "my design, not MSK's", and give "observed", "built by IT and UX", and "my design" three small distinct markers with a legend.
2. **The evidence base is not on the visual (high).** What the blueprint is built from ("re-created from memory of my own notes; no patient data; counts lost") lives behind the collapsed "Where this comes from +". Fix: a one-line "Built from" caption directly under the blueprint and the hero journey.
3. **The shaded wait band can read as a measurement (medium).** The text says "No one measured it that I know of." Fix: label the band "wait length not measured".
4. **The "same problem in two more places" theme is not supported by the second card (high).** Card one (CPR course: dense legal language vs steps) matches "people couldn't tell what to do next". Card two (new-hire training) shows a different problem: one course for every group. The theme is the interpretation; the visual evidence shows something else. Fix: either name the theme more truthfully ("the system assumed one kind of reader") or show the evidence for "couldn't tell what to do next" on card two. Also the CPR bars are illustrative but not labeled as illustration, and card two shows only the Before in the drawing; the After is a footnote.
5. **Small labels are below the site's own floor (medium).** Rendered size of the blueprint's SVG labels: smallest about 9.2 px on desktop and 5.9 px on a phone, against the site's 13 px label floor. The long text under the diagram is fine, so a phone reader gets the content without the diagram. Fix: raise label sizes in the SVG, and use a compact version on phones as the sustainment diagram already does (10 px minimum, still under the floor).
6. **The four rules cannot be checked (low-medium).** They are presented as decisions with no way to test them. The page already lists three measures she would have tracked (minutes from arrival to chart, messages filed to the wrong chart, pages printed). Fix: one "How I'd check it" line per rule using those.

## Not judged

Scroll-pinned behavior of the four-rules section could not be judged from still captures; check it live. The Spanish version was not reviewed.

## Order of work

1. Gaps 1 and 2 (the biggest trust gains, small changes).
2. Gap 4 (an honesty fix for the theme claim).
3. Gap 5 (legibility).
4. Gaps 3 and 6.
