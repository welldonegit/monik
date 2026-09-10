import { defineConfig } from 'vite'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = dirname(fileURLToPath(import.meta.url))

// Multi-page build: index (home) + styleguide are the only entry points.
// Legacy concept files (c04-*.html) are intentionally left out of the build.
export default defineConfig({
  root,
  build: {
    rollupOptions: {
      input: {
        index: resolve(root, 'index.html'),
        styleguide: resolve(root, 'styleguide.html'),
      },
    },
  },
})
