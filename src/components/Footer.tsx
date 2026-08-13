import React from 'react';

// PLACEHOLDER — link these to real hosted Privacy Policy / Terms pages once
// they exist (NDPR compliance is required before charging money).
function handleLegalClick(e: React.MouseEvent<HTMLAnchorElement>) {
  e.preventDefault();
  alert('Host your Privacy Policy / Terms and link them here.');
}

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer>
      <div className="wrap">
        <div className="foot-top">
          <div className="foot-brand">
            <a href="#top" className="brand">
              <span className="glyph">OS</span> OgaStock
            </a>
            <p>Tools for Africa's building-materials traders. One13 is our first product.</p>
          </div>
          <div className="foot-cols">
            <div className="foot-col">
              <h4>Product</h4>
              <a href="#product">One13</a>
              <a href="#how">How it works</a>
              <a href="#pricing">Pricing</a>
            </div>
            <div className="foot-col">
              <h4>Company</h4>
              <a href="#vision">Vision</a>
              <a href="#contact">Contact</a>
            </div>
            <div className="foot-col">
              <h4>Legal</h4>
              <a href="#" onClick={handleLegalClick}>Privacy Policy</a>
              <a href="#" onClick={handleLegalClick}>Terms of Service</a>
            </div>
          </div>
        </div>
        <div className="foot-bottom">
          <span>© {year} OgaStock. All rights reserved.</span>
          <span>Made in Nigeria · for the trade</span>
        </div>
      </div>
    </footer>
  );
}
