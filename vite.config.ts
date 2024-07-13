import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      assets: "/src/assets",
      components: "/src/components",
      hooks: "/src/hooks",
      ui: "/src/ui",
      views: "/src/views",
      utils: "/src/utils",
      db: "/src/db",
      types: "/src/types",
      bundler: "/src/bundler",
      transpiler: "/src/transpiler",
      fs: "/src/fs",
      formatter: "/src/formatter",
      src: "/src",
    },
  },
  server: {
    headers: {
      "Cross-Origin-Embedder-Policy": "require-corp",
      "Cross-Origin-Opener-Policy": "same-origin",
      "Cross-Origin-Resource-Policy": "cross-origin",
    },
  },
});
