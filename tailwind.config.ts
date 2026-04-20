import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          green: {
            DEFAULT: '#1a3d3d',
            50: '#f0f4f4',
            100: '#d9e3e3',
            200: '#b3c7c7',
            300: '#8daaa9',
            400: '#678e8d',
            500: '#4a7171',
            600: '#3a5a5a',
            700: '#2d4646',
            800: '#1a3d3d',
            900: '#142e2e',
          },
          gold: {
            DEFAULT: '#c9b896',
            50: '#faf8f4',
            100: '#f2ede3',
            200: '#e8ddc8',
            300: '#ddc9a8',
            400: '#d3b68f',
            500: '#c9b896',
            600: '#b39d75',
            700: '#8f7d5c',
            800: '#6b5e45',
            900: '#4a4030',
          },
          cream: {
            DEFAULT: '#f5f1e8',
            50: '#fdfcfa',
            100: '#f9f7f2',
            200: '#f5f1e8',
            300: '#ede7d9',
            400: '#e0d5c0',
            500: '#d2c3a7',
            600: '#b8a688',
            700: '#9a8a6d',
            800: '#796d55',
            900: '#5a5140',
          },
        },
      },
      fontFamily: {
        serif: ['var(--font-cormorant)', 'Georgia', 'serif'],
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-cinzel)', 'serif'],
      },
    },
  },
  plugins: [],
};

export default config;
