# Portfolio site — Interview

Purpose: source material for the "Ask about the work" answer engine
(`design-docs/briefs/2026-10-09-ask-about-the-work.md`). Answers are recorded
verbatim and may be quoted with attribution ("In Hillary's words: …",
source "Interview, Oct 2026") only after Hillary approves each passage.
Nothing here is paraphrased into her voice. Gaps stay marked as gaps.

Started: 2026-10-09.

Related interviews (already captured, quotable after approval):
`grove.md`, `logistics.md`, `msk.md` in this folder.

## Q1: When you started this version of the portfolio, what problem were you trying to solve — in the words you'd have used at the time?

> I wanted my portfolio to showcase my design thinking, creating thoughtful moments in small details.

## Q2: What inspired the look — the risograph printing and map/cartography feel? Where did that come from?

> I wanted to show my journey through a map, while having the warm feel undertones and collage-like style.

## Q3: What's a decision on this site that another designer might have made differently — and why did you make that call?

> I kept a traditional style instead of a flashy header, I wanted my case study work to speak more than the opener.

## Q4: How was the site built — what did you do yourself, and where did AI tools (Claude, Codex, Emergent, Higgsfield, etc.) come in? Did they actually improve anything?

> I initally started everything from scratch, but as I played around with different tools I decided to have Claude help me build out the rest of it. I use Next.js, React, Typescript and Vercel. I've recently integrated Storybook to show more of my design work as well.

**Verification note (2026-10-09; resolved below — publish only the approved quotable version, never the raw answer above):**
- The portfolio repo is Create React App (`react-scripts` in my-app/package.json), not Next.js. Next.js is used by the Knowunity prototype (a `next-server` was running on port 3000 earlier this session). Ask Hillary whether "Next.js" refers to other projects.
- Storybook was added to the Grove repo (grove-ui.hillaryesposito.org), not to the portfolio itself; the portfolio links to it.
- Repo history also shows Codex commits and Higgsfield/Seedance media work; the answer names only Claude. Ask whether to mention other tools.

**Resolved 2026-10-09 (Hillary):** "React, Typescript and Vercel, mention Codex and Higgsfield too." Stack verified against the repo: React + TypeScript (`.tsx`, tsconfig) in my-app, hosted on Vercel.

**Quotable version (approved by Hillary 2026-10-09):**
> I initially started everything from scratch, but as I played around with different tools I decided to have Claude help me build out the rest of it, along with Codex and Higgsfield. I use React, TypeScript and Vercel. I've recently integrated Storybook to show more of my design work as well.

## Q5: What would you do differently if you started this portfolio over?

> I think I would create a storyboard specifically for my site, really spending more time on some details fine-tuned. I also would love to have more of a playground vs. traditional site.

## Q6: When recruiters or hiring managers talk to you about your work, what do they most often ask — and what do you wish they'd ask?

> They ask about my service design work within MSKCC. I wish they would ask me how I used UX principles and design work as a Training Facilitator.

## Status
Interview complete 2026-10-09. Q4 quotable wording approved 2026-10-09.
Paraphrase-back check approved by Hillary 2026-10-09:
"The portfolio is meant to show how you think, through small, considered
details rather than a flashy opener. Its map and collage style tells your
career as a journey, warm rather than clinical, and the plain top lets the
case studies speak first. You built it from scratch at first, then with
Claude, Codex and Higgsfield, on React, TypeScript and Vercel, and you
document your design work in Storybook. If you started over, you'd storyboard
the site first, spend longer on the details, and make it more of a
playground. Recruiters mostly ask about your service design work at MSK; you
wish they'd ask how you used UX principles as a Training Facilitator."

Approved starter questions (EN / ES):
- What service design work did she do at MSK? / ¿Qué trabajo de diseño de servicios hizo en MSK?
- How did she use UX as a Training Facilitator? / ¿Cómo aplicó UX como facilitadora de capacitación?
- How is this site built? / ¿Cómo está construido este sitio?
- What inspired the look? / ¿Qué inspiró el estilo visual?
Use for the answer engine: Q6 sets the recruiter starter questions (MSK
service design; UX principles as a Training Facilitator).
