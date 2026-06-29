import React, { useRef } from 'react';
import { motion, useInView, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { Check, Search, ArrowRight, Sparkles, Briefcase } from 'lucide-react';
import { Button } from './Primitives';

// --- CUSTOM SVG CIRCULAR PROGRESS LOADER ---
const CircularProgress = ({ percentage, colorClass }) => {
  const prefersReducedMotion = useReducedMotion();
  const radius = 16;
  const circumference = 2 * Math.PI * radius; // ~100.5
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  // Extract color name class for border/stroke
  const strokeColor = colorClass.includes('text-[#34D399]') 
    ? '#34D399' 
    : colorClass.includes('text-accentIndigo') 
      ? '#6366F1' 
      : '#F59E0B'; // Amber-500 fallback

  return (
    <div className="relative w-12 h-12 flex items-center justify-center shrink-0">
      <svg className="w-12 h-12 transform -rotate-90">
        {/* Track circle */}
        <circle
          cx="24"
          cy="24"
          r={radius}
          stroke="rgba(255, 255, 255, 0.05)"
          strokeWidth="3.5"
          fill="transparent"
        />
        {/* Animated fill circle */}
        <motion.circle
          cx="24"
          cy="24"
          r={radius}
          stroke={strokeColor}
          strokeWidth="3.5"
          fill="transparent"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: prefersReducedMotion ? strokeDashoffset : circumference }}
          whileInView={{ strokeDashoffset: strokeDashoffset }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
        />
      </svg>
      <span className="absolute text-[10px] font-extrabold text-textPrimary tracking-tighter">
        {percentage}%
      </span>
    </div>
  );
};

const jobCardsData = [
  {
    role: 'Software Engineer',
    company: 'Razorpay',
    location: 'Bangalore',
    score: 92,
    band: 'Excellent Match',
    colorClass: 'text-[#34D399] bg-[#34D399]/10 border-[#34D399]/20',
    logoInitials: 'RP',
    logoBg: 'bg-blue-600',
    delay: 0.1
  },
  {
    role: 'Frontend Developer',
    company: 'Zepto',
    location: 'Mumbai',
    score: 78,
    band: 'Strong Match',
    colorClass: 'text-accentIndigo bg-accentIndigo/10 border-accentIndigo/20',
    logoInitials: 'ZP',
    logoBg: 'bg-purple-600',
    delay: 0.2
  },
  {
    role: 'Full Stack Engineer',
    company: 'Groww',
    location: 'Remote',
    score: 65,
    band: 'Good Match',
    colorClass: 'text-amber-400 bg-amber-400/10 border-amber-400/20',
    logoInitials: 'GW',
    logoBg: 'bg-emerald-600',
    delay: 0.3
  }
];

