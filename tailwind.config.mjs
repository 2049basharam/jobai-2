/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        jobai: {
          bg: '#F8FAFC',
          surface: '#FFFFFF',
          'surface-hover': '#F1F5F9',
          border: '#E2E8F0',
          'border-strong': '#CBD5E1',
          text: '#0F172A',
          muted: '#64748B',
          primary: '#1E40AF',
          'primary-hover': '#1D4ED8',
          accent: '#4F46E5',
          cyan: '#06B6D4',
          'cyan-light': '#E0F2FE',
          emerald: '#059669',
          dark: '#0B0F19',
          'dark-surface': '#111827',
        },
      },
      fontFamily: {
        heading: ['Outfit', 'sans-serif'],
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      boxShadow: {
        'jobai-sm': '0 1px 2px 0 rgba(15, 23, 42, 0.05)',
        'jobai-md': '0 4px 6px -1px rgba(15, 23, 42, 0.07), 0 2px 4px -2px rgba(15, 23, 42, 0.05)',
        'jobai-lg': '0 10px 15px -3px rgba(15, 23, 42, 0.08), 0 4px 6px -4px rgba(15, 23, 42, 0.04)',
        'jobai-glow': '0 0 25px -3px rgba(6, 182, 212, 0.35)',
        'jobai-glow-indigo': '0 0 25px -3px rgba(79, 70, 229, 0.35)',
        'jobai-card': '0 1px 3px 0 rgba(15, 23, 42, 0.06), 0 1px 2px -1px rgba(15, 23, 42, 0.04)',
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float-slow': 'float 6s ease-in-out infinite',
        'scanline': 'scan 4s linear infinite',
        'laser-border': 'laserBorder 4s linear infinite',
        'glow-pulse': 'glowPulse 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        scan: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(1000%)' },
        },
        glowPulse: {
          '0%, 100%': { opacity: '0.6', filter: 'drop-shadow(0 0 12px rgba(6, 182, 212, 0.4))' },
          '50%': { opacity: '1', filter: 'drop-shadow(0 0 24px rgba(79, 70, 229, 0.6))' },
        },
      },
    },
  },
  plugins: [],
};
