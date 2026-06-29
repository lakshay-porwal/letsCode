import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Quote } from 'lucide-react';
import { GlassCard, SectionHeading } from './Primitives';

const testimonialsData = [
  {
    name: 'Jinal Mehta',
    college: 'DJ Sanghvi College',
    batch: 'Batch 2025',
    outcome: '✅ Landed job at TCS',
    quote: 'The company-specific PYQs and prep guides were crucial for my preparation. It helped me structure my revision and clear the coding round without anxiety.',
    initials: 'JM',
    avatarBg: 'bg-indigo-600/30 text-accentIndigo'
  },
  {
    name: 'Kuldeep Panwar',
    college: 'Indore Institute of Science & Tech',
    batch: 'Batch 2025',
    outcome: '🚀 Accelerated Placement Prep',
    quote: 'The free AI tools, especially the Resume Studio, gave me concrete feedback on what recruiters search for. It completely streamlined my application flow.',
    initials: 'KP',
    avatarBg: 'bg-purple-600/30 text-purple-400'
  },
  {
    name: 'Megha Chhapre',
    college: 'Medicaps University Indore',
    batch: 'Batch 2024',
    outcome: '🎯 Profile Optimized',
    quote: "From comprehensive DSA roadmaps to mock tests, everything is designed logically. It is built by students who understand our challenges.",
    initials: 'MC',
    avatarBg: 'bg-emerald-600/30 text-accentEmerald'
  }
];

