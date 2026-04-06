import React, { useState } from "react";

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const email = "espositohillary@gmail.com";

  function handleCopy() {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <section className="section active contact-hero" aria-label="Contact section">
      <div className="contact-container">
        <div className="contact-info">
          <h1>Let&apos;s build something</h1>
          <p>
            Freelance, full-time, or collaborations. If you&apos;re hiring or
            launching, I&apos;d love to chat.
          </p>
        </div>

        <div className="contact-email-block">
          
            <a href={"mailto:" + email}
            className="contact-email-link"
            aria-label="Send email">
            {email}
          </a>

          <button
            onClick={handleCopy}
            className="contact-copy-btn"
            aria-label="Copy email address"
          >
            {copied ? (
              <>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                Copied
              </>
            ) : (
              <>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                </svg>
                Copy
              </>
            )}
          </button>
        </div>
      </div>
    </section>
  );
}