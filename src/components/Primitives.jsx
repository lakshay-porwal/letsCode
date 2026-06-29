import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView, animate } from 'framer-motion';

// --- GLASSCARD PRIMITIVE ---
export const GlassCard = ({ 
  children, 
  className = "", 
  hoverGlow = true,
  onClick,
  ...props 
}) => {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!hoverGlow || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    cardRef.current.style.setProperty('--x', `${x}px`);
    cardRef.current.style.setProperty('--y', `${y}px`);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onClick={onClick}
      className={`glass-card group p-6 md:p-8 ${onClick ? 'cursor-pointer' : ''} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

// --- BUTTON PRIMITIVE ---
export const Button = ({ 
  children, 
  variant = 'primary', // 'primary' | 'secondary' | 'ghost'
  className = "", 
  disabled = false,
  href,
  ...props 
}) => {
  const baseStyle = "relative inline-flex items-center justify-center font-medium rounded-btn px-6 py-3 text-sm transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accentIndigo focus-visible:ring-offset-2 focus-visible:ring-offset-bgBase active:scale-97 select-none";
  
  const variants = {
    primary: "bg-accentIndigo text-textPrimary hover:bg-accentIndigo-hover hover:shadow-[0_0_20px_rgba(99,102,241,0.3)] text-shadow-sm font-semibold",
    secondary: "glass-panel bg-white/5 text-textPrimary hover:bg-white/10 hover:border-white/20 border-white/10",
    ghost: "text-textSecondary hover:text-textPrimary hover:bg-white/5"
  };

  const combinedClass = `${baseStyle} ${variants[variant]} ${disabled ? 'opacity-50 pointer-events-none' : ''} ${className}`;

  if (href) {
    return (
      <a href={href} className={combinedClass} {...props}>
        {children}
      </a>
    );
  }

  return (
    <button className={combinedClass} disabled={disabled} {...props}>
      {children}
    </button>
  );
};

// --- SECTION HEADING PRIMITIVE ---
export const SectionHeading = ({ 
  eyebrow, 
  title, 
  description, 
  centered = true,
  className = "" 
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={containerVariants}
      className={`mb-12 md:mb-15 ${centered ? 'text-center flex flex-col items-center' : 'text-left'} ${className}`}
    >
      {eyebrow && (
        <span className="text-[13px] font-semibold uppercase tracking-wider text-accentIndigo mb-3 block">
          {eyebrow}
        </span>
      )}
      <h2 className="text-2xl md:text-4xl font-bold tracking-tight text-gradient mb-4 max-w-3xl leading-[1.15]">
        {title}
      </h2>
      {description && (
        <p className="text-[16px] md:text-[17px] leading-relaxed text-textSecondary max-w-[65ch]">
          {description}
        </p>
      )}
    </motion.div>
  );
};

// --- ANIMATED COUNTER ---
export const AnimatedCounter = ({ value, suffix = "" }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [displayValue, setDisplayValue] = useState(0);

  // Extract digits from e.g. "1,00,000+" -> 100000
  const cleanValue = value.replace(/[^\d]/g, '');
  const numericValue = parseInt(cleanValue, 10) || 0;

  useEffect(() => {
    if (isInView) {
      const controls = animate(0, numericValue, {
        duration: 1.5,
        ease: [0.16, 1, 0.3, 1], // easeOutExpo
        onUpdate: (latest) => {
          setDisplayValue(Math.floor(latest));
        },
      });
      return () => controls.stop();
    }
  }, [isInView, numericValue]);

  const formatNumber = (num) => {
    if (value.includes(',00,')) {
      // Indian system formatting e.g. 1,00,000
      const str = num.toString();
      if (str.length <= 3) return str;
      const lastThree = str.substring(str.length - 3);
      const otherParts = str.substring(0, str.length - 3);
      const formatted = otherParts.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + "," + lastThree;
      return formatted;
    } else {
      // Western formatting e.g. 100,000
      return num.toLocaleString('en-US');
    }
  };

  return (
    <span ref={ref} className="font-extrabold tabular-nums">
      {formatNumber(displayValue)}
      {suffix || (value.includes('+') ? '+' : '')}
    </span>
  );
};

// --- INTERSTITIAL (PALATE CLEANSER) ---
export const Interstitial = ({ text, subtext }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div 
      ref={ref}
      className="py-24 md:py-32 flex flex-col items-center justify-center text-center max-w-[1280px] mx-auto px-6 select-none"
    >
      <motion.div
        initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
        animate={isInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-4xl"
      >
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gradient tracking-tight leading-tight">
          {text}
        </h2>
        {subtext && (
          <p className="mt-4 text-sm md:text-base text-textSecondary max-w-[50ch] mx-auto">
            {subtext}
          </p>
        )}
      </motion.div>
    </div>
  );
};
