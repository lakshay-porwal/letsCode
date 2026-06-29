import React, { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';

export default function SectionDivider() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const prefersReducedMotion = useReducedMotion();

  return (
    <div 
      ref={ref} 
      className="w-full max-w-[1280px] mx-auto px-6 md:px-10 lg:px-16 h-[1px] relative overflow-hidden"
    >
      {/* Background track line */}
      <div className="w-full h-full bg-white/5 relative">
        {/* Sweeping gradient divider */}
        {!prefersReducedMotion && (
          <motion.div
            initial={{ left: "-30%" }}
            animate={isInView ? { left: "130%" } : { left: "-30%" }}
            transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
            className="absolute top-0 bottom-0 w-[30%] bg-gradient-to-r from-transparent via-accentIndigo/40 to-transparent"
          />
        )}
      </div>
    </div>
  );
}
