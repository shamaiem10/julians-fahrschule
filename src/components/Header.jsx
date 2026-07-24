import React, { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';

const links = [
  ['Start', 'start-hero'],
  ['Ausbildung', 'ausbildung-overview'],
  ['Simulator', 'start-simulator'],
  ['Team', 'team-grid'],
  ['Standort', 'standort-detail'],
  ['FAQ', 'faq-page'],
  ['Anmeldung', 'contact-signup']
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const reduced = useReducedMotion();

  return (
    <header className="header">
      <div className="container header-inner">
        <a className="brand" href="#start-hero" onClick={() => setOpen(false)}>
          <span className="brand-mark">J</span>
          <span>Julians Fahrschule</span>
        </a>
        <nav className="desktop-nav" aria-label="Hauptnavigation">
          {links.map(([label, id]) => (
            <a key={id} className={id === 'contact-signup' ? 'nav-cta' : ''} href={`#${id}`}>{label}</a>
          ))}
        </nav>
        <button className="menu-button" type="button" aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen(!open)}>
          <span className="sr-only">Menü öffnen</span>
          <i className={`bi ${open ? 'bi-x-lg' : 'bi-list'}`} aria-hidden="true" />
        </button>
      </div>
      <AnimatePresence initial={false}>
        {open ? (
          <motion.nav
            id="mobile-navigation"
            className="mobile-nav"
            aria-label="Mobile Navigation"
            initial={{ opacity: 0, height: reduced ? 'auto' : 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: reduced ? 'auto' : 0 }}
            transition={{ duration: reduced ? 0.2 : 0.28, ease: 'easeOut' }}
          >
            {links.map(([label, id]) => (
              <a key={id} href={`#${id}`} onClick={() => setOpen(false)}>{label}</a>
            ))}
          </motion.nav>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
