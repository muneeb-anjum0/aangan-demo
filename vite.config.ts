import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/aangan-demo/',
  server: {
    host: true, // Allows access from other devices on the network
    port: 3000, // Specify the port number
  }
})
