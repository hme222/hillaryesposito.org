# Design Retrospective: Full Portfolio Redesign

**Date:** 2026-06-10
**Duration:** Single session (discovery through verification)
**Mode:** Direct (user approved every handoff)
**Pipeline:** Discovery → Strategy → Taste → Planning → Build → Review → Verification → Retrospective

## Summary

Redesigned Hillary's portfolio from a Product Designer-only positioning to a unified UX + Process Improvement identity with AI as a differentiating strength, aligned to a LinkedIn strategy. The build covered foundation tokens, homepage hero, credentials, proof strip, projects, CTA, About page, all case studies (unified template), Gen Z flair (gradient shimmer), and a full WCAG AA audit. Post-build additions included Common Fate scroll animations, a skills expertise strip, back-to-top button, skip-to-content (already existed), case study improvements per Career Strategy Lab framework, GA4 analytics, SEO/OG meta, JSON-LD structured data, and per-page titles. Reina and E-Commerce case studies were removed by user decision, leaving 3 strong case studies.

---

## What Worked

| Decision | Why It Worked | Evidence |
|----------|--------------|----------|
| Two pillars + AI edge (not three pillars) | Kept positioning focused and honest. AI as judgment, not a job title | User approved immediately, no rework |
| "Feels busy" decluttering | Removing recruiter banner, expertise strip from hero, simplifying credentials to inline text dramatically improved focus | User feedback drove it, result was unanimous improvement |
| Unified case study template | Hero → Meta → Overview → Challenge → Process → Decisions → Outcome → Reflections created consistency without losing each project's character | Career Strategy Lab audit confirmed Good Harvest was already strong; template brought others up |
| Credentials on homepage | LSS, MHA, Veteran visible in first scroll. Process improvement hiring managers see proof immediately | Matched the brief's success criteria exactly |
| Gradient shimmer as Gen Z moment | One subtle touch (olive-to-amber 8s shimmer on positioning line) with reduced-motion and forced-colors fallbacks | Subtle enough for healthcare recruiters, noticed by design peers |
| Warm token palette (85/12/3 ratio) | Warm off-white backgrounds, olive/sage accents, amber moment. Feels specific to Hillary, not template | Taste profile accurately predicted user preferences |
| Em dash removal site-wide | User had a strong anti-em-dash preference. Removing all 196 instances improved consistency | Clear user direction, no pushback |

## What Didn't Work

| Decision | What Went Wrong | Root Cause | Resolution |
|----------|----------------|------------|------------|
| Initial homepage density (9 elements before projects) | User said "feels busy" after seeing the full build | Tried to show everything at once. Recruiter scan time wasn't prioritized during build | Removed recruiter banner, expertise strip, simplified credentials. Multiple iterations |
| Expertise scroll strip placement (hero area) | Removed for density, then user wanted it back elsewhere | Removed the component entirely instead of relocating | Re-added between Projects and CTA. Better position |
| Accent-warm contrast (#c4873b) | Failed WCAG 3:1 for large text at 2.90 ratio | Picked the color by feel, not by measurement | Darkened to #b87d35 (3.31 ratio). Always compute contrast, never eyeball |
| Case study narratives (4 of 5) | Audit against Career Strategy Lab framework revealed missing users, process, role, outcomes | Built visual template first, content depth second | Added structured sections to all 4 weaker case studies |
| h4 heading hierarchy in case study cards | h2 → h4 skip across 4 case studies | Reused a card pattern without checking semantic hierarchy | Changed all h4 → h3, updated CSS selectors |
| Framer Motion stagger not checking reduced motion | JS-driven animations bypassed the CSS global safety net | Assumed CSS safety net covered everything | Added useReducedMotion hook to Home.tsx stagger |

## Process Assessment

**Pipeline efficiency:**
- Full Designpowers pipeline: Discovery → Strategy → Taste → Planning → Build → Review → Verification
- Parallelized effectively: About page + case studies built simultaneously, verification audits ran in parallel
- Post-pipeline additions (Common Fate, Career Strategy Lab, analytics) were responsive to user-provided articles

**What the user taught us:**
- "Feels busy" was the most valuable feedback of the session. It drove the biggest improvement
- User integrates external articles (usability heuristics, Common Fate, Career Strategy Lab, Portfolio as Product) as design inputs. Future projects should expect this pattern
- User removed Reina and E-Commerce late in the process. Earlier portfolio scoping (which projects to include) would have saved the case study improvement work on those two
- Em dash removal was a clear, non-negotiable preference. Now recorded

**User overrides:** ~6 significant redirects (feels busy, strip placement, Mobbin reorder, nav smoothness, subtitle weight, em dashes). Most concentrated in the homepage density area

## Design Debt

**Register status:** Clean. Started fresh for this redesign, no items accumulated.

**Potential future debt:**
- OG image is Luna at 1024x1024 (square, not ideal 1200x630 for social previews)
- GA4 events not yet configured (just pageview tracking active)
- GoodHarvest line 625 has image fallback text visible if flow images don't load
- CSS still contains styles for removed components (Reina zoom overlay, Ecommerce demo). Could be cleaned up

## Taste Evolution

**Strong opinions confirmed:**
- Anti-busy: fewer elements with more whitespace beats more elements with less
- Anti-em-dash: site-wide ban, no exceptions
- Warm over cold: earth tones + olive/sage + amber. Never blue-gray
- Typography carries hierarchy: bold headlines, tracked eyebrow text, generous line-height

**New strong opinions formed:**
- Common Fate > individual stagger for grouped elements (proof cards enter as one unit)
- Case studies need Career Strategy Lab structure: process with why, specific headlines, outcome metrics
- Analytics is part of the design (Portfolio as Product mindset)

**Soft patterns confirmed:**
- One Gen Z flair moment (gradient shimmer) was the right dosage
- Credentials on homepage (not buried in About) is a non-negotiable for hybrid positioning
- Skills strip works better as a transition element (between sections) than a hero element

**Taste surprises:**
- User wanted the expertise strip back after removing it. The component wasn't wrong; the placement was
- User removed 2 of 5 case studies late. Quality over quantity preference is stronger than expected

## Carry Forward

**For the next project:**
- Always compute contrast ratios programmatically. Never approve a color by eye
- Scope content (which projects to include) before building templates for all of them
- Check JS animation libraries (Framer Motion, GSAP) for reduced-motion gaps separately from CSS
- User integrates external articles as design inputs mid-stream. Build flexibility for this

**For specific agents:**
| Agent | Lesson |
|-------|--------|
| **design-builder** | Check heading hierarchy as you build, not in a final audit. Every h4 in this project was wrong |
| **design-lead** | Start with fewer elements. The user will ask to add, not to remove. Restraint is the default |
| **content-writer** | Case studies need process narration with WHY, not just WHAT. Career Strategy Lab framework is the benchmark |
| **accessibility-reviewer** | CSS safety net doesn't cover JS animation libraries. Check Framer Motion and GSAP separately |
| **design-strategist** | Scope which projects to include BEFORE case study phase. User removed 2 late |

**Open questions for next time:**
- Should the portfolio add an Articles/Writing section (Portfolio as Product article suggests splitting Work + Articles)?
- When GA4 data comes in: which case study gets the most engagement? Does the recruiter journey match the strategy (hero → proof → projects in 20 seconds)?
- Is the Hera "Coming Soon" card helping or hurting? Does it signal ambition or incompleteness?
