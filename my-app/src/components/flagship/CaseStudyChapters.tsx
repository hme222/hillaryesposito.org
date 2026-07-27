import React, { useEffect, useState } from "react";

export type CaseStudyChapter = {
  id: string;
  label: string;
  note: string;
};

/**
 * Chapter wayfinding for the long case studies.
 *
 * Sticky and self-highlighting on purpose. These pages run long enough that a
 * reader whose attention breaks has no way to recover their place, and a nav
 * that only says where you *can* go — never where you *are* — leaves them to
 * re-scan the page to reorient.
 *
 * Active tracking uses the reference-line approach from Navbar rather than an
 * IntersectionObserver threshold: sections here are routinely taller than the
 * viewport, so "30% visible" never becomes true for the tall ones.
 */
export default function CaseStudyChapters({
  project,
  chapters,
}: {
  project: string;
  chapters: CaseStudyChapter[];
}) {
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const ids = chapters.map((chapter) => chapter.id);
    const update = () => {
      const line = window.innerHeight * 0.35;
      let current = "";
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= line) current = id;
      }
      setActive(current);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [chapters]);

  return (
    <nav className="rp-chapters" aria-label={`${project} case study chapters`}>
      <span>Jump to</span>
      {chapters.slice(1).map((chapter) => (
        <a
          href={`#${chapter.id}`}
          key={chapter.id}
          className={active === chapter.id ? "is-active" : undefined}
          aria-current={active === chapter.id ? "true" : undefined}
        >
          {chapter.label}
        </a>
      ))}
    </nav>
  );
}
