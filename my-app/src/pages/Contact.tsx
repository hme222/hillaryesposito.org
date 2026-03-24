import React from "react";
import emailjs from "@emailjs/browser";

export default function Contact() {
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = e.currentTarget;

    try {
      await emailjs.sendForm(
        "service_q1wp8vi",
        "template_l869lhf",
        form,
        "bGvvXIOFbQBoA_PSK"
      );

      alert("Message sent successfully!");
      form.reset();
    } catch (error) {
      console.error(error);
      alert("Something went wrong. Please try again.");
    }
  }

  return (
    <section className="section active contact-hero" aria-label="Contact section">
      <div className="contact-container">
        <div className="contact-info">
          <h1>Let’s build something</h1>
          <p>Freelance, full-time, or collaborations. If you’re hiring or launching, I’d love to chat.</p>
        </div>

        <div className="contact-form">
          <form autoComplete="off" onSubmit={handleSubmit}>
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
              <textarea id="message" name="message" rows={6} required />
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