/// <reference types="vitest" />

import { defineConfig } from "vitest/config";
import vue from "@vitejs/plugin-vue"; //
import path from "path";

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./tests-setup.ts"],
    server: {
      deps: {
        inline: ["vuetify"],
      },
    },
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
      exclude: [
        "**/main.ts",
        "**/App.vue",
        "**/env.d.ts",
        "**/router/index.ts",
        "**/interfaces/**/*.ts",
        "**/vite.config.ts",
        "**/vitest.config.ts",
      ],
    },
  },
});
