import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        accent: "hsla(30, 67%, 88%, 1)",
        highlight: "hsla(42, 100%, 64%, 1)",
        dark: "hsla(219, 31%, 19%, 1)",
      },
      fontFamily: {
        twkEverett: ['TWKEverett', 'sans-serif'],
      },
      letterSpacing: {
        'tighter-display': '-0.03em',
        'tight-display': '-0.02em',
        'tight': '-0.01em',
        'wide-caps': '0.08em',
        'wider-caps': '0.12em',
      },
      lineHeight: {
        'display': '0.95',
        'display-relaxed': '1.1',
      },
      transitionTimingFunction: {
        'in-out-circ': 'cubic-bezier(0.785, 0.135, 0.15, 0.86)',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateZ(0)' },
          '100%': { transform: 'translate3d(calc(-100% - 8px), 0, 0)' },
        },
      },
      animation: {
        marquee: 'marquee 50s linear infinite', 
      },
    },
  },
  plugins: [],
} satisfies Config;
