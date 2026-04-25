/** @type {import('tailwindcss').Config} */
module.exports = {
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
        primary: "#141414",
        accent: "#6366f1",
        alertRed: "#ef4444",
        alertYellow: "#eab308",
        alertGreen: "#22c55e",
      },
    },
  },
  plugins: [],
};