const smallQuotes = [
  { quote: "Cracked my Amazon OA! Thank you!", author: "Rohit S.", role: "Software Engineer" },
  { quote: "Resume builder is a lifesaver. ATS score jumped to 92!", author: "Ananya R.", role: "Frontend Dev" },
  { quote: "Mock interviews are extremely realistic.", author: "Yash K.", role: "DevOps Engineer" },
  { quote: "The Discord community helped me get a referral!", author: "Sneha M.", role: "System Engineer" },
  { quote: "Clean, fast, no ads, completely free. Incredible project.", author: "Pranav G.", role: "Full Stack Dev" },
  { quote: "System design resources are premium level.", author: "Vivek T.", role: "Backend Engineer" }
];

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const prefersReducedMotion = useReducedMotion();

  // Mobile Auto-advance interval
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonialsData.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const gridVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <section id="interview" className="relative max-w-[1280px] mx-auto px-6 md:px-10 lg:px-16 py-16 md:py-20 lg:py-28 z-10 border-t border-white/5">
      
      {/* Background ambient light */}
      <div className="absolute right-[5%] top-[10%] w-[300px] h-[300px] rounded-full bg-accentIndigo/5 blur-[100px] pointer-events-none -z-10" />

      <SectionHeading
        eyebrow="Student Success"
        title="What Our Community Says"
        description="Hear from engineering students across India who optimized their prep profiles and cracked placement tests using our completely free AI tools."
      />

      {/* DESKTOP STATIC GRID */}
      <motion.div
        ref={containerRef}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={gridVariants}
        className="hidden md:grid grid-cols-3 gap-6 md:gap-8 items-stretch"
      >
        {testimonialsData.map((testimonial) => (
          <motion.div 
            key={testimonial.name} 
            variants={cardVariants}
            className="flex"
          >
            <GlassCard className="flex flex-col justify-between w-full h-full min-h-[300px] relative overflow-hidden group">
              
              {/* Back quote icon that brightens on hover */}
              <div className="absolute -top-4 -right-4 text-white/5 group-hover:text-white/10 group-hover:scale-110 transition-all duration-300 pointer-events-none">
                <Quote className="w-24 h-24 stroke-[1px]" />
              </div>

              <div className="z-10">
                {/* Outcome Badge */}
                <div className="inline-flex items-center text-[12px] font-bold text-accentEmerald bg-accentEmerald/10 border border-accentEmerald/20 px-3 py-1 rounded-full mb-6 uppercase tracking-wide">
                  {testimonial.outcome}
                </div>

                {/* Quote Text */}
                <p className="text-[14.5px] leading-relaxed text-textSecondary mb-6 font-medium italic">
                  "{testimonial.quote}"
                </p>
              </div>

              {/* Author Info */}
              <div className="flex items-center gap-3 pt-4 border-t border-white/5 z-10">
                <div className={`w-10 h-10 rounded-full ${testimonial.avatarBg} border border-white/10 flex items-center justify-center text-xs font-bold shrink-0`}>
                  {testimonial.initials}
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-sm font-bold text-textPrimary">{testimonial.name}</span>
                  <span className="text-[11px] text-textMuted font-semibold">
                    {testimonial.college} · {testimonial.batch}
                  </span>
                </div>
              </div>

            </GlassCard>
          </motion.div>
        ))}
      </motion.div>

      {/* GROWW-STYLE MARQUEE (Second Row of smaller testimonial chips) */}
      <div className="hidden md:block w-full overflow-hidden mt-10 relative mask-gradient-x select-none">
        <style dangerouslySetInnerHTML={{__html: `
          @keyframes testimonial-marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .animate-testimonial-marquee {
            animation: testimonial-marquee 30s linear infinite;
          }
          .animate-testimonial-marquee:hover {
            animation-play-state: paused;
          }
        `}} />

        <div className="flex gap-4 animate-testimonial-marquee whitespace-nowrap w-max">
          {[...smallQuotes, ...smallQuotes].map((item, idx) => (
            <div 
              key={idx} 
              className="inline-flex flex-col justify-between p-4 rounded-xl glass-panel bg-white/3 border border-white/6 hover:border-accentIndigo/20 hover:bg-white/5 transition-all duration-200 shadow-sm w-[260px] shrink-0 text-left"
            >
              <p className="text-[13px] leading-relaxed text-textSecondary italic mb-3 whitespace-normal">
                "{item.quote}"
              </p>
              <div className="flex justify-between items-center border-t border-white/5 pt-2">
                <span className="text-xs font-bold text-textPrimary">{item.author}</span>
                <span className="text-[10px] text-textMuted font-semibold font-mono uppercase">{item.role}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* MOBILE AUTO-ADVANCING SWIPEABLE CAROUSEL */}
      <div className="md:hidden w-full overflow-hidden relative min-h-[360px] flex flex-col justify-between">
        <div className="relative w-full h-[280px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              drag={prefersReducedMotion ? false : "x"}
              dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={(e, info) => {
                if (info.offset.x < -50) {
                  setActiveIndex((prev) => (prev + 1) % testimonialsData.length);
                } else if (info.offset.x > 50) {
                  setActiveIndex((prev) => (prev - 1 + testimonialsData.length) % testimonialsData.length);
                }
              }}
              initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, x: -50 }}
              transition={{ duration: 0.35, ease: 'easeInOut' }}
              className="absolute w-full h-full"
            >
              <GlassCard className="flex flex-col justify-between w-full h-full relative overflow-hidden group">
                <div className="absolute -top-4 -right-4 text-white/5 pointer-events-none">
                  <Quote className="w-20 h-20 stroke-[1px]" />
                </div>

                <div>
                  <div className="inline-flex items-center text-[11px] font-bold text-accentEmerald bg-accentEmerald/10 border border-accentEmerald/20 px-2.5 py-0.5 rounded-full mb-4 uppercase tracking-wide">
                    {testimonialsData[activeIndex].outcome}
                  </div>
                  <p className="text-[13.5px] leading-relaxed text-textSecondary mb-4 italic">
                    "{testimonialsData[activeIndex].quote}"
                  </p>
                </div>

                <div className="flex items-center gap-3 pt-3 border-t border-white/5">
                  <div className={`w-9 h-9 rounded-full ${testimonialsData[activeIndex].avatarBg} flex items-center justify-center text-xs font-bold shrink-0`}>
                    {testimonialsData[activeIndex].initials}
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="text-xs font-bold text-textPrimary">{testimonialsData[activeIndex].name}</span>
                    <span className="text-[10px] text-textMuted font-semibold">
                      {testimonialsData[activeIndex].college}
                    </span>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Carousel indicators dots */}
        <div className="flex justify-center items-center gap-2 mt-4">
          {testimonialsData.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                activeIndex === idx ? 'bg-accentIndigo w-4' : 'bg-white/20 w-1.5'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>

    </section>
  );
}
