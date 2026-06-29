import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion';

export default function CustomCursor() {
  const [isHovered, setIsHovered] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Springs for the inner dot
  const dotX = useSpring(mouseX, { damping: 30, stiffness: 350, mass: 0.4 });
  const dotY = useSpring(mouseY, { damping: 30, stiffness: 350, mass: 0.4 });

  // Springs for the outer ring (slower, higher lag)
  const ringX = useSpring(mouseX, { damping: 40, stiffness: 180, mass: 0.8 });
  const ringY = useSpring(mouseY, { damping: 40, stiffness: 180, mass: 0.8 });

  useEffect(() => {
    const detectTouch = () => {
      setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
    };
    detectTouch();

    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      const isClickable = 
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.closest('button') || 
        target.closest('a') || 
        target.closest('.glass-card') || 
        target.closest('input') || 
        target.closest('textarea') || 
        target.getAttribute('onclick') !== null ||
        target.classList.contains('cursor-pointer');

      setIsHovered(!!isClickable);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [mouseX, mouseY, isVisible]);

  // Disable cursor adjustments on touch screens or if user prefers reduced motion
  if (isTouchDevice || prefersReducedMotion || !isVisible) {
    return null;
  }

  return (
    <div className="fixed inset-0 pointer-events-none z-[99999]">
      {/* Inner Dot */}
      <motion.div
        style={{
          x: dotX,
          y: dotY,
          translateX: '-50%',
          translateY: '-50%'
        }}
        className="w-1.5 h-1.5 rounded-full bg-accentIndigo fixed top-0 left-0 shadow-[0_0_8px_rgba(99,102,241,0.6)]"
      />

      {/* Outer Glow Ring */}
      <motion.div
        animate={{
          width: isHovered ? 56 : 32,
          height: isHovered ? 56 : 32,
          borderColor: isHovered ? 'rgba(99, 102, 241, 0.6)' : 'rgba(255, 255, 255, 0.2)',
          backgroundColor: isHovered ? 'rgba(99, 102, 241, 0.05)' : 'rgba(255, 255, 255, 0)',
        }}
        transition={{
          type: 'spring',
          stiffness: 400,
          damping: 28,
        }}
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%'
        }}
        className="rounded-full border fixed top-0 left-0 flex items-center justify-center"
      />
    </div>
  );
}
