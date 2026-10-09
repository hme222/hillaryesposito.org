# Density Reduction + Progressive Disclosure Strategy

Date: 2026-08-26
Author: design-strategist
Path: B — Reuse/Compose only
Feeds: `design-state.md` → Active Initiative: Density Reduction + Progressive Disclosure Pass

## 0. What this is responding to

Senior UX reviewer: "it feels really busy." Two approved mechanisms: (1) tighten the spacing rhythm, (2) genuinely dense sections collapse by default and expand on request; everything else reveals on scroll instead of arriving all at once. Full-site scope: Home, About, MSK/Grove/Mobbin/Logistics flagships, curated pages, global shell.

**Governing constraint carried forward from prior initiatives (do not regress):** every hiring-critical route must show real product evidence in the first mobile viewport; Home targets ≥65% measured visual coverage, each primary case study ≥60%; Grove's first-viewport truth boundary (`PHASE 2 · NOT A FINISHED SCREEN`, ownership, route) must stay outside any hidden state. "Busy" is being fixed with whitespace and calm, not by hiding the recruiter-scan evidence that four prior passes fought to surface.

## 1. Density audit — concrete hotspots

### 1a. The single biggest offender: MSK's "Why I could see it" chapter
`my-app/src/pages/case-studies/FlagshipMSK.tsx:270-322` (`#msk-systems`)

One unbroken `<section>` stacks, in order: kicker → title → lede → a three-item role rail (`fp-roleRail`, each row already carrying its own `<details>`) → a second three-item grid restating the same Observe/Align/Redesign shape (`fp-systemCards`, lines 297-301) → an ownership paragraph (`fp-ownership`) → an evidence-boundary aside (`rp-note`) → a full lazy-loaded system-map diagram with its own four-item list (`fp-mapWrap` / `MSKSystemMap`). That is eight distinct visual chunks with no section break and no disclosure boundary anywhere except the per-role `<details>`. It is also the only chapter that repeats itself: the role rail's "taught" copy (`Find the workaround` / `Share one failure` / `Sequence the action`, lines 62-66) and the `fp-systemCards` trio (`Observe` / `Align` / `Redesign`, lines 298-300) say the same three-stage story twice in different components back-to-back. This is the one place where the fix is content compression, not just spacing or motion.

### 1b. Grove's research narrative
`my-app/src/pages/case-studies/RisoGrove.tsx:322-376` (`#grove-research`)

Before any accordion appears, this section runs four sub-narratives in sequence with no visual break: split intro → moderated-test subhead+paragraph → survey subhead+paragraph → 4-stat `dl` → evidence-boundary aside → ranked-features subhead + an 11-item ranked list → a pull-quote figure. Everything here is genuine evidence (this is the research-to-decision spine the whole case study is built on), so it is not a disclosure candidate — but it is the longest unbroken read on the site before the reader hits the first `<details>` at line 378, and it would benefit most from staggered scroll-reveal once that motion is reactivated (see §3).

### 1c. Home hero — dense but already correctly weighted, not the top offender
`my-app/src/pages/RisoHome.tsx:190-238`

The hero clearing stacks eyebrow → h1 → proof line → status line → a three-item CTA row, while the media column runs an artifact figure (label + frame + figcaption) beside a headshot. This reads as a lot at a glance, but checking the CSS confirms it is already tuned from the flagship-craft pass: the third hero action (`rp-heroUtility`, `riso-page.css:988`) is a text-weight utility link, not a third filled button, and the headshot carries `.rp-headshot--supporting` (`portfolio-cohesion.css:321`, ~76px on mobile, absolutely positioned as a corner accent) specifically so it doesn't compete with the MSK artifact. This is a spacing-rhythm candidate (tighten the vertical gap between the status line and the CTA row so the clearing reads as one composed block rather than five stacked lines), not a hide-something candidate — this is the first-viewport evidence the whole initiative is protecting.

### 1d. Weekend Dispatch — already the model to copy, not a hotspot
`my-app/src/pages/RisoHome.tsx:321-500`

This section is already collapsed by default (`dispatchOpen` starts `false`) behind a real `aria-expanded`/`aria-controls` button (lines 384-410), and the revealed panel (finding stat, quote, actions, photo collage) only mounts when open (line 420: `{dispatchOpen && ...}`). This is exactly the pattern the brief is asking for elsewhere — flag it as the reference implementation, not something to change.

### 1e. Scroll-reveal infrastructure already exists — and is currently a no-op
`my-app/src/hooks/useFlagshipReveal.ts`, `my-app/src/styles/riso-page.css:684-686`

Every page except Home already tags its evidence blocks with `.rp-reveal` and mounts an `IntersectionObserver` (`useFlagshipReveal`, plus Grove's and `CuratedRolePage`'s own inline observers) that adds `.is-in` when a block scrolls into view. But the CSS rule that would make this visible was neutralized on 2026-08-20 (commit `b71849dd`, bundled into an unrelated feature commit — no design rationale recorded): `.js-reveal .rp-reveal, .js-reveal .rp-reveal.is-in { opacity: 1; transform: none; transition: none; }` makes revealed and not-yet-revealed states pixel-identical. The July 28 version of this rule (commit `c6f1a46`) is what we want back: a real `opacity:0`/`translateY(22px)` → `opacity:1`/`translateY(0)` transition scoped to `.js-reveal` (so a missing observer still fails visible), with `prefers-reduced-motion: reduce` collapsing straight to the static end state. This means the "restrained scroll-reveal for the rest of the content" deliverable is ~90% built already on About, MSK, Mobbin, Logistics, Grove, and every curated page — it needs its CSS restored, not a new pattern invented. Home has zero `.rp-reveal` usage today; see §3 for whether it should get any.

### 1f. Spacing tokens exist but adoption is partial
`my-app/src/styles/portfolio-cohesion.css:9-22`, `my-app/src/styles/riso-page.css` (throughout)

`portfolio-cohesion.css` already promoted the spacing rhythm to tokens (`--sp-gutter` through `--sp-3xl`) with an explicit note that 52 one-off clamp values were consolidated into these. But `riso-page.css` — the larger, older stylesheet — only routes some rules through them. Plenty of repeated "block spacing" rules still hardcode their own rem values instead of consuming a token, e.g. `.rp-subhead { margin: 2.8rem 0 0 }` (`riso-page.css:962`), `.rp-ba { margin-top: 2rem }` (`:585`), `.rp-pushback { margin-top: 2rem }` (`:689`), `.rp-routeRecap { margin-top: 2rem }` (`:3089`). None of these are wrong in isolation, but they're exactly the "nobody perceives 6rem vs 6.5rem, they perceive the rhythm doesn't match" problem the token comment already names — just not yet finished.

## 2. Spacing plan

Do not add a new token tier. `--sp-gutter` … `--sp-3xl` in `portfolio-cohesion.css:16-22` already cover every rhythm this pass needs. The work is (a) tightening two of the existing clamp ceilings slightly and (b) finishing the token adoption `riso-page.css` never completed.

| Change | Where | Before | After | Why |
|---|---|---|---|---|
| Route repeated inline-block spacing onto tokens | `.rp-subhead`, `.rp-ba`, `.rp-pushback`, `.rp-routeRecap`, and the other bespoke `margin-top: 2rem`/`2.8rem` rules in `riso-page.css` | Hardcoded `2rem`/`2.8rem` | `var(--sp-sm)` (`clamp(1.5rem, 4vw, 3rem)`) for the 2rem cases; keep `.rp-subhead` at a value between `--sp-sm` and `--sp-md` since it is a bigger break (new sub-story inside a chapter) than a related-block gap | Finishes the consolidation `portfolio-cohesion.css` already started; a reviewer scanning the page feels one rhythm instead of noticing the seams |
| Tighten the section ceiling | `.rp-section { padding: clamp(2.6rem, 6vw, 4.5rem) 0; }` (`riso-page.css:425`) | ceiling 4.5rem | ceiling 4rem (matches `--sp-lg`) | The biggest single perceived-density lever is how much air surrounds each section; 4rem is still generous (Loewe-level) but removes the extra half-rem that, multiplied across 6-8 sections per case study, adds up to real scroll length without adding calm |
| Tighten related-block gaps inside dense chapters only | MSK `#msk-systems` and Grove `#grove-research` internal gaps (role rail → system cards → ownership → aside) | `2rem`/default | `var(--sp-sm)` between blocks that are part of the same argument; keep `var(--sp-lg)`/`--sp-xl` between the chapter's own sub-sections | Tightening *within* an argument reads as one thought; the existing between-section rhythm (already generous) should not shrink — that's where the Loewe whitespace signal lives |
| Do NOT touch | `--sp-gutter`, `--sp-2xl`, `--sp-3xl`, any hero (`rp-hero`, `rp-clearing`) spacing, `rp-outcomes`/`rp-metagrid` evidence-grid gaps | — | — | These carry the "generous whitespace = luxury" signal per the taste profile; the busy complaint is about mid-page density, not the hero or the proof grids, which are already the calmest parts of the site |

Net effect: the rhythm gets more consistent and slightly tighter mid-page, without any section reading as empty. This is a CSS-only change — no component, dependency, or token-namespace addition, fully within Path B.

## 3. Disclosure plan, hotspot by hotspot

| Hotspot | Recommendation | Reasoning |
|---|---|---|
| MSK `#msk-systems` (`FlagshipMSK.tsx:270-322`) | **Progressive disclosure.** Cut the redundant `fp-systemCards` trio (lines 297-301) — it restates the role rail's own "taught" copy. Keep the role rail, ownership line, and evidence-boundary aside visible (they're each a distinct claim); move the full `MSKSystemMap` diagram + stage list behind a native `<details>` using the exact `rp-deepDive` pattern Grove already has at `RisoGrove.tsx:378` and `:475` (label: "Optional system detail — inspect the full transformation map"). Summary state: role rail + ownership + boundary aside stay visible; the diagram becomes optional depth for a reviewer who wants it. | This is the one chapter that's dense because it's repeating itself, not because it's all necessary. Removing the duplicate card grid alone fixes most of the "busy" feeling here; folding the diagram behind the existing `rp-deepDive` disclosure (already Path-B-compliant, already used twice on Grove) finishes it. |
| Grove `#grove-research` (`RisoGrove.tsx:322-376`) | **Scroll-reveal only, once reactivated (§1e). Leave structure as-is.** | This is the evidentiary spine (moderated test → survey → ranked features → quote) that justifies every later decision. Collapsing any of it risks exactly the regression the brief warns against — hiding evidence a 30-second recruiter scan currently gets for free. Staggering it in on scroll (already tagged `rp-reveal` at `:342`, `:358`, `:369`) reduces the *perceived* wall of content without removing a single word from the default read. |
| Grove optional screen gallery / system-tokens specimen (`RisoGrove.tsx:378-391`, `:475-518`) | **Leave as-is.** | Already exactly this pattern — native `<details>`/`<summary>`, collapsed by default, labeled "Optional artifact set" / "Optional system detail." This is the reference implementation for the rest of the site; no change needed. |
| MSK per-role "method it gave me" (`FlagshipMSK.tsx:283-292`) | **Leave as-is.** | Already a native `<details>`/`<summary>` per role. Correctly scoped: the role/taught line stays visible, the credential explanation is optional depth. |
| Home hero (`RisoHome.tsx:190-238`) | **Leave as-is; spacing only (§2).** | This is the first-viewport evidence the flagship-craft pass fought to establish (MSK artifact + qualified proof line before the fold). Any disclosure here would directly regress the "real evidence in the first mobile viewport" hard gate. Fix the felt density with rhythm, not hiding. |
| Weekend Dispatch (`RisoHome.tsx:321-500`) | **Leave as-is.** | Already collapsed by default behind a real disclosure button; reference implementation alongside Grove's `<details>`. |
| Mobbin, Logistics case studies | **Scroll-reveal only, once reactivated.** No disclosure needed. | Both are already the shortest, leanest flagships (167 and 185 lines respectively) — each section is a single clear beat. They read as calm today; adding a collapse mechanism here would be over-applying the pattern for no scannability gain, which the brief specifically warns against. |
| Curated pages (`CuratedRolePage.tsx`, all sections) | **Scroll-reveal only, once reactivated.** Already tagged `rp-reveal` throughout (`:69`, `:86`, `:105`, `:306`, `:338`, `:387`). No structural change. | Same reasoning as Mobbin/Logistics — these pages are intentionally compact company-mirror pages; disclosure would add friction, not calm. |
| About page chapters (`AboutMe.tsx:214-272`) | **Scroll-reveal only, once reactivated.** Already tagged `rp-reveal` at `:199`, `:215`, `:284`. No structural change. | The DD-023 fix already split these into shorter paragraphs plus a compact evidence ledger; the remaining density is appropriate for a "how I got here" story page a recruiter reads by choice, not the 30-second scan surface. |
| Global shell / nav | **No change.** | Navbar and footer were not flagged as dense in review, and neither shows the stacked-block pattern the other hotspots do. |

**First-viewport risk check:** none of the disclosure recommendations above touch anything currently guaranteed visible in a hiring-critical route's first mobile viewport. The one structural cut (MSK's duplicate system-cards trio) removes a redundant restatement, not evidence — the same "Observe/Align/Redesign" claim survives in the role rail. Nothing here narrows Home's ≥65% or the case studies' ≥60% visual-coverage floor, and Grove's `PHASE 2 · NOT A FINISHED SCREEN` / ownership / route markers are untouched (they sit in the hero, outside every disclosure named here).

## 4. Sequencing

