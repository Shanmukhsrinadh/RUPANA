import { defineConfig } from 'vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
    babel({ presets: [reactCompilerPreset()] }),
  ],
  resolve: {
    dedupe: ['react', 'react-dom', 'react-leaflet', '@react-leaflet/core'],
  },
  server: {
    host: '0.0.0.0',
    port: 5000,
    allowedHosts: true,
  },
})
