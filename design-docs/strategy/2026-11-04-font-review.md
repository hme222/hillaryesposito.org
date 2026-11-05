# Taste review: every typeface on the site

Date: 2026-11-04
Status: review only. No code changed.
Direction: clean, high craft, minimal (see `2026-11-04-clean-minimal-direction.md`).
Source of candidates: https://fontfam.net/?sort=trending, read 2026-11-04.

## What is loaded and what actually renders

The font link in `my-app/public/index.html` asks Google Fonts for five families. Measured in the browser on About (2026-11-04):

| Family | Requested | Renders on About | Where it is used |
| --- | --- | --- | --- |
| Bricolage Grotesque (400 to 800, optical size) | Yes | Yes, 8 text nodes | h1, h2, work titles, closed-row titles, large numbers |
| Instrument Sans (400 to 700) | Yes | Yes, 53 text nodes | Body, UI, every label. The `--mono` and `--shell-mono` tokens now resolve to it, so no mono face renders in the chrome |
| Spectral (400, 500, 600, 400 italic) | Yes | **No** | Set through `--font-editorial`, but the page stylesheet overrides that token to Instrument Sans on every riso page. Not found rendering on About; not measured on the case pages |
| Archivo (400, 800) | Yes | No | One selector, the Grove type specimen (`riso-page.css`, `.rp-type:nth-child(2)`) |
| Space Mono (400) | Yes | No | The Grove type specimen only |

Also found: the MSK dashboard reconstruction uses a system font on purpose. The "AdobeClean" faces seen in the browser come from a browser extension, not from the site.

## Verdicts

| Family | Verdict | Why |
| --- | --- | --- |
| Instrument Sans | **Keep** as the one body and UI face | Calm, legible at 13 to 18px, covers Spanish accents. Carries the whole interface, including what used to be mono labels |
| Bricolage Grotesque | **Keep, narrowly** | The only place the site shows a point of view. Limit it to h1, h2 and large numerals. At 800 with tight tracking it reads heavy in the 20 to 24px closed-row titles, so try 700 there |
| Spectral | **Drop from the link** after one check | Requested but not rendering. The design-system README says "quotes only", yet no quote renders in it on About. Check the Grove and Knowunity quote cards, then remove |
| Archivo, Space Mono | **Scope to Grove only** | They exist for Grove's own type specimen. Loading them on every page costs a request for text that never appears. Load them only on the Grove route |
| System font in the MSK mock | **Keep** | A reconstruction of a real product's interface |

Result: two families site-wide (Bricolage, Instrument Sans), plus Grove's specimen fonts only where Grove shows them.

## Trending list: what it offers

The first 15 entries, as listed (category as the site labels it): Obel Mono (mono), Redaction (serif), Tiny5 Duo (display), Xmind (sans), Libre Caslon Condensed (serif), Clarity City (sans), Isometra (serif), Kripa (sans), Giphurs (sans), Valley Sans (sans), Asap Sharp (sans), Scoutie Sans (sans), Caacupe One (display), Geomini (sans), Hibur Mono (mono).

- **Not fits for this site:** the two monos, the two display faces, Redaction and Isometra (distinct, decorative), and Libre Caslon Condensed (a condensed serif for display).
- **Possible UI-sans alternatives:** Clarity City, Xmind, Valley Sans, Asap Sharp, Geomini. Nothing on the page says any of them is free, hosted on Google Fonts, or covers Spanish accents, and none has been seen rendered here. None is shown to beat Instrument Sans.
- **Conclusion:** the trending list is a popularity ranking, not a quality filter. No change recommended from it. If Hillary wants to test one, Clarity City is the only plausible swap, and it needs a license, coverage and rendering check first.

## Decisions for Hillary

1. Drop Spectral after the quote-card check? (Recommended.)
2. Load Archivo and Space Mono on the Grove route only? (Recommended.)
3. Closed-row titles at 700 instead of 800? (Recommended, small.)
4. Preview Clarity City, or any other font, against Instrument Sans on real headings and a Spanish paragraph?
