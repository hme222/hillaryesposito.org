# Design Plan: Product Designer Signal + Release Integrity

**Goal:** Deploy one evidence-safe build that identifies Hillary as a Healthcare Product Designer, serves consistent direct routes, and provides a tagged résumé.

**Contract:** `docs/designpowers/builds/2026-08-24-product-designer-release-integrity-build-contract.md`  
**Profile:** Standard  
**Approval:** User-approved in the 2026-08-24 implementation request.

## 1. Route integrity — Bug

- Add deterministic JS/CSS fingerprint comparison for every public shell.
- Regenerate shells from one root HTML file.
- Preserve route-specific metadata.

**Verify:** 5/5 route shells match root locally and live.

## 2. Product-first positioning — Content

- Use Healthcare Product Designer on primary surfaces and metadata.
- Use “Mid-level Product Designer · Healthcare enterprise and internal tools” on the curated product route.
- Replace career-transition framing with current product-delivery evidence.
- Keep service design/research as methods and 13+ years as the domain moat.
- Preserve English/Spanish parity and all evidence boundaries.

**Verify:** 390/1440 rendered first views retain role, result, and action; old primary strings are absent.

## 3. Accessible résumé — Document

- Generate from semantic HTML with headings, lists, links, language, and print CSS.
- Keep it one page and ATS-readable.
- Point global and curated healthcare Product Designer actions to it.

**Verify:** `Tagged: yes`; one page; logical extraction order; email/site/LinkedIn annotations work; visual inspection passes.

## 4. Local health gate — Verification

- Run tests, optimized build, masked recruiter, visual-evidence, axe, behavior, house-style, tell, claim, responsive, and PDF checks.
- Repair any Critical/Major finding and rerun the affected gate.

**Verify:** Ready verdict with no Critical/Major debt.

## 5. Clean deploy — Release

- Sync generated output while preserving tracked Designpowers records.
- Prerender route shells and run parity before commit/push.
- Verify live HTML fingerprints, quantitative wording, Product Designer identity, and tagged PDF.

**Verify:** Live production matches the frozen candidate.

