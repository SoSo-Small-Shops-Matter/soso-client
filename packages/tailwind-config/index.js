const plugin = require("tailwindcss/plugin");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      height: {
        screenVh: "calc(var(--vh) * 100)",
      },
      colors: {
        main: "#FF7F50",
        sub: "#D3CBC4",
        sub2: "#F3EDE8",
        background: "#FDF9F8",
        black: "#000000",
        gray: {
          50: "#F7F8F9",
          100: "#E8EBED",
          200: "#C9CDD2",
          400: "#9EA4AA",
          500: "#72787F",
          600: "#454C53",
          800: "#26282B",
          900: "#191919",
        },
        orange: {
          50: "#FFF2EE",
          100: "#FFE9E1",
          200: "#FFD7CA",
          300: "#FFB9A1",
          400: "#FF9A75",
          500: "#FF7F50",
          600: "#F57243",
          700: "#D76338",
          800: "#9C4323",
          900: "#592C1C",
        },
        etc: {
          red: "#F94E51",
          green: "#00B038",
        },
      },
      backgroundColor: {
        "black-25": "rgba(0, 0, 0, 0.25)",
        "black-50": "rgba(0, 0, 0, 0.5)",
      },
      fontSize: (() => {
        const sizes = {};
        for (let i = 1; i <= 100; i++) {
          sizes[i] = `${i}px`;
        }
        return sizes;
      })(),
      gap: (() => {
        const gaps = {};
        for (let i = 1; i <= 100; i++) {
          gaps[i] = `${i}px`;
        }
        return gaps;
      })(),
      spacing: (() => {
        const Spacings = {};
        for (let i = 1; i <= 100; i++) {
          Spacings[i] = `${i}px`;
        }
        return Spacings;
      })(),
      boxShadow: {
        "sns-btn": "0px 4px 8px rgba(27, 27, 27, 0.16)",
        "filter-select": "1px 2px 9px 3px rgba(0, 0, 0, 0.14)",
        button: "1px 2px 6px 3px rgba(0, 0, 0, 0.08)",
        "place-card": "1px 2px 6px 3px rgba(0, 0, 0, 0.08)",
        "search-bar": "1px 2px 6px 3px rgba(0, 0, 0, 0.08)",
      },
      backdropBlur: {
        10: "10px",
      },
      borderRadius: {
        4: "4px",
        8: "8px",
        10: "10px",
        12: "12px",
        14: "14px",
        16: "16px",
        20: "20px",
        24: "24px",
      },
      lineHeight: {
        12: "1.2",
        14: "1.4",
        16: "1.6",
        18: "1.8",
        20: "2.0",
      },
      zIndex: {
        auto: "auto",
        base: "0",
        dropdown: "100",
        sticky: "200",
        backdrop: "900",
        modal: "1000",
        tooltip: "1200",
        important: "9999",
      },
      maxWidth: {
        screen: "600px",
      },
      backgroundImage: {
        "gradient-custom1":
          "linear-gradient(0deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.4) 100%)",
      },
      keyframes: {
        glow: {
          "0%": { transform: "scale(1)", opacity: "1" },
          "50%": { transform: "scale(1.1)", opacity: "0.7" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
      },
      animation: {
        glow: "glow 1.5s infinite ease-in-out",
      },
    },
  },
  plugins: [
    function ({ addBase }) {
      addBase({
        ":root": {
          "--main-color": "#FF7F50",
          "--sub-color": "#D3CBC4",
          "--sub2-color": "#F3EDE8",
          "--background-color": "#FDF9F8",
          "--gray-50": "#F7F8F9",
          "--gray-100": "#E8EBED",
          "--gray-200": "#C9CDD2",
          "--gray-400": "#9EA4AA",
          "--gray-500": "#72787F",
          "--gray-600": "#454C53",
          "--gray-800": "#26282B",
          "--gray-900": "#191919",
          "--orange-50": "#FFF2EE",
          "--orange-100": "#FFE9E1",
          "--orange-200": "#FFD7CA",
          "--orange-300": "#FFB9A1",
          "--orange-400": "#FF9A75",
          "--orange-500": "#FF7F50",
          "--orange-600": "#F57243",
          "--orange-700": "#D76338",
          "--orange-800": "#9C4323",
          "--orange-900": "#592C1C",
          "--etc-red": "#F94E51",
          "--etc-green": "#00B038",
        },
      });
    },
    plugin(function ({ addUtilities }) {
      const customUtilities = {
        ".font-display_s": {
          fontSize: "30px",
          lineHeight: "42px",
          letterSpacing: "-1px",
          fontWeight: "700",
        },
        ".font-title_l": {
          fontSize: "28px",
          lineHeight: "40px",
          letterSpacing: "-1px",
          fontWeight: "700",
        },
        ".font-title_m": {
          fontSize: "24px",
          lineHeight: "32px",
          letterSpacing: "-1px",
          fontWeight: "700",
        },
        ".font-title_s": {
          fontSize: "20px",
          lineHeight: "30px",
          letterSpacing: "-0.5px",
          fontWeight: "700",
        },
        ".font-subtitle_l": {
          fontSize: "18px",
          lineHeight: "26px",
          letterSpacing: "-0.5px",
          fontWeight: "700",
        },
        ".font-subtitle_m": {
          fontSize: "16px",
          lineHeight: "24px",
          letterSpacing: "-0.5px",
          fontWeight: "700",
        },
        ".font-subtitle_s": {
          fontSize: "14px",
          lineHeight: "22px",
          letterSpacing: "-0.5px",
          fontWeight: "700",
        },
        ".font-body_l": {
          fontSize: "18px",
          lineHeight: "26px",
          letterSpacing: "-0.5px",
          fontWeight: "500",
        },
        ".font-body_m": {
          fontSize: "16px",
          lineHeight: "24px",
          letterSpacing: "-0.3px",
          fontWeight: "500",
        },
        ".font-body_s": {
          fontSize: "14px",
          lineHeight: "22px",
          letterSpacing: "-0.5px",
          fontWeight: "500",
        },
        ".font-caption": {
          fontSize: "12px",
          lineHeight: "18px",
          letterSpacing: "-0.3px",
          fontWeight: "500",
        },
        ".layout-center": {
          left: "50%",
          width: "100%",
          maxWidth: "600px",
          transform: "translateX(-50%)",
        },
        ".modal-page": {
          position: "fixed",
          top: "0",
          left: "50%",
          right: "0",
          bottom: "0",
          transform: "translateX(-50%)",
          height: "calc(var(--vh) * 100)",
          width: "100%",
          maxWidth: "600px",
          paddingBottom: "20px",
          backgroundColor: "#fff",
          zIndex: "800",
        },
        ".bottom-button": {
          position: "absolute",
          left: "50%",
          bottom: "10px",
          padding: "0 20px",
          width: "100%",
          maxWidth: "600px",
          transform: "translateX(-50%)",
        },
        ".bottom-fixed-button": {
          position: "fixed",
          left: "50%",
          bottom: "0",
          padding: "20px",
          width: "100%",
          maxWidth: "600px",
          transform: "translateX(-50%)",
        },
        ".position-center": {
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
        },
      };

      addUtilities(customUtilities);
    }),
  ],
};
