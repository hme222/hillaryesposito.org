// Browsers with storage blocked (some privacy modes, sandboxed webviews) throw
// a SecurityError on any localStorage/sessionStorage access, even a read.
// These helpers swallow that and fall back, so a preference that can't be
// saved never takes the page down.
type Kind = "local" | "session";

function store(kind: Kind): Storage | null {
  try {
    return kind === "local" ? window.localStorage : window.sessionStorage;
  } catch {
    return null;
  }
}

export function safeGet(kind: Kind, key: string): string | null {
  try {
    return store(kind)?.getItem(key) ?? null;
  } catch {
    return null;
  }
}

export function safeSet(kind: Kind, key: string, value: string): void {
  try {
    store(kind)?.setItem(key, value);
  } catch {
    // Quota or blocked storage: the preference just won't persist.
  }
}
