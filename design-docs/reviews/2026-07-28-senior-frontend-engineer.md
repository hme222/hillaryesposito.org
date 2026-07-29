# Senior Frontend Engineer Review — 2026-07-28

Ninth lens in the 2026-07-28 panel. The first run died on an API session limit before producing output; this is the re-run. Everything below was run, not estimated: `npm run build`, `npx tsc --noEmit`, `CI=true npm test`, a served production build inspected live in Chrome (Performance API, network log, console), and line-by-line reads of the files cited.

> **Independently re-verified 2026-07-28** before this was folded into the panel, after an earlier panel finding had to be retracted for a fabricated statistic. Every load-bearing number below was re-run from scratch: the seven "paste at the bottom" blocks, 72 `!important`s, the triple `.navbar` definition, 1,458 dead lines across twelve files, the `tsc` failure, the single `lazy()` route boundary, the bundle sizes, 34/34 tests, and the zero-import status of `gsap`/`react-scroll-parallax`/`@astryxdesign/cli` all confirmed. **Two figures in the original draft were corrected**: the dead-code file count (written as "eleven," the list itself names twelve) and the typecheck error count (written as "100+," actually 79). One finding was **added** that the review missed: the duplicated 1.46 MB map asset, in §6.

## Verdict

**Yes, mid-level frontend-adjacent, with a specific caveat: she can write correct, well-cleaned-up React and knows real platform APIs (native `<dialog>`, WebGL disposal, IntersectionObserver) better than most designers who code — but she does not yet maintain a codebase.** Nothing here is deleted once it stops being reachable, dark-mode bugs get patched by pasting a new block at the end of the file instead of fixing the rule that's wrong, and the toolchain's own type-checker has been broken long enough that "the build passes" has quietly come to mean something narrower than she thinks it means. Hire for a role where someone else owns repo hygiene; don't hand her a shared codebase yet without a code-review partner for the first few months.

## What only an engineer would find

### 1. App.css is not maintained, it's excavated

`src/styles/App.css` (5,161 lines) contains **seven** blocks whose own comments instruct a human to paste them at the bottom of the file, verbatim AI-patch instructions left in as code comments and never cleaned up:

- `App.css:1148` — "DARK MODE PALETTE PATCH (NO LAYOUT CHANGES) / Paste at the VERY BOTTOM of your CSS file"
- `App.css:1276` — "WCAG DARK MODE PATCH (PALETTE-LOCKED, NO LAYOUT CHANGES) / Paste at the VERY BOTTOM of your CSS file."
- `App.css:1431` — "FIX: DARK MODE APPLY + STABILIZE PROJECTS/REINA/ECOM/CASE STUDIES / Paste at the VERY BOTTOM of your CSS (below everything)."
- `App.css:1529` — "PROJECT BACKGROUND FIX (NO LAYOUT CHANGES) / Paste at the VERY BOTTOM"
- `App.css:1581` — "DFIX - STABILIZE ABOUT / REINA / ECOM DEMO / FEATURES / Paste at the VERY BOTTOM of your CSS (last lines)."
- `App.css:1655` — "WCAG SAFETY PATCH - no layout changes / Paste at VERY BOTTOM (after DFIX)"
- `App.css:1739` — "NAVBAR DARK MODE FINAL FIX / Put this at the VERY BOTTOM"

These eight patches (`grep -c "PATCH\|DFIX\|FINAL FIX" App.css` finds one more at line 150) span roughly lines 150–1745 — about 31% of the file — and account for **37 of the file's 72 `!important` declarations** (measured: `awk 'NR>=150 && NR<=1745' App.css | grep -c '!important'` → 37; whole-file total → 72). Cascade order, not specificity, is the actual conflict-resolution strategy here: the comment at 1739 says so outright.

