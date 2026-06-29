import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sparkles, Map, Wrench, CheckSquare, Users, ArrowRight } from 'lucide-react';

const navLinks = [
  { name: 'Roadmap', href: '#learn' },
  { name: 'AI Tools', href: '#tools' },
  { name: 'Practice', href: '#pyqs' },
  { name: 'Community', href: '#community' }
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
        setActiveSection(''); // Clear active section when scrolled to the very top
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -50% 0px', // trigger when section occupies middle part of screen
      threshold: 0
    };

    const handleIntersection = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, observerOptions);

    const sectionIds = ['learn', 'tools', 'pyqs', 'community'];
    sectionIds.forEach(id => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => {
      sectionIds.forEach(id => {
        const element = document.getElementById(id);
        if (element) observer.unobserve(element);
      });
    };
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 z-50 w-full flex justify-center py-4 pointer-events-none"
      >
        <motion.div
          layout
          animate={{
            width: scrolled ? '90%' : '100%',
            maxWidth: scrolled ? '960px' : '1280px',
            borderRadius: scrolled ? '9999px' : '0px',
            backgroundColor: scrolled ? 'rgba(10, 10, 12, 0.75)' : 'rgba(10, 10, 12, 0)',
            borderColor: scrolled ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0)',
            paddingTop: scrolled ? '12px' : '20px',
            paddingBottom: scrolled ? '12px' : '20px',
            boxShadow: scrolled 
              ? '0 12px 32px -8px rgba(99,102,241,0.25), 0 4px 12px rgba(0,0,0,0.4)' 
              : '0 0px 0px rgba(0,0,0,0)',
            y: scrolled ? 8 : 0
          }}
          transition={{ type: 'spring', stiffness: 200, damping: 24, mass: 0.8 }}
          className="pointer-events-auto flex items-center justify-between relative border glass-panel floating-border px-6 md:px-10 lg:px-16"
        >
          {/* Logo with interactive hover effects */}
          <a href="#" className="flex items-center gap-2.5 group relative select-none">
            <div className="relative">
              {/* Glowing aura behind logo */}
              <div className="absolute inset-0 bg-accentIndigo/30 rounded-xl blur-md scale-75 opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500" />
              <img 
                src="/logo.png" 
                alt="Let's Code Logo" 
                className="w-8.5 h-8.5 object-contain relative z-10 group-hover:rotate-12 transition-transform duration-300 ease-out" 
              />
            </div>
            <span className="text-[18px] font-extrabold tracking-tight text-textPrimary">
              Let's <span className="text-shimmer bg-clip-text font-black">Code</span>
            </span>
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-1">
            <ul className="flex items-center gap-1 relative" onMouseLeave={() => setHoveredIndex(null)}>
              {navLinks.map((link, idx) => {
                const isActive = activeSection === link.href.substring(1);
                return (
                  <li key={link.name} className="relative py-1">
                    <a
                      href={link.href}
                      className={`relative z-10 px-4 py-2 text-[14px] font-semibold transition-all duration-300 block select-none rounded-full ${
                        isActive ? 'text-textPrimary' : 'text-textSecondary hover:text-textPrimary'
                      }`}
                      onMouseEnter={() => setHoveredIndex(idx)}
                    >
                      {link.name}
                    </a>
                    
                    {/* Hover Pill Background */}
                    <AnimatePresence>
                      {hoveredIndex === idx && (
                        <motion.span
                          layoutId="nav-hover-pill"
                          className="absolute inset-0 bg-white/8 rounded-full z-0 pointer-events-none"
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                        />
                      )}
                    </AnimatePresence>

                    {/* Active Indicator Underline Dot */}
                    {isActive && (
                      <motion.span
                        layoutId="nav-active-dot"
                        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-accentIndigo rounded-full shadow-[0_0_8px_#6366f1] z-10"
                        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                      />
                    )}
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Open AI Toolkit Button */}
          <div className="hidden md:block">
            <a 
              href="#tools" 
              className="relative inline-flex items-center gap-2 bg-gradient-to-r from-accentIndigo to-purple-600 hover:from-accentIndigo-hover hover:to-purple-500 text-textPrimary px-5 py-2.5 rounded-full text-[13px] font-bold shadow-resting hover:shadow-raised hover:scale-103 active:scale-97 transition-all duration-200 group overflow-hidden"
            >
              {/* Glass shimmer sweep overlay */}
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.2s_infinite] transition-transform pointer-events-none" />
              <Sparkles className="w-4 h-4 text-accentEmerald group-hover:rotate-12 transition-transform duration-300" />
              <span className="relative z-10">Open AI Toolkit</span>
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2.5 rounded-full hover:bg-white/5 text-textSecondary hover:text-textPrimary transition-all duration-200 focus:outline-none relative z-50"
            aria-label="Toggle Menu"
          >
            {mobileOpen ? <X className="w-5.5 h-5.5" /> : <Menu className="w-5.5 h-5.5" />}
          </button>
        </motion.div>
      </motion.nav>

      {/* Mobile Glass Dropdown Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Dark glass backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
            />

            {/* Dropdown Card */}
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className={`fixed z-40 left-4 right-4 md:hidden glass-panel bg-bgBase/95 border border-white/10 rounded-3xl p-6 shadow-raised flex flex-col gap-6 ${
                scrolled ? 'top-20' : 'top-24'
              }`}
            >
              {/* Grid of Navigation Links */}
              <div className="grid grid-cols-2 gap-3">
                {navLinks.map((link, idx) => {
                  const icons = {
                    'Roadmap': <Map className="w-5 h-5 text-accentIndigo" />,
                    'AI Tools': <Wrench className="w-5 h-5 text-accentEmerald" />,
                    'Practice': <CheckSquare className="w-5 h-5 text-purple-400" />,
                    'Community': <Users className="w-5 h-5 text-blue-400" />
                  };
                  const descs = {
                    'Roadmap': 'Step-by-step career path',
                    'AI Tools': 'AI optimizers & builders',
                    'Practice': 'Company coding practice',
                    'Community': 'Connect with engineers'
                  };
                  return (
                    <motion.a
                      key={link.name}
                      href={link.href}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.05, duration: 0.3 }}
                      onClick={() => setMobileOpen(false)}
                      className="flex flex-col gap-2 p-4 rounded-2xl bg-white/3 hover:bg-white/8 border border-white/5 hover:border-white/10 transition-all group"
                    >
                      <div className="flex items-center justify-between">
                        {icons[link.name]}
                        <ArrowRight className="w-4 h-4 text-textMuted group-hover:text-textPrimary group-hover:translate-x-0.5 transition-all" />
                      </div>
                      <div>
                        <h4 className="text-[14px] font-bold text-textPrimary">{link.name}</h4>
                        <p className="text-[11px] text-textSecondary leading-normal mt-0.5">{descs[link.name]}</p>
                      </div>
                    </motion.a>
                  );
                })}
              </div>

              {/* Status Banner */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
                className="bg-accentIndigo/10 border border-accentIndigo/20 rounded-2xl p-4 flex items-center justify-between"
              >
                <div className="flex items-center gap-2">
                  <span className="flex h-2.5 w-2.5 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accentEmerald opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-accentEmerald"></span>
                  </span>
                  <span className="text-[12px] font-medium text-textSecondary">
                    1 Lakh+ active engineers prepping
                  </span>
                </div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-accentIndigo bg-accentIndigo/10 px-2 py-0.5 rounded-full">
                  Live
                </span>
              </motion.div>

              {/* CTA Action */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <a 
                  href="#tools" 
                  onClick={() => setMobileOpen(false)}
                  className="w-full relative flex items-center justify-center gap-2 bg-gradient-to-r from-accentIndigo to-purple-600 text-textPrimary py-3.5 rounded-2xl text-[14px] font-bold shadow-resting hover:shadow-raised transition-all overflow-hidden"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Open AI Toolkit</span>
                </a>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
