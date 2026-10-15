import React, { Component } from "react";
import { translate, type Lang } from "../i18n/strings";
import { safeGet } from "./safeStorage";

// Last-resort boundary above the whole app. LazyRouteBoundary covers a chunk
// that fails to load; this covers anything else that throws during render, so
// a visitor sees a way back instead of a blank page.
//
// It sits above the Router, so links are plain anchors. Language comes from
// storage rather than context: whatever threw may be the provider itself.
function storedLang(): Lang {
  return safeGet("local", "lang") === "es" ? "es" : "en";
}

export default class AppErrorBoundary extends Component<
  { children: React.ReactNode },
  { failed: boolean }
> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  render() {
    if (!this.state.failed) return this.props.children;
    const lang = storedLang();
    const t = (key: Parameters<typeof translate>[1]) => translate(lang, key);
    return (
      <main className="not-found" role="alert" lang={lang}>
        <div className="not-found__number" aria-hidden="true">↻</div>
        <div className="not-found__copy">
          <h1>{t("recovery.appTitle")}</h1>
          <p>{t("recovery.appBody")}</p>
          <div className="not-found__actions">
            <button
              type="button"
              className="not-found__primary"
              onClick={() => window.location.reload()}
            >
              {t("recovery.appReload")}
            </button>
            <a className="not-found__secondary" href="/?scrollTo=projects">
              {t("notFound.work")}
            </a>
            <a className="not-found__secondary" href="mailto:espositohillary@gmail.com">
              {t("recovery.email")}
            </a>
          </div>
        </div>
      </main>
    );
  }
}
