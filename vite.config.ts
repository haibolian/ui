import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from "path";
import vueJsx from "@vitejs/plugin-vue-jsx"

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'package/index.js'),
      name: 'index',
      fileName: (format) => `index.${format}.js`,
    }
  },
  plugins: [vue(), vueJsx()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'package')
    }
  }
})
