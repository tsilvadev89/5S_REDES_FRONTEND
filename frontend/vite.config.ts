import { defineConfig } from 'vite';

export default defineConfig(() => {
  // Definir basePath a partir da variável de ambiente ou um valor padrão
  const basePath = process.env.VITE_BASE_PATH_FRONTEND || '/';

  // Definir a porta com base em uma variável de ambiente, ou 80 por padrão
  const port = Number(process.env.VITE_FRONTEND_PORT) || 80;  // Garantir que seja um número

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
      port: port, 
    },
  };
});
