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
    <aside
      id="recruiter-summary"
      className="rsc"
      aria-label={`${title} recruiter quick skim`}
    >
      <div className="rsc__header">
        <div className="rsc__header-left">
          <p className="rsc__eyebrow">Recruiter quick-skim</p>
          <h2 className="rsc__title">{title}</h2>
        </div>

        {timeframe ? (
          <p className="rsc__timeframe">{timeframe}</p>
        ) : null}
      </div>

      <div className="rsc__facts">
        <div className="rsc__fact">
          <p className="rsc__fact-label">What</p>
          <p className="rsc__fact-value">{what}</p>
        </div>

        <div className="rsc__fact-divider" aria-hidden="true" />

        <div className="rsc__fact">
          <p className="rsc__fact-label">Outcome</p>
          <p className="rsc__fact-value">{outcome}</p>
        </div>

        <div className="rsc__fact-divider" aria-hidden="true" />

        <div className="rsc__fact">
          <p className="rsc__fact-label">My role</p>
          <p className="rsc__fact-value">{myRole}</p>
        </div>
      </div>

      <div className="rsc__skills-row">
        <div className="rsc__skills" aria-label="Skills used">
          {skills.map((s) => (
            <span key={s} className="rsc__skill-badge">
              {s}
            </span>
          ))}
        </div>
      </div>

      <div className="rsc__footer">
        <button
          type="button"
          className="rsc__story-btn"
          onClick={onBackToStory}
        >
          View full case study
        </button>
      </div>
    </aside>
  );
}