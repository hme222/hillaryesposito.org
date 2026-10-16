# Grove portfolio research evidence

## Portfolio Research Evidence Record

- Decision at stake: Which features belonged in the first focused Grove build, and how should the product handle care reminders and uncertain AI recommendations?
- Research mode: Evaluative moderated testing followed by prioritization research.
- Research question: Where did the first prototype confuse people, which proposed features mattered most for launch, and what would make AI-supported plant guidance trustworthy or unacceptable?
- Method and why it fit: A 5-user moderated test identified navigation and care-flow confusion. A 35-person self-report survey then compared twelve proposed features and collected trust, confidence, and notification concerns at a wider directional scale.
- Participants or data source: Five moderated-test participants; task-level records are not preserved. Thirty-five people completed the survey (29 plant owners, 3 florists, 3 bouquet buyers); the anonymized data and stats script live in the Grove repo (docs/research).
- Date and product stage: Moderated test, March–May 2026; survey, 2026-05-22 through 2026-07-08; first functional prototype before the Phase 2 redesign.
- Attitudinal / behavioral: The moderated test was behavioral observation. The survey was attitudinal self-report.
- Qualitative / quantitative: Mixed. Moderated qualitative observation plus quantitative survey selections and qualitative free-response comments.
- What was observed: Moderated participants stalled when care led with a feed and mission instead of their plants. In the survey (35 responses, May 22–Sept 24, 2026; recomputed 2026-10-16), 26 of 35 selected smart care reminders, 20 of 35 said explanation would increase trust in AI decisions, 5 of 35 rejected every AI feature, and 11 of 35 independently named notification volume as a deletion risk.
- What changed because of it: Twelve proposed features narrowed to three priorities. Reminder tone moved from guilt and urgency to one calm summary. Plant identification moved from a single confident verdict toward top guesses, confidence, and sources. AI-written care sheets were removed from scope, and uncertain recommendations remain reviewable by a person.
- Limitation or confidence boundary: Five moderated sessions show observed confusion but do not establish prevalence; their task records are unavailable. The 35-person survey is self-report and cannot prove behavior, demand, retention, or product-market fit. Phase 2 decisions remain hypotheses until owner testing and edge-state evaluation.
- Artifact or source path: `design-docs/research/2026-08-26-grove-survey-raw-export.tsv`; `design-docs/research/2026-08-26-grove-survey-source-data.md`; `design-docs/media/2026-07-29-evidence-copy.md`; `my-app/src/pages/case-studies/RisoGrove.tsx`.
- Outcome status: Directional evidence applied to a functional prototype; Phase 2 of 3 is in progress and the product is not presented as shipped.
