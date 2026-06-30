import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Base is '/' because burnthare.com will serve the site from the domain root.
// (If you ever serve from https://pandabot76.github.io/burnthare/ instead,
// without a custom domain, change this to '/burnthare/'.)
export default defineConfig({
  plugins: [react()],
  base: '/',
})
