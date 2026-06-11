# Design State: Grove Case Study — Visuals + Social Narrative

## Brief Summary
**Problem:** Grove case study lacks visual evidence and omits the social/community feature. Recruiters can't see the product.
**Primary audience:** Hiring managers and recruiters scanning portfolios (30-60 seconds per project)
**Success metric:** Recruiter can see the product within 3 seconds of landing on the Grove case study.

## Design Principles
1. Show, don't tell — visuals prove the work exists
2. Extend, don't replace — build on the existing narrative structure
3. Social as intentional — the community layer is a design decision, not a feature list
4. Evidence over claims — carried from portfolio-level principles

## Decisions Log
| Decision | Rationale | Source |
|----------|-----------|--------|
| Screenshots + live link (not embed) | Curated visuals tell a better story; live link proves it's real | discovery |
| Add social section to case study | Social layer is half the product's value — omitting it undersells the work | discovery |
| Device frames for screenshots | Signals "shipped product" not "wireframe" | discovery |
| Extend existing structure, don't reorganize | Current narrative flow works well; just needs visual proof + social story | discovery |

## Open Questions
- What is the live app URL?
- Which screens to screenshot (user will supply images)
- Where in the narrative does the social section sit? (after core flow? after AI decisions?)

## Artefact Index
| Artefact | Path |
|----------|------|
| Design brief | docs/designpowers/briefs/2026-05-25-grove-case-study-visuals.md |
| Case study | my-app/src/pages/case-studies/Grove.tsx |
| Styles | my-app/src/styles/App.css |

## Design Debt Register
_Inherited from previous review — see portfolio-level design state for full register._

## Handoff Chain

### 2026-05-25 — discovery → design-strategist
> "Brief approved. The case study exists and works narratively — we're adding a visual layer (device-framed screenshots at story beats) and a new social section (sharing progress/photos, community care tips, friends/following). The existing structure is solid; don't reorganize, just extend. Key constraints: must work in existing CSS system with dark/light mode. The social angle matters because it's the differentiator — most plant apps are solo tools. Grove's community layer is a design decision worth showcasing."

## Pipeline Status
- [x] Discovery
- [ ] Strategy
- [ ] Design planning
- [ ] Build
- [ ] Review
