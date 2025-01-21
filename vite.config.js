import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  base: '/DynamicGridWave/', // Adjust this to match your GitHub repo name
  plugins: [react()],
});
