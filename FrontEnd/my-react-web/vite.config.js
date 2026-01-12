import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// import tailwindcss from '@tailwindcss/vite'


// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),
    // ,    tailwindcss(),
  ],
  
  server: {
    port: 3000,
   proxy: {
      '/api': {
        // target: 'http://localhost:8080',
        target: 'http://host.docker.internal:8080', 
        changeOrigin: true,
        }
    }
  }
})
