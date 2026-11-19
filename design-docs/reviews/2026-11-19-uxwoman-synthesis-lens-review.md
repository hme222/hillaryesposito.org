# UX Woman through the Shape of AI "Synthesis" lens (2026-11-19)

Lens: https://www.shapeof.ai/patterns/synthesis. Synthesis combines many sources and restructures them into patterns or themes, which adds interpretation beyond a summary. Its four design rules: keep reasoning visible; separate evidence from interpretation; expose uncertainty; let the reader verify key conclusions. It names four kinds: aggregated, comparative, thematic, generative.

The pattern is written for AI products. UX Woman is not one, so it is used here as a trust test: the theme cards, the two public numbers, the two guesses and the "six things a reader needs" list are Hillary's own synthesis of six interviews and six public sources. This study also has a real AI step (two themes "added after a second check with AI"), so the AI rules apply literally there.

Study: UX Woman, `/case-study/ux-woman` (`FlagshipUxWoman.tsx`, `uxWomanCaseStudy.ts`, Spanish in `spanishCaseStudies.ts` `UXWOMAN_ES`).

Seen live at 1440 px and 390 px (mobile, 2x), every `details` opened: hero (phone fan), midterm video block, "Miss the reply" numbers, "I interviewed six staff members" theme cards plus "Who I interviewed" fold, "two testable guesses" plus the six reader-need chips, guide screens plus the wireframe fold, "Built, not yet tested" test tiles. Spanish checked at 1440 px: it is a text-only condensed page with no images or diagrams, so only its wording was compared.

Measured type: the page has no SVG text at all, and no HTML text element renders below the 13 px label floor (`--ts-label` = .8125rem) at either width. All small text is baked into raster images (estimated from rendered width against natural width; see gap 8).

## What already works

- **Limits are stated up front, in the hero, in bold.** "It is untested, and no patient was interviewed." A reader learns the evidence boundary before any finding.
- **The two numbers are a comparative synthesis done right.** Each carries its kind as its label ("Forecast, New York" and "Already happened, Arkansas 2018"), the forecast keeps the source's own hedge ("It says 'at least' that many"), and the note under them says "One number is a forecast and one is a real count, so they don't compare directly." That is rule 2 and rule 3 met on the visual itself, not in a footnote.
- **Interpretations are named as guesses and each has a check.** "I made two testable guesses about the letter", each card ending in "Test: ...". The test tiles state a pass rule in advance ("Guess 1 holds if at least one is missing or unclear") or commit to one ("I'll set the passing score before the test runs"), and the route makes each version conditional ("Version 2: only if the tests find gaps"). Rule 4 is met at the plan level.
- **The AI step is disclosed on the cards, not hidden.** Themes 5 and 6 carry a visible "Added after a second check with AI" tag at both widths, and the Spanish bullets carry the same note inline.
- **Speculation is labeled where it is admitted.** The fold says the patient path was "built ... from the public rules and one sample letter, not from patients, so the feelings and chances to help on it are guesses," and "My map of clinic staff work blends several roles."
- **The design artifacts expose their own uncertainty.** Every guide screen carries a "Design Concept" pill plus the caption "Design concept, not an official notice." The wireframes keep their placeholders visible: "[verify number]", "[source TBD]", "[list after testing]", "Large text and screen-reader support: to be tested."

## Gaps

1. **"Heard six themes" conflicts with the AI tag, and the cards show no evidence weight (high).** The heading says "I interviewed six staff members and heard six themes," but two of the six cards say they were "Added after a second check with AI," so the heading presents an AI-assisted interpretation as something heard. Nothing on any card says how many of the six interviews (or which roles) support it, and the 1 to 6 numbering reads as a ranking the page never explains. This is the thematic-synthesis case the lens warns about: patterns shown without the grouping logic. Fix: on each card, a short support cue (for example "n of 6 interviews", or "from interviews" vs "from public sources"); this needs Hillary's affinity-board counts. Then either confirm themes 5 and 6 also appear in her notes (and say so on the tag) or make the heading's count match what was heard. Needs Hillary's input on both.

2. **The AI step is tagged but not explained (high).** The tag says an AI check happened; nothing says what the AI was given (her grouped notes? transcripts? the six public sources?), what it proposed, or whether she checked themes 5 and 6 back against her own notes before keeping them. "Second check" also implies a first check that is never described. The method paragraph in the "Who I interviewed, and what I did not hear" fold ("For each interview, I grouped my notes by topic on one board") does not mention AI at all. Rules 1 and 3: the reader cannot tell whether those two cards are evidence or AI interpretation. Fix: one sentence in that method paragraph naming the input, the output and her verification step. Needs Hillary's input; also confirm no interview content beyond what "I collected no private health information" covers went into the tool.

