import React from 'react';

const LEDGER_ROWS = [
  { label: 'Dangote Cement · 40 bags', value: '₦466,000' },
  { label: 'Sharp sand · 3 trips', value: '₦255,000' },
  { label: 'Gravel · 2 trips', value: '₦190,000' },
  { label: 'Expenses · offloading', value: '₦12,000' },
];

export default function Hero() {
  return (
    <>
      {/* Empty scroll-anchor target for href="#top" links — a <div>, not an
          <a>, since it has no href/content of its own (matches the original
          HTML's empty <a id="top"> in purpose, just without the a11y
          complaint an empty, href-less anchor tag triggers). */}
      <div id="top"></div>
      <section className="hero">
        <div className="wrap hero-grid">
          <div>
            <span className="eyebrow">OgaStock · Built for the yard, not the office</span>
            <h1>
              Real books for
              <br />
              real <span className="u">traders</span>.
            </h1>
            <p className="lead">
              OgaStock builds tools for Africa's building-materials traders. One13, our first
              product, turns every bag of cement you sell into accounts you can actually trust.
            </p>
            <div className="hero-cta">
              <a href="#contact" className="btn-primary">Get One13</a>
              <a href="#product" className="btn-ghost">See what it does</a>
            </div>
            <p className="hero-note">Cement · Sand · Gravel · Blocks · Rods — priced and tracked, to the kobo.</p>
          </div>
          <div>
            <div className="ledger" aria-hidden="true">
              <div className="ledger-top">
                <span className="t">One13 · Today</span>
                <span className="dot"></span>
              </div>
              <div className="ledger-body">
                {LEDGER_ROWS.map((row) => (
                  <div className="row" key={row.label}>
                    <span className="lbl">{row.label}</span>
                    <span className="val">{row.value}</span>
                  </div>
                ))}
                <div className="row total">
                  <span className="lbl">Profit today</span>
                  <span className="val pos">₦83,400</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
