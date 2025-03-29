import { defineConfig } from 'vite';
import { glob } from 'glob';
import injectHTML from 'vite-plugin-html-inject';
import FullReload from 'vite-plugin-full-reload';
import SortCss from 'postcss-sort-media-queries';

export default defineConfig(({ command }) => ({
  base: './', 
  root: 'src',
  build: {
    sourcemap: true,
    rollupOptions: {
      input: glob.sync('./src/*.html'),
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        },
        entryFileNames: '[name].js',
        assetFileNames: 'assets/[name]-[hash][extname]', // Виправляємо шлях до ресурсів
      },
    },
    outDir: '../dist',
    emptyOutDir: true,
  },
  server: {
    host: '127.0.0.1',
    port: 5173,
  },

  plugins: [
    injectHTML(),
    FullReload(['./src/**/*.html']),
    SortCss({ sort: 'mobile-first' }),
  ],
}));

console.log('VITE CONFIG LOADED ✅');
