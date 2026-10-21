# Healthcare Product Designer Recut — design-taste-frontend Critique

_Date: 2026-10-21_
_Scope: MSK, Grove, Knowunity, shared disclosure, and shared footer_
_Rubric: `/Users/hills_mac/.agents/skills/design-taste-frontend/SKILL.md` and `references/critique.md`_

This is a deliberately strict visual-taste review. The rubric's house rules are not the portfolio's existing Riso house style, so the raw juror score and the rule-capped score are both recorded. The portfolio is not claimed to pass the skill's full lint gate.

## ROUND 1

Seen in one second: A textured product-case collage with a large outcome headline and a phone artifact; the newly added evidence ledger competes with both.
Idea (one sentence): Each case leads with a concrete product outcome, but the same ruled metadata ledger makes three different projects feel templated.
Live thing: Working product/prototype links and native evidence disclosures; Grove exposes a browser prototype.
Layout words by section: hero=split collage + ledger / research=split + stats / decisions=ruled comparison / change=dark before-after / outcome=statement + proof / close=contact + next case.
Scores: design 7.3 · usability 8.2 · creativity 7.2 · content 9.0 → overall 7.7 raw / 6.5 capped.
Caps applied: Visible eyebrow labels, 01/02/03 numbering, monospace micro-labels, and hairline ledger rules cap the strict-rubric overall at 6.5.
Top three problems (most visible first), each with the screenshot it shows in and the fix:

1. Grove's numbered, evenly ruled hero trace reads like an AI audit ledger rather than research unfolding. Seen in `.taste-skill/grove-390/mobile-fold.jpg` and `.taste-skill/grove-1440/desktop-fold.jpg`. Fix: remove visible numbering and rules; write the progression as 5 people → 37 people → 3 directions.
2. MSK, Grove, and Knowunity share the same evidence-row anatomy, so project identity changes but composition does not. Seen in the 390px flagship comparison captures. Fix: give MSK a workflow handoff, Grove a research progression, and Knowunity a build/boundary split.
3. The MSK display title and Grove status title exceed two lines at narrow widths; the shared footer statement is oversized for a paragraph. Seen at 320–390px. Fix: shorten the display titles and constrain the footer statement to 24px mobile / 36px desktop.

## ROUND 2

Seen in one second: A specific outcome, one evidence pattern that belongs to that project, and a real artifact.
Idea (one sentence): The portfolio treats product work as evidence moving into a decision—workflow at MSK, research-to-scope at Grove, and build-versus-proof boundary at Knowunity.
Live thing: Working prototype actions, inspectable product artifacts, and native disclosures with visible Open/Close state.
Layout words by section: MSK hero=workflow handoff / Grove hero=research progression / Knowunity hero=two-tone boundary / research=split + stats / decisions=comparison + artifact / change=dark before-after / outcome=statement + proof / close=contact + next case.
Scores: design 8.0 · usability 8.7 · creativity 8.0 · content 9.1 → overall 8.3 raw / 6.5 capped.
Caps applied: The established Riso system still uses visible eyebrow labels, monospace captions, hairline divisions, and numbered artifact sequences. Under this rubric those are hard caps even when intentionally authored. No headline exceeds two lines at 320 or 390 in the three primary openings; no horizontal overflow was measured.
Top three problems (most visible first), each with the screenshot it shows in and the fix:

1. The shared Riso eyebrow + mono-caption layer remains visually repetitive across long case pages. Seen throughout `.taste-skill/grove-after/mobile-page-01.jpg`. Future system-level fix: merge informational kickers into headings or supporting sentences and reserve monospace for literal interface/code evidence.
2. Mobile Grove remains dense at roughly ten screens, with many labels below 13px. Seen in `.taste-skill/grove-after/mobile-page-01.jpg` and `mobile-page-02.jpg`. Future fix: reduce secondary micro-metadata and combine labels with the sentences they qualify; preserve the evidence spine.
3. Numbered sequences and ruled boxes remain inside older artifact/process sections. Seen in the full-page Grove and MSK sheets. Future fix: distinguish true ordered procedures from decorative numbering, and mark genuine product-interface fragments as such before changing their internal conventions.

## Decision

The visible recut problem is resolved: the three flagship openings no longer look like one template with swapped content, and their first-screen proof is clearer at recruiter speed. Do not force a global removal of the Riso vocabulary inside this slice. That would be a separate art-direction migration requiring a complete before/after review of all six cases, Home, About, recruiter view, Spanish, dark mode, and reduced motion.
