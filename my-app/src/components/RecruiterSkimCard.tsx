// src/components/RecruiterSkimCard.tsx
import React from "react";

export type RecruiterSkimCardProps = {
  title: string;
  what: string;
  outcome: string;
  myRole: string;
  skills: string[];
  timeframe?: string;
  onBackToStory: () => void;
};

export default function RecruiterSkimCard({
  title,
  what,
  outcome,
  myRole,
  skills,
  timeframe,
  onBackToStory,
}: RecruiterSkimCardProps) {
  return (
    <aside id="recruiter-summary" className="cs-skim" aria-label={`${title} recruiter quick skim`}>
      <div className="cs-skim-head">
        <h2 className="cs-skim-title">Recruiter quick-skim</h2>
        {timeframe ? <p className="cs-skim-meta">{timeframe}</p> : null}
      </div>

      <div className="cs-skim-grid">
        <div className="cs-skim-block">
          <h3>What</h3>
          <p>{what}</p>
        </div>

        <div className="cs-skim-block">
          <h3>Outcome</h3>
          <p>{outcome}</p>
        </div>

        <div className="cs-skim-block">
          <h3>My role</h3>
          <p>{myRole}</p>
        </div>

        <div className="cs-skim-block">
          <h3>Skills</h3>
          <ul className="cs-skim-tags" aria-label="Skills used">
            {skills.map((s) => (
              <li key={s} className="cs-tag">
                {s}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Micro-link (fixed) */}
      <p className="cs-micro">
        <button type="button" className="cs-micro-link" onClick={onBackToStory}>
          Back to full story ↑
        </button>
      </p>
    </aside>
  );
}
