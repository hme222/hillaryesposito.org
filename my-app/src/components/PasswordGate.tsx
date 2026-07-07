import React, { useState, FormEvent } from "react";

const CORRECT_PASSWORD = "hillary123";
const SESSION_KEY = "mobbin-unlocked";

export default function PasswordGate({ children }: { children: React.ReactNode }) {
  const [unlocked, setUnlocked] = useState(() => sessionStorage.getItem(SESSION_KEY) === "true");
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (value === CORRECT_PASSWORD) {
      sessionStorage.setItem(SESSION_KEY, "true");
      setUnlocked(true);
    } else {
      setError(true);
      setValue("");
    }
  }

  if (unlocked) return <>{children}</>;

  return (
    <main className="pw-gate" aria-label="Password required">
      <div className="pw-gate__card">
        <div className="pw-gate__icon" aria-hidden="true">🔒</div>
        <h1 className="pw-gate__title">This case study is password-protected</h1>
        <p className="pw-gate__subtitle">Enter the password to view this case study.</p>
        <form onSubmit={handleSubmit} className="pw-gate__form">
          <input
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
          <button type="submit" className="pw-gate__btn">View case study</button>
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
