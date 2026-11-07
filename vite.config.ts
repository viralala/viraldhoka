import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // One page, one bundle: the loader covers it, so splitting would only add round trips
  build: { chunkSizeWarningLimit: 700 },
})
