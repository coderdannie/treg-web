/** @type {import('tailwindcss').Config} */
const tailwindConfig = {
  content: ['./src/**/*.{html,js}'],
  theme: {
    extend: {
      primaryColor: {
        custom: '0px 4px 23px rgba(0, 0, 0, 0.07)',
      },
      colors: {
        primary: {
          DEFAULT: 'hsla(227, 86%, 49%, 1)',
          foreground: 'hsl(var(--primary-foreground))',
        },
      },
      screens: {
        'min-991': '991px',
        'max-991': { max: '991px' }, // Custom media query for max-width
        'max-768': { max: '768px' },
      },
      transitionTimingFunction: {
        'minor-spring': 'cubic-bezier(0.18,0.89,0.82,1.04)',
      },
      keyframes: {
        'reveal-up': {
          '0%': { opacity: '0', transform: 'translateY(80%)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'reveal-down': {
          '0%': { opacity: '0', transform: 'translateY(-80%)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'content-blur': {
          '0%': { filter: 'blur(0.3rem)' },
          '100%': { filter: 'blur(0)' },
        },
      },
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: ['winter', 'dracula'],
  },
};

export default tailwindConfig;
