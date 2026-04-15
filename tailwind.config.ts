import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        tajawal: ['Tajawal', 'sans-serif'],
      },
      colors: {
        primary: {
          DEFAULT: '#C9A96E',
          dark: '#B08D4F',
        },
        secondary: '#1A1A2E',
        accent: '#E8D5B7',
        bg: {
          DEFAULT: '#FEFCF9',
          alt: '#F7F3ED',
        },
        nuvia: {
          text: '#2D2D2D',
          light: '#6B6B6B',
          success: '#4CAF50',
          error: '#E74C3C',
        },
      },
      animation: {
        'pulse-slow':    'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-in':       'fadeIn 0.5s ease-in-out',
        'fadeSlideUp':   'fadeSlideUp 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%':   { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeSlideUp: {
          '0%':   { opacity: '0', transform: 'translateY(32px) scale(0.97)' },
          '100%': { opacity: '1', transform: 'translateY(0)   scale(1)' },
        },
      },
      boxShadow: {
        gold: '0 4px 15px rgba(201, 169, 110, 0.4)',
        'gold-lg': '0 8px 30px rgba(201, 169, 110, 0.3)',
      },
    },
  },
  plugins: [],
};

export default config;
