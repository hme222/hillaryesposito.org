# Design Brief: Remaining Portfolio Editorial System

Status: Approved through “do recommendation / go ahead”  
Date: 2026-07-23

## Problem

The flagship case studies now establish a clear editorial standard, but Home, About, role-curated pages, and the fashion artifact still use several older card and section treatments. The content is strong; the surrounding hierarchy needs to feel authored by the same person.

## Direction

Carry the flagship system into the rest of the portfolio without turning every page into a case study:

- Home remains the index and keeps the workflow knot as its single expressive moment.
- Projects become three numbered publication issues with alternating artifact/copy composition.
- Evidence becomes a ledger, not a row of generic metric cards.
- Role paths become a typographic index instead of another card grid.
- About becomes a profile journal with chapter shortcuts and numbered story spreads.
- Curated pages become hiring-team evidence dossiers with compact chapter navigation.
- The fashion artifact keeps its own art direction but gains the same wayfinding and spacing discipline.

## Constraints

- Preserve existing English/Spanish content, routes, metrics, and global navigation.
- Preserve the portfolio’s existing knot, headshot, project assets, dark mode, recruiter view, and accessibility behavior.
- Use existing React and CSS; add no runtime dependency.
- Keep 44px targets, visible focus, reduced motion, semantic headings, and narrow-screen reflow.
- Do not publish or deploy without a separate explicit request.

## Success criteria

- Home reads as an index to the three flagship issues within one scroll.
- About and curated pages share chapter wayfinding with the case studies.
- No secondary surface competes with the knot or case-study artifacts through gratuitous effects.
- All changed routes compile and pass the existing accessibility regression suite.
- Layout logic has explicit 820px and 430px adaptations.
