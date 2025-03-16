import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

export default defineConfig(({ mode }) => ({
  base: './', // 🛠️ แก้ให้ base อยู่ที่ root
  server: {
    host: "0.0.0.0", // หรือไม่ต้องกำหนด
    port: 8080,
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: "dist", // ตรวจสอบว่าไฟล์ Build ถูกสร้างที่นี่
    emptyOutDir: true,
  },
}));
