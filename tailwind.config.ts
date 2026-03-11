import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        bg: "rgb(var(--c-bg) / <alpha-value>)",
        surface: "rgb(var(--c-surface) / <alpha-value>)",
        accent: "rgb(var(--c-accent) / <alpha-value>)",
        heading: "rgb(var(--c-heading) / <alpha-value>)",
        body: "rgb(var(--c-body) / <alpha-value>)",
        muted: "rgb(var(--c-muted) / <alpha-value>)",
        faint: "rgb(var(--c-faint) / <alpha-value>)",
        dim: "rgb(var(--c-dim) / <alpha-value>)",
        line: "rgb(var(--c-line) / <alpha-value>)",
        "line-dim": "rgb(var(--c-line-dim) / <alpha-value>)",
      },
      fontFamily: {
        heading: ["Syne", "sans-serif"],
        mono: ["DM Mono", "monospace"],
        sans: ["DM Sans", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
