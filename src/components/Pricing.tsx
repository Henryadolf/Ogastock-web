import React from 'react';
import { useReveal } from '../hooks/useReveal';

const INCLUDED = [
  'Unlimited sales, expenses, and stock',
  'Owner and sales-rep accounts',
  'All four financial statements',
  'Credit tracking and Day End',
  'In-app learning',
];

export default function Pricing() {
  const cardRef = useReveal<HTMLDivElement>();
  const sideRef = useReveal<HTMLDivElement>();

  return (
    <section className="pricing section-pad" id="pricing">
      <div className="wrap price-wrap">
        <div className="price-card reveal" ref={cardRef}>
          <div className="head">
            <span className="p">One13 · Full app</span>
            <span className="p">Naira</span>
          </div>
          <div className="body">
            <div className="amount">
              <span className="cur">₦</span>
              <span className="n">2,000</span>
              <span className="per">/ month</span>
            </div>
            <p style={{ color: 'var(--ink-soft)', fontSize: '14.5px' }}>
              One price. Every feature. No per-branch fees.
            </p>
            <ul className="price-list">
              {INCLUDED.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="price-side reveal" ref={sideRef}>
          <span className="eyebrow">Pricing</span>
          <h3 style={{ marginTop: '14px' }}>Start free. Pay when it's working for you.</h3>
          <p>
            New traders begin with a free first month while we help you set up your books. After
            that it's a flat ₦2,000/month — the cost of a bag of cement — for the whole business.
          </p>
          <p style={{ fontSize: '14.5px', color: 'var(--cement)' }}>
            Onboarding is hands-on: we help you get set up properly, because books are only useful
            when they're right.
          </p>
        </div>
      </div>
    </section>
  );
}
