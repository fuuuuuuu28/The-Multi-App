import path from "path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react-swc"
import { defineConfig } from "vite"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: '/The-Multi-App/',
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})