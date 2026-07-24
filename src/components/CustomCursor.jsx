import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const reduced = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [active, setActive] = useState(false);
  const x = useMotionValue(-48);
  const y = useMotionValue(-48);
  const springX = useSpring(x, { stiffness: 420, damping: 34, mass: 0.45 });
  const springY = useSpring(y, { stiffness: 420, damping: 34, mass: 0.45 });

  useEffect(() => {
    if (reduced) return undefined;
    const query = window.matchMedia('(min-width: 992px) and (pointer: fine)');
    const update = () => setEnabled(query.matches);
    const move = (event) => {
      x.set(event.clientX - 12);
      y.set(event.clientY - 12);
      const target = event.target;
      setActive(Boolean(target && target.closest('a, button, input, textarea, .interactive')));
    };
    update();
    query.addEventListener('change', update);
    window.addEventListener('pointermove', move);
    return () => {
      query.removeEventListener('change', update);
      window.removeEventListener('pointermove', move);
    };
  }, [reduced, x, y]);

  if (!enabled || reduced) return null;

  return (
    <motion.div
      className="custom-cursor"
      aria-hidden="true"
      style={{ x: springX, y: springY }}
      animate={{
        scale: active ? 1.75 : 1,
        backgroundColor: active ? 'rgba(255,210,63,0.20)' : 'rgba(224,38,38,0.12)',
        borderColor: active ? 'rgba(224,38,38,0.65)' : 'rgba(224,38,38,0.30)',
        boxShadow: active ? '0 0 24px rgba(224,38,38,0.28)' : '0 0 18px rgba(224,38,38,0.18)'
      }}
      transition={{ duration: 0.18, ease: 'easeOut' }}
    />
  );
}
