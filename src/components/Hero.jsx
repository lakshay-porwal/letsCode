import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { ArrowRight, Play, Check, Terminal } from 'lucide-react';
import { Button, AnimatedCounter } from './Primitives';

// --- MAGNETIC WRAPPER FOR BUTTONS ---
const Magnetic = ({ children }) => {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const prefersReducedMotion = useReducedMotion();

  const handleMouseMove = (e) => {
    if (prefersReducedMotion) return;
    const { clientX, clientY } = e;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const distanceX = clientX - centerX;
    const distanceY = clientY - centerY;
    const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

    if (distance < 80) {
      setPosition({ x: distanceX * 0.35, y: distanceY * 0.35 });
    } else {
      setPosition({ x: 0, y: 0 });
    }
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 150, damping: 15 }}
      className="inline-block"
    >
      {children}
    </motion.div>
  );
};

// --- MOCK IDE CODE EDITOR PANEL COMPONENT (Live compiler simulation) ---
const MockCodePanel = () => {
  const ref = useRef(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"]
  });

  const scale = useTransform(scrollYProgress, [0, 0.85], [0.95, 1]);
  const blurVal = useTransform(scrollYProgress, [0, 0.85], ["blur(6px)", "blur(0px)"]);
  const opacity = useTransform(scrollYProgress, [0, 0.85], [0.6, 1]);

  const [visibleLines, setVisibleLines] = useState(0);
  const [testStatus, setTestStatus] = useState('idle'); // 'idle' | 'running' | 'passed'
  const totalLines = 13;

  useEffect(() => {
    let lineTimer;
    if (visibleLines < totalLines) {
      lineTimer = setTimeout(() => {
        setVisibleLines(prev => prev + 1);
      }, 250);
    } else if (visibleLines === totalLines && testStatus === 'idle') {
      setTestStatus('running');
      setTimeout(() => {
        setTestStatus('passed');
      }, 1200);
    }

    return () => clearTimeout(lineTimer);
  }, [visibleLines, testStatus]);

  // Code lines arrays with highlighted parts
  const codeLines = [
    <span><span className="text-purple-400">#include</span> <span className="text-amber-300">&lt;vector&gt;</span></span>,
    <span><span className="text-blue-400">using namespace</span> std;</span>,
    <span className="text-textMuted/60 font-semibold italic">{"// 1 Lakh+ active engineers prepping here"}</span>,
    <span><span className="text-blue-400">class</span> <span className="text-teal-400">LetsCodeSolution</span> &#123;</span>,
    <span><span className="text-blue-400">public</span>:</span>,
    <span>    vector&lt;<span className="text-blue-400">int</span>&gt; <span className="text-yellow-400">twoSum</span>(vector&lt;<span className="text-blue-400">int</span>&gt;&amp; nums, <span className="text-blue-400">int</span> target) &#123;</span>,
    <span>        unordered_map&lt;<span className="text-blue-400">int</span>, <span className="text-blue-400">int</span>&gt; hash;</span>,
    <span>        <span className="text-pink-400">for</span> (<span className="text-blue-400">int</span> i = <span className="text-amber-400">0</span>; i &lt; nums.size(); ++i) &#123;</span>,
    <span>            <span className="text-pink-400">if</span> (hash.count(target - nums[i]))</span>,
    <span>                <span className="text-pink-400">return</span> &#123;hash[target - nums[i]], i&#125;;</span>,
    <span>            hash[nums[i]] = i;</span>,
    <span>        &#125;</span>,
    <span>        <span className="text-pink-400">return</span> &#123;&#125;;</span>,
    <span>    &#125;</span>,
    <span>&#125;;</span>
  ];

  return (
    <motion.div
      ref={ref}
      style={prefersReducedMotion ? {} : { scale, filter: blurVal, opacity }}
      className="w-full max-w-2xl mx-auto rounded-2xl glass-panel bg-surfaceElevated/75 border border-white/10 shadow-raised overflow-hidden text-left font-mono mt-12 md:mt-16 select-none"
    >
      {/* Editor Chrome Header Bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-white/4 border-b border-white/5">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-[#EF4444] opacity-80" />
          <span className="w-3 h-3 rounded-full bg-[#F59E0B] opacity-80" />
          <span className="w-3 h-3 rounded-full bg-[#10B981] opacity-80" />
        </div>
        <span className="text-[11px] text-textSecondary font-semibold tracking-wide font-sans">two_sum_solution.cpp</span>
        <span className="text-[11px] text-textSecondary/80 bg-white/5 border border-white/10 px-2 py-0.5 rounded uppercase tracking-wider font-sans font-bold">C++</span>
      </div>
      
      {/* Editor Body */}
      <div className="p-5 text-[13px] md:text-[14px] leading-relaxed text-textPrimary overflow-x-auto relative bg-[#0D0D11]/30">
        <div className="flex">
          {/* Line Numbers */}
          <div className="text-textMuted/40 select-none text-right pr-4 flex flex-col font-mono" style={{ minWidth: '2.5rem' }}>
            {codeLines.map((_, i) => (
              <span key={i} className={i <= visibleLines ? "text-textMuted/80 font-bold transition-all duration-300" : "text-transparent"}>{i + 1}</span>
            ))}
          </div>
          
          {/* Syntax Highlighting Container */}
          <code className="text-left font-mono flex flex-col relative w-full">
            {codeLines.map((line, idx) => (
              <div 
                key={idx} 
                className={`transition-all duration-300 flex items-center h-[21px] ${
                  idx <= visibleLines ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2"
                }`}
              >
                {idx <= visibleLines && (
                  <>
                    {line}
                    {idx === visibleLines && visibleLines < totalLines && (
                      <span className="w-1.5 h-4 bg-accentIndigo inline-block animate-pulse ml-0.5 align-middle" />
                    )}
                  </>
                )}
              </div>
            ))}
          </code>
        </div>
      </div>

      {/* Editor Footer Test Runner Status */}
      <AnimatePresence>
        {testStatus !== 'idle' && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className={`border-t border-white/5 px-5 py-3 font-sans text-xs flex items-center justify-between transition-all ${
              testStatus === 'running' 
                ? 'bg-amber-500/5 text-amber-300' 
                : 'bg-accentEmerald/5 text-accentEmerald'
            }`}
          >
            <div className="flex items-center gap-2">
              {testStatus === 'running' ? (
                <>
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
                  </span>
                  <span className="flex items-center gap-1"><Terminal className="w-3.5 h-3.5" /> Compiling & executing tests...</span>
                </>
              ) : (
                <>
                  <span className="relative flex h-2 w-2">
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-accentEmerald"></span>
                  </span>
                  <span className="font-semibold flex items-center gap-1"><Check className="w-3.5 h-3.5" /> All 10/10 test cases passed.</span>
                  <span className="text-textSecondary/60">compilation: success (gcc -O3)</span>
                </>
              )}
            </div>
            <div className="text-[10px] text-textSecondary/50 font-mono">
              {testStatus === 'running' ? 'executing...' : '14ms'}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default function Hero() {
  const [particles, setParticles] = useState([]);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const heroRef = useRef(null);
  const { scrollY } = useScroll();

  // Scroll parallax for hero elements
  const textParallaxY = useTransform(scrollY, [0, 500], [0, -25]);
  const illustParallaxY = useTransform(scrollY, [0, 500], [0, 35]);

  useEffect(() => {
    const checkTouch = () => {
      setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
    };
    checkTouch();
  }, []);

  const handleSpotlightMove = (e) => {
    if (isTouchDevice || !heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    heroRef.current.style.setProperty('--spotlight-x', `${x}px`);
    heroRef.current.style.setProperty('--spotlight-y', `${y}px`);
    heroRef.current.style.setProperty('--spotlight-opacity', '1');
  };

  const handleSpotlightLeave = () => {
    if (isTouchDevice || !heroRef.current) return;
    heroRef.current.style.setProperty('--spotlight-opacity', '0');
  };

  const triggerClickParticles = (e) => {
    if (prefersReducedMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    const newParticles = Array.from({ length: 8 }).map((_, i) => {
      const angle = (i * 360) / 8;
      const rad = (angle * Math.PI) / 180;
      const speed = 2 + Math.random() * 3;
      return {
        id: Date.now() + i + Math.random(),
        x: clickX,
        y: clickY,
        dx: Math.cos(rad) * speed,
        dy: Math.sin(rad) * speed
      };
    });

    setParticles((prev) => [...prev, ...newParticles]);
    setTimeout(() => {
      setParticles((prev) => prev.filter(p => !newParticles.find(np => np.id === p.id)));
    }, 500);
  };

  const headlineText = "Everything You Need to Land Your Dream Tech Job";
  const headlineWords = headlineText.split(" ");

  return (
    <section 
      ref={heroRef}
      onMouseMove={handleSpotlightMove}
      onMouseLeave={handleSpotlightLeave}
      className="relative min-h-[90vh] flex flex-col justify-center items-center pt-32 pb-16 overflow-hidden max-w-[1280px] mx-auto px-6 md:px-10 lg:px-16 text-center z-10 select-none"
    >
      {/* Interactive grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.012)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.012)_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none z-0" />

      {/* Drifting Background Glow Orbs */}
      {!prefersReducedMotion && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          <div className="absolute top-[20%] left-[10%] w-[350px] h-[350px] rounded-full bg-accentIndigo/5 blur-[80px]" />
          <div className="absolute bottom-[20%] right-[10%] w-[400px] h-[400px] rounded-full bg-purple-600/4 blur-[100px]" />
        </div>
      )}

      {/* Background Interactive Spotlight */}
      {!isTouchDevice && !prefersReducedMotion && (
        <div 
          style={{
            left: 0,
            top: 0,
            width: '100%',
            height: '100%',
            opacity: 'var(--spotlight-opacity, 0)',
            background: `radial-gradient(220px circle at var(--spotlight-x, 0px) var(--spotlight-y, 0px), rgba(99, 102, 241, 0.12), transparent 80%)`,
            transition: 'opacity 0.3s ease'
          }}
          className="absolute inset-0 pointer-events-none z-0"
        />
      )}

      {/* Abstract Constellation SVG Parallax Illustration */}
      <motion.div 
        style={{ y: prefersReducedMotion ? 0 : illustParallaxY }}
        animate={{ y: [0, -10, 0] }}
        transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-4/5 max-w-4xl h-[40vh] pointer-events-none z-0 opacity-20"
      >
        <svg className="w-full h-full" viewBox="0 0 800 400" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Glass shards path */}
          <path d="M100 200 L250 100 L400 250 L250 350 Z" stroke="rgba(255,255,255,0.06)" strokeWidth="1" fill="rgba(99,102,241,0.01)" />
          <path d="M400 250 L550 150 L700 250 L550 350 Z" stroke="rgba(255,255,255,0.06)" strokeWidth="1" fill="rgba(139,92,246,0.01)" />
          
          {/* Connecting lines */}
          <line x1="250" y1="100" x2="550" y2="150" stroke="rgba(99,102,241,0.15)" strokeWidth="1" strokeDasharray="3 3" />
          <line x1="250" y1="350" x2="550" y2="350" stroke="rgba(139,92,246,0.15)" strokeWidth="1" strokeDasharray="3 3" />
          
          {/* Constellation Nodes */}
          <circle cx="100" cy="200" r="3" fill="#6366F1" className="animate-pulse" />
          <circle cx="250" cy="100" r="4" fill="#8B5CF6" />
          <circle cx="400" cy="250" r="3" fill="#6366F1" />
          <circle cx="250" cy="350" r="4" fill="#8B5CF6" />
          <circle cx="550" cy="150" r="5" fill="#6366F1" className="animate-pulse" />
          <circle cx="700" cy="250" r="3" fill="#8B5CF6" />
          <circle cx="550" cy="350" r="4" fill="#6366F1" />
        </svg>
      </motion.div>

      {/* Hero Content */}
      <motion.div 
        style={{ y: prefersReducedMotion ? 0 : textParallaxY }}
        className="max-w-[780px] flex flex-col items-center z-10 w-full"
      >
        
        {/* Eyebrow Label with pulse indicator */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="glass-panel px-4 py-1.5 rounded-full flex items-center gap-2 mb-4 shadow-resting hover:border-white/20 transition-colors cursor-pointer"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accentEmerald opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-accentEmerald"></span>
          </span>
          <span className="text-[13px] font-semibold tracking-wide text-textPrimary">
            1 Lakh+ active engineers prepping here
          </span>
        </motion.div>

        {/* Confident Tagline */}
        <span className="text-[14px] md:text-[15px] font-extrabold tracking-[0.18em] text-accentIndigo uppercase mb-3 block animate-pulse">
          CODE YOUR WAY IN.
        </span>

        {/* Unified animated reveal headline with glowing brand keywords */}
        <motion.h1 
          initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="text-4xl sm:text-5xl md:text-[64px] font-extrabold tracking-tight mb-6 leading-[1.05] text-center"
        >
          Everything You Need to Land Your <span className="text-shimmer bg-clip-text font-black text-shadow-sm">Dream</span> <span className="text-shimmer bg-clip-text font-black text-shadow-sm">Tech</span> <span className="text-shimmer bg-clip-text font-black text-shadow-sm">Job</span>
        </motion.h1>

        {/* Subheadline with Apple-style restraint */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="text-base sm:text-lg md:text-[18px] text-textSecondary max-w-[65ch] mb-10 leading-relaxed font-medium"
        >
          8 free AI tools. 1000+ placement resources. The complete prep suite.
        </motion.p>

        {/* CTA Actions */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mb-20 relative justify-center"
        >
          {/* Particle Burst Container */}
          {particles.map((p) => (
            <motion.div
              key={p.id}
              initial={{ x: p.x, y: p.y, scale: 1, opacity: 1 }}
              animate={{ 
                x: p.x + p.dx * 12, 
                y: p.y + p.dy * 12, 
                scale: 0, 
                opacity: 0 
              }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="absolute w-1.5 h-1.5 rounded-full bg-accentIndigo pointer-events-none z-50 shadow-[0_0_8px_rgba(99,102,241,0.8)]"
            />
          ))}

          <Magnetic>
            <Button 
              variant="primary" 
              href="#tools" 
              onClick={(e) => {
                triggerClickParticles(e);
              }}
              className="group gap-2 px-8 py-4 text-[15px] relative overflow-hidden rounded-full"
            >
              {/* Shine sweep overlay */}
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.2s_infinite] transition-transform pointer-events-none" />
              Check Job Ready Score — Free
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Magnetic>

          <Magnetic>
            <Button 
              variant="secondary" 
              href="#interview" 
              className="group gap-2 px-8 py-4 text-[15px] rounded-full hover:bg-white/10"
            >
              <Play className="w-4 h-4 text-textSecondary group-hover:text-textPrimary fill-textSecondary group-hover:fill-textPrimary transition-all" />
              Start Mock Interview
            </Button>
          </Magnetic>
        </motion.div>

        {/* Mock IDE Code Panel (Live Compiler typing simulator) */}
        <MockCodePanel />
      </motion.div>

      {/* Stats Strip */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="w-full z-10"
      >
        <div className="glass-panel rounded-card p-6 md:p-8 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-0 relative">
          
          {/* Stat 1 */}
          <motion.div 
            whileHover={{ scale: 1.03 }}
            className="flex flex-col items-center justify-center md:border-r border-white/10 px-4 py-2 group cursor-pointer transition-all duration-300"
          >
            <span className="text-3xl md:text-4xl font-extrabold text-textPrimary tracking-tight font-mono group-hover:text-accentIndigo transition-colors">
              <AnimatedCounter value="1,00,000" suffix="+" />
            </span>
            <span className="text-xs md:text-[13px] font-semibold text-textMuted uppercase tracking-wider mt-2 group-hover:text-textSecondary transition-colors">
              Engineers
            </span>
          </motion.div>

          {/* Stat 2 */}
          <motion.div 
            whileHover={{ scale: 1.03 }}
            className="flex flex-col items-center justify-center md:border-r border-white/10 px-4 py-2 group cursor-pointer transition-all duration-300"
          >
            <span className="text-3xl md:text-4xl font-extrabold text-accentIndigo tracking-tight font-mono group-hover:text-indigo-400 transition-colors">
              <AnimatedCounter value="8" suffix="" />
            </span>
            <span className="text-xs md:text-[13px] font-semibold text-textMuted uppercase tracking-wider mt-2 group-hover:text-textSecondary transition-colors">
              Free AI Tools
            </span>
          </motion.div>

          {/* Stat 3 */}
          <motion.div 
            whileHover={{ scale: 1.03 }}
            className="flex flex-col items-center justify-center md:border-r border-white/10 px-4 py-2 group cursor-pointer transition-all duration-300"
          >
            <span className="text-3xl md:text-4xl font-extrabold text-textPrimary tracking-tight font-mono group-hover:text-accentIndigo transition-colors">
              <AnimatedCounter value="35" suffix="+" />
            </span>
            <span className="text-xs md:text-[13px] font-semibold text-textMuted uppercase tracking-wider mt-2 group-hover:text-textSecondary transition-colors">
              Interview Topics
            </span>
          </motion.div>

          {/* Stat 4 */}
          <motion.div 
            whileHover={{ scale: 1.03 }}
            className="flex flex-col items-center justify-center px-4 py-2 group cursor-pointer transition-all duration-300"
          >
            <span className="text-3xl md:text-4xl font-extrabold text-accentIndigo tracking-tight font-mono group-hover:text-indigo-400 transition-colors">
              <AnimatedCounter value="25" suffix="+" />
            </span>
            <span className="text-xs md:text-[13px] font-semibold text-textMuted uppercase tracking-wider mt-2 group-hover:text-textSecondary transition-colors">
              Prep Guides
            </span>
          </motion.div>

        </div>

        {/* Groww-style Reassurance Strip */}
        <div className="flex flex-wrap justify-center items-center gap-3.5 mt-8 md:mt-10 max-w-4xl mx-auto w-full">
          {['100% Free Forever', 'No Hidden Fees', '1 Lakh+ Community', 'Built by Students'].map((text, i) => (
            <div 
              key={i} 
              className="glass-panel px-4 py-2 rounded-full text-xs font-semibold text-textSecondary flex items-center gap-2 hover:border-white/20 transition-all select-none cursor-pointer"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-accentEmerald animate-pulse" />
              {text}
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
