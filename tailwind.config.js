/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
   theme: {
    fontSize: {
      tiny: '1.2rem', // 작은 폰트 크기
      sm: '1.4rem', // 작은 폰트 크기
      base: '1.6rem', // 기본 폰트 크기
      lg: '1.8rem', // 큰 폰트 크기
      xlg:'2.4rem',
      extra:'3.6rem'
      // 추가적인 폰트 크기 설정
    },
    extend: {
      fontFamily: {
        noto: ['var(--font-noto)'],
        lato: ['var(--font-lato)'],
      },
       width: {
        custom: 'calc(25% - 2.5rem)'
      },
      height:{
        menu: 'calc(100% - 16.6rem)'
      }
    },
  },
  
  plugins: [],
}
