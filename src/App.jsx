import React, { lazy, Suspense } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Footer from './components/Footer';
import SectionDivider from './components/SectionDivider';
import { Interstitial } from './components/Primitives';

// Lazy load below-the-fold content for optimized performance
const ToolsGrid = lazy(() => import('./components/ToolsGrid'));
const Roadmap = lazy(() => import('./components/Roadmap'));
const CompanyPrep = lazy(() => import('./components/CompanyPrep'));
const ResumeTemplates = lazy(() => import('./components/ResumeTemplates'));
const JobFinder = lazy(() => import('./components/JobFinder'));
const Testimonials = lazy(() => import('./components/Testimonials'));
const Community = lazy(() => import('./components/Community'));

const SectionSkeleton = ({ height = "500px" }) => (
  <div style={{ height }} className="w-full flex items-center justify-center bg-transparent">
    <div className="w-6 h-6 rounded-full border-2 border-white/5 border-t-accentIndigo/40 animate-spin" />
  </div>
);

export default function App() {
  const { scrollY } = useScroll();
  const prefersReducedMotion = useReducedMotion();

  // Parallax transformations for background orbs (slower movement)
  const bgParallaxY = useTransform(scrollY, [0, 3000], [0, 400]);

  return (
    <>

      {/* Global Grain and Vignette Overlays */}
      <div className="grain-overlay" />
      <div className="vignette-overlay" />

      <div className="relative min-h-screen bg-bgBase text-textPrimary overflow-hidden font-sans">
        
        {/* Parallax Background Layer */}
        <motion.div 
          style={{ y: prefersReducedMotion ? 0 : bgParallaxY }}
          className="absolute inset-0 pointer-events-none z-0"
        >
          {/* Static header indicator lines/glows across viewport */}
          <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-accentIndigo/3 blur-[120px]" />
          <div className="absolute bottom-[20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-purple-500/2 blur-[120px]" />
          
          {/* Global Morphing Mesh Gradient */}
          <div className="mesh-gradient-container">
            <div className="mesh-blob mesh-blob-1" />
            <div className="mesh-blob mesh-blob-2" />
            <div className="mesh-blob mesh-blob-3" />
          </div>
        </motion.div>

        {/* Navigation */}
        <Navbar />

        {/* Main Content Layout */}
        <div className="relative z-10 flex flex-col gap-8 md:gap-16">
          <Hero />
          
          <Interstitial 
            text="Built by students who've been through it." 
            subtext="We know the struggle of placement seasons, the chaos of off-campus preparation, and the cost of premium learning. So we made it free."
          />
          
          <SectionDivider />
          <Suspense fallback={<SectionSkeleton height="600px" />}>
            <ToolsGrid />
          </Suspense>
          
          <Interstitial 
            text="Free. Always. No catch." 
            subtext="No credit cards, no premium locks, no subscriptions. Every optimization audit and mock test is open to all."
          />
          
          <SectionDivider />
          <Suspense fallback={<SectionSkeleton height="600px" />}>
            <Roadmap />
          </Suspense>
          
          <Interstitial 
            text="Your dream career is closer than you think." 
            subtext="With standard skill roadmaps, direct job matching, and focused practice, consistency is all you need."
          />
          
          <SectionDivider />
          <Suspense fallback={<SectionSkeleton height="600px" />}>
            <CompanyPrep />
          </Suspense>
          
          <SectionDivider />
          <Suspense fallback={<SectionSkeleton height="600px" />}>
            <ResumeTemplates />
          </Suspense>
          
          <SectionDivider />
          <Suspense fallback={<SectionSkeleton height="600px" />}>
            <JobFinder />
          </Suspense>
          
          <SectionDivider />
          <Suspense fallback={<SectionSkeleton height="500px" />}>
            <Testimonials />
          </Suspense>
          
          <Suspense fallback={<SectionSkeleton height="500px" />}>
            <Community />
          </Suspense>
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </>
  );
}
