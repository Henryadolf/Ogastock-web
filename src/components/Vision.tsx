import React from 'react';
import { useReveal } from '../hooks/useReveal';

const ROADMAP = [
  { label: 'One13 — trader accounting', status: 'Live', on: true, soon: false },
  { label: 'Real financial statements', status: 'Live', on: true, soon: false },
  { label: 'In-app trader education', status: 'Rolling out', on: false, soon: false },
  { label: 'Materials price insight', status: 'On the horizon', on: false, soon: true },
  { label: 'A marketplace for dealers', status: 'On the horizon', on: false, soon: true },
];

export default function Vision() {
  const textRef = useReveal<HTMLDivElement>();
  const cardRef = useReveal<HTMLDivElement>();

  return (
    <section className="vision section-pad" id="vision">
      <div className="wrap vision-grid">
        <div className="reveal" ref={textRef}>
          <span className="eyebrow">Where it's going</span>
          <h2>From one trader's books to a market that can see itself.</h2>
          <p>
            Every trader who runs their business on One13 is building something bigger: the first
            real, ground-level picture of how building materials actually move and trade across
            Africa.
          </p>
          <p>
            We're starting where it matters —{' '}
            <span className="accent">giving individual traders real books they can trust.</span>{' '}
            Everything else is earned from there, one trader at a time.
          </p>
        </div>
        <div className="vision-card reveal" ref={cardRef} aria-hidden="true">
          {ROADMAP.map((item) => (
            <div className="vc-row" key={item.label}>
              <span className="k">
                <span className={`b${item.on ? ' on' : ''}`}></span>
                {item.label}
              </span>
              <span className={`v${item.soon ? ' soon' : ''}`}>{item.status}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
