import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { SectionHeading } from './Primitives';

const track1 = [
  { name: 'DSA Masters', emoji: '💻', desc: 'Master algorithms & complex data structures.' },
  { name: 'Full Stack Hub', emoji: '🌐', desc: 'Modern web development with Node/React.' },
  { name: 'Cloud Computing', emoji: '☁️', desc: 'AWS, Docker, Kubernetes deployments.' },
  { name: 'Open Source', emoji: '🐧', desc: 'Contribute to Git & open-source projects.' }
];

const track2 = [
  { name: 'AI/ML Engineers', emoji: '🧠', desc: 'Neural networks, PyTorch & LLM builds.' },
  { name: 'Data Science', emoji: '📊', desc: 'Data wrangling, analysis & visualization.' },
  { name: 'Cyber Security', emoji: '🛡️', desc: 'Ethical hacking, firewalls & security.' },
  { name: 'QA Community', emoji: '🔍', desc: 'Automated testing, selenium & quality.' }
];

export default function Community() {
  const containerRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();

  // Scroll linked transforms for section entry/exit fades
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0.96, 1, 1, 0.96]);

  // Double the arrays for infinite scrolling effect on desktop
  const doubledTrack1 = [...track1, ...track1, ...track1];
  const doubledTrack2 = [...track2, ...track2, ...track2];

  const allCommunities = [...track1, ...track2];

  return (
    <section 
      ref={containerRef}
      id="community" 
      className="relative py-16 md:py-20 lg:py-28 overflow-hidden border-t border-white/5"
    >
      <motion.div
        style={{
          opacity: prefersReducedMotion ? 1 : opacity,
          scale: prefersReducedMotion ? 1 : scale
        }}
      >
        {/* Self-contained Infinite Scroll Keyframe Styles */}
        <style dangerouslySetInnerHTML={{__html: `
          @keyframes scroll-left {
            0% { transform: translateX(0); }
            100% { transform: translateX(-33.33%); }
          }
          @keyframes scroll-right {
            0% { transform: translateX(-33.33%); }
            100% { transform: translateX(0); }
          }
          .animate-scroll-left {
            animation: scroll-left 35s linear infinite;
          }
          .animate-scroll-right {
            animation: scroll-right 35s linear infinite;
          }
          .animate-scroll-left:hover,
          .animate-scroll-right:hover {
            animation-play-state: paused;
          }
        `}} />

        {/* Background ambient orb */}
        <div className="absolute top-1/2 left-1/3 w-[500px] h-[500px] rounded-full bg-accentIndigo/5 blur-[120px] pointer-events-none -z-10" />

        <div className="max-w-[1280px] mx-auto px-6 md:px-10 lg:px-16 mb-12">
          <SectionHeading
            eyebrow="Developer Network"
            title="Join Our Tech Communities"
            description="Become part of an ecosystem with 1,00,000+ engineering students. Learn together, collaborate on projects, and get referrals."
          />
        </div>

        {/* DESKTOP INFINITE SCROLL CAROUSEL */}
        <div className="hidden lg:flex flex-col gap-6 w-full relative">
          {/* Track 1 (Scrolling Left) */}
          <div className="flex w-full overflow-hidden mask-gradient-x">
            <div className="flex gap-6 animate-scroll-left whitespace-nowrap">
              {doubledTrack1.map((item, idx) => (
                <div 
                  key={`t1-${idx}`} 
                  className="w-[280px] inline-flex flex-col justify-between p-6 rounded-card glass-panel bg-white/4 border border-white/10 hover:border-accentIndigo/30 hover:bg-white/7 transition-all duration-300 shadow-sm cursor-pointer shrink-0 select-none group"
                >
                  <div>
                    <div className="text-3xl mb-4 group-hover:scale-110 transition-transform duration-200 w-fit">{item.emoji}</div>
                    <h4 className="text-base font-bold text-textPrimary mb-1.5">{item.name}</h4>
                    <p className="text-xs text-textSecondary leading-relaxed whitespace-normal">{item.desc}</p>
                  </div>
                  <div className="mt-4 text-[10.5px] font-bold text-accentIndigo uppercase tracking-wider">
                    Login to join →
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Track 2 (Scrolling Right) */}
          <div className="flex w-full overflow-hidden mask-gradient-x">
            <div className="flex gap-6 animate-scroll-right whitespace-nowrap">
              {doubledTrack2.map((item, idx) => (
                <div 
                  key={`t2-${idx}`} 
                  className="w-[280px] inline-flex flex-col justify-between p-6 rounded-card glass-panel bg-white/4 border border-white/10 hover:border-accentIndigo/30 hover:bg-white/7 transition-all duration-300 shadow-sm cursor-pointer shrink-0 select-none group"
                >
                  <div>
                    <div className="text-3xl mb-4 group-hover:scale-110 transition-transform duration-200 w-fit">{item.emoji}</div>
                    <h4 className="text-base font-bold text-textPrimary mb-1.5">{item.name}</h4>
                    <p className="text-xs text-textSecondary leading-relaxed whitespace-normal">{item.desc}</p>
                  </div>
                  <div className="mt-4 text-[10.5px] font-bold text-accentIndigo uppercase tracking-wider">
                    Login to join →
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* MOBILE & TABLET WRAPPING GRID */}
        <div className="lg:hidden max-w-[1280px] mx-auto px-6 md:px-10 lg:px-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {allCommunities.map((item) => (
              <div 
                key={item.name}
                className="flex flex-col justify-between p-6 rounded-card glass-panel bg-white/4 border border-white/10 hover:border-accentIndigo/30 hover:bg-white/6 transition-all duration-200 shadow-sm cursor-pointer group"
              >
                <div>
                  <span className="text-3xl mb-4 block group-hover:scale-105 transition-transform duration-250 w-fit">{item.emoji}</span>
                  <h4 className="text-[15px] font-bold text-textPrimary mb-1.5">{item.name}</h4>
                  <p className="text-xs text-textSecondary leading-relaxed">{item.desc}</p>
                </div>
                <div className="mt-4 text-[10px] font-bold text-accentIndigo uppercase tracking-wider">
                  Login to join →
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Community Stats Footer */}
        <div className="max-w-[1280px] mx-auto px-6 md:px-10 lg:px-16 mt-12 md:mt-16 flex flex-col items-center">
          <div className="glass-panel py-4 px-6 rounded-full inline-flex flex-wrap justify-center items-center gap-x-6 gap-y-2 border-white/8 shadow-sm">
            <span className="text-xs font-semibold text-textSecondary">
              👥 500+ Public Profiles
            </span>
            <div className="hidden sm:block w-[1px] h-3 bg-white/10" />
            <span className="text-xs font-semibold text-textSecondary">
              🛠️ 1,00,000+ Skills Listed
            </span>
            <div className="hidden sm:block w-[1px] h-3 bg-white/10" />
            <span className="text-xs font-semibold text-textSecondary">
              📍 50+ Cities in Directory
            </span>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
