import type { Config } from 'tailwindcss'
import {nextui} from "@nextui-org/react";
import plugin from 'tailwindcss';
const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      animation: {
        '-spin': '-spin 1s linear infinite',
      },
      keyframes: {
        '-spin': {
          'from': {
            transform: 'rotate(0deg)'
          },
          'to': {
            transform: 'rotate(-360deg)'
          }
        }
      },
      colors: {
        "blue": {
          50: "#e6f1fe",
          100: "#cce3fd",
          200: "#99c7fb",
          300: "#66aaf9",
          400: "#338ef7",
          500: "#006fee",
          600: "#005bc4",
          700: "#004493",
          800: "#002e62",
          900: "#001731",
        },
        "purple": {
          50: "#f2eafa",
          100: "#e4d4f4",
          200: "#c9a9e9",
          300: "#ae7ede",
          400: "#9353d3",
          500: "#7828c8",
          600: "#6020a0",
          700: "#481878",
          800: "#301050",
          900: "#180828",
        },
        white: "#ffffff",
        black: "#000000",
        "pink": {
          50: "#ffedfa",
          100: "#ffdcf5",
          200: "#ffb8eb",
          300: "#ff95e1",
          400: "#ff71d7",
          500: "#ff4ecd",
          600: "#cc3ea4",
          700: "#992f7b",
          800: "#661f52",
          900: "#331029",
        },
        "green": {
          50: "#e8faf0",
          100: "#d1f4e0",
          200: "#a2e9c1",
          300: "#74dfa2",
          400: "#45d483",
          500: "#17c964",
          600: "#12a150",
          700: "#0e793c",
          800: "#095028",
          900: "#052814",
        },
        "zinc": {
          50: "#fafafa",
          100: "#f4f4f5",
          200: "#e4e4e7",
          300: "#d4d4d8",
          400: "#a1a1aa",
          500: "#71717a",
          600: "#52525b",
          700: "#3f3f46",
          800: "#27272a",
          900: "#18181b",
        },
        "yellow": {
          50: "#fefce8",
          100: "#fdedd3",
          200: "#fbdba7",
          300: "#f9c97c",
          400: "#f7b750",
          500: "#f5a524",
          600: "#c4841d",
          700: "#936316",
          800: "#62420e",
          900: "#312107",
        },
        "cyan": {
          50: "#f0fcff",
          100: "#e6fafe",
          200: "#d7f8fe",
          300: "#c3f4fd",
          400: "#a5eefd",
          500: "#7ee7fc",
          600: "#06b7db",
          700: "#09aacd",
          800: "#0e8aaa",
          900: "#053b48",
        },
        "red": {
          50: "#fee7ef",
          100: "#fdd0df",
          200: "#faa0bf",
          300: "#f871a0",
          400: "#f54180",
          500: "#f31260",
          600: "#c20e4d",
          700: "#920b3a",
          800: "#610726",
          900: "#310413",
        }
      }
    },
    // colors: {
    //   'blue': '#1fb6ff',
    //   'purple': '#7e5bef',
    //   'pink': '#ff49db',
    //   'orange': '#ff7849',
    //   'green': '#13ce66',
    //   'yellow': '#ffc82c',
    //   'gray-dark': '#273444',
    //   'gray': '#8492a6',
    //   'gray-light': '#d3dce6',
    // }
  },
  darkMode: "class",
  variants: {
    '.scrollbar-hide': {
      '-ms-overflow-style': 'none',
      'scrollbar-width': 'none',
      '&::-webkit-scrollbar': {
        display: 'none',
      },
    },
  },
  plugins: [
    nextui({
      prefix: "nextui", // prefix for themes variables
      addCommonColors: true, // override common colors (e.g. "blue", "green", "pink").
      defaultTheme: "dark", // default theme from the themes object
      defaultExtendTheme: "dark", // default theme to extend on custom themes
      layout: {
        
      }, // common layout tokens (applied to all themes)
      themes: {
        light: {
          layout: {}, // light theme layout tokens
          colors: {
          }, // light theme colors
        },
        dark: {
          layout: {
          }, // dark theme layout tokens
          colors: {
            background:"#13161A",
            // primary: { DEFAULT: "#6366f1"},
            // success: { DEFAULT: "#6366f1"},
            // warning: { DEFAULT: "#6366f1"},
            // danger: { DEFAULT: "#6366f1"},
          }, // dark theme colors
        },
        // ... custom themes
      },
    })
  ],
}
export default config
