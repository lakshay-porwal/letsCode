import React from 'react';
import { 
  Send, 
  MessageSquare, 
  MessageCircle,
  Mail,
  MapPin
} from 'lucide-react';
import { Linkedin, Youtube, Instagram } from './BrandIcons';
import { Button } from './Primitives';

const learningLinks = [
  { name: 'DSA Roadmap', href: '#learn' },
  { name: 'System Design Guides', href: '#learn' },
  { name: 'DevOps Paths', href: '#learn' },
  { name: 'ML/AI Guides', href: '#learn' },
  { name: 'Interview Q&A banks', href: '#learn' }
];

const toolLinks = [
  { name: 'Job Ready Score', href: '#tools' },
  { name: 'Mock Interview', href: '#tools' },
  { name: 'AI Resume Studio', href: '#tools' },
  { name: 'LinkedIn Optimizer', href: '#tools' },
  { name: 'AI Job Finder', href: '#tools' }
];

const communityLinks = [
  { name: 'DSA Masters', href: '#community' },
  { name: 'Full Stack Hub', href: '#community' },
  { name: 'Cloud Computing', href: '#community' },
  { name: 'Open Source', href: '#community' },
  { name: 'Developer Directory', href: '#community' }
];

const supportLinks = [
  { name: 'Previous Year Papers', href: '#pyqs' },
  { name: 'Placement Guides', href: '#pyqs' },
  { name: 'Contest Rules', href: '#learn' },
  { name: 'Help Desk', href: 'mailto:support@lets-code.co.in' },
  { name: 'Terms of Service', href: '#' }
];

export default function Footer() {
  const handleSubscribe = (e) => {
    e.preventDefault();
    // Static submit handler
  };

  return (
    <footer className="relative bg-[#0A0A0C] border-t border-white/5 pt-16 md:pt-20 pb-8 z-10 overflow-hidden">
      
      {/* Background ambient orb */}
      <div className="absolute bottom-0 right-0 w-[300px] h-[300px] rounded-full bg-accentIndigo/5 blur-[100px] pointer-events-none -z-10" />

      <div className="max-w-[1280px] mx-auto px-6 md:px-10 lg:px-16">
        
        {/* Top Segment: Brand, Socials & Newsletter */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 pb-12 mb-12 border-b border-white/5 items-start">
          {/* Logo & Tagline */}
          <div className="lg:col-span-5 flex flex-col items-start text-left">
            <a href="#" className="flex items-center gap-2.5 mb-4 group">
              <img 
                src="/logo.png" 
                alt="Let's Code Logo" 
                className="w-8 h-8 object-contain group-hover:scale-105 transition-transform duration-200" 
              />
              <span className="text-[17px] font-extrabold tracking-tight text-textPrimary">
                Let's <span className="text-accentIndigo">Code</span>
              </span>
            </a>
            <p className="text-sm leading-relaxed text-textSecondary max-w-[40ch] mb-6">
              India's first completely free tech placement preparation platform. Built by students, for students.
            </p>
            {/* Social Icons */}
            <div className="flex items-center gap-4">
              <a href="#" className="text-textMuted hover:text-[#25D366] transition-colors" aria-label="WhatsApp">
                <MessageCircle className="w-5 h-5" />
              </a>
              <a href="#" className="text-textMuted hover:text-[#0088cc] transition-colors" aria-label="Telegram">
                <Send className="w-5 h-5" />
              </a>
              <a href="#" className="text-textMuted hover:text-[#0A66C2] transition-colors" aria-label="LinkedIn">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="text-textMuted hover:text-[#FF0000] transition-colors" aria-label="YouTube">
                <Youtube className="w-5 h-5" />
              </a>
              <a href="#" className="text-textMuted hover:text-[#E1306C] transition-colors" aria-label="Instagram">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-textMuted hover:text-[#5865F2] transition-colors" aria-label="Discord">
                <MessageSquare className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Newsletter Input Row */}
          <div className="lg:col-span-7 flex flex-col items-start lg:items-end w-full text-left lg:text-right">
            <span className="text-xs font-bold uppercase tracking-wider text-textSecondary mb-2 block">
              Subscribe to Placement Alerts
            </span>
            <p className="text-xs text-textMuted mb-4 max-w-[45ch]">
              Get fresh daily off-campus hiring alerts, resume hacks, and placement study sheets.
            </p>
            <form onSubmit={handleSubscribe} className="flex gap-2 w-full max-w-md">
              <input 
                type="email" 
                required
                placeholder="Enter your email" 
                className="glass-panel bg-white/3 border border-white/10 rounded-btn px-4 py-2.5 text-sm text-textPrimary placeholder:text-textMuted focus:outline-none focus:border-accentIndigo/50 w-full"
              />
              <Button type="submit" variant="primary" className="py-2.5 px-5 shrink-0">
                Join
              </Button>
            </form>
          </div>
        </div>

        {/* Middle Segment: 4-Column Directory Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pb-12 mb-12 border-b border-white/5 text-left">
          
          {/* Column 1: Learning */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-textPrimary mb-4">
              Learning
            </h4>
            <ul className="flex flex-col gap-3">
              {learningLinks.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-xs text-textSecondary hover:text-textPrimary transition-colors relative hover:underline decoration-accentIndigo underline-offset-4">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: AI Tools */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-textPrimary mb-4">
              AI Tools
            </h4>
            <ul className="flex flex-col gap-3">
              {toolLinks.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-xs text-textSecondary hover:text-textPrimary transition-colors relative hover:underline decoration-accentIndigo underline-offset-4">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Community */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-textPrimary mb-4">
              Community
            </h4>
            <ul className="flex flex-col gap-3">
              {communityLinks.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-xs text-textSecondary hover:text-textPrimary transition-colors relative hover:underline decoration-accentIndigo underline-offset-4">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Support */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-textPrimary mb-4">
              Support
            </h4>
            <ul className="flex flex-col gap-3">
              {supportLinks.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-xs text-textSecondary hover:text-textPrimary transition-colors relative hover:underline decoration-accentIndigo underline-offset-4">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Bottom Bar: Copyright, Contact, Location */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left text-xs text-textMuted font-semibold">
          <div>
            © {new Date().getFullYear()} Let's Code. Built by students, for students.
          </div>
          
          <div className="flex flex-wrap justify-center md:justify-end gap-x-6 gap-y-2">
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-textMuted" />
              Indore, India
            </span>
            <span className="flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-textMuted" />
              support@lets-code.co.in
            </span>
            <a href="#" className="hover:text-textSecondary transition-colors">
              Sitemap
            </a>
          </div>
        </div>

      </div>

    </footer>
  );
}
