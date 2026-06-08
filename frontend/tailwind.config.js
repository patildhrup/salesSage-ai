/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          black: "#0F0F0F",
          orange: "#FF6B00",
          gray: {
            50: "#FAFAFA",
            100: "#F5F5F5",
            200: "#E5E5E5",
            300: "#D4D4D4",
            400: "#A3A3A3",
            500: "#737373",
            600: "#525252",
            700: "#404040",
            800: "#262626",
            900: "#1A1A1A",
            950: "#0A0A0A",
          }
        }
      },
      borderRadius: {
        'xl': '0.75rem',
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(255, 107, 0, 0.2), 0 0 10px rgba(255, 107, 0, 0.1)' },
          '100%': { boxShadow: '0 0 10px rgba(255, 107, 0, 0.5), 0 0 20px rgba(255, 107, 0, 0.3)' },
        }
      },
      backgroundImage: {
        'orange-gradient': 'linear-gradient(135deg, #FF6B00 0%, #FF8533 50%, #FF9955 100%)',
        'orange-gradient-vibrant': 'linear-gradient(to bottom right, #FF6B00, #FF3D00)',
        'glass-gradient': 'linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0) 100%)',
      }
    },
  },
  plugins: [],
}