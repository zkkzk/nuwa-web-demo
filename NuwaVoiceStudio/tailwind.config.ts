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
      colors: {
        "common": {
          "blue": {
            "50": {
              "$type": "color",
              "$value": "#e6f1fe"
            },
            "100": {
              "$type": "color",
              "$value": "#cce3fd"
            },
            "200": {
              "$type": "color",
              "$value": "#99c7fb"
            },
            "300": {
              "$type": "color",
              "$value": "#66aaf9"
            },
            "400": {
              "$type": "color",
              "$value": "#338ef7"
            },
            "500": {
              "$type": "color",
              "$value": "#006fee"
            },
            "600": {
              "$type": "color",
              "$value": "#005bc4"
            },
            "700": {
              "$type": "color",
              "$value": "#004493"
            },
            "800": {
              "$type": "color",
              "$value": "#002e62"
            },
            "900": {
              "$type": "color",
              "$value": "#001731"
            }
          },
          "purple": {
            "50": {
              "$type": "color",
              "$value": "#f2eafa"
            },
            "100": {
              "$type": "color",
              "$value": "#e4d4f4"
            },
            "200": {
              "$type": "color",
              "$value": "#c9a9e9"
            },
            "300": {
              "$type": "color",
              "$value": "#ae7ede"
            },
            "400": {
              "$type": "color",
              "$value": "#9353d3"
            },
            "500": {
              "$type": "color",
              "$value": "#7828c8"
            },
            "600": {
              "$type": "color",
              "$value": "#6020a0"
            },
            "700": {
              "$type": "color",
              "$value": "#481878"
            },
            "800": {
              "$type": "color",
              "$value": "#301050"
            },
            "900": {
              "$type": "color",
              "$value": "#180828"
            }
          },
          "white": {
            "$type": "color",
            "$value": "#ffffff"
          },
          "black": {
            "$type": "color",
            "$value": "#000000"
          },
          "pink": {
            "50": {
              "$type": "color",
              "$value": "#ffedfa"
            },
            "100": {
              "$type": "color",
              "$value": "#ffdcf5"
            },
            "200": {
              "$type": "color",
              "$value": "#ffb8eb"
            },
            "300": {
              "$type": "color",
              "$value": "#ff95e1"
            },
            "400": {
              "$type": "color",
              "$value": "#ff71d7"
            },
            "500": {
              "$type": "color",
              "$value": "#ff4ecd"
            },
            "600": {
              "$type": "color",
              "$value": "#cc3ea4"
            },
            "700": {
              "$type": "color",
              "$value": "#992f7b"
            },
            "800": {
              "$type": "color",
              "$value": "#661f52"
            },
            "900": {
              "$type": "color",
              "$value": "#331029"
            }
          },
          "green": {
            "50": {
              "$type": "color",
              "$value": "#e8faf0"
            },
            "100": {
              "$type": "color",
              "$value": "#d1f4e0"
            },
            "200": {
              "$type": "color",
              "$value": "#a2e9c1"
            },
            "300": {
              "$type": "color",
              "$value": "#74dfa2"
            },
            "400": {
              "$type": "color",
              "$value": "#45d483"
            },
            "500": {
              "$type": "color",
              "$value": "#17c964"
            },
            "600": {
              "$type": "color",
              "$value": "#12a150"
            },
            "700": {
              "$type": "color",
              "$value": "#0e793c"
            },
            "800": {
              "$type": "color",
              "$value": "#095028"
            },
            "900": {
              "$type": "color",
              "$value": "#052814"
            }
          },
          "zinc": {
            "50": {
              "$type": "color",
              "$value": "#fafafa"
            },
            "100": {
              "$type": "color",
              "$value": "#f4f4f5"
            },
            "200": {
              "$type": "color",
              "$value": "#e4e4e7"
            },
            "300": {
              "$type": "color",
              "$value": "#d4d4d8"
            },
            "400": {
              "$type": "color",
              "$value": "#a1a1aa"
            },
            "500": {
              "$type": "color",
              "$value": "#71717a"
            },
            "600": {
              "$type": "color",
              "$value": "#52525b"
            },
            "700": {
              "$type": "color",
              "$value": "#3f3f46"
            },
            "800": {
              "$type": "color",
              "$value": "#27272a"
            },
            "900": {
              "$type": "color",
              "$value": "#18181b"
            }
          },
          "yellow": {
            "50": {
              "$type": "color",
              "$value": "#fefce8"
            },
            "100": {
              "$type": "color",
              "$value": "#fdedd3"
            },
            "200": {
              "$type": "color",
              "$value": "#fbdba7"
            },
            "300": {
              "$type": "color",
              "$value": "#f9c97c"
            },
            "400": {
              "$type": "color",
              "$value": "#f7b750"
            },
            "500": {
              "$type": "color",
              "$value": "#f5a524"
            },
            "600": {
              "$type": "color",
              "$value": "#c4841d"
            },
            "700": {
              "$type": "color",
              "$value": "#936316"
            },
            "800": {
              "$type": "color",
              "$value": "#62420e"
            },
            "900": {
              "$type": "color",
              "$value": "#312107"
            }
          },
          "cyan": {
            "50": {
              "$type": "color",
              "$value": "#f0fcff"
            },
            "100": {
              "$type": "color",
              "$value": "#e6fafe"
            },
            "200": {
              "$type": "color",
              "$value": "#d7f8fe"
            },
            "300": {
              "$type": "color",
              "$value": "#c3f4fd"
            },
            "400": {
              "$type": "color",
              "$value": "#a5eefd"
            },
            "500": {
              "$type": "color",
              "$value": "#7ee7fc"
            },
            "600": {
              "$type": "color",
              "$value": "#06b7db"
            },
            "700": {
              "$type": "color",
              "$value": "#09aacd"
            },
            "800": {
              "$type": "color",
              "$value": "#0e8aaa"
            },
            "900": {
              "$type": "color",
              "$value": "#053b48"
            }
          },
          "red": {
            "50": {
              "$type": "color",
              "$value": "#fee7ef"
            },
            "100": {
              "$type": "color",
              "$value": "#fdd0df"
            },
            "200": {
              "$type": "color",
              "$value": "#faa0bf"
            },
            "300": {
              "$type": "color",
              "$value": "#f871a0"
            },
            "400": {
              "$type": "color",
              "$value": "#f54180"
            },
            "500": {
              "$type": "color",
              "$value": "#f31260"
            },
            "600": {
              "$type": "color",
              "$value": "#c20e4d"
            },
            "700": {
              "$type": "color",
              "$value": "#920b3a"
            },
            "800": {
              "$type": "color",
              "$value": "#610726"
            },
            "900": {
              "$type": "color",
              "$value": "#310413"
            }
          }
        }
      },
      units: {
        "unit": {
          "$type": "number",
          "$value": 4
        },
        "unit-0": {
          "$type": "number",
          "$value": 0
        },
        "unit-2": {
          "$type": "number",
          "$value": 8
        },
        "unit-3": {
          "$type": "number",
          "$value": 12
        },
        "unit-3_5": {
          "$type": "number",
          "$value": 14
        },
        "unit-4": {
          "$type": "number",
          "$value": 16
        },
        "unit-5": {
          "$type": "number",
          "$value": 20
        },
        "unit-6": {
          "$type": "number",
          "$value": 24
        },
        "unit-7": {
          "$type": "number",
          "$value": 28
        },
        "unit-8": {
          "$type": "number",
          "$value": 32
        },
        "unit-9": {
          "$type": "number",
          "$value": 36
        },
        "unit-10": {
          "$type": "number",
          "$value": 40
        },
        "unit-11": {
          "$type": "number",
          "$value": 44
        },
        "unit-12": {
          "$type": "number",
          "$value": 48
        },
        "unit-13": {
          "$type": "number",
          "$value": 52
        },
        "unit-14": {
          "$type": "number",
          "$value": 56
        },
        "unit-15": {
          "$type": "number",
          "$value": 60
        },
        "unit-16": {
          "$type": "number",
          "$value": 64
        },
        "unit-17": {
          "$type": "number",
          "$value": 68
        },
        "unit-18": {
          "$type": "number",
          "$value": 72
        },
        "unit-20": {
          "$type": "number",
          "$value": 80
        },
        "unit-24": {
          "$type": "number",
          "$value": 96
        },
        "unit-28": {
          "$type": "number",
          "$value": 112
        },
        "unit-32": {
          "$type": "number",
          "$value": 128
        },
        "unit-36": {
          "$type": "number",
          "$value": 144
        },
        "unit-40": {
          "$type": "number",
          "$value": 160
        },
        "unit-44": {
          "$type": "number",
          "$value": 176
        },
        "unit-48": {
          "$type": "number",
          "$value": 192
        },
        "unit-52": {
          "$type": "number",
          "$value": 208
        },
        "unit-56": {
          "$type": "number",
          "$value": 224
        },
        "unit-60": {
          "$type": "number",
          "$value": 240
        },
        "unit-64": {
          "$type": "number",
          "$value": 256
        },
        "unit-72": {
          "$type": "number",
          "$value": 288
        },
        "unit-80": {
          "$type": "number",
          "$value": 320
        },
        "unit-96": {
          "$type": "number",
          "$value": 384
        },
        "unit-xs": {
          "$type": "number",
          "$value": 8
        },
        "unit-sm": {
          "$type": "number",
          "$value": 12
        },
        "unit-md": {
          "$type": "number",
          "$value": 16
        },
        "unit-lg": {
          "$type": "number",
          "$value": 22
        },
        "unit-xl": {
          "$type": "number",
          "$value": 36
        },
        "unit-2xl": {
          "$type": "number",
          "$value": 48
        },
        "unit-3xl": {
          "$type": "number",
          "$value": 80
        },
        "unit-4xl": {
          "$type": "number",
          "$value": 120
        },
        "unit-5xl": {
          "$type": "number",
          "$value": 224
        },
        "unit-6xl": {
          "$type": "number",
          "$value": 288
        },
        "unit-7xl": {
          "$type": "number",
          "$value": 384
        },
        "unit-8xl": {
          "$type": "number",
          "$value": 512
        },
        "unit-9xl": {
          "$type": "number",
          "$value": 640
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
      layout: {}, // common layout tokens (applied to all themes)
      themes: {
        light: {
          layout: {}, // light theme layout tokens
          colors: {
          }, // light theme colors
        },
        dark: {
          layout: {}, // dark theme layout tokens
          colors: {
            background:"#13161A",
            danger: { DEFAULT: "#E40031"},
            primary: { DEFAULT: "#6366f1"}
          }, // dark theme colors
        },
        // ... custom themes
      },
    })
  ],
}
export default config
