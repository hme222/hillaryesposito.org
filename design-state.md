# Design State: Full Portfolio Redesign — Hybrid Positioning

## Brief Summary
**Problem:** Portfolio positions Hillary as Product Designer only, burying process improvement track record and treating AI as a project tag. LinkedIn and portfolio tell different stories.
**Primary audience:** Hiring managers and recruiters (30-60 second scan), process improvement leaders, AI-curious hiring managers, UX designer peers
**Success metric:** Recruiter identifies hybrid value prop (UX + Process Improvement + AI strength) within 5 seconds of landing.

## Design Principles
1. One Person, Not Three Resumes — every element serves the unified identity; no apologetic "I also do X" framing
2. Numbers Before Narratives — lead with quantified evidence, then the story; recruiters trust metrics, peers trust methodology
3. AI Is Judgment, Not a Tool List — show when NOT to use AI as much as when to; judgment > prompting
4. Accessibility Is the Craft — WCAG AA floor, woven through every decision, not a compliance badge
5. Elevated, Not Decorated — quality from restraint; Gen Z flair is one well-placed moment, not a texture

## Taste Profile
- **Emotional target:** Quiet authority
- **Quality level:** Flagship
- **Key references:** Gaudí architecture, Loewe, Alyssa Faustino's portfolio
- **Anti-reference:** Corporate template portfolios (blue-gray, stock photos, generic)
- **Aesthetic principles:** Warm restraint, Organic within structure, Typography does the heavy lifting, Craft you feel not announce, Specific to Hillary
- **Taste document:** docs/designpowers/taste/2026-06-10-portfolio-redesign-taste.md

## Decisions Log
| Decision | Rationale | Source |
|----------|-----------|--------|
| Full redesign, not incremental | Current positioning (Product Designer) doesn't match target identity | discovery |
| Two pillars + one edge (UX, Process Improvement, AI strength) | AI is a differentiator, not a standalone identity — elevate to pillar only if job market warrants | user direction |
| Keep existing case studies, restructure content | Good work exists — needs reframing, not replacing | discovery |
| Credentials visible on homepage | LSS, MHA, military service shouldn't be buried in About page | discovery |
| Gen Z flair as subtle seasoning | Personality without undermining credibility | user direction |
| Previous Grove brief folded in | Grove visuals work becomes part of the larger redesign | discovery |
| Quiet authority emotional target | Warm competence + earned confidence, not cold or flashy | taste calibration |
| Gaudí + Loewe + Faustino references | Organic warmth within structure, quiet luxury, clean professionalism | taste calibration |
| Flagship quality level | Portfolio must match the claim of redesigning systems for 21K clinicians | taste calibration |
| One Gen Z flair moment | Gradient hero text, unexpected hover, or scroll colour shift — ONE touch | taste calibration |
| 85/12/3 colour ratio | 85% warm neutrals, 12% olive/sage, 3% jewel-tone moment (amber/gold) | taste calibration |
| Accessibility review: 2 critical, 3 major, 6 minor findings | MSKSystemMap loop, mobile nav focus trap, RecruiterPill auto-focus bug are blockers; contrast tokens verified to pass AA in both modes except olive-1 in hero gradient at mobile body-text size | accessibility-reviewer 2026-06-29 |
| Header nav recede gated on `body.knot-resolved` (set by Home on `knot:resolved`) | During chunk-load + the tangle there was NO visible navigation anywhere; header now stays until the 4-dot row exists. Side effect: non-Home routes keep their header nav at page-top (class removed on Home unmount) — accessibility wins | review panel fixes 2026-07-02 |
| Tagline: sentence case, solid `var(--fg)` ink; H1 keeps the one gradient | Three stacked gradient treatments in one viewport read as template, not quiet authority; amber stays reserved for Resume | review panel fixes 2026-07-02 |
| WebGL failure degrades to a static centered label row (`hero-knot-stage--static`); Suspense fallback redrawn as a 4-dot row | Renderer-fail path previously stranded all 4 nav links overlapping at top-left; old 16-dot grid placeholder matched neither state | review panel fixes 2026-07-02 |
| Nav words seated ~10px above their spheres (nodot 30px padding removed, JS gap tightened) | Word + ball must read as ONE nav object, not a caption over a decoration | review panel fixes 2026-07-02 |
| Recruiter pill hidden until scroll on ≤768px (all routes) | It occluded the hero description on mobile; desktop position unchanged | review panel fixes 2026-07-02 |
| Knot morph slowed: DELAY 0.4 / DURATION 3.8 / TAIL 0.5, absorb window 0.10→0.18 | Owner wants the morph watchable and deliberate; resolvedOnce stillness + reduced-motion paths untouched | owner direction 2026-07-02 |

