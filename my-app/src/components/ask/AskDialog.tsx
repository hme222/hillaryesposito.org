import React, { FormEvent, useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "../Modal";
import { XIcon } from "../LineIcons";
import { useLanguage, useT } from "../../app/LanguageContext";
import { sendPortfolioEvent } from "../../analytics/PortfolioAnalytics";
import type { AskApiResponse, AskLang, KnowledgeEntry } from "../../ask/types";
import "../../styles/ask.css";

const EMAIL = "espositohillary@gmail.com";
const MAX_QUESTION_CHARS = 300;
const API = "/api/ask";

type OpenAskDetail = { returnFocus?: HTMLElement | null; entry?: string };

export type AskView =
  | { kind: "idle" }
  | { kind: "thinking" }
  | { kind: "answered"; answer: string; citations: KnowledgeEntry[] }
  | { kind: "passages"; passages: KnowledgeEntry[] }
  | { kind: "not-covered"; related: KnowledgeEntry[] }
  | { kind: "failed" };

// One health check per page load; the static preview has no /api, which is
// the same path as "no key on Vercel": passages become the answer.
let aiAvailable: Promise<boolean> | null = null;
function checkAi(): Promise<boolean> {
  if (!aiAvailable) {
    aiAvailable = fetch(API, { method: "GET", headers: { Accept: "application/json" } })
      .then((r) => (r.ok ? r.json() : { aiAvailable: false }))
      .then((j: { aiAvailable?: boolean }) => j.aiAvailable === true)
      .catch(() => false);
  }
  return aiAvailable;
}

async function postAsk(question: string, lang: AskLang, ids: string[], signal: AbortSignal): Promise<AskApiResponse> {
  try {
    const r = await fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ question, lang, ids }),
      signal,
    });
    if (!r.ok) return { fallback: true };
    const j = (await r.json()) as Partial<{ covered: boolean; answer: string; citations: string[]; fallback: boolean }>;
    if (j.fallback || typeof j.covered !== "boolean") return { fallback: true };
    return { covered: j.covered, answer: typeof j.answer === "string" ? j.answer : "", citations: Array.isArray(j.citations) ? j.citations : [] };
  } catch {
    return { fallback: true };
  }
}

function isInternal(url: string): boolean {
  return url.startsWith("/") && !url.toLowerCase().endsWith(".pdf");
}

/** Scroll to an anchor once its page has mounted (case studies load lazily). */
function revealAnchor(id: string) {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let attempts = 0;
  const tryScroll = () => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ block: "start", behavior: reduce ? "auto" : "smooth" });
      const heading = el.matches("h1, h2, h3") ? el : el.querySelector<HTMLElement>("h1, h2, h3");
      if (heading) {
        heading.tabIndex = -1;
        heading.focus({ preventScroll: true });
      }
      return;
    }
    attempts += 1;
    if (attempts < 40) window.setTimeout(tryScroll, 100);
  };
  tryScroll();
}

/**
 * @status: stable
 * @purpose: The "Ask about the work" dialog (mounted once in app/App.tsx on the shared Modal): starter questions, a quiet "Open the 90-second tour" link that closes this dialog and opens the recruiter panel instead of querying the engine, a labelled question field, client-side retrieval over the approved knowledge passages, an optional Claude answer from /api/ask, and five states (idle, thinking, answered with sources, passages when the answer step is unavailable, not covered with related links and email). Opened by the `open-ask` CustomEvent from the nav dock's Ask item and the recruiter panel; never speaks as Hillary.
 */
