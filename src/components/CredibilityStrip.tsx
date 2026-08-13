import React from 'react';

const ITEMS = [
  <><b>Double-entry</b> accounting</>,
  <>Works on <b>one phone</b></>,
  <>Built by a <b>chartered accountant</b></>,
  <>For the <b>building-materials</b> trade</>,
];

export default function CredibilityStrip() {
  return (
    <div className="strip">
      <div className="wrap strip-in">
        {ITEMS.map((item, i) => (
          <React.Fragment key={i}>
            <span>{item}</span>
            {i < ITEMS.length - 1 && <span className="sep">/</span>}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
