import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        cream: "#FFFDF7",
        beige: "#F5E6D3",
        gold: "#C9A84C",
        chocolate: "#3E2723",
        rose: "#D8A7A3",
        date: "#8F1538"
      },
      fontFamily: {
        heading: ["var(--font-playfair)", "Georgia", "serif"],
        body: ["var(--font-inter)", "Inter", "sans-serif"]
      },
      boxShadow: {
        luxe: "0 24px 60px rgba(62, 39, 35, 0.13)",
        soft: "0 14px 34px rgba(62, 39, 35, 0.10)"
      },
      backgroundImage: {
        "gold-line": "linear-gradient(90deg, transparent, rgba(201,168,76,.78), transparent)"
      }
    }
  },
  plugins: []
};

export default config;
