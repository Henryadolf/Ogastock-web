import React, { useState } from 'react';
import { useReveal } from '../hooks/useReveal';

// PLACEHOLDER — replace with the real contact details before launch.
const CONTACT_EMAIL = '[hello@ogastock.com]';
const CONTACT_PHONE = '[+234 …]';

export default function Contact() {
  const ref = useReveal<HTMLDivElement>();
  const [formNote, setFormNote] = useState('');

  // PLACEHOLDER handler — wire this to a real form service (e.g. Formspree)
  // or backend endpoint later. Currently just mirrors the original static
  // site's behavior: shows a note, submits nothing anywhere.
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormNote("Thanks — this form isn't wired up yet. Connect it to email or a form service.");
  }

  return (
    <section className="contact section-pad" id="contact">
      <div className="wrap contact-grid">
        <div className="reveal" ref={ref}>
          <span className="eyebrow">Get One13</span>
          <h2>Ready to see your real numbers?</h2>
          <p>
            Tell us about your business and we'll help you get set up. One13 works best when we
            onboard you personally — so your books start right.
          </p>
          <div className="contact-methods">
            <div className="cm">
              <span className="k">Email</span>
              <span className="v" id="c-email">{CONTACT_EMAIL}</span>
            </div>
            <div className="cm">
              <span className="k">WhatsApp</span>
              <span className="v" id="c-phone">{CONTACT_PHONE}</span>
            </div>
            <div className="cm">
              <span className="k">Based in</span>
              <span className="v">Nigeria</span>
            </div>
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="field">
            <label htmlFor="name">Your name</label>
            <input id="name" name="name" required />
          </div>
          <div className="field">
            <label htmlFor="biz">Business name</label>
            <input id="biz" name="biz" placeholder="e.g. Simco & Sons Ventures" />
          </div>
          <div className="field">
            <label htmlFor="phone">Phone / WhatsApp</label>
            <input id="phone" name="phone" required />
          </div>
          <div className="field">
            <label htmlFor="msg">What do you sell?</label>
            <textarea id="msg" name="msg" rows={3} placeholder="Cement, sand, gravel, blocks…" />
          </div>
          <button type="submit">Request a setup</button>
          <p className="mono" style={{ fontSize: '12px', color: 'var(--cement)', marginTop: '12px', textAlign: 'center' }}>
            {formNote}
          </p>
        </form>
      </div>
    </section>
  );
}
