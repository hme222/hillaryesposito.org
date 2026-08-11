import React, { useEffect, useMemo } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import RisoDefs from "../../components/riso/RisoDefs";
import CartoField from "../../components/riso/CartoField";
import usePageTitle from "../../hooks/usePageTitle";
import { useLanguage } from "../../app/LanguageContext";
import { curatedPages, type CuratedPage } from "../../data/curatedPages";
import NotFoundPage from "../NotFoundPage";
import "../../styles/riso.css";
import "../../styles/riso-page.css";

/**
 * Curated role page — the company-mirror application pages, in the Risograph
 * Cartography system. One renderer serves every curated page (Indyx, Meta, …);
 * content comes from src/data/curatedPages.
 */

// When a "What to review" item names a real case study, link it there at the
// moment it's named. Items that aren't standalone case studies (e.g. "The
// 'AI vs mine' calls") match nothing and render as plain text.
const CASE_STUDY_LINKS: Array<{ match: RegExp; path: string }> = [
  { match: /\bmobbin\b/i, path: "/case-study/mobbin" },
  { match: /\bmsk\b/i, path: "/case-study/msk" },
  { match: /\bgrove\b/i, path: "/case-study/grove" },
];
function caseStudyPathFor(title: string): string | undefined {
  return CASE_STUDY_LINKS.find((link) => link.match.test(title))?.path;
}

/**
 * Width of a headline's longest unbreakable word, measured at a 100px reference
 * size, so CSS can size the type to its plate exactly.
 *
 * A character-count approximation is not good enough here: Archivo 850 runs
 * ~0.61em per character for "Instagram" but ~0.75em for "CompanyCam", because
 * capitals are wider. One shared ratio either lets the capital-heavy names
 * overflow or shrinks the rest more than they need. Canvas measurement is exact
 * and costs no layout — nothing is inserted into the document.
 */
function useLongestWordWidth(text: string): number | null {
  const [w100, setW100] = React.useState<number | null>(null);
  React.useEffect(() => {
    let cancelled = false;
    const measure = () => {
      if (cancelled) return;
      const canvas = document.createElement("canvas").getContext("2d");
      if (!canvas) return;
      // Match the rendered headline: same family, weight and tracking.
      canvas.font = '850 100px Archivo, -apple-system, BlinkMacSystemFont, sans-serif';
      canvas.letterSpacing = "-2.4px"; // -.024em at 100px
      const widest = Math.max(...text.split(/\s+/).map((word) => canvas.measureText(word).width));
      setW100(Math.ceil(widest));
    };
    // Measure once the webfont is in, otherwise we size against a fallback.
    if (document.fonts?.ready) document.fonts.ready.then(measure);
    else measure();
    return () => { cancelled = true; };
  }, [text]);
  return w100;
}

function FitSection({ page }: { page: CuratedPage }) {
  return (
    <section id="curated-fit" className="rp-section" style={{ scrollMarginTop: "9.5rem" }}>
      <div className="rp-wrap rp-reveal">
        <p className="rp-kicker">The short version</p>
        <h2 className="rp-title">Why I’m a fit for this</h2>
        {page.intro.map((p) => (
          <p className="rp-lede" key={p}>{p}</p>
        ))}
      </div>
    </section>
  );
}

