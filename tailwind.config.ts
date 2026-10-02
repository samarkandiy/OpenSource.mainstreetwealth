import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "1.5rem",
        lg: "2rem",
      },
      screens: {
        "2xl": "1200px",
      },
    },
    extend: {
      colors: {
        // Brand palette distilled from the Main Street Wealth logo.
        ink: {
          DEFAULT: "#140036", // dark navy/purple used for logo wordmark
          900: "#140036",
          800: "#1d0a4a",
          700: "#2a1363",
          600: "#3b2585",
          500: "#4f3aa8",
        },
        violet: {
          50: "#f5f1ff",
          100: "#ebe3ff",
          200: "#d6c6ff",
          300: "#b89bff",
          400: "#9a70ff",
          500: "#8947fc", // rgb(137,71,252)
          600: "#7d2cfb", // rgb(125,44,251)
          700: "#6b22d6", // closer to logo accent
          800: "#5a1cb0",
          900: "#3f1480",
        },
        mint: {
          50: "#ecfff7",
          100: "#d1ffea",
          200: "#a3fcd5",
          300: "#6cf4bc",
          400: "#36e8a3",
          500: "#03e798", // rgb(3,231,152)
          600: "#02d5bb", // rgb(2,213,187) teal
          700: "#00bc7b", // rgb(0,188,123)
          800: "#008f60",
          900: "#005c40",
        },
        surface: {
          DEFAULT: "#ffffff",
          soft: "#faf9fe",
          muted: "#f3f1fb",
          sunken: "#eceaf5",
        },
        line: {
          DEFAULT: "#e6e3f1",
          strong: "#d2cde4",
          subtle: "#efedf6",
        },
      },
      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Roboto",
          "sans-serif",
        ],
        display: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
        ],
        mono: [
          "ui-monospace",
          "SFMono-Regular",
          "Menlo",
          "Monaco",
          "Consolas",
          "monospace",
        ],
      },
      fontSize: {
        "display-xl": ["4.5rem", { lineHeight: "1.02", letterSpacing: "-0.03em", fontWeight: "700" }],
        "display-lg": ["3.5rem", { lineHeight: "1.05", letterSpacing: "-0.028em", fontWeight: "700" }],
        "display-md": ["2.5rem", { lineHeight: "1.1", letterSpacing: "-0.024em", fontWeight: "700" }],
        "display-sm": ["2rem", { lineHeight: "1.15", letterSpacing: "-0.02em", fontWeight: "700" }],
      },
      boxShadow: {
        card: "0 1px 2px rgba(20, 0, 54, 0.04), 0 8px 24px -12px rgba(20, 0, 54, 0.08)",
        pop: "0 20px 60px -24px rgba(125, 44, 251, 0.35)",
        ring: "0 0 0 4px rgba(125, 44, 251, 0.15)",
      },
      backgroundImage: {
        "brand-gradient":
          "linear-gradient(135deg, #7d2cfb 0%, #8947fc 40%, #02d5bb 100%)",
        "brand-gradient-soft":
          "linear-gradient(135deg, #f5f1ff 0%, #ecfff7 100%)",
        "mesh-light":
          "radial-gradient(1200px 600px at 10% -10%, #ede6ff 0%, transparent 60%), radial-gradient(900px 500px at 110% 10%, #d6fcee 0%, transparent 55%), radial-gradient(600px 400px at 50% 110%, #f3f1fb 0%, transparent 60%)",
      },
      borderRadius: {
        xl: "0.9rem",
        "2xl": "1.1rem",
      },
      animation: {
        "fade-in": "fade-in 0.4s ease-out",
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(4px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
