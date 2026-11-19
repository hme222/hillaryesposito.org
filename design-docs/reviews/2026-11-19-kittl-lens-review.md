# Portfolio review through the Kittl lens (2026-11-19)

Source: Kittl's public site (home, /for/agencies, /pricing, /about, /for/designers), fetched 2026-11-19. The fetch returns extracted text only, so this review cannot judge Kittl's visuals, motion, colors or layout, and Kittl's own numbers (10M users, a $4,185 savings claim) are self-reported and unverified. Kittl is a software company, so only some of its techniques transfer to a one-person portfolio.

## What Kittl does that is worth borrowing

| # | Technique (observed on Kittl) | Where this portfolio stands | Verdict |
|---|---|---|---|
| 1 | The H1 names the thing and who it is for, in under ten words ("tools for agencies and studios"). | Home H1 is the name plus "UX designer and researcher for healthcare and internal tools". The new case study headlines name the project and the client. | Already doing it. Keep. |
| 2 | One primary action, repeated at natural stopping points. | Every case study closes on "Email me". Home has a hero action plus a contact close. | Already doing it. Keep. |
| 3 | The same page skeleton for every audience; only the nouns change. | Chapter labels differ on every study (MSK: What I did / Button rules / More fixes / Background / Results; FloraGrove: First test / Survey / Next; Mobbin: Start / Problem / Decisions / Apps / Outcomes). | Adopt: one shared order, for example Problem, What I did, Result, Limits. Medium effort: tests and Spanish pin the labels. |
| 4 | "Who this is for" blocks so readers find themselves. | One reader path exists (the 90-second tour for recruiters). | Optional: a second path for admissions readers, if the portfolio should serve them. Her call. |
| 5 | The process shown as three short named steps. | Not used. MSK and Logistics are the natural fits. | Adopt later, only in her own words. Low priority. |
| 6 | A real FAQ that answers the objection a skeptical reader has. | The Ask feature (hidden) covers this; no static FAQ exists. | Adopt: 4 to 5 questions a hiring manager asks. Needs her answers; nothing can be invented. |
| 7 | Mixed proof, each piece small: a named quote with a role, one hard number. | One real, attributed client quote exists (Mobbin) in `data/clientFeedback.ts` but is not shown anywhere now. | Adopt first. Smallest change, real proof. Wording must stay exactly as given. |
| 8 | Proof right after the hero, before the explanation. | Home goes hero, then straight into the work list. | Adopt with #7: one quote and one number between the hero and the list. |
| 9 | Short, parallel card titles that double as navigation. | The new descriptive headlines are parallel. | Done once the new headlines land. |
| 10 | An origin story with plain dates and named people. | About is deliberately minimal. | Skip. She chose the minimal About. |
| 11 | Plain-label navigation grouped by reader goal. | Work, About, Settings. | Already doing it. Keep. |
| 12 | Specific alt text (Kittl is the counterexample: its content images say "Media image"). | Alt text here describes what the picture shows. Spot-checked, not fully audited. | Keep. Worth a full audit before sharing widely. |

## Do not copy

A mega-menu, a repeated "start free" button, pricing toggles, scale claims (users, funding, headcount), a logo strip of platforms, buzzword mission copy ("seamless", "intuitive"), eight or nine persona cards, third-party review links as proof, generic alt text, full-sentence H3s.

## Suggested order

1. Show the real client quote, with its number, between the hero and the work list (#7, #8).
2. A shared case study skeleton (#3).
3. A short "questions a hiring manager asks" block, written from Hillary's own answers (#6).
4. A second reader path for admissions, only if wanted (#4).
5. Three-step strips for the service-design studies, only in her words (#5).

---

## Re-review with visuals and motion (same day)

Method: Kittl's live pages loaded in a real Chrome window at 1440 and 390 px, frames captured every 250 ms on load, scrolled in 800 px steps, measured with computed styles and `getAnimations()`. This replaces the text-only caveats above. Still not seen: behavior on a real touch device, signed-in product.

### What I could now see

- **One typeface, one headline size.** Inter only. The hero H1 and every section H2 are the same: 52 px, weight 625, line height 56 px, letter spacing -0.04em, in one near-black ink (`rgb(8,11,17)`). Body 16 px. The button uses that same ink, white text, 8 px radius. The hierarchy comes from layout and image, not from a scale of sizes.
- **Monochrome UI, color from imagery.** The page chrome is white, black and gray. All color comes from product images and videos. The one brand accent is a lime: the sticky promo bar and the icon tiles in the Features menu.
- **Hero.** Centered headline, one gray sentence, one black pill button, then a row of four tall image cards with a one-line caption under each. Eight small videos play inside cards on the page; the cards do not move on hover.
- **Rhythm.** About 7,950 px: hero, logo strip, large pull-quote, audience cards, feature tiles, one full-bleed dark section, a closing call to action, a second pull-quote, pricing, templates carousel. Exactly one dark section. Section titles are full sentences with a period ("Made for people with products to sell.").
- **Motion is minimal.** The only CSS animations are the logo strip scrolling (with faded edges) and a spinner. The signature moment is the pull-quote: its words start light gray and darken one by one as you scroll, so the reading pace follows the scroll. Quote type is large, with a quote-mark glyph and a small name and role underneath.
- **Navigation.** Promo bar and header stay pinned while scrolling. The Features menu groups items under two headers; each item is an icon tile, a bold title and one plain line, with a promo card at the side.
- **Audience pages differ in voice.** The Agencies page adds a breadcrumb and sets its H1 in a condensed uppercase display face, unlike the home page, then shows a dark product screenshot right under the button.
- **Phone.** No sideways scroll at 390 px; the H1 drops to 28 px and the hero stacks; the promo bar wraps to two lines and stays pinned, which uses real screen height.
- **A flaw worth noting.** The promo bar appears about half a second after load and pushes the page down (a layout shift), visible in the load frames.

### Corrections to the text-only report

The logo strip does scroll. The "hero use-case cards" are video cards, not links. The promo bar and the pinned header were invisible to the text fetch. Alt-text and heading comments came from markup and still stand.

### What this changes for the portfolio

1. **A single signature motion beats many small ones.** Kittl has one: the scroll-linked quote. The portfolio already has the name-weight motion and the word motions on About. If one scroll-linked moment is added, it should be one result sentence per case study, with reduced motion respected, and tested for scroll smoothness first because scroll lag was reported earlier.
2. **Keep the type scale small.** One family, one size for all section headlines, hierarchy from layout. The site already uses a two-family system; the case studies could use one fixed H2 size.
3. **One dark section per page, used for the result.** The MSK page already does this (the outcomes section). Keep it to one.
4. **Let the work carry the color.** Kittl's UI stays neutral and the product images supply the color. The portfolio's collage and photos can do the same on About; accent colors can stay rare.
5. **Large attributed quote after the hero** stays the top recommendation (the Mobbin quote exists in data and is not displayed).
6. **Avoid late-arriving banners** that shift the page.
