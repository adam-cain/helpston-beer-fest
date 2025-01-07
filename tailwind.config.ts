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
        almond: "hsla(30, 67%, 88%, 1)",
        black: "hsla(0, 0%, 0%, 1)",
        sunglow: "hsla(42, 100%, 64%, 1)",
        oxfordBlue: "hsla(219, 31%, 19%, 1)",
      },
      fontFamily: {
        twkEverett: ['TWKEverett', 'sans-serif'],
      },
    },
  },
  plugins: [],
} satisfies Config;
