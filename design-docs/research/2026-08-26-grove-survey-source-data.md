# Grove survey — source data and resolved AI-trust findings

> **Superseded 2026-10-19.** The survey now has 37 responses (May 22–Oct 16, 2026). The source of truth is the Grove repo's `docs/research/findings/2026-grove-concept-survey.md` and `docs/research/scripts/survey_stats.py`. The 34-row counts below describe this older export only; current trust counts are no AI feature 5/37, explain-why 22/37, verified 19/37, confidence 17/37, sources 14/37, photos 13/37, AI-written frustration 8/37.

**What this is:** the raw export behind the Grove case study's "34-person survey" claim. Saved here so the numbers on [RisoGrove.tsx](../../my-app/src/pages/case-studies/RisoGrove.tsx) trace back to a real file, not just a remembered summary.

- **Raw export:** raw export removed 2026-10-16 (contained emails); anonymized data: ~/Documents/Grove/docs/research/data/grove-concept-survey-2026-anonymized.csv — 34 respondents, May 22–July 8, 2026.
- **Method:** self-report survey (Google Form export), covering feature prioritization, plant-care confidence, and AI trust. Not a moderated study — see the case study's own evidence-boundary note for what self-report can and can't claim.

## AI-trust findings (counted directly from the export, 2026-08-26)

These back the "The trust decision" section and the "Plant ID confidence" override on the Grove page:

- **4 of 34** answered *"I would not use any AI features in a plant app"* to "Which AI-driven features would you actually trust and use in your routine?" — outright rejection of all AI features, not diagnosis specifically. Includes the florist whose "any generative AI in this will remove any sense of trust" quote appears on the page.
- **6 of 34** named *"Hard to tell if the information is accurate or just written by AI bots"* as their single biggest frustration finding plant/flower care info online (general web frustration, not Grove-specific).
- On "What would make AI-generated care advice feel highly trustworthy to you?" (multi-select, up to 4):
  - 19/34 — Explaining why it made the recommendation
  - 16/34 — Reviewed/verified by professional florists or botanists
  - 15/34 — Displaying an accuracy confidence score
  - 13/34 — Showing photographic examples to verify
  - 12/34 — Citing botanical databases or sources

## What this evidence can and can't say

This is self-report about a hypothetical feature, not observed behavior with a working AI diagnosis tool — the same limitation the case study already states for its other survey findings. It's real evidence that trust/calibration was something a meaningful minority raised unprompted and a majority weighed in on when asked directly; it is not proof of how people would actually behave once AI plant ID shipped.

Related: `~/.designpowers/memory` file `grove-survey-facts` (Hillary's Claude memory) carries the same numbers plus the previously-resolved feature-ranking facts (forums, delete triggers) for quick recall without re-deriving from this file.
