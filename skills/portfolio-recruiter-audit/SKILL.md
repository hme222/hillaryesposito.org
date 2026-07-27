---
name: portfolio-recruiter-audit
description: Audit a UX, product-design, or graphic-design portfolio through a recruiter and hiring-manager lens. Use when scoring portfolio readiness, testing the first six seconds, reviewing positioning and outcome-led headlines, limiting public case-study volume, strengthening proof and decision storytelling, or reducing friction between interest and contact.
---

# Portfolio Recruiter Audit

Evaluate whether a portfolio communicates a hireable role, credible proof, senior judgment, and a clear next step under realistic recruiter scanning pressure.

## Required reference

Read [references/louyi-2026-portfolio-audit.md](references/louyi-2026-portfolio-audit.md) before scoring. Treat its 24 checks as a recruiter heuristic, not an unquestionable design law.

## Audit workflow

1. Establish the target.
   - Identify the desired role, industry or problem space, seniority, and primary hiring audience.
   - Ask only when the target cannot be inferred from the portfolio or project context.

2. Inspect the real portfolio.
   - Review the rendered homepage at phone and desktop widths.
   - Review every public case study, résumé action, and contact path.
   - Prefer rendered evidence over source assumptions.

3. Run the six-second test.
   - Record whether a new visitor can identify the role.
   - Record one visible result or proof point.
   - Record the obvious next action.
   - Mark a check as passed only when the evidence is visible without explanation.

4. Score all 24 checks.
   - Use `Pass`, `Fail`, or `Not applicable`.
   - Give one point for each applicable pass and zero for each fail.
   - Report both the raw result and the normalized percentage when checks are not applicable.
   - Cite the exact page, component, or rendered observation that supports each result.

5. Reconcile the audit with the project.
   - Preserve truthful qualitative outcomes when no defensible metric exists; never invent a number to satisfy a headline rule.
   - Compress generic process theatre, but retain research evidence, constraints, decisions, tradeoffs, and accessibility work.
   - Treat three public case studies as a scanning guideline. Permit private or tailored supporting work when it does not dilute the public path.
   - Keep accessibility, content truth, and the approved design brief above conversion tactics.
   - Do not repeat unsupported claims from the source PDF as facts.

6. Prioritize repairs in this order.
   - Positioning and role clarity.
   - Case-study headlines and visible outcomes.
   - Proof near the top.
   - Decision-led storytelling and case-study economy.
   - Project order and public volume.
   - Contact, résumé, mobile, and loading friction.
   - Visual polish after the above is sound.

7. Verify after repair.
   - Repeat the 24-check score.
   - Run responsive and accessibility checks.
   - Confirm that résumé labels match their actual behavior.
   - Confirm the strongest truthful case study appears first.

## Output format

Provide:

- Target role and audience
- Six-second test result
- A 24-row evidence table: rule, check, status, evidence, repair
- Score and readiness band
- Highest-impact fixes grouped as `Now`, `Next`, and `Later`
- Conflicts with the brief, truth, accessibility, or taste profile
- Re-score after implementation when repairs are requested

Use the source score bands as directional language:

- 20-24: recruiter-ready; shift attention toward outreach
- 13-19: focused repair round
- 0-12: pause applications and repair fundamentals

Do not declare readiness without rendered verification.

## Integration

- Run after `designpowers-critique` when the artifact is a professional portfolio.
- Pair with `verification-before-shipping` before a reveal or deployment.
- Record deferred findings through `design-debt-tracker`.
- Use job-search portfolio workflows for outreach strategy; keep this skill focused on the portfolio artifact.
