// src/components/ToolsUsed.tsx
import React from "react";

export type ToolEntry = {
  name: string;
  why: string;
  icon?: string;
};

type Props = {
  tools: ToolEntry[];
  eyebrow?: string;
  heading?: string;
};

/**
 * Prominent "Tools & why" block. Each tool is paired with the rationale
 * for choosing it so recruiters can see decision-making, not just a stack list.
 */
export default function ToolsUsed({
  tools,
  eyebrow = "Tools",
  heading = "What I used — and why",
}: Props) {
  return (
    <section className="tools-used" aria-label="Tools used in this project">
      <p className="tools-used__eyebrow">{eyebrow}</p>
      <h2 className="tools-used__heading">{heading}</h2>
      <div className="tools-used__grid">
        {tools.map((t) => (
          <div key={t.name} className="tools-used__card feature">
            <div className="tools-used__header">
              {t.icon && <span className="tools-used__icon" aria-hidden="true">{t.icon}</span>}
              <h3 className="tools-used__name">{t.name}</h3>
            </div>
            <p className="tools-used__why"><strong>Why:</strong> {t.why}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
