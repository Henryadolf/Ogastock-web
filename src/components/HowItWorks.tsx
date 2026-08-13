import React from 'react';
import { useReveal } from '../hooks/useReveal';

const STEPS = [
  { num: 1, title: 'Record every sale', desc: "Each time you sell, tap it in. It takes seconds, and it's the one habit that makes everything else true." },
  { num: 2, title: 'Record what goes out', desc: 'Expenses and new stock, entered as they happen — so your profit reflects reality, not guesswork.' },
  { num: 3, title: 'Read your numbers', desc: "Open your statements any time and see your real profit, what you're owed, and what you're worth." },
];

export default function HowItWorks() {
  const headRef = useReveal<HTMLDivElement>();
  const gridRef = useReveal<HTMLDivElement>();

  return (
    <section className="section-pad" id="how">
      <div className="wrap">
        <div className="sec-head reveal" ref={headRef}>
          <span className="eyebrow">How it works</span>
          <h2>Three habits. Real books.</h2>
          <p>
            One13 doesn't ask you to think like an accountant. It asks for three simple habits —
            and does the accounting for you underneath.
          </p>
        </div>
        <div className="how-grid reveal" ref={gridRef}>
          {STEPS.map((s) => (
            <div className="step" key={s.num}>
              <div className="num">{s.num}</div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
