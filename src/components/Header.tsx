import React, { useState } from 'react';

const NAV_LINKS = [
  { href: '#product', label: 'One13' },
  { href: '#how', label: 'How it works' },
  { href: '#vision', label: "Where it's going" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header>
      <div className="wrap nav">
        <a href="#top" className="brand">
          <span className="glyph">OS</span> OgaStock
        </a>
        <nav className={`nav-links${open ? ' open' : ''}`} id="navlinks">
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href} onClick={() => setOpen(false)}>
              {link.label}
            </a>
          ))}
          <a href="#contact" className="nav-cta" onClick={() => setOpen(false)}>
            Get One13
          </a>
        </nav>
        <button
          className="nav-toggle"
          id="navToggle"
          aria-label="Menu"
          onClick={() => setOpen((prev) => !prev)}
        >
          MENU
        </button>
      </div>
    </header>
  );
}
