# Let's Code — Landing Page

> A reimagined landing page for **Let's Code**, India's free placement-prep platform for engineering students — rebuilt in a premium "Dark Glassmorphism" design language, with cinematic, trust-driven, and developer-authentic UX patterns layered on top.

![Status](https://img.shields.io/badge/status-design%20concept-6366F1?style=flat-square)
![Stack](https://img.shields.io/badge/stack-React%20%2B%20Tailwind%20%2B%20Framer%20Motion-111114?style=flat-square)
![License](https://img.shields.io/badge/license-MIT-9A9AA3?style=flat-square)

---

## 📌 About the Project

[Let's Code] helps engineering students crack tech placements with 8 free AI career tools, 1000+ interview resources, company-wise prep guides, a job tracker, and a community of 1,00,000+ engineers.

This project is a **full creative redesign** of the original landing page — rebuilt from scratch with a custom design system, a layered animation engine, and storytelling patterns borrowed from three best-in-class products: **Apple**, **Groww**, and **NeetCode**.

The goal was simple: make a free, student-built edtech product look and feel like a flagship SaaS launch.

---

## 🎨 Design Direction

**Minimal & Premium — Dark Glassmorphism**

- Near-black base (`#0A0A0C`) with frosted-glass cards, hairline borders, and soft ambient gradient glow
- One restrained accent color (Indigo `#6366F1`) used sparingly for CTAs, highlights, and active states
- Strict 8px spacing system, consistent card recipe, and a single type scale across every section — no visual drift between sections
- Inter/Geist for UI copy, a monospace accent (JetBrains Mono) for stats, tags, and code-editor visuals

---

## 🧩 Build Phases

This redesign was generated and refined in three iterative passes:

| Phase | Focus |
|-------|-------|
| **Phase 1 — Core Redesign** | Full landing page rebuild: hero, AI tools bento grid, roadmap, company prep, resume templates, job finder highlight, testimonials, community, footer — built on a strict design-token system. |
| **Phase 2 — Visual & Motion Enhancement** | Added depth: mesh-gradient backgrounds, cursor-reactive spotlight, scroll-linked parallax, magnetic buttons, animated counters, particle feedback, scroll-progress bar, and a tasteful preload sequence. |
| **Phase 3 — Inspiration Pass** | Layered proven UX patterns from real products: Apple's cinematic one-idea-per-screen pacing, Groww's trust-building proof & friendly illustration, NeetCode's developer-authentic skill-tree roadmap, difficulty tags, and code-editor visual language. |

---

## ✨ Key Sections

- **Hero** — animated stat strip, dual CTA, ambient gradient orbs
- **AI Tools Bento Grid** — all 8 free tools (Job Ready Score, Mock Interview, Resume Studio, LinkedIn Optimizer, AI Job Finder, Cover Letter AI, Job Tracker, GitHub Optimizer)
- **Roadmap** — branching skill-tree journey from Learn → Practice → Optimize → Connect → Get Hired
- **Company Prep** — chip grid with difficulty tagging (Beginner-friendly / Core / Advanced)
- **Resume Templates** — fanned, depth-styled template showcase
- **AI Job Finder Highlight** — live match-score preview panel with animated progress rings
- **Testimonials** — real student stories + a dense "wall of proof" quote grid
- **Community** — Discord-style tile grid for 8 tech communities
- **Footer** — multi-column links, social icons, newsletter capture

---

## 🛠️ Tech Stack

- **React** (functional components + hooks)
- **Tailwind CSS** (custom design-token theme extension)
- **Framer Motion** (scroll-linked animation, staggered reveals, micro-interactions)
- **lucide-react** (iconography)

---

## 🚀 Getting Started

```bash
# clone the repository
git clone <https://github.com/lakshay-porwal/letsCode>
cd lets-code-redesign

# install dependencies
npm install

# run locally
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

---

## 📂 Project Structure

```
src/
├── components/
│   ├── Navbar.jsx
│   ├── Hero.jsx
│   ├── ToolsBentoGrid.jsx
│   ├── RoadmapTimeline.jsx
│   ├── CompanyChipGrid.jsx
│   ├── ResumeTemplatesShowcase.jsx
│   ├── JobFinderHighlight.jsx
│   ├── TestimonialsGrid.jsx
│   ├── CommunityGrid.jsx
│   └── Footer.jsx
├── primitives/
│   ├── GlassCard.jsx
│   ├── Button.jsx
│   ├── SectionHeading.jsx
│   └── AnimatedCounter.jsx
└── App.jsx
```

---

## 🙏 Acknowledgements

Design and motion patterns inspired by [Apple](https://www.apple.com/in/), [Groww](https://groww.in/), and [NeetCode](https://neetcode.io/) — adapted into an original visual language for Let's Code.

---

Made with ❤️ by **Lakshay Porwal**