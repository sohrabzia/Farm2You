/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bone: '#F2EFE6',
        cream: '#EDE7D3',
        ink: '#0E0F0C',
        moss: '#1B3A2F',
        forest: '#0F2A20',
        clay: '#C8542A',
        ochre: '#D69A3C',
        sage: '#8FA88B',
        mist: '#DEDAC9',
      },
      fontFamily: {
        display: ['"Fraunces"', 'serif'],
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      letterSpacing: {
        tightest: '-0.04em',
      },
      borderRadius: {
        none: '0',
        sm: '2px',
        DEFAULT: '2px',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        slideup: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      animation: {
        marquee: 'marquee 40s linear infinite',
        slideup: 'slideup 0.8s ease-out forwards',
      },
    },
  },
  plugins: [],
}
