import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion, useInView } from 'framer-motion';
import { SectionHeading } from './Primitives';

// --- CUSTOM 2-COLOR SVG ILLUSTRATIONS (Groww inspired) ---
const FoundationsIllustration = ({ mainColor, secColor }) => (
  <svg className="w-7 h-7" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="6" y="8" width="20" height="18" rx="2" stroke={mainColor} strokeWidth="1.5" />
    <path d="M10 13H22" stroke={secColor} strokeWidth="1.5" strokeLinecap="round" />
    <path d="M10 17H18" stroke={secColor} strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="21" cy="21" r="2.5" fill={secColor} fillOpacity="0.7" className="animate-pulse" />
  </svg>
);

const DsaIllustration = ({ mainColor, secColor }) => (
  <svg className="w-7 h-7" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="16" cy="6" r="3.5" stroke={mainColor} strokeWidth="1.5" />
    <circle cx="9" cy="18" r="3.5" stroke={secColor} strokeWidth="1.5" />
    <circle cx="23" cy="18" r="3.5" stroke={secColor} strokeWidth="1.5" fill={secColor} fillOpacity="0.25" />
    <path d="M14 9.5L11 14.5M18 9.5L21 14.5" stroke={mainColor} strokeWidth="1.5" strokeLinecap="round" />
    <path d="M9 21.5V25" stroke={secColor} strokeWidth="1.5" />
    <circle cx="9" cy="27" r="2" fill={secColor} />
  </svg>
);

