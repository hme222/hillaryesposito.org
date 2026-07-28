# Full Portfolio Panel — 2026-07-28

Nine reviewers requested. **Eight completed**; the senior-developer review died on an API session limit and was not re-run.

Each is a simulated expert perspective grounded in what the named company or role is known for — **not an actual employee of any of them**. Read them as informed lenses, not endorsements.

| Lens | Verdict | Level |
|---|---|---|
| Senior in-house design recruiter | No for consumer reqs · yes for healthcare / internal tools | Product Designer, **mid** |
| Senior PM, Meta | Yes, conditionally — not a core consumer surface day one | **IC5**, IC6 in ~18 months |
| Product designer, Duolingo | Yes, take the call | — |
| Product designer, Noom | Interview, not close | — |
| Product designer, Oura | Interview | — |
| Senior UX designer, Bloomscape / The Sill | Yes, comfortably | — |
| Senior UX researcher | Not unsupervised on quantitative · yes on qualitative with a template | — |
| Senior motion designer | Thinking reads senior, system reads unfinished | — |
| Senior frontend engineer | **did not complete** | — |

---

## 1. What multiple reviewers found independently

Convergence matters more than any single opinion. These were reached separately.

### No finished screen she designed exists anywhere
*Recruiter · Duolingo · Meta PM*

- MSK: `RECREATED ARTIFACT · Dashboard concept · no patient data`
- Mobbin: *"I did not design Kikoff, Polymarket, Discover, or Mobbin"*
- Grove: *"this is what I'm redesigning from, not the finished product"*

Every label is honest and none should be removed. Together they mean a product designer's portfolio contains a recreation, someone else's screens, and an AI's screens. The recruiter called this the sentence that kills it in a hiring huddle, and named four Grove screens as **the single highest-leverage change on the whole list**.

### The 2.4/5 light finding is the strongest result and nothing was built from it
*Duolingo · Noom · Bloomscape/Sill*

Noom's framing: *"'What features do you want?' returns the features people can imagine. 'Where are you least confident?' tells you where they will actually fail."* She shipped from the weaker question.

**The raw export settles this.** New owners mean **2.38** (n=16) versus **3.3** for experienced — a real subgroup gap. And the **Stylized Room/Light Map ties for fourth of eleven at 24%**, and was one of the two features cut from the chart. The feature that answers the finding placed fourth in her own data.

### Grove has no death state
*Duolingo · Noom · Bloomscape/Sill*

All the anti-guilt copy — *"No streak. No confetti. Your plant is still fine."* — is written for the happy path.

- Noom: *"A plant-care app that hasn't designed grief hasn't designed the product."*
- Duolingo: *"A chirpy AI personality on a dying plant is worse than any streak ever invented."*
- Bloomscape/Sill: the first plant death is the highest-churn event in the category, and every D2C retention programme is built around it.

Noom's three moves, none present: supply the attribution before the user invents a worse one (*"this corner gets two hours of direct sun"* — external, specific, fixable), lower the bar on the recovery path, and pre-commit the expectation at plant-add time.

### The gamification removal is presented as costless
*Duolingo · Noom · Meta PM*

All three want one sentence: what did calm cost, and how would you know if you were wrong. Duolingo's version — *"This will produce lower 7-day engagement and I expect better 90-day retention. Here's how I'd test that."*

Duolingo also supplies a better argument than the one on the page: a streak rewards daily engagement, and **overwatering is the most common way people kill houseplants**. *"A streak in a plant app is a mechanic whose optimal play kills the product's subject."* That's a fit argument, not an ethics argument — and they warn that ethics-first designers "are usually right and frequently unable to win the argument in the room."

### The florist quote is an inconsistent evidence standard
*Bloomscape/Sill · Meta PM*

One respondent overrode n=34. Bloomscape/Sill note the florist is a flower farmer and workshop instructor whose expertise is commercially threatened by generative care content — a stakeholder objection framed as a user insight. Meta PM: *"That's an inconsistent evidence standard, not decisiveness."*

Neither says the decision was wrong. Both say presenting n=1 as sufficient is the flag. The available principle is better than the quote: **AI may guess, not instruct.** A ranked ID with confidence is checkable; a generated care sheet is an instruction with no confidence attached and no feedback loop.

### Curated pages overclaim and contradict the case studies
*Recruiter · Bloomscape/Sill · Meta PM*

Same 200 screens described three ways: *"three finance apps"* (case study), *"200+ screens of the best consumer apps"* (Meta page), *"cataloging speed and outfit discoverability"* (Indyx). The Indyx page credits Grove with *"cost-of-care awareness"*, which does not exist in the product. The recruiter separately flagged that curated pages target **Staff** roles, which with the current evidence reads as a serious misread of level — and advised not sending them.

