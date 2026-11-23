/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#14243C',
        'ink-soft': '#526174',
        paper: '#F7F8FA',
        primary: {
          50: '#EFF6FF',
          100: '#DCEBFF',
          300: '#65A9F4',
          500: '#1E88E5',
          700: '#0B4DBB',
          900: '#063477',
        },
        secondary: {
          50: '#EDF9FC',
          300: '#72D4E5',
          500: '#1593D6',
          700: '#0A668F',
        },
        accent: {
          50: '#FFF8ED',
          300: '#FFC768',
          500: '#FFB000',
          700: '#E65F12',
        },
        success: '#2A9D72',
        warning: '#D69020',
        error: '#C84B4B',
      },
      fontFamily: {
        sans: ['Noto Sans Display', 'sans-serif'],
        display: ['Cinzel', 'serif'],
        script: ['Great Vibes', 'cursive'],
      },
      boxShadow: {
        soft: '0 20px 60px rgba(20, 36, 60, 0.10)',
        card: '0 12px 36px rgba(20, 36, 60, 0.08)',
      },
    },
  },
  plugins: [],
};