## Open Questions
- Specific hero headline copy (to be determined in strategy/content phases)
- How to restructure individual case studies to show both design + process thinking
- Which credentials get homepage real estate vs. About page
- Exact Gen Z flair touch (one moment — gradient text? hover interaction? scroll shift?)

## Artefact Index
| Artefact | Path |
|----------|------|
| Design brief | docs/designpowers/briefs/2026-06-10-portfolio-full-redesign.md |
| Previous Grove brief | docs/designpowers/briefs/2026-05-25-grove-case-study-visuals.md |
| Home page | my-app/src/pages/Home.tsx |
| About page | my-app/src/pages/AboutMe.tsx |
| Projects page | my-app/src/pages/Projects.tsx |
| Case studies | my-app/src/pages/case-studies/*.tsx |
| Styles | my-app/src/styles/App.css |
| LinkedIn strategy | (provided by user in conversation, not saved as file) |
| Design strategy | docs/designpowers/strategy/2026-06-10-portfolio-redesign-strategy.md |
| Design plan | docs/designpowers/plans/2026-06-10-portfolio-redesign-plan.md |
| Taste profile | docs/designpowers/taste/2026-06-10-portfolio-redesign-taste.md |

## Design Debt Register

_Items: 6 | Open: 0 | Resolved: 6 | All closed: 2026-07-01_

| ID | Date | Source | Severity | What | Who is affected | Suggested fix | Status | Notes |
|----|------|--------|----------|------|----------------|---------------|--------|-------|
| DD-001 | 2026-06-29 | accessibility-reviewer | Minor | Hero positioning gradient starts at olive-1 (#7c8c3c, 3.54:1) — passes large-text AA at desktop (1.3rem/600wt) but fails body-text AA at mobile size (1rem/600wt = 16px, needs 4.5:1) | Low-vision users on mobile | In the max-width: 768px media query, change gradient start to var(--olive-2) (#5a7a2e, 4.71:1) instead of var(--olive-1). See App.css:651–668 | Resolved 2026-07-01 | Fixed even better than suggested — gradient start changed to var(--olive-2) globally (App.css:661), not just mobile. Verified in source |
| DD-002 | 2026-06-29 | accessibility-reviewer | Minor | Good Harvest and multi-device project cards render 2–3 device screenshots all sharing one alt text — screen reader announces the same description multiple times | Screen reader users | First image in home-proj-devices--multi group carries descriptive alt; 2nd and 3rd siblings use alt="". See Home.tsx:326–330 | Resolved 2026-07-01 | Fixed: `alt={i === 0 ? proj.imageAlt || "" : ""}` at Home.tsx:386. First image descriptive, siblings empty. Verified |
| DD-003 | 2026-06-29 | accessibility-reviewer | Minor | Active section nav buttons (HOME, PROJECTS, CONTACT) use .is-active class for visual state only — no aria-current. Only ABOUT Link has aria-current="page" | Screen reader users who rely on aria-current to understand current location | Add aria-current="true" to active button-based nav items. See Navbar.tsx:138–170 | Resolved 2026-07-01 | HOME/PROJECTS/ABOUT already had it; added the missing aria-current to the CONTACT button (Navbar.tsx:220) this session |
| DD-004 | 2026-06-29 | accessibility-reviewer | Minor | BackToTop always uses behavior:"smooth" — ignores prefers-reduced-motion. Full-page instant scroll to top can trigger vestibular symptoms | Vestibular disorder users who have not set OS reduced-motion preference | Check window.matchMedia("(prefers-reduced-motion: reduce)").matches and use "auto" when true. See BackToTop.tsx:18 | Resolved 2026-07-01 | Fixed: BackToTop.tsx:19 branches on prefers-reduced-motion and uses "auto". Verified |
| DD-005 | 2026-06-29 | accessibility-reviewer | Minor | RecruiterPill action buttons (Download resume, Email me, LinkedIn, About me) render emoji in visible text without aria-hidden — VoiceOver reads "page facing up Download resume", "envelope Email me" | Screen reader users; announces emoji descriptions as noise | Wrap each emoji in span with aria-hidden="true". See RecruiterPill.tsx:135–154 | Resolved 2026-07-01 | Fixed: all four emoji wrapped in `<span aria-hidden="true">` (RecruiterPill.tsx:142–156). Verified |
| DD-006 | 2026-06-29 | accessibility-reviewer | Minor | .home-proj-card-link:focus-visible explicitly sets outline:none, which is rescued by the !important WCAG patch at the bottom of App.css. The source rule should be deleted — relying on !important to restore a removed affordance is fragile | All keyboard users (if the WCAG patch is ever modified or removed) | Delete `outline: none` from the .home-proj-card-link:hover, .home-proj-card-link:focus-visible block in App.css. See App.css:3822–3827 | Resolved 2026-07-01 | Deleted `outline: none` from the .home-proj-card-link:hover, :focus-visible block (App.css:4058). Global :where() focus-visible rule (App.css:2789, 3px solid var(--focus)) supplies the ring |

## Handoff Chain

### 2026-06-29 — accessibility-reviewer → design-builder
> "Three things need to ship before this can credibly say 'accessibility is the craft.' First: MSKSystemMap's rAF loop needs a stop condition when pe >= 1 — identical to what WorkflowKnot already does. Second: RecruiterPill has a one-line focus bug on mount — add a hasOpenedOnce ref so focus-return only fires after the panel has been opened at least once. Third: the mobile nav menu needs focus moved into it on open and a focus trap to keep it there; the same focus-trap-react you already have in RecruiterPill handles this. Also: skip link target div needs tabindex='-1', SPA route changes need an aria-live announcer, and the MSK decisions table needs scope='col' on its th elements and a caption. Six deferred minor items recorded in the Design Debt Register (DD-001 through DD-006). Motion work is good throughout; finish the loop on MSKSystemMap and those three critical/major fixes."

### 2026-06-10 — design planning → build
> "Plan approved. 7 phases, 20 tasks. Start with foundation (tokens, type, spacing), then homepage hero + positioning, then projects + CTA, then About page, then case study restructuring (unified template across all 5 + individual content rewrites), then polish + Gen Z moment, then full WCAG audit. Every case study gets the same skeleton: Hero → Meta → Overview → Challenge → Process → Key Decisions → Outcome → Reflections → Footer. Flagship quality throughout. Go build."

### 2026-06-10 — taste calibration → design planning
> "Taste locked. Quiet authority: warm restraint with organic depth. References: Gaudí (organic boldness within structure), Loewe (quiet luxury, craft you feel), Faustino (clean hierarchy, work as centerpiece). Anti-reference: corporate template anything. Flagship quality — every pixel intentional. Keep olive/sage, push it more Loewe-refined. Add a 3% jewel-tone moment (amber/gold). Typography does the heavy lifting — bold headlines, generous whitespace. One Gen Z flair touch. Personality: well-made earth tones, clear sentences, warm handshake, dry humor. The craft should match the claim."

### 2026-06-10 — design-strategist → taste calibration
> "Strategy locked. Five principles: One Person Not Three Resumes, Numbers Before Narratives, AI Is Judgment Not a Tool List, Accessibility Is the Craft, Elevated Not Decorated. The competitive gap is clear — nobody combines quantified ops results + design craft + AI judgment. The recruiter journey is mapped: hybrid value prop in 0-3 sec, metrics + credentials in 3-8 sec, projects in 8-20 sec. Key friction points identified: hero must resolve 'designer or ops person?' in one statement, credentials must be in first scroll, AI must read as judgment not tools. Ready for taste calibration then design planning."

### 2026-06-10 — discovery → design-strategist
> "Brief approved. Full portfolio redesign: two pillars (UX/Product Design + Process Improvement) with AI as differentiating strength. Current site positions as Product Designer only — needs to surface the ops track record (20-85% gains at MSK and military), weave AI judgment throughout, and align with a LinkedIn strategy that says 'UX Designer × Process Improvement Leader | Healthcare Systems Design.' Keep what works: Luna, orb background, magazine card layout, dark/light mode. Push it elevated and cohesive, WCAG AA, with subtle Gen Z flair. The audience is recruiters scanning in 30 seconds AND UX peers evaluating craft. Credentials (LSS, MHA, military) need homepage visibility. The AI narrative is about judgment — when to use it, when to override it — not 'I use ChatGPT.'"

## Pipeline Status
- [x] Discovery
- [x] Strategy
- [x] Taste calibration
- [x] Design planning
- [x] Build
- [x] Review (accessibility audit inline — contrast, heading hierarchy, reduced motion, keyboard nav)
- [x] Verification