const DevIllustration = ({ mainColor, secColor }) => (
  <svg className="w-7 h-7" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="4" y="6" width="24" height="18" rx="2" stroke={mainColor} strokeWidth="1.5" />
    <path d="M4 11H28" stroke={mainColor} strokeWidth="1.5" />
    <circle cx="8" cy="8.5" r="1.5" fill={secColor} />
    <circle cx="12" cy="8.5" r="1.5" fill={secColor} />
    <path d="M12 16L9 19L12 22" stroke={secColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M20 16L23 19L20 22" stroke={secColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const PrepIllustration = ({ mainColor, secColor }) => (
  <svg className="w-7 h-7" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="8" y="4" width="16" height="24" rx="2" stroke={mainColor} strokeWidth="1.5" />
    <path d="M12 10L14 12L20 6" stroke={secColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <line x1="12" y1="16" x2="20" y2="16" stroke={mainColor} strokeWidth="1.5" strokeLinecap="round" />
    <line x1="12" y1="21" x2="18" y2="21" stroke={mainColor} strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const HiredIllustration = ({ mainColor, secColor }) => (
  <svg className="w-7 h-7" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="6" y="10" width="20" height="16" rx="3" stroke={mainColor} strokeWidth="1.5" />
    <path d="M12 10V7C12 5.89543 12.8954 5 14 5H18C19.1046 5 20 5.89543 20 7V10" stroke={secColor} strokeWidth="1.5" />
    <circle cx="16" cy="18" r="3" stroke={secColor} strokeWidth="1.5" />
    <line x1="19" y1="21" x2="22" y2="24" stroke={secColor} strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const nodesData = [
  {
    id: 'n1',
    number: '01',
    title: 'Foundations',
    description: 'Language basics, OOPs, Git & CS fundamentals.',
    completed: true,
    progressText: 'Completed',
    illustration: FoundationsIllustration,
    x: '10%',
    y: '50%'
  },
  {
    id: 'n2a',
    number: '02A',
    title: 'DSA Practice',
    description: 'LeetCode, Arrays, Trees, Graphs, DP.',
    completed: true,
    progressText: 'Completed',
    illustration: DsaIllustration,
    x: '38%',
    y: '22%'
  },
  {
    id: 'n2b',
    number: '02B',
    title: 'Development Track',
    description: 'React, Node, DBs, and system architectures.',
    completed: false,
    progressText: 'In Progress',
    illustration: DevIllustration,
    x: '38%',
    y: '78%'
  },
  {
    id: 'n3',
    number: '03',
    title: 'Core placement prep',
    description: 'Mock interviews, Resume studio, System Design.',
    completed: false,
    progressText: 'Next Up',
    illustration: PrepIllustration,
    x: '66%',
    y: '50%'
  },
  {
    id: 'n4',
    number: '04',
    title: 'Get Hired',
    description: 'Unicorn job boards, startup referrals & matching.',
    completed: false,
    progressText: 'Placement',
    illustration: HiredIllustration,
    x: '90%',
    y: '50%'
  }
];

export default function Roadmap() {
  const containerRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const mainColor = "#6366F1";
  const secColor = "#A78BFA";

  // Scroll target setup to bind draw animation to scroll progress
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end center"]
  });

  const drawProgress = useTransform(scrollYProgress, [0.1, 0.75], [0, 1]);

  return (
    <section id="learn" className="relative max-w-[1280px] mx-auto px-6 md:px-10 lg:px-16 py-16 md:py-20 lg:py-28 z-10 border-t border-white/5">
      
      <SectionHeading
        eyebrow="Placement Path"
        title="From Student to Employed"
        description="A branching, node-based career roadmap packed with free learning resources, practice modules, profile optimizations, and direct recruiter connections."
      />

      {/* Timeline Container */}
      <div ref={containerRef} className="relative mt-16 md:mt-24 w-full">
        
        {/* DESKTOP TIMELINE (Branching Node Graph) */}
        <div className="hidden lg:block relative w-full h-[480px] select-none">
          
          {/* SVG Connection Lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" xmlns="http://www.w3.org/2000/svg">
            {/* Background static connecting lines */}
            {/* Node 1 to Node 2A */}
            <path d="M 128 240 L 250 240 C 290 240 290 105 340 105 L 430 105" stroke="rgba(255,255,255,0.06)" strokeWidth="3" fill="none" />
            {/* Node 1 to Node 2B */}
            <path d="M 128 240 L 250 240 C 290 240 290 375 340 375 L 430 375" stroke="rgba(255,255,255,0.06)" strokeWidth="3" fill="none" />
            {/* Node 2A to Node 3 */}
            <path d="M 470 105 L 560 105 C 610 105 610 240 660 240 L 780 240" stroke="rgba(255,255,255,0.06)" strokeWidth="3" fill="none" />
            {/* Node 2B to Node 3 */}
            <path d="M 470 375 L 560 375 C 610 375 610 240 660 240 L 780 240" stroke="rgba(255,255,255,0.06)" strokeWidth="3" fill="none" />
            {/* Node 3 to Node 4 */}
            <path d="M 830 240 L 1100 240" stroke="rgba(255,255,255,0.06)" strokeWidth="3" fill="none" />

            {/* Animated glowing path indicators linked to scroll */}
            {!prefersReducedMotion && (
              <>
                <motion.path
                  d="M 128 240 L 250 240 C 290 240 290 105 340 105 L 430 105"
                  stroke={mainColor}
                  strokeWidth="3"
                  fill="none"
                  strokeDasharray="400"
                  style={{
                    pathLength: drawProgress,
                    filter: "drop-shadow(0 0 4px rgba(99,102,241,0.6))"
                  }}
                />
                <motion.path
                  d="M 128 240 L 250 240 C 290 240 290 375 340 375 L 430 375"
                  stroke={mainColor}
                  strokeWidth="3"
                  fill="none"
                  strokeDasharray="400"
                  style={{
                    pathLength: drawProgress,
                    filter: "drop-shadow(0 0 4px rgba(99,102,241,0.6))"
                  }}
                />
                <motion.path
                  d="M 470 105 L 560 105 C 610 105 610 240 660 240 L 780 240"
                  stroke={mainColor}
                  strokeWidth="3"
                  fill="none"
                  strokeDasharray="400"
                  style={{
                    pathLength: drawProgress,
                    filter: "drop-shadow(0 0 4px rgba(99,102,241,0.6))"
                  }}
                />
                <motion.path
                  d="M 830 240 L 1100 240"
                  stroke={mainColor}
                  strokeWidth="3"
                  fill="none"
                  strokeDasharray="300"
                  style={{
                    pathLength: drawProgress,
                    filter: "drop-shadow(0 0 4px rgba(99,102,241,0.6))"
                  }}
                />
              </>
            )}
          </svg>

          {/* Render Nodes */}
          {nodesData.map((node, idx) => {
            const RenderIllustration = node.illustration;
            return (
              <motion.div
                key={node.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: idx * 0.12, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  position: 'absolute',
                  left: node.x,
                  top: node.y,
                  transform: 'translate(-50%, -50%)',
                }}
                className="group z-10 w-[220px] flex flex-col items-center text-center"
              >
                {/* Node Glass Card Circle */}
                <div className={`w-[72px] h-[72px] rounded-full glass-panel flex items-center justify-center relative mb-4 border ${
                  node.completed 
                    ? 'border-[#34D399]/40 bg-[#34D399]/5 shadow-[0_0_15px_rgba(52,211,153,0.15)]' 
                    : 'border-white/12 bg-bgBase hover:border-accentIndigo/40 hover:shadow-[0_0_20px_rgba(99,102,241,0.2)]'
                } transition-all duration-300`}>
                  <RenderIllustration mainColor={mainColor} secColor={secColor} />
                  
                  {/* Status Indicator checkmark / active tag */}
                  <div className={`absolute -top-1.5 -right-1.5 w-6 h-6 rounded-full font-mono text-[10px] font-bold flex items-center justify-center shadow-raised ${
                    node.completed 
                      ? 'bg-accentEmerald text-bgBase' 
                      : 'bg-white/8 text-textSecondary border border-white/10'
                  }`}>
                    {node.completed ? '✓' : node.number}
                  </div>
                </div>

                {/* Info Text */}
                <h3 className="text-base font-bold text-textPrimary mb-1 group-hover:text-accentIndigo-hover transition-colors">
                  {node.title}
                </h3>
                <p className="text-[12px] leading-relaxed text-textSecondary px-2">
                  {node.description}
                </p>

                {/* Progress Mini Badge */}
                <span className={`mt-2.5 px-2 py-0.5 text-[9px] font-bold font-mono rounded uppercase tracking-wider ${
                  node.completed 
                    ? 'bg-[#34D399]/10 text-[#34D399]' 
                    : node.progressText === 'In Progress' 
                      ? 'bg-accentIndigo/10 text-accentIndigo' 
                      : 'bg-white/5 text-textMuted'
                }`}>
                  {node.progressText}
                </span>
              </motion.div>
            );
          })}
        </div>

        {/* MOBILE TIMELINE (Simplified list tree) */}
        <div className="lg:hidden relative pl-10 md:pl-12">
          
          {/* Vertical connecting line */}
          <div className="absolute top-0 bottom-0 left-[20px] w-[2px] bg-white/10 -z-10">
            <motion.div
              style={{
                height: prefersReducedMotion ? "100%" : drawProgress,
                transformOrigin: 'top'
              }}
              className="w-full bg-accentIndigo shadow-[0_0_10px_rgba(99,102,241,0.5)]"
            />
          </div>

          <div className="flex flex-col gap-10">
            {nodesData.map((node, idx) => {
              const RenderIllustration = node.illustration;
              return (
                <motion.div
                  key={node.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ delay: idx * 0.08, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  className="flex items-start gap-5 relative group text-left"
                >
                  {/* Node Circle */}
                  <div className={`w-[48px] h-[48px] rounded-full glass-panel flex items-center justify-center shrink-0 border ${
                    node.completed 
                      ? 'border-[#34D399]/40 bg-[#34D399]/5' 
                      : 'border-white/12 bg-bgBase'
                  } transition-all duration-300`}>
                    <RenderIllustration mainColor={mainColor} secColor={secColor} />
                    
                    {/* Status Badge */}
                    <div className={`absolute -top-1 -left-1 w-5 h-5 rounded-full font-mono text-[9px] font-bold flex items-center justify-center ${
                      node.completed ? 'bg-accentEmerald text-bgBase' : 'bg-white/8 text-textSecondary'
                    }`}>
                      {node.completed ? '✓' : node.number}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-textPrimary mb-1">
                      {node.title}
                    </h3>
                    <p className="text-[13px] leading-relaxed text-textSecondary max-w-[45ch] mb-2">
                      {node.description}
                    </p>
                    <span className={`px-2 py-0.5 text-[9px] font-bold font-mono rounded uppercase tracking-wider ${
                      node.completed 
                        ? 'bg-[#34D399]/10 text-[#34D399]' 
                        : node.progressText === 'In Progress' 
                          ? 'bg-accentIndigo/10 text-accentIndigo' 
                          : 'bg-white/5 text-textMuted'
                    }`}>
                      {node.progressText}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>

      </div>

    </section>
  );
}
