import React, { useRef } from 'react';
import { motion, useInView, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { ArrowRight, Trophy, Flame } from 'lucide-react';
import { SectionHeading, Button } from './Primitives';

const companiesList = [
  { name: 'Google', difficulty: 'Hard', diffColor: 'text-[#EF4444] bg-[#EF4444]/10 border-[#EF4444]/20' },
  { name: 'Amazon', difficulty: 'Hard', diffColor: 'text-[#EF4444] bg-[#EF4444]/10 border-[#EF4444]/20' },
  { name: 'Microsoft', difficulty: 'Medium', diffColor: 'text-amber-400 bg-amber-400/10 border-amber-400/20' },
  { name: 'Goldman Sachs', difficulty: 'Hard', diffColor: 'text-[#EF4444] bg-[#EF4444]/10 border-[#EF4444]/20' },
  { name: 'TCS', difficulty: 'Easy', diffColor: 'text-[#34D399] bg-[#34D399]/10 border-[#34D399]/20' },
  { name: 'Infosys', difficulty: 'Easy', diffColor: 'text-[#34D399] bg-[#34D399]/10 border-[#34D399]/20' },
  { name: 'Wipro', difficulty: 'Easy', diffColor: 'text-[#34D399] bg-[#34D399]/10 border-[#34D399]/20' },
  { name: 'Deloitte', difficulty: 'Easy', diffColor: 'text-[#34D399] bg-[#34D399]/10 border-[#34D399]/20' },
  { name: 'JP Morgan', difficulty: 'Medium', diffColor: 'text-amber-400 bg-amber-400/10 border-amber-400/20' },
  { name: 'Flipkart', difficulty: 'Hard', diffColor: 'text-[#EF4444] bg-[#EF4444]/10 border-[#EF4444]/20' }
];

const leaderboardData = [
  { rank: 1, name: 'Siddharth S.', streak: 100, points: 2480, medal: 'bg-yellow-500/20 border-yellow-500/50 text-yellow-400 shadow-[0_0_8px_rgba(234,179,8,0.2)]' },
  { rank: 2, name: 'Aditya K.', streak: 98, points: 2350, medal: 'bg-slate-300/20 border-slate-300/50 text-slate-300 shadow-[0_0_8px_rgba(203,213,225,0.2)]' },
  { rank: 3, name: 'Nisha P.', streak: 95, points: 2180, medal: 'bg-amber-700/25 border-amber-700/50 text-amber-500 shadow-[0_0_8px_rgba(180,83,9,0.2)]' },
  { rank: 4, name: 'Yash M.', streak: 92, points: 1980, medal: 'bg-white/5 border-white/10 text-textSecondary' },
  { rank: 5, name: 'Sneha R.', streak: 90, points: 1850, medal: 'bg-white/5 border-white/10 text-textSecondary' }
];

export default function CompanyPrep() {
  const ref = useRef(null);
  const containerRef = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const prefersReducedMotion = useReducedMotion();

  // Scroll linked transforms for section entry/exit fades
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0.96, 1, 1, 0.96]);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.04
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.92, y: 10 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <section 
      ref={containerRef}
      id="pyqs" 
      className="relative max-w-[1280px] mx-auto px-6 md:px-10 lg:px-16 py-16 md:py-20 lg:py-28 z-10 border-t border-white/5"
    >
      <motion.div
        style={{ 
          opacity: prefersReducedMotion ? 1 : opacity, 
          scale: prefersReducedMotion ? 1 : scale 
        }}
        className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start"
      >
        
        {/* Left Column: Company Chips and text (7 cols) */}
        <div className="lg:col-span-7 flex flex-col items-start text-left">
          <SectionHeading
            eyebrow="Targeted Resources"
            title="Prepare for Any Company"
            description="Access company-specific prep guides, actual previous year questions (PYQs), structured hiring patterns, and real student interview feedback."
            centered={false}
            className="mb-8"
          />

          {/* Company Chips Container */}
          <motion.div
            ref={ref}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={containerVariants}
            className="flex flex-wrap gap-3.5 max-w-2xl mb-8 w-full"
          >
            {companiesList.map((company) => (
              <motion.div
                key={company.name}
                variants={itemVariants}
                whileHover={{ y: -3, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                className="px-4 py-2.5 rounded-full glass-panel bg-white/4 border border-white/10 hover:border-accentIndigo/30 hover:bg-white/7 shadow-resting cursor-pointer flex items-center gap-2.5 select-none group"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-accentIndigo group-hover:bg-accentIndigo-hover group-hover:scale-125 transition-all duration-200" />
                <span className="text-sm font-semibold tracking-wide text-textPrimary">
                  {company.name}
                </span>
                
                {/* NeetCode difficulty badge */}
                <span className={`px-2 py-0.5 rounded border text-[9px] font-bold font-mono uppercase ${company.diffColor}`}>
                  {company.difficulty}
                </span>
              </motion.div>
            ))}
          </motion.div>

          {/* View All Guides Link */}
          <a
            href="#company-guides"
            className="group inline-flex items-center gap-1.5 text-sm font-semibold text-textSecondary hover:text-accentIndigo-hover transition-colors"
          >
            View All 25+ Company Guides
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        {/* Right Column: 100 Days DSA Challenge Leaderboard Widget (5 cols) */}
        <div className="lg:col-span-5 w-full">
          <div className="glass-panel rounded-card bg-surfaceElevated/60 border border-white/10 p-6 md:p-8 flex flex-col justify-between shadow-raised relative overflow-hidden select-none">
            
            {/* Header */}
            <div className="flex justify-between items-start mb-6">
              <div>
                <span className="text-[10px] px-2 py-0.5 rounded bg-accentIndigo/10 text-accentIndigo border border-accentIndigo/20 font-bold uppercase tracking-wider font-mono">
                  Competitive Challenge
                </span>
                <h3 className="text-lg md:text-xl font-bold text-textPrimary mt-2 flex items-center gap-2">
                  <Flame className="w-5 h-5 text-amber-500 fill-amber-500 animate-pulse" />
                  100 Days DSA Challenge
                </h3>
              </div>
              <div className="flex h-6 w-6 rounded-full bg-white/5 border border-white/10 items-center justify-center">
                <Trophy className="w-3.5 h-3.5 text-yellow-500" />
              </div>
            </div>

            <p className="text-[13px] leading-relaxed text-textSecondary mb-6">
              Solve 1 daily curated coding problem, build consistency, and rank against 10,000+ active peers.
            </p>

            {/* Leaderboard Table widget */}
            <div className="flex flex-col gap-2.5 mb-8">
              {leaderboardData.map((user) => (
                <div 
                  key={user.rank}
                  className={`p-3 rounded-card border flex items-center justify-between ${user.medal} transition-all duration-200`}
                >
                  <div className="flex items-center gap-3">
                    {/* Rank Badge */}
                    <span className="font-mono text-xs font-bold w-4 text-center">
                      #{user.rank}
                    </span>
                    {/* User Name */}
                    <span className="text-xs font-bold text-textPrimary">
                      {user.name}
                    </span>
                  </div>

                  {/* Streak & Points */}
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-0.5 text-xs font-bold text-textSecondary">
                      🔥 <span className="font-mono">{user.streak}d</span>
                    </span>
                    <span className="font-mono text-xs font-bold text-accentIndigo">
                      {user.points} pts
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA action */}
            <Button variant="primary" className="w-full justify-center gap-2 font-semibold text-sm py-3.5">
              Start 100 Days DSA Challenge
              <ArrowRight className="w-4 h-4" />
            </Button>

            <span className="text-[10px] text-textMuted font-semibold text-center mt-3 block">
              ⚡ Join 12,408 coders currently active in this challenge
            </span>

          </div>
        </div>

      </motion.div>
    </section>
  );
}
