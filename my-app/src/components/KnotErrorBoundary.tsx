import React from "react";

/**
 * Wraps the 3D knot so any runtime error inside it degrades gracefully to a
 * static fallback instead of blanking the whole page. (Panel: senior dev.)
 */
export default class KnotErrorBoundary extends React.Component<
  { fallback: React.ReactNode; children: React.ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: unknown) {
    // Non-fatal — the hero just shows the static fallback.
    if (process.env.NODE_ENV !== "production") {
      // eslint-disable-next-line no-console
      console.warn("[WorkflowKnot] fell back to static:", error);
    }
  }

  render() {
    return this.state.hasError ? this.props.fallback : this.props.children;
  }
}