export default function AskDialog() {
  const t = useT();
  const { lang } = useLanguage();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [returnFocus, setReturnFocus] = useState<HTMLElement | null>(null);
  const [question, setQuestion] = useState("");
  const [view, setView] = useState<AskView>({ kind: "idle" });
  const inputRef = useRef<HTMLInputElement>(null);
  const seqRef = useRef(0);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent<OpenAskDetail>).detail;
      setReturnFocus(detail?.returnFocus ?? null);
      setOpen(true);
      sendPortfolioEvent({ name: "ask_open", parameters: { event_category: "ask", entry: detail?.entry ?? "unknown", lang } });
    };
    window.addEventListener("open-ask", handler);
    return () => window.removeEventListener("open-ask", handler);
  }, [lang]);

  // The field takes focus on open so a typed question is one keystroke away;
  // the dialog's name is still announced first by the native <dialog>.
  useEffect(() => {
    if (!open) return;
    const id = window.requestAnimationFrame(() => inputRef.current?.focus());
    return () => window.cancelAnimationFrame(id);
  }, [open]);

  // A new language means a new index and new strings: start clean.
  useEffect(() => {
    seqRef.current += 1;
    setView({ kind: "idle" });
    setQuestion("");
  }, [lang]);

  const close = useCallback(() => {
    abortRef.current?.abort();
    seqRef.current += 1;
    setOpen(false);
    setView((v) => (v.kind === "thinking" ? { kind: "idle" } : v));
  }, []);

  const track = (name: "ask_answered" | "ask_not_covered", extra: Record<string, string>) =>
    sendPortfolioEvent({ name, parameters: { event_category: "ask", lang, ...extra } });

  async function ask(raw: string) {
    const q = raw.trim().slice(0, MAX_QUESTION_CHARS);
    if (!q) {
      inputRef.current?.focus();
      return;
    }
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;
    const seq = ++seqRef.current;
    const live = () => seq === seqRef.current;
    setView({ kind: "thinking" });

    let engine: typeof import("../../ask/engine");
    let result: ReturnType<typeof engine.search>;
    try {
      engine = await import("../../ask/engine");
      const index = await engine.getIndex(lang);
      if (!live()) return;
      result = engine.search(index, q, { limit: 8 });
    } catch {
      if (live()) setView({ kind: "failed" });
      return;
    }

    if (!result.covered) {
      setView({ kind: "not-covered", related: engine.distinctSources(result.hits, 3) });
      track("ask_not_covered", { stage: "retrieval" });
      return;
    }

    const top = result.hits.map((h) => h.entry);
    const available = await checkAi();
    if (!live()) return;
    const showPassages = (mode: string) => {
      setView({ kind: "passages", passages: top.slice(0, 3) });
      track("ask_answered", { mode });
    };
    if (!available) {
      showPassages("passages");
      return;
    }

    const res = await postAsk(q, lang, top.map((e) => e.id), controller.signal);
    if (!live()) return;
    if ("fallback" in res) {
      showPassages("passages_fallback");
      return;
    }
    if (!res.covered) {
      setView({ kind: "not-covered", related: engine.distinctSources(result.hits, 3) });
      track("ask_not_covered", { stage: "model" });
      return;
    }
    const citations = res.citations.map((id) => top.find((e) => e.id === id)).filter((e): e is KnowledgeEntry => !!e);
    if (!citations.length) {
      showPassages("passages_uncited");
      return;
    }
    setView({ kind: "answered", answer: res.answer, citations });
    track("ask_answered", { mode: "answer", citations: String(citations.length) });
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    void ask(question);
  }

  function onStarter(text: string) {
    setQuestion(text);
    void ask(text);
  }

  function onSourceClick(e: React.MouseEvent<HTMLAnchorElement>, entry: KnowledgeEntry) {
    sendPortfolioEvent({
      name: "ask_source_click",
      parameters: { event_category: "ask", lang, source_type: entry.source.type, link_location: "ask" },
    });
    const url = entry.source.url;
    if (!url || !isInternal(url)) return; // PDFs, the repo and Storybook open natively in a new tab
    e.preventDefault();
    const [path, hash] = url.split("#");
    close();
    navigate({ pathname: path, hash: hash ? `#${hash}` : "" });
    if (hash) revealAnchor(hash);
  }

  const starters = [t("ask.starter1"), t("ask.starter2"), t("ask.starter3"), t("ask.starter4")];
  const thinking = view.kind === "thinking";
  const birdSrc = view.kind === "not-covered" ? "bird-not-covered" : "bird-idle";

  const renderSourceLink = (entry: KnowledgeEntry) => {
    const { url, label } = entry.source;
    if (!url) return <span className="ask-source__label">{label}</span>;
    if (isInternal(url)) {
      return (
        <a className="ask-source__label" href={url} onClick={(e) => onSourceClick(e, entry)}>
          {label}
        </a>
      );
    }
    return (
      <a
        className="ask-source__label"
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        onClick={(e) => onSourceClick(e, entry)}
      >
        {label} <span className="sr-only">{t("ask.opensNewTab")}</span>
      </a>
    );
  };

  const renderPassage = (entry: KnowledgeEntry) => (
    <li className={`ask-source${entry.quote ? " ask-source--quote" : ""}`} key={entry.id}>
      {entry.quote ? (
        <figure className="ask-quote">
          <blockquote className="ask-quote__text" lang={entry.lang}>
            {entry.text}
          </blockquote>
          {/* The label already reads "In Hillary's words · Interview, Oct 2026"
              (ES: "En palabras de Hillary (cita original en inglés) · …"). */}
          <figcaption className="ask-quote__attribution">{renderSourceLink(entry)}</figcaption>
        </figure>
      ) : (
        <>
          <p className="ask-source__text" lang={entry.lang}>{entry.text}</p>
          {renderSourceLink(entry)}
        </>
      )}
    </li>
  );

  const emailLink = (
    <a className="ask-email" href={`mailto:${EMAIL}`}>
      {EMAIL}
    </a>
  );

  return (
    <Modal
      isOpen={open}
      onClose={close}
      labelledBy="ask-dialog-title"
      className="riso-page ask-dialog"
      lang={lang}
      returnFocus={returnFocus}
    >
      <div className="ask-dialog__inner" data-analytics-location="ask">
        <header className="ask-dialog__header">
          <img
            className={`ask-bird${thinking ? " ask-bird--thinking" : ""}`}
            src={`/assets/ask/${birdSrc}@160.webp`}
            srcSet={`/assets/ask/${birdSrc}@160.webp 1x, /assets/ask/${birdSrc}@320.webp 2x`}
            width={80}
            height={67}
            alt=""
            aria-hidden="true"
            decoding="async"
          />
          <h2 id="ask-dialog-title" className="ask-dialog__title">
            {t("ask.title")}
          </h2>
          <button type="button" className="ask-dialog__close" onClick={close} aria-label={t("ask.close")}>
            <XIcon />
          </button>
        </header>

        <div className="ask-dialog__body">
          <p className="ask-dialog__intro">{t("ask.intro")}</p>

          <p className="ask-kicker" id="ask-starters-label">
            {t("ask.startersLabel")}
          </p>
          <ul className="ask-starters" aria-labelledby="ask-starters-label">
            {starters.map((s) => (
              <li key={s}>
                <button type="button" className="ask-starter" onClick={() => onStarter(s)} disabled={thinking}>
                  {s}
                </button>
              </li>
            ))}
          </ul>

          {/* A different kind of action from the starters above - this opens
              the recruiter panel instead of querying the engine, so it stays
              a quiet link rather than another starter-shaped button. */}
          <button type="button" className="ask-ninety-link" onClick={() => {
            close();
            window.dispatchEvent(new CustomEvent("open-recruiter-panel", { detail: { returnFocus } }));
          }}>
            {t("ask.ninetySecondLink")}
          </button>

          <form className="ask-form" onSubmit={onSubmit}>
            <label className="ask-kicker" htmlFor="ask-question">
              {t("ask.inputLabel")}
            </label>
            <div className="ask-form__row">
              <input
                ref={inputRef}
                id="ask-question"
                className="ask-input"
                type="text"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                maxLength={MAX_QUESTION_CHARS}
                autoComplete="off"
                enterKeyHint="search"
              />
              <button type="submit" className="rp-cta ask-submit" disabled={thinking}>
                {t("ask.submit")}
              </button>
            </div>
          </form>

          <div className="ask-result" role="status" aria-live="polite" aria-atomic="true" aria-label={t("ask.answerLabel")}>
            {view.kind === "thinking" && <p className="ask-result__status">{t("ask.thinking")}</p>}

            {view.kind === "answered" && (
              <>
                <p className="ask-answer">{view.answer}</p>
                <h3 className="ask-kicker ask-result__heading">{t("ask.sources")}</h3>
                <ul className="ask-sources">{view.citations.map(renderPassage)}</ul>
              </>
            )}

            {view.kind === "passages" && (
              <>
                <h3 className="ask-kicker ask-result__heading">{t("ask.passagesTitle")}</h3>
                <ul className="ask-sources">{view.passages.map(renderPassage)}</ul>
              </>
            )}

            {view.kind === "not-covered" && (
              <>
                <h3 className="ask-result__title">{t("ask.notCoveredTitle")}</h3>
                {view.related.length > 0 && (
                  <>
                    <p className="ask-kicker ask-result__heading">{t("ask.notCoveredRelated")}</p>
                    <ul className="ask-related">
                      {view.related.map((entry) => (
                        <li key={entry.id}>{renderSourceLink(entry)}</li>
                      ))}
                    </ul>
                  </>
                )}
                <p className="ask-result__email">
                  {t("ask.notCoveredEmail")} {emailLink}
                </p>
              </>
            )}

            {view.kind === "failed" && (
              <>
                <h3 className="ask-result__title">{t("ask.failedTitle")}</h3>
                <p className="ask-result__email">
                  {t("ask.failedBody")} {emailLink}
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
}
