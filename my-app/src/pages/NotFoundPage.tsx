import React from "react";
import { Link } from "react-router-dom";
import { useT } from "../app/LanguageContext";
import usePageTitle from "../hooks/usePageTitle";

export default function NotFoundPage() {
  const t = useT();
  usePageTitle("Page not found");

  return (
    <main className="not-found">
      <div className="not-found__number" aria-hidden="true">404</div>
      <div className="not-found__copy">
        <p className="not-found__eyebrow">{t("notFound.eyebrow")}</p>
        <h1>{t("notFound.title")}</h1>
        <p>{t("notFound.body")}</p>
        <div className="not-found__actions">
          <Link to="/" className="not-found__primary">{t("notFound.home")}</Link>
          <Link to="/?scrollTo=projects" className="not-found__secondary">{t("notFound.work")}</Link>
        </div>
      </div>
    </main>
  );
}
