import React, { Component } from "react";

// Last-resort boundary above the whole app. LazyRouteBoundary covers a chunk
// that fails to load; this covers anything else that throws during render, so
// a visitor sees a way back instead of a blank page.
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
    return (
      <main className="not-found" role="alert">
        <div className="not-found__number" aria-hidden="true">↻</div>
        <div className="not-found__copy">
          <h1>Something went wrong.</h1>
          <p>Reload the page to try again.</p>
          <div className="not-found__actions">
            <button
              type="button"
              className="not-found__primary"
              onClick={() => window.location.reload()}
            >
              Reload
            </button>
          </div>
        </div>
      </main>
    );
  }
}
