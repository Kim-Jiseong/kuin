import { nextui } from "@nextui-org/theme";

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)"],
        mono: ["var(--font-mono)"],
      },
      translate: {
        "3d": "translate3d(0, 0, 0)",
      },
      animation: {
        wiggle: "wiggle 1s ease-in-out infinite",
        floating: "bounce 2s linear infinite",
      },
    },
  },
  darkMode: "class",
  plugins: [nextui(), "tailwind-scrollbar-hide"],
};
