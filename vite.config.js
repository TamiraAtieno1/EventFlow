// C:\Users\ADMIN\OneDrive\Desktop\React\Event-Booking-App\vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Change 'base' to just '/static/'
  base: '/static/', // <-- Make this change
  build: {
    outDir: 'dist', // Keep this as 'dist'
  base: process.env.VITE_BASE_PATH || "/EventFlow",
  },
})