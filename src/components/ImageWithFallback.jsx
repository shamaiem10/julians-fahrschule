import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

export default function ImageWithFallback({ src, alt, className = '', reveal = 'up', hover = true }) {
  const [failed, setFailed] = useState(false);
  const reduced = useReducedMotion();
  const initial = reduced
    ? { opacity: 0 }
    : reveal === 'left'
      ? { opacity: 0, x: -46, scale: 0.97, clipPath: 'inset(0 100% 0 0 round 22px)' }
      : { opacity: 0, y: 24, scale: 1.05, clipPath: 'inset(8% 8% 8% 8% round 22px)' };

  return (
    <motion.figure
      className={`image-frame interactive ${className} ${failed ? 'image-failed' : ''}`}
      initial={initial}
      whileInView={reduced ? { opacity: 1 } : { opacity: 1, x: 0, y: 0, scale: 1, clipPath: 'inset(0% 0% 0% 0% round 22px)' }}
      viewport={{ once: true, amount: 0.22, margin: '0px 0px -8% 0px' }}
      transition={{ duration: reduced ? 0.2 : 0.82, ease: reduced ? 'linear' : [0.16, 1, 0.3, 1] }}
      whileHover={reduced || !hover ? {} : {
        y: -6,
        scale: 1.012,
        borderColor: 'rgba(224,38,38,0.52)',
        boxShadow: '0 22px 50px rgba(224,38,38,0.22)'
      }}
    >
      <div className="image-fallback" aria-hidden={!failed}>
        <i className="bi bi-speedometer" aria-hidden="true" />
        <span>Julians Fahrschule</span>
      </div>
      <motion.img
        src={src}
        alt={alt}
        onError={(event) => {
          event.currentTarget.style.display = 'none';
          setFailed(true);
        }}
        whileHover={reduced || !hover ? {} : { scale: 1.06, filter: 'saturate(1.08) brightness(1.02)' }}
        transition={{ duration: reduced ? 0.15 : 0.52, ease: reduced ? 'linear' : [0.16, 1, 0.3, 1] }}
      />
      <span className="image-overlay" aria-hidden="true" />
    </motion.figure>
  );
}
