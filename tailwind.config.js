/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fdf2f4',
          100: '#fbe2e6',
          200: '#f7c7cf',
          300: '#f0a2ae',
          400: '#e57285',
          500: '#d7455d',
          600: '#c12e46',
          700: '#a32034',
          800: '#881d2f',
          900: '#731c2a',
          950: '#410b14',
        },
        sidebar: {
          bg: '#1a0508',
          hover: '#410b14',
          active: '#731c2a',
        },
        surface: {
          light: '#ffffff',
          dark: '#121212',
          muted: '#f8fafc',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-out',
        'slide-up': 'slideUp 0.4s ease-out',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        }
      }
    },
  },
  plugins: [],
}
