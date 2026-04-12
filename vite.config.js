import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    // Configuraciones específicas para túneles
    allowedHosts: ['.tunnelmole.net', '.ngrok-free.app'],
    host: true,
    port: 5173,
  }
})
