import { defineConfig } from "vite";
import { glob } from "glob";
import injectHTML from "vite-plugin-html-inject";
import FullReload from "vite-plugin-full-reload";
import { ViteImageOptimizer } from "vite-plugin-image-optimizer";

export default defineConfig({
  root: "src",
  build: {
    outDir: "../dist",
    rollupOptions: {
      input: glob.sync("./src/*.html"),
    },
  },
  plugins: [
    injectHTML(),
    FullReload(["./src/**/*.html", "./src/**/*.scss"]),
    ViteImageOptimizer({
      exclude: /^sprite.svg$/,
      png: { quality: 70 },
      jpeg: { quality: 70 },
      webp: { quality: 70 },
    }),
  ],
  server: {
    host: true,
    // port: 3000,
  },
});
