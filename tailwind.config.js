/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        custom: '#083F46', // Add your custom color here
      },
      fontFamily: {
        'futura-md-bt': ['Futura Md BT', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
