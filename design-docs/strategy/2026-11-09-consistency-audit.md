# Consistency audit: design system and storytelling

Date: 2026-11-09
Status: findings for Hillary's decisions. No code changed.
Direction: clean, high craft, minimal; plain voice; evidence-led (see `2026-11-04-clean-minimal-direction.md`).
Method: two read-only source audits (storytelling, design system), spot-checked against the code.

## Taste profile, restated as tests

- **One site, one skin.** Every page shares paper, hairlines, chips and buttons. Test: moving from any case to any other does not look like a different site.
- **One description of Hillary.** One title, one line about how she works, used everywhere. Test: grep for her title returns one phrase.
- **A number means the same thing everywhere.** Same figure, same qualifier ("owner-reported", "not measured") on every surface, including meta tags and Spanish.
- **Claims never outrun the page.** Anything said in a preview, a Home row or the About page is shown on the case page it points to.
- **Plain words.** No "not X, Y" reversals, no decorative threes, no unsourced absolutes.

## Storytelling: what breaks those tests

1. Title conflict: tab and link previews say "UX designer"; description, structured data and recruiter panel say "Healthcare Product Designer"; About h1 and Home role line describe her differently again.
2. MSK framed as design work on Home ("UX & Product Design") and as pre-design operations on About ("Before design: MSK and the Army"). Spanish adds "six years redesigning clinical workflows" (spanishCaseStudies.ts:75, 291, 379).
3. Link previews promise "measured workflow outcomes" and "research rigor"; MSK and Logistics say nothing was measured.
4. Grove: "three features" (reminders, plant ID, photo diagnosis) are not the same three as the "three directions" (reminders, plant ID, personality). Status reads "in progress", "decided" and "still unbuilt" on different surfaces.
5. Mobbin meta says "200 screens across three apps"; the page says 200+ per app.
6. Spanish drift: section kickers still render; Logistics 85% leads in Spanish but is demoted in English; Grove Spanish shows content English hides and an unsourced "no major app teaches it"; UX Woman says five findings in Spanish, "three" in the English h2 above a five-row map.
7. Knowunity "Selected for the Yummy Labs sprint" is not shown on the case page.
8. About drops "owner-reported" from the Army figures and widens roles ("ran medical supply", "rebuilt certification").
9. MSK verb for her contribution changes per page: proposed, pitched, started, initiated. "I left before launch" conflicts with "I saw it while training new employees".
10. Voice: about seven "not X, Y" reversals, three decorative threes, a few unsourced absolutes (list in the audit transcript).
11. `voice-spec.md` still prescribes the old dispatch copy ("lead with the rider", "Independent prototype"); the live copy follows Hillary's 2026-11-06 instruction. The spec is stale.

## Design system: what breaks those tests

1. Home and MSK use their own skin (cool paper `#edf1ed`, hairlines set to transparent, flat buttons), separate from the other five cases; Mobbin and About use cream papers.
2. Buttons differ: coral offset shadow on most pages, flat on Home and MSK.
3. Dark bands: four near-identical greens plus teal and grey, 1 to 3 per page.
4. Heroes: three artifact-label styles, five hero-evidence forms, three phone frames.
5. Type: four competing scale token families; about 130 of 340 font sizes off the 13/15/16/18/24/40 scale; stray weights 650 and 720; a few sub-13px Grove labels.
6. Spectral still renders on the recruiter panel; form fields use the display face.
7. Seven class names for one small-label style; five disclosure patterns for one job.
8. Spanish pages sit outside the case-study styles (no airy spacing, no headline gap, inline styles).
9. About 1,100 lines of dead CSS (opening film, button threshold, old Home work list, breadcrumbs, old footer).

## Decisions for Hillary

1. One title. Options: "Healthcare Product Designer" (current description, résumé-aligned) or "UX designer" (current tab and Home).
2. One line about how she works: "I design workflows before screens." (Home) or "I design healthcare products where every handoff matters." (About).
3. How MSK is described: operations and process-improvement work that led to a design proposal (matches About and the case page), not "UX & Product Design".
4. One verb for the MSK contribution: proposed (matches the case page's restraint).
5. Knowunity: was she selected for the sprint (application/cohort), or did she take part? Needs her fact.
6. Grove: which three are "the three"? Needs her call.
7. Visual skin: bring every page onto one skin. Which one: the Home/MSK cool, hairline-free skin, or the green-paper skin with hairlines the other five use?
