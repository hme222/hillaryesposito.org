# Harsh Portfolio Critic Crosswalk

Date: 2026-07-24  
Compared against: the prior “Top Priority Fixes” critique, the prior portfolio-as-sales-page reference review, and the completed Designpowers full-site review

## Verdict

The harsh review and the Designpowers review agree on the important thing: the portfolio must establish one clear promise, prove it quickly, and let a time-limited reader understand the work without decoding design jargon.

Most of the harsh review was already resolved by the flagship editorial redesign. This pass closes the two remaining gaps without adding another layer of cards, labels, or ornamental UI.

## Crosswalk

| Harsh-review standard | Current evidence | Decision |
|---|---|---|
| Know who Hillary is and what she does within five seconds | The Home hero names the role and promise; the next line gives the operating strengths and 21,000-clinician proof | Tightened. The canonical position is now “Product designer for products people have to trust.” |
| Use specific positioning rather than a broad identity list | Home, About, recruiter view, page metadata, and structured data previously alternated among Product Designer, UX/Product Designer, researcher, consumer craft, healthcare, and internal tools | Tightened. All public entry points now lead with Product Designer and the trust promise; research, AI judgment, healthcare, and craft support the claim instead of competing with it. |
| Lead with metrics, scale, and recognizable proof | The first section after the hero shows 200+, 32, and 21K+; the quick index names Grove, Mobbin, and MSK; client attribution is explicit | Keep. Moving more proof into the hero would duplicate the first scroll and weaken the quiet hierarchy. |
| Treat the portfolio as a sales page, not a personal essay | Home moves from promise to proof to selected work; About begins with a working pattern before chronology | Keep. About remains a profile journal, but its opening is now shorter and aligned with the canonical promise. |
| Make case studies readable to non-designers | Grove, MSK, and Mobbin follow problem → evidence → decision → outcome, with project-specific artifacts and chapter wayfinding | Keep. Generic TL;DR cards would reintroduce the repetitive-card problem the review warned against. |
| Show “what changed” and decision evidence | Flagship studies use outcome ledgers, decision records, before/after workflow artifacts, and truthful evidence status | Keep. No unverified outcomes or ownership claims were added. |
| Use interaction to signal technical range | The Home workflow knot is the single expressive interaction and resolves complexity into clarity | Keep. Adding more interactive moments would dilute the authored focal point. |
| Make client credibility visible | Mobbin attribution, MSK context, metrics, recruiter view, and the client recommendation are all present | Keep. A logo wall would overstate the client list and turn one truthful attribution into decoration. |
| Reduce choice overload | Desktop uses two hero actions plus a persistent recruiter pill; mobile previously rendered three equal-weight stacked controls | Fixed. Mobile Recruiter View remains visible but is now a tertiary text shortcut rather than a third primary button. |
| Keep the About page short, specific, and human | About has a concise hero, working pattern, three evidence-backed chapters, client proof, and a small personal note | Refined. The hero now removes the identity pile-up and leads with one sentence readers can remember. |
| Use fewer repeated cards and more real artifacts | Home and flagship studies use numbered editorial spreads and project-specific evidence artifacts | Keep. No additional generic card system was introduced. |

## Accepted changes

- Canonicalized the public position around one promise: products people have to trust.
- Reframed research, AI judgment, consumer craft, healthcare experience, and systems work as proof of that promise.
- Aligned Home, About, recruiter view, browser metadata, social metadata, and structured data.
- Reduced the visual weight of the mobile Recruiter View shortcut while preserving its 44px target, discoverability, language disclosure, and dialog behavior.

## Deliberately rejected changes

- No extra logo wall: the available client evidence does not justify one.
- No duplicate TL;DR card layer: the project index and case-study chapter systems already provide scan paths.
- No invented conversion, adoption, launch, or testing outcomes.
- No return to a generic “UX/Product/Research/AI/Healthcare” identity string.

## Verification

- Home rendered at 390×900 and 1440×1200 with the revised hierarchy.
- About rendered at 390×900 with the shorter opening and revised headline.
- Home and About both measured `scrollWidth === innerWidth` at 390px.
- Spanish mode renders the revised positioning and marks the English recruiter shortcut `EN`.
- Mobile Recruiter View remains a 44px target and opens the existing native dialog.
- Accessibility and interaction suite: 15/15 passing.
- Production build: compiled successfully.
- `git diff --check`: passed.
