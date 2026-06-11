import { useEffect } from "react";

const BASE = "Hillary Esposito";

export default function usePageTitle(page?: string) {
  useEffect(() => {
    document.title = page ? `${page} | ${BASE}` : `${BASE} | UX Designer × Process Improvement Leader`;
    return () => { document.title = `${BASE} | UX Designer × Process Improvement Leader`; };
  }, [page]);
}
