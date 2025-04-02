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
      exclude: [
        "src/main.ts",
        "src/App.vue",
        "src/router/index.ts",
        "src/interfaces/**",
        "src/env.d.ts",
        "src/router/index.ts",
      ],
    },
  },
});
