import { defineConfig } from 'vite';

export default defineConfig(() => {
  // Variáveis de ambiente para URLs e caminhos
  const basePathFrontend = process.env.VITE_BASE_PATH_FRONTEND || '/';
  const apiBaseUrl = process.env.VITE_BASE_URL || 'http://localhost:3000/api';
  const frontendPort = Number(process.env.VITE_FRONTEND_PORT) || 4173;

  return {
    base: basePathFrontend,
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            'react-vendor': ['react', 'react-dom'],
            'mui-vendor': ['@mui/material', '@mui/icons-material'],
          },
        },
        minify: true, 
        sourcemap: false,
      },
      chunkSizeWarningLimit: 2000, 
    },
    optimizeDeps: {
      include: [
        '@mui/material',
        '@mui/icons-material',
        '@emotion/react',
        '@emotion/styled',
      ],
    },
    server: {
      host: true,
      port: frontendPort, 
    },
    define: {
      'process.env': {
        VITE_BASE_URL: apiBaseUrl,
        VITE_BASE_PATH_FRONTEND: basePathFrontend,
      },
    },
  };
});
