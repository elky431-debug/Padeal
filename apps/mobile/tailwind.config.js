/** @type {import('tailwindcss').Config} */
module.exports = {
  ...require('@padeal/config/tailwind'),
  content: ['./app/**/*.{js,jsx,ts,tsx}', './components/**/*.{js,jsx,ts,tsx}'],
};
