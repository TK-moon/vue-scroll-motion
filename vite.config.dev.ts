import { fileURLToPath, URL } from "node:url"

import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import vueJsx from "@vitejs/plugin-vue-jsx"
import dts from "vite-plugin-dts"
import VitePluginStyleInject from "vite-plugin-style-inject"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx(), dts({ insertTypesEntry: true }), VitePluginStyleInject()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  base: "",
  build: {
    outDir: "demo",
  },
})
