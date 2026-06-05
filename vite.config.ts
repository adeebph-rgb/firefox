import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath } from 'node:url'

const componentsDir = fileURLToPath(new URL('./@/components', import.meta.url))
const srcDir = fileURLToPath(new URL('./src', import.meta.url))

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      {
        find: /^@\/components(.*)/,
        replacement: componentsDir + '$1',
      },
      {
        find: /^@\/(.*)/,
        replacement: srcDir + '/$1',
      },
    ],
  },
  server: {
    proxy: {
      '/api/news': {
        target: 'https://newsapi.org',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/news/, ''),
      },
    },
  },
})