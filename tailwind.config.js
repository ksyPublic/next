/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
   theme: {
    extend: {
      fontFamily: {
        noto: ['var(--font-noto)'],
        lato: ['var(--font-lato)'],
      },
    },
  },
  
  plugins: [],
}
