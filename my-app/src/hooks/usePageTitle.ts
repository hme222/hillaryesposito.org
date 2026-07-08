import { useEffect } from "react";

const BASE = "Hillary Esposito";
const DEFAULT_TITLE = `${BASE} | UX & Product Designer | Healthcare Systems | Human-Centered Process Design | Army Veteran`;

export default function usePageTitle(page?: string) {
  useEffect(() => {
    document.title = page ? `${page} | ${BASE}` : DEFAULT_TITLE;
    return () => { document.title = DEFAULT_TITLE; };
  }, [page]);
}
