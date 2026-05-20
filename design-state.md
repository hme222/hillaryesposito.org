# Design State: Portfolio UX Review

## Brief Summary
**Problem:** Portfolio needs to clearly translate military/healthcare/contract experience into UX value for hiring managers at junior-to-mid level roles.
**Primary persona:** Hiring manager, 2-3 min attention budget, scanning for process evidence and design thinking.
**Success metric:** Value proposition lands within 60 seconds of arrival.

## Design Principles
1. Clarity over cleverness — every element should earn its place
2. Evidence over claims — show the work, don't just describe it
3. Respect the hiring manager's time — scannable, hierarchical, front-loaded

## Decisions Log
| Decision | Rationale | Source |
|----------|-----------|--------|
| Review scope: heuristic + visual + strategic | User requested "all of the above" | User direction |
| Target audience: hiring managers (primary), recruiters (secondary) | User confirmed | User direction |
| Level: junior to mid-level UX roles | User confirmed | User direction |
| Key goal: experience-to-UX translation must be visible | User: "I want my value to be seen" | User direction |

## Open Questions
- Does the recruiter pill add value or create confusion?
- Is the Projects page (/projects) redundant given the home page project section?
- Does the password gate on Mobbin create friction for hiring managers?

## Artefact Index
| Artefact | Path |
|----------|------|
| Design brief | docs/designpowers/briefs/2026-05-20-portfolio-ux-review.md |
| Home page | my-app/src/pages/Home.tsx |
| About page | my-app/src/pages/AboutMe.tsx |
| Good Harvest case study | my-app/src/pages/case-studies/GoodHarvest.tsx |
| Grove case study | my-app/src/pages/case-studies/Emergent.tsx |
| Mobbin case study | my-app/src/pages/case-studies/Mobbin.tsx |
| Projects page | my-app/src/pages/Projects.tsx |
| Contact page | my-app/src/pages/Contact.tsx |
| Navbar | my-app/src/components/Navbar.tsx |
| Recruiter Pill | my-app/src/components/RecruiterPill.tsx |

## Design Debt Register

_Items: 6 | Critical: 0 (critical items are in fix list, not here) | Oldest: 2026-05-20_

| ID | Date | Source | Severity | What | Who is affected | Suggested fix | Status | Notes |
|----|------|--------|----------|------|----------------|---------------|--------|-------|
| DD-001 | 2026-05-20 | accessibility-reviewer | Minor | Expertise scroll strip: when reduced-motion stops animation, items overflow visually and become unreadable (strip has overflow:hidden + mask) — content inaccessible without scroll | Users with vestibular disorders using prefers-reduced-motion | When animation is paused, switch strip to a static wrapping flex layout: `.home-expertise-track { flex-wrap: wrap; animation: none; }` inside the reduced-motion query | Open | Animation stop is handled but layout fallback is missing |
| DD-002 | 2026-05-20 | accessibility-reviewer | Minor | `home-status-dot` pulse animation (`statusPulse` 2s infinite) has no `prefers-reduced-motion` fallback | Users with vestibular disorders, epilepsy sensitivity | Add `@media (prefers-reduced-motion: reduce) { .home-status-dot { animation: none; } }` | Open | Small element but infinite loop animation |
| DD-003 | 2026-05-20 | accessibility-reviewer | Minor | Recruiter panel close button is 36×36px — below WCAG 2.5.8 AA target size minimum of 24px CSS (passes) but below the recommended 44×44px for motor accessibility | Users with motor impairments, tremor, small touch targets | Increase `.recruiter-panel__close` to `width: 44px; height: 44px` | Open | Currently 36px — below recommended, above minimum |
| DD-004 | 2026-05-20 | accessibility-reviewer | Minor | `gradient-text` class uses `background-clip: text; color: transparent` — some AT and forced-colours mode may not render this text at all, showing blank content | Users in Windows High Contrast / Forced Colors mode | Add `@media (forced-colors: active) { .gradient-text { color: CanvasText; background: none; -webkit-background-clip: unset; } }` | Open | Affects stat numbers and flow step numbers sitewide |
| DD-005 | 2026-05-20 | accessibility-reviewer | Minor | Tab panels in Good Harvest (`gh-panel`) are missing `aria-labelledby` pointing back to their controlling tab button, so screen readers announce only "tabpanel" with no name | Screen reader users navigating tab content | Add `aria-labelledby="gh-tab-{i}"` to each panel element, and `id="gh-tab-{i}"` to each tab button | Open | `aria-controls` relationship exists; reverse `aria-labelledby` is missing |
| DD-006 | 2026-05-20 | accessibility-reviewer | Minor | `color-mix(in srgb, var(--fg) 60%, transparent)` used as text colour in multiple case study components computes to ~#606060 on white = 3.26:1 contrast — fails WCAG AA for normal-size text | Low-vision users, users in bright ambient light | Replace with `var(--muted)` (#666, 5.74:1) or `color-mix(in srgb, var(--fg) 72%, transparent)` (~#484848, 7.1:1) | Open | Affects App.css lines approx. 875, 1141, 1215, 2001, 2022, 2053 |

## Handoff Chain
_(Review pipeline — agents log handoffs here)_

### 2026-05-20 — accessibility-reviewer → design-builder

> "Six issues to fix, three of them critical. First: the recruiter panel (`RecruiterPill.tsx`) has `role='dialog'` and `aria-modal='true'` but zero focus trap — keyboard users tab straight through the overlay into the page behind it. Add a focus trap (useFocusTrap hook or focus-trap-watcher). Second: the password gate input (`PasswordGate.tsx` line 8461 in App.css) has `outline: none` hardcoded — that kills the focus ring entirely on the form's only interactive element. Remove that rule and let the global `:focus-visible` style do its job. Third: project cards and 'other projects' cards use `role='button'` on `<article>` elements — convert them to `<button>` elements wrapping the card content, or use an `<a>` tag with `href`. The rest are deferred to the debt register — six minor items logged. Fix the three criticals, then I'll re-review."