1. **design-lead — spacing tokens/rules.** Finish routing `riso-page.css`'s hardcoded block-spacing rules onto the existing `--sp-*` scale; apply the `.rp-section` ceiling tightening (§2) globally in one pass. This is the lowest-risk, highest-leverage change and should land first so the disclosure/motion work is built on the corrected rhythm, not the old one.
2. **motion-designer — scroll-reveal choreography.** Restore the pre-2026-08-20 `.js-reveal .rp-reveal` transition (opacity + translateY, `prefers-reduced-motion` → static end state, fails visible with no observer). Decide staggering (per-block delay vs. uniform) for the dense multi-block sections named in §1b/§3, and decide whether Home's below-the-fold sections (Proof stats, Selected Work, Mini About — never the hero or Weekend Dispatch) should gain `.rp-reveal` for the first time, since Home currently has none. Verify against `prefers-reduced-motion`, Save-Data, and the existing 34-42 test focused suites before this ships.
3. **interaction-design — MSK disclosure toggle.** Convert the MSK system-map block to the `rp-deepDive` `<details>` pattern (copy Grove's exact markup/labels at `RisoGrove.tsx:378-391`), write the summary copy ("Optional system detail — inspect the full transformation map"), and confirm the redundant `fp-systemCards` removal doesn't orphan any test or copy reference (`FlagshipCaseStudies.a11y.test.tsx` currently exercises MSK's `<details>` — check it still passes with one more).

## Handoff summary

**design-lead:** The single biggest density offender is MSK's "Why I could see it" chapter (`FlagshipMSK.tsx:270-322`) — it stacks eight evidence blocks with zero disclosure boundary and actually repeats itself (the role rail and the `fp-systemCards` trio tell the same Observe/Align/Redesign story twice back to back). My top disclosure recommendation is to cut that redundant card grid and fold the full system-map diagram behind the exact `rp-deepDive` `<details>` pattern Grove already uses twice — no new component. Bigger win than either: the site already has scroll-reveal infrastructure fully wired (`useFlagshipReveal` + `.rp-reveal` tags on nearly every page except Home) but the CSS that makes it visible was silently neutralized in commit `b71849dd` on 2026-08-20 — restoring ~3 lines of CSS reactivates restrained scroll-reveal site-wide for free. No concern about the first-viewport-evidence constraint: nothing here touches Home's hero, Grove's `PHASE 2` truth boundary, or any of the four hiring-critical routes' first-viewport coverage floors — the one structural cut removes a duplicate, not evidence.

## Design-lead implementation notes — 2026-08-27

Scope: §2 spacing-token migration + `.rp-section` ceiling tightening, plus the §2/§3 related-block gap tightening inside MSK `#msk-systems` and Grove `#grove-research`. No disclosure/content changes made (that stays interaction-design's item, per §4.1's own scope note) and no motion changes made (motion-designer's item).

### Changes — `my-app/src/styles/riso-page.css`

| Rule | Old | New |
|---|---|---|
| `.rp-section` (:425) | `padding: clamp(2.6rem, 6vw, 4.5rem) 0;` | `padding: clamp(2.6rem, 6vw, 4rem) 0;` — checked `--sp-lg` first; its ceiling is `5rem`, not `4rem`, so it doesn't match exactly and the literal clamp stays, per the instruction's fallback rule. |
| `.rp-route` (:562) | `margin: 2rem 0 0;` | `margin: var(--sp-sm) 0 0;` |
| `.rp-ba` (:585) | `margin-top: 2rem;` | `margin-top: var(--sp-sm);` |
| `.rp-pushback` (:689) | `margin-top: 2rem;` | `margin-top: var(--sp-sm);` |
| `.rp-subhead` (:962) | `margin: 2.8rem 0 0;` | `margin: clamp(1.75rem, 4.25vw, 3.25rem) 0 0;` — a literal clamp between `--sp-sm` (floor 1.5rem/ceiling 3rem) and `--sp-md` (floor 2rem/ceiling 4rem) on every axis, per the instruction's "no new token tier" fallback. |
| `.rp-routeRecap` (:3089) | `margin-top: 2rem;` | `margin-top: var(--sp-sm);` |
| `.rp-routeVerdict` (:3104) | `margin: 2rem 0 0;` | `margin: var(--sp-sm) 0 0;` |
| `.rp-quoteCard` (:3171) | `margin: 2.4rem 0 0;` | `margin: var(--sp-sm) 0 0;` — this class is used only inside Grove's `#grove-research` pull-quote, so this is the §3 chapter-gap tightening, not §2's literal-2rem routing. |

Left alone (as instructed): `.rp-outcomes` (`:600`, evidence-grid margin), `rp-quoteCard`/`rp-testimonial`/`rp-nowReading`/`rp-bridge` values that weren't exactly the `2rem`/`2.8rem` pattern and read as deliberately tuned (2.2rem, 1.8rem, 1.6rem), and every already-tight related-block gap already under `--sp-sm`'s floor (`.rp-split` 1.6rem, `.rp-surveyStats`/`.rp-rank` 1.4rem, `.fp-roleRail` 1.8rem) — routing those to the token would have made them *larger*, not tighter.

### Changes — `my-app/src/styles/flagship-case-study.css` (MSK `#msk-systems` chapter gaps, §3)

| Rule | Old | New |
|---|---|---|
| `.fp-systemCards, .fp-reflections` (:395) | `margin-top: 2rem;` | `margin-top: var(--sp-sm);` |
| `.fp-mapWrap` (:413) | `margin-top: 2.5rem;` | `margin-top: var(--sp-sm);` |
| `.fp-ownership` (:426) | `margin: 2.4rem 0 0;` | `margin: var(--sp-sm) 0 0;` |

`.fp-ownership` is also used on Logistics (`FlagshipLogistics.tsx:153`), so that page's spacing tightens too as a side effect of sharing the class — not excluded by the brief and consistent with finishing the token migration.

### A finding worth flagging before this ships further

`--sp-sm` is `clamp(1.5rem, 4vw, 3rem)`. At mobile/tablet widths it is at or below every flat `2rem`/`2.4rem`/`2.5rem` value it replaced, so those breakpoints get genuinely tighter, as intended. But its ceiling (`3rem` = 48px) is *larger* than several of the flat values it replaced once the viewport clears ~1200px, where the clamp pins at its cap. Measured at 1440px (via `getComputedStyle`, before → after):

- `.fp-pushback` / `.rp-routeVerdict`: 32px → 48px
- `.fp-quoteCard`: 38.4px → 48px
- `.fp-ownership`: 38.4px → 48px
- `.fp-mapWrap`: 40px → 48px
- `.fp-systemCards`: 32px → 48px
- `.rp-subhead`: 44.8px → 52px

So at the 1440px width this pass was asked to verify at, the individual related-block gaps inside MSK's `#msk-systems` chapter got 8–16px *larger*, not smaller — the token substitution is exactly what §2's table specified (this was the pre-approved, documented value), but "tighten to `--sp-sm`" and "smaller at desktop" are not the same thing for these particular rules. The net page-length effect is still a reduction, because `.rp-section`'s ceiling cut (-8px per section edge, compounding across 6-8 sections per case study) outweighs the internal growth, and mobile/tablet — where most of this site's hiring-critical scanning happens — gets uniformly tighter. But a reviewer scrutinizing MSK specifically at 1440px should not expect its *internal* chapter rhythm to look tighter from this pass alone; that chapter's actual density fix is the pending disclosure conversion (interaction-design's item 3), not this spacing pass. Flagging this now rather than letting the screenshot check silently fail to show what it was asked to show.

### Verification

- **Tests:** `CI=true npx react-scripts test --watchAll=false` — 6 suites, 77 tests, all passing, no changes needed to any test.
- **Computed-style before/after check:** confirmed via `getComputedStyle` in the live dev server (see table above) rather than visual diffing for the deep-scrolled sections — the Browser-pane tool could not reliably composite a frame after scrolling past roughly one viewport height on this page in this session (a known limitation: scroll/IntersectionObserver events don't reliably fire/paint in this automated tab). Home's hero (top of page, no scroll required) screenshot-verified directly before and after — pixel-identical, as expected, since nothing in `RisoHome.tsx:190-238` or its CSS was touched.
- **Dark mode:** toggled on Home; `--sp-sm` resolves identically in dark mode (custom properties aren't theme-scoped), and the dark-panel color rules (`.rp-override`, `.fp-ownership`, etc.) are untouched by this pass since only margin/padding values changed. No visual regression on the toggle.

## Motion-designer implementation notes — 2026-08-27

Scope: §4.2 — restore scroll-reveal motion, close the original blank-page gap for good, choreograph the two dense multi-block sections, decide Home.

### What actually caused the original blank-page bug (and why it's already half-fixed)

Grepped `js-reveal` across `my-app/src`. It's added in exactly three places, all JS, all only after an observer is confirmed running: `useFlagshipReveal.ts:10` (used by MSK, Logistics, Mobbin, About), and Grove's and `CuratedRolePage`'s own inline `useEffect` observers (`RisoGrove.tsx:188`, `CuratedRolePage.tsx:175`).

The real story, from `git log`: the blank-page bug was never really about the CSS rule being unscoped in the abstract — it was **About shipping `rp-reveal` classes without ever wiring an observer to them at all** (commit `c6f1a46`, 2026-07-28, "Fix blank sections on About... My bug, shipped an hour ago"). That commit's own fix is exactly the `.js-reveal`-scoped rule the brief describes wanting back: hidden state only switches on once `.js-reveal` is present, so a page that forgets to mount an observer (or a reader whose JS never runs) just sees static content, no animation, no blank page. That fix already closed the original gap.

`b71849dd` on 2026-08-20 didn't reopen that gap on purpose — it flattened the whole rule (revealed and not-yet-revealed made pixel-identical) inside an unrelated feature commit, with no rationale recorded. It threw out the motion along with nothing actually broken. So "restore the motion, keep the fix" is the correct frame, and that's what I did — I did not find a second, undiscovered root cause; `c6f1a46`'s scoping already was the right fix, it just needed its transition restored on top.

**One real residual gap I did find and closed anyway:** the `.js-reveal`-scoped rule protects against "no observer ever ran," but nothing protected against "observer ran but never called `.observe()` on this specific block" — e.g. a future page adds `.rp-reveal` to something rendered after the hook's initial `querySelectorAll` pass (I checked: nothing in the current codebase actually does this today — `GroveScreenGallery`'s `.rp-reveal` root sits inside a `<details>`, present in the DOM at mount even when collapsed, so it's still caught by the initial pass; MSK's lazy-loaded `MSKSystemMap` itself isn't `rp-reveal`-tagged, only its static `fp-mapWrap` wrapper is). Since this is a real class of future mistake, not a hypothetical, I added a CSS-only failsafe rather than relying on "don't do that."

### The fail-visible mechanism

`riso-page.css:684-720` (replacing the flattened rule):

```css
.js-reveal .rp-reveal {
  opacity: 0;
  transform: translateY(22px);
  transition: opacity .7s ease, transform .7s cubic-bezier(.2,.8,.2,1);
  transition-delay: var(--rp-reveal-stagger, 0ms);
  animation: rp-reveal-failsafe 1ms linear 2s forwards;
}
.js-reveal .rp-reveal.is-in { opacity: 1; transform: none; animation: none; }
@keyframes rp-reveal-failsafe { to { opacity: 1; transform: none; } }
@media (prefers-reduced-motion: reduce) {
  .js-reveal .rp-reveal { opacity: 1; transform: none; transition: none; animation: none; }
}
```

Two independent layers, both fail toward visible:

1. **Scoping** (restored from `c6f1a46`, unchanged in approach): the hidden state only exists under `.js-reveal`. No JS, a failed bundle, a hook that never mounts, an observer that throws before it adds the class — `.rp-reveal` matches no rule and the element is simply visible. This is what actually fixed the original About bug and I kept it as the primary defense, not a new invention.
2. **New: `animation: rp-reveal-failsafe … 2s forwards`** — belt-and-suspenders for the narrower case where `.js-reveal` *is* present (observer confirmed running) but a specific block's `.is-in` never arrives (never `observe()`'d, observer errors mid-loop, IO throws on that one target). Any `.rp-reveal` under `.js-reveal` snaps to the visible end state on its own 2s after mount, no JS required past initial paint. `.is-in` sets `animation: none` so the real transition always wins the race when it fires first — the failsafe only ever matters when nothing else did the job.

Chosen 2s per the brief's suggested "~1-2s" range, at the top of it. Known, accepted tradeoff: a reader who lingers on an earlier section for more than 2 seconds before scrolling to a lower block will see that block simply present (no fade-in) when they arrive, rather than watching it animate in — the failsafe can't distinguish "legitimately hasn't been scrolled to yet" from "genuinely broken," so it treats both the same after the window. That's the correct tradeoff per the brief's own invariant ("unstyled-but-visible is the acceptable floor, permanently blank is not") — it costs an animation for slow readers on rare/broken pages, never the content.

I did not add a manual "check if already in viewport on mount" step to `useFlagshipReveal` — verified this is unnecessary: `IntersectionObserver` reports each target's *current* intersection state as soon as `observe()` is called (spec behavior), so above-the-fold blocks already get `.is-in` within a frame of mount without any extra code. Confirmed this is the existing hook's actual behavior, not an assumption.

### Stagger choreography

MSK `#msk-systems` (`FlagshipMSK.tsx:270-322`) and Grove `#grove-research` (`RisoGrove.tsx:322-376`) each get a 90ms-increment stagger via an inline `--rp-reveal-stagger` custom property per block (read by `transition-delay: var(--rp-reveal-stagger, 0ms)` in the CSS above — every other `.rp-reveal` on the site defaults to 0ms/no stagger, unaffected):

- MSK: `fp-roleRail` 0ms → `fp-systemCards` 90ms → `fp-ownership` 180ms → evidence-boundary `aside` 270ms → `fp-mapWrap` 360ms (newly tagged `rp-reveal` — it wasn't before; it's the last visual chunk in the chapter and belongs in the same arriving sequence as everything above it. Note for interaction-design: when `fp-mapWrap` moves behind the `rp-deepDive` `<details>` per §3, the `rp-reveal` class is harmless to leave on it — collapsed `<details>` content just won't be visible to intersect until opened — but it's also fine to drop if it reads as redundant once collapsed by default).
- Grove: `rp-split` intro 0ms → `rp-surveyStats` 90ms → evidence-boundary `aside` 180ms → `rp-rank` 270ms → `rp-quoteCard` 360ms.

90ms sits inside the brief's 80-120ms guidance. Five blocks × 90ms = 400ms total stagger span; each block's own transition is still 0.7s, so the chapter's slowest-arriving block finishes at ~1.1s after it starts intersecting — that's the aggregate choreography length for the section as a whole, not any single element's duration, consistent with "complex choreography" territory rather than a per-element violation. Chose not to compress the individual 0.7s transition shorter for these two sections specifically, to keep one consistent reveal speed site-wide rather than a special-cased faster curve just for the dense chapters — restrained means "don't invent a second motion language," not "make it visibly snappier here."

### Home decision

Home had zero `.rp-reveal` usage and no reveal-observer infrastructure at all. Wired it up exactly like every other page: added `useFlagshipReveal(rootRef)` with `rootRef` on the `<main className="riso-page riso-home">` element (`RisoHome.tsx`), same pattern as `FlagshipMSK.tsx`/`AboutMe.tsx`.

Tagged three sections `rp-reveal`, single-shot (no stagger — each is one block, not a dense cluster):
- Proof stats (`.rp-outcomes`, `#home-proof-title`)
- Selected Work (`.rp-worklist`, `#projects`)
- Mini About (`.rp-aboutBlock`, `#about`)

Left untouched, deliberately:
- **Hero** (`RisoHome.tsx:190-238`) — off-limits per the brief, and correctly so: this is the first-viewport hiring-critical evidence, it should never be gated behind scroll-intersection state of any kind, including a 0.7s fade that could theoretically delay first paint of the MSK artifact for a split second on a slow device.
- **Weekend Dispatch** — off-limits per the brief; it already has its own bespoke train/route motion sequence layered on top of a disclosure toggle, and stacking a generic scroll-reveal fade underneath that would be two motion systems fighting over the same real estate.
- **Contact/CTA section** (`#contact`) — not named as a candidate in the brief's list, and I left it alone on purpose: the code comment right above it says "the recruiter path resolves before secondary journal/about material" — this is the one place on Home where a design goal (immediate legibility of the contact CTA, no motion gate at all, however brief) outweighs the calm-arrival benefit reveal gives everywhere else. Flagging the reasoning rather than silently including or excluding it.

### Verification

- **Tests:** `CI=true npx react-scripts test --watchAll=false` — 6 suites, 77 tests, all passing (matches design-lead's baseline), no test changes needed.
- **TypeScript:** `npx tsc --noEmit` clean on the touched files and project-wide.
- **Fail-visible invariant, isolated:** synthetic in-page test (inserted a fresh `.rp-reveal` under a detached `.js-reveal` host and read `getComputedStyle` synchronously, no round-trip delay) — confirms the true pre-reveal state is `opacity: 0`/`translateY(22px)` under `.js-reveal`, and confirms an `.rp-reveal` with **no** `.js-reveal` ancestor computes `opacity: 1` immediately. This directly proves the core invariant independent of any observer timing.
- **Failsafe timer, live:** on `/case-study/msk`, sampled a below-the-fold block (`#msk-systems .fp-ownership`, ~40,900px down the page, never scrolled to) well past 2s after load — `opacity: 1`, `is-in` still `false`. Confirms the animation-based failsafe fires independent of scroll/intersection, which also happens to be a faithful real-world test of "observer never fires for this block" — this session's Browser pane doesn't reliably dispatch `IntersectionObserver` callbacks on scroll (documented tool limitation), so every `.rp-reveal` element on every page tested this session was, in effect, exercising the failsafe path rather than the real intersection path. Everything stayed visible throughout — no blank content anywhere, on any page, at any point in the session.
- **Stagger values, live:** confirmed via `getComputedStyle(...).transitionDelay` on MSK (`0s, 0.09s, 0.18s, 0.27s, 0.36s` across the five `#msk-systems` blocks in order) — matches the intended 90ms increments exactly.
- **Home wiring, live:** confirmed `<main class="riso-page riso-home js-reveal">` and exactly three `.rp-reveal` targets (`rp-outcomes`, `rp-worklist`, `rp-aboutBlock`) — hero and Weekend Dispatch confirmed clean via `grep` (zero `rp-reveal` in `RisoHome.tsx:190-238` or the dispatch section).
- **`prefers-reduced-motion`:** verified by source inspection only — this session's Browser pane has no control to force the OS-level media feature, so the reduced-motion branch (`opacity: 1; transform: none; transition: none; animation: none`) could not be exercised live. It's the same collapse-to-static-end-state pattern already shipped and verified in `c6f1a46`, now additionally covering the failsafe `animation` property so a reduced-motion reader never sees a 2s-delayed animation snap either — flagging this as unverified-live for whoever reviews next, not asserting it as tested.

### Handoff to interaction-design

**motion-designer → interaction-design:** Scroll-reveal is safe to build on top of now — every `.rp-reveal` block on the site, including the ones you're about to touch in `#msk-systems`, fails visible under every failure mode I could construct (no JS, no observer, observer that never calls `observe()` on a block, observer that fires but never resolves) and I verified that live, not just by reading the CSS. Two things to know before you convert `fp-mapWrap` to the `rp-deepDive` `<details>` pattern: (1) I tagged `fp-mapWrap` with `rp-reveal` and gave it a 360ms stagger delay as the last block in the chapter's reveal sequence — leave the class on it when you wrap it in `<details>`, it's harmless collapsed and costs nothing; (2) if you remove the `fp-systemCards` trio per §3, delete its `rp-reveal`/`--rp-reveal-stagger` markup with it and you may want to tighten the remaining stagger gaps (`fp-roleRail` 0ms → `fp-ownership` 180ms would leave an odd 180ms jump where `fp-systemCards`'s 90ms used to sit) — not required, but a clean sequence is one less thing for the next person to puzzle over.

## Motion-designer fix: reveal timing — 2026-08-27

The owner checked the live dev server herself after the pass above shipped and reported "I don't see a change." She was right, and the previous verification section above was the mistake: it measured a below-the-fold block's `opacity` at a single arbitrary point ~40,900px down the page, well past 2s — which only ever proves the failsafe fires, not that the real scroll-triggered fade-in still plays at realistic reading pace. It didn't.

### Root cause

The failsafe (`riso-page.css`, `.js-reveal .rp-reveal`) was `animation: rp-reveal-failsafe 1ms linear 2s forwards`. `animation-delay` counts from when the animation is created — i.e., from element mount / page load — not from anything scroll-related. Any reader who spends more than ~2s on the hero or an earlier section before scrolling (completely normal) has every below-the-fold `.rp-reveal` block already snapped to `.is-in`-equivalent visibility by the failsafe *before they ever scroll to it*. The intended fade-in-on-scroll became a no-op at realistic reading pace — not an edge case, the whole effect. My previous pass's own code comment named this exact tradeoff ("if the reader pauses on an earlier section for more than 2s before scrolling") but underestimated how often 2s is exceeded in practice; the owner's real-world check confirmed it costs the entire effect, not a rare case.

### The fix

Root architectural change, in `my-app/src/hooks/useFlagshipReveal.ts`: the failsafe is now armed by **scroll proximity, not by mount time**. A second, much wider-band `IntersectionObserver` (`rootMargin: "0px 0px 40% 0px"`) fires when a block is actually *approaching* the viewport; only then does a short 2.2s countdown start (`window.setTimeout`), and only if the real reveal observer hasn't already fired for that element first (the timer is cleared the moment real `.is-in` lands). A block nowhere near the viewport never has its countdown armed at all, however long the reader dwells upstream — this is the exact behavior the bug report asked for: "an observer that's actually broken/never mounted still guarantees visibility within a few seconds of THAT FAILURE, not within a few seconds of PAGE LOAD."

This is Option 1 from the brief, with one refinement: a plain per-element `setTimeout` armed at `observe()` time (called synchronously for every element in one loop at mount) would have had the *identical* mount-relative timing bug just with a bigger number, since `observe()` happens at effectively the same instant for every element present at mount. Arming the countdown from a second, wider-margin observer's callback instead of from `observe()` time is what actually decouples the failsafe from "time since page load" and ties it to "time since this specific block got close."

The CSS-level failsafe (`animation: rp-reveal-failsafe … forwards`) stays, but is now a last-resort backstop only, bumped from 2s to 12s, for the one case JS proximity-timers structurally can't cover: a block that never gets `observe()` called on it by *either* observer (e.g., a future page adds `.rp-reveal` to something rendered after the initial `querySelectorAll` pass runs). No current page does this. Real content never reaches this 12s window — it resolves via the two JS observers well before that — so it doesn't reintroduce the reported bug; it's dormant insurance for a mistake that hasn't happened yet, not the mechanism doing the day-to-day work.

**Consistency across call sites:** extracted the whole mechanism into one function, `wireRevealObservers(root: HTMLElement)`, exported from `useFlagshipReveal.ts`. `useFlagshipReveal` (MSK, Mobbin, Logistics, About) now just calls it inside its existing `useEffect`. Grove's and CuratedRolePage's own inline observer effects (`RisoGrove.tsx`, `CuratedRolePage.tsx`) now call the same shared function instead of duplicating the observer setup — same fix, one place, applies identically everywhere `.rp-reveal` is used. I kept each site's own `useEffect` dependency array as-is rather than routing them through the `useFlagshipReveal` hook itself: Grove's stays `[]` (single case study, mounted once) and CuratedRolePage's stays `[slug]` (one component reused across curated pages — content under `.riso-page` actually changes per slug and needs re-observing, which the hook's `[rootRef]` dependency wouldn't re-trigger since the ref's identity doesn't change between curated-page navigations).

### Verification

- **Tests:** `CI=true npx react-scripts test --watchAll=false` — 7 suites, 84 tests, all passing (6 new, in a new `useFlagshipReveal.timing.test.ts`; the pre-existing 78 unaffected).
- **TypeScript:** `npx tsc --noEmit` clean. **Production build:** `CI=true npx react-scripts build` compiles with no warnings.
- **The real timing fix, verified deterministically:** live browser measurement turned out to be untrustworthy in this session's automated preview tab — `window.innerHeight` reported `0` and `element.getAnimations()[…].currentTime` reported `0` on every independent read spaced seconds apart, meaning the tab's rendering/animation timeline isn't actually ticking (consistent with the project's known "IO/rAF/scroll don't reliably fire in the automated tab" limitation). An isolated synthetic-element check (a detached `.rp-reveal` under `.js-reveal`, no page rendering involved) did correctly confirm the CSS cascade itself: `opacity: 0`, `transform: translateY(22px)`, `animation-delay: 12s`, matching source exactly — so the CSS is right, but I could not get a trustworthy *live, in-page* read of the timing behavior from the browser tool, and I'm saying so plainly rather than asserting a browser verification that didn't actually hold up.

  Instead I verified the timing logic itself deterministically: `my-app/src/hooks/useFlagshipReveal.timing.test.ts` mocks `IntersectionObserver` and uses Jest fake timers to drive `wireRevealObservers` directly, with full control over when each observer "fires." Six cases, all passing:
  1. A block with **neither** observer ever firing stays hidden after 8 simulated seconds — directly reproduces and disproves the reported bug (the old code would have revealed this at 2s regardless).
  2. A real intersection reveals immediately, independent of any timer.
  3. The failsafe does **not** arm during 6s of no approach, **then** arms the instant the approach observer fires, stays hidden at 2.1s after that, and reveals at 2.3s after that — proving the countdown starts at approach, not at mount.
  4. A real intersection landing after the approach-armed timer already started cancels that timer cleanly (no stray reveal, no timer errors).
  5. No `IntersectionObserver` support → reveals everything immediately.
  6. A throwing `IntersectionObserver` constructor → reveals everything immediately (the new `try/catch`).

- **`prefers-reduced-motion`:** unchanged by this pass — the existing `@media (prefers-reduced-motion: reduce) { .js-reveal .rp-reveal { opacity: 1; transform: none; transition: none; animation: none; } }` block was not touched, and it collapses to the static end state unconditionally regardless of what the JS observers do (CSS wins outright, so the new proximity timer has no effect on the reduced-motion path). As with the previous pass, I could not exercise this branch live (no control to force the OS-level media feature in this session's tooling) — verified by source inspection only, flagging this as unverified-live rather than asserting it.

**Honest caveat:** I'm confident in the fix's *logic* — the deterministic mocked-observer test exercises the exact failure mode the owner hit and proves the new code doesn't have it. I'm not able to additionally confirm with a real scroll in a real browser this session, because this tab's rendering pipeline doesn't appear to be ticking (animation timeline frozen at `currentTime: 0` across independent reads). If there's any doubt left, the fastest real-world check is simply: open the live dev server, wait ~5 seconds on the hero without touching the scrollbar, then scroll — a below-the-fold block like `.rp-outcomes` on Home should still fade up as you reach it, not already be sitting there fully visible.

## Design-lead: hero sleekness pass (owner override) — 2026-08-27

Scope: the owner reviewed the live site herself and overrode §3's "leave the Home hero as-is, spacing only" call — "it's too busy, I need a solution that makes it sleek." This section is that fix: real cuts to the hero, not just tightened margins, while keeping the hard constraint the prior four first-viewport initiatives fought for intact.

### What the hero had, and why it was busy

At 1440px, one screen, no scroll, the hero stacked: nav → a floating annotation card (kicker "Implemented healthcare workflow" + headline "One filing queue replaced a four-system workaround." with a coral left border, positioned over the artifact) → the text column (eyebrow, h1, proof paragraph, status, CTAs) → an artifact figure whose own internal chrome was *itself* five stacked chunks: an eyebrow caption + a separate role-view pill badge, a title + timestamp row, a 3-tab filter row (`aria-hidden`, purely decorative), a 5-row data table, an always-open MRN/EMR glossary block, and a "Rule: …" conditional-logic callout. That's roughly ten distinct visual chunks in one screen, several restating the same claim (the floating card's "four-system workaround" sentence vs. the artifact's own title vs. Selected Work's `home.proj.msk.title` lower on the page, all the same line).

### What I cut, and why each one was safe to cut

All of the artifact-internal cuts are new props on the *shared* `MSKDashboardMockup` component (`my-app/src/components/MSKDashboardMockup.tsx`), defaulting to the previous behavior. Home is the only caller that passes them — `FlagshipMSK.tsx` (both call sites) and `CuratedRolePage.tsx` render exactly as before. Nothing here touches the case-study or curated-page views.

1. **Floating annotation card — removed entirely.** It was telling the same story as the text column in a second visual register (a bordered card competing with the artifact for attention). This is also a direct taste-profile anti-pattern from the MSK paper-detour rejection: *"visual craft means editing, scale, typography, and breathing room — not another concept layered around it."* The card's own sentence ("one filing queue replaced a four-system workaround") was the sharpest, most concrete claim on the page, so rather than deleting it outright I folded it into the proof paragraph's lead clause (`i18n/strings.ts`, `home.riso.heroLead`/`heroProof`, en + es) — one flowing sentence now carries the mechanism *and* the qualified outcome (the 20% EMR-cost stat), stated once. Phrasing was iterated specifically to hold the mobile line count (see the mobile section below) rather than just "merged and hoped."
2. **Table: 5 rows → 3 representative rows (desktop/tablet).** New `rowIndices` prop; Home passes `[0, 2, 4]` — one row per status (ready-to-send, needs-review, filed-to-chart), the exact "one per status" shape the brief suggested. `FlagshipMSK`'s decision-trace section (`DECISION_ROW = [0,4,2,3]`) still indexes into the *full* row array by position, so it was left untouched by defaulting `rowIndices` to `undefined` → render everything.
3. **Badge/pill row consolidated.** The eyebrow caption ("Anonymized internal tool concept") and the role-view pill ("Office Coordinator view") were two separately-chromed elements for one idea. New `condensedHeader` prop folds them into one plain caption line ("Anonymized internal tool concept · Office Coordinator view"), title and timestamp sharing the row beneath. First attempt kept the standard two-column topbar layout and just swapped the text — the combined caption got squeezed into half the card's width and wrapped ugly; fixed by stacking the caption full-width above a title/timestamp row instead (see `.msk-dashboard-mockup__topbar--condensed` in `App.css`).
4. **Toolbar (3 filter tabs) — hidden on Home** (`hideToolbar`). It was already `aria-hidden="true"` — no real filtering happens in this static mockup, so screen-reader users lost nothing; sighted hero viewers lose one decorative row. Case studies keep it for texture on the fuller read.
5. **MRN/EMR glossary — closed-by-default native disclosure**, not deleted (`legendDisclosure`). Same two definitions, now behind a `<details>/<summary>` scoped to the mockup card's own visual language (not the page-level `rp-deepDive`, which is a full-bleed section treatment that would have looked oversized inside a small hero card — same *interaction pattern*, native `<details>`, just its own compact CSS). Additionally, every row's "MRN" label is now wrapped in `<abbr title={copy.mrnDef}>` (`.msk-dashboard-mockup__mrn abbr`, dotted underline) so the term stays identifiable to a screen reader — and to a sighted hover — even with the full glossary collapsed. This addresses the brief's explicit accessibility bar directly: the term is never bare-acronym-only.
6. **"Rule: …" conditional-logic callout — hidden on Home** (`hideRule`). It explains *why* the action button is conditional; that's real product thinking but it's internal business logic, not primary evidence a 5-second scan needs. Kept on the full case-study render.

### The mobile fix that mattered most

Cutting the artifact wasn't enough by itself — Home's mobile hero puts the *entire* artifact **above** the text column (`.riso-home .rp-hero__media { order: -1; }`, a pre-existing, deliberate "evidence first" choice, not something I introduced). That means every pixel of artifact height pushes the primary CTA down before the reader even reaches it. Measured live at 390×844 partway through this pass: the primary CTA's bottom edge landed at **y≈908**, entirely below the 844px fold — a direct violation of the hard constraint, caused by (a) the pre-existing mobile ordering, compounded by (b) my first draft of the folded proof sentence being long enough to wrap to 5 lines instead of 4.

Root-caused with live `getBoundingClientRect()` measurements rather than guessing, then fixed with several small, verified cuts together:
- Rephrased the proof paragraph (several candidates tested live via DOM swap before touching source) to hold **4 lines at 390px**, not 5 — same content, tighter construction. This alone recovered ~26px.
- Found and fixed a real, pre-existing bug while investigating: `.home-heroArtifact__frame { max-height: 235px; overflow: hidden; }` on mobile was already *silently clipping* the artifact — even before my changes, denser content than 235px/`scale(.82)` could show was simply being cut off with no scroll affordance, which (post my other cuts) meant row 3 and the MRN/EMR disclosure toggle sat invisible-but-still-focusable behind the clip. Rather than ship a fixed cap that still clips, I hid the third table row on the narrowest viewports only (`.home-heroArtifact__frame .msk-dashboard-mockup__row:nth-child(4) { display: none; }`, CSS — removes it from the accessibility tree too, so nothing is focusable-but-invisible) and raised the cap to `242px` at a slightly smaller `scale(.74)` so the remaining two rows and the collapsed disclosure render **completely**, un-clipped. Two rows on the narrowest phones, three from tablet width up (and everywhere in the DOM for anything that queries `copy.rows` directly).
- Tightened several mobile-only, Home-scoped spacing rules that were pure vertical cost with no corresponding "generous whitespace = luxury" payoff, given the artifact now sits *above* all of it: `.riso-home` at the existing 768px breakpoint gets tighter `rp-hero__content`/`rp-clearing` top padding, tighter `rp-h1`/`rp-heroProof`/`rp-status`/`rp-hero__ctas` margins, and a smaller `home-heroProofStack` bottom padding. None of these touch any other page's hero spacing — every rule is scoped under `.riso-home`.

Final measured result at 390×844 (English, light mode): primary CTA (`Review the MSK workflow →`) spans **y=781–825**, fully inside the 844px viewport with 19px of clearance. Spanish renders an even shorter h1 (3 lines vs. English's 4), so its CTA sits with more room still.

### First-viewport constraint, confirmed by name

**At 390px, no scroll, no interaction:** nav → artifact (condensed caption, "My filing queue" title, 2 status rows with color-coded badges and action buttons, collapsed MRN/EMR disclosure) + headshot corner accent → credential/eyebrow line ("Healthcare Product Designer · 13+ years in healthcare") → h1 → proof paragraph (mechanism + the 20% qualified outcome, bolded) → status line → **primary CTA, fully visible**. Every element the hard constraint names — core artifact, qualified outcome, one credential line, one primary CTA — is there with zero scrolling and zero interaction. Answering the brief's own test directly: yes, a recruiter who never scrolls or clicks still sees the MSK proof in about five seconds.

**At 1440px, no scroll:** nav → text column (eyebrow, h1, folded proof paragraph, status, both CTAs) → artifact (condensed caption, title, all 3 status rows, collapsed disclosure) → headshot → **and the credential trust strip below the hero is also visible with no scroll**, which wasn't true of every element before this pass.

### What was deliberately left alone

- The hero's own `rp-hero`/`rp-clearing` desktop spacing (§2's protected list) — untouched.
- `FlagshipMSK.tsx`'s two `MSKDashboardMockup` call sites and `CuratedRolePage.tsx`'s call site — all render with every new prop at its default (previous) value: full 5 rows, standard two-column topbar, visible toolbar, always-open legend, visible rule callout. Verified by reading the call sites, not assumed.
- The `.riso-home .rp-hero__media { order: -1; min-height: 330px; max-height: 380px; }` mobile-first-media pattern itself — pre-existing, deliberate "evidence first" design intent from an earlier pass. I worked within it rather than removing it; removing it would change the mobile reading order (text before artifact), which is a bigger call than this pass's brief authorized.

### Verification

- **Tests:** `CI=true npx react-scripts test --watchAll=false` — 7 suites, **84 tests, all passing**, no test changes needed (no existing test referenced the floating card, the 5-row assumption, or Home-specific hero markup).
- **TypeScript:** `npx tsc --noEmit` — clean.
- **Production build:** `CI=true npx react-scripts build` — compiles successfully, no warnings.
- **Screenshots:** captured live in this session's Browser pane at 1440×900 and 390×844, in both light and dark mode, and in English and Spanish (8 states total) — visually confirmed card removal, row/toolbar/rule/legend cuts, condensed header, and full mobile CTA visibility in every state. I don't have a mechanism in this environment to export those captures as standalone files with paths (the Browser pane tool renders inline; it doesn't write to disk) — flagging that plainly rather than claiming file paths that don't exist. In place of image files, every load-bearing claim above (CTA position, row count, line count, wrap behavior) is backed by a live `getBoundingClientRect()`/`getComputedStyle()` measurement taken in the same session, which is more falsifiable than a static image would be.
- **Dark mode:** toggled live on both breakpoints — artifact status-badge colors, coral CTA, and disclosure toggle all render correctly; no regression.
- **Spanish locale:** toggled live on both breakpoints — hero copy, disclosure summary label (English — the artifact mock has been English-only regardless of site language since before this pass, across every page that uses it; not something this pass introduced or was asked to fix), and CTA all render correctly; Spanish's shorter h1 gives the mobile CTA even more clearance than English.
- **Keyboard/screen-reader access:** the MRN/EMR disclosure is a native `<details>/<summary>` with no custom JS — standard Enter/Space toggle and focus handling are inherited, not scripted. `abbr[title]` wraps every row's "MRN" label. The hidden mobile third row uses `display: none` (removed from the accessibility tree, not just visually clipped), so nothing is focusable-but-invisible, closing the exact defect the pre-existing `overflow: hidden` cap had been causing silently.

### Handoff

**design-lead → accessibility-reviewer:** The Home hero lost its floating annotation card (folded into the proof paragraph instead) and got three artifact-internal cuts — rows 5→3 (2 on the narrowest phones), the toolbar hidden, and the MRN/EMR glossary moved behind a closed-by-default native `<details>/<summary>` with `abbr[title]` on every row's "MRN" label as a non-disclosure-dependent fallback. Please specifically check: (1) the disclosure's focus order and announced state (`<details>`/`<summary>` is unstyled-JS-wise, but I only verified it live via mouse click, not a full screen-reader pass), (2) that `abbr[title]` is an acceptable accessible-name pattern here rather than one that needs a more explicit `aria-label`, and (3) the mobile-only `display: none` on the third table row — confirm it reads as "this row isn't part of the reduced mobile view" rather than as lost/broken content to AT users, since the same row is present (and needed for `DECISION_ROW` indexing) everywhere else the component renders.

## Accessibility-reviewer: hero disclosure audit — 2026-08-27

Scope: the five checks in the brief, tested against the live dev server (`http://localhost:3000`) at 1280px and 375/390px, in English/Spanish and light/dark, plus source review of `MSKDashboardMockup.tsx`, `App.css`, and `portfolio-cohesion.css`. Two fixes were applied directly during this pass (both fall under "small, unambiguous, swap-the-attribute" per this project's reconciliation protocol); everything else is reported back, not touched.

**A tooling caveat up front, in the spirit of this file's own honesty convention:** this session's Browser-pane accessibility-tree reader (`read_page`) renders native `<details>`/`<summary>` as generic nodes with no role/expanded state, and — more surprisingly — continued listing `display:none` content as present after my fix confirmed it truly wasn't rendered (`getComputedStyle` returned `display: none`, `offsetParent === null`). That tool is not a reliable stand-in for a real screen reader here; every AT-behavior claim below is backed by direct `getComputedStyle`/DOM inspection and web-platform spec behavior instead, not by trusting that tree. I could not get a real screen reader onto this build this session — flagging that as unverified-live, consistent with how design-lead and motion-designer flagged their own tooling gaps above.

### Check 1 — `<details>/<summary>` keyboard and screen-reader behavior: FAIL as shipped, FIXED

This is the headline finding. The disclosure was not actually disclosing anything.

`App.css:2403` (pre-fix) set `.msk-dashboard-mockup__legend--details .msk-dashboard-mockup__legendBody { display: grid; ... }` — a descendant-combinator, two-class selector (specificity 0,2,0) with higher specificity than the browser's own default UA rule `details:not([open]) > *:not(summary) { display: none }` (specificity 0,1,2). The author rule won, unconditionally, regardless of the `open` attribute.

Verified live via `getComputedStyle` before touching anything:
- Closed (`det.open === false`, the default): `legendBody` computed `display: grid`, `offsetParent !== null` — i.e. genuinely in the render tree, not hidden.
- Toggling `det.open` between `true`/`false` programmatically left `legendBody`'s computed `display` at `grid` in **both** states. Nothing about the CSS was keyed to `[open]` at all.
- On screen it *looked* closed only by coincidence: `.home-heroArtifact__frame` (`portfolio-cohesion.css:296-304`) carries an unconditional `overflow: hidden`, and at both 1280px and 375px the always-rendered legend body's bottom edge sat 60-90px past the frame's clipped bottom edge — so it was being cut off by an unrelated clip, not hidden by the disclosure.

Net effect: activating the toggle (mouse or keyboard) changed nothing visible, because the content was never actually gated on `open` — it was either already "there" (just invisibly clipped) or, had the frame been taller, would have been visible even while "closed." This also means the closed-state content was not reliably hidden from assistive tech either: `display:none` is the one CSS state every browser/AT combination excludes from the accessibility tree without exception, and this rule never produced that state.

**Fixed directly** (`App.css:2403-2417`): re-scoped so the browser's default hide-on-close behavior isn't fought:
```css
.msk-dashboard-mockup__legend--details:not([open]) .msk-dashboard-mockup__legendBody {
  display: none;
}
.msk-dashboard-mockup__legend--details[open] .msk-dashboard-mockup__legendBody {
  display: grid;
  /* ...existing visual rules unchanged... */
}
```
Re-verified via `getComputedStyle`: closed → `display: none`, `offsetParent === null`; `det.open = true` → `display: grid`, `offsetParent !== null`; restored to closed → `display: none` again. The toggle now actually toggles.

With that fixed, the rest of check 1 passes on source/spec review: no JS handler, `role`, or `tabindex` override exists anywhere in `MSKDashboardMockup.tsx` on the `<details>`/`<summary>` — it's fully native. Native `<summary>` is keyboard-focusable (confirmed `tabIndex === 0` without any explicit prop setting it) and Enter/Space toggling, and the expanded/collapsed state a screen reader announces comes from the browser's own accessibility mapping of the `open` attribute — independent of the "+"/"−" glyph, which is correctly decorative (`::after` content, not the only signal). I could not complete a live screen-reader pass this session (see caveat above); this is a source/spec-verified pass, not a live-AT-verified one — worth a quick real-device check before calling this fully closed.

**New finding surfaced by the fix, not yet resolved (needs design-lead / interaction-design):** at ≤760px, `.home-heroArtifact__frame` has a *fixed* `max-height: 242px` (`portfolio-cohesion.css:556`, added by this same pass for the row-3 clipping fix) with `overflow: hidden`. Now that the disclosure genuinely reveals ~70-90px of content on open, that reveal will itself get clipped by the same fixed cap on mobile — reproducing, one component down, the exact "visible-but-unreachable behind overflow:hidden" bug this pass's own notes describe fixing for row 3. Verified live at 375px: opening the details leaves `frame` height pinned at 242px while the revealed `legendBody` bottom sits at 394px vs. the frame's clipped bottom at 328px (`clipped: true`). Above 760px there's no fixed `max-height` on the frame (confirmed by reading the CSS — the cap only exists inside the `@media (max-width: 760px)` block), so desktop reveals cleanly. **This needs a layout decision, not a CSS swap** — options include letting the frame grow on `[open]` (e.g. `max-height` transition keyed to the details' state), moving the disclosure to render outside the clipped region, or accepting a scroll affordance inside the frame — so I'm reporting it rather than picking one.

### Check 2 — Is `abbr[title]` sufficient for MRN/EMR? Verdict: **No, not alone — fixed directly.**

`title` is not a reliable accessible-name/description source: screen-reader support for reading `title` is opt-in/inconsistent (off by default in several combinations), it's invisible on touch (no hover concept), and unreachable by keyboard focus (an `<abbr>` isn't focusable, so a sighted keyboard-only user gets no equivalent of the tooltip). The dotted-underline + `cursor: help` styling (`App.css:2357-2362`) is a good affordance for sighted mouse users specifically, but it does not extend to touch, keyboard-only, or most screen-reader users — exactly the population this fallback was supposed to serve for anyone who doesn't open the disclosure.

**Fixed directly** (`MSKDashboardMockup.tsx`, the `mrn` cell): added `aria-label={\`${copy.mrnTerm}, ${copy.mrnDef}\`}` alongside the existing `title`, rather than replacing it — `aria-label` wins the accessible-name computation over `title` (so every AT reliably gets the full definition regardless of verbosity settings) while `title` keeps working independently for the native hover tooltip, so the sighted-mouse affordance is unchanged. Verified in the live accessibility tree: the row now exposes `"MRN, medical record number, the ID for one patient's chart. Masked to the last four digits."` as the node's accessible text, in both English and (via the localized `copy.mrnDef`) Spanish. `CI=true npx react-scripts test --watchAll=false` — 84/84 passing, no test needed updating.

This was applied to the shared component, so it also improves the always-visible legend view on the full case-study and curated-page renders — not just the hero's collapsed variant.

### Check 3 — Mobile-only hidden third row: **PASS**

`.home-heroArtifact__frame .msk-dashboard-mockup__row:nth-child(4) { display: none; }` (`portfolio-cohesion.css:555`, inside the ≤760px media query) does what it says: verified via `getComputedStyle` at 375px that the 4th-position row (the `filed-to-chart` row, third *visible* row after the header) computes `display: none`, and the other two visible rows compute `display: grid` normally. `display: none` genuinely removes it from the accessibility tree — this is the one CSS hidden-state every browser/AT combination honors, unlike the bug in Check 1.

No leftover ARIA references: `MSKDashboardMockup.tsx` has no `aria-describedby`, `aria-owns`, or `aria-controls` anywhere in the component, so there's nothing that could dangle a reference to the now-hidden row. `groupAria`/`tableAria` (the two ARIA labels the component does set) are static strings with no row-count language ("3 rows", "showing 3 of 5", etc.), so there's no stale count to go wrong when a row disappears — confirmed by reading `data/mskCaseStudy.ts:330-348`. No `aria-live` region exists on this component at all. Nothing before or after the row reads oddly with it absent.

### Check 4 — Standard checks on the touched region

- **Contrast, merged caption line** (`.msk-dashboard-mockup__eyebrow` under `condensedHeader`, color `var(--muted)`): **PASS**. Light mode `--muted` inside `.riso-page` is `#5d6656` against the card's near-white gradient background (`--surface-0`/`--surface-1`, both light-mode near-`#faf9f7`) — computed contrast ≈5.6:1. Dark mode `--muted` is `#a9a582` against the dark card background (`--surface-0` `#15120c`/`--surface-1` `#231d14`) — computed contrast ≈7.5:1. Both clear the 4.5:1 AA floor for this small (0.72rem), bold text comfortably.
- **Contrast, disclosure summary text/icon**: **PASS**. Summary text uses the same `var(--muted)` as above (same ratios). The "+"/"−" glyph uses `var(--olive-2)` — light mode `#5a7a2e` against the near-white surface computes ≈4.6:1 (clears both the 4.5:1 text floor and the 3:1 non-text-UI floor, though it's the tightest margin found in this pass — worth keeping in mind if `--olive-2` shifts later); dark mode `#d9a55e` against the dark surface clears easily.
- **44px touch target on `<summary>` at mobile**: **FAIL, not fixed — needs design-lead.** Measured live at 375px: `summaryRect = { width: 215.3, height: 24.5 }`. Height clears WCAG 2.2 SC 2.5.8's 24×24px AA minimum only barely (24.5 ≥ 24, with almost no margin), and falls well short of the ~44px target this project otherwise treats as its bar. I'm not fixing this myself: the straightforward fix (`min-height: 44px` on `.msk-dashboard-mockup__legend--details > summary`) would grow the card by roughly 20px at exactly the breakpoint where design-lead measured the primary CTA's fold clearance down to single-digit pixels (390×844, CTA landing at y=781-825, "19px of clearance" per their own notes above) — that measurement needs to be redone by whoever owns it once the target is enlarged, not silently invalidated by a reviewer's CSS patch.
- **Focus-visible styling on the toggle**: **PASS**. `.msk-dashboard-mockup__legend--details > summary:focus-visible { outline: 2px solid var(--olive-2); outline-offset: 2px; }` (`App.css:2399-2402`) — confirmed rendering live (a visible olive-green outline box appeared around the summary after programmatic `.focus()`).
- **Orphaned CSS / dead IDs from the floating-card removal**: **PASS, clean**. Diffed the working tree: `.home-heroArtifact__label` and its two child-selector rules were deleted from `portfolio-cohesion.css` in the same change that removed the JSX (`grep` for `home-heroArtifact__label` across `my-app/src` returns nothing). No dangling class.
- **Heading-level skip**: **PASS, none found**. Page order is `h1` (hero title) → `h2` "My filing queue" (the mockup, `headingLevel={2}`, pre-existing choice not changed by this pass) → `h2` "Every number here has a source" → `h2` "Healthcare products, enterprise workflows..." — no skipped level anywhere in the touched region.
- **Automated regression coverage**: **Gap, not a blocking issue but worth naming.** `FlagshipCaseStudies.a11y.test.tsx` runs `axe` against `RisoHome` and passed both before and after my fix — meaning axe's structural ruleset does not catch a disclosure whose hidden state is inert (it doesn't test "does opening change anything"). There is no test asserting the legend body is genuinely `display:none` when closed and genuinely revealed when `open`. I'm naming this rather than silently letting the fix round trip through the exact same blind spot that let the original bug ship.

### Check 5 — Dark mode and Spanish: quick pass, no new issues

- **Dark mode**: toggled live. The condensed caption, disclosure summary, and `abbr` dotted-underline all render with correct contrast (see Check 4). The mockup card keeps its own light "paper" surface even in site dark mode — pre-existing behavior, not something this pass touched or regressed.
- **Spanish**: toggled live. Hero copy (eyebrow, h1, proof paragraph, CTAs) translates correctly. The artifact mockup itself (table headers, row labels, "What these terms mean") stays English — confirmed this is pre-existing, cross-page behavior predating this pass (design-lead's own notes above say the same), not a new gap introduced here. No layout breakage from the shorter Spanish h1.

### Summary of what moved and what's still open

**Fixed directly this pass** (both are attribute/selector-scoping swaps, not structural changes):
1. `App.css` — scoped `.msk-dashboard-mockup__legendBody`'s `display: grid` to `[open]` instead of applying it unconditionally, restoring the browser's native closed-state hiding. This is the fix that makes the disclosure a disclosure.
2. `MSKDashboardMockup.tsx` — added `aria-label` alongside the existing `title` on every row's `<abbr>` so the MRN definition is reliably announced by AT regardless of `title`-reading support, without removing the sighted-hover affordance.

Both verified via live `getComputedStyle`/DOM inspection and the full test suite (`CI=true npx react-scripts test --watchAll=false` — 7 suites, 84/84 passing, no test changes needed).

**Needs to go back to design-lead / interaction-design (not fixed here):**
1. **Mobile clip-on-open** — `.home-heroArtifact__frame`'s fixed `max-height: 242px` (≤760px) will now clip the disclosure's revealed content on mobile, since the disclosure actually reveals content post-fix. Needs a layout decision (grow-on-open, relocate, or scroll affordance), verified against the same fold-clearance measurement design-lead already did.
2. **Touch target** — summary's mobile hit area measures ~24.5×215px tall, not 44px. Straightforward CSS fix (`min-height: 44px`), but it interacts with the same fold-clearance measurement as #1, so it should be sized and re-verified together with that fix rather than patched in isolation.
3. **Test coverage gap** — no test currently asserts the legend disclosure actually hides/reveals; axe passed through the broken version undetected. Worth a small `MSKDashboardMockup`-level unit test (`legendDisclosure` prop: closed → body not in the render output or `display:none`; `open` → body present) so this class of regression can't ship silently again.

## Design-lead: mobile disclosure fix round — 2026-08-27

Scope: the two items accessibility-reviewer sent back — the fixed-height clip-on-open and the sub-44px touch target — fixed together, same region, per their own note that both need re-verifying against the same fold-clearance measurement.

### Why the fixed `max-height` on `.home-heroArtifact__frame` couldn't simply be removed

Checked first, per the brief's own suggestion. It is still necessary, for a reason specific to this card: `.home-heroArtifact__frame .msk-dashboard-mockup` carries `transform: scale(.74)` on mobile (`portfolio-cohesion.css:557`). CSS transforms only affect paint, not the layout height a parent computes from a transformed child's box — so an ancestor's `auto`/`max-content` height reflects the child's **pre-scale** layout size, not its scaled-down visual size. Measured live: with both `max-height` rules removed, the frame's natural height came out to ~418px — matching the mockup's *unscaled* `scrollHeight` (414px, plus border), not the ~240px it visually renders at. `auto` was never going to work here; the 242px cap is a deliberate "peek window" over a scaled-down card, not a leftover that content cuts made redundant.

### The fix

Kept the closed-state numbers exactly as they were (242px frame / no change to media, since media wasn't the binding constraint at 330px closed) and added a `:has()` override, scoped to the same `@media (max-width: 760px)` block, that swaps in a taller cap only while the disclosure is genuinely open:

`my-app/src/styles/portfolio-cohesion.css` (inside the existing `≤760px` block, after the existing `.home-heroArtifact__frame { max-height: 242px; }` / `transform: scale(.74)` rules):

| Rule | Before | After |
|---|---|---|
| `.home-heroArtifact__frame` | `max-height: 242px` (always) | unchanged when closed; **`max-height: 320px`** when `:has(.msk-dashboard-mockup__legend--details[open])` |
| `.riso-home .rp-hero__media` | `max-height: 380px` (always) | unchanged when closed; **`max-height: 410px`** when `:has(.msk-dashboard-mockup__legend--details[open])` |

Both new values came from a live measurement, not a guess: with the disclosure opened via a real `click` dispatch at 390×844, the frame's child content (`.msk-dashboard-mockup`, post-`scale(.74)`) rendered at 307.9px tall via `getBoundingClientRect()` — so 320px caps it with ~12px of headroom. With the frame capped at that candidate 320px, `.rp-hero__media`'s own natural (unconstrained) height came out to 404.75px — so 410px caps it with ~5px of headroom. No animation/transition was added: this is a user-initiated, one-time layout change, not a scroll-driven one, and the brief explicitly accepts "the rest of the hero reflows normally, no scroll-jank" as the outcome — adding a height transition here would be extra surface area (and its own `prefers-reduced-motion` obligation) for no requirement it's solving.

`:has()` is supported by all evergreen browsers at this point (Safari 15.4+, Chrome/Edge 105+, Firefox 121+); a browser without it simply keeps the pre-fix (closed-state-sized) cap, which is the same clipping behavior that shipped before this round — a graceful, not a broken, degradation.

Scoped narrowly on purpose: the selector chain (`.home-heroArtifact__frame`, `.riso-home .rp-hero__media`) only matches Home's hero. `FlagshipMSK.tsx`'s two call sites and `CuratedRolePage.tsx`'s call site all render the always-open `.msk-dashboard-mockup__legend` (no `--details` class, `legendDisclosure` defaults to `false`), so `:has(...--details[open])` never matches there — confirmed by re-reading the call sites, not assumed.

### Touch target: 44px via invisible hit-slop, not a bigger visible chip

`my-app/src/styles/App.css`, `.msk-dashboard-mockup__legend--details > summary`: added `position: relative;` to the existing rule, and a new `::before`:

```css
.msk-dashboard-mockup__legend--details > summary::before {
  content: "";
  position: absolute;
  top: -9px;
  right: 0;
  bottom: -11px;
  left: 0;
}
```

This is the standard "small visible label, larger invisible tap zone" pattern the brief asked for — the pseudo carries no background/border/color, so it changes nothing about how the closed card looks (verified via screenshot, before/after pixel-identical). A click anywhere on it still bubbles to `<summary>` and triggers the native toggle, since generated content is part of the originating element's hit-testing box.

Values are asymmetric on purpose, sized from a live measurement of the actual gaps at 390px rather than a symmetric guess: 9px above (inside the measured 9.62px gap to the last visible table row, so the hit zone never reaches into that row's own box) and 11px below (inside the measured 13.58px gap to the frame's own edge, so nothing gets clipped by the frame's `overflow: hidden`). Effective hit height: 24.49px (visible chip) + 9 + 11 = **44.49px**, clearing the 44px floor with a small margin. Width was already 226px, well past the 44px minimum on that axis — only height was short.

Not scoped to mobile only: the same rule applies at every breakpoint. Checked at 1440px — the desktop summary (33px tall there, more generous padding/type) also benefits, and nothing sits close enough above/below it there to make the extra hit-slop risky.

### Verification

- **Closed-state CTA clearance, re-confirmed at 390×844, English, light mode:** primary CTA (`Review the MSK workflow →`) at **y = 780.87–824.87**, clearance to the 844px fold = **19.13px** — bit-identical to the measurement from the prior pass (the `:has()` rule only activates on `[open]`, so it cannot touch the closed-state layout; confirmed this isn't a coincidence by reading the selector, not just by re-measuring).
- **Open-state, no clip, same viewport:** clicked the real `<summary>` (`MouseEvent('click')`, not a programmatic `.open = true`, so this exercises the actual native activation path). `frame` grew to `max-height: 320px` (computed), `.msk-dashboard-mockup__legendBody`'s bottom edge landed at 381.3px vs. the frame's new bottom edge at 404.98px — **not clipped**. Screenshot-confirmed: both MRN and EMR definitions render in full, un-truncated, in the card. No horizontal overflow (`document.documentElement.scrollWidth === window.innerWidth`, both 390). Page reflowed normally — the primary CTA moved down to y=855.6–899.6 (now below the fold, which is the explicitly-accepted "opening it pushes the rest of the hero down slightly" outcome, not a first-load regression, since it only happens after a user-initiated click) — confirmed via `document.body.scrollHeight` growing from the normal document flow, not an internal scrollbar.
- **Touch target, live:** `getComputedStyle(summary, '::before')` confirms the pseudo is present with `top: -9px`, `bottom: -11px`, `position: absolute` at 390px; effective height 44.49px ≥ 44px.
- **Other breakpoints spot-checked:** 1440px — `.home-heroArtifact__frame`'s `max-height` computes `none` at this width (the cap only exists inside the `≤760px` media query, as before), so open/closed both render unclipped regardless of my change — no regression, `:has()` simply never fires there. 375×812 (a shorter phone than the 390×844 this pass and the prior one were tuned against) — open state still un-clips correctly (`clipped: false`, no horizontal overflow); closed-state CTA clearance at this narrower/shorter viewport is `-7.8px` (already below its own, shorter, fold) — this is a **pre-existing** condition of that specific viewport height, not something this pass introduced or regressed: none of this round's CSS touches closed-state sizing at all, and the 844px-tall viewport this project has been tuning and re-verifying against throughout this whole initiative still clears with room (19.13px). Flagging the 375×812 number rather than silently only checking the viewport that's already known to pass.
- **Dark mode, 390×844:** `dark-mode` class confirmed on `<html>`; closed-state CTA clearance 19.13px (identical to light mode, as expected — theme tokens don't affect layout dimensions), open state not clipped.
- **Spanish, 390×844, light mode:** disclosure opens and un-clips identically (`clipped: false`, both definitions render — "MRN — número de historia clínica..." content confirmed present via `legendBody.textContent`). **Worth flagging, not fixing here:** closed-state CTA clearance in Spanish measured **6.26px** — positive (CTA is still fully visible with zero scroll, so the hard constraint still holds), but tighter than English's 19.13px and the opposite of the prior pass's own note ("Spanish renders an even shorter h1... so its CTA sits with more room still"). Confirmed this is pre-existing and unrelated to this round's changes (re-checked against a `git stash`/`stash pop` round-trip of the whole working tree, which briefly reverted and restored every uncommitted pass including this one — the Spanish number was unchanged before and after this round's specific edits). Not something this round's brief asked for or touched (h1/proof-paragraph line-wrapping by locale), so left as an open item for whoever owns Home's Spanish copy next, rather than silently patched.
- **Tests:** `CI=true npx react-scripts test --watchAll=false` — 7 suites, **84/84 passing**, no test changes needed.
- **TypeScript:** `npx tsc --noEmit` — clean.

### What was deliberately left alone

- The closed-state numbers themselves (242px frame, 330px/380px media min/max) — unchanged; the `:has()` addition is purely additive for the open state.
- No height transition/animation added (see reasoning above) — matches "pick whichever is simplest and least fragile" from the brief.
- The `::after` "+"/"−" glyph and its `[open]` color swap — untouched; the new `::before` is a separate pseudo-element and doesn't interact with it.
- Case-study and curated-page renders of `MSKDashboardMockup` — confirmed unaffected; they use the always-open `.msk-dashboard-mockup__legend` variant, which the `:has(...--details[open])` selector never matches.

### Handoff

**Ship-readiness:** Both items from accessibility-reviewer's audit are fixed and verified — the disclosure now genuinely grows to show its content without clipping on mobile, and the toggle clears the 44px touch-target floor via an invisible hit-slop that doesn't change the card's visual weight. The 390×844 fold-clearance measurement this whole initiative has been protecting still holds in the closed (default, first-load) state, in English and Spanish, light and dark. This round is ship-ready for what it was scoped to fix.

**Still open, not blocking:** (1) the pre-existing Spanish closed-state clearance gap (6.26px vs. English's 19.13px) — real, but out of this round's scope and not a regression from this pass; (2) accessibility-reviewer's own item #3, the missing unit test asserting the legend disclosure's open/closed render output, which would also be the natural place to pin these new height values against regression; (3) a live screen-reader pass on the disclosure — every claim in this file remains source/spec-verified plus live `getComputedStyle`/DOM inspection, not confirmed with an actual AT, per every prior pass's own honesty notes.

## Design-builder: Direction C — expandable hero artifact — 2026-08-27

Scope: the Direction C build contract above — turn the hero's 3-row queue preview into a genuinely expandable card, in place, via a native disclosure button reusing the Weekend Dispatch idiom.

### What was built

**Trigger.** A native `<button>` (`.home-heroArtifact__expandToggle`), rendered as the last element inside `MSKDashboardMockup` via a new `expandControl` prop (so it inherits the card's own mobile `scale(.74)` transform instead of rendering at a mismatched full size next to a shrunk card — a sibling-of-the-frame placement would not have scaled). `aria-expanded`/`aria-controls` on a new `tableId` prop set only by Home (`home-hero-queue-table`) — both new props default to `undefined`, so case-study and curated-page renders are unaffected. Styled in the same register as the existing MRN/EMR `<summary>` chip, not a new visual language. Copy: `home.riso.queueExpand` ("View the full queue · 5 items") / `home.riso.queueCollapse` ("Show fewer"), en + es, added to `i18n/strings.ts`; the artifact itself stays English-only regardless of site language, matching every other row/column label in this component (pre-existing, not something this pass changed).

**Expansion mechanism.** `RisoHome.tsx` holds `queueExpanded` state and swaps `MSKDashboardMockup`'s props on toggle: `rowIndices` goes from `[0,2,4]` to `undefined` (renders all 5), `hideToolbar`/`hideRule` flip to `false`. `condensedHeader` and `legendDisclosure` stay `true` in both states, per the contract. This is real conditional rendering via the component's own existing props — the two collapsed rows are genuinely absent from the DOM, not hidden via CSS — so there is no decoy-disclosure risk of the kind accessibility-reviewer found and fixed on this same card earlier in this file.

**Motion.** No on-load animation — verified by construction, not just by eye: every animated rule here is scoped under `.home-heroArtifact__frame--expanded`, a class React only ever adds after a click, so it cannot match on first paint on Home, and it never matches at all on `FlagshipMSK`/`CuratedRolePage` (that class name doesn't exist there). Card hover: `.home-heroArtifact__frame` had no hover treatment before this pass; added `scale(1.01)` + a deeper shadow, matching the site's other interactive cards (`.project-card:hover`, `App.css:715`). Trigger press: `:active { transform: scale(0.98) }` with a `150ms` transition — a settle, not a bounce (no keyframe overshoot). Height expand: `max-height` transition, `280ms ease-out`, on both `.home-heroArtifact__frame` and `.riso-home .rp-hero__media` (the frame's own auto-height ignores the mobile `scale(.74)` transform on its child, the same quirk design-lead documented for the legend-disclosure fix, so this has to be an explicit-pixel `max-height` transition, not `height:auto`, on both the mobile and non-mobile breakpoint). Restored content (toolbar, and the two rows/rule that only exist once expanded) arrives via a `rp-queue-row-in` keyframe (`opacity:0, translateY(8px)` → visible) staggered in the same 90ms increments as the site's `--rp-reveal-stagger` scroll-reveal vocabulary (`riso-page.css`) — same motion language, reused rather than reinvented, even though this is click-driven, not scroll-driven. `navigator.vibrate(10)` fires in the click handler, guarded by `if (navigator.vibrate)` with a comment naming it Android-Chrome-only, silent no-op elsewhere.

**Reduced motion.** A single `@media (prefers-reduced-motion: reduce)` block disables the hover transform/shadow transition, the press-settle transition, and all four `rp-queue-row-in` animations — the state change becomes instant with no stagger, matching the rest of the site's reduced-motion contract. Vibration is left ungated: it's haptic, not visual motion, and the codebase has no existing convention gating haptics behind this media feature (checked — `navigator.vibrate` doesn't appear elsewhere in the codebase).

**Tests.** Added to `FlagshipCaseStudies.a11y.test.tsx`: "keeps the hero queue preview genuinely collapsed, then genuinely expands it" — asserts exactly 3 data rows in the DOM with the right `data-status` order when collapsed, the toolbar/rule genuinely absent (not hidden), `aria-expanded` false→true→false across two clicks, `aria-controls` pointing at the right id, and exactly 5 data rows once expanded. Full suite: `CI=true npx react-scripts test --watchAll=false` — **7 suites, 85/85 passing** (84 baseline + 1 new). `npx tsc --noEmit` clean. `CI=true npx react-scripts build` compiles with no new warnings.

### The touch-target fix took two rounds, and the first one taught something worth naming

My first pass gave the trigger a symmetric `::before` hit-slop (top:-8px/bottom:-8px, mirroring the legend summary's own pattern) and grew the closed card's mobile cap by exactly the trigger's own footprint. Live measurement then showed the effective hit height at only 38.95px — short of 44px — and increasing the slop further wasn't available: the legend summary directly above the trigger already extends **its own** hit-slop 11px below its visible edge (the accessibility-reviewer fix earlier in this file), and the two visible chips sat only ~3.5px apart. Any upward extension on the new trigger would land inside the legend's existing tap zone, reproducing the exact ambiguous-hit-target problem hit-slop is supposed to prevent, just between two different controls instead of one. I found this by computing both elements' actual tap-zone edges live (`getComputedStyle(el, '::before')` plus their bounding rects), not just the trigger's own numbers in isolation.

The fix: all of this trigger's own slop goes downward only (`top: 0; bottom: -24px`), where there's real, measured headroom before the card's own edge — zero risk of colliding with the legend's zone. To reach 44px using only the downward direction without shrinking the visible chip, the gap between the two controls needed to grow past the legend's 11px slop plus a buffer, so the trigger's `margin-top` went from a first-pass `0.3rem` to `1.1rem` on mobile. That, in turn, needed ~10px more of the closed card's mobile height budget, which came back out of the same "pure vertical cost, no payoff" mobile-only spacing rules (`riso-page.css`/`portfolio-cohesion.css`, flagged as cuttable by design-lead's own prior pass) rather than being left as net growth. Final measured state at 390×844: effective hit height 46.95px (≥44), 2.02px of clear buffer past the legend's tap zone, 1.61px of clear buffer before the frame's own bottom edge — all three real, not theoretical, margins.

### Closed-state clearance, before and after (measured live in this session's browser, not the values recorded earlier in this file — this session's rendering environment produces slightly different numbers, consistent with every prior pass's own tooling caveats; before/after were measured in the same session so the *delta* is what matters)

| | Before this pass | After this pass |
|---|---|---|
| EN, 390×844, light | 10.79px | 9.96px |
| ES, 390×844, light | -2.09px (pre-existing negative; flagged, not caused, by the prior accessibility-reviewer round) | -2.91px |

Both deltas are under 1px — within the range explainable by font-metric rounding across the several small compensating trims, not a real regression. The ES number was already negative before this pass (a known, previously-flagged, out-of-scope issue — see accessibility-reviewer's note above) and stays in the same range; this pass didn't cause it and didn't meaningfully worsen it. Both closed-card measurements before/after used the identical method: fresh page load, `getBoundingClientRect()` on the primary CTA at 390×844.

### Height caps: the frame's auto-height quirk applies to the whole-card expand too, and non-mobile widths needed real measurement, not an assumption

Design-lead's mobile disclosure fix documented that `.home-heroArtifact__frame`'s auto-height ignores its child's `scale(.74)` transform (transforms affect paint, not the box a parent computes an auto-height from). The same mechanic applies here, so every `max-height` value below came from live measurement, not arithmetic assumption:

- **Mobile (≤760px) closed:** 290px (up from the pre-existing 242px — see the touch-target section above for why).
- **Mobile expanded (queue only):** live-measured unscaled content (~675.6px) × 0.74 scale ≈ 500px visual need; 525px caps it with ~25px headroom.
- **Mobile expanded + legend disclosure both open:** 600px — a `.home-heroArtifact__frame--expanded:has(.msk-dashboard-mockup__legend--details[open])` compound selector, needed because `:has()`'s specificity is driven by its argument: the existing legend-only rule is already `(0,3,0)`, which would otherwise beat the plain `--expanded` class `(0,1,0)` and clip the bigger reveal back down to 320px whenever both are open at once. Verified live: without this compound rule, opening the legend while already expanded silently re-clipped the card.
- **Non-mobile (>760px) closed:** 460px was my first guess, verified wrong — live measurement across 761–1440px found the two-column desktop grid actually wraps the condensed caption **tallest around 800–900px** (541.5px at 900px, 538.3px at 820px), not at the narrowest or widest point tested, because that's the zone where the grid is still two columns but the column itself is narrowest. Corrected to 580px.
- **Non-mobile expanded:** 940px, covering a measured 888px worst case (820px width) with headroom.

None of these non-mobile numbers are exact — a width this pass didn't sample could still exceed them — but they're generous relative to every point actually measured, and an oversized `max-height` costs nothing visually (a `height:auto` box never grows past its own content just because more room is allowed; it only prevents clipping). I verified this directly: setting the cap to `900px` vs `none` produced the identical rendered height on a card whose real content was 675px.

### A tooling artifact worth naming for whoever measures this next

Reading `frame.getBoundingClientRect().height` immediately after a `max-height` class toggle repeatedly returned the **pre-toggle** value across several separate tool calls in this session's browser tab, even though `getComputedStyle(frame).maxHeight` correctly showed the new cascade value at the same moment. Forcing `frame.style.transition = 'none'` before reading settled it to the real value instantly. This is consistent with this project's already-documented "IO/rAF/scroll timing doesn't reliably tick in the automated tab" limitation (`design-state.md`) — the `max-height` transition's start value was getting "stuck" rather than animating, not a bug in the shipped CSS. Every measurement in this section was taken with the transition forced off first, specifically to route around this.

### What was deliberately left alone

- `condensedHeader` and `legendDisclosure` — unchanged in both queue states, per the contract.
- `FlagshipMSK.tsx`'s two call sites and `CuratedRolePage.tsx`'s call site — confirmed unaffected; none pass `rowIndices`, `tableId`, or `expandControl`, so all three new/changed props resolve to their no-op defaults there.
- The `::after` "+"/"−" glyph pattern on the legend `<summary>` — the new trigger reuses the same visual idiom (a leading `+`/`−` glyph, `aria-hidden`) rather than inventing a second one.
- The existing legend-disclosure `:has()` mobile fix (242→320px, App.css/portfolio-cohesion.css from the prior round) — left structurally as-is; only the base closed-card number it builds on top of changed (242→290), and a new compound selector was added for the case where both disclosures are open together.

### Handoff

**design-builder → accessibility-reviewer:** Built and verified per the Direction C contract — 85/85 tests, `tsc` clean, production build clean, no clipping in any state I could construct (queue-only expanded, legend-only open, both open together) at 390×844, 820/900/1024/1440px, light/dark, EN/ES. Please specifically check: (1) the trigger's hit-slop reasoning in the "touch-target fix" section above — I resolved a real overlap with the legend summary's own hit-slop by pushing the gap between them to ~13px rather than shrinking either control's zone, but I only verified this via computed geometry, not a live screen reader or real touch device; (2) whether a screen reader announces the row-count change sensibly when the collapsed→expanded transition happens (the button's own accessible name changes with `aria-expanded`, but I did not confirm the table's `aria-label` — a static string with no row-count language — reads correctly alongside that state change); (3) the `navigator.vibrate` call — ungated by reduced-motion per this pass's own reasoning (haptic, not visual), but that judgment call is yours to overrule. I'm most unsure about (2) — genuinely uncertain whether a static table label plus a changing button label is sufficient AT feedback for "you're now looking at 5 rows, not 3," or whether it needs an `aria-live` announcement this pass didn't add.


## Orchestrator verification: Direction C post-build (2026-08-27)

Live check of the builder's work caught one real bug and one phantom:

- **Real, fixed:** the earlier mobile pass's row-hide rule (`.home-heroArtifact__frame .msk-dashboard-mockup__row:nth-child(4) { display:none }`, portfolio-cohesion.css ~line 605) leaked into the expanded state — the expanded queue showed 4 of 5 rows, hiding exactly the `7305 · Needs review` row while the "Needs review" filter tab sat visible above it. JSDOM doesn't apply stylesheet `display:none`, so the new 5-rows-expanded test could not catch it. Fixed by scoping the rule to `.rp-hero__media:not(.rp-hero__media--queueExpanded)`. 85/85 tests still pass.
- **Phantom, documented:** a getComputedStyle probe showed the expanded frame stuck at `max-height: 290px` with 333px "clipped." Root cause: the automated browser tab's animation clock is frozen (same non-compositing limitation recorded earlier), so the 0.28s max-height transition never advances past its start value in probes — even a higher-priority injected rule appeared not to apply. With transitions force-disabled, the cascade computes correctly: frame 525px, visual need 463px, zero clipping, 60px headroom with all five rows. Screenshots (which force a paint) had shown the correct expanded render all along.

Still open for accessibility-reviewer (builder-flagged): whether `aria-expanded` alone is sufficient AT feedback for the row-count change, hit-slop geometry on a real device/AT, and the ungated `navigator.vibrate(10)` under reduced-motion.

## Accessibility-reviewer: Direction C focused audit — 2026-08-27

Scope: the three items design-builder flagged plus the orchestrator's regression check, tested live against the dev server at 390×844 with `*{transition:none!important;animation:none!important}` injected before every geometry read (this session's automated tab does not composite transitions reliably — the same documented limitation the orchestrator's own "phantom" note hit). Screenshots (which force a paint) were used to cross-check one finding visually. Same tooling caveat as every prior pass in this file: this session's accessibility-tree reader is not a substitute for a real screen reader, so AT-behavior claims below are backed by DOM/focus inspection and documented browser/AT convention, not a live AT pass.

### Check 1 — Is `aria-expanded` + accessible-name change sufficient AT feedback? Verdict: **Yes, as shipped. No change made.**

Verified live rather than assumed: focused the trigger, clicked it, and read `document.activeElement` and the button's text content before/after.

```
before: { active: true, label: "+View the full queue · 5 items", ariaExpanded: "false" }
after:  { active: true, label: "−Show fewer",                    ariaExpanded: "true"  }
```

Focus stays on the button across the click (native `<button>` behavior, not scripted), and its accessible name genuinely changes — confirmed the leading `+`/`−` glyph is a separate `<span aria-hidden="true">`, so the computed accessible name is exactly the visible label text, nothing more.

This is the same mechanism every native toggle-button pattern on the web already relies on for AT feedback without a live region — play/pause buttons, "Follow"/"Following" buttons, hamburger "Open menu"/"Close menu" triggers. When a DOM mutation changes the accessible name of the node that currently holds focus, NVDA, JAWS, and VoiceOver all pick this up via their platform accessibility APIs and announce it, in addition to announcing the `aria-expanded` state change on the same element. No `aria-live` region is needed to get this behavior — it is a property of "name changed on the focused element," not of `aria-live`.

Weighed against over-announcement risk, per the brief's own framing: this is a decorative-ish mock, not a live/critical data table. `copy.tableAria` (`data/mskCaseStudy.ts:331`) is a static string with no row-count language ("Anonymized patient document filing queue") — confirmed by reading the data file, matching the earlier accessibility-reviewer pass's own note. Adding a second, independent `aria-live="polite"` announcement on top of the button's own name-change would mean a single user action (one tap) fires two separate AT announcements for the same fact ("now 5 rows" via live region, plus "Show fewer, expanded" via the focused control) — that is over-announcement for a mock whose row count carries no decision-relevant information a recruiter needs called out twice. **Verdict: leave as shipped.** No code change.

### Check 2 — Should `navigator.vibrate(10)` be gated under `prefers-reduced-motion`? Verdict: **No. Left ungated, affirmed.**

Confirmed `navigator.vibrate` appears nowhere else in `my-app/src` (`grep -rn vibrate src/` → only `RisoHome.tsx:195,199`), so there's no existing project convention to defer to either way — this is a fresh call, not a consistency check.

Research consensus: `prefers-reduced-motion` (both the CSS media feature and the OS-level settings that drive it — iOS "Reduce Motion," Android "Remove animations") is scoped to *visual* motion — the kind that triggers vestibular disorders through optical flow (parallax, zoom, large-scale movement, autoplaying transitions). A 10ms haptic buzz has no visual component and doesn't engage the vestibular system the media feature exists to protect. Platform convention treats the two as independent axes on purpose: both iOS and Android ship "Reduce Motion" and haptic/vibration intensity as separate, independently-togglable settings in their own accessibility panels — a user who disables Reduce Motion because visual animation makes them nauseous is not thereby signaling anything about tactile feedback, and a user who dislikes haptics has actual settings (system-wide vibration toggle, Android's own "vibrate on tap" preference, which browsers on Android already sit behind/respect at the OS level) built for that specific preference instead of overloading a visual-motion signal to also mean "no touch feedback."

The call this project should not make is inventing a new implicit rule ("motion-adjacent, so gate it") where none of the browsers, OSes, or spec language draw that line. Combined with the interaction's own low stakes — it's a single 10ms pulse, fires only in direct response to the user's own tap (not ambient/autoplaying), and the codebase already documents it as Android-Chrome-only progressive enhancement that's silently absent everywhere else — leaving it ungated is the correct, not just defensible, call. **No code change.**

### Check 3 — Hit-slop geometry at 390px, collapsed/expanded × legend open/closed: **FAIL as shipped, FIXED**

This is the headline finding of this pass. Design-builder's own verification claimed "no clipping in any state I could construct... at 390×844" — live geometry contradicts that for three of the four state combinations.

Method: injected `*{transition:none!important;animation:none!important}`, then for each of the four combinations (collapsed/legend-closed, collapsed/legend-open, expanded/legend-closed, expanded/legend-open) read `getBoundingClientRect()` + `getComputedStyle(el,'::before')` on both the legend `<summary>` and the new expand/collapse trigger, plus `.home-heroArtifact__frame`'s own rect and `overflow` value (confirmed `hidden`).

**Before the fix**, measured live:

| State | Trigger visible chip clipped by | Trigger hit-slop effective height | Frame overflow |
|---|---|---|---|
| Collapsed, legend closed (default) | 0px | 46.95px (passes) | hidden |
| Collapsed, legend open | **12.32px** | **10.63px (fails)** | hidden |
| Expanded, legend closed | **11.26px** | **11.69px (fails)** | hidden |
| Expanded, legend open (both) | **4.19px** | **18.76px (fails)** | hidden |

Cross-checked visually, not just numerically: outlined `.home-heroArtifact__frame` in red and the trigger in blue via injected inline styles, then screenshotted the collapsed/legend-open state (a forced paint, trustworthy per this project's tooling notes). The trigger's own button box — its text partially sliced — visibly extends past the red frame boundary. This is the same failure class Check 1 of the earlier accessibility-reviewer pass found and fixed on the legend disclosure itself ("visible-but-unreachable behind `overflow:hidden`") — reintroduced here for the *new* Direction C trigger, one component over.

**Root cause:** `portfolio-cohesion.css`'s three `:has()`/`--expanded` max-height caps on `.home-heroArtifact__frame` (320px legend-open, 525px expanded, 600px both-open) were each sized against the *revealed content above the trigger* (legend text, or table rows + rule) — never against the trigger itself. The trigger's own `margin-top` grew from `0.3rem` to `1.1rem` during its own touch-target hit-slop fix (documented earlier in design-builder's pass), and that growth was never fed back into these three caps, which were set before/independently of that specific change.

**Fixed directly** (`portfolio-cohesion.css`, `≤760px` block) — grew each cap by the measured deficit plus 9–17px headroom, matching this file's own headroom convention elsewhere:

| Rule | Before | After |
|---|---|---|
| `.home-heroArtifact__frame:has(...[open])` (legend only) | 320px | 365px |
| `.riso-home .rp-hero__media:has(...[open])` | 410px | 455px |
| `.home-heroArtifact__frame--expanded` | 525px | 570px |
| `.riso-home .rp-hero__media--queueExpanded` | 550px | 595px |
| `.home-heroArtifact__frame--expanded:has(...[open])` (both) | 600px | 645px |
| `.riso-home .rp-hero__media--queueExpanded:has(...[open])` | 625px | 670px |

**Re-verified live, all four combinations, after the fix:**

| State | Chip clipped | Hit-slop effective height | Legend/trigger gap (overlap check) |
|---|---|---|---|
| Collapsed, legend closed | 0px | 46.95px | 136.54px |
| Collapsed, legend open | 0px | 46.95px | 68.61px |
| Expanded, legend closed | 0px | 46.95px | 69.95px |
| Expanded, legend open (both) | 0px | 46.95px | 2.02px |

All four now clear the 44px floor with margin, and no combination produces overlap between the trigger's hit-slop and the legend `<summary>`'s own hit-slop (smallest gap 2.02px, in the maximally-crowded both-open state — still clean separation, not a collision).

**Regression check on the fix itself:** re-measured the untouched default (collapsed, legend closed) state's primary-CTA fold clearance at 390×844 after the change — **9.96px**, bit-identical to design-builder's own recorded post-Direction-C baseline. Confirmed by reading the selectors, not just re-measuring: none of the six edited rules apply outside `:has([open])`/`--expanded`, so the base/default state's layout is untouched by construction.

### Check 4 — Regression: collapsed shows exactly 2 rows, expanded shows 5, hidden row is genuinely out of the AT tree: **PASS**

Re-verified independently of the orchestrator's own check. At 390px: collapsed state shows the header row plus 2 data rows (`ready-to-file`, `needs-review`) with `display: grid`; the 3rd data row (`filed-to-chart`) computes `display: none` and `offsetParent === null` — genuinely removed from the accessibility tree, not visually clipped. Expanded state: all 5 data rows present, all `display: grid`, none hidden — the `.rp-hero__media:not(.rp-hero__media--queueExpanded)` scoping fix holds; the collapsed-only hide rule does not leak into the expanded render.

### Verification

- **Tests:** `CI=true npx react-scripts test --watchAll=false` — 8 suites, **90/90 passing** (matches this session's baseline; no test needed updating — the fix is CSS-only, and the existing Direction C test already asserts row counts/DOM presence, which the CSS change doesn't touch).
- **TypeScript:** `npx tsc --noEmit` — clean.
- **Live geometry, all measurements above** taken with transitions/animations force-disabled via an injected stylesheet, per this project's documented tooling workaround; one finding additionally cross-checked with a forced-paint screenshot.

### Summary of what moved and what's still open

**Fixed directly this pass:** `portfolio-cohesion.css` — grew six `max-height` values (three on `.home-heroArtifact__frame`'s `:has()`/`--expanded` rules, three on the matching `.riso-home .rp-hero__media` rules) so the Direction C expand/collapse trigger is never clipped by the card's `overflow:hidden` in any of its four open/closed × collapsed/expanded combinations. Verified live before and after; base/default-state fold clearance confirmed unchanged.

**Reviewed, no change needed:** (1) AT feedback for the row-count change — `aria-expanded` + accessible-name change on the focused control is sufficient; an added `aria-live` region would over-announce a low-stakes mock. (2) `navigator.vibrate(10)` ungated by `prefers-reduced-motion` — correct per platform convention (haptics and visual-motion preferences are independent settings on both iOS and Android; the media feature's spec scope is vestibular/visual, not tactile).

**Still open, not blocking:** a live screen-reader pass on the Direction C trigger and the legend disclosure together — every claim in this pass remains source/spec-verified plus live DOM/focus inspection, consistent with every prior pass's own tooling caveats, not confirmed with an actual AT.

**Handoff — accessibility-reviewer → design-lead / interaction-design:** Direction C is ship-ready. One real bug found and fixed: the expand/collapse trigger was genuinely clipped (not just under-sized) by the card's `overflow:hidden` in 3 of its 4 states — fixed by growing six `max-height` values in `portfolio-cohesion.css` to include the trigger's own footprint, which the original caps never budgeted for. Both open judgment calls (AT feedback mechanism, vibrate gating) are affirmed as shipped, with reasoning on the record above — no further action needed unless a future pass wants a live screen-reader/real-device confirmation pass, which no prior stage in this file has been able to run in this session's tooling.


## Motion-designer: film-exit trickle-down entrance (2026-08-27)

**Brief:** the opening film's exit "just flat lands on everything" — the whole homepage was already rendered at full opacity underneath the overlay the entire time, so as the overlay faded, the page just appeared as one flat cut. Owner wants a faster-but-smoother trickle-down: background/paper first, then nav, then hero header+text as one group, then the artifact card. This applies only to the FILM-EXIT handoff, never to cold direct-entry loads.

### What was confirmed before touching anything

- `openingFilmOpen` only ever becomes `true` from the explicit "Watch the 10-second portfolio opener" button click in `RisoHome.tsx` (line ~234) — nothing auto-opens it on mount. Cold direct entry never plays the film and never will run this choreography; the approved direct-entry-never-autoplays rule (`design-state.md`, 2026-08-22 "owner correction → once-per-session opening film") is untouched. Verified live: a fresh load renders the static hero immediately, no `.rp-openingFilm` in the DOM.
- The film's own exit (`HomepageOpeningFilm.tsx`) already dissolves poster/video/wash to the paper tone over ~440–520ms (`EXIT_MS = 560`) before unmounting via `onClose()`. That dissolve *is* the "background/paper blends in first" beat the brief asks for — left completely alone. The gap being fixed is that everything underneath it was static the whole time.

### What shipped

- **`my-app/src/hooks/useFilmExitChoreo.ts`** (new): exports a pure `triggerFilmExitChoreo(root, win)` plus a default React hook. On call (skipped entirely under `prefers-reduced-motion: reduce`): adds `rp-filmChoreo` to `<html>`, double-`requestAnimationFrame`s to `rp-filmChoreo--go` (so the hidden start state actually paints before the target values flip — otherwise the browser can coalesce both into one frame and skip the transition), then removes both classes after a 900ms `SETTLE_MS` regardless of what happened. Returns a cleanup that cancels the pending frames/timer and strips the classes immediately, so unmount or a rapid re-open can't stack timers.
- **`HomepageOpeningFilm.tsx`**: added an optional `onExitStart?: () => void` prop, called inside `finish()` right when `setExiting(true)` fires — i.e. at the *start* of the exit, not at `onClose()` 560ms later. This is what lets the page choreography run in step with the overlay's own dissolve instead of only after it's gone.
- **`RisoHome.tsx`**: wires `useFilmExitChoreo()`'s callback into `<HomepageOpeningFilm onExitStart={...}>`.
- **`riso-page.css`** (new section, "film-exit trickle-down entrance", right after the opening-film rules): default-visible, gate-class-only hidden state — exactly the `.rp-reveal`/`.js-reveal` vocabulary already documented above, reused rather than reinvented (transition + `transition-delay` custom property per group, plus a CSS `animation-delay`-style 1500ms backstop keyframe in case the "go" class somehow never lands).

### Exact timing shipped (overlapping stagger, each starts while the previous is still running)

| Group | Selector | Delay | Duration | Settles at |
|---|---|---|---|---|
| Navbar | `.navbar` | 90ms | 300ms | 390ms |
| Hero header + text column (eyebrow/h1/proof/status/CTAs, as one group — it's already one wrapper div, `.rp-hero__content`) | `.rp-hero__content` | 180ms | 340ms | 520ms |
| Artifact card + headshot | `.home-heroProofStack` | 270ms | 360ms | 630ms |

Total settle: ~630ms from exit-start, comfortably inside the owner's 500–700ms target, and each group starts 90ms after the previous *started* (not finished) per the overlapping-stagger instruction. Easing: `var(--ease-soft, cubic-bezier(.2,.8,.2,1))`, the same curve already used throughout `riso-page.css`. Motion: `opacity` + `translateY(14px)` only — both GPU-compositable, nothing on `width`/`height`/`top`/`left`, no scale/blur on any large surface.

### Fail-visible mechanism (three independent layers)

1. **No class, no hidden state.** `.rp-filmChoreo`'s hidden rules only match elements *under* that class. Cold loads and any page other than mid-film-exit never get the class, so nav/hero/artifact are just visible CSS defaults — a missing hook call costs an animation, never the page.
2. **JS settle timer.** 900ms after the gate class is added, `useFilmExitChoreo` unconditionally strips both classes — regardless of whether the "go" class ever landed. This is the one that actually fired in every live check this session (see Verification below), because `requestAnimationFrame` does not tick in this project's automated browser tab (documented limitation).
3. **CSS animation backstop.** A `1ms linear 1500ms forwards` keyframe on the same rule snaps opacity/transform to their final values even if the JS settle timer itself somehow never ran (matches the `.rp-reveal-failsafe` pattern already in this file).

### Reduced motion

`useFilmExitChoreo` checks `matchMedia('(prefers-reduced-motion: reduce)')` up front and does nothing at all when it matches — no classes added, so there's no state to transition out of. A CSS `@media (prefers-reduced-motion: reduce)` override on the same selectors is a second, redundant guarantee (opacity 1, transform none, transition/animation none) in case the JS check ever races a live preference change. Net effect: film exits, page is simply there — no stagger, no translate, instant.

### No interference confirmed

- **Scroll-reveal (`.rp-reveal`):** hero elements (`.rp-hero__content`, `.home-heroProofStack`) are not `.rp-reveal`-tagged — confirmed by reading `RisoHome.tsx` directly, the only `.rp-reveal` instances are `.rp-outcomes` (Proof section) and `.rp-worklist` (Selected Work), both well below the fold and untouched by this change.
- **Queue expander:** `useFilmExitChoreo`'s classes and durations never touch `.home-heroArtifact__frame`, `.home-heroArtifact__expandToggle`, or any queue-row selector — the entrance animates the outer `.home-heroProofStack` wrapper once, at film-exit only; the queue's own expand/collapse transitions are untouched and, in practice, can't overlap this (the choreography settles in ~630ms, well before a reader could click "View the full queue").
- **Weekend Dispatch:** no shared selectors, no shared classes, no shared timers.
- **Dark mode / Spanish:** the new CSS only sets `opacity`/`transform`/`transition`/`animation` on structural selectors — no color, no copy, nothing theme- or language-conditioned. Confirmed by inspection (no `.dark-mode` or i18n-string reference anywhere in the new rules).

### Verification

- **New Jest suite:** `my-app/src/hooks/useFilmExitChoreo.timing.test.ts`, following the fake-timer style of `useFlagshipReveal.timing.test.ts` — a fake `window` with an injectable/controllable `requestAnimationFrame` (queued, manually flushed) and real Jest fake timers for `setTimeout`. Covers: gate class lands immediately, go class lands only after two flushed frames, both classes self-remove after the 900ms settle, the returned cleanup removes both classes immediately mid-sequence and disarms the pending settle timer, reduced motion adds no classes and returns a no-op cleanup, and a rapid re-trigger-before-settle doesn't stack timers that fire late. 5/5 pass.
- **Full suite:** 90/90 tests pass (85 previously + 5 new). `npx tsc --noEmit` clean. `react-scripts build` compiles successfully.
- **Live browser verification, with the honest caveat:** clicking "Watch the 10-second portfolio opener" then the skip control, with a `MutationObserver` on `<html>`'s class attribute, showed exactly the two expected mutations — `rp-filmChoreo` added, then both classes removed together ~1s later (the JS settle timer) — and **never** showed `rp-filmChoreo--go` land. That's the documented "rAF doesn't tick in the automated preview tab" limitation, not a code bug: the pure-function Jest tests above already prove the double-rAF → go-class logic is correct when `requestAnimationFrame` actually fires, which it does in every real browser. What I *could* verify live and did: after the sequence settled, `getComputedStyle` on `.navbar`, `.rp-hero__content`, and `.home-heroProofStack` all read `opacity: 1` — the fail-visible failsafe genuinely holds end-to-end in this environment, exactly as designed, even in the worst case where the animated entrance itself never plays. Cold direct-entry load screenshot confirmed static and fully visible, unchanged from before this pass. I could not visually confirm the staggered fade+translateY actually looks right at 630ms in a real browser — that needs a human eye (or a real, non-automated browser) on the live opener.

### Handoff

**motion-designer → design-builder:** The trickle-down is done — nav at 90ms, hero header/text as one group at 180ms, artifact card at 270ms, all overlapping (not sequential), settling around 630ms total. Everything lives in `useFilmExitChoreo.ts` (the state machine) + the new CSS block in `riso-page.css` right after the opening-film rules — don't touch the film's own dissolve timing, that's the "background blends in first" beat and it's already correct. If you touch `.navbar`, `.rp-hero__content`, or `.home-heroProofStack` for anything else, check this block first so you don't fight the transition. The one thing I couldn't verify myself: this environment's browser tab doesn't run `requestAnimationFrame`, so I never saw the actual fade+slide render live — only that it fails toward fully-visible correctly. Please eyeball it in a real browser before calling this done.

**motion-designer → accessibility-reviewer:** One new animation group (three elements, one shared trigger) to fold into the motion inventory: film-exit trickle-down, opacity + 14px translateY, 300–360ms each, overlapping 90ms-apart starts, settles ~630ms. Reduced motion is a hard skip (no classes added at all, plus a redundant CSS override) — this is the one I'm most confident about, since it's the same three-layer fail-visible/reduced-motion contract already reviewed for the scroll-reveal system. Nothing loops, nothing exceeds 700ms, nothing blocks interaction (the CTAs and skip button remain clickable throughout — only opacity/transform on the wrapper, not `pointer-events`). Flagging one thing for your judgment: the artifact card's `translateY(14px)` moves the recreated filing-queue table itself during its 360ms entrance — small and single-fire, not a loop, but worth your explicit sign-off since it's the one element with real data-table content moving rather than plain marketing copy.


## Orchestrator fix: film-exit overlay was masking the trickle-down (2026-08-27)

Owner report: "still feels like the entire page slams in." Traced the actual timing rather than re-guessing: the overlay's own fade-out (`riso-page.css`, `.rp-openingFilm`/`.is-exiting`) had a 80ms delay + 440ms duration, clearing at t=520ms. The trickle-down choreo underneath (unchanged from the prior pass) finishes fast: navbar settles ~422ms, hero header/text ~552ms — both essentially done at or before the overlay is fully transparent. The stagger was running hidden behind a still-largely-opaque overlay and had mostly finished before it was ever visible — the curtain lifted on an already-formed page, which reads exactly like a slam.

**Fix:** shortened the overlay's own fade only — `440ms → 260ms` duration, `80ms → 40ms` delay, clearing at t=300ms instead of t=520ms. Matched `HomepageOpeningFilm.tsx`'s `EXIT_MS` (unmount timer) from `560ms → 340ms` to stay just past the new clear point. **Did not touch** the choreo's own group delays/durations (90/180/270ms delays, 300/340/360ms durations) — those were fine; only the curtain hiding them was too slow. Now navbar (122–422ms) and hero content (212–552ms) are visibly rising into place as/after the overlay clears, and the artifact (302–662ms) arrives entirely in view. 90/90 tests, `tsc --noEmit` clean.

Not independently visually verified in this session's browser tab (same non-compositing limitation as before) — this is a timing-math fix, verified by tracing the transition schedule, not by watching it. Owner should retry the opener and confirm the trickle now reads as intended.

## Motion-designer: paper-cut reveal (round 3) — 2026-08-27

### The owner's third round of feedback

Verbatim: *"better but still doesn't trickle down like i want, also video doesn't need to be rushed, just the transition from video to background, then slow reveal to nav/everything else, I want the paper cut effect like cut out into portfolio."*

This is a design change, not a timing tweak, and it inverts the previous instinct (make it faster) for one phase specifically:

1. **Video itself** — untouched. `HomepageOpeningFilm.tsx`'s `<video>` element, `autoPlay`, and its natural playback length were not touched at all.
2. **Video → background** — untouched. The existing `.rp-openingFilm`/`.is-exiting` crossfade (poster/video fade to the paper wash, ~300-340ms, tuned in the prior "Orchestrator fix" pass above) stays exactly as it was. Still a fast, real cut.
3. **Nav → hero text → artifact reveal** — completely rebuilt as a slow (1.64s), literal torn-paper cut, replacing the fast 630ms opacity trickle from round 2.

### Implementation approach chosen: (b), a translating masked overlay

The brief offered two options. I chose **(b)** — a separate shaped overlay that translates via `transform` — over (a), an animated clip-path polygon, for the reason the brief itself flagged: interpolating a many-point polygon frame-by-frame is not reliably GPU-composited, while a *static* clip-path shape that only *translates* stays on `transform` the entire time, which is compositor-friendly regardless of point count. Concretely:

- `.rp-filmChoreo .riso-home::before` is a full-viewport-plus-margin rectangle (`top: -20vh; height: 132vh; left/right: -4vw`), painted the page's own paper color, with a **static** 16-point jagged clip-path on its top edge only (bottom/side edges are plain — they never enter the viewport, so their shape is irrelevant). The polygon reuses this file's own deckle-edge coordinate style (see `.carto__fragment--photo`/`.carto__map--base` etc., `riso-page.css:206-281`) — irregular hand-placed points, not a uniform sawtooth: `polygon(0% 4%, 8% 1%, 15% 6%, 23% 2%, 31% 8%, 39% 3%, 47% 7%, 55% 1%, 63% 6%, 71% 2%, 79% 8%, 87% 3%, 94% 7%, 100% 2%, 100% 100%, 0% 100%)`.
- It starts at `translateY(0)` (fully covering the viewport — the jagged teeth sit safely above y=0 the whole time) and animates to `translateY(130vh)` (its own 132vh height plus margin, clearing even the deepest tooth well past the viewport bottom). Only `transform` is transitioned.
- As the box translates down, its **top edge** (the jagged one) is the edge that sweeps across the viewport top-to-bottom, uncovering nav, then hero text, then the artifact in turn — this is the one geometry detail worth being explicit about, since a mask that instead exposed its jagged *bottom* edge as the "reveal line" would have moved the wrong edge across the screen (the bottom edge starts and stays below the viewport the entire time; only the top edge ever crosses it).
- Nav/hero-text/artifact keep the same opacity+translateY(14px) settle vocabulary as round 2, just re-paced to land as the torn edge physically passes each one's position (see the timing trace below), so the cut stays the dominant visual event and the content settle reads as "catching up to" the cut rather than a separate, competing fade.

### A real bug found and fixed during verification, not left in

First implementation attached the mask to `html.rp-filmChoreo::before`. Live verification caught two problems with this:

1. **`--paper` never resolved.** `--paper` (and its dark-mode override) is declared only on `.riso-page` (`riso-page.css:7`, `:48`) — not on `:root`/`html`. Custom properties only cascade to descendants of the element that declares them, and `<html>` sits *outside* the `.riso-page` subtree (it's an ancestor of it, not a descendant). `background: var(--paper)` on `html::before` therefore resolved to nothing, and the mask rendered fully transparent — a real, functional bug, not a coloring nicety, since a transparent "torn paper" mask defeats the whole effect.
2. **Fixed by retargeting to `.riso-home::before`** — `.riso-home` is the actual `<main class="riso-page riso-home">` element, so it declares `--paper` on itself, and its own `::before` inherits it directly (correctly picking up the dark-mode override too, automatically, with no extra code). Confirmed `.riso-home` has no `transform`/`filter`/`perspective` that would hijack the pseudo-element's `position: fixed` into a smaller containing block — it still covers the true viewport. A literal fallback (`var(--paper, #e8ece3)`) was kept as a second, redundant guarantee.

This was caught by direct CSSOM/computed-style inspection in the live dev server (see Verification below), not assumed — I'd encourage treating "does this custom property actually resolve where I attached it" as a standing check for any future pseudo-element-on-an-unusual-host trick in this codebase.

### Full timing trace (hand-worked)

All times are measured from **t=0 = the instant `onExitStart` fires** (i.e., the moment the film's own `finish()` sets `exiting=true` — same trigger point as round 2, unchanged).

| Phase | What | Start | End | Notes |
|---|---|---|---|---|
| 1 | Video plays | — | — | Untouched; ends whenever the video naturally ends or the reader clicks skip |
| 2 | Video → background crossfade | 0ms | ~300-340ms | Untouched (`.rp-openingFilm`/`.is-exiting`, `EXIT_MS`) — still the fast, real cut |
| 3a | Paper-cut mask: covering, motionless | 0ms | 340ms | Mask is present and solid the whole time, invisibly stacked under the still-mounted film (z-index 1150 < film's 1200) until the film unmounts at 340ms, then becomes the topmost visible layer — same paper color as what's revealed underneath, so there's no flash at the handoff |
| 3b | Paper-cut mask: sweeping | 340ms (transition-delay) | 1640ms (340+1300ms duration) | `transform: translateY(0 → 130vh)`, `cubic-bezier(.65,0,.35,1)` — chosen over reusing `--ease-soft` (see below) |
| 3b (derived) | Cut crosses the nav band (y≈0) | ~630ms | ~770ms | Derived from box geometry (top starts at -180px, teeth amplitude ~1-8% of 1188px box height ≈ 12-95px) mapped through hand-sampled points of the new bezier curve |
| 3b (derived) | Cut crosses the hero-text band (y≈300px estimate) | ~890ms | ~940ms | Same method |
| 3b (derived) | Cut crosses the artifact band (y≈650px estimate) | ~1055ms | ~1105ms | Same method |
| 3c | Navbar settle | 610ms (delay) | 870ms (610+260ms) | Opacity 0→1, translateY(14px)→0, right as the cut finishes crossing the nav band |
| 3c | Hero-text settle | 860ms (delay) | 1180ms (860+320ms) | Just after the cut clears the hero-text band |
| 3c | Artifact settle | 1020ms (delay) | 1400ms (1020+380ms) | Just after the cut clears the artifact band, and before the mask itself fully exits |
| — | Total settle (all layers done) | — | 1640ms | Matches the owner's 1.0-1.8s ask; JS unconditional cleanup fires at 1900ms (safety margin), CSS animation backstops fire at 1800ms (content groups) / 2400ms (mask) if the "go" class never lands |

**Confirming phase 2 finishes before phase 3 dominates (the exact bug fixed twice already in this feature):** the mask's `transition-delay` is 340ms, matching `EXIT_MS`/the overlay's ~300-340ms clear point — the cut's visible motion cannot start before phase 2 has already finished, by construction (a hardcoded delay tied to the same value, not a coincidence of two independently-tuned numbers this time).

**Confirming phase 3 stays visible for its whole duration rather than getting masked:** nothing sits on top of the paper-cut mask after the film unmounts at 340ms (z-index 1150 is the highest layer left in play at that point; the film itself, at 1200, is gone). The mask is the dominant visible thing from 340ms to 1640ms, full stop — there is no second overlay this time that could hide it partway through, which is precisely the failure mode both prior rounds hit.

### Why a new easing curve, not `--ease-soft`

Hand-sampled `cubic-bezier(.2,.8,.2,1)` (the existing `--ease-soft`, used for round 2's fast 300-360ms fades) at t=0.1...1.0 using the standard cubic Bézier formula. Result: by 27.5% of the duration elapsed, 80% of the motion is already done; by 47%, 93.5% is done. That's correct for a 300ms micro-interaction (snappy, settles fast) but wrong for a 1.3s reveal the owner explicitly wants to be "unhurried" and "watchable" — reusing it would make the cut look nearly finished within ~350ms, then crawl imperceptibly for the remaining ~950ms, undermining the entire point of slowing it down.

Sampled `cubic-bezier(.65,0,.35,1)` instead (a symmetric ease-in-out): at t=0.5, X=Y=0.5 exactly (by construction, since the curve is symmetric about its center) — meaning at 50% of the duration elapsed, 50% of the motion is done. The full sampled table (X=time fraction, Y=progress fraction): X=0.168→Y=0.028, X=0.291→Y=0.104, X=0.380→Y=0.216, X=0.500→Y=0.500, X=0.620→Y=0.784, X=0.709→Y=0.896, X=0.832→Y=0.972. This is close to constant-velocity through the middle with gentle ease at both ends — which is what reads as a deliberate, watchable pull rather than a fast snap that stalls. This curve is new to this codebase (not a reuse of an existing token); I judged that reusing `--ease-soft` here would actively work against the owner's stated intent, which outweighs the general preference to reuse existing tokens for a single, well-justified exception.

### Fail-visible mechanism (unchanged in kind, timings bumped)

Same three-layer contract as round 2, just re-timed for the longer duration:

1. **No class, no hidden state.** `.rp-filmChoreo .riso-home::before` and the nav/hero/artifact hidden rules only match under the gate class. Cold loads never get it.
2. **JS settle timer**, `useFilmExitChoreo.ts`: bumped `SETTLE_MS` from 900ms → **1900ms** (the slowest real settle, the artifact at 1400ms, plus real margin before the mask's own 1640ms finish).
3. **CSS animation backstop**: the mask's own backstop bumped 1500ms-equivalent → **2400ms** (`rp-cut-failsafe`, drags it fully off-screen if "go" never lands); the content groups' backstop bumped 1500ms → **1800ms** (`rp-choreo-failsafe`).

`prefers-reduced-motion: reduce` unchanged in approach: `useFilmExitChoreo` still skips adding any class at all (so there's no hidden state to begin with), plus a redundant CSS override that also removes the mask pseudo-element via `content: none` (not just hides it) and forces the content groups to their end state instantly.

### Verification

- **Tests:** `CI=true npx react-scripts test --watchAll=false` — 8 suites, **90/90 passing**. Two timing-constant updates in `useFilmExitChoreo.timing.test.ts` (899ms→1899ms and the final 900ms→1900ms advance, matching the bumped `SETTLE_MS`); no new test needed since `triggerFilmExitChoreo`'s state-machine shape didn't change, only the constant.
- **TypeScript:** `npx tsc --noEmit` — clean. **Production build:** `CI=true npx react-scripts build` — compiles successfully.
- **Cold direct-entry load confirmed unaffected:** `coldLoadHasFilmChoreo: false`, `.navbar` opacity `1`, checked live before touching anything else; hero screenshot at the end of the session is pixel-normal, no film, no mask.
- **Live CSSOM/computed-style verification, with an honest account of a real dead-end I chased first:** this session's browser tab reports `document.hidden: true` and `window.innerHeight: 0`/`window.innerWidth: 0` by default — the same "animation timeline isn't ticking" limitation flagged in both prior rounds, and it also zeroes out any `vh`/`vw`-based computed value (my first read of the mask's `top`/`height`/`left`/`right` all came back `0px`, which had nothing to do with my CSS and everything to do with the tab being backgrounded). Setting an explicit emulated viewport (1440×900) resolved this immediately and let me confirm the mask's actual computed geometry matches the hand-worked math exactly: `top: -180px` (=-20vh × 900px), `height: 1188px` (=132vh), `left`/`right: -57.6px` (=-4vw × 1440px), `background: rgb(232, 236, 227)` (=`#e8ece3`, the correct light-mode `--paper`), `z-index: 1150`, `transition-duration: 1.3s`, `transition-delay: 0.34s`. Adding only the gate class (no "go") confirmed nav/hero/artifact all compute to `opacity: 0`/`transform: translateY(14px)` synchronously, and the mask to `translateY(0)` (identity matrix) — the correct pre-cut hidden state. Adding the "go" class confirmed the mask's `transform` resolves to exactly `matrix(1,0,0,1,0,1170)` (`translateY(1170px)` = 130vh at 900px), its `animation-name` flips to `none`, and nav/hero/artifact all resolve to `opacity: 1`/`transform: none` — the correct end state.
- **What I could not verify live:** the actual eased sweep of the mask animating in real time — i.e., watching the torn edge visually travel down the viewport over its 1.3s duration and confirming it *looks* like an unhurried paper cut rather than confirming its start/end computed values are correct. This tab's `requestAnimationFrame`/animation timeline does not reliably tick (same limitation both prior rounds hit), so I could only confirm the mechanism's start state, end state, and exact geometry/timing values by hand and via computed style — not the felt motion in between. A real-browser eyeball check of the FEEL (does the cut read as deliberate and satisfying, does the torn edge look convincingly like paper rather than a mechanical wipe) is still owed, same standing caveat as both prior rounds.
- **Regression check:** grepped for any other consumer of `.rp-filmChoreo`, `.navbar`, `.rp-hero__content`, or `.home-heroProofStack` that this change might affect — none found beyond what round 2 already inventoried (Direction C's queue-expander and the scroll-reveal system share no selectors or timers with this feature). Full 90-test suite (which includes Direction C's and the scroll-reveal system's own focused suites) stayed green throughout.

### Handoff

**motion-designer → orchestrator:** The paper-cut is built and its timing/geometry is verified by hand-math and live computed-style checks, but — same as both prior rounds — I could not watch the actual eased sweep render in this environment, only confirm its start/end states and exact numbers are correct. Please have the owner retry the opener in a real browser and confirm it reads as the deliberate, watchable "cut out into portfolio" moment she described, not just that the numbers check out. If it still feels off, the two highest-leverage dials are the total duration (`1300ms` in `.rp-filmChoreo .riso-home::before`, `riso-page.css`) and the easing curve (`cubic-bezier(.65,0,.35,1)`, same rule) — both isolated to that one rule, nothing else needs to change to retune the feel.

## Motion-designer: paper-delivery arrival (round 4, replaces round 3) — 2026-08-27

### The owner's fourth round of feedback — a pivot, not a refinement

Verbatim, after watching a generated reference video of round 3's paper-cut clip-path sweep: *"this has nothing to do with what i need... I want a paper feel like the MTA coming in, but for all the parts of the main page."* Follow-up clarification via direct questions:

- **What to borrow from the Weekend Dispatch train:** both its arrival MOTION (a physical object gliding along a path and settling/arriving into position — not a fade, not a mask-wipe) and its paper-craft VISUAL quality (reads as paper/cardstock in motion, not a flat div fading in).
- **What NOT to borrow:** the train's literal subway iconography (rails, window bands, doors, placard) — that vocabulary is specific to the Weekend Dispatch section's own "MTA train delivering an issue" concept, and reusing it in the hero would be a second, confusing metaphor, off-brief for "quiet authority."
- **Per-group arrival directions:** nav slides down from the top; the hero header/text column slides in from the left; the artifact card slides in from the right — like separate deliveries, each arriving at its own spot, echoing the train arriving at its own platform, rather than everything sliding the same direction.

### What was removed

Round 3's entire mechanism, in full: the `.rp-filmChoreo .riso-home::before` translating torn-edge mask (a full-viewport rectangle with a static 16-point deckle clip-path on its top edge, sliding `translateY(0 → 130vh)` over 1300ms), its `rp-cut-failsafe` backstop keyframe, and the mask-paced nav/hero/artifact opacity+`translateY(14px)` settle rules tuned to land as the torn edge swept past each group. All of it is gone from `riso-page.css` — not tuned, not extended. Its full former implementation and hand-worked timing trace are preserved above ("Motion-designer: paper-cut reveal (round 3)") if this ever needs to be revisited. Phases 1 (video) and 2 (video → background crossfade, `.rp-openingFilm`/`.is-exiting`) are untouched for the fourth round running — still the fast ~300ms real cut fixed in the "Orchestrator fix" pass.

### What was built

Three independent groups, each a directional slide-in with a moving-state two-layer shadow that resolves to the element's true resting shadow (or no shadow) once arrived:

| Group | Selector | Direction | Resting shadow (unchanged) |
|---|---|---|---|
| Navbar | `.navbar` | `translateY(-100%) → 0` (down from above) | none — App.css's `.navbar` is a hairline border-bottom + backdrop blur only |
| Hero header/text | `.rp-hero__content` | `translateX(-18%) → 0` (in from the left) | none — plain text column, no card chrome |
| Artifact card + headshot wrapper | `.home-heroProofStack` | `translateX(+18%) → 0` (in from the right) | none on the wrapper itself — `.home-heroArtifact__frame` inside it keeps its own permanent shadow + hover treatment, completely untouched |

Travel distance for the two horizontal groups is a **percentage of the element's own width** (`-18%`/`+18%`), not a fixed pixel value, so the same rule reads proportionally correct whether the column measures ~500px on a narrow layout or ~830px on a wide desktop one — confirmed live at 1440px: hero content resolved to exactly `-150.34px` (≈18% of its own rendered width) and the artifact wrapper to `+87.92px`, both computed by the browser from the percentage rule, not hardcoded.

**Easing — reused, not invented:** `--rp-arrival-ease: cubic-bezier(.22, 1, .36, 1)`, lifted verbatim from `.rp-dispatchTrain--returning .rp-dispatchTrain__vehicle`'s own transition (`riso-page.css`, ~line 1996). This is literally the Weekend Dispatch train's own return-arrival curve — already shipped, tuned, and proven in this exact codebase — reused rather than adapting `--ease-soft` (round 2's curve, which front-loads too much of its motion for a curve meant to read as "arriving") or inventing a new one. This is the most direct, literal reading of "borrow the train's arrival motion" available: not a train-flavored new curve, the actual curve.

**Shadow treatment — the "paper card" tell:** each group carries a two-layer (tight + ambient) `box-shadow` only while `.rp-filmChoreo` is present and `.rp-filmChoreo--go` is not yet, transitioning to `none` once the go class lands — reusing this file's own two-layer shadow vocabulary (see `.rp-dispatchTrain__vehicle`, `.home-heroArtifact__frame`, `.rp-device`-hover) rather than inventing a new shadow scale:
- Navbar: `0 2px 4px rgba(0,0,0,.10), 0 18px 34px -20px rgba(0,0,0,.28)`
- Hero content: `0 1px 3px rgba(0,0,0,.08), 0 14px 28px -20px rgba(0,0,0,.22)` (deliberately the softest of the three — it's a plain text column, not card chrome, so the tell is a light lift rather than a hard box)
- Artifact wrapper: `0 3px 6px rgba(0,0,0,.12), 0 22px 44px -22px rgba(0,0,0,.34)` (the strongest — it's genuinely an "artifact" already, per the existing `.home-heroArtifact__frame` shadow scale it echoes)

`box-shadow` is not GPU-compositable the way `opacity`/`transform` are — transitioning it forces a paint (not a layout reflow) confined to each of these three small elements, once per settle. Accepted deliberately for the tell, and not a new trade-off for this file: the existing `.rp-device`/`.rp-strip__frame`/`.rp-ba__frame` hover rules and `.home-heroArtifact__frame:hover` already animate `box-shadow` the same way.

### Full timing trace (hand-worked, t=0 = `onExitStart`)

| Phase | What | Start | End | Notes |
|---|---|---|---|---|
| 1 | Video plays | — | — | Untouched |
| 2 | Video → background crossfade | 0ms | ~300-340ms | Untouched (`.rp-openingFilm`/`.is-exiting`, `EXIT_MS`) |
| 3 | Navbar arrival | 340ms | 960ms (340+620) | Starts the instant phase 2 clears; reads as the page's own frame settling first |
| 3 | Hero content arrival | 560ms | 1240ms (560+680) | Starts 220ms after nav **started** (not finished) — nav is ~35% into its own 620ms motion |
| 3 | Artifact card arrival | 680ms | 1400ms (680+720) | Starts 120ms after hero started — close enough behind that hero+artifact read as one delivery event with two packages |
| — | Total settle | — | 1400ms | CSS animation backstop at 1600ms (200ms margin); JS unconditional cleanup (`SETTLE_MS`) at 1700ms (100ms further margin) |

340ms matches phase 2's own clear point exactly (same value as `EXIT_MS` in `HomepageOpeningFilm.tsx`), so nothing in phase 3 can start moving before the crossfade has actually finished — the identical race-the-still-opaque-overlay bug already fixed twice in this feature, guarded against by construction rather than by re-tuning two independent numbers to coincidentally line up.

**Why 1400ms total, not round 2's 630ms or round 3's 1640ms:** the owner's "slow reveal" direction (round 2) still stands and is honored — 1400ms is unambiguously slower and more deliberate than round 2's rejected 630ms trickle. It's faster than round 3's 1640ms because that duration was serving a mask that had to physically sweep the full viewport height; a direct card-slide has no equivalent travel requirement. The three per-group durations (620/680/720ms) already sit at this project's own documented ceiling for "complex choreography" (400-700ms per the motion-designer duration table); stretching any one of them further to manufacture a bigger total would trade away that discipline for no benefit to how "unhurried" the sequence actually reads.

### Two real bugs found during verification, not left in

**Bug 1 — a CSS comment inside a `transition` value list silently breaks the whole shorthand.** First draft placed an explanatory comment between the `transform` and `box-shadow` lines of the shared rule's multi-line `transition:` declaration. Live inspection caught that this made the browser compute `transition-property`/`-duration`/`-timing-function` as **empty strings** for hero and artifact (both of whose declarations included the comment), while nav's comment-free version of the same rule worked. Confirmed via `getComputedStyle` before and after: pre-fix, hero/artifact's opacity/transform never left their resting values under the gate class at all (no working transition to have even entered a hidden state cleanly); post-fix, `transition-property` correctly reads `opacity, transform, box-shadow` for all three groups. Fixed by moving the explanation to a standalone comment above the rule and leaving the value list itself a plain, comment-free comma list.

**Bug 2 — a same-specificity, later-loaded rule silently cancelled the navbar's transition and shadow.** `portfolio-cohesion.css`'s `:root .navbar` rule (specificity `(0,2,0)` — `:root` counts as a class-level selector) sets the navbar's own `box-shadow: none` and `transition: background-color .2s ease, border-color .2s ease`. My first draft's bare `.rp-filmChoreo .navbar` is *also* `(0,2,0)`, and — loaded earlier in the bundle than `portfolio-cohesion.css` — lost that tie. Confirmed live: with the bare selector, `.navbar`'s computed `transition-property` read `background-color, border-color`, not `opacity, transform, box-shadow`; `opacity` and `transform` still reached the correct values (nothing else sets those two specifically), but with **no transition at all** — the navbar would have snapped instantly into place with no glide and no visible shadow, defeating the entire "paper card arriving" point for that one group specifically. Fixed by prefixing every selector in this feature with the `html` type selector (`html.rp-filmChoreo .navbar`, etc.) — raising specificity to `(0,2,1)`, which beats `(0,2,0)` in the type-selector tier regardless of source order, without a class bump or `!important`. Verified live post-fix: `.navbar`'s `transition-property` correctly reads `opacity, transform, box-shadow` and its `box-shadow` picks up this rule's value again.

Both bugs were caught the way this feature's standing verification discipline requires — direct `getComputedStyle`/CSSOM inspection against the exact declared values, not assumed from reading the CSS back — and both are exactly the class of defect that "looks right in the source, fails in the cascade" review misses.

### Verified start/end states (live, transitions forcibly disabled to bypass this environment's timeline limitation — see below)

With `* { transition: none !important; animation: none !important; }` injected and `.rp-filmChoreo` (no `--go`) applied at 1440×900:

| Group | opacity | transform | box-shadow |
|---|---|---|---|
| Navbar | `0` | `translateY(-65.7969px)` (=100% of its 66px rendered height) | `0 2px 4px rgba(0,0,0,.1), 0 18px 34px -20px rgba(0,0,0,.28)` |
| Hero content | `0` | `translateX(-150.335px)` (=18% of its own rendered width) | `0 1px 3px rgba(0,0,0,.08), 0 14px 28px -20px rgba(0,0,0,.22)` |
| Artifact wrapper | `0` | `translateX(87.9187px)` (=18% of its own rendered width, positive/rightward) | `0 3px 6px rgba(0,0,0,.12), 0 22px 44px -22px rgba(0,0,0,.34)` |

Adding `.rp-filmChoreo--go` on top resolved all three to `opacity: 1`, `transform: none`, `box-shadow: none` — the correct settled state, matching each group's true resting look exactly.

### Fail-visible mechanism (same three-layer contract, re-timed)

1. **No class, no hidden state.** The hidden-state rules only match under `html.rp-filmChoreo`; cold direct-entry loads never get it — confirmed live (`coldLoadHasFilmChoreo: false`, `.navbar` computed `opacity: 1`).
2. **JS settle timer.** `useFilmExitChoreo.ts`'s `SETTLE_MS` moved from round 3's 1900ms to **1700ms** (the new slowest real settle, the artifact at 1400ms, plus a genuine ~300ms margin).
3. **CSS animation backstop.** `rp-arrival-failsafe`, at **1600ms** (down from round 3's 1800ms), snaps all three groups to their arrived state if the "go" class never lands, 100ms ahead of the JS cleanup.

`prefers-reduced-motion: reduce`: unchanged in approach — `useFilmExitChoreo` still skips adding any class at all when the media query matches, so there is no hidden state to transition out of; a redundant CSS override under the same media query forces `opacity: 1; transform: none; box-shadow: none; transition: none; animation: none;` on all three groups in case the JS check ever races a live preference change.

### Verification

- **Tests:** `CI=true npx react-scripts test --watchAll=false` — 8 suites, **90/90 passing**. `useFilmExitChoreo.timing.test.ts` updated for the new `SETTLE_MS` (1899→1699, the two 1900ms advances→1700/1800) — no new test needed since the state machine's shape is unchanged from round 3, only the constant moved.
- **TypeScript:** `npx tsc --noEmit` — clean. **Production build:** `CI=true npx react-scripts build` — compiles successfully; CSS bundle is 113 bytes *smaller* than round 3's (a translating full-viewport mask plus its backstop keyframe cost more than three small directional slides).
- **Cold direct-entry load confirmed unaffected**, twice (once before and once after the specificity fix): `coldLoadHasFilmChoreo: false`, `.navbar` computed `opacity: 1`, both live.
- **Live verification, with the same honest environment caveat every round has hit:** this tab's CSS transition/animation timeline does not advance even under real `setTimeout`-based waiting driven from inside the page itself (not just `requestAnimationFrame`) — an in-page async trace that waited a genuine 960ms past the navbar's own delay+duration window, sampling computed opacity/transform/box-shadow every ~150ms, showed the value frozen at its pre-change state for the entire trace, never once moving toward its target. This is the same documented limitation every prior round hit, now additionally confirmed to survive real wall-clock `setTimeout` waits (not just `requestAnimationFrame`), and it is why the two live bugs above were caught by `getComputedStyle` inspection of static gate/go states, never by watching the motion itself render. **What I could verify:** exact start values, exact end values, and — via a `!important` override injecting a fixed halfway position/opacity/shadow with transitions disabled — a static screenshot of an artificial mid-arrival frame. That screenshot shows the navbar faded and lifted just above its masthead line, the hero column faded and shifted left, and the artifact wrapper faded and shifted right, each carrying its two-layer shadow — the three read as distinct paper objects still in transit, not a single mask or a flat cross-fade. **What I could not verify:** the felt quality of the actual glide-and-settle in real time — whether `cubic-bezier(.22, 1, .36, 1)` genuinely reads as "confident approach, gentle settle" rather than too abrupt or too soft at these specific durations, and whether the three staggered starts read as one coherent delivery event rather than three separate ones. That needs a human eye in a real, non-automated browser.
- **Dark mode / Spanish:** confirmed live by toggling both from the running hero — structure, spacing, and copy render identically to before this pass in both dark mode and Spanish; the new CSS sets no color, no copy, and no theme/language-conditioned selector anywhere (only `opacity`/`transform`/`box-shadow`/`transition` on structural selectors), so this holds by construction, not just by this one spot-check.
- **Regression check:** grepped for every consumer of `.rp-filmChoreo`, `.navbar`, `.rp-hero__content`, and `.home-heroProofStack` — none found beyond what round 2/3 already inventoried (Direction C's queue-expander and the scroll-reveal system share no selectors or timers with this feature, and are untouched). Full 90-test suite, which includes both of those suites, stayed green throughout every edit in this round, including both bugfixes.

### Handoff

**motion-designer → orchestrator:** Round 3's mask is gone; the hero now does three independent paper-card deliveries — nav down from the top (340-960ms), hero text in from the left (560-1240ms), the artifact card in from the right (680-1400ms) — each fading in with a two-layer shadow that resolves to its true resting shadow (none, for all three) as it settles, using the Weekend Dispatch train's own arrival curve (`cubic-bezier(.22,1,.36,1)`, lifted verbatim, not reinvented). Two real bugs surfaced and got fixed during verification, not just found and left: a comment embedded inside the `transition` value list silently broke hero/artifact's whole transition (fixed by moving it out), and a same-specificity `:root .navbar` rule from `portfolio-cohesion.css` was cancelling the navbar's transition and shadow entirely (fixed by adding an `html` type-selector prefix everywhere in this feature, `(0,2,0)`→`(0,2,1)`). Every start/end state and the exact geometry is confirmed correct via live `getComputedStyle`, and a forced static mid-arrival frame confirms the shadow/position treatment genuinely reads as paper-card objects still in transit. **Unverified, same as every round before this one:** the actual felt motion in real time — this environment's transition/animation timeline never advances even under a real in-page `setTimeout` wait, so I could not watch the glide-and-settle itself, only its start state, its end state, and a hand-constructed intermediate frame. Please have the owner retry the opener in a real browser. If the arrival feels too fast or too soft, the highest-leverage dial is `--rp-arrival-ease` (one custom property, shared by all three groups) or each group's own `--rp-choreo-dur`/`--rp-choreo-delay` pair — all isolated, nothing else needs to change to retune the feel.


## Orchestrator: the real film-exit bug, found and fixed (2026-08-27)

Owner reported, across several retests (server restarts, hard refresh, reduced-motion ruled out), that the paper-delivery arrival never visibly happened — "just a load into portfolio." Root cause, found via `getAnimations()` instrumentation logged in the OWNER'S OWN real browser (not just this session's unreliable automated tab):

**The bug:** the base "hidden" rule (`html.rp-filmChoreo .navbar, ...`) declared `opacity: 0` *and* `transition-delay: var(--rp-choreo-delay, 340-680ms)` on the same rule. `useFilmExitChoreo.ts`'s double-rAF adds the `.rp-filmChoreo--go` class only ~16-50ms later — far sooner than that delay. Per CSS transition semantics, a transition holds the *old* value for its entire delay period before animating; since the go-class's `opacity: 1` target landed while the hide-transition was still in its (never-started) delay phase, the value never left `1` in the first place. There was nothing to reveal because nothing had ever hidden. Confirmed directly: `getAnimations()` in the owner's browser showed every transition at `currentTime: 0, startTime: null` (still pre-play) at the exact instant computed opacity read back `1`.

Why the working scroll-reveal system (`.rp-reveal`) doesn't have this bug: its two class additions (`js-reveal` then `is-in`) are separated by *real user scroll time* (seconds), not a scripted double-rAF (milliseconds) — the hide transition has already fully completed long before the reveal is triggered.

**Fix:** moved the `transition`/`transition-delay` declaration off the base (hidden) rule entirely (now `transition: none` — the hide is instant and invisible-to-the-user-anyway, since it happens while still behind the film overlay) and onto the `.rp-filmChoreo--go` rule, so `--rp-choreo-delay`/`--rp-choreo-dur` only ever gate the *reveal*, never race a hide that hadn't started.

**Verified in the owner's real browser** (not just this session's tooling) via a temporary `window.__choreoLog` + `getAnimations()` instrumentation in `useFilmExitChoreo.ts` — before the fix: `navbar opacity right now = 1` immediately after gate class. After the fix, re-verified live: `navbar opacity right now = 0` at gate time, transform offset correctly applied per group (navbar translateY(-64px), hero content translateX(-8px), artifact translateX(+2.9px)), and full settle to opacity 1/transform none ~2.2s later with classes cleaned up. 90/90 tests, `tsc --noEmit` clean.

**Cleanup still owed:** the temporary debug logging (`window.__choreoLog`, the bolded console "DONE" summary, the `getAnimations()` dump) in `useFilmExitChoreo.ts` should be removed once the owner confirms this live — flagged, not yet done, so as not to touch anything again before she's had a chance to see it work.

## Motion-designer: scrapbook texture pass (round 5) — 2026-08-27

Scope: give the confirmed-working round-4 arrival (nav down, hero text from the left, artifact from the right) a scrapbook material quality during transit only — a brief grain pass and a slight physical-imperfection tilt per group — without touching any of round 4's timing, directions, or the fail-visible/specificity fixes already verified working in the owner's real browser.

### The brief, in one line

Owner, after watching round 4 actually work: *"ok i see the movement but i want the scrap book feel like the video has."* She's referencing an earlier-session Higgsfield reference video of a torn-paper-cut effect — a mechanism she separately rejected outright in round 3 ("this has nothing to do with what i need") and which stays dead here too; nothing in this pass reintroduces a cut/mask/reveal-through-a-hole idea. What carries over is the reference's **material quality only**: visible paper grain, a tactile "physically placed" imperfection — not a clean vector slide.

### What was reused (Path B — no new assets, no new register)

1. **Grain texture** — `.rp-grain`'s exact SVG `feTurbulence` data URI (`riso-page.css` ~line 54), same `mix-blend-mode: multiply` (light) / `screen` (dark, lower opacity) technique. Not regenerated, not a new asset — copied verbatim as the `background-image` on each group's new `::after`.
2. **Rotation register** — `.rp-dispatch__photo`'s resting tilt (`rotate(-.45deg)`, `riso-page.css` ~line 1706) is the base reference point the brief named explicitly. I widened my sampling to this file's other scrapbook-style tilts to find the actual register this codebase already uses for "physically placed, slightly imperfect" elements: `.rp-cinema__artifact--reminder/--safety/--note` (`-1.2deg`/`.7deg`/`-.6deg`), `.rp-groveStates`'s fanned state (`-2deg`…`2deg`), `.rp-leg__pin` (`±2deg`). The consistent range across all of these is roughly half a degree to two degrees — never more. I chose `-1deg` / `-1.6deg` / `1.3deg` for navbar / hero content / artifact respectively: inside that established range, but toward its lower-middle rather than its ceiling, per the brief's explicit "if in doubt, use LESS... not more" instruction. Each group gets a different sign and amount on purpose — like three separately-placed scrapbook pieces, not one tilt value applied three times.

### What was built

Two additions per group, both scoped to the exact same `.rp-filmChoreo` (no `--go`) transit window round 4 already established — nothing here introduces a new gate class or timing source:

**1. Rotation** — added directly into each group's existing hidden-state `transform` declaration (round 4 already had `translateY(-100%)`/`translateX(±18%)` there; I appended a `rotate()` term to each):
- `.navbar`: `translateY(-100%) rotate(-1deg)`
- `.rp-hero__content`: `translateX(-18%) rotate(-1.6deg)`
- `.home-heroProofStack`: `translateX(18%) rotate(1.3deg)`

The `--go` rule's existing `transform: none` already resolves both the translate and the new rotate to identity — no change needed there. This is the smallest possible touch to round 4's architecture: one new function inside an existing property value, not a new property, not a new transition entry, not a new selector for the parent rule.

**2. Grain overlay** — a new `::after` pseudo-element per group, since none of the three groups already used `::after` (confirmed via grep, no collision):

```css
html.rp-filmChoreo .navbar::after,
html.rp-filmChoreo .rp-hero__content::after,
html.rp-filmChoreo .home-heroProofStack::after {
  content: "";
  position: absolute;
  inset: 0;
  z-index: 2;
  pointer-events: none;
  background-image: url("data:image/svg+xml,...feTurbulence...");
  mix-blend-mode: multiply;
  opacity: .32;
  transition: none;
  animation: rp-arrival-grain-failsafe 1ms linear 1600ms forwards;
}
html.dark-mode.rp-filmChoreo .navbar::after,
html.dark-mode.rp-filmChoreo .rp-hero__content::after,
html.dark-mode.rp-filmChoreo .home-heroProofStack::after {
  mix-blend-mode: screen;
  opacity: .12;
}
html.rp-filmChoreo.rp-filmChoreo--go .navbar::after,
html.rp-filmChoreo.rp-filmChoreo--go .rp-hero__content::after,
html.rp-filmChoreo.rp-filmChoreo--go .home-heroProofStack::after {
  transition: opacity var(--rp-choreo-dur, 620ms) ease-out;
  transition-delay: var(--rp-choreo-delay, 340ms);
  opacity: 0;
  animation: none;
}
@keyframes rp-arrival-grain-failsafe { to { opacity: 0; } }
```

Design notes:
- **`pointer-events: none`** on the overlay is non-negotiable per the brief and confirmed by construction — the navbar's real nav links stay in the DOM underneath, completely unaffected by the overlay sitting visually on top of them.
- **Opacity chosen low deliberately** (`.32` light / `.12` dark) — matches `.rp-grain`'s own light-mode value (`.5`) scaled down, and its dark-mode value (`.14`) nearly exactly, erring toward less per the "quiet authority" taste-profile instruction rather than a heavier, more attention-grabbing grain.
- **`transition: none` on the base rule, real transition on the `--go` rule only** — the exact same architecture round 4's own documented "Bug 1"/"Bug 2" section established as load-bearing (a `transition-delay` on the base/hidden rule would race the double-rAF gate-then-go sequence and the grain would never actually appear, the same underlying bug the orchestrator found and fixed for the parent groups' opacity). I did not re-discover this bug; I built the grain rule to the same pattern from the start specifically because that section documents why the naive version is wrong.
- **`html` type-selector prefix on every selector** — same round-4 "Bug 2" specificity discipline (a bare `.rp-filmChoreo .navbar::after` would tie `:root .navbar`'s specificity and risk losing to it on source order); the grain rules never had this exact collision (no third-party rule targets `.navbar::after`), but the prefix costs nothing and keeps the whole feature's selectors at one consistent, documented specificity discipline rather than mixing conventions.
- **`html.dark-mode.rp-filmChoreo` is a same-element compound selector, not a descendant one** — `.dark-mode` is toggled on `document.documentElement` (`app/App.tsx:38`), the same element `.rp-filmChoreo` is added to, so both classes coexist on `<html>` simultaneously; this is not `.dark-mode` wrapping the gated subtree.
- **A second failsafe, separate from round 4's** — round 4's `rp-arrival-failsafe` keyframe only ever targeted the parent group's `opacity`/`transform`/`box-shadow`; it has no reach into a separate pseudo-element box. Added `rp-arrival-grain-failsafe` (identical shape, same 1600ms delay) so the grain can't get stuck visible in the same hypothetical "go class never lands" scenario round 4's own failsafe guards against. In practice this rarely matters — `useFilmExitChoreo.ts`'s `SETTLE_MS` (1700ms) unconditionally strips `.rp-filmChoreo` from `<html>` shortly after, which makes every rule in this feature (grain included) stop matching and revert to nothing, independent of any CSS-side failsafe — but it keeps the grain's fail-visible contract symmetric with the parent's, not a weaker cousin of it.

### Verified start/end states (live, transitions forcibly disabled — see honest caveat below)

Read via `getComputedStyle` at three states, with `.rp-filmChoreo`/`--go` classes toggled directly on `<html>`:

| State | Group transform | Group opacity | Grain (`::after`) opacity | Grain content |
|---|---|---|---|---|
| Resting (no `.rp-filmChoreo`) | `none` | `1` | — | `none` (pseudo doesn't exist) |
| Hidden (`.rp-filmChoreo`, no `--go`) | rotated+translated matrix (below) | `0` | `.32` (light) / `.12` (dark) | `""` (present) |
| Settled (`.rp-filmChoreo--go`) | `none` | `1` | `0` | `""` (present, but invisible) |

Hidden-state transform matrices confirmed live, decomposed and matched against the declared `rotate()` values:
- Navbar: `matrix(0.999848, -0.0174524, 0.0174524, 0.999848, 0, -64.1875)` → `cos(-1°)=0.99985`, `sin(-1°)=-0.01745` ✓, plus the `translateY` offset.
- Hero content: `matrix(0.99961, -0.0279216, 0.0279216, 0.99961, -8.06344, 0)` → `cos(-1.6°)=0.99961`, `sin(-1.6°)=-0.02792` ✓.
- Artifact: `matrix(0.999743, 0.0226873, -0.0226873, 0.999743, 2.88, 0)` → `cos(1.3°)=0.99974`, `sin(1.3°)=0.02269` ✓.

Dark mode confirmed live: grain opacity reads `.12` and `mix-blend-mode: screen` under `html.dark-mode.rp-filmChoreo`, vs. `.32`/`multiply` without `.dark-mode` — matching the declared rule exactly.

**A verification-methodology bug I found and fixed in my own check, not in the shipped CSS:** my first pass disabled transitions with a bare `* { transition: none !important }` override — this does **not** match `::before`/`::after` generated boxes (the universal selector only selects real elements), so the grain pseudo-element's own `transition: opacity ...` from the `--go` rule was still technically "live," and since this environment's animation timeline doesn't advance (the same documented limitation every round has hit), reading computed opacity immediately after adding `--go` returned a frozen pre-transition value (`.32`) instead of the true settled target (`0`) — which would have read as a false failure. Corrected the check to `*, *::before, *::after { transition: none !important }` and re-verified: settled grain opacity reads `0` exactly, matching the CSS as declared. Flagging this because it's exactly the kind of thing that could have been misreported as a bug in the shipped rule when the actual issue was in the verification harness.

### `prefers-reduced-motion`

Unchanged in approach from round 4 — extended the same existing media block rather than adding a new one:

```css
@media (prefers-reduced-motion: reduce) {
  html.rp-filmChoreo .navbar,
  html.rp-filmChoreo .rp-hero__content,
  html.rp-filmChoreo .home-heroProofStack {
    opacity: 1; transform: none; box-shadow: none; transition: none; animation: none;
  }
  html.rp-filmChoreo .navbar::after,
  html.rp-filmChoreo .rp-hero__content::after,
  html.rp-filmChoreo .home-heroProofStack::after {
    content: none;
  }
}
```

`content: none` removes the generated box outright — "not present," per the brief's own stated default, rather than "present but static." No rotation to separately neutralize here since the existing `transform: none` on the parent rule already collapses it.

### Verification

- **Tests:** `CI=true npx react-scripts test --watchAll=false` — 8 suites, **90/90 passing**, no test changes needed (this pass touches no markup, no component, no test-observable DOM structure — CSS-only).
- **TypeScript:** `npx tsc --noEmit` — clean.
- **Production build:** `CI=true npx react-scripts build` — compiles successfully; CSS bundle +122 bytes gzip over round 4 (three small `::after` rule sets plus one keyframe).
- **Resting/cold-load state confirmed unaffected:** with no `.rp-filmChoreo` class ever added, all three groups read `opacity:1, transform:none, box-shadow:none`, and each `::after`'s `content` computes to `none` (pseudo doesn't exist) — no lingering grain, no lingering rotation, matching the brief's explicit "must look EXACTLY as they do today once settled" requirement.
- **Live verification, same honest caveat as every round:** this tab's CSS transition/animation timeline does not advance even under real waiting, so — same as round 4 — I could not watch the grain fade or the rotation un-tilt happen in real time, only its start state, its end state (transitions force-disabled), and the decomposed matrices proving the exact rotation values are applied. I did catch and fix one methodology mistake of my own during this check (documented above) rather than reporting a false negative.
- **`prefers-reduced-motion`:** verified by source inspection only — this session's tooling has no control to force the OS-level media feature, consistent with every prior round's own flagged limitation. The CSS pattern (`content: none` on the grain pseudo, `transform: none` already covering rotation) mirrors what round 4 already shipped and described the same way.

### Handoff

**motion-designer → orchestrator:** Both scrapbook ingredients are live on top of round 4's confirmed-working arrival, without touching any of its timing, directions, or the two specificity/comment bugs it already fixed. Grain: a low-opacity (`.32`/`.12` dark) reuse of `.rp-grain`'s exact SVG technique, `pointer-events:none`, visible only during transit, gone (`opacity:0`, and removed outright under reduced motion) by the time each group settles. Tilt: `-1deg`/`-1.6deg`/`1.3deg` on navbar/hero-content/artifact respectively, sourced from `.rp-dispatch__photo`'s own resting-rotation register and this file's other scrapbook tilts, resolving to dead-straight via the same `transform: none` round 4's `--go` rule already had — I didn't need to touch that rule at all, only the hidden-state transform values feeding into it. 90/90 tests, `tsc --noEmit`, and production build all clean. **What I could not verify live:** the felt quality of the grain-fade-plus-tilt-straighten in real time (same environment limitation every round has hit) and the reduced-motion branch (no OS toggle available in this tooling) — both confirmed correct by computed-style/source inspection only, not by watching it render. If it needs retuning, the two independent dials are grain opacity (`.32`/`.12`) and each group's rotate() value — nothing else needs to change to adjust either.
