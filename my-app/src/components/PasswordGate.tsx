import React, { useState, useRef, FormEvent } from "react";
import { LockIcon } from "./LineIcons";

const PASSWORD_SHA256 = "4a707e3a066d834d96a4fe907d5cc8318309d7106984c0156b20b5c02997b78a";
const SESSION_KEY = "mobbin-unlocked";

async function sha256(value: string) {
  const encoded = new TextEncoder().encode(value);
  const digest = await crypto.subtle.digest("SHA-256", encoded);
  return Array.from(new Uint8Array(digest))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

export default function PasswordGate({ children }: { children: React.ReactNode }) {
  const [unlocked, setUnlocked] = useState(() => sessionStorage.getItem(SESSION_KEY) === "true");
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);
  const [checking, setChecking] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setChecking(true);
    const enteredHash = await sha256(value);
    setChecking(false);

    if (enteredHash === PASSWORD_SHA256) {
      sessionStorage.setItem(SESSION_KEY, "true");
      setUnlocked(true);
    } else {
      setError(true);
      setValue("");
      // Return focus to the (now-cleared) field so the error is announced and
      // the user can retry without hunting for the input again.
      inputRef.current?.focus();
    }
  }

  if (unlocked) return <>{children}</>;

  return (
    <main className="pw-gate" aria-label="Password required" lang="en">
      <div className="pw-gate__card">
        <div className="pw-gate__icon" aria-hidden="true"><LockIcon /></div>
        <h1 className="pw-gate__title">This case study is password-protected</h1>
        <p className="pw-gate__subtitle">Enter the password to view this case study.</p>
        <form onSubmit={handleSubmit} className="pw-gate__form">
          <input
            ref={inputRef}
            type="password"
            className={`pw-gate__input${error ? " pw-gate__input--error" : ""}`}
            value={value}
            onChange={(e) => { setValue(e.target.value); setError(false); }}
            placeholder="Password"
            autoFocus
            aria-label="Password"
            aria-invalid={error || undefined}
            aria-describedby={error ? "pw-gate-error" : undefined}
          />
          <button type="submit" className="pw-gate__btn" disabled={checking}>
            {checking ? "Checking..." : "View case study"}
          </button>
        </form>
        {error && <p id="pw-gate-error" className="pw-gate__error" role="alert">Incorrect password. Try again.</p>}
        <p className="pw-gate__help">
          Don't have the password?{" "}
          <a href="mailto:espositohillary@gmail.com?subject=Portfolio%20case%20study%20access">Email me</a>{" "}
          and I'll send it over.
        </p>
      </div>
    </main>
  );
}
