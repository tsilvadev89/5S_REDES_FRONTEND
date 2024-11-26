import { defineConfig } from 'vite';

export default defineConfig(() => {
  const basePath = process.env.VITE_BASE_PATH_FRONTEND || '/';
  const port = Number(process.env.VITE_FRONTEND_PORT) || 80;

  return {
    base: basePath,
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            'react-vendor': ['react', 'react-dom'],
            'mui-vendor': ['@mui/material', '@mui/icons-material'],
          },
          onwarn(warning, warn) {
            // Ignorar avisos relacionados a "use strict" em módulos antigos
            if (warning.code !== 'MODULE_LEVEL_DIRECTIVE') warn(warning);
          },
        },
        minify: true,
        sourcemap: false, // Desabilitar sourcemaps em produção
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
      port: port,
      proxy: {
        '/api': {
          target: 'http://3.215.171.253:3000',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },
  };
});
