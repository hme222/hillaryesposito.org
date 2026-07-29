# Full Portfolio Panel — 2026-07-28

Nine reviewers requested, **nine completed**. The senior frontend engineer review died on an API session limit on the first attempt and was re-run on 28 July; its findings are folded in below and written up in full at [`2026-07-28-senior-frontend-engineer.md`](./2026-07-28-senior-frontend-engineer.md).

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
| Senior frontend engineer | Yes — with a code-review partner for the first months | **Mid**, frontend-adjacent |

---

## 1. What multiple reviewers found independently

Convergence matters more than any single opinion. These were reached separately.

### No finished screen she designed exists anywhere
*Recruiter · Duolingo · Meta PM — and the fix is already built, wired to nothing (Frontend engineer)*

- MSK: `RECREATED ARTIFACT · Dashboard concept · no patient data`
- Mobbin: *"I did not design Kikoff, Polymarket, Discover, or Mobbin"*
- Grove: *"this is what I'm redesigning from, not the finished product"*

Every label is honest and none should be removed. Together they mean a product designer's portfolio contains a recreation, someone else's screens, and an AI's screens. The recruiter called this the sentence that kills it in a hiring huddle, and named four Grove screens as **the single highest-leverage change on the whole list**.

**The ninth reviewer found she already built the enforcement mechanism and never connected it.** `src/components/casestudy/ShowKit.tsx` exports `BeforeAfter`, `AnnotatedShot`, `DecisionCard`, and `StateMatrix`, and its own docstring states the point: these types *require* a `screen` prop, **"so a told-not-shown decision won't compile."** It is imported by zero files. She wrote a compiler-enforced answer to the exact failure eight other reviewers independently flagged, then shipped it wired into nothing.

That reframes fix #1 below. Four Grove screens is no longer only a design task — the scaffold that would stop the problem recurring is already written and waiting.

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

### The codebase is additive-only: nothing is ever confirmed dead, so nothing is removed — *Frontend engineer*

Three measurements, all independently re-verified, that describe one habit:

- **`App.css` is excavated, not maintained.** Seven blocks carry comments instructing a human to *"Paste at the VERY BOTTOM of your CSS file"* (`App.css:1149, 1277, 1431, 1529, 1582, 1656, 1740`) — verbatim AI-patch instructions left in as code. They account for **37 of the file's 72 `!important` declarations**. `.navbar` is defined **three separate times in this one file** (`:361`, `:1743`, `:3809`), plus again in `portfolio-cohesion.css`. Cascade order, not specificity, is the conflict-resolution strategy — the comment at `:1740` says so outright.
- **The patches outlived their targets.** Two of them stabilise *"REINA"* and *"ECOM DEMO"* (`App.css:1431`, `:1581`) — a project that no longer exists in the app. Those selectors still ship and get parsed by every visitor on every page load, styling a UI deleted an unknown number of commits ago.
- **1,458 lines of dead component code across twelve files** — ~18% of the 8,265-line TSX codebase, with zero imports anywhere. Webpack tree-shakes it, so it costs no bytes; it costs comprehension.

The engineer's verdict on the pattern: *"This is what additive-only maintenance looks like at scale. Invisible in a solo portfolio repo, expensive in a shared one."*

> **The best-engineered file in the repo hasn't rendered in months.** `WorkflowKnot.tsx` (526 lines) — correct Three.js disposal, `IntersectionObserver`-gated render loop, `forceContextLoss()` with a comment explaining the browser's ~16-context cap — was superseded when the riso homepage redesign landed, and never deleted.

### The type-checker has been silently broken, and it isn't her fault — *Frontend engineer*

`npx tsc --noEmit` fails with **79 errors, none of them in `src/`**. Two independent causes: `tsconfig.json:12` sets `"moduleResolution": "bundler"`, a TypeScript 5 option, against a devDependency pinned to `typescript@4.9.5`; and `@types/three@0.185.0` ships declaration files using TS5-only syntax that 4.9 cannot parse. `skipLibCheck` does not help — these are parser errors, not semantic ones.

`npm run build` reports *"Compiled successfully"* regardless, because CRA's checker never surfaces this. There is no CI — no `.github/workflows` exists, and deploys run from a local machine via `gh-pages -d build`. **So "the build passes" has quietly come to mean something narrower than she thinks it means**, and nothing in her normal workflow would ever tell her.

### A 1.46 MB PNG ships on the homepage — and it's stored twice — *Frontend engineer*

Measured live on the served production build: `mskcc-map.png` transfers **1,500,170 bytes** on initial homepage load. `RisoHome.tsx:198` correctly writes `loading="lazy"`, but the fourth work-list item sits close enough to the fold that Chrome doesn't defer it. Underneath that is a format error — a 2438×1000 **PNG** for photographic map content, where WebP or JPEG would plausibly land in the 150–250 KB range.

