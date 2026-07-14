import React, { useEffect, useState } from "react";

type JumpItem = { id: string; label: string };

/**
 * Sticky in-page section nav for case studies. Tracks which section is
 * currently in view and marks the matching link as active — so a reader always
 * knows where they are in a long page (Nielsen "visibility of system status").
 *
 * Pass the target section ids WITHOUT the leading "#".
 */
export default function JumpNav({
  label,
  items,
}: {
  label: string;
  items: JumpItem[];
}) {
  const [activeId, setActiveId] = useState<string>(items[0]?.id ?? "");

  useEffect(() => {
    const sections = items
      .map((it) => document.getElementById(it.id))
      .filter((el): el is HTMLElement => el !== null);
    if (sections.length === 0) return;

    // A section counts as "current" once its top passes the sticky nav zone
    // near the top of the viewport. rootMargin pulls the trigger line down to
    // ~28% from the top and up from the bottom so exactly one section is active.
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length === 0) return;
        // Pick the topmost intersecting section.
        const topmost = visible.reduce((a, b) =>
          a.boundingClientRect.top < b.boundingClientRect.top ? a : b
        );
        setActiveId(topmost.target.id);
      },
      { rootMargin: "-28% 0px -60% 0px", threshold: 0 }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [items]);

  return (
    <nav className="cs-jump-nav" aria-label={label}>
      {items.map((it) => {
        const isActive = it.id === activeId;
        return (
          <a
            key={it.id}
            href={`#${it.id}`}
            className={isActive ? "is-active" : undefined}
            aria-current={isActive ? "location" : undefined}
          >
            {it.label}
          </a>
        );
      })}
    </nav>
  );
}