export default function JobFinder() {
  const previewRef = useRef(null);
  const isInView = useInView(previewRef, { once: true, margin: "-100px" });
  const prefersReducedMotion = useReducedMotion();

  // Apple-style scroll-driven reveal choreography
  const { scrollYProgress } = useScroll({
    target: previewRef,
    offset: ["start end", "center center"]
  });

  const scale = useTransform(scrollYProgress, [0, 0.85], [0.93, 1]);
  const blurVal = useTransform(scrollYProgress, [0, 0.85], ["blur(6px)", "blur(0px)"]);
  const opacityVal = useTransform(scrollYProgress, [0, 0.85], [0.5, 1]);

  const benefitsList = [
    'Live Indian & global job listings in real-time',
    'AI match score 0-100% for every job',
    'Skill gaps highlighted instantly',
    'Filter by location, remote, or top matches'
  ];

  return (
    <section id="jobs" className="relative max-w-[1280px] mx-auto px-6 md:px-10 lg:px-16 py-16 md:py-20 lg:py-28 z-10 border-t border-white/5">
      
      {/* Ambient gradient backplate */}
      <div className="absolute left-[5%] top-[20%] w-[400px] h-[400px] rounded-full bg-purple-500/5 blur-[120px] pointer-events-none -z-10" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        
        {/* Left Column: Info */}
        <div className="lg:col-span-5 order-2 lg:order-1 flex flex-col items-start text-left">
          <span className="text-[13px] font-semibold uppercase tracking-wider text-accentIndigo mb-3 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4" />
            Free AI Job Finder
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accentEmerald opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accentEmerald"></span>
            </span>
          </span>
          <h2 className="text-2xl md:text-4xl font-bold tracking-tight text-gradient mb-6 leading-[1.15]">
            Upload Resume, Get Matched Jobs
          </h2>
          <p className="text-[15px] md:text-[16px] leading-relaxed text-textSecondary mb-8 max-w-[50ch]">
            LetsCode AI searches 5+ live job boards — including Adzuna India — scores every opening by fit, and shows you exactly where to apply.
          </p>

          <ul className="flex flex-col gap-3.5 mb-8 w-full">
            {benefitsList.map((benefit) => (
              <li key={benefit} className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-accentIndigo/10 flex items-center justify-center shrink-0 border border-accentIndigo/20">
                  <Check className="w-3.5 h-3.5 text-accentIndigo" />
                </div>
                <span className="text-sm font-medium text-textSecondary">
                  {benefit}
                </span>
              </li>
            ))}
          </ul>

          <Button variant="primary" href="#job-search" className="group gap-2 px-8 py-3.5">
            Find My Matching Jobs
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>

        {/* Right Column: App Preview Panel */}
        <div 
          ref={previewRef}
          className="lg:col-span-7 order-1 lg:order-2 flex items-center justify-center w-full"
        >
          <motion.div
            style={prefersReducedMotion ? {} : { 
              scale,
              filter: blurVal,
              opacity: opacityVal,
              perspective: '1000px', 
              transformStyle: 'preserve-3d' 
            }}
            className="w-full max-w-md glass-panel rounded-container bg-surfaceElevated/50 p-6 border border-white/10 shadow-resting"
          >
            {/* App Preview Header */}
            <div className="flex justify-between items-center mb-6 pb-4 border-b border-white/5">
              <div className="flex items-center gap-2">
                <Search className="w-4 h-4 text-textSecondary" />
                <span className="text-xs font-bold text-textSecondary tracking-wider uppercase">Live Job Matches</span>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-accentIndigo/10 text-accentIndigo border border-accentIndigo/20 font-bold uppercase tracking-wider">
                India Engine
              </span>
            </div>

            {/* List of matched jobs */}
            <div className="flex flex-col gap-4">
              {jobCardsData.map((job) => (
                <motion.div
                  key={job.company}
                  initial={{ opacity: 0, x: 20, rotateX: 0, z: 0 }}
                  animate={isInView ? { opacity: 1, x: 0, rotateX: prefersReducedMotion ? 0 : 5, z: -10 } : {}}
                  transition={{ delay: job.delay, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={prefersReducedMotion ? { x: 4 } : { 
                    x: 4, 
                    scale: 1.01,
                    rotateX: 0,
                    z: 10,
                    transition: { duration: 0.2 }
                  }}
                  className="p-4 rounded-card glass-panel bg-white/3 border border-white/8 hover:border-white/15 flex items-center justify-between shadow-sm cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    {/* Mock Company Logo */}
                    <div className={`w-10 h-10 rounded-lg ${job.logoBg} flex items-center justify-center text-textPrimary text-xs font-extrabold shadow-md`}>
                      {job.logoInitials}
                    </div>
                    {/* Job Details */}
                    <div className="flex flex-col text-left">
                      <span className="text-sm font-bold text-textPrimary leading-tight mb-0.5">{job.role}</span>
                      <div className="flex items-center gap-1.5 text-xs text-textSecondary">
                        <span className="font-semibold">{job.company}</span>
                        <span className="text-textMuted">•</span>
                        <span className="flex items-center gap-0.5 text-textMuted">
                          <Briefcase className="w-3 h-3" />
                          {job.location}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* SVG Circular Progress Match indicator */}
                  <div className="flex items-center gap-3">
                    <span className={`hidden sm:inline-block px-2 py-0.5 rounded-full border text-[9px] font-bold uppercase tracking-wide ${job.colorClass}`}>
                      {job.band}
                    </span>
                    <CircularProgress percentage={job.score} colorClass={job.colorClass} />
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Panel footer */}
            <div className="mt-6 text-center">
              <span className="text-xs font-semibold text-textMuted tracking-wide flex items-center justify-center gap-1.5">
                <span className="flex h-1.5 w-1.5 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accentEmerald opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-accentEmerald"></span>
                </span>
                +50 more matching roles live on board
              </span>
            </div>
          </motion.div>
        </div>

      </div>

    </section>
  );
}
