# Evidence Poster Recruiter Recall Kit

**Date:** 2026-08-03  
**Research mode:** Evaluative  
**Product stage:** Implemented static evidence posters; Grove motion not generated  
**Decision at stake:** Does a short Grove film add decision recall beyond the static poster, and are all three posters credible in a recruiter scan?

## Evidence boundary

- **Verified runtime evidence:** the three implemented posters; the 18-state adaptive audit; the repository truth/provenance copy.
- **Practitioner synthesis:** the exposure protocol, scoring rubric, thresholds, and two synthetic reviewer judgments.
- **Not yet observed:** reactions or recall from real recruiters or hiring managers.
- This small qualitative study may identify comprehension failures. It must not be presented as a population percentage or hiring-outcome prediction.

## Research questions

1. After six seconds, can a hiring-audience participant recall the project problem, consequential decision or method, current outcome/status, and Hillary's ownership?
2. After viewing all three posters, can the participant distinguish the senior skill each project proves?
3. Does the Grove film improve correct decision recall compared with the static poster without increasing claim confusion?
4. Which claim is over-attributed, under-explained, or remembered incorrectly?

## Participants

Recruit **five participants** for the first moderated round:

- 2 design recruiters or talent partners who screen product/UX portfolios;
- 2 product-design hiring managers or senior design leads;
- 1 adjacent product or research leader who participates in design hiring.

Include at least one participant who uses browser zoom, increased text size, high contrast, or a screen reader. Record hiring context and access setup, but do not ask participants to justify a preference or disability.

## Materials

Generate the current study images by running:

```bash
node scripts/evidence-adaptive-audit.cjs
```

Use the clean captures in `/tmp/evidence-adaptive-audit/`:

- `grove-desktop.png`, `msk-desktop.png`, `mobbin-desktop.png`
- `grove-zoom-400.png`, `msk-zoom-400.png`, `mobbin-zoom-400.png`

Do not use an older screenshot. Record the tested commit SHA with every session.

## Round 1 — randomized six-second recall

Randomize the poster order for each participant. Show one poster for **six seconds**, remove it, then ask these questions without prompts or multiple-choice answers:

1. What problem was this project addressing?
2. What did Hillary decide or do?
3. What result, scale, or current status do you remember?
4. What part did Hillary own, and what did she not own?
5. What single phrase, number, or image stayed with you?

Do not correct the participant until all five answers are recorded. Then show the poster again and ask: “What, if anything, would you change so the contribution is clearer?”

## Round 2 — 90-second portfolio-context scan

Show the live portfolio in the order **MSK → Grove → Mobbin**. Allow 90 seconds total and ask:

1. Which project best proves enterprise workflow design?
2. Which best proves judgment in an AI-assisted product?
3. Which best proves documentation or taxonomy craft?
4. Which project feels least senior, and what evidence is missing?
5. Did any number imply a larger outcome than the evidence supported?

## Round 3 — Grove poster versus film

Run only after a real Grove motion candidate exists. Alternate the starting condition:

- Participants 1, 3, 5: poster first, film second.
- Participants 2, 4: film first, poster second.

After each exposure, ask the same five recall questions. The film earns its place only if it improves correct recall of the **one calm-summary override** without reducing correct recall of `n=34`, `Phase 2 of 3`, Hillary's ownership, or “not a finished screen.” Preference alone is not a pass.

## Scoring rubric

Score each dimension from 0–2:

| Score | Meaning |
|---:|---|
| 0 | Missing or materially incorrect |
| 1 | Directionally correct but incomplete or ambiguous |
| 2 | Correct and specific enough to distinguish the project |

Dimensions: problem, decision/method, outcome/status, ownership boundary, memorable evidence.

### Production gate

Proceed with Grove film generation only when:

- at least **4 of 5** participants score 2 on problem, the single reminder decision, Phase-2/unfinished status, and Hillary ownership;
- no participant mistakes the direction card for a finished redesign screen;
- no participant treats the `n=34` survey as production validation;
- the film candidate improves or preserves decision recall versus the poster;
- the participant using adaptive access can complete the same recall task without content obstruction.

A wrong ownership or finished-product inference is a critical failure regardless of the average score.

## Observation sheet

| Participant | Access context | Order | Problem 0–2 | Decision 0–2 | Status 0–2 | Ownership 0–2 | Evidence 0–2 | Misattribution or quote | Action |
|---|---|---|---:|---:|---:|---:|---:|---|---|
| P1 |  |  |  |  |  |  |  |  |  |
| P2 |  |  |  |  |  |  |  |  |  |
| P3 |  |  |  |  |  |  |  |  |  |
| P4 |  |  |  |  |  |  |  |  |  |
| P5 |  |  |  |  |  |  |  |  |  |

## Pre-test synthetic findings

These are not participant results. Two independent agent reviews were used only to refine the test:

| Project | Recruiter synthesis | Hiring-manager synthesis | Study risk to probe |
|---|---:|---|---|
| Grove | 14/16 | Strongest differentiated judgment | Does `34 → 3` overshadow the calm-summary decision? |
| MSK | 15/16 | Fastest enterprise scan | Is `21,000+` wrongly attributed to one workflow? |
| Mobbin | 13/16 | Honest but least consequential | Does volume read as senior value without a delivered annotation? |

## Portfolio Research Evidence Record

- **Decision at stake:** whether to generate and ship the Grove motion asset.
- **Research mode:** evaluative.
- **Research question:** whether evidence media creates correct recruiter recall without claim inflation.
- **Method and why it fit:** moderated short-exposure recall plus comparative scan; it observes comprehension close to the portfolio's stated recruiter-scan use case.
- **Participants or data source:** planned five-person hiring-audience sample; no real sessions completed yet.
- **Date and product stage:** 2026-08-03; static posters implemented, motion ungenerated.
- **Attitudinal / behavioral:** behavioral recall with a brief attitudinal debrief.
- **Qualitative / quantitative:** qualitative; per-dimension counts are descriptive for this sample only.
- **What was observed:** not yet known.
- **What changed because of it:** pending.
- **Limitation or confidence boundary:** convenience sample; not representative of all recruiters or predictive of hiring outcomes.
- **Artifact or source path:** this file and `scripts/evidence-adaptive-audit.cjs`.
- **Outcome status:** not yet known.

## Matrix check

- **UX Research / Strategy:** representative comprehension is the production gate; synthetic reviews are labeled practitioner synthesis.
- **Agentic UX / Trust:** provenance, ownership, unfinished status, adaptive access, and critical misattribution failures are explicit.
- **Prompting / Personas / Evals:** a frozen question set, counterbalanced comparison, scoring contract, and stop rule prevent preference-only approval.
- **Validation still required:** five real sessions and at least one adaptive-access participant.
