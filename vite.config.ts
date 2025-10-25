import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    const resolvedGeminiKey = (env.GEMINI_API_KEY || env.VITE_GEMINI_API_KEY || '').trim();

    return {
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [react()],
      define: {
        'process.env.API_KEY': JSON.stringify(resolvedGeminiKey),
        'process.env.GEMINI_API_KEY': JSON.stringify(resolvedGeminiKey)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});
