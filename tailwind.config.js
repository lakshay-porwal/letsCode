/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bgBase: "#0A0A0C",
        surfaceElevated: "#111114",
        accentIndigo: {
          DEFAULT: "#6366F1",
          hover: "#818CF8",
          pressed: "#4F46E5",
        },
        accentEmerald: {
          DEFAULT: "#34D399",
        },
        textPrimary: "#F5F5F7",
        textSecondary: "#9A9AA3",
        textMuted: "#6B6B73",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      boxShadow: {
        resting: "0 1px 2px rgba(0,0,0,0.3), 0 8px 24px -8px rgba(0,0,0,0.4)",
        raised: "0 12px 32px -8px rgba(99,102,241,0.25), 0 4px 12px rgba(0,0,0,0.4)",
      },
      spacing: {
        '13': '3.25rem', // 52px
        '15': '3.75rem', // 60px
      },
      borderRadius: {
        'btn': '8px',
        'card': '20px',
        'container': '28px',
      },
      animation: {
        'drift-slow-1': 'drift1 12s ease-in-out infinite',
        'drift-slow-2': 'drift2 16s ease-in-out infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        drift1: {
          '0%, 100%': { transform: 'translate(0px, 0px) scale(1)' },
          '50%': { transform: 'translate(30px, -30px) scale(1.1)' },
        },
        drift2: {
          '0%, 100%': { transform: 'translate(0px, 0px) scale(1)' },
          '50%': { transform: 'translate(-20px, 20px) scale(1.15)' },
        },
      },
    },
  },
  plugins: [],
}
