import React, { useEffect, useId, useLayoutEffect, useRef, useState } from "react";

/**
 * A short form or a piece of jargon, with its plain meaning one tap away.
 *
 * Pages spell a term out on first use. Term is for a later use on the same page,
 * or a label where the long form will not fit, and only once per term per page.
 * The meaning is reachable four ways: hover, keyboard focus, tap or click
 * (which pins it open), and as the trigger's accessible description through
 * aria-describedby, so a screen reader hears it without opening anything.
 * Escape or a tap elsewhere closes it.
 *
 * The visible trigger keeps the surrounding line height. Its 44px tap area
 * comes from an invisible ::after, so it can sit in a sentence or an
 * eyebrow label.
 */
/**
 * @status: stable
 * @purpose: Inline glossary term: a dotted-underline button whose definition opens on hover, keyboard focus, or tap (pinned), and is always exposed as the button's accessible description via aria-describedby. Escape and an outside tap close it; it clamps itself inside the viewport, has a 44px tap area, and skips its fade under reduced motion. Use it for a later use of a short form on a page that already spelled it out, or in a label too tight for the long form. One per term per page. For the MSK queue's own MRN/EMR legend, use MSKDashboardMockup's built-in glossary instead.
 */
export default function Term({
  children,
  def,
  tabStop = true,
}: {
  children: React.ReactNode;
  def: string;
  /** False keeps the term out of the Tab order (hover, tap and the accessible
   *  description still work), so a hero's main action is the first stop. */
  tabStop?: boolean;
}) {
  const reactId = useId();
  const tipId = `term-${reactId.replace(/[^a-zA-Z0-9_-]/g, "")}`;
  const wrapRef = useRef<HTMLSpanElement>(null);
  const tipRef = useRef<HTMLSpanElement>(null);
  const [hover, setHover] = useState(false);
  const [focus, setFocus] = useState(false);
  const [pinned, setPinned] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [shift, setShift] = useState(0);
  const open = !dismissed && (hover || focus || pinned);

  // Keep the open tip inside the viewport: measure, then nudge sideways
  // (an inline `left`, so no stylesheet transform or offset rule can cancel it).
  useLayoutEffect(() => {
    if (!open) {
      setShift(0);
      return;
    }
    const tip = tipRef.current;
    if (!tip || typeof window === "undefined") return;
    const gutter = 12;
    const rect = tip.getBoundingClientRect();
    const naturalLeft = rect.left - shift;
    const naturalRight = naturalLeft + rect.width;
    let next = 0;
    if (naturalRight > window.innerWidth - gutter) next = window.innerWidth - gutter - naturalRight;
    if (naturalLeft + next < gutter) next = gutter - naturalLeft;
    if (next !== shift) setShift(next);
    // Runs on open/close only; re-measuring after its own shift would loop.
  }, [open]);

  // While open: Escape closes it from anywhere, and a tap outside closes a pin.
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setDismissed(true);
      setPinned(false);
    };
    const onPointer = (event: PointerEvent) => {
      if (wrapRef.current?.contains(event.target as Node)) return;
      setPinned(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [open]);

  return (
    <span
      className="term"
      ref={wrapRef}
      // Pointer events, not mouse events: a tap fires a compatibility
      // mouseenter with no mouseleave, which would hold the tip open.
      onPointerEnter={(event) => {
        if (event.pointerType === "mouse") setHover(true);
      }}
      onPointerLeave={(event) => {
        if (event.pointerType !== "mouse") return;
        setHover(false);
        setDismissed(false);
      }}
    >
      <button
        type="button"
        className="term__trigger"
        aria-describedby={tipId}
        tabIndex={tabStop ? undefined : -1}
        onFocus={(event) => {
          // Keyboard focus opens it. A tap or click also focuses the button,
          // so pointer focus leaves opening to the click, which can toggle.
          let keyboard = true;
          try {
            keyboard = event.currentTarget.matches(":focus-visible");
          } catch {
            keyboard = true;
          }
          if (keyboard) setFocus(true);
        }}
        onBlur={() => {
          setFocus(false);
          setDismissed(false);
        }}
        onClick={() => {
          setDismissed(false);
          setPinned((current) => !current);
        }}
      >
        {children}
      </button>
      <span
        className="term__tip"
        role="tooltip"
        id={tipId}
        ref={tipRef}
        data-open={open ? "true" : "false"}
        style={shift ? { left: `${shift}px` } : undefined}
      >
        {def}
      </span>
    </span>
  );
}

/**
 * Wrap the first occurrence of each listed term in a Term, leaving the rest of
 * the string as plain text. For translated strings that arrive as one value.
 */
export function glossTerms(
  text: string,
  terms: Record<string, string>,
  options: { tabStop?: boolean } = {}
): React.ReactNode[] {
  const found = Object.keys(terms)
    .map((term) => {
      const match = new RegExp(`(^|[^\\p{L}\\p{N}])(${term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})(?![\\p{L}\\p{N}])`, "u").exec(text);
      return match ? { term, index: match.index + match[1].length } : null;
    })
    .filter((hit): hit is { term: string; index: number } => hit !== null)
    .sort((a, b) => a.index - b.index);

  const out: React.ReactNode[] = [];
  let cursor = 0;
  found.forEach(({ term, index }) => {
    if (index < cursor) return;
    out.push(text.slice(cursor, index));
    out.push(<Term key={`${term}-${index}`} def={terms[term]} tabStop={options.tabStop}>{term}</Term>);
    cursor = index + term.length;
  });
  out.push(text.slice(cursor));
  return out;
}
