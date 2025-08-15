/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // ✅ Tailwind sẽ quét toàn bộ file trong src/
  ],
  theme: {
    extend: {
      keyframes: {
        spinSlow: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
      },
      animation: {
        spinSlow: "spinSlow 8s linear infinite",
      },
    },
  },
  plugins: [],
};
