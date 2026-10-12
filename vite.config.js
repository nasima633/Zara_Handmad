import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// assetsDir "static" keeps Vite bundles apart from your photos in /public/assets.
// base "./" lets the built site work from any folder or sub-path.
export default defineConfig({ base: "./", plugins: [react()], build: { assetsDir: "static" } });
