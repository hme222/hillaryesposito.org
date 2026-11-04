# Design Strategy: Hillary Esposito portfolio

Date: 2026-11-03
Status: draft for Hillary's alignment. Nothing here is built yet.
Inputs: October 25 recruiter audit, three scored panel rounds (5.3, 5.2, 6.0 of 10), the artifact needs board, the portfolio design system, Nick Marin's case-study critique (the two screenshots), and Hillary's answers on scope, palettes, motion and dark mode.

## Who it serves

- **Primary:** healthcare-product recruiters and hiring managers scanning in 60 to 90 seconds. They need a role, a result, who owns it, and how it is known.
- **Secondary:** a design lead reading one case study closely, and a visitor reading in Spanish.
- **Inclusive range:** people on phones, in dark mode, on keyboards, with reduced motion, with a screen reader. The panel found these failures before it found taste problems, so they are part of the strategy.

## Design principles

### 1. Every claim names its problem and its evidence
**The principle:** A line on the page says what it answered and how Hillary knows.
**In practice:** Lessons are cut or tied to a specific problem (Nick Marin's test). Numbers carry their owner: led, scope, initiative result, projection. Research shows method and limits.
**What this rules out:** general lessons that could sit on any project, headline numbers without scope, and "taught me" lines with no before and after.

### 2. The artifact is the argument
**The principle:** Each case study shows the work itself, labeled as real, recreated, or designed but not run.
**In practice:** One dominant artifact per chapter. The MSK queue changes state on screen. Grove's twelve bars become three. Images are chosen for what they prove, with captions that say so.
**What this rules out:** decoration, equal-weight tiles that hide which number matters, captions of one or two words, and any patient data, unit position or route.

### 3. One system, not two pages that look alike
**The principle:** Chrome, buttons, footers and labels behave the same on all eight pages.
**In practice:** One shared coral. A case study may set one accent for its own artifact plate only. Sentence-case sans chrome everywhere. Tracked capitals only inside a product reconstruction.
**What this rules out:** page-wide overrides that make Home and MSK different from the rest, and per-page palettes that reach into the chrome.

### 4. Motion explains, then tells the story
**The principle:** Animation shows a change. Larger scroll scenes and type moments are allowed when they carry the story.
**In practice:** GSAP drives queue filing, the Grove cut, number reveals and section scenes. Content is never hidden waiting for a trigger. Reduced motion removes all of it.
**What this rules out:** ornamental loops, autoplay that competes with reading, and anything that makes the page unreadable when scripts or scroll events fail.

### 5. Readable by everyone, in both themes
**The principle:** Accessibility is a ship condition, not a review at the end.
**In practice:** Text at 4.5:1 in light and dark, targets at 44px, a 13px type floor, headlines that never strand a word, real keyboard and screen-reader behavior including failure states.
**What this rules out:** shipping a surface that is checked in one theme, status shown by color alone, and announcing "loaded" before a page has loaded.

## Competitive position

Scouted 2026-11-03: 12 sites (5 healthcare or internal-tools portfolios, 6 of Hillary's craft references, 1 index). **Method limit: text-only fetches.** No rendered look, so motion, contrast, focus, dark mode and reduced motion are not verified for any peer. The healthcare group is thin: most findable peers sit on pages.dev or Squarespace, and three pages did not load (a 401, a down site, a 404). uxportfolio.co turned out to be a course sales page, not an index of portfolios.

| Peer | Group | Useful for |
| --- | --- | --- |
| Tabari (pages.dev, /h3a) | Healthcare, 0 to 1 | NDA stated up front, number per project on Home, a recruiter summary toggle |
| Komatsu, CareRev (pages.dev) | Internal scheduling tool | Outcome windows ("prior 90 days vs first 90") and sample size |
| Osama (pages.dev, /medone) | EMR modules | Captions that say what to notice; stated module ownership |
| Nguyen Dang (Squarespace, /nimbus) | Healthcare AI | "Projected" and "proof of concept" labels; uncaptioned images as the cautionary case |
| Michalson (myportfolio) | Care-team tools | Project index only, thin |
| glenn.me, lfs.gd, abstract.systems, jakub.kr, alexwidua, cali.so | Craft references | Name-and-role homes with no result; very short cases; bilingual (cali.so) |

What the evidence says:

- **Table stakes:** a role line, a project list, an email link, and a headline number on the healthcare peers.
- **Nobody does these, so Hillary can own them:** evidence type labeled per claim, recreated artifacts that say they are recreated, and a limits block per case. Peers either say nothing about confidentiality or state it once.
- **Fastest route to a result among peers:** Tabari's Home, with a number on each project row. Its numbers have no baseline, sample or owner split.
- **Best pattern for captions:** Osama's captions name what to notice. Nguyen Dang's uncaptioned images show what the one-image MSK case looks like to a reader.
- **Craft references have no result on their Home.** They set tone, not a hiring bar.

Recommendations from the scout, adopted into the plan:

1. Put a result on the Home first screen with its owner and scope in the same line. Home currently leads with scale, not stakes.
2. Add one plain line at the top of MSK saying no patient data is shown, then keep the real, recreated and designed-not-run labels.
3. Give every number a window and a source, and a sample size where there is one.
4. Add a "didn't work or not measured" block per case. UX Woman's confidence lines already do this and are the template.
5. Rewrite captions to say what to notice, starting with the one-image MSK and one-photo Logistics cases.
6. Offer a plain recruiter summary as a keyboard-reachable section. The site already has a 90-second tour.
7. Link only what opens. No placeholder links.
8. A command palette only if it costs nothing for keyboard and screen-reader users. Low priority.

### Rendered pass (2026-11-04)

Ten sites were loaded in real Chrome, in isolated contexts, at 1440 and 390, with reduced motion and dark mode emulated and six Tab presses for focus. Measured counts only. The run was cut off by a computer sleep before the agent wrote its report, so I read its saved data. Screenshots are in the scratch folder and were not reviewed. Library names could not be detected (bundled code exposes no globals), and the data cannot say what a scroll effect shows, so it cannot confirm any peer ties motion to an artifact changing state.

| Site | Moves on load | Scroll-linked changes | Honors reduced motion | Follows system dark | Focus ring | Smallest text |
| --- | --- | --- | --- | --- | --- | --- |
| Tabari (healthcare) | 7 | 8 to 10 elements | No (7 to 7, and more scroll changes) | Dark only, has toggle | Yes, 2px | 10 to 11px |
| Osama (EMR) | 9 to 15 | 6 to 10, one sticky | Yes (to 3 and 0) | No, has toggle | Yes | 5.5px home |
| Komatsu (CareRev) | 12 | 11 | Yes (to 0) | No | Yes | 12px |
| Nguyen Dang (healthcare AI) | 0 | 0 | n/a, no motion | No | None found | 12px |
| glenn.me | 67 | 0 | No (67 to 66) | No, toggle on case | Yes | 9.4px |
| lfs.gd | 1 | 1 | Mixed | No | Weak | 12px |
| abstract.systems | 34 | 0 | Partly (to 6 to 12) | Dark only | Yes | 10px |
| jakub.kr | 0 | 0 | n/a | Yes | Yes | 17px |
| cali.so | 1 | 0 | n/a | Yes | Yes | 4px, 1.45:1 contrast |
| alexwidua.com | 0 | 0 | n/a | No | None found | 16px |

What it says:

- **Healthcare peers move more than the craft references.** Tabari, Osama and Komatsu use scroll reveals on 6 to 11 elements. Most craft references are almost static, so "highly visual" for this audience is mostly reveals and layout, not heavy scenes.
- **Pinned scroll scenes are nearly unclaimed.** Only Osama has one sticky element and Tabari one fixed element. A small, well-built scene tied to the MSK queue or Grove's cut would be rare in this peer set.
- **Reduced motion is the clearest differentiator.** Only Osama, Komatsu and, partly, abstract.systems visibly honor it. Tabari and glenn.me ignore it. The portfolio already honors it, so keep that visible and tested.
- **Accessibility floors are low across the set.** Smallest text ranged from 4px to 12px and one site measured 1.45:1 contrast. The portfolio's 13px floor and measured contrast are already above every peer.
- **Dark mode:** only jakub.kr and cali.so follow the system setting. Full parity with a toggle, which the portfolio has, is not seen in this set.
- **No peer ties motion to an artifact changing state** in anything measurable here.

Adopt: keep reveals small like the healthcare peers, make one or two real scenes around artifact state changes (the MSK filing receipt, Grove's twelve to three), keep reduced motion fully working, and keep the type floor.

Not verified: what each scroll effect actually shows, library names, and anything from the three sites that failed on the first attempt (they loaded on a retry).

## Experience map

| Moment | What the visitor does | What they should feel | Inclusive note |
| --- | --- | --- | --- |
| Arrive on Home | Reads role, headline, one proof sentence | "I know what she does and it was big" | Result and CTA inside the first 390px viewport; dark mode paints dark from the first frame |
| Scan the proof | Reads stat tiles and work rows | "These numbers have owners" | Scope numbers visibly lower in weight than led results (open: Home currently leads with scope) |
| Open a case | Lands on a hero with an artifact | "I can see the thing" | One hero pattern on all six cases; chapter strip never hides the current chapter |
| Read the decision | Moves through problem, decision, evidence | "I can follow why" | Deep links open collapsed sections themselves |
| Meet the limits | Sees what was not tested | "She tells me what she does not know" | Limits written in plain words, not a footer |
| Exit | Emails, opens résumé, or goes to next case | "I know what to do next" | One close pattern per page; contact one click away |

Friction found so far: scale is sold before stakes on Home; the MSK page tells the same change four times; Mobbin and UX Woman have almost no artifacts.

## Success metrics

Targets are proposals. None has a baseline except where marked.

| Metric | Measures | Target | How |
| --- | --- | --- | --- |
| Weighted panel score | Craft, system, UX, accessibility | 7.5 of 10, no failed hard gate (baseline 6.0, round three) | Scored critique after each batch |
| Hard gates | Contrast, orphaned headlines, touch targets | 0 failures on all eight routes, both themes | Rendered measurement in an isolated browser |
| Recruiter scan | Role, result and next step found in six seconds | 5 of 5 test readers (baseline: not run) | Unprompted scan test with a short list of readers |
| Artifact coverage | Cases with at least one real or recreated artifact per chapter | 6 of 6 (baseline: 4 of 6 by the needs board) | Needs board checklist |
| Accessibility with assistive tech | Primary task completion | Keyboard and screen reader complete Home to MSK to email without a trap | Manual walkthrough, both languages |
| Reduced motion | Nothing hidden or running | Zero running animations under the preference | Emulated check |
| Site analytics | Résumé opens, email clicks, case-study opens | Track only; no target until a baseline exists | Existing Google and Vercel analytics |

## Constraints and trade-offs

- **Not optimizing for novelty over evidence.** A striking scene that hides a number's owner loses to a plain one that shows it.
- **Not optimizing for real client screens.** MSK and Army material stays recreated or abstract, which limits how photographic the site can be.
- **Motion budget.** Scroll storytelling is wanted, but every scene must survive failed scroll events, reduced motion and a slow phone.
- **Language.** Spanish ships as a condensed set on some pages. Every copy and fix has to be synced, which slows changes.
- **Per-case accents.** Allowed on artifact plates only. This costs some of the "brand mirror" idea from the earlier riso direction in exchange for consistency.
- **Open and unresolved:** whether the Home work rows use one grid (my recommendation) or keep three; whether the 20% EMR figure is confirmed; where the Mobbin capture archive lives.

## Next

1. Hillary confirms or edits the five principles and the trade-offs.
2. Done: design-scout ran on the peer set (text-only). A rendered motion pass is still open.
3. Break the work into plan chunks with `writing-design-plans`: artifacts first (MSK recording, Logistics diagrams, UX Woman synthesis, Mobbin captures), then the "not done" consistency fixes, then scroll scenes.
