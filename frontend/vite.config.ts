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
          onwarn(warning, warn) {
            if (warning.code !== 'MODULE_LEVEL_DIRECTIVE') warn(warning);
          },
        },
        minify: true, // garantir que a minificação ocorra
        sourcemap: false, // desabilitar sourcemaps em produçãoa
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
    },
  };
});
