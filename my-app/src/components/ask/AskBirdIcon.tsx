import React from "react";

/**
 * Paper-map bird, idle pose, simplified for 24px. Adapted from
 * design-docs/media/ask-bird/bird-icon.svg: ink outline and eye via
 * currentColor, paper fill from the page surface, one coral route line across
 * the wing via --coral (which ask.css provides outside Riso-scoped pages).
 * Decorative: the word beside it carries the meaning.
 * @status: stable
 * @purpose: 24px line-drawing of the "Ask about the work" paper bird, used beside the "Ask" label in the navbar (components/Navbar.tsx) and on the recruiter panel's "Ask a question" button (components/RecruiterPill.tsx); currentColor outline plus a coral route line, decorative only.
 */
export default function AskBirdIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      width="24"
      height="24"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <g stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" strokeLinecap="round">
        <path
          d="M14.2 6.2 L17.6 5.4 L19.4 7.6 L17.6 9.6 L18.6 12.8 L15.6 15.6 L8.6 16.6 L3.6 20.2 L5.2 15.4 L3.4 14.6 L10.4 9.8 Z"
          fill="var(--paper, var(--bg))"
        />
        <path d="M19.4 7.6 L21.4 8.4 L19.0 9.0" fill="currentColor" />
        <path d="M12.6 16.4 L12.0 20.0 M14.0 16.2 L14.2 20.0" />
      </g>
      <path
        d="M5.2 15.4 L9.4 12.4 L12.2 13.4 L15.6 10.6"
        stroke="var(--coral)"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="17.3" cy="7.3" r="0.9" fill="currentColor" />
    </svg>
  );
}
