import React, { useState } from 'react';
import { useReveal } from '../hooks/useReveal';

const CONTACT_EMAIL = 'hello@ogastock.com';
const CONTACT_PHONE_DISPLAY = '+234 906 201 6800';

export default function Contact() {
  const ref = useReveal<HTMLDivElement>();
  const [formNote, setFormNote] = useState('');

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = data.get('name') as string;
    const biz = data.get('biz') as string;
    const phone = data.get('phone') as string;
    const msg = data.get('msg') as string;

    const subject = `One13 setup request${biz ? ` — ${biz}` : ''}`;
    const body = [
      `Name: ${name}`,
      biz ? `Business: ${biz}` : null,
      `Phone/WhatsApp: ${phone}`,
      msg ? `What they sell: ${msg}` : null,
    ]
      .filter(Boolean)
      .join('\n');

    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setFormNote(`Opening your email app to send this to us — if nothing happens, email us directly at ${CONTACT_EMAIL}.`);
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
              <span className="v" id="c-phone">{CONTACT_PHONE_DISPLAY}</span>
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