Verified separately during fact-checking: `public/assets/msk/mskcc-map.png` and `public/riso/mskcc-map.png` are **byte-identical** (matching MD5), and *both* are live-referenced from different files. The repo carries 2.93 MB for one image, the copies can silently drift, and a visitor loading the homepage then the MSK study downloads the same bitmap twice under two cache entries. Total `public/` image weight is **8.4 MB**.

It is also the Open Graph preview image (`usePageTitle.ts:20`) — several platforms cap preview images below 1.46 MB and will render no image at all.

### `package.json` claims two motion libraries the site does not use — *Frontend engineer*

`gsap`, `react-scroll-parallax`, and `@astryxdesign/cli` have **zero imports anywhere in `src/`** — confirmed. They cost nothing in the bundle, since nothing pulls them in. But `package.json` is the first file any engineer opens, and it currently advertises a GSAP-driven site when the real answer is framer-motion in two files plus hand-written `requestAnimationFrame` loops.

### There is no motion point of view — *Motion designer*

Census: `ease` used ~100 times (the browser default), plus five distinct cubic-beziers. Durations: 120/180/200/250/280/300/340/400/450/500/550/600/700/2000/3200/42000ms. A token block exists in `App.css` under a comment declaring "One motion vocabulary site-wide" — it reaches **two selectors, neither of which renders**.

Two hovers animate layout properties, including the homepage work list — the most-hovered element on the site. Three different durations fire on that single hover target, so the eye reads the slowest as the response time.

---

## 3. Where the panel disagrees

**Community and forums.** Duolingo and the Meta PM treat deferring social as correct prioritisation. Bloomscape/Sill argue she is reading a stated-preference survey as behavioural truth — plant people photograph sick plants and ask strangers constantly, including people who would never say they "want forums." Their reframe: not a feed, but *"when the model is unsure, a person can be"* — community as an escape hatch scoped to one moment, which completes her own uncertainty design.

**The pull quote.** Motion designer says keep the one warm moment; the researcher notes *"Plant care should feel peaceful, not stressful"* is honestly labelled n=1 and then given a full-bleed section, an animated underline, and status as the governing principle. Presentation weight ≠ evidence weight.