Meta PM: *"Most portfolios round up. She rounds down. Then the curated pages round back up."*

---

## 2. Findings only one reviewer could have found

### Grove's care model would kill plants — *Bloomscape / The Sill*

The Care screen reads **"Overdue 63 days — Overdue by 61 days on its 7-day schedule"** with a **WATER ALL** button. Fixed-interval watering is the single most destructive pattern in the category; overwatering kills far more houseplants than neglect. "Water all" batches a fern and an aloe into one tap.

Her own Greenhouse entry has it right: *"Water when top inch is dry."* The encyclopedia has the correct model and the reminder engine has a timer. Nobody reconciled them.

> **She overruled the AI's tone five times and never once its logic.**

Their proposed fix is the best story available: *"The AI built a calendar. Plants don't run on a calendar. Override #6: the reminder asks you to check, not to water."* One calm prompt — *"Fiddle Leaf: check the top inch"* — with a two-tap outcome. Makes reminders correct, makes seasonality free, and turns "smart care reminders" from a label into a mechanism.

Also from this lens: the top-3 plant ID guesses (golden pothos / heartleaf philodendron / satin pothos) **all want the same water and light** — a distinction without a difference. The honest UI is *"Most likely a pothos or philodendron. Either way: bright indirect light, water when the top inch is dry."*

### The chart was arithmetically impossible — *UX researcher, confirmed by Oura*

Six of nine percentages could not be produced by any whole number of respondents. Both derived it independently; verified programmatically. **The raw export has since resolved it** — see §5.

### Pet safety composes two uncertainties and pretends it composes one — *Oura*

The safety card says flatly **"Toxic to cats and dogs"** with no confidence, downstream of a 78% identification. Toxicity is an asymmetric-cost decision and should be evaluated over the *union* of plausible candidates, not the top guess.

In her own example the answer is robust — all three candidates are Araceae, all toxic — and the screen doesn't say so. The missing line: *"Every plant this could be is toxic to cats."* The harder undesigned state: *"1 of your 3 possible matches is toxic. Treat it as toxic until you can confirm."*

And the false negative is entirely undesigned: absence of a flag currently reads as "safe." There is no *"we don't have safety data for this plant"* state.

Oura's principle-level disagreement: **"The AI can always be overruled" is wrong applied uniformly.** Override is correct for reminder tone, where the user is the authority on their own life. It is not correct for a toxicity claim, where the user has no expertise and the cost lands on a cat. The mature distinction is *dismissible* versus *acknowledgeable* — you can silence a nudge; you cannot un-know a hazard.

### She is designing on Ability and refusing Motivation — *Noom*

Grove reduces effort everywhere and explicitly declines to motivate. That is a coherent, defensible, senior position — *"I am not going to motivate you; I am going to make it so easy you don't need to be motivated"* — and she never states it. The case study is framed as "trust" and "AI judgment," which is a more crowded claim than the one she has actually proven.

### The five overrides are two decisions, and the AI is never right — *Meta PM*

Tone, gamification, and frequency are one conviction (no guilt mechanics). ID confidence and pet safety are another (show uncertainty and provenance). Two convictions narrated as five, on a stat rail and two curated pages.

Worse, the AI's proposals are strawmen — *"I'm thirsty. Why did you forget me?"* Rejecting those requires no judgment. In a case study called **AI Judgment** there is **no instance of the AI being right where she was wrong**, or of her being tempted to override and correctly deferring. *"Real AI judgment includes knowing when not to overrule."*

### The Meta page mocks the mechanics Meta ships — *Meta PM*

The bespoke demo contrasts a loud version (streak ×7 🔥, countdown, autoplay, upgrade prompt) against one calm 8 AM notification. *"The 'obvious version' she's mocking is a description of the product I ship. That's either the most interesting thing about her application or an unforced error, and the page doesn't tell me which."*

If she means it: *"here's where I'd push back on Reels and Stories mechanics, and here's the test I'd run."* That version they'd interview immediately.

### No dates anywhere — *Recruiter*

"Six years at MSK." "13+ years." "Right now I'm freelancing." When did MSK end? How long freelance? *"An unstated timeline reads as a gap being managed, and I don't leave the tab open to find out."*

### There is no motion point of view — *Motion designer*

Census: `ease` used ~100 times (the browser default), plus five distinct cubic-beziers. Durations: 120/180/200/250/280/300/340/400/450/500/550/600/700/2000/3200/42000ms. A token block exists in `App.css` under a comment declaring "One motion vocabulary site-wide" — it reaches **two selectors, neither of which renders**.

Two hovers animate layout properties, including the homepage work list — the most-hovered element on the site. Three different durations fire on that single hover target, so the eye reads the slowest as the response time.

---

## 3. Where the panel disagrees

