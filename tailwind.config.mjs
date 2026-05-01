/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: '#1B1B1B',
          muted: '#5A5A5A',
          soft: '#7A7A7A',
        },
        bone: {
          DEFAULT: '#F5F0E8',
          deeper: '#EDE6DA',
          soft: '#FAF7F1',
        },
        oxblood: {
          DEFAULT: '#591C2A',
          deep: '#3F1320',
          soft: '#7B2D3D',
        },
        brass: {
          DEFAULT: '#A47148',
          deep: '#7E5635',
          soft: '#C28E63',
        },
        border: {
          DEFAULT: '#D4CFC5',
          soft: '#E5E0D8',
        },
      },
      fontFamily: {
        display: ['"Fraunces Variable"', 'Fraunces', 'Georgia', 'serif'],
        sans: ['"Inter Variable"', 'Inter', '-apple-system', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        container: '1280px',
      },
      boxShadow: {
        card: '0 1px 2px rgba(27,27,27,0.04), 0 8px 24px -12px rgba(27,27,27,0.08)',
        'card-hover': '0 2px 4px rgba(27,27,27,0.05), 0 16px 32px -12px rgba(27,27,27,0.12)',
      },
      letterSpacing: {
        eyebrow: '0.08em',
      },
      transitionTimingFunction: {
        editorial: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
};