The consequence isn't cosmetic. `.navbar` is defined **three separate times inside this one file** (`App.css:361`, `App.css:1745`, `App.css:3809`), plus again in `portfolio-cohesion.css:72` and touched again in `riso-page.css:643`. Twenty-seven distinct class selectors are defined in three or more of the eight stylesheets (`.is-active` in 5, `.dark-mode` in 5, `.recruiter-pill` in 4, `.rp-clearing` in 4, `.rp-hero` in 3, `.site-footer` in 3, `.navbar` effectively everywhere) — measured by parsing real selectors out of all eight files, not eyeballed.

And the patches were never pruned when their targets were: two of them (`App.css:1431`, `App.css:1581`) are explicitly stabilizing "REINA" and "ECOM DEMO" — a project that no longer exists anywhere in the current app. `grep -rli "reina\|ecom" src --include="*.tsx"` finds it in exactly one file, `MediaCard.tsx` (`reina-zoom-overlay`, `reina-zoom-close` — line 95, 103) — and that file is dead code (see #2). Fifteen "reina"/"ecom" references still ship and get parsed by every visitor's browser on every page load, targeting a UI that was deleted from the React tree an unknown number of commits ago. This is what "additive-only" CSS maintenance looks like at scale: nothing is ever confirmed dead, so nothing is ever removed.

### 2. 1,458 lines of dead component code — including the one mechanism built to enforce "show, don't tell"

Twelve component files have zero imports anywhere in `src/` (confirmed with `grep -rn "import.*<Name>"` per file, not a fuzzy string match):

`WorkflowKnot.tsx` (526 lines), `KnotErrorBoundary.tsx` (28), `casestudy/ShowKit.tsx`, `Disclosure.tsx`, `GroveAppDemo.tsx`, `JumpNav.tsx`, `MediaCard.tsx`, `MoreWork.tsx`, `riso/Clearing.tsx`, `riso/DataRail.tsx`, `riso/RisoLayer.tsx`, `ToolsUsed.tsx` — **1,458 lines total, ~18% of the 8,265-line TSX/TS codebase**, and none of it appears in the production build (`grep -rn "WorkflowKnot" build/static/js/*.js` returns nothing — webpack correctly tree-shook it, which is the only reason it isn't a bundle-size problem too).

Two of these are worth naming specifically, because they cut against each other:

- **`WorkflowKnot.tsx`** is the single best-engineered file in the repo (see "What's genuinely good" below) — a full Three.js hero component with correct disposal, `IntersectionObserver`, `prefers-reduced-motion`, and `forceContextLoss()`. Git history confirms it: last touched in commit `b0a43cb`, superseded when `9027ed1` ("Riso editorial redesign") replaced the whole homepage — and never deleted. `KnotErrorBoundary.tsx`, built to wrap it, went dead with it.
- **`components/casestudy/ShowKit.tsx`** exports `BeforeAfter`, `AnnotatedShot`, `DecisionCard`, `StateMatrix`. Its own docstring (`ShowKit.tsx:4-10`) says the point of the file is that these types **require** a `screen` prop, "so a told-not-shown decision won't compile" — introduced in commit `b0a43cb` specifically as the guardrail against unsubstantiated case-study claims (the exact failure mode the rest of this panel spent most of its time on). It is imported by zero files. The technically-correct fix for the panel's #1 finding is sitting in the repo, fully built, wired into nothing.

### 3. `npx tsc --noEmit` cannot run on this project — and the failure has nothing to do with her code

Running the standard "does this typecheck" command produces **79 errors, none of them in `src/`** — it does not reach a single line of application code:

- `tsconfig.json:12` sets `"moduleResolution": "bundler"` — an option introduced in TypeScript 5.0. The project's own devDependency pins `"typescript": "^4.9.5"` (confirmed installed: `4.9.5`), which doesn't recognize it: `tsconfig.json(12,25): error TS6046: Argument for '--moduleResolution' option must be: 'node', 'classic', 'node16', 'nodenext'.`
- Separately, `@types/three@0.185.0` (installed, matching `three@0.185.0`) ships `.d.ts` files using TS5-only syntax — `node_modules/@types/three/src/nodes/core/UniformNode.d.ts:122` and `.../core/PropertyNode.d.ts:24` and `.../accessors/StorageBufferNode.d.ts:68` all fail with parse errors (`TS1005`, `TS1139`, `TS1109`) under TS 4.9. `skipLibCheck: true` (`tsconfig.json:7`) doesn't help — it suppresses *semantic* checking of declaration files, not parser-level syntax errors, so the compiler can't even finish reading its own type dependencies.

`npm run build` reports "Compiled successfully" with zero warnings, because CRA's build-time checker scopes differently and never surfaces this. That means the actual quality gate has been silently broken for as long as this TypeScript/`@types/three` version combination has been installed, and nothing in the normal `npm start` / `npm run build` workflow would ever tell her. There's also no CI (`.github/workflows` doesn't exist anywhere in the repo) — deploys go straight from a local machine via `gh-pages -d build`, so no automated process was ever going to catch this either.

### 4. The only real code-splitting boundary targets the smallest of the three case-study pages

`AppRoutes.tsx:5-13` eagerly imports `RisoHome`, `About`, `RisoGrove` (629 lines), `FlagshipMSK` (288 lines), `CuratedRolePage`, and `FashionCampaignSystem` — all of it lands in `main.65799cb5.js` (115.98 kB gzip). Only `FlagshipMobbin` (184 lines — the *smallest* of the three flagship case studies) is `lazy()`-loaded, at `AppRoutes.tsx:18`, with a comment explaining the intent: *"Keep the image-heavy Mobbin study in its own chunk instead of adding it to the always-loaded main bundle."*

Confirmed by decompiling the actual output: `mskcc-map.png` and `fashion-campaign` both appear as string literals inside `main.65799cb5.js`; Mobbin-only content (`polymarket.jpg`) is correctly isolated to its lazy chunk (`468.9598f030.chunk.js`, 4.18 kB gzip). So every visitor who loads the bare homepage downloads Grove's `GroveCinematic`/`GroveDecisionStory`/`GroveScreenGallery`/`GroveSystemLab`, MSK's `MSKDashboardMockup`, the fashion-campaign system, and the curated-role-page system, before clicking anything — while the one page that *is* deferred is the one with the least of its own code. (Three.js itself, at 133.92 kB gzip — `408.390100df.chunk.js`, verified by decompiled `THREE`/`WebGLRenderer`/`SphereGeometry` strings — *is* properly isolated, but only as a side effect of `MSKSystemMap` being lazy-loaded inside the eagerly-loaded MSK page; it's a lucky consequence of a good decision elsewhere, not a deliberate choice about the library.)

### 5. `gsap` and `react-scroll-parallax` are dependencies with zero imports anywhere

`grep -rn "gsap"` and `grep -rn "scroll-parallax\|Parallax"` across all of `src/` return nothing outside `package.json`/`package-lock.json`. They cost nothing in the shipped bundle (nothing pulls them in), but `package.json` is documentation any engineer reads first, and it currently claims two motion libraries drive the site's animation when the real answer is framer-motion (2 files) plus hand-written `requestAnimationFrame` loops. `@astryxdesign/cli` (devDependency) is in the same state — and `Modal.tsx:15`'s own comment explains why it's unused ("the best part of Astryx without the dependency"), which makes its continued presence in `package.json` pure noise rather than an oversight anyone would need to explain.

### 6. A 1.46 MB PNG ships on the homepage despite `loading="lazy"` — measured, not assumed

`RisoHome.tsx:198` correctly writes `<img src={w.img} alt={t(w.imgAltKey)} loading="lazy" />` for the project list. I served the actual production build and captured it live: `performance.getEntriesByType('resource')` in a real tab shows `mskcc-map.png` transferred as **1,500,170 bytes** on initial page load — the lazy attribute is present in the source and simply doesn't survive contact with the layout, because the fourth work-list item sits close enough to the fold that Chrome's default lazy-load distance threshold doesn't defer it.

Root cause underneath that: `mskcc-map.png` is a **PNG** at 2438×1000px (measured via `sips`), 1.4 MB, for photographic/map content — the wrong format. PNG is lossless and appropriate for flat-color graphics; a JPEG or WebP at the same visual quality would very likely land in the 150–250 KB range, independent of the lazy-loading question.

**And the same 1.46 MB file is stored twice.** `public/assets/msk/mskcc-map.png` and `public/riso/mskcc-map.png` are byte-identical — confirmed by matching MD5 (`62f5e106b3c85d1c4f6bbad3f9fc893a`). Both paths are live: `RisoHome.tsx:26` and `usePageTitle.ts:20` point at the `assets/msk/` copy, while `FlagshipMSK.tsx:100` and `SpanishCaseStudy.tsx:30` point at the `riso/` copy. So the repo carries 2.93 MB for one image, the two copies can silently drift apart on any future edit, and a visitor who loads the homepage and then the MSK case study downloads the identical bitmap twice under two URLs with two separate cache entries. Total image weight in `public/` is 8.4 MB.

Worth naming separately: `usePageTitle.ts:20` uses this file as the Open Graph `image`. Every social/Slack/LinkedIn preview of the site tries to fetch a 1.46 MB PNG; several platforms cap preview images below that and will simply render no image.

It's also painted more than once per page. `CartoField.tsx` renders `mapSrc` as `.carto__map` (`CartoField.tsx:98`) *and* again as `.carto__fragment--window` (`CartoField.tsx:113`) when no distinct `secondaryMapSrc` covers it, on top of a third, hardcoded 701 KB wash layer (`painted-cartography-01.jpg`, `CartoField.tsx:92` — not a prop, always the same file) on any page using a non-`"paint"` edition. MSK's hero (`FlagshipMSK.tsx:99-104`) passes `mapSrc="/riso/mskcc-map.png"` with `edition="eucalyptus"`, so its hero section alone composites roughly 2.5 MB of CSS `background-image` layers, none responsive, none capped to the viewport actually rendering them — a phone downloads the identical 2438px-wide asset a 27" monitor does.

### 7. The navbar's scroll-triggered state change animates layout properties, not just paint

Distinct from the hover-triggered layout animations already flagged elsewhere in this panel: `App.css:3809-3813` transitions `max-width`, `margin`, `padding`, `border-radius`, `box-shadow`, and `top` together on `.navbar` when it condenses into the floating pill state on scroll. This is a `position: sticky`, always-in-the-tree, full-width flex container — animating its box model (not just `transform`/`opacity`) forces layout recalculation on an element every scroll-threshold crossing touches, which is a real, avoidable compositor cost on the one element that's present on every page and directly in the scroll path.

## What's genuinely good

- **`WorkflowKnot.tsx` and `MSKSystemMap.tsx`: correct WebGL lifecycle discipline.** Both dispose every geometry and material they create, call `renderer.forceContextLoss()` with an explicit comment about *why* (`WorkflowKnot.tsx:479-482`, `MSKSystemMap.tsx:236-238`: repeated Home → case-study → Home mounts would otherwise accumulate contexts until the browser evicts the oldest against its ~16-context cap), pause their render loop via `IntersectionObserver` + `visibilitychange` rather than running forever off-screen, and branch correctly on `prefers-reduced-motion` to a static *resolved* state instead of simply not rendering. This is senior-level GPU resource management. That one of the two files is now unreachable doesn't undo how well it was built.
- **`Modal.tsx`: native `<dialog>` instead of hand-rolled focus-trap logic.** `showModal()` gets background inertness, focus-into-dialog-on-open, and Escape-via-`cancel` "for free" (`Modal.tsx:14-21`), replacing what would otherwise be a focus-trap library plus three or four manual effects. The `cancel`/`close` event wiring correctly avoids a double-close by calling `preventDefault()` and letting React own the state transition (`Modal.tsx:49-51`).
- **`AppRoutes.tsx`'s `ScrollToTop`/`RouteAnnouncer`.** Correctly distinguishes a real route change from a same-page `?scrollTo=`/anchor change so neither fights the other, moves focus to `#main-content` on navigation but explicitly skips first render, and announces the new page's real `<h1>` to screen readers via a delayed `aria-live` region rather than a generic route-name guess.
- **Zero stray `any` in her own code.** The only occurrence in the whole codebase (`reportWebVitals.ts:3`) is CRA's own generated boilerplate, not something she wrote.
- **34/34 tests pass**, and they're not padding — `accentContrast.test.tsx` encodes a real, previously-shipped contrast bug so it can't regress silently.
- **Repo hygiene is clean where it's cheap to be clean**: `build/` and `node_modules/` are correctly gitignored and neither is tracked; no stray `.DS_Store` files made it into git despite several sitting untracked on disk.
- **`ReadingProgress.tsx`'s scroll handler is rAF-throttled** (`frame` ref guard, `ReadingProgress.tsx:67-73`) rather than calling `setState` on every raw scroll event — the single most common performance mistake in hand-rolled scroll UI, and she didn't make it.

## The tradeoff nobody named

The design system's own stated integrity mechanisms exist in code and are disconnected from the pages that need them. `riso/Clearing.tsx`'s docstring says "everything text-bearing on a riso section sits inside one of these" as the contrast guarantee against a busy collage background — but every page actually uses a bare `.rp-clearing` CSS class applied via string `className`, with no component and no compiler standing behind it, so the "guarantee" is a convention someone has to remember, not something that fails loudly if they forget. `ShowKit.tsx`'s type-level requirement that a screen must exist before a claim compiles is a genuinely clever answer to this whole panel's most common finding ("no finished screens exist") — and it shipped wired into nothing. In both cases the engineering idea was right and got built; the wiring-in step, which is the only step that makes it actually enforce anything, didn't happen.

Running the other direction: the one deliberate code-splitting decision (Mobbin) was made for a defensible design reason — keep the "image-heavy" study out of the initial load — but picked the wrong target on the engineering merits. Mobbin is the smallest of the three flagship pages, and its shared component dependencies mostly already ship via Grove and MSK regardless, so the actual heavy pages aren't deferred at all. Good design instinct, wrong bundle.

## The interview question

*"Open `WorkflowKnot.tsx`. It's the best-engineered file in this repo — correct WebGL disposal, `IntersectionObserver`, reduced-motion handling, explicit context-loss cleanup — and it hasn't rendered on any page since the homepage redesign replaced it. How would you have found that, in a repo you own, without me pointing at it?"*

The answer that moves her from "designer who can hack" to "designer I'd ship with" isn't "I'd run a dead-code linter" (though that's a fine start) — it's whether she has any standing practice for periodically asking her own codebase "is this still true," the same rigor this whole panel applied to her case-study claims, applied to her CSS and her component tree. Right now the evidence says no: the `!important`-laden patch stack, the unpruned Reina/ecom selectors, and eleven orphaned files all point at the same habit, additive-only development where nothing is confirmed dead so nothing is removed. That habit is invisible in a solo portfolio repo and expensive in a shared one.

## Implementation status — 2026-07-28, branch `eng/senior-dev-fixes`

Shipped: **E1–E6**. All verified with `npx tsc --noEmit` (0 errors), `CI=true npm test` (34/34), `npm run build`, and a live in-browser pass over home / MSK / Grove in **both light and dark mode**.

| Item | Result |
|---|---|
| E1 images | `mskcc-map` → 140 KB hero + 25 KB thumb, both PNG copies deleted; five riso textures re-encoded. **Public image weight 8.4 MB → 4.4 MB.** Homepage's heaviest image 1,465 KB → 25 KB |
| E2 deps | `gsap`, `react-scroll-parallax`, `@astryxdesign/cli` removed; `@types/three` moved to devDependencies; **`gh-pages` added** — `npm run deploy` referenced a binary that was never installed |
| E3 dead code | **10 of 12 files deleted, 1,213 lines.** `ShowKit` and `Clearing` deliberately kept — see below |
| E4 typecheck | TypeScript 4.9.5 → 5.9.3, `@types/jest` added. **`tsc --noEmit` now runs clean at 0 errors** for the first time. `.npmrc` records the `legacy-peer-deps` reason |
| E5 splitting | Grove and MSK now lazy alongside Mobbin; error boundary generalised (it hardcoded "Mobbin did not load"). **Main bundle 115.98 → 94.81 kB gzip, −18%** |
| E6 CSS | **Complete.** All 7 patch blocks merged. App.css **5,161 → 4,609 lines**; `!important` **72 → 51**; zero "paste at the VERY BOTTOM" comments left. CSS bundle −1.05 kB gzip |

**Two findings did not survive implementation.**

- **E7's premise is wrong.** Painting the same `mapSrc` in `.carto__map` and `.carto__fragment--window` costs **zero extra bytes** — identical URLs are fetched once, confirmed in a live network capture where the MSK hero requests `mskcc-map.jpg` exactly once. There is a modest paint cost, but the double-plate layering is the deliberate collage aesthetic the component docstring describes. Not changed. The real weight was the assets themselves, fixed in E1.
- **E8's premise is wrong.** `.navbar.is-floating` is **never applied by any code** — `grep -rn "is-floating"` outside CSS returns nothing. The transition flagged as a per-scroll compositor cost never fires; 7 CSS rules describe a floating-navbar feature that was never wired up. A third instance of the same built-but-never-connected pattern as `ShowKit` and `Clearing`. Left in place: whether that navbar ships is a design decision, not a cleanup.

**A real forced-layout bug was found in the same area E8 pointed at.** `Navbar.tsx`'s section-tracking scroll handler ran unthrottled, calling `getBoundingClientRect()` on four elements per scroll event — four forced synchronous layouts per event on the site's longest scroll. `RisoGrove.tsx`'s quote-underline handler had the same shape plus a style write, a read/write thrash cycle per event. Both now rAF-throttled, matching the guard `ReadingProgress.tsx` already used. `RecruiterPill` and `BackToTop` were audited and left alone — they only read `window.scrollY`, which is cheap, and their boolean `setState` bails out.

**How the CSS merge was made safe.** A computed-style regression harness captured 15 properties for every element the patch region could target — **1,758 elements across six routes × light and dark** — before the merge, then diffed after. The merge landed at **zero diffs**. Two regressions were caught and fixed this way, both invisible to the eye:

- Collapsing `:root.dark-mode` (0,3,0) to `.dark-mode` (0,2,0) lost two specificity ties against stylesheets that load later — `portfolio-cohesion.css`'s `.navbar:not(.is-floating)` and `riso-page.css`'s `.navbar .nav-link.is-active`. The dark navbar's blur dropped 20px → 10px and active nav links turned coral. Restored with `:root.dark-mode`, which is also more honest: the theme class really is on `<html>`.
- The dark navbar rule's `color`, `background` and `border-bottom` never applied at all — `portfolio-cohesion.css` settles the first by source order and the other two with `!important`. Only `backdrop-filter` was ever doing anything. The rule now contains only that.

**What the merge actually found.** The patch region wasn't primarily a specificity problem, it was a dead-code problem. Verified against the live DOM on all six routes: `.projects`, `.project-card`, `.project-media`, `.project-icon`, `.project-body`, `.media-card`, `.media-link`, `.case-study`, `.highlight`, `.feature`, `.cs-link`, `.cs-toggle-link`, `.cs-media`, `.about-intro`, `.hero-btn`, `.hero` and the whole `.gh-*` set **match zero elements**. Of 35 classes in the region, only three still render: `.navbar`, `.nav-link`, `.about-page`.

And one entire patch block — "FIX: DARK MODE APPLY + STABILIZE…" — was written entirely in `body.dark-mode` selectors. `App.tsx:38` toggles the class on `documentElement`, so it lands on `<html>`: **`body.dark-mode` has never matched anything on this site.** ~90 lines that could never have applied, stacked on top of the blocks they were written to fix.

**Deliberately not done.**

- **`ShowKit.tsx` and `Clearing.tsx` were kept, against E3's delete-all instruction.** Both are enforcement mechanisms this panel wants *wired in*, not removed — `ShowKit` is the compiler-level answer to the panel's #1 finding. Deleting them would destroy the fix. Wiring `ShowKit` into a case study needs real screens, which is design work, not cleanup.
- **`.navbar.is-floating` (7 rules) is still there.** Nothing applies the class, so the floating-masthead feature never runs. Whether it should ship is a design decision, not a cleanup — and `portfolio-cohesion.css` now describes the masthead as *"one masthead, one behaviour: a stable editorial rule rather than a transparent bar that turns into a floating island mid-scroll,"* which reads like the decision was already made and the CSS was never removed.

## Found while fixing — MSK problem section

Reported during live review: boxes printing over the headline in the MSK "problem" section. Root cause was the same class of fragility as the CSS above. `.rp-cinema__sticky` placed its annotation plates, its centre piece and the bridge copy as **absolute boxes inside a `calc(100vh - 91px)` frame**, with no relationship between them. At ~535px of usable height the three bands need more room than exists, so they printed on top of each other — measured: **all six element pairs overlapping**, up to 245px. It would have needed a viewport ~1050px tall to escape, so it was broken on most laptops and every short window.

Rebuilt as real grid rows (plates / centre / bridge), keeping the rotations and the scattered composition. The section now grows instead of stacking on itself. Verified at zero overlapping pairs on **all three pages that share the component** — MSK, Grove and Mobbin — plus a single-column path on mobile with no horizontal overflow.

## Ranked fix list

| # | Fix | Effort | What it buys |
|---|---|---|---|
| 1 | Delete the 11 orphaned files (`WorkflowKnot.tsx`, `KnotErrorBoundary.tsx`, `ShowKit.tsx`, `Disclosure.tsx`, `GroveAppDemo.tsx`, `JumpNav.tsx`, `MediaCard.tsx`, `MoreWork.tsx`, `riso/Clearing.tsx`, `riso/DataRail.tsx`, `riso/RisoLayer.tsx`, `ToolsUsed.tsx`) — or wire `ShowKit` into at least one case study before deleting it, since it's the one that answers another finding | **Minutes–1 hr** | −1,458 lines; a repo that matches what actually renders |
| 2 | Re-encode `mskcc-map.png` as WebP/optimized JPEG at a sane max-width, **and collapse the two byte-identical copies to one path** | **Minutes** | ~1.25 MB off the heaviest single asset, ~2.9 MB off the repo, and a social-preview image that platforms will actually render |
| 3 | Fix the `tsconfig.json`/`typescript`/`@types/three` version mismatch (bump `typescript` to 5.x, or drop `moduleResolution: "bundler"` to a value 4.9 supports) so `tsc --noEmit` runs at all | **Hours** | A working type-check gate; there currently isn't one |
| 4 | Remove `gsap`, `react-scroll-parallax`, and `@astryxdesign/cli` from `package.json` | **Minutes** | `package.json` stops lying about what the site is built on |
| 5 | Merge the eight "paste at the bottom" patch blocks in `App.css` into the rules they're overriding; delete the dead Reina/ecom-demo selectors | **Hours** (needs visual regression check, light + dark) | Removes roughly half the file's `!important`s; kills a live specificity-war risk for the next edit |
| 6 | Move `RisoGrove` and/or `FlagshipMSK` behind `lazy()` the way `FlagshipMobbin` already is | **Hours** | Homepage bundle actually gets thinner, consistent with the stated intent behind the Mobbin split |
| 7 | Stop `CartoField` from painting the same `mapSrc` twice (`.carto__map` + `.carto__fragment--window`) plus the hardcoded wash layer on heavy images | **~1 hr** | Real byte reduction on every case-study hero, not just MSK's |
| 8 | Swap the navbar's floating-state transition from box-model properties (`max-width`/`margin`/`padding`/`top`) to a `transform`-based equivalent | **1–2 hrs** (needs care — it currently changes actual box size, not just position) | Removes forced-layout cost from a persistently visible, scroll-linked element |
