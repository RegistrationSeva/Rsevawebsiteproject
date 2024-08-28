import type { Config } from "tailwindcss";
import { PluginAPI } from "tailwindcss/types/config";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        primary: "#0F4A89",
        secondary: "#F3A404",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    function (api: PluginAPI) {
      const { addUtilities } = api;
      addUtilities({
        ".name": {
          "@apply text-xl md:text-3xl font-bold text-[black] text-center": {},
        },
        ".heading": {
          "@apply text-lg md:text-lg font-semibold text-[black]": {},
        },
        ".conclusion": {
          "@apply text-sm md:text-lg font-medium text-gray-600 mb-2 italic": {},
        },
        ".title": {
          "@apply text-lg md:text-xl font-semibold text-[black] text-gray-700":
            {},
        },
        ".description": {
          "@apply text-sm md:text-lg text-gray-700 text-justify": {},
        },
        ".italicHeading": {
          "@apply text-sm md:text-lg font-medium text-gray-600 mb-2 italic": {},
        },
        ".paragraph": {
          "@apply text-[13px] sm:leading-5 md:text-sm font-medium text-gray-600 mb-2":
            {},
        },
      });
    },
  ],
} satisfies Config;

export default config;
