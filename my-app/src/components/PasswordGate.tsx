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
        <p className="pw-gate__subtitle">Enter the password to view this project.</p>
        <form onSubmit={handleSubmit} className="pw-gate__form">
          <input
            type="password"
            className={`pw-gate__input${error ? " pw-gate__input--error" : ""}`}
            value={value}
            onChange={(e) => { setValue(e.target.value); setError(false); }}
            placeholder="Password"
            autoFocus
            aria-label="Password"
          />
          <button type="submit" className="pw-gate__btn">View project</button>
        </form>
        {error && <p className="pw-gate__error" role="alert">Incorrect password. Try again.</p>}
      </div>
    </main>
  );
}