**Community and forums.** Duolingo and the Meta PM treat deferring social as correct prioritisation. Bloomscape/Sill argue she is reading a stated-preference survey as behavioural truth — plant people photograph sick plants and ask strangers constantly, including people who would never say they "want forums." Their reframe: not a feed, but *"when the model is unsure, a person can be"* — community as an escape hatch scoped to one moment, which completes her own uncertainty design.

**The pull quote.** Motion designer says keep the one warm moment; the researcher notes *"Plant care should feel peaceful, not stressful"* is honestly labelled n=1 and then given a full-bleed section, an animated underline, and status as the governing principle. Presentation weight ≠ evidence weight.

**Headline measure.** The motion designer and I both want a headline measure cap; Hillary's instruction was that no single-sentence headline should break mid-line. **Her instruction wins** — a 32ch cap would reintroduce exactly the wrap she asked to remove.

---

## 4. What every reviewer said not to touch

- **The "What I got wrong" blocks.** *"I designed the first version for managers instead of new hires."* / *"My first batch used my vocabulary. Revisions dropped by half after I learned Mobbin's."* Named by the recruiter, Noom, and the Meta PM independently as the strongest material on the site.
- **The attribution discipline.** *"I did not design Kikoff, Polymarket, Discover, or Mobbin"* — the researcher called it the single best sentence on the site. *"20% ... contributed to the initiative."* *"No invented numbers."* Noom notes careful attribution reads as a regulatory instinct at a health company, not modesty.
- **Two pieces of third-party proof** — the MSKCC News profile and Lynette Yap's testimonial. *"Most portfolios have zero external validation. This has two."*
- **`"Overdue is visible, but the interface never turns forgetting into a character flaw."`** Picked out independently by Duolingo and Noom as the best sentence in the case study — and both note it is buried in a scroll component.
- **The anti-shame rule living in a design token**, not microcopy (`Overdue rose · "Overdue, never shaming"`). Noom: *"Putting the anti-shame rule in the design system rather than the copy is the senior move."*
- **`"Transparency beats pretending"`** — the certification feed could only refresh daily, so "last refreshed" timestamps made the limitation visible. Oura called this **the best sentence on the entire site** and noted it is a footnote in the third card of a three-card row.
- **The Iraq line.** *"Process failure in a combat zone isn't an inconvenience. It's a casualty risk."* Recruiter: the most memorable sentence in their pipeline this month.
- **MSK sustainment** — survived two system upgrades, outlasted three leadership transitions. Researcher: the strongest MSK evidence, and it is in body copy while three shakier percentages get the stat treatment.
- **The `decision-log.json` artifact** with `"overruled": true`. Meta PM: a pattern they would want on an AI features team.
- **Grove's honesty scaffolding** and the code comment banning ordinal ranks — the researcher called it *"the most convincing thing in the codebase."*

---

## 5. Already fixed (2026-07-27 → 28)

- **Every Grove survey figure recomputed from the raw export.** n=34 not 32; field dates through 8 July not 19 June; all eleven features charted; six previously-impossible percentages corrected; "15+" → 11 of 34; the 2.4/5 shown as a subgroup comparison against 3.3.
- **A retracted claim that was still shipping in Spanish.** "9 de 12" was removed from English on 27 July and left live in Spanish — it was in the deployed bundle.
- **Reduced motion was reversing a directional arrow** on mobile and flattening a static composition.
- **The ordinal claim** contradicting her own code comment; forums corrected to 18%.
- **"Woohoo" confetti** on the page arguing against confetti — animation kept, language removed.

---

## 6. Ranked, still open

1. **Ship four finished Grove screens** — the calm morning summary, plant ID with confidence and sources, the pet-safety warning, the collection grouped by room. The case study already describes all four in words. Named by three reviewers as the highest-leverage change available.
2. **Fix the watering model.** Override #6: check, don't water. Currently the care logic would kill plants, and it undercuts the AI-judgment thesis.
3. **Build something from the light finding.** It placed fourth of eleven in her own data and has the cleanest subgroup evidence on the site.
4. **Design the death state.** Attribution sentence, demoted recovery path, pre-commitment at add-time.
5. **Add the tradeoff sentence** on removing gamification, with the metric that would prove her wrong. Cheapest high-value line available.
6. **Add dates** to the About chapters.
7. **Define or drop the 70%.** Full ownership, zero stated measurement. Named by the researcher and Oura as the number that will not survive "walk me through the math."
8. **Fix pet-safety uncertainty composition** and add a no-data state.
9. **Promote "Transparency beats pretending"** from footnote to headline.
10. **Reconcile the curated pages** with the case studies; reconsider Staff-level targeting.
11. **Motion tokens** — three durations, two curves; fix the two layout-animating hovers.
12. **Separate the two decisions from five overrides**, and find one case where the AI was right.
