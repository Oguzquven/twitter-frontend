import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Vite konfigürasyonu
// port: 3200 - README'de React uygulaması 3200 portunda isteniyor
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3200,
  },
});
