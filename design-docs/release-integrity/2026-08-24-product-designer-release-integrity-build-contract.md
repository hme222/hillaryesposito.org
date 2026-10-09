# Build Contract: Product Designer Signal + Release Integrity

**Date:** 2026-08-24  
**Profile:** Standard  
**Approval:** Hillary's 2026-08-24 instruction to implement and deploy the named decision-changing fixes  
**Queues:** Bug → Content → Document → Verification

## Outcome

- **Problem:** Direct case-study URLs served stale code and claims; primary role language split Product and Service Design; the primary résumé was untagged.
- **Users:** Healthcare/health-tech recruiters and hiring managers, including keyboard, screen-reader, zoom, reduced-motion, bilingual, and narrow-screen readers.
- **Primary task:** Enter through Home or a shared case-study URL, identify Hillary as a Healthcare Product Designer, verify one qualified result, review work, and open an accessible résumé.
- **Success evidence:** One JS/CSS fingerprint across every public shell; product-first copy; no stale quantitative wording; one-page tagged résumé with logical text order and working links; live production verification.

## Release Scope

1. Regenerate public route shells from one frozen root build and add a parity gate.
2. Make **Healthcare Product Designer** primary while retaining service design, research, and 13+ years of domain expertise as differentiators.
3. Generate the primary résumé from semantic HTML as a tagged PDF.

**Key surfaces:** Home, About, recruiter panel, healthcare Product Designer curated page, five public direct-entry routes, primary résumé.

## Direction and Boundaries

- **House style:** Path B — Comply; existing Riso system and Compose moves only.
- **Responsive locks:** 390px and 1440px minimum.
- **Architecture:** React/TypeScript → CRA production build → generated `docs/` → route shells → GitHub Pages.
- **Accessibility:** Preserve headings, focus, descriptive actions, reduced motion, bilingual shell parity, and semantic PDF structure.
- **Truth:** Preserve qualified MSK contribution, Logistics source record, and Grove's unshipped Phase 2 boundary.
- **Out of scope:** New visual direction, new case study, fabricated production evidence, new component/token/dependency, or pure-UXR repositioning.

## Recovery

- **Start commit:** `4fb7f11dd3e49dc9cc15847089f0d70e63911c03`
- **Dirty-worktree rule:** Preserve the existing MSK recreated-artifact repair and owner design-state/taste changes.
- **Rollback:** Revert only initiative-scoped files. Generated publish output is reproducible from the source build.

## Engineering Law Trace

| Lens | Evidence | Required change | Acceptance criterion | Result |
|---|---|---|---|---|
| DRY | Route shells referenced a different build from root | Derive all shells from the frozen root HTML | Exact JS/CSS fingerprint match | Pass |
| Testing Pyramid | Root-only browser checks missed stale shells | Add a fast static parity check before live checks | 5/5 public shells pass | Pass |
| Unintended Consequences | Clean sync removed tracked review records | Preserve `docs/designpowers/` while deleting stale generated files | Review records remain; stale bundles do not | Pass after corrective commit |

## Matrix Check

- **Applied:** Design-system compliance, accessibility, localization, provenance, evaluation, deployment recovery.
- **Hard gates:** Truth, route parity, tagged résumé, representative renders/tests, rollback.
- **Evidence:** Verified repository/public defect plus approved practitioner synthesis.
- **External validation:** Real recruiter and assistive-technology sessions remain external.

