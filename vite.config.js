import { defineConfig } from 'vite'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = dirname(fileURLToPath(import.meta.url))

// Multi-page build: index (home) + styleguide are the only entry points.
// Legacy concept files (c04-*.html) are intentionally left out of the build.
export default defineConfig({
  root,
  server: {
    host: true,       // bind 0.0.0.0 so devcontainer/remote port forwarding works
    port: 5173,
    strictPort: false,
  },
  build: {
    rollupOptions: {
      input: {
        index: resolve(root, 'index.html'),
        styleguide: resolve(root, 'styleguide.html'),
      },
    },
  },
})