**Right instinct, wrong target.** The frontend engineer is the only reviewer who checked whether the site's stated intentions survive contact with the build, and found two cases where a good decision was aimed at the wrong thing. The one deliberate code-split defers `FlagshipMobbin` with a comment explaining the reasoning — *"keep the image-heavy Mobbin study out of the always-loaded main bundle"* — but Mobbin is the **smallest** of the three flagship pages (184 lines). Grove (629) and MSK (288) load eagerly for every visitor to the bare homepage. *"Good design instinct, wrong bundle."* The same shape appears in `riso/Clearing.tsx`, whose docstring calls it the contrast guarantee for text over the collage background — every page instead applies a bare `.rp-clearing` string `className`, so the guarantee is a convention someone has to remember rather than something that fails loudly. **In both cases the engineering idea was right and got built; the wiring-in step, the only one that makes it enforce anything, didn't happen.** Same pattern as `ShowKit` in §1.

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
- **The WebGL lifecycle discipline** in `WorkflowKnot.tsx` and `MSKSystemMap.tsx`. Both dispose every geometry and material, call `renderer.forceContextLoss()` with a comment explaining *why* (repeated mounts would accumulate contexts against the browser's ~16-context cap), pause the render loop via `IntersectionObserver` + `visibilitychange`, and branch on `prefers-reduced-motion` to a static **resolved** state rather than nothing. The engineer: *"senior-level GPU resource management."* That one of the two no longer renders doesn't undo how well it was built.
- **`Modal.tsx` uses the native `<dialog>` element** instead of hand-rolling a focus trap — background inertness, focus-on-open, and Escape handling for free, with the `cancel`/`close` wiring correctly avoiding a double-close.
- **`AppRoutes.tsx`'s `ScrollToTop` / `RouteAnnouncer`.** Distinguishes a real route change from a same-page anchor change so the two don't fight, moves focus to `#main-content` but skips first render, and announces the destination's real `<h1>` via a delayed `aria-live` region instead of guessing from the route name.
- **34/34 tests pass, and they aren't padding** — `accentContrast.test.tsx` encodes a real contrast bug that already shipped once, so it cannot regress silently. Verified independently.
- **Zero stray `any` in her own code.** The single occurrence in the codebase is CRA's generated `reportWebVitals.ts` boilerplate.
- **`ReadingProgress.tsx`'s scroll handler is rAF-throttled** (`:67-73`) rather than calling `setState` on every raw scroll event — the most common performance mistake in hand-rolled scroll UI, and she avoided it.

---

## 5. Already fixed (2026-07-27 → 28)

- **Every Grove survey figure recomputed from the raw export.** n=34 not 32; field dates through 8 July not 19 June; all eleven features charted; six previously-impossible percentages corrected; "15+" → 11 of 34; the 2.4/5 shown as a subgroup comparison against 3.3.
- **A retracted claim that was still shipping in Spanish.** "9 de 12" was removed from English on 27 July and left live in Spanish — it was in the deployed bundle.
- **Reduced motion was reversing a directional arrow** on mobile and flattening a static composition.
- **The ordinal claim** contradicting her own code comment; forums corrected to 18%.
- **"Woohoo" confetti** on the page arguing against confetti — animation kept, language removed.

---

## 6. Ranked

> **Done 2026-07-29:** items **2, 5, 9, 10, 11**. Marked ✅ below. The rest need facts or design calls only Hillary can make — see §8.
>
> **A retracted number was still shipping in four places.** The survey n was corrected to 34 in the case study on 27 July, but **the homepage stat rail still read 32**, as did three curated-page stat blocks. Same failure as the Spanish "9 de 12": corrected in one surface, left live in the others. Also found: the Spanish summary said *"las cinco decisiones"* and then listed four — pet safety was missing. All fixed and re-checked sitewide.



1. **Ship four finished Grove screens** — the calm morning summary, plant ID with confidence and sources, the pet-safety warning, the collection grouped by room. The case study already describes all four in words. Named by three reviewers as the highest-leverage change available.
2. ✅ **Fix the watering model.** Override #6 added as a sixth entry, tagged **"designing now"** so it isn't read as shipped. The "what I'm designing instead" notification was still saying *"could use a little water"* — the calendar instruction the panel objected to — and now reads *"check the top inch."* Spanish synced.
3. **Build something from the light finding.** It placed fourth of eleven in her own data and has the cleanest subgroup evidence on the site.
4. **Design the death state.** Attribution sentence, demoted recovery path, pre-commitment at add-time.
5. ✅ **Tradeoff sentence added** to the gamification override, with Duolingo's fit argument (a streak's optimal play is daily watering, which is how houseplants die) and a falsifiable metric: lower 7-day engagement accepted if 90-day retention holds.
6. **Add dates** to the About chapters.
7. **Define or drop the 70%.** Full ownership, zero stated measurement. Named by the researcher and Oura as the number that will not survive "walk me through the math."
8. **Fix pet-safety uncertainty composition** and add a no-data state.
9. ✅ **"Transparency beats pretending" promoted** out of the third-card slot into its own statement block above the reflections, with the last-refreshed mechanism as supporting copy. The row now auto-fits two cards instead of leaving an empty third cell.
10. ✅ **Curated pages reconciled** — "200+ screens of the best consumer apps" corrected to *three finance apps* in six places (curated data, homepage subtitle EN + ES, og description); Grove's non-existent "cost-of-care awareness" claim removed. **Staff-level targeting still open** — that's a positioning call.
11. ✅ **Motion defects fixed** (scoped to defects, not a full retiming). The homepage work list animated `padding` — forced layout every frame on the most-hovered element on the site — and fired three different durations at once; it now moves on the compositor at one duration. `.rp-next__inner` animated `gap` for a cue its arrow already gave. The recruiter drawer repeated the same padding defect. The orphaned `--dur`/`--ease-soft` tokens now reach live selectors instead of only `.hero-btn`, which renders nowhere. The one remaining layout transition is the nav underline: a contained 2px pseudo-element, left alone because switching it to `scaleX` would break the active-state rule in `portfolio-cohesion.css`.
12. **Separate the two decisions from five overrides**, and find one case where the AI was right.

### Engineering track — parallel, and cheap

These came from the ninth reviewer and don't compete with the design work above for the same hours. Ordered by payoff per minute.

