import { defineConfig } from 'vite';

export default defineConfig(({ mode }) => {
  const basePath = process.env.VITE_BASE_PATH_FRONTEND || '/';
  return {
    base: basePath,
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            'react-vendor': ['react', 'react-dom'],
            'mui-vendor': ['@mui/material', '@mui/icons-material'],
          },
        },
      },
      chunkSizeWarningLimit: 1000,
    },
    server: {
      host: true,
      /* port: 80, */
    },
  };
});
