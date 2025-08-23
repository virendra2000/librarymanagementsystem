import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite'

// Load environment variables from .env if needed
export default defineConfig(({ command }) => {
  return {
    plugins: [
      react(),
      tailwindcss()

    ],
    server: {
      host: '0.0.0.0',
      port: command === 'serve' ? parseInt(process.env.VITE_PORT) || 2025 : undefined,
      open: command === 'serve' ? process.env.VITE_OPEN_BROWSER === 'true' : false,

    }
  };
});