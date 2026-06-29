import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { 
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { GlassCard, Button, SectionHeading } from './Primitives';

// --- CUSTOM ANIMATED MICRO-ICONS ---
const AnimatedIcon = ({ type }) => {
  const mainColor = "#6366F1"; // Accent Indigo
  const secColor = "#A78BFA";  // Muted Violet
  const emeraldColor = "#34D399"; // Accent Emerald

  // 1. Job Ready Score - Clipboard with target marker
  if (type === 'job-ready') {
    return (
      <svg className="w-7 h-7" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="8" y="6" width="16" height="20" rx="3" stroke={mainColor} strokeWidth="1.5" />
        <path d="M12 5C12 3.89543 12.8954 3 14 3H18C19.1046 3 20 3.89543 20 5V6H12V5Z" fill={secColor} />
        <circle cx="13" cy="13" r="1.5" fill={secColor} />
        <circle cx="13" cy="18" r="1.5" fill={secColor} />
        <line x1="17" y1="13" x2="21" y2="13" stroke={mainColor} strokeWidth="1.5" strokeLinecap="round" />
        <line x1="17" y1="18" x2="21" y2="18" stroke={mainColor} strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="23" cy="23" r="3" fill={emeraldColor} className="animate-pulse" />
      </svg>
    );
  }

  // 2. Mock Interview - computer box with speech circle
  if (type === 'mock-interview') {
    return (
      <svg className="w-7 h-7" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="4" y="6" width="24" height="18" rx="3" stroke={mainColor} strokeWidth="1.5" />
        <path d="M8 11H16" stroke={secColor} strokeWidth="1.5" strokeLinecap="round" />
        <path d="M8 15H14" stroke={secColor} strokeWidth="1.5" strokeLinecap="round" />
        <rect x="18" y="10" width="8" height="10" rx="1" fill={secColor} fillOpacity="0.25" stroke={secColor} strokeWidth="1" />
        <path d="M12 24V28M20 24V28M10 28H22" stroke={mainColor} strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    );
  }

  // 3. AI Resume Studio - Document with checker mark
  if (type === 'resume-studio') {
    return (
      <svg className="w-7 h-7" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="6" y="4" width="20" height="24" rx="2" stroke={mainColor} strokeWidth="1.5" />
        <line x1="10" y1="9" x2="16" y2="9" stroke={secColor} strokeWidth="1.5" strokeLinecap="round" />
        <line x1="10" y1="14" x2="22" y2="14" stroke={mainColor} strokeWidth="1.5" strokeLinecap="round" />
        <line x1="10" y1="19" x2="18" y2="19" stroke={mainColor} strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="23" cy="7" r="2" fill={secColor} className="animate-pulse" />
      </svg>
    );
  }

  // 4. LinkedIn Optimizer - Avatar and growth trend line
  if (type === 'linkedin-opt') {
    return (
      <svg className="w-7 h-7" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="16" cy="11" r="5" stroke={mainColor} strokeWidth="1.5" />
        <path d="M7 23C7 19.134 11.0294 16 16 16C20.9706 16 25 19.134 25 23" stroke={mainColor} strokeWidth="1.5" strokeLinecap="round" />
        <path d="M22 8L24 6L28 10" stroke={emeraldColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="28" cy="10" r="2.5" fill={emeraldColor} className="animate-pulse" />
      </svg>
    );
  }

  // 5. AI Job Finder - magnifying glass over document
  if (type === 'job-finder') {
    return (
      <svg className="w-7 h-7" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M20 4H8C6.89543 4 6 4.89543 6 6V26C6 27.1046 6.89543 28 8 28H24C25.1046 28 26 27.1046 26 26V10L20 4Z" stroke={mainColor} strokeWidth="1.5" />
        <path d="M20 4V10H26" stroke={mainColor} strokeWidth="1.5" />
        <circle cx="15" cy="18" r="4.5" stroke={secColor} strokeWidth="1.5" />
        <line x1="18.5" y1="21.5" x2="22" y2="25" stroke={secColor} strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    );
  }

  // 6. Cover Letter AI - Envelope with custom lines
  if (type === 'cover-letter') {
    return (
      <svg className="w-7 h-7" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6 14L16 21L26 14" stroke={mainColor} strokeWidth="1.5" strokeLinecap="round" />
        <rect x="4" y="9" width="24" height="17" rx="2" stroke={mainColor} strokeWidth="1.5" />
        <path d="M9 9V6C9 4.89543 9.89543 4 11 4H21C22.1046 4 23 4.89543 23 6V9" stroke={secColor} strokeWidth="1.5" />
      </svg>
    );
  }

  // 7. Job Tracker - simple Kanban board columns
  if (type === 'job-tracker') {
    return (
      <svg className="w-7 h-7" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="4" y="6" width="6" height="12" rx="1.5" fill={mainColor} fillOpacity="0.25" stroke={mainColor} strokeWidth="1.5" />
        <rect x="13" y="6" width="6" height="20" rx="1.5" stroke={mainColor} strokeWidth="1.5" />
        <rect x="22" y="6" width="6" height="15" rx="1.5" fill={secColor} fillOpacity="0.35" stroke={secColor} strokeWidth="1.5" />
        <line x1="16" y1="10" x2="16" y2="22" stroke={secColor} strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    );
  }

  // 8. GitHub Optimizer - repository tree nodes
  if (type === 'github-opt') {
    return (
      <svg className="w-7 h-7" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="10" cy="10" r="3" stroke={mainColor} strokeWidth="1.5" />
        <circle cx="10" cy="22" r="3" stroke={mainColor} strokeWidth="1.5" />
        <circle cx="22" cy="16" r="3" stroke={secColor} strokeWidth="1.5" fill={secColor} fillOpacity="0.25" />
        <path d="M10 13V19" stroke={mainColor} strokeWidth="1.5" />
        <path d="M13 10H16C17.1046 10 18 10.8954 18 12V16H19" stroke={secColor} strokeWidth="1.5" />
      </svg>
    );
  }

  return null;
};

const toolsData = [
  {
    id: 'job-ready',
    title: 'Job Ready Score',
    description: 'Get a 100-point audit on your Resume, LinkedIn, and GitHub profiles, plus a tailored 90-day action plan to fix critical gaps.',
    detail: '🔍 Complete mapping of action items, keyword frequency, and recruiter search appearances.',
    metric: '100-Point Audit Engine',
    tag: 'Most Popular',
    iconType: 'job-ready',
    action: 'Check My Score →',
    isHero: true,
    completed: true
  },
  {
    id: 'mock-interview',
    title: 'Mock Interview',
    description: 'Experience interactive AI-powered technical MCQs across 35+ placement topics with real-time feedback.',
    detail: '🧠 Adaptive testing tracks speed, accuracy, and maps conceptual clarity graphs.',
    metric: '35+ Tech Topics Live',
    tag: 'AI Powered',
    iconType: 'mock-interview',
    action: 'Start Interview →'
  },
  {
    id: 'resume-studio',
    title: 'AI Resume Studio',
    description: 'Build templates passing ATS audits at 95% pass rate. Inline AI editing with clean PDF and DOCX downloads.',
    detail: '📄 Dynamic format rendering that adjusts line height and spacing rules dynamically.',
    metric: '95% ATS Pass Rate',
    tag: 'Free Templates',
    iconType: 'resume-studio',
    action: 'Build Resume →',
    completed: true
  },
  {
    id: 'linkedin-opt',
    title: 'LinkedIn Optimizer',
    description: 'Transform your headline, summary, and experience blocks to rank higher in recruiter searches and profile visits.',
    detail: '📈 Highlights key skills and keywords aligned with current high-volume tech hiring roles.',
    metric: '3.5x Profile Views',
    tag: 'AI Powered',
    iconType: 'linkedin-opt',
    action: 'Optimize Profile →'
  },
  {
    id: 'job-finder',
    title: 'AI Job Finder',
    description: 'Paste your resume to search live job boards like Adzuna India. Get 0-100% fit scoring and direct apply links.',
    detail: '💼 Real-time database tracking remote, unicorn, and major product-based listings.',
    metric: '0-100% Fit Scoring',
    tag: 'New Tool',
    iconType: 'job-finder',
    action: 'Match Openings →'
  },
  {
    id: 'cover-letter',
    title: 'Cover Letter AI',
    description: 'Generate high-impact cover letters containing 8-10 customized ATS keywords matching your resume and target JD.',
    detail: '✉️ Instantly adapts tone from startup casual to corporate formal depending on JD styling.',
    metric: '8-10 ATS Keywords',
    tag: 'Free Tool',
    iconType: 'cover-letter',
    action: 'Create Cover Letter →'
  },
  {
    id: 'job-tracker',
    title: 'Job Tracker',
    description: 'Organize your applications with visual Kanban and list views, preloaded with key coding test preparation guides.',
    detail: '📅 Tracks interview rounds, checklist milestones, and direct application dates.',
    metric: 'Kanban + Prep Links',
    tag: 'Free Tool',
    iconType: 'job-tracker',
    action: 'Track Jobs →'
  },
  {
    id: 'github-opt',
    title: 'GitHub Optimizer',
    description: 'Evaluate your GitHub profile score out of 100 with recommendations for your README, repositories, and pinned projects.',
    detail: '🐙 Reviews commits, profile bios, and templates repository structures for cleaner code views.',
    metric: '100pt Portfolio Audit',
    tag: 'AI Powered',
    iconType: 'github-opt',
    action: 'Optimize GitHub →'
  }
];

export default function ToolsGrid() {
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const checkTouch = () => {
      setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
    };
    checkTouch();
  }, []);

  const handleSpotlightMove = (e) => {
    if (isTouchDevice || !sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    sectionRef.current.style.setProperty('--spotlight-x', `${x}px`);
    sectionRef.current.style.setProperty('--spotlight-y', `${y}px`);
    sectionRef.current.style.setProperty('--spotlight-opacity', '1');
  };

  const handleSpotlightLeave = () => {
    if (isTouchDevice || !sectionRef.current) return;
    sectionRef.current.style.setProperty('--spotlight-opacity', '0');
  };

  const gridVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <section 
      ref={sectionRef}
      onMouseMove={handleSpotlightMove}
      onMouseLeave={handleSpotlightLeave}
      id="tools" 
      className="relative max-w-[1280px] mx-auto px-6 md:px-10 lg:px-16 py-16 md:py-20 lg:py-28 z-10 border-t border-white/5"
    >
      {/* Background Interactive Spotlight */}
      {!isTouchDevice && !prefersReducedMotion && (
        <div 
          style={{
            left: 0,
            top: 0,
            width: '100%',
            height: '100%',
            opacity: 'var(--spotlight-opacity, 0)',
            background: `radial-gradient(220px circle at var(--spotlight-x, 0px) var(--spotlight-y, 0px), rgba(99, 102, 241, 0.1), transparent 80%)`,
            transition: 'opacity 0.3s ease'
          }}
          className="absolute inset-0 pointer-events-none z-0"
        />
      )}

      <SectionHeading 
        eyebrow="AI Placement Suite"
        title="8 Free AI Career Tools"
        description="Every tool you need to audit your profiles, practice mock coding tests, build ATS-proof resumes, and discover high-fit job opportunities — all built-in and free."
      />

      <motion.div 
        ref={containerRef}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={gridVariants}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 items-stretch"
      >
        {toolsData.map((tool) => {
          return (
            <motion.div 
              key={tool.id} 
              variants={cardVariants}
              className={`${tool.isHero ? 'lg:col-span-2' : 'col-span-1'} flex`}
            >
              <GlassCard className="flex flex-col justify-between w-full h-full min-h-[340px] relative overflow-hidden group">
                
                {/* Visual Glass Shimmer Sweep Line */}
                <div className="shimmer-sweep" />

                <div>
                  {/* Top line with Icon and Tag */}
                  <div className="flex justify-between items-start mb-6">
                    <div className="flex items-center gap-2">
                      <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-108 transition-transform duration-200">
                        <AnimatedIcon type={tool.iconType} />
                      </div>
                      {tool.completed && (
                        <div className="flex items-center gap-1.5 bg-[#34D399]/15 text-[#34D399] border border-[#34D399]/20 px-2 py-0.5 rounded-full text-[10px] font-bold select-none font-mono">
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                          READY
                        </div>
                      )}
                    </div>
                    <span className={`px-2.5 py-1 text-[11px] font-semibold tracking-wider uppercase rounded-full border ${
                      tool.tag === 'Most Popular' || tool.tag === 'New Tool'
                        ? 'bg-accentIndigo/10 text-accentIndigo border-accentIndigo/20' 
                        : 'bg-white/5 text-textSecondary border-white/10'
                    }`}>
                      {tool.tag}
                    </span>
                  </div>

                  {/* Title and Description */}
                  <h3 className="text-[19px] font-bold text-textPrimary mb-2 leading-tight">
                    {tool.title}
                  </h3>
                  <p className="text-[14px] leading-relaxed text-textSecondary mb-2 max-w-[55ch]">
                    {tool.description}
                  </p>

                  {/* Layout-Stable Detail Reveal on hover */}
                  <div className="text-[12px] text-accentIndigo opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-200 font-semibold text-left">
                    ✨ {tool.detail}
                  </div>
                </div>

                {/* Bottom line with Metric and CTA link */}
                <div className="mt-auto pt-6">
                  <div className="text-[13px] font-semibold text-accentEmerald uppercase tracking-wider mb-4">
                    {tool.metric}
                  </div>
                  <div className="flex items-center gap-1.5 text-[14px] font-semibold text-textPrimary group-hover:text-accentIndigo-hover transition-colors">
                    {tool.action}
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Grid CTA below */}
      <div className="flex justify-center mt-12 md:mt-16">
        <Button variant="secondary" href="#tools-suite" className="group gap-2 px-8 py-3.5">
          <Sparkles className="w-4 h-4 text-accentIndigo" />
          Open Full AI Toolkit
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Button>
      </div>
    </section>
  );
}
