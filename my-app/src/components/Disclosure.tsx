import React from "react";

type DisclosureProps = {
  title: string;
  children: React.ReactNode;
  className?: string;
};

export default function Disclosure({ title, children, className = "" }: DisclosureProps) {
  return (
    <details className={`content-disclosure ${className}`.trim()}>
      <summary>
        <span>{title}</span>
        <span className="content-disclosure__chevron" aria-hidden="true">⌄</span>
      </summary>
      <div className="content-disclosure__body">
        {children}
      </div>
    </details>
  );
}
