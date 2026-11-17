# Component QA: CopyEmail

- Component: `my-app/src/components/CopyEmail.tsx` (`@status: stable`)
- Checked: 2026-11-16, branch `component-qa-copyemail`
- Scope: one component, checked from tokens to states to tests. This is not a claim about the whole design system.
- Evidence: `CopyEmail.test.tsx` (14 tests), 44 screenshots and `results.json` in `copyemail/` beside this file.
- Status of this document: draft for Hillary's review. The AI-assistance section needs her answers.

## What it does

Shows the email address as plain, selectable text with a Copy button. It is used in contact bands, every case-study close, the footer, and the recruiter panel. `compact` drops the label and makes the address a `mailto:` link. English and Spanish copy come from the language provider, or from a `lang` prop where the provider is not available (the error screen).

## Token map

Resolved values were read from the rendered page in headless Chrome. "Source" is where the component's CSS names the token (`styles/riso-page.css` unless noted).

| Part | Property | Token | Light | Dark |
| --- | --- | --- | --- | --- |
| Page behind it | background | `--paper` (via shell tokens) | rgb(222, 228, 214) | rgb(25, 27, 16) |
| Label | color / size | `--muted`, `--ts-small` | rgb(89, 98, 83) / 15px | rgb(169, 165, 130) / 15px |
| Address | color / font | `--ink`, `--shell-sans` | rgb(32, 36, 28) | rgb(236, 231, 212) |
| Button | text and border | `--ink` | rgb(32, 36, 28) | rgb(236, 231, 212) |
| Button | radius | `--r-control` (fallback 3px) | n/a | n/a |
| Button | hover background | `--coral` mixed to 8% | coral at 8% | coral at 8% |
| Button | copied text and border | `--green` (light), `--ink` text with green border (dark) | rgb(61, 107, 63) | text rgb(236, 231, 212), border rgb(124, 176, 105) |
| Status line | color / size | `--ink-2`, `--ts-label` | rgb(69, 80, 63) / 13px | rgb(185, 181, 150) / 13px |
| Focus ring | outline | declared as `3px solid var(--coral)`; resolves to the global rule | solid 3px rgb(90, 122, 46), offset 4px | solid 3px rgb(232, 176, 106), offset 4px |

## State matrix

| State | Trigger | What the person sees | What a screen reader hears | Covered by |
| --- | --- | --- | --- | --- |
| Default | load | Label, address, Copy button with copy icon | "Copy" button | test 1, 2, 3 |
| Hover | pointer over button | 8% coral wash | nothing new | screenshot only (CSS state) |
| Focus-visible | keyboard focus | 3px ring, offset 4px | "Copy" button | test 2 (native button, no tabindex), screenshot |
| Copied | click, clipboard succeeds | Button reads "Copied" with a check, green accent; resets after 3.2 s | "Email copied." (live region) | tests: copy, reset timing, Spanish |
| Copy failed | click, clipboard missing or rejected | Button stays "Copy"; the line "Couldn’t copy. Select the text instead." appears and clears after 3.2 s | same message | tests: unavailable, rejected, Spanish |
| Compact | `compact` prop | No label; address is a `mailto:` link | link, then button | test 4, screenshots |
| Spanish | language or `lang` prop | "Mi correo", "Copiar", "Copiado", "Correo copiado." | Spanish status text | tests 5, 6, 8, 11 |
| Reduced motion | OS setting | Transition computes to about 0 s (1e-05 s) | n/a | measured, see below |

## Verification results

**Contrast** (computed from the rendered colors; WCAG 2.2 AA needs 4.5:1 for this text and 3:1 for borders and focus rings):

| Pair | Light | Dark |
| --- | --- | --- |
| Label on page | 4.91 | 6.96 |
| Address on page | 12.16 | 14.06 |
| Button text, default | 12.16 | 14.06 |
| Button text, hover | 10.90 | 12.36 |
| Button text, copied | 4.79 | 14.06 |
| Error status text | 6.54 | 8.39 |
| Button border | 12.16 | 14.06 |
| Copied border | 4.79 | 6.86 |
| Focus ring | 3.80 | 9.00 |

The lowest text ratio is 4.79 (copied, light), 0.29 above the threshold. The lowest non-text ratio is 3.80 (focus ring, light).

**Target size:** the button renders 98 x 44 px in both variants, meeting the 44 px target on both axes.

**Responsive:** screenshots at 320, 390, 900, and 1440 px, plus 640 px at 2x as a stand-in for 200% zoom of a 1280 px window. No horizontal overflow at any width (`scrollWidth` equals `innerWidth` each time). The failure line wraps beneath the button at narrow widths without clipping (see `full-*-w320-error.png`).

**Tests:** 14 of 14 pass, including an axe scan of both variants. The axe scan skips color contrast because the test environment loads no stylesheet; contrast is measured above instead. I broke the component three ways (a 1 s reset timer, the failure message hidden from view, the live region's `aria-live` removed); each made the matching tests fail, and the component was restored unchanged.

## Findings

1. **The focus ring the component declares is not the one that renders.** `.rp-copyEmail__button:focus-visible` asks for a 3px coral ring at 2px offset, but the global `button:focus-visible` rule in `styles/App.css` wins in the browser: a green ring in light mode and amber in dark, at 4px offset. Both pass the 3:1 requirement. Decision for Hillary: keep the global ring and delete the component's dead declaration, or make the component win. No change made.
2. **Hover and the copied border/text are checked by screenshot and computed style, not by a unit test**, because jsdom does not resolve the stylesheet.
3. **Not covered:** a real screen reader and real keyboard events. The tests prove it is a native button, which brings Enter and Space with it; they do not press the keys.

## AI assistance

- **What Claude did:** read the component and its CSS, wrote `CopyEmail.test.tsx`, ran the tests and the three deliberate breaks, drove headless Chrome to capture the states and read computed styles, calculated the contrast ratios, and drafted this document.
- **What Hillary reviewed or decided:** _to be filled in by Hillary. Suggested prompts: Which states did you add or remove? Which of the findings above do you agree with? What would you change before using this as evidence?_

## Reproduce

From `my-app/`: `npx react-scripts test src/components/CopyEmail.test.tsx`; `npx react-scripts build`; serve `build/` with a static server that falls back to `index.html`; then capture each state in headless Chrome at the widths above. The capture script is not stored in this repository.