3. **No visible logic connects the themes to the guesses, the guide, or the six-item list (high).** All six themes are staff-workflow problems (ownership, follow-up by fax, insurer rules). The guesses and the guide are about a patient reading a letter. The bridge is the lede ("I saw that some Medicaid rule changes could leave patients without coverage"), which is her desk reading, not an interview finding, but it sits above the theme cards in the same voice. The chip row "Six things a reader needs to know" has no stated source at all, yet it is the scoring rubric for Test 1. Three chips ("Where things stand", "What is missing", "Who acts next") echo theme 1 and the staff status sheet, which suggests they came from staff interviews rather than readers; the page does not say. Fix: one line under the chips saying where the list comes from (themes, public sources, or her own judgment), or tag each chip with its source theme. Needs Hillary's input.

4. **The evidence limits live only in a collapsed fold (medium).** "I also used six public sources", "the feelings ... are guesses" and "Two of the people behind it work outside New York" are only inside "Who I interviewed, and what I did not hear". The last one matters for a New York-specific guide. `CaseMore`'s own contract says "Nothing important is only inside it." The six public sources are never named anywhere, so the aggregated part of the synthesis has no citations. Fix: move the outside-New-York line and the source count to a visible caption under the theme cards; list the six sources in the fold (needs Hillary's list).

5. **The public numbers have no traceable source (medium).** 475,000+ names the New York Department of Health but no document or date. 18,164 names no source at all, only "Arkansas 2018." The labels and the "don't compare directly" note are good (see above); the gap is that a reader cannot check either figure. Fix: a source link or citation for each (needs Hillary's URLs).

6. **Policy dates inside the concept screen are unsourced (medium).** Guide screen 3 states "Starts Jan 1, 2027" and "On or before Feb 1, 2027: not needed at that renewal" (also in the hero fan). The "Design Concept" pill covers the layout, not the accuracy of the rule. The wireframes correctly mark unknowns as "[verify number]"; the hi-fi screen states the dates as settled. Fix: cite where the dates come from in the guide caption or fold, or mark them as needing verification the way the wireframes do. Needs Hillary's source.

7. **The only quote is ambiguous and the two languages disagree (medium).** "A hospital leader told me: AI (artificial intelligence) helps hospitals prepare, and insurers deny." It is set as a large pull quote but has no quotation marks, so a reader cannot tell verbatim from paraphrase. The English can read as "insurers deny anyway"; the Spanish says "la IA ayuda a los hospitales a prepararse y a las aseguradoras a denegar" (AI helps insurers deny). These are different claims. Rule 2: the one piece of directly observed evidence should be unambiguous. Fix: Hillary confirms which she heard and whether it is verbatim; align both languages to that.

8. **Honesty markers inside the images are unreadable, especially on phones (medium).** Estimated from rendered vs natural width: the wireframe image (1800 px natural) renders at 1016 px on desktop and 358 px on a phone, so its body text (about 16 px natural) lands near 9 px desktop and 3 px phone, and its "Design concept, not an official notice" banner and gray footnote (about 12 to 13 px natural) near 7 px desktop and 2.5 px phone. The guide screens (444 px natural) render at 300 px desktop (smallest text about 15 px, fine) but 113 px in the phone row (about 5 to 6 px) and 150 to 177 px in the phone hero fan (about 7 px). The placeholders that carry the artifacts' honesty ("[verify number]", "[source TBD]") are exactly what a phone reader cannot see. Alt text carries them for screen readers. Fix: on phones, show the wireframes as two stacked images (date found, no date) or let the image open full size; stack the three guide screens one or two per row.

9. **Test 1 cannot be checked by the reader (low-medium).** Test 1 scores "the sample letter" against her own six-item list, with a pass bar of one missing item, scored by her. The sample letter is never shown or linked, so the reader cannot run the check themselves. The test tiles also sit in the big-number slot `EvidenceField` uses for real results on MSK and Mobbin; the heading "Built, not yet tested." prevents a misread, so this is minor. Fix: link the public sample letter (needs Hillary's URL) and say who scores it.

10. **The Spanish page claims artifacts the English page does not show (low-medium).** The Spanish summary has a "Hice" row: "Mapa de afinidad · persona · mapas de recorrido · flujos · wireframes · prototipo de alta fidelidad." The English page shows no persona, affinity map or journey maps. A persona built with zero patient interviews is itself a speculative synthesis and is unmarked. Spanish also has an "Evidencia" row the English hero no longer has. Fix: Hillary decides whether these artifacts are claimed; if the persona stays, label it as built without patient input.

## Not judged

- The 13-minute midterm video was not watched; it may already explain the AI step, the theme counts or the sources. If so, the page should still say it in text.
- Whether the page's facts match the midterm deck and research folder (not available to this review).
- The "Where it stands" result-line block another agent is adding.
- Dark mode, and the scroll-driven reveal behavior (captured with reveals forced on).
- Raster text sizes are estimates from rendered width, not measured glyph heights.

## Order of work

1. Gaps 1 and 2 (the AI disclosure and theme weight; the page's own heading currently overstates what was heard).
2. Gap 3 (one source line under the six chips; it is the rubric for Test 1).
3. Gap 7 (confirm the quote; a meaning conflict between languages).
4. Gaps 4, 5 and 6 (move limits out of the fold, add citations; all need Hillary's sources).
5. Gap 8 (phone legibility of the images).
6. Gaps 9 and 10.