function ProofSection({ page }: { page: CuratedPage }) {
  return (
    <section id="curated-proof" className="rp-section rp-section--alt" style={{ scrollMarginTop: "9.5rem" }}>
      <div className="rp-wrap">
        <p className="rp-kicker">{page.proofKicker ?? "Numbers, with sources"}</p>
        <h2 className="rp-title">What I’ve already proven</h2>
        <div className="rp-outcomes rp-reveal">
          {page.proofPoints.map((pt) => (
            <div className="rp-stat" key={pt.stat + pt.detail}>
              <p className="rp-stat__n">{pt.stat}</p>
              <p className="rp-stat__l">{pt.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function WorkSection({ page }: { page: CuratedPage }) {
  return (
    <section id="curated-work" className="rp-section" style={{ scrollMarginTop: "9.5rem" }}>
      <div className="rp-wrap">
        <p className="rp-kicker">Start here</p>
        <h2 className="rp-title">What to review</h2>
        <ol className="rp-numlist rp-reveal">
          {page.featuredWork.map((item) => {
            const path = caseStudyPathFor(item.title);
            return (
              <li key={item.title}>
                <h3>{path ? <Link className="rp-numlist__link" to={path}>{item.title}</Link> : item.title}</h3>
                <p>{item.reason}</p>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

export default function CuratedRolePage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { lang } = useLanguage();
  const page = useMemo(() => (slug ? curatedPages[slug] : undefined), [slug]);
  usePageTitle(page ? `${page.company}: ${page.role}` : "Page not found");
  const headlineW100 = useLongestWordWidth(page?.company ?? "");

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    // Opt in only once the observer is definitely running; the early return
    // above now leaves content visible instead of hidden forever.
    document.querySelector<HTMLElement>(".riso-page")?.classList.add("js-reveal");
    const els = Array.from(document.querySelectorAll<HTMLElement>(".riso-page .rp-reveal"));
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.1, rootMargin: "0px 0px -8% 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [slug]);

  if (!page) return <NotFoundPage />;

  return (
    <main
      className="riso-page"
      aria-label={`${page.company} tailored portfolio page`}
      lang="en"
      style={
        page.accent
          ? ({
              "--rp-accent-l": page.accent,
              ...(page.accentDark ? { "--rp-accent-d": page.accentDark } : {}),
            } as React.CSSProperties)
          : undefined
      }
    >
      <RisoDefs />

      <nav className="rp-breadcrumb" aria-label="Breadcrumb">
        <Link to="/">Work</Link> / <span>{page.company}</span>
      </nav>
      {lang === "es" && (
        <p className="rp-language-note" lang="es">
          Esta página adaptada está disponible en inglés. Los estudios de caso enlazados sí incluyen un resumen en español.
        </p>
      )}

      <nav className="rp-chapters" aria-label={`${page.company} tailored page chapters`}>
        <span>Jump to</span>
        {page.proofFirst ? (
          <>
            <a href="#curated-proof">Proof</a>
            <a href="#curated-work">Work</a>
            <a href="#curated-fit">Fit</a>
          </>
        ) : (
          <>
            <a href="#curated-fit">Fit</a>
            <a href="#curated-proof">Proof</a>
            <a href="#curated-work">Work</a>
          </>
        )}
      </nav>

      {/* HERO */}
      <header className="rp-hero">
        <CartoField
          mapSrc={page.mapSrc ?? "/riso/elevation-01.jpg"}
          edition={page.edition ?? "pine"}
          mapZoom={1.15}
          mapPosition="55% 38%"
          mapOpacity={0.8}
        />
        <div className="rp-hero__content">
          <div className="rp-clearing">
            <span className="rp-eyebrow">{page.eyebrow}</span>
            {/* Company names run from "Indyx" to "Manière De Voir". At the shared
                h1 size the long ones broke out of the clearing and printed over
                the collage — "Instagram" measured 407px inside a 303px box. */}
            <div className="rp-h1Fit">
              <h1
                className={`rp-h1${headlineW100 ? " rp-h1--fit" : ""}`}
                style={headlineW100 ? ({ ["--h1-w100" as string]: headlineW100 } as React.CSSProperties) : undefined}
              >
                {page.company}
              </h1>
            </div>
            <p className="rp-work__sub" style={{ marginTop: ".7rem" }}>{page.role}</p>
            <p className="rp-sub">{page.headline}</p>
            <div className="rp-hero__ctas">
              {page.resumeLink ? (
                <>
                  <Link className="rp-cta" to={page.supportLinks[0]?.path ?? "/case-study/grove"}>
                    {page.caseStudyCtaLabel ?? "Review the first case study"} →
                  </Link>
                  <a
                    className="rp-cta rp-cta--ghost"
                    href={page.resumeLink.path}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${page.resumeLink.label.replace(" · PDF ↗", "")} (PDF, opens in new tab)`}
                  >
                    {page.resumeLink.label}
                  </a>
                </>
              ) : (
                <>
                  <a className="rp-cta" href="#curated-fit">See the fit →</a>
                  <Link className="rp-cta rp-cta--ghost" to={page.supportLinks[0]?.path ?? "/case-study/grove"}>View a case study</Link>
                </>
              )}
            </div>
          </div>
        </div>
        <div className="rp-hero__media">
          <div className="rp-clearing" style={{ maxWidth: "34ch" }}>
            <p className="rp-eyebrow" style={{ marginBottom: ".8rem" }}>{page.badgeLabel}</p>
            <p style={{ fontSize: "1.05rem", fontWeight: 700, letterSpacing: "-.01em", color: "var(--ink-2)" }}>
              {page.subhead}
            </p>
          </div>
        </div>
      </header>

      {/* META GRID */}
      <section className="rp-section" style={{ paddingBottom: 0 }}>
        <div className="rp-wrap">
          <div className="rp-metagrid rp-reveal">
            {page.meta.map((item) => (
              <div key={item.label}>
                <p className="rp-metagrid__k">{item.label}</p>
                <p className="rp-metagrid__v">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {page.proofFirst ? (
        <>
          <ProofSection page={page} />
          <WorkSection page={page} />
          <FitSection page={page} />
        </>
      ) : (
        <>
          <FitSection page={page} />
          <ProofSection page={page} />
          <WorkSection page={page} />
        </>
      )}

      {/* BESPOKE — Meta "obvious vs considered" */}
      {page.slug === "meta-instagram-product-designer" && (
        <section className="rp-section rp-section--alt" aria-labelledby="meta-craft-title">
          <div className="rp-wrap">
            <p className="rp-kicker">A quick proof</p>
            <h2 className="rp-title" id="meta-craft-title">Consumer craft is mostly knowing what to leave out</h2>
            <p className="rp-lede">Same screen, two ways to build it. The job isn't adding more — it's earning attention without spending someone's calm.</p>
            <div className="rp-pushback rp-reveal">
              <div className="rp-notif rp-notif--ai">
                <p className="rp-notif__tag">The obvious version</p>
                <div className="rp-notif__card"><span className="rp-notif__app">grove · limited 24:59</span><p className="rp-notif__msg">Your plant misses you!! Tap now 👉</p></div>
                <div className="rp-notif__card"><span className="rp-notif__app">grove · streak ×7 🔥</span><p className="rp-notif__msg">NEW badges unlocked · claim them</p></div>
                <div className="rp-notif__card"><span className="rp-notif__app">grove · pro</span><p className="rp-notif__msg">▶ Autoplaying · Upgrade to Pro</p></div>
              </div>
              <div className="rp-pushback__vs" aria-hidden="true">vs</div>
              <div className="rp-notif rp-notif--me">
                <p className="rp-notif__tag">The considered version</p>
                <div className="rp-notif__card"><span className="rp-notif__app">Grove · 8:00 AM</span><p className="rp-notif__msg">Good morning. Your Fiddle Leaf could use a little water today.</p></div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* BESPOKE — Fashion campaign artifacts */}
      {page.variant === "fashion" && (
        <section className="rp-section rp-section--alt fashion-artifact-section" aria-labelledby="fashion-artifact-title">
          <div className="rp-wrap">
            <p className="rp-kicker">Visual direction exercise</p>
            <h2 className="rp-title" id="fashion-artifact-title">A role-matched fashion campaign system</h2>
            <p className="rp-lede">A speculative system: campaign hierarchy, ecommerce modules, social and email crops, lookbook logic, and a reusable visual language for collection launches and brand moments.</p>
            <div className="fashion-artifact-grid" aria-label="Speculative fashion graphic design artifacts">
              <article className="fashion-artifact fashion-artifact--campaign">
                <p className="fashion-artifact__label">Campaign key visual</p>
                <h3>Drop 01: Sculpted Utility</h3>
                <p>Hero lockup, product mood, and CTA hierarchy for a collection launch.</p>
              </article>
              <article className="fashion-artifact fashion-artifact--editorial">
                <p className="fashion-artifact__label">Lookbook layout</p>
                <h3>Lookbook spread</h3>
                <p>Image-led grid, restrained type scale, and clear product storytelling.</p>
              </article>
              <article className="fashion-artifact fashion-artifact--social">
                <p className="fashion-artifact__label">Ecommerce + social</p>
                <h3>Social + email set</h3>
                <p>Reusable crops and modules for launch, email, product detail, and last-call moments.</p>
              </article>
            </div>
            <Link to="/curated/fashion-campaign-system" className="rp-cta" style={{ marginTop: "1.4rem" }}>Open the full campaign system →</Link>
          </div>
        </section>
      )}

      {/* STRENGTHS + HIRING NOTE */}
      <section className="rp-section">
        <div className="rp-wrap">
          <div className="rp-split rp-reveal">
            <div className="rp-split__text">
              <p className="rp-kicker">What I bring</p>
              <h2 className="rp-title">What I’d bring on day one</h2>
              <ul className="rp-list">
                {page.strengths.slice(0, 4).map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="rp-note">
              <p className="rp-note__k">A note for hiring teams</p>
              <p>{page.hiringManagerNote}</p>
            </div>
          </div>
        </div>
      </section>

      {/* "Where the experience comes from" was removed on 2026-07-29. It restated
          "What to review" — on six of the eight pages it described the same
          Grove / Mobbin / MSK work in the same terms, one section further down
          and without the links. ~592 words across the set, for no new evidence.
          The copy is still in curatedPages.relevantExperience if a page ever
          needs a background section that says something the work list doesn't. */}

      {/* CLOSING */}
      <section className="rp-section">
        <div className="rp-wrap rp-close">
          <p className="rp-kicker">One last thing</p>
          <h2>Where I’m strongest</h2>
          <p>{page.closing}</p>
          <div className="rp-hero__ctas">
            {page.contactFirst ? (
              <>
                <a className="rp-cta" href="mailto:espositohillary@gmail.com">Email Hillary →</a>
                <Link className="rp-cta rp-cta--ghost" to={page.supportLinks[0]?.path ?? "/case-study/grove"}>
                  {page.caseStudyCtaLabel ?? "Review the first case study"}
                  {page.caseStudyCtaLabel ? " →" : null}
                </Link>
              </>
            ) : (
              <>
                <button type="button" className="rp-cta" onClick={() => navigate("/?scrollTo=projects")}>← Back to work</button>
                <Link className="rp-cta rp-cta--ghost" to="/about">About me</Link>
              </>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
