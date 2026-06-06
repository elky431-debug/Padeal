/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    '../../apps/web/app/**/*.{js,ts,jsx,tsx,mdx}',
    '../../apps/web/components/**/*.{js,ts,jsx,tsx}',
    '../../apps/mobile/app/**/*.{js,ts,jsx,tsx}',
    '../../apps/mobile/components/**/*.{js,ts,jsx,tsx}',
    '../../packages/ui/src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        white: '#FFFFFF',
        surface: '#F5F9F5',
        border: '#C0DD97',
        'green-light': '#EAF3DE',
        'green-mid': '#639922',
        'green-dark': '#3B6D11',
        'green-deep': '#27500A',
        black: '#111111',
        gray: '#555555',
        'gray-light': '#EEEEEE',
        danger: '#D32F2F',
        gold: '#F9A825',
      },
      fontFamily: {
        boldonse: ['"Plus Jakarta Sans"', 'sans-serif'],
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      borderRadius: {
        card: '16px',
        input: '12px',
        swipe: '20px',
        pill: '999px',
      },
      boxShadow: {
        swipe: '0 2px 12px rgba(63, 109, 17, 0.08)',
      },
    },
  },
  plugins: [],
};
