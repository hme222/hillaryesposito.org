// src/pages/Contact.tsx
import React from "react";

export default function Contact() {
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    alert("Thanks—I'll reply soon.");
    e.currentTarget.reset();
  }

  return (
    <section className="section active contact-hero" aria-label="Contact section">
      <div className="contact-container">
        <div className="contact-info">
          <h1>Let’s build something</h1>
          <p>Freelance, full-time, or collaborations. If you’re hiring or launching, I’d love to chat.</p>
        </div>

        <div className="contact-form">
          <form autoComplete="off" onSubmit={handleSubmit} noValidate>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input id="name" name="name" type="text" required />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input id="email" name="email" type="email" required />
            </div>

            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea id="message" name="message" required rows={6} />
            </div>

            <div className="form-actions">
              <button type="submit" className="submit-btn">
                Send
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
