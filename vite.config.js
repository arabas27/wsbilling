import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { basename } from "./src/app/config";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  assetsInclude: ["**/*.xls"],
  base: basename,
  build: {
    chunkSizeWarningLimit: 1600,
  },
});
