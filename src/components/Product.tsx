import React from 'react';
import { useReveal } from '../hooks/useReveal';

const FEATURES = [
  { tag: '/ SALES', title: 'Record as you sell', desc: "Cash, transfer, POS, or credit — every sale takes seconds, from the owner's phone or a sales rep's." },
  { tag: '/ STOCK', title: 'Know your stock', desc: 'Cement, sand, gravel, rods — tracked by the bag and the trip, with the true cost behind every sale.' },
  { tag: '/ CREDIT', title: 'Track who owes you', desc: 'Every credit customer, every balance, in one place. No more notebooks, no more forgetting.' },
  { tag: '/ STATEMENTS', title: 'Real financial statements', desc: 'Trial balance, income statement, balance sheet, cash flow — proper double-entry, generated automatically.' },
  { tag: '/ DAY END', title: 'Close the day right', desc: 'Reconcile your cash every evening so nothing goes missing — and catch shortfalls the same day.' },
  { tag: '/ LEARN', title: 'Learn as you grow', desc: 'Short lessons in the app teach you to read your numbers and use them to grow your business.' },
];

function FeatureCard({ tag, title, desc }: { tag: string; title: string; desc: string }) {
  const ref = useReveal<HTMLDivElement>();
  return (
    <div className="feat reveal" ref={ref}>
      <div className="fn">{tag}</div>
      <h3>{title}</h3>
      <p>{desc}</p>
    </div>
  );
}

export default function Product() {
  const headRef = useReveal<HTMLDivElement>();

  return (
    <section className="product section-pad" id="product">
      <div className="wrap">
        <div className="sec-head reveal" ref={headRef}>
          <span className="product-badge">
            <span className="chip">PRODUCT 01</span> One13
          </span>
          <h2>An accountant in your pocket, for the materials trade.</h2>
          <p>
            Most bookkeeping apps are built for offices. One13 is built for a busy yard — record a
            sale in seconds, and get the same real financial statements an accountant would prepare
            for you.
          </p>
        </div>
        <div className="features">
          {FEATURES.map((f) => (
            <FeatureCard key={f.title} {...f} />
          ))}
        </div>
      </div>
    </section>
  );
}
