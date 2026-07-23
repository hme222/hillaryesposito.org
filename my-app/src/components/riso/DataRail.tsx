import React from "react";

/**
 * The coordinate / metric margin rail — the signature cartographic detail.
 * Decorative by default (aria-hidden). If the values are real metrics, pass
 * decorative={false} and they'll be exposed to assistive tech.
 */
export default function DataRail({
  items,
  side = "right",
  decorative = true,
  className = "",
}: {
  items: string[];
  side?: "left" | "right";
  decorative?: boolean;
  className?: string;
}) {
  return (
    <div
      className={`riso-rail riso-rail--${side} ${className}`}
      aria-hidden={decorative ? true : undefined}
    >
      {items.map((t, i) => (
        <span key={i}>{t}</span>
      ))}
    </div>
  );
}