| # | Fix | Effort | What it buys |
|---|---|---|---|
| E1 | **Optimise and de-duplicate `mskcc-map.png`** — re-encode as WebP/JPEG at a sane max-width, collapse the two byte-identical copies to one path | Minutes | ~1.25 MB off the heaviest asset, ~2.9 MB off the repo, and a social-preview image platforms will actually render |
| E2 | **Drop `gsap`, `react-scroll-parallax`, `@astryxdesign/cli`** from `package.json` | Minutes | The first file an engineer opens stops misdescribing the site |
| E3 | **Wire `ShowKit` into one case study, then delete the other eleven orphaned files** | Minutes–1 hr | −1,458 lines, and the compiler starts enforcing show-don't-tell (see §1) |
| E4 | **Fix the `tsconfig` / TypeScript / `@types/three` version mismatch** so `tsc --noEmit` runs at all | Hours | A working type-check gate. There is currently none |
| E5 | **Lazy-load `RisoGrove` and `FlagshipMSK`** the way `FlagshipMobbin` already is | Hours | Delivers what the Mobbin split was trying to do, aimed at the pages that actually weigh something |
| E6 | **Merge the seven "paste at the bottom" blocks** into the rules they override; delete the dead Reina/ecom selectors | Hours — needs light + dark visual regression | Removes roughly half the file's `!important`s and defuses the next specificity war |
| E7 | **Stop `CartoField` painting the same `mapSrc` twice** plus a hardcoded wash layer | ~1 hr | Real byte reduction on every case-study hero, not just MSK's |
| E8 | **Move the navbar's floating-state transition off box-model properties** onto `transform` | 1–2 hrs — it currently changes real box size | Removes forced layout from the one element present on every page and directly in the scroll path |

**E1 through E3 are under two hours combined** and remove a megabyte of payload, a misleading dependency list, and 18% of the codebase.

> **Status — 2026-07-28, branch `eng/senior-dev-fixes`. E1–E6 all shipped and verified** (`tsc` 0 errors, 34/34 tests, clean build). Public image weight **8.4 MB → 4.4 MB**; main bundle **115.98 → 94.81 kB gzip**; App.css **5,161 → 4,609 lines** with `!important` **72 → 51** and no "paste at the VERY BOTTOM" comments left; 1,213 lines of dead components removed; `tsc --noEmit` runs clean for the first time.
>
> The CSS merge was validated by a computed-style harness over **1,758 elements × six routes × light and dark** — it landed at **zero diffs**, and caught two invisible regressions on the way. It also confirmed the deeper problem: of 35 classes in the patch region only **three still render**, and one whole patch block was written in `body.dark-mode`, a selector that has never matched anything because the theme class is toggled on `<html>`.
>
> **E7 and E8 were not implemented — both premises were false.** Identical background URLs are fetched once, so there was no byte cost to reclaim; and `.navbar.is-floating` is never applied by any code, so that transition has never fired. A real unthrottled `getBoundingClientRect` scroll handler was found and fixed in `Navbar.tsx` and `RisoGrove.tsx` instead. `ShowKit` and `Clearing` were kept rather than deleted — they are the enforcement mechanisms this panel wants wired in. Full detail in the engineer review.

---

## 7. The question the panel ends on

The frontend engineer's closing question is the one worth carrying out of this whole review, because it isn't really about code:

> *"Open `WorkflowKnot.tsx`. It's the best-engineered file in this repo — correct WebGL disposal, `IntersectionObserver`, reduced-motion handling, explicit context-loss cleanup — and it hasn't rendered on any page since the homepage redesign replaced it. How would you have found that, in a repo you own, without me pointing at it?"*

The answer that matters isn't *"a dead-code linter."* It's whether there's a standing practice of asking the codebase **"is this still true?"** — the same rigor this panel applied to her case-study claims, turned on her own CSS and component tree.

That question generalises past the repo. The impossible survey chart, the retracted claim still shipping in Spanish, the seven stacked CSS patches, the twelve orphaned files, and a mechanism built to enforce show-don't-tell that was never imported are **the same failure in five materials**: things were true when written, nothing re-checked them, and nothing was built to notice. Everything already fixed in §5 was found by someone else looking.

The strongest evidence against the habit is also the most encouraging thing here — she caught the Spanish retraction, the ordinal claim, and the confetti-on-the-anti-confetti-page herself once she went looking. **The practice isn't missing. It's just not yet scheduled.**

---

## 8. Blocked on Hillary

Not deferred — genuinely unanswerable without her.

**Facts nobody else has.**
- **Dates (item 6).** When MSK ended, how long freelancing. The recruiter's point stands until these exist.
- **The 70% (item 7).** Full ownership, zero stated measurement. Define it or drop it.
- **One case where the AI was right (item 12).** The Meta PM's strongest ask. Only she knows whether there was one — and if there genuinely wasn't, that is worth saying plainly rather than manufacturing.

**Design decisions, not cleanup.**
- **Four Grove screens (item 1).** The highest-leverage change on the list, and the one thing that must not be faked — the honesty labelling is the site's best asset. `ShowKit` is built and waiting to enforce it (§1).
- **Death state (item 4)** and **the light finding (item 3)** — real product design on Grove.
- **Pet-safety uncertainty composition and the no-data state (item 8).**
- **Staff-level targeting on the curated pages (item 10).** The claims are now accurate; the level they aim at is a positioning call.
