# About Navigation Consistency — Narrow Brief

_Date: 2026-10-22_  
_Status: Approved through the user's direct request and implemented locally_

## Problem

About is a top-level destination beside Home, but it opened with case-study chrome: a breadcrumb row, a recruiter-tour utility in that row, and a sticky chapter strip. The shared global route dock was already correct. The duplicate layer made About feel subordinate to Work and forced visitors to interpret two navigation models before reading the page.

## Audience and task

Recruiters, hiring managers, keyboard and screen-reader users, and people managing attention or working memory need to identify the current route, begin the About story, and reach the 90-second recruiter tour without resolving redundant navigation.

## Decision

- Reuse the shared `Navbar` without modification.
- Remove only the About-specific breadcrumb and `CaseStudyChapters` shell.
- Keep all About section IDs, headings, content, language behavior, theme behavior, and deep-link targets.
- Move the existing 90-second-tour control into the About hero, matching the placement taught on Home and the case-study heroes.
- Preserve its `returnFocus` event detail and the 44px target floor.

This is a **Reuse/Compose** move. It introduces no component, token, route, or navigation behavior.

## Success criteria

- Home and About use the same global dock geometry at 390px and 1440px.
- About has exactly one primary navigation landmark and `About` is the current page.
- No case-study breadcrumb or chapter strip renders on About.
- The tour control remains keyboard reachable, dispatches `open-recruiter-panel`, and is at least 44px high.
- No horizontal overflow, broken images, duplicate IDs, or console errors.

## Out of scope

- Case-study navigation.
- Portfolio art-direction changes.
- Case order or content recuts.
- Deployment.

