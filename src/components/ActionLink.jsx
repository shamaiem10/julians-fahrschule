import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

export default function ActionLink({ href, children, variant = 'primary', icon = 'bi-arrow-right', external = false }) {
  const [ripples, setRipples] = useState([]);
  const reduced = useReducedMotion();

  const createRipple = (event) => {
    if (reduced) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const ripple = {
      id: Date.now(),
      x: event.clientX - rect.left,
      y: event.clientY - rect.top
    };
    setRipples((current) => [...current, ripple]);
    window.setTimeout(() => setRipples((current) => current.filter((item) => item.id !== ripple.id)), 400);
  };

  return (
    <motion.a
      className={`button button-${variant} interactive`}
      href={href}
      onPointerDown={createRipple}
      target={external ? '_blank' : undefined}
      rel={external ? 'noreferrer' : undefined}
      whileHover={reduced ? {} : { y: -2, scale: 1.03, borderColor: 'rgba(224,38,38,0.90)', boxShadow: '0 14px 34px rgba(224,38,38,0.38)' }}
      whileTap={reduced ? {} : { scale: 0.97 }}
      transition={{ duration: reduced ? 0.15 : 0.24, ease: reduced ? 'linear' : [0.16, 1, 0.3, 1] }}
    >
      <span className="lane-divider" aria-hidden="true" />
      <span className="button-label">{children}</span>
      <i className={`bi ${icon}`} aria-hidden="true" />
      {ripples.map((ripple) => (
        <motion.span
          key={ripple.id}
          className="ripple"
          style={{ left: ripple.x, top: ripple.y }}
          initial={{ scale: 0, opacity: 0.42 }}
          animate={{ scale: 4, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        />
      ))}
    </motion.a>
  );
}
