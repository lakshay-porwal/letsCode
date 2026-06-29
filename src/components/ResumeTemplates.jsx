import React, { useRef } from 'react';
import { motion, useInView, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { Check, FileText, ArrowRight } from 'lucide-react';
import { Button } from './Primitives';

const templateCards = [
  { name: 'Sigma', type: 'Tech & Startup', rotation: -12, rotateY: -20, zVal: -50, offset: -90, scale: 0.9 },
  { name: 'Harvard', type: 'Classic Academic', rotation: -6, rotateY: -10, zVal: -25, offset: -45, scale: 0.95 },
  { name: 'Classic', type: 'Traditional Corp', rotation: 0, rotateY: 0, zVal: 15, offset: 0, scale: 1.05, isTop: true },
  { name: 'Executive', type: 'Leadership', rotation: 6, rotateY: 10, zVal: -25, offset: 45, scale: 0.95 },
  { name: 'Clean', type: 'Minimalist', rotation: 12, rotateY: 20, zVal: -50, offset: 90, scale: 0.9 }
];

export default function ResumeTemplates() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const prefersReducedMotion = useReducedMotion();

  // Apple-style scroll-driven reveal choreography
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "center center"]
  });

  const scale = useTransform(scrollYProgress, [0, 0.85], [0.93, 1]);
  const blurVal = useTransform(scrollYProgress, [0, 0.85], ["blur(6px)", "blur(0px)"]);
  const opacityVal = useTransform(scrollYProgress, [0, 0.85], [0.5, 1]);

  const bulletPoints = [
    'ATS-Optimised (95%+ Pass Rate)',
    'Real-time Live Preview & Editing',
    'High-Quality PDF & Word Downloads',
    '100% Free - No Paywalls or Watermarks'
  ];

  return (
    <section className="relative max-w-[1280px] mx-auto px-6 md:px-10 lg:px-16 py-16 md:py-20 lg:py-28 z-10 border-t border-white/5">
      
      {/* Background Glow */}
      <div className="absolute right-[10%] top-[40%] w-[350px] h-[350px] rounded-full bg-accentIndigo/5 blur-[100px] pointer-events-none -z-10" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        
        {/* Left Side: Info */}
        <div className="lg:col-span-5 flex flex-col items-start text-left">
          <span className="text-[13px] font-semibold uppercase tracking-wider text-accentIndigo mb-3 block">
            Resume Studio
          </span>
          <h2 className="text-2xl md:text-4xl font-bold tracking-tight text-gradient mb-6 leading-[1.15]">
            Build an ATS-Ready Resume in Minutes
          </h2>
          <p className="text-[15px] md:text-[16px] leading-relaxed text-textSecondary mb-8 max-w-[50ch]">
            Let's Code ATS Resume Studio offers 6 proven layout models optimized for recruiter applicant tracking engines. Generate yours instantly.
          </p>

          {/* Bullet points */}
          <ul className="flex flex-col gap-3.5 mb-8 w-full">
            {bulletPoints.map((point) => (
              <li key={point} className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-accentIndigo/10 flex items-center justify-center shrink-0 border border-accentIndigo/20">
                  <Check className="w-3.5 h-3.5 text-accentIndigo" />
                </div>
                <span className="text-sm font-medium text-textSecondary">
                  {point}
                </span>
              </li>
            ))}
          </ul>

          <Button variant="primary" href="#resume-builder" className="group gap-2 px-8 py-3.5">
            Browse Templates
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>

        {/* Right Side: Overlapping/Fanned Cards (With 3D Perspective Setup) */}
        <motion.div 
          ref={containerRef}
          style={prefersReducedMotion ? {} : { 
            scale,
            filter: blurVal,
            opacity: opacityVal,
            perspective: '1200px', 
            transformStyle: 'preserve-3d' 
          }}
          className="lg:col-span-7 h-[360px] md:h-[420px] flex items-center justify-center relative w-full select-none"
        >
          {templateCards.map((card, idx) => (
            <motion.div
              key={card.name}
              initial={{ rotate: 0, rotateY: 0, rotateX: 0, x: 0, z: 0, opacity: 0 }}
              animate={isInView 
                ? { 
                    rotate: card.rotation, 
                    rotateY: prefersReducedMotion ? 0 : card.rotateY, 
                    rotateX: prefersReducedMotion ? 0 : 6, 
                    x: card.offset, 
                    z: prefersReducedMotion ? 0 : card.zVal,
                    opacity: 1, 
                    scale: card.scale 
                  } 
                : { rotate: 0, rotateY: 0, rotateX: 0, x: 0, z: 0, opacity: 0 }
              }
              whileHover={prefersReducedMotion ? {} : { 
                scale: 1.1, 
                rotate: 0, 
                rotateY: 0,
                rotateX: 0,
                z: 100, // Pop Z far forward
                y: -15,
                transition: { duration: 0.25, ease: 'easeOut' }
              }}
              transition={{ 
                delay: idx * 0.08, 
                duration: 0.7, 
                ease: [0.16, 1, 0.3, 1] 
              }}
              className={`absolute w-[170px] sm:w-[190px] h-[240px] sm:h-[270px] rounded-lg glass-panel bg-surfaceElevated border border-white/10 p-4 flex flex-col justify-between shadow-resting hover:border-accentIndigo/50 hover:shadow-[0_20px_50px_rgba(99,102,241,0.25)] ${
                card.isTop ? 'z-30' : `z-${20 - Math.abs(idx - 2)}`
              }`}
            >
              {/* Dummy Resume UI Details */}
              <div className="flex flex-col gap-2.5">
                {/* Header */}
                <div className="flex justify-between items-start">
                  <div className="flex flex-col gap-1">
                    <span className="text-[12px] font-bold text-textPrimary tracking-tight">{card.name}</span>
                    <span className="text-[9px] text-textMuted font-semibold">{card.type}</span>
                  </div>
                  <FileText className="w-3.5 h-3.5 text-accentIndigo opacity-70" />
                </div>

                {/* Lines representation */}
                <div className="flex flex-col gap-1.5 mt-2">
                  <div className="h-1.5 w-full bg-white/10 rounded-full" />
                  <div className="h-1.5 w-[85%] bg-white/10 rounded-full" />
                  <div className="h-1.5 w-[90%] bg-white/10 rounded-full" />
                </div>

                <div className="flex flex-col gap-1.5 mt-2">
                  <div className="h-1.5 w-[75%] bg-white/5 rounded-full" />
                  <div className="h-1.5 w-[60%] bg-white/5 rounded-full" />
                </div>
              </div>

              {/* Template Footer */}
              <div className="flex justify-between items-center border-t border-white/5 pt-2">
                <span className="text-[9px] text-accentEmerald font-bold tracking-wider uppercase">ATS Ready</span>
                <span className="text-[9px] text-textMuted font-semibold">Free PDF</span>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>

    </section>
  );
}
