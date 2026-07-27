import { RefObject, useEffect } from "react";

export default function useFlagshipReveal(rootRef: RefObject<HTMLElement>) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (typeof IntersectionObserver === "undefined") {
      root.querySelectorAll<HTMLElement>(".rp-reveal").forEach((element) => element.classList.add("is-in"));
      return;
    }

    const elements = Array.from(root.querySelectorAll<HTMLElement>(".rp-reveal"));
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-in");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [rootRef]);
}
